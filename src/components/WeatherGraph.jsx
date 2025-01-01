

// import React, { useEffect, useState } from 'react';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';
// import { Line } from 'react-chartjs-2';
// import { fetchWeatherData } from '../utils/api';

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

// export const options = {
//   responsive: true,
//   plugins: {
//     legend: {
//       position: 'top',
//     },
//     title: {
//       display: true,
//       text: 'Chart.js Line Chart',
//     },
//   },
// };






// export function WeatherGraph() {

//   const [data, setData] = useState(null);
//   const formatTime = (timeArray) => {
//     return timeArray.map((time) => {
//       const date = new Date(time); // Parse the time string
//       return date.toLocaleString('en-US', {
//         weekday: 'short', // e.g., Mon, Tue
//         hour: '2-digit', // e.g., 10 AM
//         minute: '2-digit', // e.g., 10:30 AM
//       });
//     });
//   };
//   const convertTo12HourFormat = (isoString) => {
//     const date = new Date(isoString);
//     const formattedDate = date.toISOString().split("T")[0];

//     // Extract the time in hh:mm AM/PM format
//     const formattedTime = date.toLocaleTimeString('en-US', {
//       hour: '2-digit',
//       minute: '2-digit',
//       hour12: true,
//     });

//     // Combine date and time
//     return `${formattedDate}, ${formattedTime}`
//   };
//   const callAPI = async () => {
//     try {
//       let res = await fetchWeatherData();

//       setData({
//         labels: res?.hourly?.time?.map(n => convertTo12HourFormat(n))?.slice(res?.hourly?.time?.length-50, res?.hourly?.time?.length-1) || [],
//         datasets: [
//           {
//             label: 'Temp',
//             data: res?.hourly?.temperature_2m?.map(n => n)?.slice(res?.hourly?.temperature_2m?.length-50, res?.hourly?.temperature_2m?.length-1) || [],
//             borderColor: 'rgb(255, 99, 132)',
//             backgroundColor: 'rgba(122, 99, 255, 0.5)',
//           },
//         ],
//       });
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   useEffect(() => {
//     callAPI()
//   }, [])
//   if (!data) {
//     return <div>Loading...</div>;
//   }
//   return <Line options={options} data={data} />;
// }




import React, { useEffect, useState } from 'react';
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
import { Line } from 'react-chartjs-2';
import { fetchWeatherData } from '../utils/api';  // Adjust this import based on your file structure
import { getDate } from './helper';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Temperature Over Time',
    },
  },
};

export function WeatherGraph({ inputData, click, selectedValue }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const formatTime = (timeArray) => {
    return timeArray.map((time) => {
      const date = new Date(time);
      return date.toLocaleString('en-US', {
        weekday: 'short',
        hour: '2-digit',
        minute: '2-digit',
      });
    });
  };

  const convertTo12HourFormat = (isoString) => {
    const date = new Date(isoString);
    const formattedDate = date.toISOString().split("T")[0];

    const formattedTime = date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });

    return `${formattedDate}, ${formattedTime}`;
  };

  const callAPI = async (selectedValue) => {
    try {
      setLoading(true);
      setError(null);

      // Use inputData (e.g., latitude, longitude, etc.) in the API request
      let res = await fetchWeatherData(inputData,selectedValue); // Pass the inputData into your fetchWeatherData function

      if (!res?.hourly) {
        throw new Error('No hourly data available');
      }

      setData({
        labels: res?.daily?.time?.map(n => convertTo12HourFormat(n)) || [],
        datasets: [
          {
            label: 'Temperature (°C)',
            data: getDate(res?.daily, selectedValue) || [],
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(122, 99, 255, 0.5)',
          },
        ],
      });
    } catch (error) {
      setError('Error fetching data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (inputData) {
      callAPI(selectedValue);
    }
  }, [inputData, click, selectedValue]); // Fetch data again if inputData changes

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return <div>
    <div>{selectedValue}</div>
    <Line options={options} data={data} />
  </div>;
}
