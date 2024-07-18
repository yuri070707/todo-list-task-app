document.getElementById('add-task').addEventListener('click', addTask);

function addTask() {
    const taskName = document.getElementById('task-name').value;
    const taskDesc = document.getElementById('task-desc').value;
    const taskDate = document.getElementById('task-date').value;

    if (!taskName) {
        alert('タスク名を入力してください');
        return;
    }

    const taskList = document.getElementById('task-list');
    const taskItem = document.createElement('li');

    taskItem.innerHTML = `
        <span>${taskName}</span>
        <small>${taskDesc}</small>
        <small>${taskDate}</small>
        <button class="edit-task">編集</button>
        <button class="delete-task">削除</button>
        <input type="checkbox" class="complete-task">
    `;

    taskList.appendChild(taskItem);
    document.getElementById('task-name').value = '';
    document.getElementById('task-desc').value = '';
    document.getElementById('task-date').value = '';
}
