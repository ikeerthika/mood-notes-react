import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [note, setNote] = useState("");
  const [mood, setMood] = useState("😊 Happy");
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");
  const [filterMood, setFilterMood] = useState("All");
  const [darkMode, setDarkMode] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Load notes from Local Storage
  useEffect(() => {
    const savedNotes = localStorage.getItem("moodNotes");

    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  // Save notes to Local Storage
  useEffect(() => {
    localStorage.setItem("moodNotes", JSON.stringify(notes));
  }, [notes]);

  // Add / Update Note
  function saveNote() {
    if (note.trim() === "") {
      alert("Please write a note");
      return;
    }

    if (editingId) {
      setNotes(
        notes.map((item) =>
          item.id === editingId
            ? { ...item, text: note, mood: mood }
            : item
        )
      );

      setEditingId(null);
    } else {
      const newNote = {
        id: Date.now(),
        text: note,
        mood: mood,
        date: new Date().toLocaleDateString(),
      };

      setNotes([...notes, newNote]);
    }

    setNote("");
    setMood("😊 Happy");
  }

  // Delete
  function deleteNote(id) {
    setNotes(notes.filter((item) => item.id !== id));
  }

  // Edit
  function editNote(item) {
    setNote(item.text);
    setMood(item.mood);
    setEditingId(item.id);
  }

  // Filter
  const filteredNotes = notes.filter((item) => {
    const matchesSearch = item.text
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesMood =
      filterMood === "All" || item.mood === filterMood;

    return matchesSearch && matchesMood;
  });

  // Mood Counts
  const happyCount = notes.filter(
    (item) => item.mood === "😊 Happy"
  ).length;

  const sadCount = notes.filter(
    (item) => item.mood === "😔 Sad"
  ).length;

  const otherCount = notes.length - happyCount - sadCount;

  return (
    <div className={darkMode ? "app dark" : "app"}>

      {/* Header */}
      <header>
        <div>
          <h1>📝 Mood Notes</h1>
          <p>Your personal space for thoughts and feelings</p>
        </div>

        <button
          className="theme-btn"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>
      </header>

      {/* Statistics */}
      <div className="stats">

        <div className="stat-card">
          <h3>{notes.length}</h3>
          <p>📝 Total Notes</p>
        </div>

        <div className="stat-card">
          <h3>{happyCount}</h3>
          <p>😊 Happy</p>
        </div>

        <div className="stat-card">
          <h3>{sadCount}</h3>
          <p>😔 Sad</p>
        </div>

        <div className="stat-card">
          <h3>{otherCount}</h3>
          <p>✨ Other</p>
        </div>

      </div>

      {/* Add Note */}
      <div className="note-form">

        <select
          value={mood}
          onChange={(e) => setMood(e.target.value)}
        >
          <option>😊 Happy</option>
          <option>😔 Sad</option>
          <option>😐 Neutral</option>
          <option>🤩 Excited</option>
          <option>🙏 Grateful</option>
          <option>😍 Loved</option>
          <option>😎 Confident</option>
          <option>😴 Tired</option>
          <option>😡 Angry</option>
          <option>😰 Anxious</option>
          <option>🥰 Calm</option>
          <option>🤔 Thoughtful</option>
          <option>😭 Emotional</option>
          <option>🥳 Celebrating</option>
          <option>😌 Relaxed</option>
        </select>

        <input
          type="text"
          placeholder="Write your note..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />

        <button onClick={saveNote}>
          {editingId ? "Update Note" : "Add Note"}
        </button>

      </div>

      {/* Search + Filter */}
      <div className="controls">

        <input
          type="text"
          placeholder="🔍 Search notes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={filterMood}
          onChange={(e) => setFilterMood(e.target.value)}
        >
          <option>All</option>
          <option>😊 Happy</option>
          <option>😔 Sad</option>
          <option>😐 Neutral</option>
          <option>🤩 Excited</option>
          <option>🙏 Grateful</option>
          <option>😍 Loved</option>
          <option>😎 Confident</option>
          <option>😴 Tired</option>
          <option>😡 Angry</option>
          <option>😰 Anxious</option>
          <option>🥰 Calm</option>
          <option>🤔 Thoughtful</option>
          <option>😭 Emotional</option>
          <option>🥳 Celebrating</option>
          <option>😌 Relaxed</option>
        </select>

      </div>

      {/* Notes */}
      <div className="notes-container">

        {filteredNotes.length === 0 ? (
          <div className="empty">
            <h2>📭 No notes found</h2>
            <p>Start writing your thoughts! ✍️</p>
          </div>
        ) : (
          filteredNotes.map((item) => (

            <div className="note-card" key={item.id}>

              <div className="note-header">

                <span className="mood">
                  {item.mood}
                </span>

                <span className="date">
                  📅 {item.date}
                </span>

              </div>

              <p>{item.text}</p>

              <div className="actions">

                <button
                  className="edit"
                  onClick={() => editNote(item)}
                >
                  ✏️ Edit
                </button>

                <button
                  className="delete"
                  onClick={() => deleteNote(item.id)}
                >
                  🗑️ Delete
                </button>

              </div>

            </div>

          ))
        )}

      </div>

    </div>
  );
}

export default App;

