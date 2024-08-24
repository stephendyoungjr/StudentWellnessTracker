import React, { useState } from 'react';
import axios from 'axios';
import './Chatbox.css';

const Chatbox = ({ submittedData }) => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('Waiting for submission');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!submittedData || submittedData.length === 0) {
      setResponse('No data submitted yet. Please fill out the form.');
      return;
    }
    setLoading(true);

    try {
      const apiResponse = await axios.post('http://localhost:5001/api/chat', {
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: `User's data: ${JSON.stringify(submittedData)}` },
          { role: 'user', content: input },
        ],
      });

      //SET REPONSE

      setResponse(apiResponse.data.choices[0].message.content);
    } catch (error) {
      console.error('Error fetching response:', error);
      setResponse('Error fetching response. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chatbox-container">
      <div className="chatbox">
        <div className="chatbox-response">
          <img src="/1698535.png" alt="Robot Icon" className="chatbox-icon" />
          {loading ? 'Loading...' : response}
        </div>
        <form onSubmit={handleSubmit} className="chatbox-form">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything..."
            className="chatbox-input"
          />
          <button type="submit" className="chatbox-submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Chatbox;
