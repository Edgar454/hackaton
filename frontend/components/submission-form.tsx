"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Send } from "lucide-react"


interface SubmissionFormProps {
  onSubmit: (ticketId: string) => void
}

export function SubmissionForm({ onSubmit }: SubmissionFormProps) {
  const [ticketId, setTicketId] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!ticketId.trim()) return

    setIsSubmitting(true)
    console.log("Submitting ticket ID:", ticketId)
    onSubmit(ticketId.trim())
    setTicketId("")

    setTimeout(() => setIsSubmitting(false), 1000)
  }

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="text-balance">Submit New Ticket</CardTitle>
        <CardDescription>Generate an email draft for your support ticket</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="ticketId" className="text-sm font-medium text-foreground">
              Ticket ID
            </label>
            <Input
              id="ticketId"
              type="text"
              placeholder="e.g., 3000"
              value={ticketId}
              onChange={(e) => setTicketId(e.target.value)}
              className="w-full"
            />
          </div>

          <Button type="submit" className="w-full" disabled={!ticketId.trim() || isSubmitting}>
            <Send className="w-4 h-4 mr-2" />
            {isSubmitting ? "Submitting..." : "Generate Draft"}
          </Button>

          <p className="text-sm text-muted-foreground text-center">Paste Ticket ID to generate an email draft</p>
        </form>
      </CardContent>
    </Card>
  )
}
