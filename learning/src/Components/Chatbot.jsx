import React, { useState, useRef, useEffect } from 'react'
import './Chatbot.css';
import chatbot from '../assets/chatbot.png'
import axios from 'axios'
import ReactMarkdown from 'react-markdown'

const ChatBot = () => {
  const [question, setQuestion] = useState("")
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const chatContainerRef = useRef(null)

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [messages])

  const handleSubmit = async (e) => {
    e?.preventDefault() // Handle both button click and form submit
    
    if (!question.trim()) return

    const userQuestion = question.trim()
    setQuestion('')
    setError(null)
    setIsLoading(true)

    // Add user message immediately
    setMessages(prev => [...prev, {
      question: userQuestion,
      answer: null,
      timestamp: new Date().toISOString()
    }])

    try {
      const response = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyD1OwQsLBGjV397BTqBH4oOhbd3IBy1gNU",
        {
          "contents": [{
            "parts": [{ "text": userQuestion }]
          }]
        }
      )

      const botResponse = response.data.candidates[0].content.parts[0].text

      // Update the last message with the bot's response
      setMessages(prev => {
        const newMessages = [...prev]
        newMessages[newMessages.length - 1].answer = botResponse
        return newMessages
      })

    } catch (error) {
      setError("Sorry, I couldn't process your request. Please try again.")
      // Update the last message with the error
      setMessages(prev => {
        const newMessages = [...prev]
        newMessages[newMessages.length - 1].answer = "Error: Failed to get response"
        return newMessages
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <>
      <div className='main_container'>
        <h1>AI Learning Assistant</h1>
        <div className='media'>
          <img src={chatbot} alt='AI Assistant' />
          <div className='media-body'>
            <h4>Learning Assistant</h4>
            <p>{isLoading ? 'Thinking...' : 'Online'}</p>
          </div>
        </div>
        <div className="chat-container" ref={chatContainerRef}>
          {messages.map((msg, i) => (
            <div className='userMessage' key={i}>
              <span className='userResponse'>
                <i className="fa-solid fa-user-tie"></i>
                {msg.question}
              </span>
              {msg.answer === null ? (
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              ) : (
                <span className='botResponse'>
                  <i className="fa-brands fa-rocketchat"></i>
                  <ReactMarkdown>{msg.answer}</ReactMarkdown>
                </span>
              )}
            </div>
          ))}
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}
        </div>
        <form className="input-group" onSubmit={handleSubmit}>
          <input
            type="text"
            value={question}
            placeholder='Ask me anything about your studies...'
            onChange={(e) => setQuestion(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
          />
          <button type="submit" disabled={isLoading || !question.trim()}>
            {isLoading ? 'Sending...' : 'Send'}
          </button>
        </form>
      </div>
    </>
  )
}

export default ChatBot