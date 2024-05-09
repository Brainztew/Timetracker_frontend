import { useEffect, useState } from 'react'

interface TimerProps {
  id: string;
}

function Timer({id}: TimerProps) {

  const [isTimerRunning, setIsRunning] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    fetchTask();
  } , [id, endTime]);

  const fetchTask = async () => {
    const response = await fetch(`http://localhost:8080/task/${id}`);
    const data = await response.json();
    setIsRunning(data.timerRunning);
    setDuration(data.totalDuration);
    if (data.intervals.length > 0) {
      const lastInterval = data.intervals[data.intervals.length - 1];
      setStartTime(lastInterval.startTime);
      setEndTime(lastInterval.endTime);
    }
  };

  const toggleTimer = async () => {
    const userId = localStorage.getItem('userId');
    const url = `http://localhost:8080/task/${isTimerRunning ? 'end' : 'start'}/${id}?userId=${userId}`;
    await fetch(url, { method: 'POST' });
    fetchTask();
  };

  function formatDuration(duration: number) {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return `${hours} h ${minutes} min`;
  }

  return (
    <div>
      Timer: {isTimerRunning ? 'Running' : 'Stopped'}
      <div>Start Tid: {startTime}</div>
      <div>Slut Tid: {endTime}</div>
      <p>Total Tid: {formatDuration(duration)}</p>
      <button onClick={toggleTimer}>
        {isTimerRunning ? 'Stoppa Timer' : 'Start Timer'}
      </button>
    </div>
  )
}

export default Timer