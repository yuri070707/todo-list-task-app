import React, { useState } from 'react';

function TaskInput({ addTask, t }) {
  const [task, setTask] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim()) {
      addTask(task);
      setTask('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder={t.addTaskPlaceholder}
      />
      <button type="submit">{t.addButton}</button>
    </form>
  );
}

export default TaskInput;
