# 🧨 Self-Destructing File App — Frontend

A simple React + Bootstrap Vite application that allows users to upload a file, generate a presigned S3 URL, and optionally set the expiration duration. Files are stored in an S3 bucket with an auto-deletion lifecycle policy, making them temporary and self-destructing.

---

## Features

- Upload files from your local machine
- Sends file to a Lambda-powered API via API Gateway
- Receives a presigned URL valid for a limited time (default 1 hour)
- Supports setting custom expiration durations
- S3 handles file deletion automatically via lifecycle rules
- Clean, responsive UI using React Bootstrap

---

## 🛠 Tech Stack

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Bootstrap](https://getbootstrap.com/)
- [Axios](https://axios-http.com/)
- AWS Lambda + API Gateway + S3 (Backend API)

---

## Installation

```bash
# Clone the repo
git clone https://github.com/alfred-jgv/sdf-frontend-blog.git


# Install dependencies
npm install
