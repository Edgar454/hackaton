"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle, Edit, Save, Trash2 } from "lucide-react"
import type { Ticket } from "@/app/page"

interface DraftPreviewProps {
  ticket: Ticket
  onClose: () => void
  onUpdate: (ticket: Ticket) => void
}

export function DraftPreview({ ticket, onClose, onUpdate }: DraftPreviewProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [subject, setSubject] = useState(ticket.subject || "")
  const [body, setBody] = useState(ticket.body || "")

  const handleSave = () => {
    onUpdate({
      ...ticket,
      subject,
      body,
    })
    setIsEditing(false)
  }

  const handleValidateAndSend = () => {
    // In a real app, this would send the email
    console.log("Sending email:", { subject, body })
    onClose()
  }

  const handleDiscard = () => {
    // In a real app, this would delete the draft
    console.log("Discarding draft for ticket:", ticket.ticketId)
    onClose()
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-balance">Draft Preview - {ticket.ticketId}</DialogTitle>
          <DialogDescription>Review and edit your email draft before sending</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Subject</label>
            {isEditing ? (
              <Input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Email subject" />
            ) : (
              <div className="p-3 bg-muted rounded-md text-foreground">{subject || "No subject"}</div>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Email Body</label>
            {isEditing ? (
              <Textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Email content"
                rows={12}
                className="resize-none"
              />
            ) : (
              <div className="p-4 bg-muted rounded-md text-foreground whitespace-pre-wrap min-h-[200px]">
                {body || "No content"}
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 pt-4 border-t">
          {isEditing ? (
            <>
              <Button onClick={handleSave} className="flex-1 sm:flex-none">
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
              <Button variant="outline" onClick={() => setIsEditing(false)} className="flex-1 sm:flex-none">
                Cancel
              </Button>
            </>
          ) : (
            <>
              <Button onClick={handleValidateAndSend} className="flex-1 sm:flex-none">
                <CheckCircle className="w-4 h-4 mr-2" />
                Validate & Send
              </Button>
              <Button variant="outline" onClick={() => setIsEditing(true)} className="flex-1 sm:flex-none">
                <Edit className="w-4 h-4 mr-2" />
                Edit Draft
              </Button>
              <Button variant="outline" className="flex-1 sm:flex-none bg-transparent">
                <Save className="w-4 h-4 mr-2" />
                Save for Later
              </Button>
              <Button variant="destructive" onClick={handleDiscard} className="flex-1 sm:flex-none">
                <Trash2 className="w-4 h-4 mr-2" />
                Discard
              </Button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
