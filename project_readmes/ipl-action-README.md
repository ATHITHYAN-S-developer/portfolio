# 🏏 IPL Auction & League Portal - Premium Edition

[![React](https://img.shields.io/badge/react-18.0-blue.svg)](https://react.dev/)
[![Firebase](https://img.shields.io/badge/Firebase-Firestore-yellow.svg)](https://firebase.google.com/)
[![Vite](https://img.shields.io/badge/vite-5.0-purple.svg)](https://vitejs.dev/)
[![CSS3](https://img.shields.io/badge/CSS3-Glassmorphism-pink.svg)](https://www.w3.org/)

A data-driven, real-time cricket league bidding portal built using React.js, Vite, and Firebase Firestore. Supports role-based login interfaces (Admin and Bidder teams) to coordinate live player auctions with instant bid synchronization across all clients.

---

## 🚀 Key Features

- **Real-Time Bidding Sync**: Utilizing Firestore snapshot listeners, active bids, team purse amounts, and auction timer updates are synced instantly across all active screens.
- **Admin Dashboard Panel**: Administrators can:
  - Add, edit, or remove players from the auction database.
  - Set active team budgets and bidding increments.
  - Push new players to the auction block and resolve successful bids.
- **Secure Role-Based Authentication**: Secure login routes using Firebase Auth.
- **Premium Glassmorphic Design**: Clean UI styling featuring frosted glass overlays, custom neon glow buttons, and hover physics.
- **Automated Database Seeding**: Includes database initialization scripts (`initDB.js`) to quickly populate player metrics (base price, category, photo URLs).

---

## 🛠️ Technology Stack

- **Frontend core**: React.js (JSX)
- **CSS Styling**: CSS3 (Responsive layouts with glassmorphic properties)
- **Bundler**: Vite
- **Database Engine**: Firebase Cloud Firestore
- **Authentication**: Firebase Auth

---

## 📂 Project Directory Structure

```
├── src/
│   ├── App.css            # Base styles and glassmorphism definitions
│   ├── App.jsx            # Core application layout and router logic
│   ├── firebase.js        # Firebase configuration and initialization
│   ├── index.css          # Color tokens and background configurations
│   ├── initDB.js          # DB seeder script to populate player tables
│   └── main.jsx           # Vite entrypoint file
├── index.html             # HTML core template
├── package.json           # npm dependencies and run scripts
└── README.md              # Project documentation
```

---

## ⚙️ Local Setup Instructions

### Prerequisites
- **Node.js** (v18+) installed on your machine.
- A **Firebase Project** set up on the Google console.

### Setup Steps

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/ATHITHYAN-S-developer/ipl-action.git
   cd ipl-action
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Configure Firebase Config:**
   Open `src/firebase.js` and input your Firebase project credentials:
   ```javascript
   const firebaseConfig = {
     apiKey: "YOUR_API_KEY",
     authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
     projectId: "YOUR_PROJECT_ID",
     storageBucket: "YOUR_PROJECT_ID.appspot.com",
     messagingSenderId: "YOUR_SENDER_ID",
     appId: "YOUR_APP_ID"
   };
   ```

4. **Seed the Database (First-Time Setup):**
   Uncomment or run the `initDB.js` script to populate your Cloud Firestore with the initial mock teams and player listings.

5. **Launch Server:**
   ```bash
   npm run dev
   ```

6. **Open Web Browser:**
   - Go to `http://localhost:5173`.
   - Log in as **Admin** to start the auction, or **Bidder** to place active bids.

---

## 🔒 Firebase Security Rules (Recommended)

To protect your auction PURSE values, configure the following rules in your Firestore Console:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /bids/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /players/{document} {
      allow read: if true;
      allow write: if request.auth.token.admin == true;
    }
  }
}
```

---

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request with improvements such as auction chat rooms, player performance overlays, or automatic timer countdowns.

---

## 📄 License

This project is licensed under the MIT License.
