import { useRef } from 'react'
import { useTodoLogic } from './hooks/useToDoLogic'
import AddTodoForm from './Components/AddTodoForm'
import TodoList from './Components/TodoList'
import './todoApp.css'

export default function TodoApp() {
  const {
    tasks,
    setTasks,
    newTask,
    setNewTask,
    handleAddTask,
    handleEdit,
    handleDelete,
    handleSave
  } = useTodoLogic()

  const inputRef = useRef()
  const addButtonRef = useRef()
  const taskRefs = useRef({})

  return (
    <div className="todo-container">
      <h2>ToDo-лист</h2>

      <AddTodoForm
        newTask={newTask}
        setNewTask={setNewTask}
        handleAddTask={handleAddTask}
        inputRef={inputRef}
        addButtonRef={addButtonRef}
      />
			<h3>Что нужно купить</h3>

      <TodoList
        tasks={tasks}
        setTasks={setTasks}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        handleSave={handleSave}
        taskRefs={taskRefs}
      />
    </div>
  )
}
