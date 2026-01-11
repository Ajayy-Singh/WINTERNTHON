// // import { useEffect, useState } from "react";
// // import api from "../services/api";

// // interface Writing {
// //   _id: string;
// //   content: string;
// // }

// // export default function MyWritings() {
// //   const [writings, setWritings] = useState<Writing[]>([]);

// //   useEffect(() => {
// //     api.get("/writings").then((res) => {
// //       setWritings(res.data);
// //     });
// //   }, []);

// //   return (
// //     <div>
// //       <h2>My Writings</h2>
// //       {writings.map((w) => (
// //         <div key={w._id}>
// //           <p>{w.content.slice(0, 100)}...</p>
// //         </div>
// //       ))}
// //     </div>
// //   );
// // }



// import { useEffect, useState } from "react";
// import api from "../services/api";

// interface Writing {
//   _id: string;
//   content: string;
//   createdAt: string;
// }

// export default function MyWritings() {
//   const [writings, setWritings] = useState<Writing[]>([]);

//   useEffect(() => {
//     api.get("/writings").then((res) => setWritings(res.data));
//   }, []);

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>My Writings</h2>
//       {writings.map((w) => (
//         <div key={w._id} style={{ marginBottom: "20px" }}>
//           <small>{new Date(w.createdAt).toLocaleString()}</small>
//           <p>{w.content.slice(0, 150)}...</p>
//         </div>
//       ))}
//     </div>
//   );
// }



import { useEffect, useState } from "react";
import api from "../services/api";

interface Writing {
  _id: string;
  content: string;
  createdAt: string;
}

export default function MyWritings() {
  const [writings, setWritings] = useState<Writing[]>([]);

  const loadWritings = async () => {
    const res = await api.get("/writings");
    setWritings(res.data);
  };

  useEffect(() => {
    loadWritings();
  }, []);

  const deleteWriting = async (id: string) => {
    await api.delete(`/writings/${id}`);
    loadWritings();
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>My Writings</h2>

      <button onClick={() => (window.location.href = "/editor")}>
        ➕ New Writing
      </button>

      <hr />

      {writings.map((w) => (
        <div key={w._id} style={{ marginBottom: 20 }}>
          <small>{new Date(w.createdAt).toLocaleString()}</small>
          <p>{w.content.slice(0, 120)}...</p>

          <button
            onClick={() =>
              (window.location.href = `/editor?id=${w._id}`)
            }
          >
            ✏️ Edit
          </button>

          <button onClick={() => deleteWriting(w._id)}>
            🗑 Delete
          </button>
        </div>
      ))}
    </div>
  );
}
