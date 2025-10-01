// Альтернативные варианты современных иконок для статусов задач
// Можно легко переключаться между вариантами

const IconVariants = {
    // Вариант 1: Минималистичные SVG иконки (текущий)
    variant1: {
        done: `<svg class="status-icon" width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="7" cy="7" r="6" stroke="#5EEAD4" stroke-width="1.5"/>
            <path d="M4 7L6 9L10 5" stroke="#5EEAD4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`,
        
        progress: `<svg class="status-icon status-icon-progress" width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="7" cy="7" r="6" stroke="#FBBF24" stroke-width="1.5" stroke-dasharray="28" stroke-dashoffset="7" stroke-linecap="round">
                <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="0 7 7"
                    to="360 7 7"
                    dur="2s"
                    repeatCount="indefinite"/>
            </circle>
            <circle cx="7" cy="7" r="2.5" fill="#FBBF24"/>
        </svg>`,
        
        planned: `<svg class="status-icon" width="14" height="14" viewBox="0 0 14 14" fill="none">
            <rect x="2" y="2" width="10" height="10" rx="2" stroke="#A78BFA" stroke-width="1.5"/>
            <circle cx="5" cy="5" r="1" fill="#A78BFA"/>
            <line x1="8" y1="5" x2="10" y2="5" stroke="#A78BFA" stroke-width="1" stroke-linecap="round"/>
            <line x1="4" y1="9" x2="10" y2="9" stroke="#A78BFA" stroke-width="1" stroke-linecap="round"/>
        </svg>`
    },
    
    // Вариант 2: Геометрические формы
    variant2: {
        done: `<svg class="status-icon" width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 1L13 7L7 13L1 7L7 1Z" fill="#5EEAD4" opacity="0.2"/>
            <path d="M4.5 7L6 8.5L9.5 5" stroke="#5EEAD4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`,
        
        progress: `<svg class="status-icon" width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="7" cy="7" r="6" fill="#FBBF24" opacity="0.2"/>
            <path d="M7 4V7L9 9" stroke="#FBBF24" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`,
        
        planned: `<svg class="status-icon" width="14" height="14" viewBox="0 0 14 14" fill="none">
            <rect x="2" y="2" width="10" height="10" rx="1" fill="#A78BFA" opacity="0.2"/>
            <rect x="5" y="5" width="4" height="1" fill="#A78BFA"/>
            <rect x="5" y="8" width="4" height="1" fill="#A78BFA"/>
        </svg>`
    },
    
    // Вариант 3: Точки и линии (ультра-минималистичный)
    variant3: {
        done: `<svg class="status-icon" width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="7" cy="7" r="6" stroke="#5EEAD4" stroke-width="1" opacity="0.3"/>
            <circle cx="7" cy="7" r="3" fill="#5EEAD4"/>
        </svg>`,
        
        progress: `<svg class="status-icon" width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="4" cy="7" r="1.5" fill="#FBBF24" opacity="0.3"/>
            <circle cx="7" cy="7" r="1.5" fill="#FBBF24" opacity="0.6"/>
            <circle cx="10" cy="7" r="1.5" fill="#FBBF24"/>
        </svg>`,
        
        planned: `<svg class="status-icon" width="14" height="14" viewBox="0 0 14 14" fill="none">
            <line x1="3" y1="4" x2="11" y2="4" stroke="#A78BFA" stroke-width="1.5" stroke-linecap="round"/>
            <line x1="3" y1="7" x2="11" y2="7" stroke="#A78BFA" stroke-width="1.5" stroke-linecap="round" opacity="0.6"/>
            <line x1="3" y1="10" x2="11" y2="10" stroke="#A78BFA" stroke-width="1.5" stroke-linecap="round" opacity="0.3"/>
        </svg>`
    },
    
    // Вариант 4: Современные Unicode символы (без SVG)
    variant4: {
        done: '<span class="status-icon-unicode" style="color: #5EEAD4;">◉</span>',
        progress: '<span class="status-icon-unicode" style="color: #FBBF24;">◈</span>',
        planned: '<span class="status-icon-unicode" style="color: #A78BFA;">▣</span>'
    },
    
    // Вариант 5: CSS-only иконки
    variant5: {
        done: '<span class="status-icon-css done-icon"></span>',
        progress: '<span class="status-icon-css progress-icon"></span>',
        planned: '<span class="status-icon-css planned-icon"></span>'
    }
};

// Функция для применения выбранного варианта иконок
function applyIconVariant(variantName = 'variant1') {
    const variant = IconVariants[variantName];
    
    if (!variant) {
        console.error('Icon variant not found:', variantName);
        return;
    }
    
    // Обновляем функцию groupTasksByStatus
    window.getStatusIcon = function(status) {
        switch(status) {
            case 'done': return variant.done;
            case 'progress': return variant.progress;
            case 'planned': return variant.planned;
            default: return '';
        }
    };
}

// CSS стили для variant5 (CSS-only иконки)
const cssOnlyStyles = `
<style>
.status-icon-css {
    display: inline-block;
    width: 14px;
    height: 14px;
    position: relative;
    margin-right: 0.4rem;
}

.done-icon::before {
    content: '';
    position: absolute;
    width: 12px;
    height: 12px;
    border: 1.5px solid #5EEAD4;
    border-radius: 50%;
    top: 0;
    left: 0;
}

.done-icon::after {
    content: '';
    position: absolute;
    width: 3px;
    height: 6px;
    border: solid #5EEAD4;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
    top: 2px;
    left: 4px;
}

.progress-icon::before {
    content: '';
    position: absolute;
    width: 12px;
    height: 12px;
    border: 1.5px solid #FBBF24;
    border-radius: 50%;
    border-top-color: transparent;
    animation: rotate 1s linear infinite;
    top: 0;
    left: 0;
}

.progress-icon::after {
    content: '';
    position: absolute;
    width: 4px;
    height: 4px;
    background: #FBBF24;
    border-radius: 50%;
    top: 4px;
    left: 4px;
}

@keyframes rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}

.planned-icon::before {
    content: '';
    position: absolute;
    width: 12px;
    height: 12px;
    border: 1.5px solid #A78BFA;
    border-radius: 2px;
    top: 0;
    left: 0;
}

.planned-icon::after {
    content: '';
    position: absolute;
    width: 6px;
    height: 1px;
    background: #A78BFA;
    top: 5px;
    left: 3px;
    box-shadow: 0 3px 0 #A78BFA;
}

.status-icon-unicode {
    font-size: 14px;
    line-height: 1;
    vertical-align: middle;
}
</style>
`;

// Экспорт для использования в основном скрипте
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { IconVariants, applyIconVariant, cssOnlyStyles };
}