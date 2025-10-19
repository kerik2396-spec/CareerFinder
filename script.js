// Базовый JavaScript для функциональности
console.log('CareerFinder loaded');

// Темная тема
const themeToggle = document.createElement('button');
themeToggle.textContent = '🌙';
themeToggle.className = 'btn';
themeToggle.style.marginLeft = '10px';

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    themeToggle.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
});

document.querySelector('.controls').appendChild(themeToggle);