# Learning Platform

A modern web-based learning platform built with React that allows users to browse, preview, and enroll in various courses.

## Features

- Course browsing and categorization
- Course preview functionality
- User enrollment system
- Course content exploration
- Progress tracking
- Responsive design
- Video background integration
- Authentication system

## Tech Stack

- Frontend: React.js
- Backend: Node.js/Express.js (running on port 5000)
- Authentication: JWT (JSON Web Tokens)
- Styling: CSS

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Modern web browser

## Installation

1. Clone the repository:
```bash
git clone(https://github.com/Rishikeshkumarmahato/Lnmcbm-Final-Project)
```

2. Install dependencies:
```bash
cd learning
npm install
```

3. Start the development server:
```bash
npm start
```

4. The application will be available at `http://localhost:5000`

## Project Structure

```
learning/
├── src/
│   ├── Components/
│   │   ├── courses.jsx
│   │   ├── Header.jsx
│   │   ├── AllCoursesContent.jsx
│   │   └── Courses.css
│   ├── assets/
│   │   └── course_background.mp4
│   └── App.js
```

## Features in Detail

### Course Management
- Browse courses by categories
- Preview course details before enrollment
- View course content and resources
- Track course progress

### User Features
- User authentication
- Course enrollment
- Progress tracking
- Course content access

### UI/UX
- Modern and responsive design
- Video background integration
- Modal-based course previews
- Interactive course exploration interface

## API Endpoints

The application interacts with a backend API running on `http://localhost:5000`:

- `POST /api/enrollment/enroll` - Enroll in a course
- `GET /api/enrollment/my-courses` - Get enrolled courses


## Contact

Email - mahatorishikeshkumar@gmail.com

Project Link: (https://github.com/Rishikeshkumarmahato/Lnmcbm-Final-Project)
