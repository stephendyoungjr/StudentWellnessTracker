import React, { useState } from 'react';

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
    <form onSubmit={handleSubmit}>
      <div>
        <label>Mood:</label>
        <input type="text" name="mood" value={formData.mood} onChange={handleChange} />
      </div>
      <div>
        <label>Ate Well Today:</label>
        <input type="checkbox" name="ateWell" checked={formData.ateWell} onChange={handleChange} />
      </div>
      <div>
        <label>Hours of Homework:</label>
        <input type="number" name="homeworkHours" value={formData.homeworkHours} onChange={handleChange} />
      </div>
      <div>
        <label>Current GPA:</label>
        <input type="number" name="gpa" value={formData.gpa} onChange={handleChange} step="0.01" />
      </div>
      <div>
        <label>Involved in Extracurricular:</label>
        <input type="checkbox" name="extracurricular" checked={formData.extracurricular} onChange={handleChange} />
      </div>
      {formData.extracurricular && (
        <div>
          <label>Hours in Extracurricular per Day:</label>
          <input type="number" name="extracurricularHours" value={formData.extracurricularHours} onChange={handleChange} />
        </div>
      )}
      <button type="submit">Submit</button>
    </form>
  );
};

export default SurveyForm;
