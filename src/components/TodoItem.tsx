import { useState } from 'react';
import { Trash2, Pencil, Check, X } from 'lucide-react';
import clsx from 'clsx';
import type { Todo } from '@/types';

type TodoItemProps = {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
};

const priorityDot: Record<string, string> = {
  low: 'bg-emerald-400',
  medium: 'bg-amber-400',
  high: 'bg-rose-400',
};

export default function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  function handleSave(): void {
    if (editText.trim()) {
      onEdit(todo.id, editText);
    }
    setEditing(false);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>): void {
    if (e.key === 'Enter') handleSave();
    if (e.key === 'Escape') {
      setEditText(todo.text);
      setEditing(false);
    }
  }

  return (
    <div
      className={clsx(
        'group flex items-center gap-3 px-4 py-3 rounded-xl bg-white border transition shadow-sm hover:shadow-md',
        todo.completed ? 'border-slate-100 opacity-60' : 'border-slate-200'
      )}
    >
      {/* Checkbox */}
      <button
        onClick={() => onToggle(todo.id)}
        className={clsx(
          'flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition',
          todo.completed
            ? 'bg-red-500 border-red-500 text-white'
            : 'border-slate-300 hover:border-red-400'
        )}
        aria-label="Toggle todo"
      >
        {todo.completed && <Check size={12} strokeWidth={3} />}
      </button>

      {/* Priority dot */}
      <span
        className={clsx(
          'flex-shrink-0 w-2 h-2 rounded-full',
          priorityDot[todo.priority]
        )}
      />

      {/* Text / Edit Input */}
      {editing ? (
        <input
          autoFocus
          value={editText}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditText(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 px-2 py-0.5 text-sm border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300 text-slate-800"
        />
      ) : (
        <span
          className={clsx(
            'flex-1 text-sm text-slate-700',
            todo.completed && 'line-through text-slate-400'
          )}
        >
          {todo.text}
        </span>
      )}

      {/* Actions */}
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
        {editing ? (
          <>
            <button
              onClick={handleSave}
              className="p-1.5 rounded-lg text-emerald-500 hover:bg-emerald-50 transition"
              aria-label="Save"
            >
              <Check size={15} />
            </button>
            <button
              onClick={() => {
                setEditText(todo.text);
                setEditing(false);
              }}
              className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 transition"
              aria-label="Cancel"
            >
              <X size={15} />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => {
                setEditText(todo.text);
                setEditing(true);
              }}
              className="p-1.5 rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-500 transition"
              aria-label="Edit"
            >
              <Pencil size={15} />
            </button>
            <button
              onClick={() => onDelete(todo.id)}
              className="p-1.5 rounded-lg text-slate-400 hover:bg-rose-50 hover:text-rose-500 transition"
              aria-label="Delete"
            >
              <Trash2 size={15} />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
