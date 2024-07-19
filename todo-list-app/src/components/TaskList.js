import React from 'react';
import Task from './Task';

function TaskList({ tasks, completeTask, deleteTask, editTask, t }) {
  return (
    <ul>
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          completeTask={() => completeTask(task.id)}
          deleteTask={() => deleteTask(task.id)}
          editTask={editTask}
          t={t}
        />
      ))}
    </ul>
  );
}

export default TaskList;
