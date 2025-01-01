export const getDate = (data, selectedValue) => {
    console.log(data,selectedValue);
    
    switch (selectedValue) {
      case "temperature_2m_max":
        console.log("Maximum Temperature Data:", data?.temperature_2m_max);
        return data?.temperature_2m_max;
  
      case "temperature_2m_min":
        console.log("Minimum Temperature Data:", data?.temperature_2m_min);
        return data?.temperature_2m_min;
  
      case "temperature_2m_mean":
        console.log("Mean Temperature Data:", data?.temperature_2m_mean);
        return data?.temperature_2m_mean;
  
      case "apparent_temperature_max":
        console.log("Maximum Apparent Temperature Data:", data?.apparent_temperature_max);
        return data?.apparent_temperature_max;
  
      case "apparent_temperature_min":
        console.log("Minimum Apparent Temperature Data:", data?.apparent_temperature_min);
        return data?.apparent_temperature_min;
  
      case "apparent_temperature_mean":
        console.log("Mean Apparent Temperature Data:", data?.apparent_temperature_mean);
        return data?.apparent_temperature_mean;
  
      default:
        console.log("No valid temperature type selected");
        return null;
    }
  };
  