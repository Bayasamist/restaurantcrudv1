                    Restaurant CRUD Application
Project Overview
This is a full-stack CRUD application built using Node.js, Express, React.js, and MongoDB. It follows best practices for development and includes DevOps practices like Continuous Integration (CI) and Continuous Deployment (CD). The app features user authentication with JWT (JSON Web Tokens) and automatic testing and deployment to AWS EC2.

Technologies Used
  -Backend: Node.js, Express, MongoDB

  -Frontend: React.js

  -Authentication: JWT (JSON Web Tokens)

  -Version Control: GitHub

  -CI/CD: GitHub Actions, AWS EC2



JIRA Project Board
JIRA Project Board URL:(https://connectqutedu-my.sharepoint.com/:f:/g/personal/n11824573_qut_edu_au/EjKkAYzR00NBiyFo7R4j0UYB71p9HE_5hqmC6wt6ZbFN-A?e=Pg5tKm) 

Epics: High-level goals like "User Authentication," "CRUD Operations," and "UI/UX Improvements."

User Stories: Each feature or user requirement is broken down into user stories.

Child Issues/Subtasks: Tasks that break down user stories into smaller steps.

Sprints: Tasks organized into development cycles for progress tracking.

SysML Requirement Diagram
Diagram URL: https://connectqutedu-my.sharepoint.com/:f:/g/personal/n11824573_qut_edu_au/EjKkAYzR00NBiyFo7R4j0UYB71p9HE_5hqmC6wt6ZbFN-A?e=Pg5tKm

The SysML diagram shows how different parts of the application (backend, frontend, and database) interact and meet the system's requirements.

GitHub Repository
Backend GitHub Repo: (https://github.com/Bayasamist/restaurantcrudv1.git)

Frontend GitHub Repo: https://github.com/Bayasamist/restaurantcrudv1.git

Project Setup Instructions
Backend Setup
Clone the Repository:

bash

git clone https://github.com/Bayasamist/restaurantcrudv1.git
  cd backend
    -Install Dependencies: npm install

  cd frontend 
    -npm install



.env

MONGO_URI=mongodb+srv://Bayasa:Bemg03171401@cluster0.y808g.mongodb.net/restaurantcrudv1?retryWrites=true&w=majority&appName=Cluster0
PORT=5001
JWT_SECRET=2J8zqkP7VN6bxzg+Wy7DQZsd3Yx8mF3Bl0kch6HYtFs=`


bash

npm start
The backend should now be running at http://localhost:5001.

Frontend Setup
Clone the Repository:

bash
  -cd backend
    -node index
  -cd frontend
    -npm start
The frontend should now be running at http://localhost:3000. / 3.27.156.209    

CI/CD Pipeline Details
The CI/CD pipeline is set up using GitHub Actions to automate our deployment process. Below is an overview of how it's configured:

CI/CD Workflow:
GitHub Actions Workflow File: The workflow file is located in .github/workflows/ci.yml.

CI Pipeline:

Every time a commit or pull request is made, tests are run automatically.

Example of the workflow configuration:

yaml

name: CI/CD Pipeline

on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v2
    - name: Set up Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '14'
    - run: npm install
    - run: npm run lint
    - run: npm test
CD Pipeline (Deployment):

Once CI passes, the backend is deployed to AWS EC2 using Docker and AWS ECS.

The frontend is deployed to AWS S3 with CloudFront for content delivery.

Authentication & Authorization
JWT Authentication: This app uses JWT tokens to authenticate users and control access to different parts of the app.

Protected Routes: Only authenticated users can access certain routes, ensuring secure data handling.

Project Workflow
User Authentication: Users can sign up and log in, with the app using JWT to keep them authenticated.

  Create Operations: Users can add new order, add new menu, 

  Read Operations: Users can view data, such as orders, in tables, and lists.

  Update Operations: Users can update order, menu and table

  Delete Operations: Users can remove order, menu items, tables.


Frontend & Backend Integration: The frontend interacts with the backend using API calls to perform all CRUD actions.

Challenges & Problem-Solving
Handling 400/500 Errors: I ensured that both the frontend and backend handle errors gracefully, showing the user clear messages when something goes wrong.

Ensuring Data Integrity: The backend validates all incoming data to prevent issues with inconsistent or incorrect records.

CI/CD Setup: Setting up the CI/CD pipeline for automated deployments to AWS took some time, but now updates are seamlessly deployed.

Conclusion
This project demonstrates how to build a full-stack CRUD application with proper authentication and authorization, following best practices in DevOps. The CI/CD pipeline ensures that every update is tested and deployed automatically, helping maintain a smooth development and deployment process.

