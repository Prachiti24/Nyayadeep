import React, { useState, useRef } from "react";
import axios from "axios";

const CrosswordGame = () => {
    const [crossword, setCrossword] = useState(null);
    const [userGrid, setUserGrid] = useState([]);
    const inputRefs = useRef([]);

    React.useEffect(() => {
        axios.get("http://localhost:5000/api/crosswords")
            .then((res) => {
                const allCrosswords = res.data;
                const randomIndex = Math.floor(Math.random() * allCrosswords.length);
                const data = res.data[randomIndex];
                setCrossword(data);
                setUserGrid(data.grid.map((row) => row.map((cell) => (cell ? "" : ""))));
            })
            .catch((err) => console.error("Error loading crossword:", err));
    }, []);

    const handleChange = (row, col, value) => {
        if (!crossword) return;

        const newGrid = [...userGrid];
        newGrid[row][col] = value.toUpperCase();
        setUserGrid(newGrid);

        // move to next input if valid letter typed
        if (value && /^[A-Za-z]$/.test(value)) {
            moveFocus(row, col, "next");
        }
    };

    const handleKeyDown = (e, row, col) => {
        if (e.key === "Backspace" && !userGrid[row][col]) {
            moveFocus(row, col, "prev");
        }
    };

    const moveFocus = (row, col, direction) => {
        const totalRows = crossword.grid.length;
        const totalCols = crossword.grid[0].length;

        let r = row, c = col;
        while (true) {
            if (direction === "next") c++;
            else c--;

            if (c >= totalCols || c < 0) break;
            if (crossword.grid[r][c]) {
                const nextRef = inputRefs.current[`${r}-${c}`];
                if (nextRef) nextRef.focus();
                break;
            }
        }
    };

    const checkAnswers = async () => {
        const { solution } = crossword;
        for (let i = 0; i < solution.length; i++) {
            for (let j = 0; j < solution[i].length; j++) {
                if (solution[i][j] && userGrid[i][j] !== solution[i][j]) {
                    alert("Some answers are incorrect. Keep trying!");
                    return;
                }
            }
        }
        alert("Congratulations! You've completed the crossword!");
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                alert("Please log in to earn XP!");
                return;
            }

            await axios.patch(
                "http://localhost:5000/api/auth/addXP",
                { xp: 20 },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            alert("✅ You earned +20 XP!");
        } catch (err) {
            console.error("Error updating XP:", err);
            alert("⚠️ Something went wrong while updating XP.");
        }
    };

    if (!crossword) return <div className="text-center mt-5">Loading crossword...</div>;

    return (
        <div className="container py-5 text-center bg-light min-vh-100">
            <h1 className="mb-4 text-primary fw-bold">{crossword.title}</h1>

            {/* Clues */}
            <div className="row mb-5 text-start">
                <div className="col-md-6 mb-3">
                    <h4 className="fw-semibold">Across</h4>
                    <ul className="list-group list-group-flush">
                        {crossword.clues.across.map((clue, i) => (
                            <li key={i} className="list-group-item border-0 ps-3">{clue.text}</li>
                        ))}
                    </ul>
                </div>
                <div className="col-md-6 mb-3">
                    <h4 className="fw-semibold">Down</h4>
                    <ul className="list-group list-group-flush">
                        {crossword.clues.down.map((clue, i) => (
                            <li key={i} className="list-group-item border-0 ps-3">{clue.text}</li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Crossword Grid */}
            <div
                className="d-inline-grid gap-1"
                style={{
                    display: "grid",
                    gridTemplateColumns: `repeat(${crossword.grid[0].length}, 2.5rem)`,
                    justifyContent: "center",
                }}
            >
                {crossword.grid.map((row, r) =>
                    row.map((cell, c) => (
                        <div
                            key={`${r}-${c}`}
                            className={`border d-flex align-items-center justify-content-center ${cell ? "bg-warning-subtle" : "bg-secondary-subtle"
                                }`}
                            style={{ width: "2.5rem", height: "2.5rem" }}
                        >
                            {cell ? (
                                <input
                                    ref={(el) => (inputRefs.current[`${r}-${c}`] = el)}
                                    type="text"
                                    maxLength={1}
                                    value={userGrid[r][c]}
                                    onChange={(e) => handleChange(r, c, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(e, r, c)}
                                    className="form-control text-center fw-bold border-0 bg-transparent p-0"
                                    style={{ height: "100%", textTransform: "uppercase" }}
                                />
                            ) : null}
                        </div>
                    ))
                )}
            </div>

            <div className="mt-4">
                <button className="btn btn-success fw-bold px-4 py-2" onClick={checkAnswers}>
                    Check Answers
                </button>
            </div>
        </div>
    );
};

export default CrosswordGame;
