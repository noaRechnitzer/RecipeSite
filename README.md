# Recipe Sharing Website

This project is a web application for sharing and managing recipes. The application consists of a Node.js backend, an Angular frontend, and MongoDB Atlas as the database.

## Features

- Users can create, and delete recipes.
- Recipes can be categorized into multiple categories.
- Users can search  recipes.
- Responsive design for mobile and desktop.
- User authentication and authorization.
- Recipe sharing via public or private settings.

## Technologies Used

### Backend (Server-side)
- **Node.js**: JavaScript runtime for building the server-side of the application.
- **Express.js**: Web framework for routing and handling requests.
- **MongoDB Atlas**: Cloud database for storing recipes and user data.
- **Mongoose**: ODM (Object Data Modeling) for interacting with MongoDB.
- **JWT**: JSON Web Token for user authentication and authorization.
- **bcryptjs**: Password hashing for securing user accounts.

### Frontend (Client-side)
- **Angular**: JavaScript framework for building the client-side UI and managing routing.
- **Angular Material**: UI component library for styling and layout.
- **RxJS**: Library for handling asynchronous operations.
- **Reactive Forms**: For handling dynamic forms and form validation.
- **HTTP Client**: For communication with the Node.js API.

## Installation

### Prerequisites
- Node.js (v14+)
- npm (Node Package Manager)
- Angular CLI (v12+)
- MongoDB Atlas account

### Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/noaRechnitzer/RecipeSite.git
2. **Install server dependencies**:
   ```bash
   cd server-side
   npm install
3. **Install client dependencies**:
   ```bash
   cd client-side
   npm install
4. **Environment variables:** Create a .env file in the server-side folder with the following content:
   ```bash
   PORT=500
   DB_URL=mongodb+srv://noaRe:nR6787661@mycluster.emynhxf.mongodb.net/recipe_siteDB?retryWrites=true&w=majority&appName=MyCluster
   BCRYPT_SALT=<your-bcrypt-salt>
   JWT_SECRET=<your-secret-key>
5. **Run the backend (server)**:
   ```bash
   npm run dev
5. **Run the frontend  (client)**:
   ```bash
   npm start
