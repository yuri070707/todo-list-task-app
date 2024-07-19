import React, { useState } from 'react';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import './styles.css';

const translations = {
  en: {
    title: "Housework Management Task App",
    addTaskPlaceholder: "Enter a new task",
    addButton: "Add",
    completeButton: "Complete",
    deleteButton: "Delete",
    editButton: "Edit",
    saveButton: "Save"
  },
  ja: {
    title: "家事管理タスクアプリ",
    addTaskPlaceholder: "新しいタスクを入力",
    addButton: "追加",
    completeButton: "完了",
    deleteButton: "削除",
    editButton: "編集",
    saveButton: "保存"
  }
};

function App() {
  const [tasks, setTasks] = useState([]);
  const [language, setLanguage] = useState('en');

  const addTask = (task) => {
    setTasks([...tasks, { id: Date.now(), text: task, completed: false }]);
  };

  const completeTask = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const editTask = (id, newText) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, text: newText } : task));
  };

  const changeLanguage = (lang) => {
    setLanguage(lang);
  };

  const t = translations[language];

  return (
    <div className="App">
      <h1>{t.title}</h1>
      <div>
        <button onClick={() => changeLanguage('en')}>English</button>
        <button onClick={() => changeLanguage('ja')}>日本語</button>
      </div>
      <TaskInput addTask={addTask} t={t} />
      <TaskList tasks={tasks} completeTask={completeTask} deleteTask={deleteTask} editTask={editTask} t={t} />
    </div>
  );
}

export default App;
