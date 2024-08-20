import React, { useState } from 'react';
import SurveyForm from './components/SurveyForm';
import MoodChart from './components/MoodChart';
import './App.css';

function App() {
  const [surveyData, setSurveyData] = useState([]);

  const calculateBurnoutScore = (entry) => {
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

    const homeworkScore = entry.homeworkHours * 0.5; // Higher weight for more homework
    const extracurricularScore = entry.extracurricularHours * 0.3; // Weight for extracurricular hours
    const gpaScore = entry.gpa >= 3.5 ? 2 : 1; // Higher GPA adds to burnout likelihood

    // Total burnout score combining all factors
    return moodScore + homeworkScore + extracurricularScore + gpaScore;
  };

  const handleFormSubmit = (formData) => {
    const burnoutScore = calculateBurnoutScore(formData);
    setSurveyData([...surveyData, { ...formData, burnoutScore }]);
  };

  return (
    <div className="App">
      <SurveyForm onSubmit={handleFormSubmit} />
      <MoodChart data={surveyData} />
    </div>
  );
}

export default App;
