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
    <div style={styles.page}>
      <div style={styles.header}>
        <h2 style={styles.title}>My Writings</h2>
        <button
          style={styles.primaryButton}
          onClick={() => (window.location.href = "/editor")}
        >
          ➕ New Writing
        </button>
      </div>

      <div style={styles.list}>
        {writings.map((w) => (
          <div key={w._id} style={styles.card}>
            <small style={styles.date}>
              {new Date(w.createdAt).toLocaleString()}
            </small>

            <p style={styles.preview}>
              {w.content.slice(0, 120)}...
            </p>

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

const styles: Record<string, React.CSSProperties> = {
  page: {
    padding: 32,
    maxWidth: 900,
    margin: "0 auto",
    fontFamily: "system-ui, sans-serif",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    margin: 0,
    fontSize: 28,
  },
  list: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: 16,
  },
  card: {
    background: "#ffffff",
    borderRadius: 12,
    padding: 20,
    boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
  },
  date: {
    color: "#666",
    fontSize: 12,
  },
  preview: {
    margin: "12px 0",
    fontSize: 15,
    lineHeight: 1.6,
  },
  actions: {
    display: "flex",
    gap: 12,
  },
  primaryButton: {
    padding: "10px 16px",
    borderRadius: 8,
    border: "none",
    background: "#4f46e5",
    color: "#fff",
    cursor: "pointer",
    fontSize: 14,
  },
  secondaryButton: {
    padding: "8px 14px",
    borderRadius: 8,
    border: "1px solid #ddd",
    background: "#fff",
    cursor: "pointer",
  },
  dangerButton: {
    padding: "8px 14px",
    borderRadius: 8,
    border: "none",
    background: "#ef4444",
    color: "#fff",
    cursor: "pointer",
  },
};
