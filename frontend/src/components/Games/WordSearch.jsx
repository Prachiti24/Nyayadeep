import axios from "axios";
import { useCallback, useEffect, useState } from "react";


const MockBackendData = {
  words: [
    "JUSTICE",
    "LIBERTY",
    "EQUALITY",
    "FRATERNITY",
    "RIGHTS",
    "DUTY",
    "CONSTITUTION", 
    "SECULAR",
    "REPUBLIC",
    "SOVEREIGN",
  ],
  clues: {
    "JUSTICE": "Fair treatment and the impartial administration of law.",
    "LIBERTY": "Freedom of thought, expression, belief, faith, and worship.",
    "EQUALITY": "Status and opportunity for all citizens.",
    "FRATERNITY": "Assuring the dignity of the individual and the unity of the nation.",
    "RIGHTS": "Fundamental protections granted to every citizen of India.",
    "DUTY": "Moral obligations required of all citizens (Fundamental ____).",
    "CONSTITUTION": "The supreme law of India, drafted by the Constituent Assembly.",
    "SECULAR": "Principle that the state has no official religion.",
    "REPUBLIC": "The head of the state is an elected president, not a monarch.",
    "SOVEREIGN": "Meaning India is independent of external control.",
  },
  maxWords: 5, 
};

const generateGrid = (rows, cols, words) => {
  const grid = Array(rows)
    .fill(null)
    .map(() => Array(cols).fill(""));
  
  const directions = [
    [0, 1],   
    [1, 0],   
    [1, 1],   
    [1, -1],  
  ];

  const placeWord = (word) => {
    let placed = false;
    let attempts = 0;
    while (!placed && attempts < 100) {
      attempts++;
      
      const [dx, dy] = directions[Math.floor(Math.random() * directions.length)];
      const x = Math.floor(Math.random() * rows);
      const y = Math.floor(Math.random() * cols);

      const wordLength = word.length;
      const endX = x + dx * (wordLength - 1);
      const endY = y + dy * (wordLength - 1);

      if (endX >= 0 && endX < rows && endY >= 0 && endY < cols) {
        const canPlace = word.split("").every((char, i) => {
          const nx = x + dx * i;
          const ny = y + dy * i;
          return !grid[nx][ny] || grid[nx][ny] === char;
        });

        if (canPlace) {
          word.split("").forEach((char, i) => {
            const nx = x + dx * i;
            const ny = y + dy * i;
            grid[nx][ny] = char;
          });
          placed = true;
        }
      }
    }
  };

  words.forEach(placeWord);

  return grid.map((row) =>
    row.map((cell) => (cell ? cell : String.fromCharCode(65 + Math.random() * 26)))
  );
};


const getWordPath = (start, end, grid, gridSize) => {
  if (!start || !end || grid.length === 0) return null;

  const dx = end.col - start.col;
  const dy = end.row - start.row;

  const length = Math.max(Math.abs(dx), Math.abs(dy));

  if (length === 0 || (Math.abs(dx) !== 0 && Math.abs(dy) !== 0 && Math.abs(dx) !== Math.abs(dy))) {
    return null;
  }
  
  const stepX = dx === 0 ? 0 : (dx / Math.abs(dx));
  const stepY = dy === 0 ? 0 : (dy / Math.abs(dy));

  const path = [];
  let currentWord = "";
  
  for (let i = 0; i <= length; i++) {
    const r = start.row + i * stepY;
    const c = start.col + i * stepX;
    
    if (r < 0 || r >= gridSize || c < 0 || c >= gridSize) return null;

    path.push(`${r}-${c}`);
    currentWord += grid[r][c];
  }

  return { path, word: currentWord };
};


