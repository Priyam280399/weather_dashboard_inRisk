import axios from "axios";

/**
 * Fetches historical weather data from the Open-Meteo API.
 * @param {number} latitude - Latitude of the location.
 * @param {number} longitude - Longitude of the location.
 * @param {string} startDate - Start date for the weather data (YYYY-MM-DD).
 * @param {string} endDate - End date for the weather data (YYYY-MM-DD).
 * @param {Array<string>} variables - List of weather variables to fetch.
 * @param {string} [timezone="auto"] - Timezone for the weather data (default: "auto").
 * @returns {Promise<Object>} - The fetched weather data.
 * @throws Will throw an error if the request fails.
 */
export const fetchWeatherData = async (inputData,selectedValue) => {
    console.log(inputData,selectedValue, "=====>");

    const url = "https://archive-api.open-meteo.com/v1/archive";
    const params = {
        "latitude": inputData?.latitude,
        "longitude": inputData?.longitude,
        "start_date": inputData?.startDate,
        "end_date": inputData?.endDate,
        "hourly": "temperature_2m",
        "daily": selectedValue

    };

    console.log(params);


    try {
        const response = await axios.get(url, { params });
        console.log(response?.data);
        return response.data;

    } catch (error) {
        console.error("Error fetching weather data:", error.message);
        throw error;
    }
};

/**
 * Formats the raw weather data into a more readable structure.
 * @param {Object} data - The raw weather data fetched from the API.
 * @returns {Object} - The formatted weather data.
 */
export const formatWeatherData = (data) => {
    if (!data || !data.daily) {
        console.error("Invalid weather data format.");
        throw new Error("Invalid weather data format.");
    }

    const formattedData = data.daily.time.map((date, index) => {
        const weatherInfo = { date };
        Object.keys(data.daily).forEach((key) => {
            if (key !== "time") {
                weatherInfo[key] = data.daily[key][index];
            }
        });
        return weatherInfo;
    });

    return {
        location: {
            latitude: data.latitude,
            longitude: data.longitude,
        },
        timezone: data.timezone,
        weather: formattedData,
    };
};
