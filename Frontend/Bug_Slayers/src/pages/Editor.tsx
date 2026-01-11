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

export default function Editor() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id"); // null = new writing

  const [content, setContent] = useState("");

  // Load existing writing (edit mode)
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
    <>
      <button onClick={() => (window.location.href = "/writings")}>
        ← Back
      </button>

      <textarea
        value={content}
        onChange={handleChange}
        placeholder="Write from your heart..."
        style={{
          width: "100%",
          height: "90vh",
          padding: 20,
          fontSize: 16,
          border: "none",
          outline: "none",
        }}
      />
    </>
  );
}
