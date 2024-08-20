import React, { useState } from 'react';
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
  Filler,
} from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  annotationPlugin
);

const MoodChart = ({ data }) => {
  const [timeScale, setTimeScale] = useState('days'); // Default time scale

  const getChartData = (scale) => {
    return {
      labels: data.map(entry => entry.date),
      datasets: [
        {
          label: 'Burnout Likelihood Over Time',
          data: data.map(entry => entry.burnoutScore),
          fill: 'start',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgb(255, 99, 132)',
          tension: 0.1,
        },
      ],
    };
  };

  const chartData = getChartData(timeScale);

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Burnout Likelihood Score',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Date',
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const score = tooltipItem.raw;
            let riskLevel = 'Low Risk';
            if (score >= 10) riskLevel = 'High Risk';
            else if (score >= 7) riskLevel = 'Moderate Risk';
            return `Burnout Score: ${score} (${riskLevel})`;
          },
        },
      },
      annotation: {
        annotations: {
          thresholdLine: {
            type: 'line',
            yMin: 10,
            yMax: 10,
            borderColor: 'rgb(255, 165, 0)',
            borderWidth: 2,
            label: {
              content: 'High Burnout Risk Threshold',
              enabled: true,
              position: 'center',
              backgroundColor: 'rgba(255, 165, 0, 0.7)',
            },
          },
          ...data.reduce((annotations, entry, index) => {
            if (entry.burnoutScore >= 10) {
              annotations[`burnoutPoint${index}`] = {
                type: 'point',
                xValue: entry.date,
                yValue: entry.burnoutScore,
                backgroundColor: 'rgb(255, 99, 132)',
                radius: 5,
                label: {
                  content: `Burnout Risk on ${entry.date}`,
                  enabled: true,
                  position: 'top',
                },
              };
            }
            return annotations;
          }, {}),
        },
      },
    },
  };

  return (
    <div>
      <div>
        <button onClick={() => setTimeScale('days')}>Days</button>
        <button onClick={() => setTimeScale('weeks')}>Weeks</button>
        <button onClick={() => setTimeScale('months')}>Months</button>
      </div>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default MoodChart;
