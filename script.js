/**
 * Основной скрипт для сайта группы ВечерОК
 * Обрабатывает динамическое отображение ежедневных размышлений
 */

// Названия месяцев на русском языке
const monthNames = [
    'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
    'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
];

const dayNames = [
    'Воскресенье', 'Понедельник', 'Вторник', 'Среда',
    'Четверг', 'Пятница', 'Суббота'
];

/**
 * Форматирует дату на русском языке
 * @param {Date} date - объект Date
 * @returns {string} - форматированная дата
 */
function formatDate(date) {
    const dayName = dayNames[date.getDay()];
    const day = date.getDate();
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();

    return `${dayName}, ${day} ${month} ${year} г.`;
}

/**
 * Загружает и отображает размышление дня
 */
function loadJustForToday() {
    const today = new Date();
    const month = today.getMonth() + 1; // getMonth() возвращает 0-11
    const day = today.getDate();

    // Получаем данные для текущей даты
    const jftEntry = getJFTByDate(month, day);

    // Обновляем дату
    const dateElement = document.getElementById('current-date');
    if (dateElement) {
        dateElement.textContent = formatDate(today);
    }

    // Обновляем заголовок
    const titleElement = document.getElementById('jft-title');
    if (titleElement) {
        titleElement.textContent = jftEntry.title;
    }

    // Обновляем цитату
    const quoteElement = document.getElementById('jft-quote');
    if (quoteElement) {
        quoteElement.textContent = `"${jftEntry.quote}"`;
    }

    // Обновляем основной текст
    const textElement = document.getElementById('jft-text');
    if (textElement) {
        // Разбиваем текст на параграфы
        const paragraphs = jftEntry.text.split('\n\n');
        textElement.innerHTML = paragraphs
            .map(p => `<p>${p}</p>`)
            .join('');
    }

    // Обновляем мысль на день
    const thoughtElement = document.getElementById('jft-daily-thought');
    if (thoughtElement) {
        thoughtElement.textContent = jftEntry.thought;
    }
}

/**
 * Плавная прокрутка для якорных ссылок
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));

            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Добавляет простую анимацию появления при прокрутке
 */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Применяем к секциям
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
}

/**
 * Обработчик загрузки страницы
 */
function initializePage() {
    // Загружаем размышление дня
    loadJustForToday();

    // Инициализируем плавную прокрутку
    initSmoothScroll();

    // Инициализируем анимации (опционально)
    // Раскомментируйте следующую строку, если хотите добавить анимации появления
    // initScrollAnimations();

    console.log('Сайт группы ВечерОК загружен успешно');
}

// Запускаем инициализацию при загрузке DOM
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializePage);
} else {
    initializePage();
}

/**
 * Обновление времени до следующего собрания (опционально)
 * Можно раскомментировать, если нужен таймер обратного отсчета
 */
/*
function updateTimeUntilMeeting() {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 20, 0, 0);

    // Если сегодня уже прошло 20:00, показываем время до завтрашнего собрания
    if (now > today) {
        today.setDate(today.getDate() + 1);
    }

    const diff = today - now;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    return `До следующего собрания: ${hours} ч ${minutes} мин`;
}
*/
