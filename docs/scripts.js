document.getElementById('add-task').addEventListener('click', addTask);

function addTask() {
    const taskName = document.getElementById('task-name').value;
    const taskDesc = document.getElementById('task-desc').value;
    const taskDate = document.getElementById('task-date').value;

    if (!taskName) {
        alert('タスク名を入力してください / Please enter a task name');
        return;
    }

    const taskList = document.getElementById('task-list');
    const taskItem = document.createElement('li');

    taskItem.innerHTML = `
        <span>${taskName}</span>
        <small>${taskDesc}</small>
        <small>${taskDate}</small>
        <button class="edit-task">編集 / Edit</button>
        <button class="delete-task">削除 / Delete</button>
        <input type="checkbox" class="complete-task"> 完了 / Complete
    `;

    taskList.appendChild(taskItem);
    document.getElementById('task-name').value = '';
    document.getElementById('task-desc').value = '';
    document.getElementById('task-date').value = '';
}

document.addEventListener('click', function(event) {
    if (event.target.classList.contains('edit-task')) {
        const taskItem = event.target.parentElement;
        const taskName = taskItem.querySelector('span').textContent;
        const taskDesc = taskItem.querySelector('small:nth-of-type(1)').textContent;
        const taskDate = taskItem.querySelector('small:nth-of-type(2)').textContent;
        
        document.getElementById('task-name').value = taskName;
        document.getElementById('task-desc').value = taskDesc;
        document.getElementById('task-date').value = taskDate;
        
        taskItem.remove();
    }
});

document.addEventListener('click', function(event) {
    if (event.target.classList.contains('delete-task')) {
        event.target.parentElement.remove();
    }
});

document.addEventListener('change', function(event) {
    if (event.target.classList.contains('complete-task')) {
        event.target.parentElement.classList.toggle('completed');
    }
});

