 const input = document.getElementById('input_to_list');
        const button = document.querySelector('button');
        let editingTask = null;

        window.onload = function () {
            const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
            savedTasks.forEach(text => createTask(text));
        };

        function toDoList() {
            if (editingTask) {
                editingTask.textContent = input.value;
                updateLocalStorage();
                editingTask = null;
                input.value = '';
                return;
            }

            createTask(input.value);
            updateLocalStorage();
            input.value = '';
        }

        function createTask(text) {
            const taskContainer = document.createElement('div');

            const taskText = document.createElement('p');
            taskText.textContent = text;

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.addEventListener('change', () => {
                taskText.style.textDecoration = checkbox.checked ? 'line-through' : 'none';
            });

            const editButton = document.createElement('button');
            editButton.textContent = 'Редактировать';
            editButton.addEventListener('click', () => {
                input.value = taskText.textContent;
                editingTask = taskText;
            });

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Удалить';
            deleteButton.addEventListener('click', () => {
                taskContainer.remove();
                updateLocalStorage();
                if (editingTask === taskText) {
                    editingTask = null;
                    input.value = '';
                }
            });

            taskContainer.appendChild(checkbox);
            taskContainer.appendChild(taskText);
            taskContainer.appendChild(editButton);
            taskContainer.appendChild(deleteButton);

            document.getElementById('task_list').appendChild(taskContainer);
        }

        function updateLocalStorage() {
            const tasks = [];
            document.querySelectorAll('#task_list p').forEach(p => {
                tasks.push(p.textContent);
            });
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
