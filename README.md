# RPS Works - Freelancing Platform

## Introduction

RPS Works is a MERN-stack freelancing platform designed to bridge the gap between clients and freelancers by providing a streamlined process for project posting, bidding, communication, and management.

---
## Demo Video

Watch our [Demo Video](https://drive.google.com/file/d/1kxbnWgPMxBk69sH4b41MZr0WC5yWXOFF/view?usp=sharing) 

---


### Team Members (Team ID: NM2024TMID00550)
- Rohith CS - Project Manager (Team Lead)
- Praveen P - Frontend Developer
- Sathya S - Backend Developer
- Santhosh C - Database Manager

---

## Project Features

- User Registration & Authentication: Secure account creation for clients, freelancers, and admin roles.
- Freelancer Dashboard: View available projects, submit bids, update skills, and track projects.
- Client Dashboard: Create and post projects, review bids, and manage project statuses.
- Real-Time Chat: Seamless communication between clients and freelancers.
- Project Posting & Bidding: Clients post projects; freelancers place bids with proposals and timelines.
- Admin Panel: Centralized monitoring and management of users, projects, and applications.

---

## Technologies Used

- Frontend: React.js with React Router and centralized state management (e.g., Redux or Context API).
- Backend: Node.js with Express.js.
- Database: MongoDB with collections for users, projects, applications, and chat.
- Real-Time Communication: WebSockets for live chat functionality.

---

## Setup Instructions

### Prerequisites
- Node.js (v14+)
- MongoDB (local or cloud-based, e.g., MongoDB Atlas)
- npm (Node Package Manager)

1. Clone the repository:
   bash
   git clone <repository_url>
2. Navigate to the project directory
3. Install dependencies for both frontend and backend:
   bash
    cd client && npm install
    cd ../server && npm install
4.Start MongoDB locally or ensure your cloud instance is active.

---

## Running the Application

### Frontend:
Navigate to the frontend folder and run:

    npm start

The frontend will be available at http://localhost:3000.

### Backend:
Navigate to the backend folder and run:

    node index.js

The backend will be available at http://localhost:8000.

---
## Folder Structure
### Client:

- src/components: Reusable UI components (e.g., Login, Navbar).
- src/context: Global state management.
- src/pages: Main pages (e.g., Freelancer Dashboard, Client Dashboard).
- styles: CSS files for consistent design.
  
### Server:

- index.js: Entry point for Express server.
- Schema.js: MongoDB schema definitions for users, projects, and bids.
- SocketHandler.js: Handles WebSocket connections for real-time chat.

--- 

## Key Features 
### Screens
- Landing Page
- Freelancer & Client Dashboards
- Real-Time Chat Interface
- Admin Panel

---
## Known Issues
- Real-Time Chat Lag: Slight delays under high load conditions.
- Rendering on Large Data Sets: Slower rendering when displaying extensive data.

---

## Future Enhancements
- Notifications: Alerts for new bids, approvals, and messages.
- Payment Integration: Secure payment systems for clients and freelancers.
- Advanced Filters: Enhanced project search and filtering options.

---
## Conclusion
RPS Works is a robust full-stack application built with the MERN stack, designed to facilitate efficient project management in the freelancing domain. It provides a seamless experience for clients and freelancers while offering room for future enhancements.
