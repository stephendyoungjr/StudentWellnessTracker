import React from 'react';
import SurveyForm from './components/SurveyForm';
import MoodChart from './components/MoodChart';
import './App.css';

function App() {
  const sampleData = [
    { date: '2024-08-18', mood: 3 },
    { date: '2024-08-19', mood: 4 },
  ];

  return (
    <div className="App">
      <h1>Student Wellness Tracker</h1>
      <SurveyForm />
      <MoodChart data={sampleData} />
    </div>
  );
}

export default App;

