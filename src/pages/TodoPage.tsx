import { useState } from 'react';
import { useTodos } from '@/hooks/useTodos';
import AddTodoForm from '@/components/AddTodoForm';
import TodoItem from '@/components/TodoItem';
import FilterBar from '@/components/FilterBar';
import Timer from '@/components/Timer';
import { ClipboardList, ChevronDown, ChevronUp } from 'lucide-react';

const VISIBLE_COUNT = 2;

export default function TodoPage() {
  const {
    todos,
    filter,
    setFilter,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    clearCompleted,
    activeCount,
    completedCount,
    totalCount,
  } = useTodos();

  const [showAll, setShowAll] = useState<boolean>(false);

  const visibleTodos = showAll ? todos : todos.slice(0, VISIBLE_COUNT);
  const hasMore = todos.length > VISIBLE_COUNT;

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-rose-50 flex flex-col items-center px-4 py-12">
      <div className="w-full max-w-lg flex-1">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-red-500 flex items-center justify-center shadow-md">
            <ClipboardList size={22} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800 leading-tight">My Todos</h1>
            <p className="text-sm text-slate-500">
              {totalCount === 0
                ? 'No tasks yet — add one below!'
                : `${totalCount} task${totalCount !== 1 ? 's' : ''} total`}
            </p>
          </div>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6 flex flex-col gap-5">
          {/* Timer */}
          <Timer />

          <AddTodoForm onAdd={addTodo} />

          {totalCount > 0 && (
            <FilterBar
              filter={filter}
              setFilter={setFilter}
              activeCount={activeCount}
              completedCount={completedCount}
              totalCount={totalCount}
              onClearCompleted={clearCompleted}
            />
          )}

          {/* Todo List */}
          <div className="flex flex-col gap-2">
            {todos.length === 0 ? (
              <div className="text-center py-10 text-slate-400">
                <ClipboardList size={40} className="mx-auto mb-3 opacity-30" />
                <p className="text-sm">
                  {filter === 'all'
                    ? 'No tasks yet!'
                    : filter === 'active'
                    ? 'No active tasks.'
                    : 'No completed tasks.'}
                </p>
              </div>
            ) : (
              <>
                {visibleTodos.map((todo) => (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={toggleTodo}
                    onDelete={deleteTodo}
                    onEdit={editTodo}
                  />
                ))}
                {hasMore && (
                  <button
                    onClick={() => setShowAll((prev) => !prev)}
                    className="flex items-center justify-center gap-1.5 py-2 text-sm font-medium text-red-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition"
                  >
                    {showAll ? (
                      <>
                        <ChevronUp size={16} />
                        Show less
                      </>
                    ) : (
                      <>
                        <ChevronDown size={16} />
                        Show all ({todos.length - VISIBLE_COUNT} more)
                      </>
                    )}
                  </button>
                )}
              </>
            )}
          </div>
        </div>

        {/* Info text */}
        <p className="text-center text-xs text-slate-400 mt-6">
          Tasks are saved locally in your browser.
        </p>
      </div>

      {/* Footer with Copyright */}
      <footer className="w-full max-w-lg mt-10 pt-6 border-t border-slate-200 text-center">
        <p className="text-sm text-slate-500">
          © {new Date().getFullYear()} My Todos. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
