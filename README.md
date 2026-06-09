<div align="center">

<h1>🎯 Quiz Flow</h1>

<p>A modern, responsive, and interactive quiz platform built with React, TypeScript, and Tailwind CSS.</p>

<p>
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React"/>
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS"/>
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite"/>
</p>

<p>
  <img src="https://img.shields.io/badge/Status-Active-brightgreen?style=flat-square" alt="Status"/>
  <img src="https://img.shields.io/badge/License-MIT-blue?style=flat-square" alt="License"/>
  <img src="https://img.shields.io/badge/PRs-Welcome-orange?style=flat-square" alt="PRs Welcome"/>
</p>

</div>

---

## 📌 Overview

**Quiz Flow** is a feature-rich quiz platform designed to make learning interactive and engaging. Users can browse quizzes, create their own, attempt quizzes with instant scoring, and monitor their learning progress over time.

The application offers a clean user interface, smooth navigation, and responsive design for an excellent experience across desktop and mobile devices.

---

## ✨ Features

### 🔐 User Authentication
- User login & logout
- Session management
- Personalized dashboard

### 📚 Quiz Management
- Browse available quizzes
- Search quizzes
- Filter by category
- View quiz details & featured quizzes

### ✍️ Create Custom Quizzes
- Create unlimited quizzes
- Add multiple questions with four options each
- Mark the correct answer
- Validation for incomplete quizzes

### 🎮 Quiz Experience
- Interactive question navigation
- Instant answer selection
- Quiz timer
- Automatic score calculation & performance summary

### 📊 Dashboard Analytics
- Total quizzes attempted
- Average accuracy
- Total play time & perfect scores
- Performance trend chart
- Recent quiz history & retake option

### 📱 Responsive Design
- Mobile, tablet, and desktop optimized
- Modern UI/UX

### 💾 Data Persistence
- User session, quiz attempts, and created quizzes saved via Local Storage
- Data persists after page refresh

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React | Frontend framework |
| TypeScript | Type safety |
| Tailwind CSS | Styling |
| Lucide React | Icons |
| Local Storage | Data persistence |
| Vite | Development environment |

---

## 📂 Project Structure

```
Quiz-Flow/
│
├── public/
│
├── src/
│   ├── components/
│   │   ├── AuthView.tsx
│   │   ├── BrowseView.tsx
│   │   ├── CreateQuizView.tsx
│   │   ├── DashboardView.tsx
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── ResultsView.tsx
│   │   └── TakeQuizView.tsx
│   │
│   ├── data/
│   │   └── defaultQuizzes.ts
│   │
│   ├── storage/
│   │   └── index.ts
│   │
│   ├── types/
│   │   └── index.ts
│   │
│   ├── App.tsx
│   └── main.tsx
│
├── package.json
├── vite.config.ts
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/yourusername/quiz-flow.git
```

**2. Navigate to the project**
```bash
cd quiz-flow
```

**3. Install dependencies**
```bash
npm install
```

**4. Run the development server**
```bash
npm run dev
```

**5. Build for production**
```bash
npm run build
```

**6. Preview production build**
```bash
npm run preview
```

---

## 🎯 Application Workflow

```
User Login
    │
    ▼
Browse Quizzes
    │
    ▼
Select Quiz
    │
    ▼
Attempt Quiz
    │
    ▼
Submit Answers
    │
    ▼
View Results
    │
    ▼
Dashboard Analytics
```

---

## 🔮 Future Enhancements

- [ ] Firebase authentication
- [ ] Cloud database
- [ ] Leaderboards
- [ ] Quiz sharing
- [ ] Dark mode
- [ ] AI quiz generator
- [ ] Timer modes
- [ ] Multiplayer quiz
- [ ] Admin dashboard
- [ ] Image-based questions

---

## 📚 Learning Outcomes

This project helped strengthen understanding of:

- React component architecture
- TypeScript & type safety
- State management with props & hooks
- Local Storage for persistence
- Form validation
- Responsive design & UI/UX principles
- Performance optimization

---

## 👨‍💻 Author

**Ayush Ekka**



Made with ❤️ by Ayush Ekka

</div>
