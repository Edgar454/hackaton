import smtplib, ssl
from email.mime.text import MIMEText
from email.utils import formatdate
import os
from dotenv import load_dotenv

load_dotenv()

smtp_server = "email-smtp.eu-north-1.amazonaws.com"  
port = 465  
sender_email = "hackathon@kaifact.ai"
password = os.getenv("SMTP_APP_PASSWORD")
username = os.getenv("SMTP_USER")


def send_email_via_smtp(subject , body , to_email):
    # define email message
    msg = MIMEText(body)
    msg['From'] = sender_email
    msg['To'] = to_email
    msg['Subject'] = subject
    msg['Date'] = formatdate(localtime=True)

    # create SSL context
    context = ssl.create_default_context()

    # Send email
    try:
        with smtplib.SMTP_SSL(smtp_server, port, context=context) as server:
            server.login(username, password)
            server.sendmail(sender_email, to_email, msg.as_string())
            print("✅ Email sent successfully via SSL!")
    except Exception as e:
        print(f"❌ Error sending email: {e}")


if __name__ == "__main__":
    subject = "Test Email from Python"
    body = "This is a test email sent from Python with SSL encryption."
    to_email = "mevaed4@gmail.com"

    send_email_via_smtp(subject, body, to_email)
