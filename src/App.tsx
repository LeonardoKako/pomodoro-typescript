import "./App.css";
import PomodoroTimer from "./components/pomodoroTimer";

function App() {
  return (
    <div className='container'>
      <PomodoroTimer
        pomodoroTime={1800}
        shortRestTime={300}
        longRestTime={900}
        cycles={3}
      />
    </div>
  );
}

export default App;
