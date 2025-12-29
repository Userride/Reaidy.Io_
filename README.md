1.Personalized Learning Path Generator

An AI-powered web platform that generates personalized learning roadmaps for users based on skill assessments (MCQs) and AI recommendations. The system evaluates user skills, suggests what to learn next, visualizes the learning path as an interactive roadmap, and allows progress tracking with PDF export.

2.Live Demo

Backend (API): https://reaidy-io-qkie.onrender.com

Demo User Credentials:

Email: demo@learning.com

Password: password123

3.Key Features
✅ Authentication

User Signup & Login using JWT

Secure protected APIs

4 Skill Assessment (MCQ)

JavaScript & Database MCQ tests

Automatic score calculation

Skill level detection (Beginner / Intermediate / Advanced)

->AI Recommendation

Uses OpenAI (or rule-based fallback) to:

Analyze skill levels

Suggest next topics

Decide learning order

Recommend resources

4.Personalized Learning Roadmap

Dynamic DAG-style roadmap using D3.js

Clickable nodes

Mark topics as completed

Progress percentage tracking

5. PDF Export

Export personalized roadmap as a PDF using jsPDF

6. Tech Stack
Frontend

React.js

D3.js (roadmap visualization)

jsPDF (PDF export)

Tailwind / custom CSS

Backend

Node.js

Express.js

MongoDB + Mongoose

JWT Authentication

OpenAI API (AI recommendations)

7. System Flow (How It Works)

User signs up / logs in

User takes MCQ skill assessment

Answers are validated against correct options in MongoDB

Scores are calculated

Skill level is derived (Beginner / Intermediate / Advanced)

AI analyzes skill level and suggests:

Topics

Learning order

Resources

A personalized roadmap is generated

User marks topics as completed

Progress is tracked and saved

Roadmap can be exported as PDF
