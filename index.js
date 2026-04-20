import { eventSource, event_types } from '../../../../script.js';

const MODULE_NAME = 'auto-scroll-bottom';
const MENU_BUTTON_ID = 'auto_scroll_bottom_menu_button';

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

    console.log(`[${MODULE_NAME}] Extension loaded`);
}

eventSource.on(event_types.APP_READY, () => void initialize());
void initialize();
