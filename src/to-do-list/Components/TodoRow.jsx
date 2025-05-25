import { forwardRef } from 'react'

const STATUS_CYCLE = ["new", "in-progress", "done"]
const STATUS_ICONS = {
  new: "🕒",
  "in-progress": "⚙️",
  done: "✅",
}

const TodoRow = forwardRef(({ task, setTasks, onEdit, onDelete, onSave, index }, ref) => {
  const handleChange = (value) => {
    setTasks(prev =>
      prev.map(t =>
        t.id === task.id ? { ...t, text: value } : t
      )
    )
  }

  const handleStatusToggle = () => {
    const currentIndex = STATUS_CYCLE.indexOf(task.status || 'new')
    const nextStatus = STATUS_CYCLE[(currentIndex + 1) % STATUS_CYCLE.length]
    setTasks(prev =>
      prev.map(t =>
        t.id === task.id ? { ...t, status: nextStatus } : t
      )
    )
  }

  return task.isEditing ? (
    <div className="task-row editing" ref={ref}>
      <span className="num-span">{index + 1}.</span>
      <input
        value={task.text}
        onChange={e => handleChange(e.target.value)}
      />
      <button onClick={() => onSave(task.id, task.text)}>✅</button>
    </div>
  ) : (
    <div className={`task-row ${task.status || 'new'}`} ref={ref}>
      <span className="num-span">{index + 1}.</span>
      <span className="task-text">{task.text}</span>
      <div className="task-actions">
        <button onClick={handleStatusToggle} title="Статус задачи">
          {STATUS_ICONS[task.status || "new"]}
        </button>
        <button onClick={() => onEdit(task.id)}>✏️</button>
        <button onClick={() => onDelete(task.id)}>🗑️</button>
      </div>
    </div>
  )
})

export default TodoRow
