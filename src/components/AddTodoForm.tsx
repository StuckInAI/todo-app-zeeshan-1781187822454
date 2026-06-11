import { useState } from 'react';
import { Plus } from 'lucide-react';
import clsx from 'clsx';
import type { Priority } from '@/types';

type AddTodoFormProps = {
  onAdd: (text: string, priority: Priority) => void;
};

const priorityOptions: { value: Priority; label: string; color: string }[] = [
  { value: 'low', label: 'Low', color: 'text-emerald-500' },
  { value: 'medium', label: 'Medium', color: 'text-amber-500' },
  { value: 'high', label: 'High', color: 'text-rose-500' },
];

export default function AddTodoForm({ onAdd }: AddTodoFormProps) {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    onAdd(text, priority);
    setText('');
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <div className="flex gap-2">
        <input
          type="text"
          value={text}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
          placeholder="Add a new todo..."
          className="flex-1 px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition text-sm shadow-sm"
        />
        <button
          type="submit"
          disabled={!text.trim()}
          className={clsx(
            'flex items-center gap-1.5 px-4 py-3 rounded-xl font-semibold text-sm transition shadow-sm',
            text.trim()
              ? 'bg-indigo-500 hover:bg-indigo-600 text-white cursor-pointer'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
          )}
        >
          <Plus size={18} />
          Add
        </button>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs text-slate-500 font-medium">Priority:</span>
        {priorityOptions.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => setPriority(opt.value)}
            className={clsx(
              'px-3 py-1 rounded-full text-xs font-semibold border transition',
              priority === opt.value
                ? 'border-indigo-400 bg-indigo-50 text-indigo-600'
                : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300'
            )}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </form>
  );
}
