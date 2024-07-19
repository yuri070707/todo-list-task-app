import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';

function App() {
  const [taskName, setTaskName] = useState('');
  const [taskDesc, setTaskDesc] = useState('');
  const [taskDate, setTaskDate] = useState('');
  const [tasks, setTasks] = useState([]);
  const [editId, setEditId] = useState(null);

  const handleAddTask = async () => {
    if (taskName.trim() !== '') {
      if (editId) {
        const taskDocRef = doc(db, 'tasks', editId);
        await updateDoc(taskDocRef, {
          name: taskName,
          description: taskDesc,
          date: taskDate
        });
        setEditId(null);
      } else {
        await addDoc(collection(db, 'tasks'), {
          name: taskName,
          description: taskDesc,
          date: taskDate,
          completed: false
        });
      }
      setTaskName('');
      setTaskDesc('');
      setTaskDate('');
      fetchTasks();
    }
  };

  const fetchTasks = async () => {
    const querySnapshot = await getDocs(collection(db, 'tasks'));
    const tasksArray = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setTasks(tasksArray);
  };

  const handleDeleteTask = async (id) => {
    await deleteDoc(doc(db, 'tasks', id));
    fetchTasks();
  };

  const handleEditTask = (task) => {
    setTaskName(task.name);
    setTaskDesc(task.description);
    setTaskDate(task.date);
    setEditId(task.id);
  };

  const handleCompleteTask = async (id, completed) => {
    const taskDocRef = doc(db, 'tasks', id);
    await updateDoc(taskDocRef, { completed });
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Todo List App</h1>
      </header>
      <main>
        <section id="task-form">
          <input
            type="text"
            id="task-name"
            placeholder="タスク名 / Task Name"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
          <textarea
            id="task-desc"
            placeholder="タスクの説明（オプション） / Task Description (Optional)"
            value={taskDesc}
            onChange={(e) => setTaskDesc(e.target.value)}
          />
          <input
            type="date"
            id="task-date"
            value={taskDate}
            onChange={(e) => setTaskDate(e.target.value)}
          />
          <button onClick={handleAddTask}>{editId ? 'タスクを更新 / Update Task' : 'タスクを追加 / Add Task'}</button>
        </section>
        <section id="tasks">
          <ul id="task-list">
            {tasks.map(task => (
              <li key={task.id}>
                <span>{task.name}</span>
                <small>{task.description}</small>
                <small>{task.date}</small>
                <button onClick={() => handleEditTask(task)}>編集 / Edit</button>
                <button onClick={() => handleDeleteTask(task.id)}>削除 / Delete</button>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleCompleteTask(task.id, !task.completed)}
                />
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}

export default App;
