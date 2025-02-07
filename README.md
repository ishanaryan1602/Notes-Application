# Note-Making Application

## Project Overview

A note-making application where users can register, log in, and manage their notes securely. Authentication and authorization are implemented using JWT.

## Key Features

- **User Authentication**:
    - Secure registration and login with JWT-based session management.
- **Authorization**:
    - Notes are private, and only the owner can create, edit, or delete them. Unauthorized users cannot perform any CRUD operations on the notes.
    - Unauthorized users can only view the notes.
- **Note Management**:
    - Users can create, view, edit, and delete their notes.
- **Responsive UI**:
    - A simple, intuitive interface designed for both desktop and mobile use.

## Tech Stack

- **Frontend**: React with React Router.
- **Backend**: Node.js, Express.
- **Database**: MongoDB with Mongoose.
- **Authentication**: JWT for secure access.


## Enhanced Features

1. **Search and Filter**:
    - Allow users to search notes by title or tags.
2. **Rich Text Editor**:
    - Enable formatting with bold, italic, and bullet points.
3. **Categories**:
    - Organize notes into categories for better management.
4. **File Attachments**:
    - Upload and attach files or images to notes.
5. **Dark Mode**:
    - Provide an option to toggle between light and dark themes.

## Tech Stack Enhancements

- **Frontend**: Use Tailwind CSS or Material-UI for improved styling.
- **Backend**: Add middleware for advanced error handling.
- **Database**: Optimize with indexing and advanced querying.
