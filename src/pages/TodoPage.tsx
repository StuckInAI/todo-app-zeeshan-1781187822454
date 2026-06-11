import { useTodos } from '@/hooks/useTodos';
import AddTodoForm from '@/components/AddTodoForm';
import TodoItem from '@/components/TodoItem';
import FilterBar from '@/components/FilterBar';
import { ClipboardList } from 'lucide-react';

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-start justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-indigo-500 flex items-center justify-center shadow-md">
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
              todos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={toggleTodo}
                  onDelete={deleteTodo}
                  onEdit={editTodo}
                />
              ))
            )}
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-slate-400 mt-6">
          Tasks are saved locally in your browser.
        </p>
      </div>
    </div>
  );
}
