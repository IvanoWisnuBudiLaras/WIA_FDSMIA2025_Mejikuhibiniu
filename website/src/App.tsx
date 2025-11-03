import React, { useState } from 'react';
import DrawingText from './components/DrawingText';
import './App.css';

function App() {
  const [key1, setKey1] = useState(0);
  const [key2, setKey2] = useState(0);
  const [key3, setKey3] = useState(0);

  const restartAnimation = (setKey: React.Dispatch<React.SetStateAction<number>>) => {
    setKey(prev => prev + 1);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Animasi Drawing Text</h1>
        
        <div className="demo-section">
          <h2>Animasi Cepat (2 detik)</h2>
          <div className="svg-container">
            <DrawingText 
              key={key1}
              className="drawing-text" 
              duration={2}
              delay={0.5}
              color="#61dafb"
            />
          </div>
          <button onClick={() => restartAnimation(setKey1)} className="restart-btn">
            Ulangi Animasi
          </button>
        </div>

        <div className="demo-section">
          <h2>Animasi Lambat (4 detik)</h2>
          <div className="svg-container dark">
            <DrawingText 
              key={key2}
              className="drawing-text-dark" 
              width={400} 
              height={94}
              duration={4}
              delay={0}
              color="#ff6b6b"
            />
          </div>
          <button onClick={() => restartAnimation(setKey2)} className="restart-btn">
            Ulangi Animasi
          </button>
        </div>

        <div className="demo-section">
          <h2>Animasi Bertahap (3 detik, delay 1 detik)</h2>
          <div className="svg-container gradient">
            <DrawingText 
              key={key3}
              className="drawing-text-gradient" 
              duration={3}
              delay={1}
              color="#4ecdc4"
            />
          </div>
          <button onClick={() => restartAnimation(setKey3)} className="restart-btn">
            Ulangi Animasi
          </button>
        </div>
      </header>
    </div>
  );
}

export default App;