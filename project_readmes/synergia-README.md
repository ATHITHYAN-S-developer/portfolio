# 🤝 Synergia Hackathon & Event Management Suite

[![React](https://img.shields.io/badge/react-18.0-blue.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/typescript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/vite-5.0-purple.svg)](https://vitejs.dev/)
[![Gemini AI](https://img.shields.io/badge/Gemini--AI-Assistant-orange.svg)](https://ai.google.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind--CSS-3.4-cyan.svg)](https://tailwindcss.com/)

Synergia is a full-stack hackathon and event coordination portal engineered for Velalar College of Engineering and Technology (VCET). Built with React, TypeScript, and Vite, the platform features a real-time conversational help desk powered by the Google Gemini AI Studio API to answer student registration, event schedules, and rules queries.

---

## 🚀 Key Features

- **Gemini-Powered ChatAssistant**: Built-in chat panel leveraging Google Gemini AI models to act as a 24/7 registration assistant. Resolves student questions regarding deadlines, event categories, and rules instantly.
- **Event Timeline & Schedule Tracker**: Display event lists, timeline nodes, and deadlines using visual countdown cards.
- **Vite & TypeScript Compilation**: High-performance module building and strict type-safety architectures.
- **Secure Registration Flow**: Collects, validates, and stores registration records.
- **Vibrant Modern Styling**: Implements a slate-dark aesthetic with responsive grids using Tailwind CSS layouts.
- **Firebase Database Sync**: Integrated database structures to store registry lists and deadline milestones.

---

## 🛠️ Technology Stack

- **Frontend Core**: React.js, TypeScript (TSX)
- **Bundler & Tooling**: Vite
- **Styling**: Tailwind CSS
- **Database Engine**: Firebase Firestore
- **Generative AI Integration**: Google Gemini AI Studio SDK (`@google/generative-ai`)

---

## 📂 Project Directory Structure

```
├── components/            # Reusable UI Components
│   ├── ChatAssistant.tsx  # Interactive AI chat assistant powered by Gemini API
│   ├── Deadlines.tsx      # Countdown cards for registration closures
│   ├── Events.tsx         # Event information cards
│   ├── Hero.tsx           # Large introduction portal with highlights
│   ├── Navbar.tsx         # Floating header bar
│   ├── Register.tsx       # Participant submission forms
│   ├── Schedule.tsx       # Timeline table of events
│   └── Footer.tsx         # Copyright footer
├── public/                # Static assets (logos, banners)
├── App.tsx                # Main layout coordinator
├── index.html             # HTML core template
├── constants.tsx          # Configuration values (event dates, details)
├── types.ts               # TypeScript interface definitions
├── tailwind.config.js     # Tailwind configurations
├── tsconfig.json          # TypeScript configurations
├── vite.config.ts         # Vite build settings
└── package.json           # Dependencies and build script commands
```

---

## ⚙️ Local Installation & Configuration

### Prerequisites
- **Node.js** (v18+) installed on your machine.
- A **Google Gemini API Key** from [Google AI Studio](https://aistudio.google.com/).

### Installation Steps

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/ATHITHYAN-S-developer/synergia.git
   cd synergia
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env.local` file in the root directory:
   ```env
   VITE_GEMINI_API_KEY=your_actual_gemini_api_key_here
   ```

4. **Verify Firebase Setup (Optional):**
   If integrating your own database, update the Firebase initialize settings in your config files.

5. **Start the Development Server:**
   ```bash
   npm run dev
   ```

6. **View the Application:**
   Open the address provided by Vite (usually `http://localhost:5173`) in your browser.

---

## 🤖 Gemini Chat Assistant Integration Details

The chatbot resides in `components/ChatAssistant.tsx` and utilizes the `@google/generative-ai` SDK. It is initialized using system instructions containing specific facts about VCET Synergia events:
```typescript
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction: "You are Synergia Bot, the VCET technical event registration assistant. Help users with registration deadlines, event tracks, and fees."
});
```

---

## 🤝 Contributing

Contributions to Synergia are welcome! If you have suggestions for new features, dashboard pages, or code cleanups, please open an issue or submit a pull request.

---

## 📄 License

This project is licensed under the MIT License.