const Word = () => {
  const [xpGiven, setXpGiven] = useState(false);

  const [wordBank, setWordBank] = useState([]);
  const [clueMap, setClueMap] = useState({});
  const [maxWords, setMaxWords] = useState(5);
  const [gridSize, setGridSize] = useState(0); 
  const [loading, setLoading] = useState(true);

  const [grid, setGrid] = useState([]);
  const [wordsToFind, setWordsToFind] = useState([]); 
  const [foundWords, setFoundWords] = useState([]); 
  const [startCell, setStartCell] = useState(null); 
  const [endCell, setEndCell] = useState(null);
  const [foundCellCoords, setFoundCellCoords] = useState([]);
  const [message, setMessage] = useState('');
  
  const highlightedCells = getWordPath(startCell, endCell, grid, gridSize)?.path || [];
  const isGameOver = foundWords.length === wordsToFind.length;

  // 🟢 XP addition effect — INSIDE component
  useEffect(() => {
    if (wordsToFind.length > 0 && isGameOver && !xpGiven) {
      const addXP = async () => {
        try {
          const token = localStorage.getItem("token");
          if (!token) return;

          await axios.patch(
            "https://prachiti24-nyayadeep.onrender.com/api/auth/addXP",
            { xp: 20, activity: "wordsearch_completion" },
            { headers: { Authorization: `Bearer ${token}` } }
          );

          alert("🎉 +20 XP added to your account!");
          setXpGiven(true);
        } catch (error) {
          console.error("Error updating XP:", error);
        }
      };
      addXP();
    }
  }, [isGameOver, xpGiven]);
  
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
        setWordBank(MockBackendData.words);
        setClueMap(MockBackendData.clues);
        setMaxWords(MockBackendData.maxWords);
        const requiredSize = Math.max(...MockBackendData.words.map(w => w.length));
        setGridSize(requiredSize + 2); 
        
        setLoading(false);
    }, 500);
  }, []);
  useEffect(() => {
    if (!loading && wordBank.length > 0 && gridSize > 0) {
        const selectedWordsKeys = wordBank.sort(() => 0.5 - Math.random()).slice(0, maxWords);
        const selectedWordsWithClues = selectedWordsKeys.map(word => ({
            word: word,
            clue: clueMap[word] || word, 
        }));
        
        setWordsToFind(selectedWordsWithClues);
        setGrid(generateGrid(gridSize, gridSize, selectedWordsKeys));
    }
  }, [loading, wordBank, clueMap, maxWords, gridSize]);
  
  const handleCellClick = useCallback((row, col) => {
    setMessage('');
    
    const cellCoords = { row, col };
    
    if (!startCell) {
      setStartCell(cellCoords);
      setEndCell(null);
    } else if (startCell.row === row && startCell.col === col) {
      setStartCell(null);
      setEndCell(null);
    } else {
      setEndCell(cellCoords);
      checkSelection(startCell, cellCoords);
    }
  }, [startCell, grid, wordsToFind, foundWords, gridSize]); 
  const checkSelection = useCallback((start, end) => {
    const pathData = getWordPath(start, end, grid, gridSize);

    if (!pathData) {
      setMessage("Invalid selection. Please select letters along a straight line.");
      setTimeout(() => {
        setStartCell(null);
        setEndCell(null);
      }, 500);
      return;
    }

    const { path, word: rawWord } = pathData;
    const reversedWord = rawWord.split('').reverse().join('');
    
    let submittedWord = null;
    const targetWords = wordsToFind.map(item => item.word);

    if (targetWords.includes(rawWord) && !foundWords.includes(rawWord)) {
      submittedWord = rawWord;
    } else if (targetWords.includes(reversedWord) && !foundWords.includes(reversedWord)) {
      submittedWord = reversedWord;
    }

    if (submittedWord) {
      setFoundWords(prev => [...prev, submittedWord]);
      setFoundCellCoords(prev => [...prev, ...path]);
      setMessage(`Found: ${submittedWord}!`);
    } else {
      setMessage(`"${rawWord}" is not an answer.`);
    }

    setTimeout(() => {
        setStartCell(null);
        setEndCell(null);
    }, 500);

  }, [grid, wordsToFind, foundWords, gridSize]);

  const clearSelection = () => {
    setStartCell(null);
    setEndCell(null);
    setMessage('Selection cleared.');
  }

  const isCellSelected = useCallback((row, col) => {
      const cellKey = `${row}-${col}`;
      return highlightedCells.includes(cellKey);
  }, [highlightedCells]);
  
  const isCellFound = useCallback((row, col) => {
      const cellKey = `${row}-${col}`;
      return foundCellCoords.includes(cellKey);
  }, [foundCellCoords]);


  if (loading || gridSize === 0) {
      return (
          <div className="container py-5 text-center">
              <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-2 text-primary fw-semibold">Loading Constitutional Data...</p>
          </div>
      );
  }

  return (
    <>
      <style>
        {`
          /* Custom CSS for the dynamically sized grid */
          .word-search-grid {
              display: grid;
              grid-template-columns: repeat(${gridSize}, 1fr);
              gap: 3px;
              border: 2px solid #007bff; /* Primary */
              border-radius: 0.5rem;
              overflow: hidden;
              box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15); /* Shadow for container */
          }
          .grid-cell {
              display: flex;
              align-items: center;
              justify-content: center;
              aspect-ratio: 1 / 1;
              font-size: ${gridSize > 12 ? '0.9rem' : '1.1rem'}; /* Adjust font size for larger grids */
              font-weight: bold;
              cursor: pointer;
              background-color: #f8f9fa; /* Light background */
              transition: all 0.15s ease-in-out;
              color: #495057; /* Dark text */
          }
          .grid-cell:hover {
              background-color: #e9ecef;
          }
          .cell-selected {
              background-color: #ffc107 !important; /* Warning/Yellow */
              color: #212529 !important;
              box-shadow: inset 0 1px 3px rgba(0,0,0,.1);
              transform: scale(1.05);
          }
          .cell-found {
              background-color: #28a745 !important; /* Success/Green */
              color: white !important;
              box-shadow: 0 0 10px rgba(40, 167, 69, 0.5);
              transform: scale(1.0);
          }
          .list-word {
              list-style: none;
              padding: 0;
          }
          .list-word li {
              padding: 0.5rem;
              border-radius: 0.25rem;
              margin-bottom: 0.5rem;
              box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
          }
          .list-word li.found-word {
              background-color: #d4edda !important; /* Success light */
              color: #155724 !important;
              text-decoration: line-through;
              opacity: 0.8;
          }
        `}
      </style>

      <div className="container py-4 bg-light">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-10">
            <div className="card shadow-lg border-0 rounded-3">
              <div className="card-body p-4 p-md-5">
                <h1 className="text-center text-primary mb-3 fw-bolder">
                  Constitutional Word Search 🇮🇳
                </h1>
                <p className="text-center text-secondary mb-4">
                  Find {maxWords} key concepts from the Indian Constitution. Click the start and end letter of a word in a straight line.
                </p>

                <div className="row g-4">
                  
                  <div className="col-md-7">
                    <div className="word-search-grid mb-4">
                      {grid.map((row, rowIndex) =>
                        row.map((cell, colIndex) => {
                          const selected = isCellSelected(rowIndex, colIndex);
                          const found = isCellFound(rowIndex, colIndex);
                          
                          let cellClasses = "grid-cell";

                          if (found) {
                            cellClasses += " cell-found";
                          } else if (selected) {
                            cellClasses += " cell-selected";
                          }
                          
                          return (
                            <div
                              key={`${rowIndex}-${colIndex}`}
                              className={cellClasses}
                              onClick={() => handleCellClick(rowIndex, colIndex)}
                            >
                              {cell}
                            </div>
                          );
                        })
                      )}
                    </div>
                    
                    <div className="p-3 bg-light rounded shadow-sm">
                        <p className="small fw-semibold text-muted mb-2">Current Action:</p>
                        <div className="bg-white p-3 rounded border border-secondary mb-3 d-flex align-items-center" style={{minHeight: '40px'}}>
                            <span className="h5 fw-bold text-primary mb-0">
                                {startCell ? "End Point Selection..." : "Start Point Selection"}
                            </span>
                        </div>
                        <button 
                            className="btn btn-danger w-100 py-2 fw-semibold" 
                            onClick={clearSelection}
                            disabled={!startCell}
                        >
                            Clear Selection
                        </button>
                        {message && (
                            <p className={`mt-3 text-center fw-bold ${
                                message.startsWith("Found") 
                                ? 'text-success' 
                                : (message.includes("Invalid") ? 'text-danger' : 'text-muted')
                            }`}>
                                {message}
                            </p>
                        )}
                    </div>
                  </div>

                  <div className="col-md-5">
                    <div className="p-4 bg-info bg-opacity-10 rounded shadow-sm h-100">
                      <h2 className="h5 fw-bold text-primary border-bottom pb-2 mb-3">
                        Clues to Find ({foundWords.length}/{wordsToFind.length})
                      </h2>
                      <ul className="list-word">
                        {wordsToFind.map((item, index) => {
                          const isFound = foundWords.includes(item.word);
                          return (
                            <li 
                              key={item.word} 
                              className={`fw-medium ${isFound ? 'found-word' : 'bg-white'}`}
                            >
                              {item.clue}
                            </li>
                          );
                        })}
                      </ul>
                      
                      {isGameOver && (
                          <div className="alert alert-warning text-center fw-bolder mt-4 shadow-sm" role="alert">
                              Puzzle Solved! Well Done!
                          </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Word;
