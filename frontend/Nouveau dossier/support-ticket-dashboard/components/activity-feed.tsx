"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Cog, CheckCircle } from "lucide-react"
import type { Ticket, TicketStatus } from "@/app/page"

interface ActivityFeedProps {
  tickets: Ticket[]
  onTicketClick: (ticket: Ticket) => void
}

const statusConfig: Record<
  TicketStatus,
  {
    icon: React.ComponentType<{ className?: string }>
    label: string
    variant: "secondary" | "outline" | "default"
    className: string
  }
> = {
  pending: {
    icon: Clock,
    label: "Pending",
    variant: "outline",
    className: "text-[color:var(--status-pending)] border-[color:var(--status-pending)]",
  },
  processing: {
    icon: Cog,
    label: "Processing",
    variant: "secondary",
    className: "text-[color:var(--status-processing)] bg-[color:var(--status-processing)]/10",
  },
  ready: {
    icon: CheckCircle,
    label: "Ready",
    variant: "default",
    className: "text-[color:var(--status-ready)] bg-[color:var(--status-ready)]/10",
  },
}

export function ActivityFeed({ tickets, onTicketClick }: ActivityFeedProps) {
  const formatTime = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / (1000 * 60))

    if (minutes < 1) return "Just now"
    if (minutes < 60) return `${minutes}m ago`

    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `${hours}h ago`

    const days = Math.floor(hours / 24)
    return `${days}d ago`
  }

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="text-balance">Activity Feed</CardTitle>
        <CardDescription>Track your submitted tickets and their status</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {tickets.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>No tickets submitted yet</p>
              <p className="text-sm">Submit a ticket ID to get started</p>
            </div>
          ) : (
            tickets.map((ticket) => {
              const config = statusConfig[ticket.status]
              const Icon = config.icon

              return (
                <div
                  key={ticket.id}
                  onClick={() => ticket.status === "ready" && onTicketClick(ticket)}
                  className={`p-4 border rounded-lg transition-colors ${
                    ticket.status === "ready" ? "cursor-pointer hover:bg-muted/50" : "cursor-default"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-foreground">{ticket.ticketId}</span>
                    <Badge variant={config.variant} className={config.className}>
                      <Icon className="w-3 h-3 mr-1" />
                      {config.label}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Submitted {formatTime(ticket.submittedAt)}</span>
                    {ticket.status === "ready" && <span className="text-primary">Click to review</span>}
                  </div>
                </div>
              )
            })
          )}
        </div>
      </CardContent>
    </Card>
  )
}
