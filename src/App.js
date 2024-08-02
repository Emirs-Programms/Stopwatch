import { useState, useRef } from "react";
import './style.css'; // Убедитесь, что импортируете стили

function App() {
  const [timer, setTimer] = useState(0);
  const [running, setRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const [buttonText, setButtonText] = useState("Нажмите Старт");

  const intervalRef = useRef(null);

  const startTimer = () => {
    if (!running) {
      setButtonText("Прошло");
      intervalRef.current = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 10);
      }, 10);
      setRunning(true);
    }
  };

  const stopTimer = () => {
    setButtonText("Вы остановили на:");
    clearInterval(intervalRef.current);
    setRunning(false);
  };

  const resetTimer = () => {
    clearInterval(intervalRef.current);
    setTimer(0);
    setRunning(false);
    setButtonText("Нажмите Старт");
    setLaps([]); // Сбросить список кругов
  };

  const addLap = () => {
    if (running) {
      setLaps((prevLaps) => [...prevLaps, timer]);
    }
  };

  return (
    <div className="App">
      <div className="container-text">
        <h2>Секундомер</h2>
      </div>
      <div className="container">
        <p>{(timer / 1000).toFixed(2)} секунды</p>
        <div className="All-FormButtons">
          <button onClick={startTimer}>
            Старт
          </button>
          <button onClick={stopTimer}>
            Стоп
          </button>
          <button onClick={resetTimer}>
            Сбросить
          </button>
          <button onClick={addLap} disabled={!running}>
            Добавить круг
          </button>
        </div>
        <div>
          <ul>
            {laps.map((lap, index) => (
              <li key={index}>
                {buttonText} {(lap / 1000).toFixed(2)}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
