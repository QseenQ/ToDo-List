import TodoRow from './TodoRow'

export default function TodoList({ tasks, setTasks, handleEdit, handleDelete, handleSave, taskRefs }) {
  return (
    <div className="task-list">
      {tasks.map((task, index) => (
        <TodoRow
          key={task.id}
          task={task}
          setTasks={setTasks}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onSave={handleSave}
          index={index}
          ref={(el) => taskRefs.current[task.id] = el}
        />
      ))}
    </div>
  )
}
