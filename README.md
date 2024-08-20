## Running the Project Locally

### Prerequisites

- **Node.js and npm**: Make sure Node.js and npm (Node Package Manager) are installed on your machine. You can check by running the following commands in your terminal:
  ```bash
  node -v
  npm -v
If you don't have Node.js installed, you can download it from nodejs.org.

Steps to Run the Project
Clone the Repository

Open your terminal and run the following command to clone the repository:
bash
Copy code
git clone https://github.com/stephendyoungjr/StudentWellnessTracker.git
Navigate into the cloned directory:
bash
Copy code
cd StudentWellnessTracker
Install Dependencies

Install the required npm packages listed in the package.json file:
bash
Copy code
npm install
Run the Project

Start the development server by running:
bash
Copy code
npm start
This command will open the project in your default web browser at http://localhost:3000. You should see the "Student Wellness Tracker" app running.
Testing the Deployment
To test if the app is accessible online:

Visit the GitHub Pages URL

Open a web browser and navigate to the following URL:
arduino
Copy code
https://stephendyoungjr.github.io/StudentWellnessTracker
Ensure the app loads correctly and that all features work as expected.
Troubleshooting
CORS Issues: If the app makes API calls, ensure that CORS (Cross-Origin Resource Sharing) is properly configured.
Browser Compatibility: Test the app in different browsers (Chrome, Firefox, Safari, etc.) to ensure consistent behavior.
GitHub Pages Cache: If changes aren't reflected immediately on GitHub Pages, try refreshing the page or clearing your browser cache.