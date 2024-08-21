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
  TimeScale,
} from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';
import 'chartjs-adapter-date-fns'; // Import date adapter for time scale

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  TimeScale,
  annotationPlugin
);

const MoodChart = ({ data }) => {
  const [timeScale, setTimeScale] = useState('days'); // Default time scale

  const getChartData = (scale) => {
    let range;
    switch (scale) {
      case 'weeks':
        range = 30; // Show a month (30 days)
        break;
      case 'months':
        range = 365; // Show a year (365 days)
        break;
      default:
        range = 14; // Show 2 weeks (14 days)
    }

    const chartData = [];
    for (let i = -range / 2; i <= range / 2; i++) {
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() + i);

      const dateStr = currentDate.toISOString().split('T')[0];

      const entry = data.find((entry) => entry.date === dateStr);
      let burnoutScore = entry ? entry.burnoutScore : null;

      if (!burnoutScore && i > 0 && chartData.length > 0) {
        const previousScore = chartData[chartData.length - 1].burnoutScore;
        burnoutScore = Math.max(previousScore - 0.5, 0); // Gradual recovery
      }

      chartData.push({
        date: dateStr,
        burnoutScore: burnoutScore || 0,
      });
    }

    return {
      labels: chartData.map((entry) => entry.date),
      datasets: [
        {
          label: 'Burnout Likelihood Over Time',
          data: chartData.map((entry) => entry.burnoutScore),
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
        type: 'time', // Use the time scale here
        time: {
          unit: timeScale === 'days' ? 'day' : timeScale === 'weeks' ? 'week' : 'month',
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
          ...chartData.datasets[0].data.reduce((annotations, score, index) => {
            if (score >= 10) {
              annotations[`burnoutPoint${index}`] = {
                type: 'point',
                xValue: chartData.labels[index],
                yValue: score,
                backgroundColor: 'rgb(255, 99, 132)',
                radius: 5,
                label: {
                  content: `Burnout Risk on ${chartData.labels[index]}`,
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
      <div className="period-selector">
        <button
          className={`period-button ${timeScale === 'days' ? 'active' : ''}`}
          onClick={() => setTimeScale('days')}
        >
          Days
        </button>
        <button
          className={`period-button ${timeScale === 'weeks' ? 'active' : ''}`}
          onClick={() => setTimeScale('weeks')}
        >
          Weeks
        </button>
        <button
          className={`period-button ${timeScale === 'months' ? 'active' : ''}`}
          onClick={() => setTimeScale('months')}
        >
          Months
        </button>
      </div>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default MoodChart;
