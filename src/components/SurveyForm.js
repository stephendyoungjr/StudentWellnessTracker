import React, { useState } from 'react';

import './SurveyForm.css';

const SurveyForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    mood: '',
    ateWell: false,
    homeworkHours: 0,
    gpa: 0.0,
    extracurricular: false,
    extracurricularHours: 0,
    date: new Date().toISOString().split('T')[0],
  });

  const [activePeriod, setActivePeriod] = useState('day'); // State for tracking the active period

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handlePeriodClick = (period) => {
    setActivePeriod(period);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      mood: '',
      ateWell: false,
      homeworkHours: 0,
      gpa: 0.0,
      extracurricular: false,
      extracurricularHours: 0,
      date: new Date().toISOString().split('T')[0],
    });
  };

  return (
    <div className="survey-container">
      <form onSubmit={handleSubmit} className="survey-form">
        <h1 className="survey-title">Student Wellness Tracker</h1>

        {/* Period Selection */}
        <div className="period-selector">
          <button
            type="button"
            className={`period-button ${activePeriod === 'day' ? 'active' : ''}`}
            onClick={() => handlePeriodClick('day')}
          >
            Day
          </button>
          <button
            type="button"
            className={`period-button ${activePeriod === 'week' ? 'active' : ''}`}
            onClick={() => handlePeriodClick('week')}
          >
            Week
          </button>
          <button
            type="button"
            className={`period-button ${activePeriod === 'year' ? 'active' : ''}`}
            onClick={() => handlePeriodClick('year')}
          >
            Year
          </button>
        </div>

        <div className="form-group">
          <label>Mood:</label>
          <select name="mood" value={formData.mood} onChange={handleChange} className="form-control">
            <option value="">Select your mood</option>
            <option value="Happy">Happy</option>
            <option value="Sad">Sad</option>
            <option value="Tired">Tired</option>
            <option value="Angry">Angry</option>
            <option value="Depressed">Depressed</option>
            <option value="Neutral">Neutral</option>
          </select>
        </div>
        <div className="form-group">
          <label>Ate Well Today:</label>
          <input type="checkbox" name="ateWell" checked={formData.ateWell} onChange={handleChange} className="form-checkbox" />
        </div>
        <div className="form-group">
          <label>Hours of Homework:</label>
          <input type="number" name="homeworkHours" value={formData.homeworkHours} onChange={handleChange} className="form-control" />
        </div>
        <div className="form-group">
          <label>Current GPA:</label>
          <input type="number" name="gpa" value={formData.gpa} onChange={handleChange} step="0.01" className="form-control" />
        </div>
        <div className="form-group">
          <label>Involved in Extracurricular:</label>
          <input type="checkbox" name="extracurricular" checked={formData.extracurricular} onChange={handleChange} className="form-checkbox" />
        </div>
        {formData.extracurricular && (
          <div className="form-group">
            <label>Hours in Extracurricular per Day:</label>
            <input type="number" name="extracurricularHours" value={formData.extracurricularHours} onChange={handleChange} className="form-control" />
          </div>
        )}
        <button type="submit" className="form-button">Submit</button>
      </form>
    </div>
  );
};

export default SurveyForm;
