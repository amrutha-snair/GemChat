# GemChat

A full-stack AI chat application powered by **Google Gemini**, featuring real-time text conversations and **multimodal vision capabilities** — upload an image and ask the AI about it.

---

## ✨ Features

-  **AI Chat** — Conversational interface powered by Google Gemini (`gemini-flash-latest`)
-  **Vision / Image Analysis** — Upload images and get AI-powered descriptions & answers
-  **Real-time Responses** — Instant message streaming with loading indicators
-  **Clean UI** — Minimal, responsive React frontend
-  **Secure** — API key managed via environment variables

---

## 🛠️ Tech Stack

| Layer      | Technology                          |
| ---------- | ----------------------------------- |
| **Frontend** | React 19, Vite 7, Axios          |
| **Backend**  | Node.js, Express 5               |
| **AI**       | Google Gemini API (`@google/generative-ai`) |
| **Tooling**  | dotenv, CORS                      |

---

## 📁 Project Structure

```
gemchat/
├── server.js          # Express server — API routes
├── agent.js           # Gemini AI agent — handles text & image prompts
├── package.json       # Backend dependencies
├── .env               # Environment variables (API key, port)
└── client/            # React frontend (Vite)
    ├── src/
    │   ├── App.jsx          # Main app — state management & API calls
    │   ├── ChatInput.jsx    # Chat input with image upload
    │   ├── MessageList.jsx  # Message display component
    │   ├── App.css          # Styling
    │   └── main.jsx         # React entry point
    ├── index.html
    ├── vite.config.js
    └── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18+)
- **Google Gemini API Key** — [Get one here](https://aistudio.google.com/app/apikey)

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/gemchat.git
cd gemchat
```

### 2. Configure environment variables

Create a `.env` file in the root directory:

```env
GEMINI_API_KEY=your_gemini_api_key_here
PORT=3002
```

### 3. Install dependencies

```bash
# Backend
npm install

# Frontend
cd client
npm install
```

### 4. Run the application

```bash
# Start the backend server
npm start

# In a separate terminal, start the frontend
cd client
npm run dev
```

The backend will start on `http://localhost:3002` and the frontend dev server on `http://localhost:3001`.

---

## 📡 API Endpoints

| Method | Endpoint | Description                        |
| ------ | -------- | ---------------------------------- |
| `GET`  | `/`      | Health check                       |
| `POST` | `/chat`  | Send a message (with optional image) |

### `POST /chat` — Request Body

```json
{
  "message": "What is in this image?",
  "image": "data:image/png;base64,..."
}
```

### Response

```json
{
  "response": "The image shows..."
}
```

---

## 🖼️ Image Upload

The app supports uploading images directly from the chat interface. When an image is attached:

1. The image is converted to **Base64** on the client side
2. Sent to the backend along with the text prompt
3. The Gemini model processes both text and image using its **multimodal** capabilities
4. A detailed AI response is returned

---
