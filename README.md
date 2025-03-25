# Full Stack Note App (Django & ReactJS)

This repository contains a full-stack note-taking application built using Django(DRF) for the backend and ReactJS for the frontend. The application allows users to create, read, update, pin, unpin and delete notes efficiently.

## Features

- **User Authentication**: Secure user registration, login, and logout functionalities with JWT-based authentication.
- **CRUD Operations**: Create, view, edit,(pin & unpin) and delete notes.
- **Token Refresh & Blacklisting**: Automatic access token refresh and blacklisting upon logout.
- **Search & Pin Notes**: Users can search and pin important notes.
- **Responsive Design**: Optimized for various devices to provide a seamless user experience.

## Technologies Used

- **Backend**: Django, Django REST Framework, Simple JWT
- **Frontend**: ReactJS, JavaScript, HTML, CSS , TailwindCss
- **Database**: SQLite (default, can be configured to use other databases)

## API Endpoints

### Authentication Endpoints (`/api/auth/`)

- `POST /api/auth/register/` - Register a new user.
- `POST /api/auth/login/` - Login and obtain access & refresh tokens.
- `POST /api/auth/logout/` - Logout and blacklist the refresh token.
- `GET /api/auth/get-user/` - Retrieve the authenticated user's information.
- `GET /api/auth/protectedAPI/` - Access a protected route (requires authentication).
- `POST /api/token/refresh/` - Refresh the access token.

### Notes Endpoints (`/api/v1/notes/`)

- `GET /api/v1/notes/` - Retrieve a list of all notes.
- `POST /api/v1/notes/add-note/` - Create a new note.
- `GET /api/v1/notes/<id>/` - Retrieve a specific note by ID.
- `PUT /api/v1/notes/update/<id>/` - Update a note by ID.
- `DELETE /api/v1/notes/delete/<id>/` - Delete a note by ID.
- `POST /api/v1/notes/pin-note/<id>/` - Pin or unpin a note.
- `GET /api/v1/notes/search-notes/` - Search for notes.

## Token Management & Blacklisting

The application implements token management using Django REST Framework's Simple JWT:
- Access tokens expire after a short period.
- Refresh tokens can be used to generate new access tokens (`/api/token/refresh/`).
- When a user logs out, the refresh token is blacklisted, ensuring it cannot be reused.

## Getting Started

### Prerequisites

Ensure you have the following installed on your system:

- Python (preferably 3.8 or higher)
- Node.js and npm
- Git

### Installation

#### Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/AdityaK0/FullStackNoteApp-Django-ReactJs.git
   cd FullStackNoteApp-Django-ReactJs
   ```

2. Navigate to the backend directory:
   ```bash
   cd backend
   ```

3. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

4. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

5. Apply migrations and start the backend server:
   ```bash
   python manage.py migrate
   python manage.py runserver
   ```
   The backend will be available at `http://127.0.0.1:7070/`.

#### Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install frontend dependencies:
   ```bash
   npm install
   ```

3. Start the frontend server:
   ```bash
   npm start
   ```
   The frontend application will run at `http://localhost:5173/`.

## Usage

- **Access the Application**: Open `http://localhost:5173/` in your browser.
- **Register/Login**: Create an account or log in.
- **Manage Notes**: Add, edit, delete, pin , unpin and search for notes.
- **Token Management**: The application automatically refreshes access tokens when needed.



