document.addEventListener('DOMContentLoaded', function() {
    // --- 1. Логіка випадаючих меню (ваш код) ---
    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        if (toggle) {
            toggle.addEventListener('click', (e) => {
                e.stopPropagation();
                dropdowns.forEach(d => { if(d !== dropdown) d.classList.remove('active'); });
                dropdown.classList.toggle('active');
            });
        }
    });

    window.addEventListener('click', () => {
        dropdowns.forEach(d => d.classList.remove('active'));
    });

    // --- 2. Логіка вкладок за посиланням (#) ---
    const hash = window.location.hash; // Отримуємо #prozorro тощо
    if (hash) {
        const tabId = hash.replace('#', '');
        // Шукаємо кнопку, яка має функцію openTab з цим ID
        const targetButton = document.querySelector(`button[onclick*="'${tabId}'"]`);
        
        if (targetButton) {
            // Викликаємо функцію openTab (вона має бути доступна глобально)
            targetButton.click();
            
            // Плавна прокрутка до блоку вкладок, щоб користувач не загубився
            setTimeout(() => {
                targetButton.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        }
    }
});

/**
 * Функція перемикання вкладок
 * Виправлено: тепер при переході на вкладку автоматично показуються всі елементи в ній
 */
function openTab(evt, tabName) {
    let i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tab-btn");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    
    const activeTab = document.getElementById(tabName);
    activeTab.style.display = "block";
    evt.currentTarget.className += " active";

    // Скидання фільтрів у відкритій вкладці: показуємо все та активуємо кнопку "Всі"
    const items = activeTab.querySelectorAll('.archive-item');
    items.forEach(item => {
        item.style.display = 'grid'; 
    });

    const tags = activeTab.querySelectorAll('.year-tags .tag');
    tags.forEach(tag => {
        if (tag.textContent.trim() === "Всі") {
            tag.classList.add('active');
        } else {
            tag.classList.remove('active');
        }
    });
}

/**
 * Універсальна фільтрація за роками
 * Виправлено: фільтрує тільки ті елементи, що знаходяться в поточному контексті (вкладці або сторінці)
 */
function filterByYear(element, year) {
    // 1. Шукаємо контейнер, у якому лежать наші картки (або вкладка, або весь main)
    const container = element.closest('.tab-content') || element.closest('main');
    
    // 2. Керування візуальним виглядом тегів тільки в межах цього контейнера
    const tags = container.querySelectorAll('.year-tags .tag');
    tags.forEach(tag => tag.classList.remove('active'));
    element.classList.add('active');

    // 3. Логіка фільтрації карток тільки в цьому контейнері
    const items = container.querySelectorAll('.archive-item');
    
    items.forEach(item => {
        const itemYear = item.getAttribute('data-year');
        
        if (year === 'all' || itemYear === year) {
            item.style.display = 'grid'; 
        } else {
            item.style.display = 'none'; 
        }
    });
}


// Зберігаємо поточний стан фільтрів
let currentFilters = {
    year: 'all',
    type: 'all'
};

function filterBooks(event, filterType, value) {
    event.preventDefault();

    // 1. Оновлюємо стан
    currentFilters[filterType] = value;

    // 2. Візуальне перемикання кнопок
    const parent = event.currentTarget.parentElement;
    parent.querySelectorAll('.tag, .badge-btn').forEach(el => el.classList.remove('active'));
    event.currentTarget.classList.add('active');

    // 3. Сама фільтрація
    const books = document.querySelectorAll('.archive-item');
    
    books.forEach(book => {
        const matchesYear = currentFilters.year === 'all' || book.getAttribute('data-year') === currentFilters.year;
        const matchesType = currentFilters.type === 'all' || book.getAttribute('data-type') === currentFilters.type;

        if (matchesYear && matchesType) {
            book.style.display = 'flex'; // або 'grid', залежно від вашої верстки card
        } else {
            book.style.display = 'none';
        }
    });
}

function filterPhd(element, year) {
    // Зміна активного класу на тегах
    document.querySelectorAll('.year-tags .tag').forEach(tag => tag.classList.remove('active'));
    element.classList.add('active');

    // Фільтрація карток
    const cards = document.querySelectorAll('.phd-card-teaser');
    cards.forEach(card => {
        if (year === 'all' || card.getAttribute('data-year') === year) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}


function openRmvTab(evt, tabName) {
    // 1. Оголошуємо змінні
    var i, tabcontent, tablinks;

    // 2. Ховаємо всі елементи з класом "tab-content"
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
        tabcontent[i].classList.remove("active");
    }

    // 3. Прибираємо клас "active" з усіх кнопок
    tablinks = document.getElementsByClassName("tab-btn");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // 4. Показуємо поточну вкладку та додаємо клас "active" кнопці, яка її відкрила
    const currentTab = document.getElementById(tabName);
    currentTab.style.display = "block";
    
    // Невелика затримка для спрацювання CSS-анімації fadeIn
    setTimeout(() => {
        currentTab.classList.add("active");
    }, 10);
    
    evt.currentTarget.className += " active";

const activeBtn = document.querySelector(`button[onclick*="'${tabName}'"]`);
    if (activeBtn) {
        activeBtn.classList.add("active");
    }
}
// --- ФУНКЦІЯ КОПІЮВАННЯ ПОСИЛАННЯ ДЛЯ ЗВІТУ ---
function copyLink(id) {
    // Беремо адресу без існуючих якорів і додаємо новий ID
    const baseUrl = window.location.href.split('#')[0];
    const fullUrl = baseUrl + '#' + id;
    
    navigator.clipboard.writeText(fullUrl).then(() => {
        alert('Посилання на доповідь скопійовано для звіту!');
    }).catch(err => {
        console.error('Помилка копіювання: ', err);
    });
}

// --- АВТОМАТИЧНИЙ ПЕРЕХІД ДО ЕЛЕМЕНТА ПРИ ЗАВАНТАЖЕННІ (Anchor Handling) ---
function handleAnchor() {
    const hash = window.location.hash; 
    if (!hash) return;

    const targetId = hash.replace('#', '');
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
        // Шукаємо, чи цей елемент лежить всередині якоїсь вкладки
        const parentTab = targetElement.closest('.tab-content');
        
        if (parentTab) {
            const tabId = parentTab.id;
            // Знаходимо кнопку, яка активує цю вкладку (пошук за атрибутом onclick)
            const targetButton = document.querySelector(`button[onclick*="'${tabId}'"]`);
            
            if (targetButton) {
                targetButton.click(); // Відкриваємо вкладку через існуючу функцію
                
                // Прокручуємо до конкретного семінару з невеликою затримкою, поки вкладка з'явиться
                setTimeout(() => {
                    targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    // Візуальний акцент (підсвічування)
                    targetElement.style.transition = 'background-color 0.5s';
                    targetElement.style.backgroundColor = '#fff9c4'; 
                    setTimeout(() => targetElement.style.backgroundColor = '', 2500);
                }, 400);
            }
        }
    }
}

// Додаємо виклик обробника до існуючого слухача DOMContentLoaded
document.addEventListener('DOMContentLoaded', handleAnchor);