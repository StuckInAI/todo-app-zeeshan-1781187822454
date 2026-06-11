import { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Timer as TimerIcon } from 'lucide-react';

export default function Timer() {
  const [seconds, setSeconds] = useState<number>(0);
  const [running, setRunning] = useState<boolean>(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running]);

  function reset(): void {
    setRunning(false);
    setSeconds(0);
  }

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  const pad = (n: number): string => String(n).padStart(2, '0');

  return (
    <div className="flex items-center gap-3 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
      <div className="flex items-center gap-2 text-red-500">
        <TimerIcon size={16} />
        <span className="font-mono text-base font-bold text-slate-700 tracking-widest">
          {pad(hours)}:{pad(minutes)}:{pad(secs)}
        </span>
      </div>
      <div className="flex items-center gap-1 ml-auto">
        <button
          onClick={() => setRunning((prev) => !prev)}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-500 hover:bg-red-600 text-white transition shadow-sm"
          aria-label={running ? 'Pause timer' : 'Start timer'}
        >
          {running ? <Pause size={13} /> : <Play size={13} />}
          {running ? 'Pause' : 'Start'}
        </button>
        <button
          onClick={reset}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white border border-slate-200 text-slate-500 hover:bg-slate-50 transition"
          aria-label="Reset timer"
        >
          <RotateCcw size={13} />
          Reset
        </button>
      </div>
    </div>
  );
}
