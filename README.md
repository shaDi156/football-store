Football Jersey Catalog

A football jersey catalog with search, ordering, and mock authentication.
The project uses a React frontend, a React-based backend, and a local SQL database.

Features

Browse a grid of football jerseys with pricing and images

Search products instantly from the navigation bar

Place orders with quantity, contact info, address, and payment method

Orders and users are stored in a database

Basic login and sign-up functionality

Tech Stack

Frontend

React

Vite

Backend

React-based backend application

Node.js & npm

Database

SQL (local database)

Setup Instructions (Important)
1. Backend Setup

Download the backend files.

Place all backend files into a single folder.

Open a terminal in that backend folder.

Install dependencies:

npm install


Start the backend application:

npm start


Keep the backend running while using the frontend.

2. Database Setup

Download the provided .sql file.

Open your local database tool (e.g., MySQL, phpMyAdmin, or similar).

Create a local database.

Paste the contents of the .sql file into the database query editor.

Run the script to create and populate the database.

Verify that tables and data are visible in your local database.

3. Frontend Setup

Open the frontend project folder.

Install dependencies:

npm install


Run the development server:

npm run dev


Open the displayed local URL (usually http://localhost:5173).

Project Structure
src/
 ├── App.jsx              # Root layout
 ├── components/
 │    ├── Navbar.jsx      # Search, login, signup
 │    └── Products.jsx   # Product catalog and ordering
 ├── assets/              # Jersey images and branding

Notes

The backend must be running for full functionality.

The database must be properly imported from the .sql file.

This project is intended for local development only.
