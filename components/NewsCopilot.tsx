"use client"
import React, { useState } from 'react'
import { Send } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { askCohereAI, ChatMessage } from '@/app/copilot'

type Message = {
  content: string
  isUser: boolean
}

export default function NewsCopilot() {
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([])
  const [messages, setMessages] = useState<Message[]>([
    { content: "Bienvenido a La Silla AI. ¿Qué noticias te interesan hoy?", isUser: false }
  ])
  const [input, setInput] = useState('')
  const [isThinking, setIsThinking] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    // add the new messages to the conversation
    const userMessage = { content: input, isUser: true }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsThinking(true)

    // ask the copilot
    const copilotResponse = await askCohereAI(input, chatHistory)
    setMessages(prev => [...prev, { content: copilotResponse, isUser: false }])
    setIsThinking(false)

    // add the new messages to the chat history
    setChatHistory(prev => [...prev, { role: "USER", message: input }, { role: "CHATBOT", message: copilotResponse }])
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>La Silla AI</CardTitle>
      </CardHeader>
      <CardContent className="h-[400px] overflow-y-auto space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[70%] rounded-lg p-3 ${
                message.isUser ? 'bg-primary text-primary-foreground' : 'bg-muted'
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
        {isThinking && (
          <div className="flex justify-start">
            <div className="max-w-[70%] rounded-lg p-3 bg-muted">
              <span className="animate-pulse">Thinking...</span>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <form onSubmit={handleSubmit} className="flex w-full space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a news-related question..."
            className="flex-grow"
          />
          <Button type="submit" size="icon">
            <Send className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </CardFooter>
    </Card>
  )
}