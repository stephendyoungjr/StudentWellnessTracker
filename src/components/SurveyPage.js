import React, { useState } from 'react';
import SurveyForm from './SurveyForm';
import MoodChart from './MoodChart';

const SurveyPage = () => {
  const [surveyData, setSurveyData] = useState([]);

  const handleFormSubmit = (formData) => {
    setSurveyData([...surveyData, formData]);
  };

  return (
    <div>
      <SurveyForm onSubmit={handleFormSubmit} />
      <MoodChart data={surveyData} />
    </div>
  );
};

export default SurveyPage;
