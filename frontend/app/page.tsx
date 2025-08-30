"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { SubmissionForm } from "@/components/submission-form"
import { ActivityFeed } from "@/components/activity-feed"
import { DraftPreview } from "@/components/draft-preview"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { submitTicket } from "@/lib/api"

export type TicketStatus = "pending" | "processing" | "ready"

export interface Ticket {
  id: string
  ticketId: string
  status: TicketStatus
  submittedAt: Date
  subject?: string
  body?: string
  receiver_email?: string
}

export default function Dashboard() {
  const [tickets, setTickets] = useState<Ticket[]>([
    {
      id: "1",
      ticketId: "TK-12345",
      status: "ready",
      submittedAt: new Date(Date.now() - 1000 * 60 * 30),
      subject: "Issue with login functionality",
      body: "Dear Customer,\n\nThank you for reaching out regarding the login functionality issue. We have reviewed your ticket and identified the root cause...",
    },
    {
      id: "2",
      ticketId: "TK-12346",
      status: "processing",
      submittedAt: new Date(Date.now() - 1000 * 60 * 15),
    },
    {
      id: "3",
      ticketId: "TK-12347",
      status: "pending",
      submittedAt: new Date(Date.now() - 1000 * 60 * 5),
    },
  ])

  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null)
  const { toast } = useToast()

  const [activeTab, setActiveTab] = useState<"submit" | "activity">("submit")

  const handleSubmitTicket = async (ticketId: string) => {
    const newTicket: Ticket = {
      id: Date.now().toString(),
      ticketId,
      status: "pending",
      submittedAt: new Date(),
    }

    setTickets((prev) => [newTicket, ...prev])

    // processing
    setTickets((prev) => prev.map((t) => (t.id === newTicket.id ? { ...t, status: "processing" } : t)))
    

    // completion
    const response = await submitTicket(parseInt(ticketId.trim()))
    if (response) {
      setTickets((prev) =>
        prev.map((t) =>
          t.id === newTicket.id
            ? {
                ...t,
                status: "ready",
                receiver_email: response.email.to,
                subject: response.email.subject,
                body: response.email.body,
              }
            : t,
        ),
      )

      toast({
        title: "✅ Draft ready",
        description: `Draft ready for Ticket #${ticketId}. Click to review.`,
        action: (
          <button
            onClick={() =>
              setSelectedTicket((prev) =>
                prev?.ticketId === ticketId ? prev : tickets.find((t) => t.ticketId === ticketId) || null,
              )
            }
            className="text-sm underline"
          >
            Review
          </button>
        ),
      })
    } else {
      toast({
        title: "❌ Draft failed",
        description: `Failed to generate draft for Ticket #${ticketId}. Please try again later.`,
      })
    }
  }

  const readyTicketsCount = tickets.filter((t) => t.status === "ready").length

  return (
    <div className="min-h-screen bg-background">
      <Header notificationCount={readyTicketsCount} />

      <main className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <div className="flex space-x-1 bg-muted p-1 rounded-lg w-fit">
            <button
              onClick={() => setActiveTab("submit")}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === "submit"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Submit Ticket
            </button>
            <button
              onClick={() => setActiveTab("activity")}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === "activity"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Activity Feed
            </button>
          </div>
        </div>

        <div className="max-w-2xl">
          {activeTab === "submit" && <SubmissionForm onSubmit={handleSubmitTicket} />}
          {activeTab === "activity" && <ActivityFeed tickets={tickets} onTicketClick={setSelectedTicket} />}
        </div>
      </main>

      {selectedTicket && (
        <DraftPreview
          ticket={selectedTicket}
          onClose={() => setSelectedTicket(null)}
          onUpdate={(updatedTicket) => {
            setTickets((prev) => prev.map((t) => (t.id === updatedTicket.id ? updatedTicket : t)))
            setSelectedTicket(updatedTicket)
          }}
        />
      )}

      <Toaster />
    </div>
  )
}
