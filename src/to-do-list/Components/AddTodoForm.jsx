export default function AddTodoForm({
  newTask,
  setNewTask,
  handleAddTask,
  inputRef,
  addButtonRef
}) {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleAddTask()
    }
  }

  const handleAdd = () => {
    if (!newTask.trim()) {
      addButtonRef.current?.blur()
      return
    }

    handleAddTask()
    addButtonRef.current?.blur()
  }

  return (
    <div className="add-task inputs-wrapper">
      <input
        type="text"
        placeholder="Введите задачу..."
        value={newTask}
        onChange={e => setNewTask(e.target.value)}
        onKeyDown={handleKeyDown}
        ref={inputRef}
      />
      <button
        className="adding-btn"
        ref={addButtonRef}
        onClick={handleAdd}
        onMouseDown={(e) => e.currentTarget.blur()}
      >
        ➕ Добавить
      </button>
    </div>
  )
}
