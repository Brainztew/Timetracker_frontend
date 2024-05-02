import React, { useEffect, useState } from 'react'

interface TimerProps {
  id: string;
}

function Timer({id}: TimerProps) {

  const [isTimerRunning, setIsRunning] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [duration, setDuration] = useState(null);

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
    const url = `http://localhost:8080/task/${isTimerRunning ? 'end' : 'start'}/${id}`;
    await fetch(url, { method: 'POST' });
    fetchTask();
  };

  return (
    <div>
      Timer: {isTimerRunning ? 'Running' : 'Stopped'}
      <div>Start Tid: {startTime}</div>
      <div>Slut Tid: {endTime}</div>
      <p>Antal minuter: {duration}</p>
      <button onClick={toggleTimer}>
        {isTimerRunning ? 'End Timer' : 'Start Timer'}
      </button>
    </div>
  )
}

export default Timer