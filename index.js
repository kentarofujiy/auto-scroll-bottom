import { eventSource, event_types } from '../../../../script.js';

const MODULE_NAME = 'auto-scroll-bottom';

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

function initialize() {
    if (state.initialized) {
        return;
    }

    state.initialized = true;

    eventSource.on(event_types.USER_MESSAGE_RENDERED, scrollChatToBottom);
    eventSource.on(event_types.CHARACTER_MESSAGE_RENDERED, scrollChatToBottom);
    eventSource.on(event_types.CHAT_LOADED, scrollChatToBottom);

    console.log(`[${MODULE_NAME}] Extension loaded`);
}

eventSource.on(event_types.APP_READY, () => void initialize());
void initialize();
