import React, { useState, useEffect } from 'react';

const ColorGame = () => {
  const [score, setScore] = useState(0);
  const [gridSize, setGridSize] = useState(2); // Start with 2x2
  const [colors, setColors] = useState({ base: '', odd: '', oddIndex: 0 });

  const generateLevel = (currentScore) => {
    // 1. Pick a random base color
    const r = Math.floor(Math.random() * 200);
    const g = Math.floor(Math.random() * 200);
    const b = Math.floor(Math.random() * 200);
    
    // 2. Calculate "difficulty" (difference shrinks as score goes up)
    const diff = Math.max(10, 50 - currentScore * 2);
    
    const baseColor = `rgb(${r}, ${g}, ${b})`;
    const oddColor = `rgb(${r + diff}, ${g + diff}, ${b + diff})`;
    
    // 3. Determine grid size (increases every 5 points)
    const newSize = Math.min(6, 2 + Math.floor(currentScore / 5));
    
    setGridSize(newSize);
    setColors({
      base: baseColor,
      odd: oddColor,
      oddIndex: Math.floor(Math.random() * (newSize * newSize))
    });
  };

  useEffect(() => {
    generateLevel(0);
  }, []);

  const handleTileClick = (index) => {
    if (index === colors.oddIndex) {
      const newScore = score + 1;
      setScore(newScore);
      generateLevel(newScore);
    } else {
      alert(`Game Over! Final Score: ${score}`);
      setScore(0);
      generateLevel(0);
    }
  };

  return (
    <div style={styles.wrapper}>
      <h1>Find the different shade</h1>
      <p>Score: <strong>{score}</strong></p>
      
      <div style={{
        ...styles.grid,
        gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
        width: `${gridSize * 80}px`
      }}>
        {[...Array(gridSize * gridSize)].map((_, i) => (
          <div
            key={i}
            onClick={() => handleTileClick(i)}
            style={{
              ...styles.tile,
              backgroundColor: i === colors.oddIndex ? colors.odd : colors.base
            }}
          />
        ))}
      </div>
      
      <button onClick={() => {setScore(0); generateLevel(0);}} style={styles.resetBtn}>
        Reset Game
      </button>
    </div>
  );
};

const styles = {
  wrapper: { display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: 'Arial, sans-serif', padding: '20px' },
  grid: { display: 'grid', gap: '8px', marginTop: '20px' },
  tile: { width: '70px', height: '70px', borderRadius: '4px', cursor: 'pointer', border: '1px solid rgba(0,0,0,0.1)' },
  resetBtn: { marginTop: '30px', padding: '10px 20px', cursor: 'pointer', borderRadius: '5px', border: 'none', backgroundColor: '#333', color: '#fff' }
};

export default ColorGame;