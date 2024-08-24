import React, { useState } from 'react';
import SurveyForm from './components/SurveyForm';
import MoodChart from './components/MoodChart';
import Chatbox from './components/Chatbox';

import './App.css';

function App() {
  const [surveyData, setSurveyData] = useState([]);

  const calculateBurnoutScore = (entry, previousEntry) => {
    let moodScore = 0;
    switch (entry.mood) {
      case 'Happy':
        moodScore = 1;
        break;
      case 'Neutral':
        moodScore = 2;
        break;
      case 'Tired':
      case 'Sad':
        moodScore = 3;
        break;
      case 'Angry':
      case 'Depressed':
        moodScore = 4;
        break;
      default:
        moodScore = 2;
    }

    const homeworkScore = entry.homeworkHours * 0.5;
    const extracurricularScore = entry.extracurricularHours * 0.3;
    const gpaScore = entry.gpa >= 3.5 ? 2 : 1;

    let burnoutScore = moodScore + homeworkScore + extracurricularScore + gpaScore;

    // Check if the previous entry was a burnout
    if (previousEntry && previousEntry.burnoutScore >= 10) {
      burnoutScore = Math.max(burnoutScore, previousEntry.burnoutScore - 0.5); // Gradually decrease burnout
    }

    return burnoutScore;
  };

  const handleFormSubmit = (formData) => {
    const previousEntry = surveyData[surveyData.length - 1];
    const burnoutScore = calculateBurnoutScore(formData, previousEntry);
    setSurveyData([...surveyData, { ...formData, burnoutScore }]);
  };

  return (
    <div className="App">
      <SurveyForm onSubmit={handleFormSubmit} />
      <MoodChart data={surveyData} />
      <Chatbox submittedData={surveyData} /> {/* Pass surveyData to Chatbox */}
    </div>
  );
}
//add function for new page
export default App;
