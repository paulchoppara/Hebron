import React, { useState, useEffect } from "react";
import { FaSave, FaRedo, FaArrowUp, FaArrowDown } from "react-icons/fa";
import { ClipLoader } from "react-spinners"; // Importing loading spinner
import './App.css'; // Import custom CSS for styles

const ChordTransposer = () => {
  // Initial lyrics with chords
  const defaultLyrics = "";

  const [lyrics, setLyrics] = useState(localStorage.getItem("lyrics") || defaultLyrics);
  const [transposedLyrics, setTransposedLyrics] = useState(lyrics);
  const [loading, setLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem("theme") === "dark");
  const [fontSize, setFontSize] = useState("16px");
  const [fontColor, setFontColor] = useState("#000");

  // Chord detection regex
  const detectChords = (text) => {
    const chordRegex = /\b[A-G][#b]?m?(maj|min|dim|sus|aug)?\d*\b/g;
    return text.match(chordRegex) || [];
  };

  // Transpose chord logic by interval (up or down)
  const transposeChords = (interval) => {
    const chords = detectChords(lyrics);
    const chordMap = {
      "C": "D", "C#": "D#", "D": "E", "D#": "F", "E": "F#", "F": "G", "F#": "G#",
      "G": "A", "G#": "A#", "A": "B", "A#": "C", "B": "C#"
    };

    let transposed = chords.map(chord => {
      let root = chord[0];
      if (chord[1] === '#') root += chord[1];
      return chordMap[root] + chord.slice(root.length);
    });

    if (interval === "down") {
      transposed = transposed.reverse();
    }

    setTransposedLyrics("Transposed Chords: " + transposed.join(" "));
  };

  // Handle changes in lyrics input field
  const handleLyricsChange = (e) => {
    setLyrics(e.target.value);
    localStorage.setItem("lyrics", e.target.value);
  };

  // Toggle theme (dark/light)
  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  // Effect hook to save theme setting to localStorage
  useEffect(() => {
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  return (
    <div className={`app-container ${isDarkMode ? 'dark' : 'light'}`}>
      <button className="theme-toggle" onClick={toggleTheme}>Toggle Theme</button>
      <h2 className="title">Chord Transposer</h2>

      <div className="instructions">
        <p><strong>Instructions:</strong> Paste your lyrics with chords, then press "Transpose" to transpose the chords.</p>
      </div>

      <div className="input-container">
        <textarea
          placeholder="Paste your lyrics here..."
          value={lyrics}
          onChange={handleLyricsChange}
          rows="6"
          cols="50"
          style={{ fontSize, color: fontColor }}
          className="lyrics-input"
        />
      </div>

      {loading ? (
        <div className="loader">
          <ClipLoader size={50} color={"#36D7B7"} loading={loading} />
        </div>
      ) : (
        <div className="transposed-lyrics">
          <h3>Transposed Chords:</h3>
          <pre className="highlighted-chords">{transposedLyrics || "No transposed chords yet."}</pre>
        </div>
      )}

      <div className="controls">
        <button onClick={() => transposeChords("up")}>
          <FaArrowUp /> Transpose Up
        </button>
        <button onClick={() => transposeChords("down")}>
          <FaArrowDown /> Transpose Down
        </button>
        <button onClick={() => localStorage.setItem("lyrics", "") && setLyrics("")}>
          <FaSave /> Save Lyrics
        </button>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <div>
      <ChordTransposer />
    </div>
  );
}
