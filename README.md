# 🍂 Folio — Your Private Journal

> *Every leaf falls in its own time.*

Folio is a fully offline, browser-based personal journal with zero server dependencies. Everything lives in your browser's `localStorage` — no accounts, no cloud, no tracking. Write, reflect, and vent in a space that belongs entirely to you.

---

## Table of Contents

- [Overview](#overview)
- [Getting Started](#getting-started)
- [File Structure](#file-structure)
- [Features](#features)
  - [Multi-Account System](#multi-account-system)
  - [Rich Text Editor](#rich-text-editor)
  - [Font Controls](#font-controls)
  - [Mood Tracker](#mood-tracker)
  - [Page Styles](#page-styles)
  - [Writing Streaks](#writing-streaks)
  - [Vent Mode](#vent-mode)
  - [Themes](#themes)
  - [Import & Export](#import--export)
- [Privacy & Security](#privacy--security)
- [Design System](#design-system)
- [Keyboard Shortcuts](#keyboard-shortcuts)
- [Browser Compatibility](#browser-compatibility)

---

## Overview

Folio is a single-page application built with vanilla HTML, CSS, and JavaScript — no frameworks, no build tools, no dependencies. It runs entirely in the browser using the Web Crypto API for encryption and `localStorage` for persistence.

| Stat | Value |
|------|-------|
| Total lines of code | ~2,050 |
| JavaScript | ~1,115 lines |
| CSS | ~505 lines |
| HTML | ~430 lines |
| External dependencies | **None** |
| Server required | **No** |
| Internet required | **No** |

---

## Getting Started

1. Download the three files and place them in the same folder:
   ```
   index.html
   style.css
   script.js
   ```
2. Open `index.html` in any modern browser.
3. Create an account with a display name and password.
4. Start writing.

That's it. No installation, no build step, no login server.

---

## File Structure

```
folio/
├── index.html   — Structure and markup (~430 lines)
├── style.css    — All styles and animations (~505 lines)
└── script.js    — All application logic (~1,115 lines)
```

All three files must stay in the same directory for relative path references to resolve.

---

## Features

### Multi-Account System

Folio supports multiple fully isolated accounts on the same device — useful for shared computers or for keeping separate journals for different areas of life.

- Each account has a **display name**, a **password**, and a unique **emoji avatar** with a matching background color
- Accounts are listed on a profile picker screen on first load
- Profile cards **glow in the emoji's own color** when hovered — each avatar has a distinct glow tint (fox, owl, maple, moon, bear, autumn, leaf, star, peacock)
- Passwords are hashed with **PBKDF2 + SHA-256** before being stored — the plaintext password is never saved
- Each account's entries are stored independently under a unique key

---

### Rich Text Editor

The editor mirrors the feel of a native writing app:

- **Bold**, *Italic*, <u>Underline</u>, ~~Strikethrough~~
- **Headings** — H1 and H2
- **Blockquotes**
- **Ordered and unordered lists**
- **Text color** — 12 preset swatches plus full custom color picker
- **Highlight color** — 8 highlight options including a clear option
- **Font family** — detects your locally installed fonts via `queryLocalFonts()` API (Chrome 103+) with a canvas-based fallback that tests ~70 common fonts. Fonts are listed with live previews in their own typeface
- **Font size** — smooth slider (8–72px), number input for exact values, and quick-access preset buttons

The toolbar shows active state on bold/italic/underline/strike and updates the font button label to reflect the current cursor position's font. All toolbar buttons use `preventDefault` on `mousedown` so focus never leaves the editor while changing formatting.

---

### Font Controls

The font size panel in the formatting toolbar provides three ways to set size:

| Control | Behavior |
|---------|----------|
| **Slider** | Drag to preview live, release to apply to selection |
| **Number input** | Type any value 8–72, press Enter to apply |
| **Presets** | One-click: 11, 13, 16, 20, 24, 32, 48 |

Font size applies to **selected text only** as a `<span>` wrapper. With no selection, a sized carrier span is inserted at the cursor so the next keystrokes type at that size — without changing any other text in the entry. The toolbar size button label always reflects the chosen size (e.g. `16px`).

---

### Mood Tracker

A row of 10 mood buttons sits above each entry's title:

| Emoji | Mood |
|-------|------|
| 😊 | Happy |
| 😌 | Calm |
| 😔 | Sad |
| 😤 | Frustrated |
| 😰 | Anxious |
| 🤩 | Excited |
| 😴 | Tired |
| 🥰 | Grateful |
| 🔥 | Motivated |
| 🌧️ | Melancholy |

- Clicking a mood tags the current entry; clicking again removes it
- The editor background gets a **subtle color tint** matching the selected mood
- Selected entries show their mood emoji as a small badge in the sidebar list
- The **28-day streak calendar** also shows a mood emoji in each day cell, giving a visual emotional timeline across the month

---

### Page Styles

Accessible from the **📄** button in the formatting toolbar. The button displays the current style name underneath the icon for at-a-glance navigation. Three canvas styles:

**Fresh** — Clean, unlined paper. The default.

**Ruled** — Horizontal lines at a fixed spacing with a faint vertical margin line running down the left edge. Line color adapts to the active theme.

**Dotted** — Dot grid pattern. Dot color adapts to the active theme.

Selection persists across sessions. The toolbar button label updates live to show **Fresh**, **Ruled**, or **Dotted**.

---

### Writing Streaks

The 🔥 streak pill in the top bar tracks your consistency:

- **Current streak** — consecutive days with at least one entry, counting today or yesterday as the most recent
- **Longest streak** — best consecutive run across all time
- **Total writing days** — unique calendar dates with entries
- **Total entries** — lifetime entry count

Clicking the pill opens a tooltip panel with full stats and a **28-day heatmap calendar**:

- Each day is a colored square with 5 intensity levels based on word count relative to the highest day in the window
- Darker amber = more words written
- Hover any square for a tooltip showing the date and exact word count
- Today is outlined in gold
- Below the heatmap, a **mood calendar** shows the emoji logged for each day

---

### Vent Mode

A self-contained, self-destructing writing space for brain dumps, emotional releases, or anything you need to get out without keeping a record. Accessed via the **🔥 Vent** button in the top bar.

**Starting a session:**

A bottom sheet slides up with a spring animation. Choose your self-destruct timer:

| Option | Option |
|--------|--------|
| 5 minutes | 10 minutes |
| 15 minutes | 30 minutes |
| 1 hour | 24 hours |

Click **🔥 Start venting** — the button glows with a pulsing crimson aura and lifts on hover.

**The editor:**

The vent editor slides in from the right as a full-screen page styled identically to a normal journal entry — same title input, same body area — but tinted deep crimson-amber so the context is immediately clear. The topbar includes:

- A live countdown timer (switches to `MM:SS` under one hour, turns red and pulses in the final 60 seconds)
- A **← Back** button that saves progress and exits without destroying (timer keeps running in background)
- Word count display
- A **🔥 Burn & close** button that shakes and vibrates on hover

**Destruction:**

When the timer hits zero — or you click Burn & close — a full-screen canvas particle fire animation erupts:

- Flame petals rise from the bottom upward in a wave
- Tiny ember sparks shoot upward and fade
- A heat glow grows from the base as fire spreads
- The page content simultaneously blurs, brightens, and turns sepia like burning paper

After ~1.4 seconds everything is cleared from `localStorage`. Gone permanently. A toast notification confirms it.

If you close the app mid-session, re-opening and clicking Vent resumes the active session with the timer still counting down. There is no way to recover a burned vent.

---

### Themes

8 themes accessible from the theme button in the top bar. The button shows the current theme icon and name underneath it. Clicking opens a **4×2 theme picker grid** with color swatch previews (left half = background, right half = accent color). Theme transitions use the View Transitions API for an animated radial crossfade from the click point.

| Theme | Character |
|-------|-----------|
| 🌙 **Ember** | Dark warm amber — autumn evenings, candlelight *(default)* |
| ☀️ **Harvest** | Light cream and ivory — warm daytime paper *(light)* |
| 🌊 **Ocean** | Deep midnight sea, bioluminescent teal accents |
| ✨ **Midnight** | Near-absolute black, cool silver-blue stars |
| 🌿 **Forest** | Dark pine black-green, soft moss glow |
| 🌸 **Rosewood** | Aged dark wood, warm rose-gold accents |
| 🪨 **Slate** | Overcast cool grey with ice-blue accents *(light)* |
| 🌆 **Dusk** | Deep violet-black sky, burnt orange horizon |

Each theme defines a full token set covering backgrounds, surfaces, borders, accents, text colors, editor gradient blobs, and toolbar blur tint. Every UI element — login screen, sidebar, editor, modals, tooltips, and vent mode — adapts fully to the active theme. Selection persists across sessions.

---

### Import & Export

**Export:**

- **Encrypted (.jrnl)** — AES-256-GCM encrypted binary file. Only openable in Folio with the correct passphrase. Safe to store in cloud services or share.
- **Plain Text (.txt)** — Human-readable export with optional dates, entry titles, and separator lines. HTML tags are stripped.

**Import:**

- **Encrypted (.jrnl)** — Requires the export passphrase. Merges entries by ID, skipping duplicates.
- **Plain Text (.txt / .md)** — Splits on blank lines; first line becomes the entry title, remainder becomes the body. Creates new entries with the current timestamp.

---

## Privacy & Security

| Concern | How Folio handles it |
|---------|----------------------|
| **Password storage** | PBKDF2-SHA256 hash only — plaintext never stored |
| **Entry encryption at rest** | Entries stored as plain JSON in `localStorage`. Use encrypted export for sensitive backups |
| **Encrypted export** | AES-256-GCM with a random 96-bit IV per export, key derived via PBKDF2 (250,000 iterations, SHA-256) |
| **Network requests** | None — Folio makes zero network requests |
| **Analytics / tracking** | None |
| **Ads** | None |
| **Third-party scripts** | None |
| **Vent data** | Stored in a separate `localStorage` key, automatically purged on expiry, no trace after burning |

All cryptographic operations use the browser's native **Web Crypto API** (`window.crypto.subtle`).

> ⚠️ `localStorage` is accessible to JavaScript running on the same origin. Do not use Folio on a shared or untrusted browser profile without exporting and clearing data after each session.

---

## Design System

Folio uses a CSS custom property-based design token system. Every theme defines the full set:

```css
--bg          /* Page background */
--surface     /* Elevated surface (sidebar, topbar) */
--card        /* Card / modal background */
--card-hover  /* Card hover state */
--border      /* Border color */
--bs          /* Subtle border / separator */
--gold        /* Secondary accent */
--amber       /* Primary accent (buttons, highlights) */
--orange      /* Warm accent variant */
--cream       /* Primary text */
--muted       /* Secondary text */
--faint       /* Placeholder / disabled */
--tbg         /* Toolbar backdrop blur tint */
--eg1, --eg2  /* Editor background gradient blobs */
```

Typography uses **Patrick Hand** (loaded from Google Fonts) as the sole typeface across the entire UI — headings, body, labels, and buttons.

Animations target GPU-composited properties (`transform`, `opacity`, `filter`) throughout. The sidebar collapse uses a `requestAnimationFrame` lerp loop for spring-like motion. Theme transitions use the native View Transitions API with a radial clip-path reveal from the click origin.

---

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Escape` | Close any open modal, pop, sheet, or overlay |
| `Ctrl/Cmd + B` | Bold |
| `Ctrl/Cmd + I` | Italic |
| `Ctrl/Cmd + U` | Underline |

---

## Browser Compatibility

| Feature | Requirement |
|---------|-------------|
| Core app | Any modern browser (Chrome 90+, Firefox 90+, Safari 15+, Edge 90+) |
| AES-256 encryption | Web Crypto API — all modern browsers |
| Local font detection | `queryLocalFonts()` — Chrome 103+ only; canvas fallback for all others |
| View Transitions (theme switch) | Chrome 111+; graceful opacity-fade fallback on unsupported browsers |
| Canvas fire animation | All modern browsers |

---

*Folio is a local-first app. Your words stay on your device.*
