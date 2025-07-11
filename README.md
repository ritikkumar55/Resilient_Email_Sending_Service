# 📧 Resilient Email Sending Service

A robust and fault-tolerant email sending service built using **Javascript** and **Express.js**, featuring retry logic, provider fallback, idempotency, rate limiting, and status tracking — all powered by mock email providers.

> 🔗 **Live API**: [https://resilient-email-sending-service-6rum.onrender.com](https://resilient-email-sending-service-6rum.onrender.com)

---

## 🚀 Features

✅ Retry with exponential backoff  
✅ Fallback between two mock email providers  
✅ Idempotency to prevent duplicate email sending  
✅ Basic rate limiting (5 emails per minute)  
✅ Email status tracking  

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- JavaScript (CommonJS)
- Postman (for API testing)
- Jest (for unit testing)
- Render (for deployment)

---

## 📁 Folder Structure

## 📁 Project Structure

```bash
resilient-email-service/
├── src/
│   ├── server.js
│   ├── EmailService.js
│   ├── providers/
│   │   ├── MockProvider1.js
│   │   └── MockProvider2.js
│   └── utils/
│       ├── retryWithBackoff.js
│       └── rateLimiter.js
├── tests/
│   └── EmailService.test.js
├── package.json
├── .gitignore
└── README.md

```

## 📬 API Endpoints

### `POST /send-email`

Sends an email using mock providers with retry and fallback support.

**URL:**
https://resilient-email-sending-service-6rum.onrender.com/send-email


**Request Body:**
```json

{
  "emailId": "ritik-123",
  "to": "user@example.com",
  "subject": "Welcome!",
  "message": "Hello from the resilient email service!"
}
```
Response Examples:

✅ Success:
```json

{
  "status": "success",
  "provider": "MockProvider1"
}
```

🔁 Duplicate:

```json
{
  "status": "duplicate",
  "message": "Email already sent."
}
```
### GET /status-log

Returns the status log of all attempted emails (success/failure/provider used/etc).

**URL:**
https://resilient-email-sending-service-6rum.onrender.com/status-log

Response Examples:
```json
{
  "ritik-123": {
    "status": "success",
    "provider": "MockProvider1",
    "attempts": 1
  },
  "modit-456": {
    "status": "failed",
    "attempts": 2
  }
}
```

## 🧪Run Locally
```bash

git clone https://github.com/ritikkumar55/Resilient_Email_Sending_Service.git
cd Resilient_Email_Sending_Service
npm install
npm start
```

### ✅ Run Tests

```bash
npm test

```
## 🙋 Author
## Ritik Kumar
MCA Student | Developer | Open Source Contributor




