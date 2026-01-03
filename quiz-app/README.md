# 🎯 Quiz App

A modern, feature-rich quiz application built with **React**, **Vite**, **Tailwind CSS v4**, and **Firebase Authentication**. Users can take timed quizzes, track performance, switch themes, and manage quiz history — all in a clean, responsive UI.

---

## 🚀 Live Demo

> Deployed on **Vercel**

[https://alx-quiz-xi.vercel.app/]

---

## 🛠 Tech Stack

* **Frontend:** React (Vite)
* **Styling:** Tailwind CSS v4
* **Authentication:** Firebase Auth (Email/Password)
* **API:** Open Trivia Database (OpenTDB)
* **Deployment:** Vercel
* **State Management:** React Hooks
* **Storage:** LocalStorage (per authenticated user)

---

## ✨ Features

### 🔐 User Authentication

* Firebase Email/Password authentication
* Persistent login sessions
* User-specific quiz history
* Secure logout

### 🧠 Quiz System

* Fetches questions dynamically from OpenTDB
* Select number of questions
* Choose category and difficulty
* Multiple-choice questions
* Prevents multiple selections per question

### ⏱ Question Timer

* Countdown timer for each question
* Auto-submits when time runs out
* Visual progress bar synced with timer

### 📊 Scoring & Summary

* Real-time score tracking
* Final score summary
* Displays:

  * Your selected answer
  * Correct answer (if wrong)
  * No-answer handling

### 📈 Quiz History

* Stores completed quizzes per user
* Shows date, score, total questions, and category
* Ability to:

  * Show / hide history
  * Delete individual history entries

### 🌗 Dark / Light Mode

* Toggle between dark and light themes
* Fully styled with Tailwind CSS
* Theme persists during session

### 🎨 UI & UX Enhancements

* Clean, responsive design
* Hover effects on answer options
* Disabled buttons after selection
* Accessible color contrast

### 🔚 Footer

* Credits: **Built by 0xsaltie**
* GitHub and Twitter profile links

---

## 📂 Project Structure

```
src/
├── components/
│   ├── Auth.jsx
│   ├── QuizStart.jsx
│   ├── QuestionCard.jsx
│   ├── ScoreSummary.jsx
│   ├── QuizHistory.jsx
│   └── SearchBar.jsx
├── firebase.js
├── App.jsx
├── main.jsx
└── index.css
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/0xsaltie/ALX-FE-CAPSTONE-PROJECT/tree/main/quiz-app
cd quiz-app
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Firebase Configuration

Create a Firebase project and enable **Email/Password Authentication**.

Create a `.env` file in the root directory:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 4️⃣ Run Locally

```bash
npm run dev
```

---

## 🌍 Deployment (Vercel)

* Push your code to GitHub
* Import the repo into **Vercel**
* Add the same `.env` variables in Vercel Dashboard
* Deploy 🚀

---

## 🔮 Future Improvements

* Custom quiz creation
* Social sharing of scores
* Leaderboards
* Question review mode
* Persistent dark mode preference

---

## 👨‍💻 Author

**0xsaltie**

* GitHub: [https://github.com/0xsaltie](https://github.com/0xsaltie)
* Twitter: [https://twitter.com/oniyorjr](https://twitter.com/oniyorjr)

---

## 📜 License

This project is open source and available under the **MIT License**.

---

⭐ If you like this project, give it a star on GitHub!
