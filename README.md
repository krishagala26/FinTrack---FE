FinTrack – Personal Finance Manager

Track Smarter. Save Better.

FinTrack is a full-stack MERN-based Personal Finance Manager designed to help users monitor income, track expenses, manage budgets, and achieve savings goals through an intuitive dashboard and insightful financial analytics.

Developed as part of the Bharat Academix CodeQuest Hackathon 2026, FinTrack aims to improve financial awareness and encourage smarter money management among students, professionals, freelancers, and small business owners.

---

Problem Statement

Many individuals struggle with:

- Tracking daily expenses
- Managing monthly budgets
- Monitoring savings goals
- Understanding spending patterns
- Maintaining financial discipline

Most existing solutions are either too complex or lack personalized financial planning features.

---

Proposed Solution

FinTrack provides a centralized platform where users can:

- Record income and expenses
- Monitor financial health through a dashboard
- Set monthly budgets
- Track savings goals
- Analyze spending habits through visual reports
- Make informed financial decisions

---

Key Features

User Authentication

- Secure Sign Up & Login
- JWT Authentication
- Password Hashing using bcrypt

Dashboard

- Total Income Overview
- Total Expense Overview
- Current Balance Calculation
- Savings Summary
- Financial Insights

Transaction Management

- Add Transactions
- Edit Transactions
- Delete Transactions
- Categorized Expense Tracking

Categories include:

- Food
- Travel
- Shopping
- Bills
- Entertainment
- Other

Budget Planning

- Set Monthly Budgets
- Category-wise Budget Monitoring
- Spending Limit Alerts
- Budget Utilization Tracking

Savings Goals

- Create Savings Goals
- Set Target Amount
- Track Progress
- Monitor Goal Completion

Financial Analytics

- Expense Distribution Pie Chart
- Income vs Expense Analysis
- Monthly Spending Trends
- Interactive Visual Reports

---

Technology Stack

Frontend

- React.js
- Vite
- Tailwind CSS
- Axios
- Recharts

Backend

- Node.js
- Express.js

Database

- MongoDB Atlas
- Mongoose

Authentication

- JWT (JSON Web Token)
- bcrypt

---

System Architecture

User
↓
React Frontend
↓
Express REST API
↓
MongoDB Atlas Database

Authentication Layer:
JWT + bcrypt

---

Database Collections

Users

- Name
- Email
- Password

Transactions

- Amount
- Type (Income / Expense)
- Category
- Description
- Date

Budgets

- Monthly Budget
- Category Budget
- User Reference

Goals

- Goal Name
- Target Amount
- Saved Amount
- Deadline

---

Project Highlights

- Secure Authentication System
- Complete CRUD Operations
- Responsive User Interface
- Data Visualization with Charts
- Real-world Financial Use Case
- Scalable MERN Architecture
- Clean Dashboard Experience

---

Future Scope

- AI-Powered Spending Insights
- Smart Budget Recommendations
- UPI Integration
- Investment Portfolio Tracking
- Voice Assistant Support
- PDF Report Generation
- Multi-Currency Support

---

Installation & Setup

Backend

cd backend
npm install
npm run dev

Frontend

cd frontend
npm install
npm run dev

--

Team Leader

Krisha Gala

Team Members

Saniya Durgude
Sharvari Thale

---

Hackathon Submission

Project: FinTrack – Personal Finance Manager

Category: FinTech

Built for: Bharat Academix CodeQuest Hackathon 2026

Status: Functional MVP

---

License

This project is developed for educational and hackathon purposes.
