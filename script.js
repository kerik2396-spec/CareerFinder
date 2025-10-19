// Основной функционал сайта
document.addEventListener('DOMContentLoaded', function() {
    initializeTheme();
    initializeModals();
});

// Управление темой
function initializeTheme() {
    const themeSelect = document.getElementById('themeSelect');
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    if (themeSelect) {
        themeSelect.value = savedTheme;
        themeSelect.addEventListener('change', function() {
            setTheme(this.value);
        });
    }
    
    setTheme(savedTheme);
}

function setTheme(theme) {
    document.body.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
}

// Модальные окна
function initializeModals() {
    // Закрытие по ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeAllModals();
        }
    });
}

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    const overlay = document.getElementById('overlay');
    
    if (modal && overlay) {
        modal.classList.add('show');
        overlay.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    const overlay = document.getElementById('overlay');
    
    if (modal) {
        modal.classList.remove('show');
    }
    
    // Проверяем, есть ли еще открытые модальные окна
    const openModals = document.querySelectorAll('.modal.show');
    if (openModals.length === 0) {
        overlay.classList.remove('show');
        document.body.style.overflow = '';
    }
}

function closeAllModals() {
    const modals = document.querySelectorAll('.modal');
    const overlay = document.getElementById('overlay');
    
    modals.forEach(modal => modal.classList.remove('show'));
    overlay.classList.remove('show');
    document.body.style.overflow = '';
}

// Toast уведомления
function showToast(message, type = 'info') {
    const toast = document.getElementById('toast');
    if (!toast) return;
    
    toast.textContent = message;
    toast.className = `toast ${type}`;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Поиск вакансий
function searchJobs() {
    const searchInput = document.getElementById('searchInput');
    const locationInput = document.getElementById('locationInput');
    
    if (searchInput && locationInput) {
        const query = searchInput.value.trim();
        const location = locationInput.value.trim();
        
        if (query || location) {
            showToast(`Ищем "${query}"${location ? ` в ${location}` : ''}`, 'info');
            // В реальном приложении здесь был бы AJAX запрос
            setTimeout(() => {
                window.location.href = `vacancies.html?search=${encodeURIComponent(query)}&location=${encodeURIComponent(location)}`;
            }, 1000);
        } else {
            showToast('Введите запрос для поиска', 'warning');
        }
    }
}

// Функции авторизации (заглушки)
function login() {
    showToast('Вход выполнен успешно!', 'success');
    closeModal('loginModal');
    // В реальном приложении здесь была бы проверка учетных данных
}

function register() {
    showToast('Регистрация прошла успешно!', 'success');
    closeModal('registerModal');
    // В реальном приложении здесь была бы отправка формы
}

function applyToJob() {
    showToast('Отклик отправлен!', 'success');
    closeModal('applyModal');
}