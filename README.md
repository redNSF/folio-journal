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
| Total lines of code | ~1,950 |
| JavaScript | ~1,100 lines |
| CSS | ~430 lines |
| HTML | ~420 lines |
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
2. Open `journal.html` in any modern browser.
3. Create an account with a display name and password.
4. Start writing.

That's it. No installation, no build step, no login server.

---

## File Structure

```
folio/
├── index.html   — Structure and markup (~29 KB)
├── style.css    — All styles and animations (~32 KB)
└── script.js     — All application logic (~52 KB)
```

All three files must stay in the same directory for relative path references to resolve.

---

## Features

### Multi-Account System

Folio supports multiple fully isolated accounts on the same device — useful for shared computers or for keeping separate journals for different areas of life.

- Each account has a **display name**, a **password**, and a unique **emoji avatar** with a matching background color
- Accounts are listed on a profile picker screen on first load
- Profile cards **glow in the emoji's own color** when hovered
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
- **Font size** — smooth slider (8–72px), number input for exact values, and quick-access preset buttons. Size applies to selected text or sets the next typing size

The toolbar autohides inactive controls, shows active state on bold/italic/underline/strike, and updates the font button label to reflect the current cursor position's font.

---

### Font Controls

The font size panel in the formatting toolbar provides three ways to set size:

| Control | Behavior |
|---------|----------|
| **Slider** | Drag to preview live, release to apply to selection |
| **Number input** | Type any value 8–72, press Enter to apply |
| **Presets** | One-click: 11, 13, 16, 20, 24, 32, 48 |

The toolbar button label updates to show the current size (e.g. `16px`). Font size applies to the selected text as a `<span>` wrapper, or sets a zero-width carrier span at the cursor position for subsequent typing.

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

Accessible from the **📄 / Ruled / Dotted** button in the formatting toolbar. Three canvas styles:

**Fresh** — Clean, unlined paper. The default.

**Ruled** — Horizontal lines spaced precisely to `font-size × 1.9` (the editor's line-height). Lines stay in perfect alignment with every text row. The spacing updates live when you change the font size. A faint vertical margin line runs down the left edge.

**Dotted** — Dot grid pattern where the dot spacing equals half the line height, keeping dots visually centered between rows of text. Also updates live with font size changes.

Both Ruled and Dotted adapt their tint color to the active theme (warm amber for Ember, muted brown for Harvest). The toolbar button label shows the current style name for at-a-glance navigation.

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

A self-contained, self-destructing writing space for brain dumps, emotional releases, or anything you need to get out without keeping a record.

**Starting a session:**
1. Click the **🔥 Vent** button in the top bar
2. A bottom sheet slides up — choose your self-destruct timer:
   - 5 minutes
   - 10 minutes
   - 15 minutes
   - 30 minutes
   - 1 hour
   - 24 hours
3. Click **🔥 Start venting**

**The editor:**
The vent editor is a full-screen page styled identically to a normal journal entry, but tinted deep crimson-amber so the context is immediately clear. It has:

- A live countdown timer that turns red and pulses in the final 60 seconds
- A **← Back** button that saves progress and exits without destroying (timer keeps running)
- A word count
- A **🔥 Burn & close** button that shakes and vibrates on hover

**Destruction:**
When the timer hits zero — or you click Burn & close — a canvas particle fire animation erupts across the screen. Flame particles rise from the bottom, embers shoot upward, a heat glow grows from the base. The content blurs, brightens, and turns to sepia like paper catching light. After ~1.4 seconds everything clears from `localStorage`. Gone permanently.

If you close the app mid-session, re-opening and clicking Vent resumes the active session with the timer still counting down. There is no way to recover a burned vent.

---

### Themes

Two themes, toggled with the 🌙 button in the top bar:

**Ember** *(default)* — Dark mode. Deep charcoal backgrounds, amber and gold accents, warm cream text. Inspired by autumn evenings and candlelight.

**Harvest** *(light)* — Light mode. Warm cream and ivory backgrounds, richer amber accents. Designed for daytime writing.

Theme transitions use the View Transitions API when available for a smooth crossfade. The selected theme persists across sessions.

---

### Import & Export

**Export:**

- **Encrypted (.jrnl)** — AES-256-GCM encrypted binary file. Only openable in Folio with the correct passphrase. Safe to store in cloud services or share.
- **Plain Text (.txt)** — Human-readable export with optional dates, entry titles, and separator lines between entries. HTML tags are stripped.

**Import:**

- **Encrypted (.jrnl)** — Requires the export passphrase. Merges entries by ID, skipping duplicates.
- **Plain Text (.txt / .md)** — Splits on blank lines; first line becomes the entry title, remainder becomes the body. Creates new entries with the current timestamp.

---

## Privacy & Security

| Concern | How Folio handles it |
|---------|----------------------|
| **Password storage** | PBKDF2-SHA256 hash only — plaintext never stored |
| **Entry encryption at rest** | Entries are stored as plain JSON in `localStorage`. Use encrypted export for sensitive backups |
| **Encrypted export** | AES-256-GCM with a random 96-bit IV per export, key derived via PBKDF2 (100,000 iterations, SHA-256) |
| **Network requests** | None — Folio makes zero network requests |
| **Analytics / tracking** | None |
| **Ads** | None |
| **Third-party scripts** | None |
| **Vent data** | Stored in a separate `localStorage` key, automatically purged on expiry, no trace after burning |

All cryptographic operations use the browser's native **Web Crypto API** (`window.crypto.subtle`).

> ⚠️ `localStorage` is accessible to JavaScript running on the same origin. Do not use Folio on a shared or untrusted browser profile without exporting and clearing data after each session.

---

## Design System

Folio uses a CSS custom property-based design token system:

```css
/* Ember theme tokens (selection) */
--bg:       #150d07    /* Page background */
--surface:  #1f1108    /* Elevated surface */
--card:     #2a1a0a    /* Card background */
--amber:    #c86010    /* Primary accent */
--gold:     #d4a030    /* Secondary accent */
--cream:    #f0e0c8    /* Primary text */
--muted:    #9a7858    /* Secondary text */
--faint:    #6a5040    /* Placeholder / disabled */
--border:   rgba(200,140,60,.2)
```

Typography uses **Patrick Hand** (loaded from Google Fonts) as the sole typeface across the entire UI — headings, body, labels, and buttons.

Animations throughout the app target the GPU-composited properties (`transform`, `opacity`, `filter`) to stay off the main thread. The sidebar collapse uses a `requestAnimationFrame` lerp loop for spring-like smoothness.

---

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Escape` | Close any open modal, pop, or overlay |
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
| View Transitions (theme switch) | Chrome 111+; graceful fallback on unsupported browsers |
| Canvas fire animation | All modern browsers |

---

*Folio is a local-first app. Your words stay on your device.*
