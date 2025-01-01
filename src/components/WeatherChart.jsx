import React, { useEffect, useRef } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register the necessary components for the chart
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const WeatherChart = ({ chartData, chartOptions }) => {
  const chartRef = useRef(null);  // Reference to the canvas element
  const chartInstanceRef = useRef(null); // Reference to the chart instance

  useEffect(() => {
    const ctx = chartRef.current; // Get the canvas element

    if (ctx) {
      // If a chart already exists, destroy it before creating a new one
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      // Create a new chart instance
      chartInstanceRef.current = new ChartJS(ctx, {
        type: 'bar', // Example chart type
        data: chartData,
        options: chartOptions,
      });
    }

    // Cleanup: Destroy the chart instance when the component unmounts
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy(); // Destroy the chart instance
      }
    };
  }, [chartData, chartOptions]); // Re-run the effect when chartData or chartOptions change

  return <canvas ref={chartRef} width="400" height="400"></canvas>; // Canvas element for rendering the chart
};

export default WeatherChart;
