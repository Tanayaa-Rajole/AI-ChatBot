# 🤖 AI Chatbot

A full-stack AI chatbot built using **FastAPI, JavaScript, and the OpenAI API**.

The application provides a clean conversational interface and connects to an AI model through a secure Python backend.

---

## ✨ Features

- 🤖 AI-powered conversations
- 💬 Real-time chat interface
- 🧠 Conversation history
- ⚡ FastAPI backend
- 🔐 Server-side API key protection
- ⌨️ Enter-to-send functionality
- 🧹 Clear conversation
- 📱 Responsive interface
- ❤️ Health-check endpoint
- ⚠️ Error handling

---

## 🛠️ Tech Stack

### Frontend

- HTML5
- CSS3
- JavaScript

### Backend

- Python
- FastAPI
- Uvicorn
- Pydantic

### AI

- OpenAI API
- OpenAI Python SDK

---

## 🏗️ Architecture

```text
┌───────────────┐
│     User      │
└───────┬───────┘
        │
        ▼
┌───────────────┐
│   Frontend    │
│ HTML/CSS/JS   │
└───────┬───────┘
        │
        │ HTTP POST
        ▼
┌───────────────┐
│    FastAPI    │
│    Backend    │
└───────┬───────┘
        │
        ▼
┌───────────────┐
│   OpenAI API  │
└───────┬───────┘
        │
        ▼
┌───────────────┐
│ AI Response   │
└───────┬───────┘
        │
        ▼
┌───────────────┐
│ Chat Interface│
└───────────────┘
