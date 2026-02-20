import { useState } from 'react'
import axios from 'axios'
import './App.css'
import ChatInput from './ChatInput'
import MessageList from './MessageList'

function App() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)

  const sendMessage = async (text, image) => {
    const newMessage = { role: 'user', text, image }
    setMessages((prev) => [...prev, newMessage])
    setLoading(true)

    try {
      const payload = { message: text }
      if (image) {
        payload.image = image
      }

      const response = await axios.post('/chat', payload)

      const botMessage = {
        role: 'agent',
        text: response.data.response
      }
      setMessages((prev) => [...prev, botMessage])
    } catch (error) {
      console.error('Error sending message:', error)
      const errorMessage = {
        role: 'agent',
        text: 'Error: Could not get response from agent.'
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>GemChat</h1>
      </header>
      <main className="chat-container">
        <MessageList messages={messages} />
        {loading && <div className="loading">Agent is thinking...</div>}
      </main>
      <footer className="input-area">
        <ChatInput onSendMessage={sendMessage} disabled={loading} />
      </footer>
    </div>
  )
}

export default App
