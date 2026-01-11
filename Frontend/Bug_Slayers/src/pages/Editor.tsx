import { useEffect, useMemo, useState } from "react";
import api from "../services/api";
import { debounce } from "../utils/debounce";

export default function Editor() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  const [content, setContent] = useState("");

  useEffect(() => {
    if (id) {
      api.get(`/writings/${id}`).then((res) => {
        setContent(res.data.content);
      });
    }
  }, [id]);

  const save = async (text: string) => {
    if (id) {
      await api.put(`/writings/${id}`, { content: text });
    } else {
      await api.post("/writings", { content: text });
    }
  };

  const debouncedSave = useMemo(
    () => debounce(save, 1000),
    [id]
  );

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    debouncedSave(e.target.value);
  };

  return (
    <div style={styles.page}>
      <div style={styles.topBar}>
        <button
          style={styles.backButton}
          onClick={() => (window.location.href = "/writings")}
        >
          ← Back
        </button>

        <span style={styles.hint}>Auto-saving…</span>
      </div>

      <textarea
        value={content}
        onChange={handleChange}
        placeholder="Write from your heart..."
        style={styles.editor}
      />
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    fontFamily: "system-ui, sans-serif",
    background: "#fafafa",
  },
  topBar: {
    padding: "12px 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid #e5e5e5",
    background: "#fff",
  },
  backButton: {
    border: "none",
    background: "transparent",
    fontSize: 14,
    cursor: "pointer",
  },
  hint: {
    fontSize: 12,
    color: "#888",
  },
  editor: {
    flex: 1,
    width: "100%",
    padding: 32,
    fontSize: 16,
    lineHeight: 1.7,
    border: "none",
    outline: "none",
    resize: "none",
    background: "transparent",
  },
};
