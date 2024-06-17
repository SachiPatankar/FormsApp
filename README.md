#FormsApp

Installation Steps:
- Go into the project folder
- Open a terminal and type cd backend/
- Type npm i
- Type nodemon index.js
- Open a new terminal and type cd frontend-forms/
- Type npm i
- Type npm run dev
- Go to the given link to view the website
  
Description:
FormsApp is a simple MERN stack web application designed to collect user information via forms and store it in a database. Additionally, it allows sending data to a remote Excel file for further processing or analysis.

Features:
- Form Validation: Implemented using Yup to ensure data integrity.
- International Phone Input: Utilizes react-phone-input-2 for user-friendly input of international country codes and phone numbers.
- Excel File Update: Utilizes googleapis to update a remote Excel file with the collected form data.
- Responsive Design: Inspired by Google Forms, the application features a responsive and straightforward design.

Tech Stack

Frontend:
- React.js with Tailwind CSS
- React Router for navigation
- Yup for form validation
- React Icons for icons
  
Backend:
- Node.js with Express.js for server-side logic
- MongoDB with Mongoose for database management
- Axios for HTTP requests handling
- CORS for enabling cross-origin requests
- Dotenv for managing environment variables
