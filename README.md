# Auto Scroll to Bottom

A SillyTavern extension that automatically scrolls the chat to the bottom whenever new messages are rendered or a chat is loaded.

## Features

- **Auto-scroll on new messages** — Chat automatically scrolls to the bottom when user or character messages are rendered
- **Auto-scroll on chat load** — Chat scrolls to the bottom when a conversation is loaded
- **Manual scroll button** — Adds a "Scroll Chat to Bottom" button to the Extensions menu (wand icon) for manual triggering
- **Mobile floating button** — On mobile/tablet devices, a circular floating button appears over the chat area for easy one-tap scrolling
- **Smooth scrolling** — Uses `requestAnimationFrame` for performant, jank-free scrolling

## How It Works

The extension listens to three SillyTavern events:

| Event | Trigger |
|-------|---------|
| `USER_MESSAGE_RENDERED` | After a user message appears in the chat |
| `CHARACTER_MESSAGE_RENDERED` | After an AI character message appears in the chat |
| `CHAT_LOADED` | When a chat conversation is loaded |

When any of these events fire, the extension scrolls the `#chat` element to its bottom.

Additionally, a menu button is inserted into the Extensions dropdown (`#extensionsMenu`) that lets you manually trigger the scroll at any time.

## Files

| File | Purpose |
|------|---------|
| `manifest.json` | Extension metadata (name, version, loading order, etc.) |
| `index.js` | Extension logic — event listeners, menu button, and mobile floating button |

## Manifest

```json
{
    "display_name": "Auto Scroll to Bottom",
    "loading_order": 22,
    "requires": [],
    "optional": [],
    "js": "index.js",
    "author": "GitHub Copilot",
    "version": "0.2.0",
    "homePage": "https://github.com/SillyTavern/SillyTavern"
}
```

## Mobile Floating Button

On mobile and tablet devices, a circular floating button (⏷) appears at the bottom-right of the chat area. Tapping it instantly scrolls to the bottom — no need to open the Extensions menu.

The button uses the SillyTavern theme's colors (`--SmartThemeBlurTintColor`, `--SmartThemeBorderColor`, etc.) and features a frosted-glass blur effect. It is only shown on touch/mobile devices as detected by the `isMobile()` utility in `RossAscends-mods.js`.

## Installation

This extension is bundled with SillyTavern. To enable it:

1. Open the Extensions panel (wand icon in the chat bar)
2. Find "Auto Scroll to Bottom" under **Installed Extensions**
3. Toggle it on

## Compatibility

- **SillyTavern:** All recent versions
- **Dependencies:** None
- **Extras API modules:** None required

## License

This extension is part of the SillyTavern project and is licensed under AGPL-3.0.
