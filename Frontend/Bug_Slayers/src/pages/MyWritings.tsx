import { useEffect, useMemo, useState } from "react";
import api from "../services/api";

interface Writing {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
}


type Theme = "light" | "dark" | "sepia";

export default function MyWritings() {
  const [writings, setWritings] = useState<Writing[]>([]);
  const [query, setQuery] = useState("");
  const [pinned, setPinned] = useState<string[]>(
    () => JSON.parse(localStorage.getItem("pinned-writings") || "[]")
  );

  const theme =
    (localStorage.getItem("editor-theme") as Theme) || "light";

  const loadWritings = async () => {
    const res = await api.get("/writings");
    setWritings(res.data);
  };

  useEffect(() => {
    loadWritings();
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "pinned-writings",
      JSON.stringify(pinned)
    );
  }, [pinned]);

  const togglePin = (id: string) => {
    setPinned((prev) =>
      prev.includes(id)
        ? prev.filter((p) => p !== id)
        : [...prev, id]
    );
  };

  const deleteWriting = async (id: string) => {
    await api.delete(`/writings/${id}`);
    loadWritings();
  };

  // const extractTitle = (content: string, date: string) => {
  //   const firstLine = content
  //     .split("\n")
  //     .map((l) => l.replace(/^#+\s*/, "").trim())
  //     .find(Boolean);

  //   return firstLine || new Date(date).toLocaleString();
  // };

  const extractPreview = (content: string) =>
    content
      .replace(/[#*_>`]/g, "")
      .replace(/\n+/g, " ")
      .slice(0, 120);

  const wordCount = (content: string) =>
    content.trim() ? content.trim().split(/\s+/).length : 0;

  const filtered = useMemo(() => {
  const q = query.toLowerCase();
  return writings.filter(
    (w) =>
      w.title.toLowerCase().includes(q) ||
      w.content.toLowerCase().includes(q)
  );
}, [writings, query]);


  const pinnedItems = filtered.filter((w) =>
    pinned.includes(w._id)
  );
  const normalItems = filtered.filter(
    (w) => !pinned.includes(w._id)
  );

  return (
    <div style={{ ...styles.page, ...themes[theme].page }}>
      <div style={styles.header}>
        <h2 style={styles.title}>My Writings</h2>

        <div style={styles.headerActions}>
          <input
            placeholder="Search…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{ ...styles.search, ...themes[theme].input }}
          />

          <button
            style={styles.primaryButton}
            onClick={() => (window.location.href = "/editor")}
          >
            ➕ New
          </button>
        </div>
      </div>

      <div style={styles.grid}>
        {[...pinnedItems, ...normalItems].map((w) => (
          <div
            key={w._id}
            style={{ ...styles.card, ...themes[theme].card }}
          >
            <div>
              <div style={styles.cardTop}>
                <h3 style={styles.cardTitle}>
  {w.title || new Date(w.createdAt).toLocaleString()}
</h3>


                <button
                  onClick={() => togglePin(w._id)}
                  style={styles.pinButton}
                  title="Pin"
                >
                  {pinned.includes(w._id) ? "⭐" : "☆"}
                </button>
              </div>

              <small style={styles.date}>
                {new Date(w.createdAt).toLocaleDateString()} ·{" "}
                {wordCount(w.content)} words
              </small>

              <p style={styles.preview}>
                {extractPreview(w.content)}…
              </p>
            </div>

            <div style={styles.actions}>
              <button
                style={styles.secondaryButton}
                onClick={() =>
                  (window.location.href = `/editor?id=${w._id}`)
                }
              >
                ✏️ Edit
              </button>

              <button
                style={styles.dangerButton}
                onClick={() => deleteWriting(w._id)}
              >
                🗑 Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    padding: 32,
    maxWidth: 1200,
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
  headerActions: {
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  search: {
    width: 180,
    padding: "8px 12px",
    borderRadius: 8,
    border: "1px solid",
    outline: "none",
    fontSize: 14,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: 20,
  },
  card: {
    borderRadius: 14,
    padding: 20,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  cardTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  cardTitle: {
    margin: 0,
    fontSize: 18,
    lineHeight: 1.3,
  },
  pinButton: {
    background: "transparent",
    border: "none",
    cursor: "pointer",
    fontSize: 18,
  },
  date: {
    fontSize: 12,
    opacity: 0.7,
  },
  preview: {
    marginTop: 12,
    fontSize: 14,
    lineHeight: 1.6,
  },
  actions: {
    display: "flex",
    gap: 10,
    marginTop: 16,
  },
  primaryButton: {
    padding: "8px 14px",
    borderRadius: 8,
    border: "none",
    background: "#4f46e5",
    color: "#fff",
    cursor: "pointer",
  },
  secondaryButton: {
    flex: 1,
    padding: "8px 14px",
    borderRadius: 8,
    border: "1px solid #ccc",
    background: "transparent",
    cursor: "pointer",
  },
  dangerButton: {
    flex: 1,
    padding: "8px 14px",
    borderRadius: 8,
    border: "none",
    background: "#ef4444",
    color: "#fff",
    cursor: "pointer",
  },
};

const themes: Record<Theme, Record<string, React.CSSProperties>> = {
  light: {
    page: { background: "#fafafa", color: "#111" },
    card: { background: "#fff", boxShadow: "0 12px 30px rgba(0,0,0,0.06)" },
    input: { background: "#fff", color: "#111", borderColor: "#ddd" },
  },
  dark: {
    page: { background: "#0f172a", color: "#e5e7eb" },
    card: { background: "#020617", boxShadow: "0 12px 30px rgba(0,0,0,0.4)" },
    input: { background: "#020617", color: "#e5e7eb", borderColor: "#334155" },
  },
  sepia: {
    page: { background: "#f4ecd8", color: "#3b2f2f" },
    card: { background: "#efe4c8", boxShadow: "0 12px 30px rgba(0,0,0,0.15)" },
    input: { background: "#efe4c8", color: "#3b2f2f", borderColor: "#d6c79c" },
  },
};



