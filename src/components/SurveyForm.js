import React, { useState } from 'react';
import './SurveyForm.css';

const SurveyForm = () => {
  const [formData, setFormData] = useState({
    mood: '',
    ateWell: false,
    homeworkHours: 0,
    gpa: 0.0,
    extracurricular: false,
    extracurricularHours: 0,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="survey-container">
      <form onSubmit={handleSubmit} className="survey-form">
        <h1 className="survey-title">Student Wellness Tracker</h1>
        <div className="form-group">
          <label>Mood:</label>
          <input type="text" name="mood" value={formData.mood} onChange={handleChange} className="form-control" />
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
