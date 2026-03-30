document.addEventListener('DOMContentLoaded', () => {
    const regForm = document.getElementById('reg-form');
    const loginForm = document.getElementById('login-form');
    const logoutBtn = document.getElementById('logout-btn');

    // Логіка реєстрації
    if (regForm) {
        regForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Зупиняємо стандартну відправку форми
            
            const name = document.getElementById('reg-name').value;
            const email = document.getElementById('reg-email').value;
            const password = document.getElementById('reg-password').value;
            const gender = document.querySelector('input[name="gender"]:checked')?.value;
            const dob = document.getElementById('reg-dob').value;

            let users = JSON.parse(localStorage.getItem('devblog_users')) || [];
            
            if (users.find(u => u.email === email)) {
                alert('Користувач з таким email вже існує!');
                return;
            }

            users.push({ name, email, password, gender, dob });
            localStorage.setItem('devblog_users', JSON.stringify(users));
            alert('Реєстрація успішна! Тепер увійдіть.');
            window.location.href = 'login.html';
        });
    }

    // Логіка входу
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;

            let users = JSON.parse(localStorage.getItem('devblog_users')) || [];
            const user = users.find(u => u.email === email && u.password === password);

            if (user) {
                // Зберігаємо поточного користувача
                localStorage.setItem('devblog_currentUser', JSON.stringify({ name: user.name, email: user.email }));
                window.location.href = 'index.html';
            } else {
                alert('Невірний email або пароль!');
            }
        });
    }

    // Логіка виходу (додамо на всі сторінки)
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('devblog_currentUser');
            window.location.href = 'login.html';
        });
    }
});