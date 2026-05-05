import { eventSource, event_types } from '../../../../script.js';
import { isMobile } from '../../../RossAscends-mods.js';

const MODULE_NAME = 'auto-scroll-bottom';
const MENU_BUTTON_ID = 'auto_scroll_bottom_menu_button';
const FLOATING_BUTTON_ID = 'auto_scroll_bottom_floating_button';

const state = {
    initialized: false,
};

function scrollChatToBottom() {
    const chat = document.getElementById('chat');

    if (!(chat instanceof HTMLElement)) {
        return;
    }

    requestAnimationFrame(() => {
        chat.scrollTop = chat.scrollHeight;
    });
}

function createFloatingButton() {
    // Only create for mobile devices
    if (!isMobile()) {
        return;
    }

    if (document.getElementById(FLOATING_BUTTON_ID)) {
        return;
    }

    const button = document.createElement('button');
    button.id = FLOATING_BUTTON_ID;
    button.type = 'button';
    button.innerHTML = '<i class="fa-solid fa-angles-down"></i>';
    button.title = 'Scroll to bottom';
    button.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        scrollChatToBottom();
    });

    // Style the floating button inline
    Object.assign(button.style, {
        position: 'absolute',
        bottom: '12px',
        right: '12px',
        zIndex: '100',
        width: '44px',
        height: '44px',
        borderRadius: '50%',
        border: '1px solid var(--SmartThemeBorderColor)',
        backgroundColor: 'var(--SmartThemeBlurTintColor)',
        backdropFilter: 'blur(var(--SmartThemeBlurStrength))',
        WebkitBackdropFilter: 'blur(var(--SmartThemeBlurStrength))',
        color: 'var(--SmartThemeBodyColor)',
        fontSize: '18px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        opacity: '0.7',
        transition: 'opacity var(--animation-duration) ease',
        boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
        pointerEvents: 'auto',
    });

    button.addEventListener('mouseenter', () => { button.style.opacity = '1'; });
    button.addEventListener('mouseleave', () => { button.style.opacity = '0.7'; });

    // Attach to #chat since it has position: relative
    const chat = document.getElementById('chat');
    if (chat instanceof HTMLElement) {
        chat.appendChild(button);
        console.log(`[${MODULE_NAME}] Floating mobile scroll button added`);
    }
}

function insertMenuButton() {
    const menu = document.getElementById('extensionsMenu');

    if (!(menu instanceof HTMLElement) || document.getElementById(MENU_BUTTON_ID)) {
        return;
    }

    const button = document.createElement('div');
    button.id = MENU_BUTTON_ID;
    button.className = 'list-group-item flex-container flexGap5';
    button.innerHTML = '<div class="fa-solid fa-arrow-down extensionsMenuExtensionButton"></div><span>Scroll Chat to Bottom</span>';
    button.addEventListener('click', scrollChatToBottom);
    menu.appendChild(button);
}

function initialize() {
    if (state.initialized) {
        insertMenuButton();
        return;
    }

    state.initialized = true;

    eventSource.on(event_types.USER_MESSAGE_RENDERED, scrollChatToBottom);
    eventSource.on(event_types.CHARACTER_MESSAGE_RENDERED, scrollChatToBottom);
    eventSource.on(event_types.CHAT_LOADED, scrollChatToBottom);
    insertMenuButton();
    createFloatingButton();

    console.log(`[${MODULE_NAME}] Extension loaded`);
}

eventSource.on(event_types.APP_READY, () => {
    createFloatingButton();
    initialize();
});
void initialize();
