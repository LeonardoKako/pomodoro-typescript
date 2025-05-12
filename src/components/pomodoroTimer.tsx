import { useEffect, useState, useCallback } from "react";
import { useInterval } from "../hooks/use-interval";
import { Button } from "./button";
import { Timer } from "./timer";
import bellStart from "../sounds/bell-start.mp3";
import bellFinish from "../sounds/bell-finish.mp3";
import { secondsToTime } from "../utils/seconds-to-time";
const audioStartWorking = new Audio(bellStart);
const audioStopWorking = new Audio(bellFinish);

type Props = {
  pomodoroTime: number;
  shortRestTime: number;
  longRestTime: number;
  cycles: number;
};

const PomodoroTimer = ({
  pomodoroTime,
  shortRestTime,
  longRestTime,
  cycles,
}: Props) => {
  const [mainTime, setMainTime] = useState(pomodoroTime);
  const [timeCouting, setTimeCouting] = useState(false);
  const [working, setWorking] = useState(false);
  const [resting, setResting] = useState(false);
  const [cyclesQtdManager, setCyclesQtdManager] = useState(
    new Array(cycles - 1).fill(true)
  );

  const [completedCycles, setCompletedCycles] = useState(0);
  const [fullWorkingTime, setFullWorkingTime] = useState(0);
  const [numberOfPomodoros, setNumberOfPomodoros] = useState(0);

  useInterval(
    () => {
      setMainTime(mainTime - 1);
      if (working) setFullWorkingTime(fullWorkingTime + 1);
    },
    timeCouting ? 1000 : null
  );

  const configureWork = useCallback(() => {
    setTimeCouting(true);
    setWorking(true);
    setResting(false);
    setMainTime(pomodoroTime);
    audioStartWorking.play();
  }, [pomodoroTime]);

  const configureRest = useCallback(
    (long: boolean) => {
      setTimeCouting(true);
      setWorking(false);
      setResting(true);

      if (long) {
        setMainTime(longRestTime);
      } else {
        setMainTime(shortRestTime);
      }
      audioStopWorking.play();
    },
    [longRestTime, shortRestTime]
  );

  useEffect(() => {
    if (working) document.body.classList.add("working");
    if (resting) document.body.classList.remove("working");

    if (mainTime > 0) return;

    if (working && cyclesQtdManager.length > 0) {
      configureRest(false);
      cyclesQtdManager.pop();
    } else if (working && cyclesQtdManager.length <= 0) {
      configureRest(true);
      setCyclesQtdManager(new Array(cycles - 1).fill(true));
      setCompletedCycles(completedCycles + 1);
    }

    if (working) setNumberOfPomodoros(numberOfPomodoros + 1);
    if (resting) configureWork();
  }, [
    completedCycles,
    configureRest,
    configureWork,
    cycles,
    cyclesQtdManager,
    mainTime,
    numberOfPomodoros,
    resting,
    working,
  ]);

  return (
    <>
      <div className='pomodoro'>
        <h2>Você está {working ? "trabalhando" : "descansando"}</h2>
        <Timer mainTime={mainTime} />
        <div className='controls'>
          <Button
            text='Work'
            className={working ? "working" : ""}
            onClick={() => configureWork()}
          />
          <Button
            text='Rest'
            className={working ? "working" : ""}
            onClick={() => configureRest(false)}
          />
          {!working && !resting ? (
            <Button
              text={timeCouting ? "Pause" : "Play"}
              className='hidden'
              onClick={() => setTimeCouting(!timeCouting)}
            />
          ) : (
            <Button
              text={timeCouting ? "Pause" : "Play"}
              className={working ? "working" : ""}
              onClick={() => setTimeCouting(!timeCouting)}
            />
          )}
        </div>
        <div className='details'>
          <p>Cliclos concuídos: {completedCycles}</p>
          <p>Horas trabalhadas: {secondsToTime(fullWorkingTime)}</p>
          <p>Pomodoreos concluídos: {numberOfPomodoros}</p>
        </div>
      </div>
    </>
  );
};

export default PomodoroTimer;
