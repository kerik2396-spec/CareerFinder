// Система аутентификации и регистрации
class AuthSystem {
    constructor() {
        this.currentUser = null;
        this.users = JSON.parse(localStorage.getItem('careerFinderUsers')) || [];
        this.init();
    }

    init() {
        this.checkAuthStatus();
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Обработка входа
        document.getElementById('loginModal')?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.login();
            }
        });

        // Обработка регистрации
        document.getElementById('registerModal')?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.register();
            }
        });
    }

    // Выбор типа пользователя при регистрации
    selectUserType(type) {
        const jobseekerBtn = document.querySelector('[data-type="jobseeker"]');
        const employerBtn = document.querySelector('[data-type="employer"]');
        const jobseekerForm = document.getElementById('jobseekerForm');
        const employerForm = document.getElementById('employerForm');

        jobseekerBtn.classList.toggle('active', type === 'jobseeker');
        employerBtn.classList.toggle('active', type === 'employer');
        jobseekerForm.style.display = type === 'jobseeker' ? 'block' : 'none';
        employerForm.style.display = type === 'employer' ? 'block' : 'none';
    }

    // Регистрация нового пользователя
    register() {
        const isJobseeker = document.querySelector('[data-type="jobseeker"]').classList.contains('active');
        
        let userData;
        if (isJobseeker) {
            userData = {
                type: 'jobseeker',
                name: document.getElementById('regName').value,
                email: document.getElementById('regEmail').value,
                password: document.getElementById('regPassword').value,
                profession: document.getElementById('regProfession').value,
                skills: document.getElementById('regSkills').value,
                registrationDate: new Date().toISOString()
            };
        } else {
            userData = {
                type: 'employer',
                companyName: document.getElementById('companyName').value,
                email: document.getElementById('companyEmail').value,
                password: document.getElementById('companyPassword').value,
                industry: document.getElementById('companyIndustry').value,
                description: document.getElementById('companyDescription').value,
                registrationDate: new Date().toISOString()
            };
        }

        // Валидация
        if (!userData.email || !userData.password) {
            showToast('Заполните обязательные поля', 'error');
            return;
        }

        // Проверка на существующего пользователя
        if (this.users.find(u => u.email === userData.email)) {
            showToast('Пользователь с таким email уже существует', 'error');
            return;
        }

        // Сохранение пользователя
        this.users.push(userData);
        localStorage.setItem('careerFinderUsers', JSON.stringify(this.users));

        // Автоматический вход
        this.currentUser = userData;
        localStorage.setItem('careerFinderCurrentUser', JSON.stringify(userData));

        showToast(`Добро пожаловать${isJobseeker ? '' : ', компания ' + userData.companyName}!`, 'success');
        closeModal('registerModal');
        this.updateUI();
    }

    // Вход пользователя
    login() {
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        if (!email || !password) {
            showToast('Заполните все поля', 'error');
            return;
        }

        const user = this.users.find(u => u.email === email && u.password === password);
        
        if (user) {
            this.currentUser = user;
            localStorage.setItem('careerFinderCurrentUser', JSON.stringify(user));
            showToast(`С возвращением${user.type === 'jobseeker' ? '' : ', ' + user.companyName}!`, 'success');
            closeModal('loginModal');
            this.updateUI();
        } else {
            showToast('Неверный email или пароль', 'error');
        }
    }

    // Выход пользователя
    logout() {
        this.currentUser = null;
        localStorage.removeItem('careerFinderCurrentUser');
        showToast('Вы вышли из системы', 'info');
        this.updateUI();
    }

    // Проверка статуса авторизации
    checkAuthStatus() {
        const savedUser = localStorage.getItem('careerFinderCurrentUser');
        if (savedUser) {
            this.currentUser = JSON.parse(savedUser);
            this.updateUI();
        }
    }

    // Обновление интерфейса
    updateUI() {
        const authControls = document.getElementById('authControls');
        const userMenu = document.getElementById('userMenu');
        const userName = document.getElementById('userName');

        if (this.currentUser) {
            authControls.style.display = 'none';
            userMenu.style.display = 'flex';
            
            if (this.currentUser.type === 'jobseeker') {
                userName.textContent = this.currentUser.name;
            } else {
                userName.textContent = this.currentUser.companyName;
            }

            // Обновляем навигацию для работодателей
            this.updateNavigationForEmployer();
        } else {
            authControls.style.display = 'flex';
            userMenu.style.display = 'none';
        }
    }

    // Обновление навигации для работодателей
    updateNavigationForEmployer() {
        if (this.currentUser?.type === 'employer') {
            // Можно добавить специальные пункты меню для работодателей
            const nav = document.querySelector('nav');
            const employerLink = document.createElement('a');
            employerLink.href = '#';
            employerLink.className = 'nav-link';
            employerLink.textContent = 'Мои вакансии';
            employerLink.onclick = () => openModal('employerModal');
            nav.appendChild(employerLink);
        }
    }

    // Проверка авторизации для защищенных действий
    requireAuth(action) {
        if (!this.currentUser) {
            showToast('Для выполнения этого действия необходимо войти в систему', 'warning');
            openModal('loginModal');
            return false;
        }
        return true;
    }
}

// Глобальные функции для HTML
function selectUserType(type) {
    authSystem.selectUserType(type);
}

function register() {
    authSystem.register();
}

function login() {
    authSystem.login();
}

function logout() {
    authSystem.logout();
}

// Инициализация системы аутентификации
const authSystem = new AuthSystem();

// Дополнительные функции для работы с вакансиями
function addToFavorites(button) {
    if (!authSystem.requireAuth()) return;
    
    button.textContent = button.textContent.includes('🤍') ? '❤️ В избранном' : '🤍 В избранное';
    showToast('Вакансия добавлена в избранное', 'success');
}

function applyToJob() {
    if (!authSystem.requireAuth()) return;
    
    showToast('Отклик отправлен успешно!', 'success');
    closeModal('applyModal');
}

function postJob() {
    if (!authSystem.requireAuth()) return;
    
    showToast('Вакансия опубликована!', 'success');
    closeModal('employerModal');
}