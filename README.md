# 🚀 Athithyan S - Monochrome Brutalist Portfolio

A highly creative, premium developer portfolio website designed with a **Monochrome Brutalist** aesthetic, featuring selective **Red highlights**, retro cybernetic navigation drawers, an interactive terminal dashboard, and a **Three.js 3D Rocky Land Landscape** background.

---

## 🎨 Key Features

1. **Three.js 3D Rocky Land Background**: A continuous 3D low-poly wireframe mountain landscape that sways, bobs, and reacts to mouse movements (3D parallax depth), dynamically shifting colors between dark and light themes.
2. **Tactile Outset Buttons**: Skeuomorphic, mechanical-keyboard style buttons that visually depress upon clicking.
3. **Cyber-Console Cursor**: A custom dual-element trailing red cursor with interactive hover scales and click compression animations.
4. **Retro Terminal Console**: Interactive CRT terminal view showing dev status, custom skill metrics, and a retro phosphor scanline flicker overlay.
5. **Interactive Skill Filtering**: Clicking skill badges filters the corresponding projects in real-time.
6. **Project Case Study Modals**: Complete project descriptions and direct links for 6 major repositories.

---

## 📁 File Structure

- `index.html` - Structural layout, HTML5 semantic elements, and Three.js CDN loader.
- `style.css` - Custom design tokens, typography, grid overlays, CRT filters, button mechanics, and theme toggling styles.
- `script.js` - Three.js WebGL rendering loop, noise displacement calculations, theme toggles, cursor event listeners, and case study modal triggers.

---

## ⚡ Hosting on Firebase

Follow these steps to host this portfolio on Firebase Hosting:

### Prerequisites
Make sure you have Node.js installed on your computer.

### Step 1: Install Firebase CLI
Open your terminal (Command Prompt, PowerShell, or Bash) and install the Firebase CLI globally:
```bash
npm install -g firebase-tools
```

### Step 2: Log In to Firebase
Authenticate the CLI tool with your Firebase account:
```bash
firebase login
```
*This will open a browser window for you to log in with your Google account.*

### Step 3: Initialize Firebase Hosting
In the root directory of your portfolio codebase (`c:\Users\Athithyan\OneDrive\Desktop\portfolio`), run:
```bash
firebase init hosting
```

During initialization, configure the prompt questions as follows:
1. **Project Setup**: Choose **"Create a new project"** (or select an existing Firebase project).
2. **Public Directory**: Type `.` (dot) and press Enter. This deploys the current folder containing `index.html`, `style.css`, and `script.js`.
3. **Single-Page App**: Type `N` (No) and press Enter (we do not need to rewrite all URLs to `/index.html`).
4. **GitHub Deployments**: Type `N` (No) and press Enter.
5. **File Overwrite**: If it warns that `index.html` already exists, type `N` (No) so it **does not overwrite** your portfolio file!

This will generate two files in your directory: `.firebaserc` and `firebase.json`.

### Step 4: Deploy Your Site
To push your local files live to Firebase Hosting:
```bash
firebase deploy
```

Once completed, the terminal will print a **Hosting URL** (e.g., `https://your-project-id.web.app`) where your portfolio is live!

---

## 💻 Local Development
To run this project locally, spin up a simple HTTP server:
```bash
# Using Python
python -m http.server 8000

# Using Node.js (if http-server is installed)
npx http-server -p 8000
```
Open **[http://localhost:8000](http://localhost:8000)** in your browser.
