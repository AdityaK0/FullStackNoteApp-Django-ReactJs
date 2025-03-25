# Full Stack Note Application 📝

## 🌟 Project Overview

This repository contains a full-stack note-taking application built using Django(DRF) for the backend and ReactJS for the frontend. The application allows users to create, read, update, pin, unpin and delete notes efficiently.

## 🚀 Project Architecture

```mermaid
flowchart TD
    A[User Interface] --> B[React Frontend]
    B --> C[REST API Endpoints]
    C --> D[Django Backend]
    D --> E[PostgreSQL Database]
    E --> F[User Authentication]
    F --> G[Note Management]
```

## ✨ Key Features

- 🔐 Secure User Authentication
- 📝 Create, Read, Update, Delete (CRUD) Note Operations
- 💻 Responsive and Intuitive Design
- 🔒 Secure Backend with JWT Authentication
- 🚀 Real-time Note Management

## 🛠 Technology Stack

### Frontend
- React.js
- React Router
- Axios
- Bootstrap

### Backend
- Django
- Django Rest Framework
- PostgreSQL
- JWT Authentication

## 🔄 User Workflow

```mermaid
flowchart TD
    A[User Visits App] --> B{Authenticated?}
    B -->|No| C[Login/Register Page]
    C --> D[Create Account/Login]
    B -->|Yes| E[Dashboard]
    E --> F[Create New Note]
    E --> G[View Existing Notes]
    F --> H[Save Note]
    G --> I[Edit/Delete Note]
    H --> E
    I --> E
```

## 🛡️ Authentication Flow

```mermaid
flowchart TD
    A[User Enters Credentials] --> B{Validate Credentials}
    B -->|Valid| C[Generate JWT Token]
    C --> D[Store Token in Local Storage]
    D --> E[Grant Access to Dashboard]
    B -->|Invalid| F[Show Error Message]
    F --> A
```

## 📦 Installation

### Prerequisites
- Python 3.8+
- Node.js 14+
- PostgreSQL

### Backend Setup
```bash
# Clone the repository
git clone https://github.com/AdityaK0/FullStackNoteApp-Django-ReactJs.git

# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`

# Install dependencies
pip install -r requirements.txt

### Follow this order to avoid migration issues due to CustomUser model dependency

# Step 1: Apply migrations for the users app

python manage.py makemigrations users
python manage.py migrate users

# Step 2: Apply migrations for the notes app

python manage.py makemigrations notes
python manage.py migrate notes

# Step 3: Apply any remaining migrations

python manage.py makemigrations
python manage.py migrate

# Run backend server
python manage.py runserver 7070
```

### Frontend Setup
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```






