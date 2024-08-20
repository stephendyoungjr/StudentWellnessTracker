import React, { useState } from 'react';
import SurveyForm from './components/SurveyForm';
import MoodChart from './components/MoodChart';
import './App.css';

function App() {
  const [surveyData, setSurveyData] = useState([
    { date: '2024-08-18', mood: 3 },
    { date: '2024-08-19', mood: 4 },
  ]);

  const handleFormSubmit = (formData) => {
    setSurveyData([...surveyData, formData]);
  };

  return (
    <div className="App">
      {/* <h1>Student Wellness Tracker</h1> */}
      <SurveyForm onSubmit={handleFormSubmit} />
      <MoodChart data={surveyData} />
    </div>
  );
}

export default App;
