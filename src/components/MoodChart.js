import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const MoodChart = ({ data }) => {
  const chartData = {
    labels: data.map(entry => entry.date),
    datasets: [
      {
        label: 'Mood Over Time',
        data: data.map(entry => entry.mood),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
      {
        label: 'Burnout Risk',
        data: data.map(entry => 
          // Check if the mood is not "Happy" or "Neutral"
          (['Sad', 'Depressed', 'Angry', 'Tired'].includes(entry.mood) && 
           entry.sleep + entry.school + entry.homework > 22 && entry.gpa >= 3.5)
          ? entry.mood : null
        ),
        fill: true,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        tension: 0.1,
        pointRadius: 0, // No points, just shading
      }
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function(tooltipItem) {
            if (tooltipItem.datasetIndex === 1) {
              return 'Burnout Risk';
            } else {
              return `Mood: ${tooltipItem.raw}`;
            }
          }
        }
      }
    }
  };

  return <Line data={chartData} options={options} />;
};

export default MoodChart;
