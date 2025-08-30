import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from mail import send_email_via_smtp
from pydantic import BaseModel

app = FastAPI()

class EmailRequest(BaseModel):
    email: str
    subject: str
    body: str

class IssueTicket(BaseModel):
    ticketId: str
   

@app.post("/send-email/") 
async def send_email(req: EmailRequest):
    send_email_via_smtp(req.subject, req.body, req.email)
    return {"message": "Email sent successfully"}


@app.post("/submit-ticket/")
async def submit_ticket(req: IssueTicket):
    return {"body": "Email sent successfully" ,"subject":"email"}


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # frontend origin
    allow_credentials=True,
    allow_methods=["*"],  # allow POST, OPTIONS, etc.
    allow_headers=["*"],
)