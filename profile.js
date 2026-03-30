document.addEventListener('DOMContentLoaded', () => {
    // Отримуємо базові дані поточного користувача
    const currentUserBasic = JSON.parse(localStorage.getItem('devblog_currentUser'));

    // Якщо ніхто не залогінений, перекидаємо на сторінку входу
    if (!currentUserBasic) {
        window.location.href = 'login.html';
        return;
    }

    // Шукаємо повні дані цього користувача у загальному масиві
    let users = JSON.parse(localStorage.getItem('devblog_users')) || [];
    let userIndex = users.findIndex(u => u.email === currentUserBasic.email);

    if (userIndex === -1) return;

    let currentUser = users[userIndex];

    const tbody = document.querySelector('.profile-table tbody');
    const editBtn = document.getElementById('edit-profile-btn');

    let isEditing = false;

    // Функція для звичайного відображення даних
    function renderProfile() {
        tbody.innerHTML = `
            <tr>
                <th>Ім'я:</th>
                <td>${currentUser.name || 'Не вказано'}</td>
            </tr>
            <tr>
                <th>Email:</th>
                <td>${currentUser.email}</td>
            </tr>
            <tr>
                <th>Стать:</th>
                <td>${currentUser.gender === 'male' ? 'Чоловіча' : (currentUser.gender === 'female' ? 'Жіноча' : 'Не вказано')}</td>
            </tr>
            <tr>
                <th>Дата народження:</th>
                <td>${currentUser.dob || 'Не вказано'}</td>
            </tr>
            <tr>
                <th>Група:</th>
                <td>${currentUser.group || 'Не вказано'}</td>
            </tr>
            <tr>
                <th>Статус:</th>
                <td>Студент / Користувач блогу</td>
            </tr>
        `;
        editBtn.textContent = 'Редагувати профіль';
        editBtn.classList.remove('btn-success');
        editBtn.classList.add('btn-warning');
    }

    // Функція для відображення форми редагування
    function renderEditForm() {
        tbody.innerHTML = `
            <tr>
                <th>Ім'я:</th>
                <td><input type="text" id="edit-name" class="form-control form-control-sm" value="${currentUser.name || ''}"></td>
            </tr>
            <tr>
                <th>Email:</th>
                <td><input type="email" id="edit-email" class="form-control form-control-sm text-muted" value="${currentUser.email}" readonly title="Email змінити не можна"></td>
            </tr>
            <tr>
                <th>Стать:</th>
                <td>
                    <select id="edit-gender" class="form-select form-select-sm">
                        <option value="male" ${currentUser.gender === 'male' ? 'selected' : ''}>Чоловіча</option>
                        <option value="female" ${currentUser.gender === 'female' ? 'selected' : ''}>Жіноча</option>
                    </select>
                </td>
            </tr>
            <tr>
                <th>Дата народження:</th>
                <td><input type="date" id="edit-dob" class="form-control form-control-sm" value="${currentUser.dob || ''}"></td>
            </tr>
            <tr>
                <th>Група:</th>
                <td><input type="text" id="edit-group" class="form-control form-control-sm" value="${currentUser.group || ''}" placeholder="Наприклад: КВ-31"></td>
            </tr>
            <tr>
                <th>Статус:</th>
                <td>Студент / Користувач блогу</td>
            </tr>
        `;
        editBtn.textContent = 'Зберегти зміни';
        editBtn.classList.remove('btn-warning');
        editBtn.classList.add('btn-success');
    }

    // Обробник кліку на кнопку "Редагувати / Зберегти"
    if (editBtn) {
        editBtn.addEventListener('click', () => {
            if (isEditing) {
                // Зберігаємо нові дані
                currentUser.name = document.getElementById('edit-name').value.trim();
                currentUser.gender = document.getElementById('edit-gender').value;
                currentUser.dob = document.getElementById('edit-dob').value;
                currentUser.group = document.getElementById('edit-group').value.trim();

                // Оновлюємо дані у загальному масиві
                users[userIndex] = currentUser;
                localStorage.setItem('devblog_users', JSON.stringify(users));

                // Оновлюємо дані поточного користувача (щоб ім'я змінилося і в постах)
                localStorage.setItem('devblog_currentUser', JSON.stringify({ name: currentUser.name, email: currentUser.email }));

                isEditing = false;
                renderProfile();
            } else {
                // Вмикаємо режим редагування
                isEditing = true;
                renderEditForm();
            }
        });
    }

    // Первинний рендер сторінки
    renderProfile();
});