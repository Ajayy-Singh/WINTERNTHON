// // import { useState } from "react";
// // import api from "../services/api";

// // export default function Editor() {
// //   const [content, setContent] = useState("");

// //   const handleChange = async (
// //     e: React.ChangeEvent<HTMLTextAreaElement>
// //   ) => {
// //     setContent(e.target.value);

// //     await api.post("/writings", {
// //       content: e.target.value,
// //     });
// //   };

// //   return (
// //     <textarea
// //       value={content}
// //       onChange={handleChange}
// //       placeholder="Write from your heart..."
// //       style={{ width: "100%", height: "90vh" }}
// //     />
// //   );
// // }


// import { useMemo, useState } from "react";
// import api from "../services/api";
// import { debounce } from "../utils/debounce";

// export default function Editor() {
//   const [content, setContent] = useState("");

//   const save = async (text: string) => {
//     await api.post("/writings", { content: text });
//   };

//   const debouncedSave = useMemo(
//     () => debounce(save, 1000),
//     []
//   );

//   const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
//     setContent(e.target.value);
//     debouncedSave(e.target.value);
//   };

//   return (
//     <textarea
//       value={content}
//       onChange={handleChange}
//       placeholder="Write from your heart..."
//       style={{
//         width: "100%",
//         height: "100vh",
//         padding: "20px",
//         fontSize: "16px",
//         border: "none",
//         outline: "none",
//       }}
//     />
//   );
// }


import { useEffect, useMemo, useState } from "react";
import api from "../services/api";
import { debounce } from "../utils/debounce";

type Theme = "light" | "dark" | "sepia";

export default function Editor() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id"); // null = new writing

  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem("editor-theme") as Theme) || "light"
  );

  // Load existing writing
  useEffect(() => {
    if (id) {
      api.get(`/writings/${id}`).then((res) => {
        setTitle(res.data.title || "");
        setContent(res.data.content);
      });
    }
  }, [id]);

  useEffect(() => {
    localStorage.setItem("editor-theme", theme);
  }, [theme]);

const save = async (text: string, titleText: string) => {
  if (id) {
    await api.put(`/writings/${id}`, {
      title: titleText,
      content: text,
    });
  } else {
    const res = await api.post("/writings", {
      title: titleText,
      content: text,
    });

    // switch to edit mode after first save
    window.history.replaceState(
      null,
      "",
      `/editor?id=${res.data._id}`
    );
  }
};

  const debouncedSave = useMemo(
  () => debounce((t: string, c: string) => save(c, t), 1000),
  [id]
);


 const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
  setContent(e.target.value);
  debouncedSave(title, e.target.value);
};

const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setTitle(e.target.value);
  debouncedSave(e.target.value, content);
};

  const fallbackTitle = new Date().toLocaleString();

  return (
    <div style={{ ...styles.page, ...themes[theme].page }}>
      <div style={{ ...styles.topBar, ...themes[theme].topBar }}>
        <input
  value={title}
  onChange={handleTitleChange}
  placeholder="Untitled"
/>


        <div style={styles.rightControls}>
          <button
            style={{ ...styles.backButton, ...themes[theme].button }}
            onClick={() => (window.location.href = "/writings")}
          >
            ← Back
          </button>

          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value as Theme)}
            style={{ ...styles.select, ...themes[theme].select }}
          >
            <option value="light">☀️</option>
            <option value="dark">🌙</option>
            <option value="sepia">📜</option>
          </select>
        </div>
      </div>

      <textarea
        value={content}
        onChange={handleChange}
        placeholder="Write from your heart..."
        style={{ ...styles.editor, ...themes[theme].editor }}
      />
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    fontFamily: "Georgia, serif",
  },
  topBar: {
    display: "flex",
    alignItems: "center",
    padding: "12px 20px",
    borderBottom: "1px solid",
    gap: 16,
  },
  titleInput: {
    flex: 1,
    fontSize: 18,
    fontWeight: 600,
    border: "none",
    outline: "none",
    background: "transparent",
  },
  rightControls: {
    display: "flex",
    alignItems: "center",
    gap: 12,
  },
  backButton: {
    border: "none",
    cursor: "pointer",
    background: "transparent",
    fontSize: 14,
  },
  select: {
    padding: "6px 8px",
    borderRadius: 6,
    cursor: "pointer",
    outline: "none",
  },
  editor: {
    flex: 1,
    padding: 40,
    fontSize: 17,
    lineHeight: 1.8,
    border: "none",
    outline: "none",
    resize: "none",
  },
};

const themes: Record<Theme, Record<string, React.CSSProperties>> = {
  light: {
    page: { background: "#fafafa", color: "#111" },
    topBar: { background: "#fff", borderColor: "#e5e5e5" },
    editor: { background: "transparent", color: "#111" },
    title: { color: "#111" },
    button: { color: "#111" },
    select: {
      background: "#fff",
      color: "#111",
      border: "1px solid #ddd",
    },
  },

  dark: {
    page: { background: "#0f172a", color: "#e5e7eb" },
    topBar: { background: "#020617", borderColor: "#1e293b" },
    editor: { background: "transparent", color: "#e5e7eb" },
    title: { color: "#e5e7eb" },
    button: { color: "#e5e7eb" },
    select: {
      background: "#020617",
      color: "#e5e7eb",
      border: "1px solid #334155",
    },
  },

  sepia: {
    page: { background: "#f4ecd8", color: "#3b2f2f" },
    topBar: { background: "#efe4c8", borderColor: "#e0d3a8" },
    editor: { background: "transparent", color: "#3b2f2f" },
    title: { color: "#3b2f2f" },
    button: { color: "#3b2f2f" },
    select: {
      background: "#efe4c8",
      color: "#3b2f2f",
      border: "1px solid #d6c79c",
    },
  },
};
