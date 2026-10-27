const STORAGE_PREFIX = 'task_';

function makeKey() {
    return STORAGE_PREFIX + Date.now() + '_' + Math.random().toString(36).slice(2, 8);
}

function pad(n) {
    return String(n).padStart(2, '0');
}

// текущая дата -> "27.10.2026 18:30"
function formatNow(date) {
    return `${pad(date.getDate())}.${pad(date.getMonth() + 1)}.${date.getFullYear()} ` + `${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

// значение из datetime-local "2026-10-27T18:30" -> "27.10.2026 18:30"
function formatDateTimeLocal(value) {
    if (!value) return '';
    const [datePart, timePart] = value.split('T');
    const [y, m, d] = datePart.split('-');
    return `${d}.${m}.${y}${timePart ? ' ' + timePart : ''}`;
}

// чтобы текст задачи не ломал разметку
function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, ch => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[ch]));
}

function Main(event) {
    event.preventDefault(); // иначе форма перезагружает страницу

    const inputTask = document.getElementById('input-task');
    const deadlineInput = document.getElementById('dead-line');

    const text = inputTask.value.trim();
    if (!text) {
        inputTask.focus();
        return;
    }

    const task = {
        input_task: text,
        dead_line: formatDateTimeLocal(deadlineInput.value),
        create: formatNow(new Date()),
        done: false,
        createdAt: Date.now() // для сортировки
    };

    localStorage.setItem(makeKey(), JSON.stringify(task));
    console.log('Сохранённая задача:', task);

    // очищаем форму
    inputTask.value = '';
    deadlineInput.value = '';
    inputTask.focus();

    renderTasks();
}

function getTasks() {
    const tasks = [];

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (!key || !key.startsWith(STORAGE_PREFIX)) { continue; }

        try {
            const task = JSON.parse(localStorage.getItem(key));
            if (task && typeof task === 'object') {
                tasks.push({ key, ...task });
            }
        } catch (e) {
            console.error('Ошибка при чтении задачи:', key, e);
        }
    }

    // старые сверху
    tasks.sort((a, b) => (a.createdAt || 0) - (b.createdAt || 0));
    return tasks;
}

function renderTasks() {
    const tableBody = document.querySelector('#tasks-table tbody');
    if (!tableBody) { return; }

    tableBody.innerHTML = '';

    const tasks = getTasks();

    if (tasks.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="5" class="empty">Задач пока нет</td></tr>';
        return;
    }

    tasks.forEach((task, index) => {
        const row = document.createElement('tr');
        if (task.done) row.classList.add('done');

        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${escapeHtml(task.input_task || 'Без описания')}</td>
            <td>${escapeHtml(task.create || 'Дата не указана')}</td>
            <td>${escapeHtml(task.dead_line || 'Срок не указан')}</td>
            <td><input type="checkbox" class="task-done" ${task.done ? 'checked' : ''}></td>
        `;

        row.querySelector('.task-done').addEventListener('change', (e) => {
            toggleDone(task.key, e.target.checked);
        });

        tableBody.appendChild(row);
    });
}

function toggleDone(key, done) {
    try {
        const task = JSON.parse(localStorage.getItem(key));
        if (!task) { return; }

        task.done = done;
        localStorage.setItem(key, JSON.stringify(task));
        renderTasks();
    } catch (e) {
        console.error('Ошибка при обновлении задачи:', e);
    }
}

function deleteDone() {
    const doneTasks = getTasks().filter(t => t.done);

    if (doneTasks.length === 0) {
        alert('Нет выполненных задач для удаления.');
        return;
    }

    if (!confirm(`Удалить выполненные задачи (${doneTasks.length} шт.)?`)) return;

    doneTasks.forEach(t => localStorage.removeItem(t.key));
    renderTasks();
}

// starting
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('task-form');
    if (form) form.addEventListener('submit', Main);
    
    const deleteBtn = document.getElementById('button-delete');
    if (deleteBtn) deleteBtn.addEventListener('click', deleteDone);
    
    renderTasks();
});