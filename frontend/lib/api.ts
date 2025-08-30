import axios from "axios"

const BASE_URL = "http://192.168.199.136:5000"  

// submit a new ticket


export async function submitTicket(ticket_id: number) {
  const response = await axios.post(`${BASE_URL}/api/generate-email/`, { ticket_id })
  return response.data
}

export async function postMail(subject: string, body: string, email: string) {
  const response = await axios.post(`${BASE_URL}/send-email/`, {
    email,
    subject,
    body,
  })
  return response.data
}

