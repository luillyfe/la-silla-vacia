"use client"
import React, { useState, useEffect } from 'react'
import { Send, Bookmark, Trash2, Sun, Moon } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Skeleton } from "@/components/ui/skeleton"
import ReactMarkdown from 'react-markdown'
import { askTheCopilot } from '@/app/copilot'

type Message = {
  id: string
  content: string
  isUser: boolean
  isSaved: boolean
  category?: string
}

const newsCategories = ['General', 'Politics', 'Economy', 'Society', 'International', 'Culture']

export default function Component() {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', content: "Bienvenido a La Silla AI. ¿Qué noticias te interesan hoy?", isUser: false, isSaved: false }
  ])
  const [input, setInput] = useState('')
  const [isThinking, setIsThinking] = useState(false)
  const [category, setCategory] = useState('General')
  const [error, setError] = useState<string | null>(null)
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    document.body.classList.toggle('dark', isDarkMode)
  }, [isDarkMode])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage: Message = { id: Date.now().toString(), content: input, isUser: true, isSaved: false, category }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsThinking(true)
    setError(null)

    try {
        const copilotResponse = await askTheCopilot(input, category)
        const aiMessage: Message = {
        id: Date.now().toString(),
        content: copilotResponse,
        isUser: false,
        isSaved: false,
        category
        }
        setMessages(prev => [...prev, aiMessage])
        setIsThinking(false)
    } catch (err) {
      console.error(err)
      setError('Failed to get AI response. Please try again.')
    } finally {
      setIsThinking(false)
    }
  }

  const toggleSaveMessage = (id: string) => {
    setMessages(prev => prev.map(msg => 
      msg.id === id ? { ...msg, isSaved: !msg.isSaved } : msg
    ))
  }

  const clearConversation = () => {
    setMessages([{ id: '1', content: "Bienvenido a La Silla AI. ¿Qué noticias te interesan hoy?", isUser: false, isSaved: false }])
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>La Silla AI</CardTitle>
        <div className="flex items-center space-x-2">
          <Sun className="h-4 w-4" />
          <Switch checked={isDarkMode} onCheckedChange={setIsDarkMode} />
          <Moon className="h-4 w-4" />
        </div>
      </CardHeader>
      <CardContent className="h-[400px] overflow-y-auto space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[70%] rounded-lg p-3 ${
                message.isUser ? 'bg-primary text-primary-foreground' : 'bg-muted'
              }`}
            >
              <ReactMarkdown>{message.content}</ReactMarkdown>
              {!message.isUser && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => toggleSaveMessage(message.id)}
                  className="mt-2"
                >
                  <Bookmark className={`h-4 w-4 ${message.isSaved ? 'fill-current' : ''}`} />
                  <span className="sr-only">{message.isSaved ? 'Unsave' : 'Save'} message</span>
                </Button>
              )}
            </div>
          </div>
        ))}
        {isThinking && (
          <div className="flex justify-start">
            <div className="max-w-[70%] space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-[150px]" />
            </div>
          </div>
        )}
        {error && (
          <div className="text-red-500 text-center">{error}</div>
        )}
      </CardContent>
      <CardFooter className="flex-col space-y-2">
        <form onSubmit={handleSubmit} className="flex w-full space-x-2">
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {newsCategories.map((cat) => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a news-related question..."
            className="flex-grow"
          />
          <Button type="submit" size="icon" disabled={isThinking}>
            <Send className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        </form>
        <div className="flex justify-between w-full">
          <Button variant="outline" size="sm" onClick={clearConversation}>
            <Trash2 className="h-4 w-4 mr-2" />
            Clear Conversation
          </Button>
          <Button variant="outline" size="sm">
            <Bookmark className="h-4 w-4 mr-2" />
            View Saved Messages
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}