import React, { useState } from "react";

const chordMap = [
  "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"
];

const transposeChord = (chord, steps) => {
  const root = chord.replace(/[^A-G#]/g, ""); // Extract chord root
  const suffix = chord.replace(/[A-G#]/g, ""); // Extract chord extensions (like m, 7)
  const index = chordMap.indexOf(root);
  
  if (index === -1) return chord; // Return unchanged if not a valid chord

  const newIndex = (index + steps + 12) % 12;
  return chordMap[newIndex] + suffix;
};

const transposeLyrics = (text, steps) => {
  return text.replace(/\b[A-G][#b]?(m|maj|min|dim|sus|7|9|11|13)?\b/g, (match) => {
    return transposeChord(match, steps);
  });
};

const ChordTransposer = () => {
  const [lyrics, setLyrics] = useState("");
  const [transpose, setTranspose] = useState(0);

  return (
    <div style={{ textAlign: "center", fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <h2>Chord Transposer</h2>
      <textarea
        rows="10"
        cols="50"
        placeholder="Paste your lyrics with chords here..."
        value={lyrics}
        onChange={(e) => setLyrics(e.target.value)}
        style={{ width: "80%", height: "200px", padding: "10px", fontSize: "16px" }}
      ></textarea>
      <br />
      <button onClick={() => setTranspose(transpose + 1)}>Transpose Up</button>
      <button onClick={() => setTranspose(transpose - 1)}>Transpose Down</button>
      <h3>Transposed Lyrics</h3>
      <pre style={{ textAlign: "left", width: "80%", margin: "auto", whiteSpace: "pre-wrap", fontSize: "16px" }}>
        {transposeLyrics(lyrics, transpose)}
      </pre>
    </div>
  );
};

export default ChordTransposer;
