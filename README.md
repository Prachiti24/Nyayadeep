# ⚖️ NyayaDeep — Legal Knowledge & AI Platform

NyayaDeep is a **full-stack web application** designed to spread **legal awareness** through **AI-powered assistance**, **secure authentication**, and **interactive learning**.
It combines **React + Vite + TailwindCSS** on the frontend and **Node.js + Express + MongoDB** on the backend, integrating the **Gemini API** for AI chatbot responses.

---

## 🧭 Overview

NyayaDeep allows users to:

* 🔐 Sign up & log in securely with **JWT authentication**
* 📧 Verify their email for account activation
* 🤖 Chat with an **AI-powered legal assistant**
* 📚 Access the **Indian Constitution**, citizen **rights**, **duties**, and **amendments**
* 🎮 Learn through **interactive games** and **legal quizzes**
* 🌃 Experience a clean, responsive **dark-mode enabled UI**

---

## 💇️ Architecture

```text
+-------------------+        HTTP/API         +-------------------+
|  React Frontend   | <--------------------> | Node.js + Express  |
| (Vite, Tailwind)  |                        |   Backend Server   |
+-------------------+                        +-------------------+
           |                                          |
           |                                          v
           |                                MongoDB Database
           |
           v
   Gemini API (AI Legal Chatbot)
```

---

## 🗂️ Project Structure

```bash
NyayaDeep/
│
├── backend/         # Node.js + Express backend
│   ├── models/      # MongoDB models
│   ├── routes/      # API routes
│   ├── controllers/ # Business logic
│   └── server.js    # Main server file
│
├── frontend/        # React + Vite frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── assets/
│   └── vite.config.js
│
└── README.md
```

---

## ⚙️ Setup Instructions

### 🖥️ Backend Setup

1. Navigate to the backend folder:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Run the backend server:

```bash
nodemon server.js
```

Backend will start at: **[http://localhost:5000](http://localhost:5000)**

#### 📄 Backend `.env` Example

```bash
MONGODB_URI=mongodb://localhost:27017/Nyaydeep
PORT=5000
JWT_SECRET_KEY=your_jwt_secret
JWT_EXPIRES_IN=7d
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@example.com
EMAIL_PASSWORD=your_email_password
EMAIL_FROM=your_email@example.com
NODE_ENV=development
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
DAILY_FACT_API=http://localhost:5000/api/facts/send
GEMINI_API_KEY=your_gemini_api_key
BACKEND_KEY=your_backend_key
```

---

### 🌐 Frontend Setup

1. Navigate to the frontend folder:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Run the frontend development server:

```bash
npm run dev
```

Frontend will start at: **[http://localhost:3000](http://localhost:3000)**

#### 📄 Frontend `.env` Example

```bash
VITE_GEMINI_API_KEY=your_gemini_api_key
```

---

## 🚀 Usage

1. Open **[http://localhost:3000](http://localhost:3000)**
2. Sign up or log in to access protected features
3. Verify your email address
4. Chat with the AI legal assistant
5. Explore the Constitution, rights, and games

> ⚠️ Make sure both **frontend** and **backend** servers are running, and MongoDB is active locally.

---

## 🧮 Technologies Used

| Layer          | Stack                    |
| -------------- | ------------------------ |
| Frontend       | React, TailwindCSS, Vite |
| Backend        | Node.js, Express         |
| Database       | MongoDB                  |
| Authentication | JWT                      |
| AI Integration | Gemini API               |
| Email Service  | SMTP (Nodemailer)        |

---

## 📜 Scripts

**Backend**

```bash
nodemon server.js
```

**Frontend**

```bash
npm run dev
```

---

## 🌱 Environment Notes

* Ensure **MongoDB** is running locally before starting the backend.
* Replace all `.env` placeholders with valid credentials and API keys.
* Both servers must run simultaneously for full functionality.

---

## 🤝 Contributing

Contributions are welcome!
Please open a pull request with a clear description and include tests or documentation for significant changes.

---

## 🪪 License

This project is intended for **educational and development purposes** only.

---

## 🙌 Contributors

* Sreya Sudheeran
* Tanaya Anap
* Prachiti Telsinge
* Shreya Shinde
* Tiya Rathor

---

**Made with ❤️ — Empowering citizens through digital legal literacy.**
