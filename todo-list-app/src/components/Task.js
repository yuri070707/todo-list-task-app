import React, { useState } from 'react';

function Task({ task, completeTask, deleteTask, editTask, t }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(task.text);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    editTask(task.id, newText);
    setIsEditing(false);
  };

  return (
    <li>
      {isEditing ? (
        <input
          type="text"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
        />
      ) : (
        <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
          {task.text}
        </span>
      )}
      <button onClick={completeTask}>{t.completeButton}</button>
      <button onClick={deleteTask}>{t.deleteButton}</button>
      {isEditing ? (
        <button onClick={handleSave}>{t.saveButton}</button>
      ) : (
        <button onClick={handleEdit}>{t.editButton}</button>
      )}
    </li>
  );
}

export default Task;
