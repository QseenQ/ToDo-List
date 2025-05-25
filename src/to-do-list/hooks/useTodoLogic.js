import { useState, useRef, useEffect } from 'react';
import { debounce } from '../utils/debounce';

const STORAGE_KEY = 'todo-tasks';

const loadTasks = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const saveTasks = (tasks) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
};

export function useTodoLogic() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const taskRefs = useRef({});
  const inputRef = useRef(null);
  const addButtonRef = useRef(null);

  const debouncedSave = useRef(debounce((tasks) => saveTasks(tasks), 500)).current;

  useEffect(() => {
    setTasks(loadTasks());
  }, []);

  useEffect(() => {
    debouncedSave(tasks);
  }, [tasks, debouncedSave]);

  const handleAddTask = () => {
    const trimmed = newTask.trim();
    if (!trimmed) return;

    const newItem = {
      id: Date.now(),
      text: trimmed,
      status: 'new',
      isEditing: false,
    };

    setTasks(prev => [...prev, newItem]);
    setNewTask('');
    inputRef.current?.focus();

    setTimeout(() => {
      const el = taskRefs.current[newItem.id];
      if (el) {
        el.classList.add("highlighted");
        setTimeout(() => el.classList.remove("highlighted"), 2000);
      }
    }, 50);
  };

  const handleEdit = (id) => {
    setTasks(prev =>
      prev.map(t => t.id === id ? { ...t, isEditing: true } : t)
    );
  };

  const handleSave = (id, newText) => {
    setTasks(prev =>
      prev.map(t =>
        t.id === id ? { ...t, text: newText.trim(), isEditing: false } : t
      )
    );
  };

  const handleDelete = (id) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  return {
    tasks,
    setTasks,
    newTask,
    setNewTask,
    inputRef,
    addButtonRef,
    taskRefs,
    handleAddTask,
    handleEdit,
    handleSave,
    handleDelete,
  };
}
