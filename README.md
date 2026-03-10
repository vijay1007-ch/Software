Staff Attendance Management System – Frontend Dashboard (FWD Project)

The Staff Attendance Management System is a web-based dashboard designed to manage staff records and attendance in an organized way.

It provides interfaces for managing staff data, marking attendance, viewing reports, and monitoring records through a structured frontend built using HTML, CSS, and JavaScript.

This frontend was developed for the Frontend Web Development (FWD) course to demonstrate understanding of CO1–CO5 concepts, including HTML structure, CSS layouts, JavaScript fundamentals, DOM manipulation, asynchronous operations, and modern web practices.

Features
Login System

Secure login page for staff or administrator.

Login form with validation

Password input field

Basic authentication check using JavaScript

Session stored in localStorage

Dashboard

Central interface after login.

Sidebar navigation

Navigation to different modules

Dynamic content loading area

Modules available in dashboard:

Overview

Staff Management

Attendance

Profile

Staff Management

Used to manage staff records.

Add new staff members

View staff details

Delete staff records

Staff list displayed in table format

Attendance Management

Handles attendance operations.

Select staff member

Mark attendance

View attendance records

Attendance stored through backend APIs

Profile Page

Displays logged-in user information.

View user details

Edit profile information

Change password functionality

Tech Stack
HTML5

Used for the structural layout of pages.

Semantic tags such as header, section, article, table

Forms for data input

Navigation elements

CSS3

Used for styling and responsive layouts.

Flexbox layout

Grid layout

CSS variables

Animations and transitions

Responsive design using media queries

JavaScript (ES6)

Used for dynamic functionality.

DOM manipulation

Event listeners

Form validation

Fetch API for backend communication

LocalStorage for session management

Modular JavaScript files

Backend Integration

The frontend communicates with a Spring Boot REST API backend running at:

http://localhost:8080/api/

The backend manages:

Staff data

Attendance records

Authentication

Course Outcomes Mapping (FWD CO1–CO5)
CO1 – Internet, HTML & Intro CSS

Files:

login.html
dashboard.html
attendance.html
staff.html
profile.html

Concepts demonstrated:

HTML structure

Basic CSS styling

Forms and links

CO2 – Forms, Semantics & Layouts

Files:

staff.html
attendance.html
dashboard.html

CSS files:

style.css
dashboard.css
attendance.css
staff.css

Concepts demonstrated:

Semantic HTML elements

Flexbox layouts

Table layouts

Form design

CO3 – JavaScript Fundamentals

JavaScript files:

login.js
dashboard.js
attendance.js
staff.js
profile.js

Concepts demonstrated:

Variables and functions

Arrays and objects

Loops and conditions

Modular code structure

CO4 – DOM, Events, Async & Storage

Concepts implemented:

Event listeners for buttons and forms

Dynamic DOM updates

Fetch API calls to backend

LocalStorage for login session

Asynchronous programming using async/await

CO5 – Advanced Web Concepts

Advanced concepts demonstrated:

REST API integration with Spring Boot backend

Client-side form validation

Modular JavaScript using ES6

Single-page style dashboard navigation

Project Structure (Frontend)
frontend/
│
├── HTML/
│   ├── login.html
│   ├── dashboard.html
│   ├── staff.html
│   ├── attendance.html
│   └── profile.html
│
├── CSS/
│   ├── style.css
│   ├── dashboard.css
│   ├── staff.css
│   ├── attendance.css
│   └── profile.css
│
├── js/
│   ├── login.js
│   ├── dashboard.js
│   ├── staff.js
│   ├── attendance.js
│   └── profile.js
│
└── README.md
How to Run (Frontend)

Open the frontend folder in VS Code.

Start a static server such as Live Server extension.

Open the main page:

login.html

Ensure the backend server is running:

http://localhost:8080

Login through the login page and navigate through the dashboard modules.

Backend Requirement

The frontend requires a Spring Boot backend running locally with REST APIs for:

Staff management

Attendance records

Authentication

Example API base URL:

http://localhost:8080/api/