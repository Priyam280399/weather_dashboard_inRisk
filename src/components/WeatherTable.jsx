import React, { useState, useEffect } from "react";
import { fetchWeatherData, formatWeatherData } from "../utils/api"; // Adjusted path

const WeatherTable = ({ latitude, longitude, startDate, endDate }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rawData = await fetchWeatherData(latitude, longitude, startDate, endDate);
        const formattedData = formatWeatherData(rawData);
        setWeatherData(formattedData.weather);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, [latitude, longitude, startDate, endDate]);

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!weatherData) {
    return <p>Loading weather data...</p>;
  }

  return (
    <table className="table-auto w-full border-collapse border border-gray-300 mt-4">
      <thead>
        <tr>
          <th className="border border-gray-300 px-4 py-2">Date</th>
          <th className="border border-gray-300 px-4 py-2">Max Temp (°C)</th>
          <th className="border border-gray-300 px-4 py-2">Min Temp (°C)</th>
          <th className="border border-gray-300 px-4 py-2">Mean Temp (°C)</th>
        </tr>
      </thead>
      <tbody>
        {weatherData.map((data, index) => (
          <tr key={index}>
            <td className="border border-gray-300 px-4 py-2">{data.date}</td>
            <td className="border border-gray-300 px-4 py-2">{data.temperature_2m_max ?? "N/A"}</td>
            <td className="border border-gray-300 px-4 py-2">{data.temperature_2m_min ?? "N/A"}</td>
            <td className="border border-gray-300 px-4 py-2">{data.temperature_2m_mean ?? "N/A"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default WeatherTable;
