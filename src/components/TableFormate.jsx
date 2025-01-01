

// import React, { useEffect, useState } from 'react';

// import { fetchWeatherData } from '../utils/api';

// export const options = {
//     responsive: true,
//     plugins: {
//         legend: {
//             position: 'top',
//         },
//         title: {
//             display: true,
//             text: 'Chart.js Line Chart',
//         },
//     },
// };

// export function TableFormate() {

//     const [data, setData] = useState([]);
//     const [degree, setDegree] = useState("");
//     const formatTime = (timeArray) => {
//         return timeArray.map((time) => {
//             const date = new Date(time); // Parse the time string
//             return date.toLocaleString('en-US', {
//                 weekday: 'short', // e.g., Mon, Tue
//                 hour: '2-digit', // e.g., 10 AM
//                 minute: '2-digit', // e.g., 10:30 AM
//             });
//         });
//     };

//     const convertTo12HourFormat = (isoString) => {
//         const date = new Date(isoString);
//         const formattedDate = date.toISOString().split("T")[0];

//         // Extract the time in hh:mm AM/PM format
//         const formattedTime = date.toLocaleTimeString('en-US', {
//             hour: '2-digit',
//             minute: '2-digit',
//             hour12: true,
//         });

//         // Combine date and time
//         return `${formattedDate}, ${formattedTime}`
//     };
//     const callAPI = async () => {
//         try {
//             let res = await fetchWeatherData();
//             setDegree(res?.hourly_units.temperature_2m)
            
//             const formattedData = res?.hourly?.time?.map((n, i) => ({
//                 time: n, // Convert time to desired format
//                 temp: res?.hourly?.temperature_2m[i],
//               }));
//             setData(formattedData)

//         } catch (error) {
//             console.error('Error fetching data:', error);
//         }
//     };

//     useEffect(() => {
//         callAPI()
//     }, [])
//     if (data && data.length <= 0) {
//         return <div>Loading...</div>;
//     }
//     return <>
//         <table border={"red"}>
//             <thead>
//                 <tr>
//                     <th>Date & time</th>
//                     <th>Temp</th>
//                 </tr>
//             </thead>
//             <thead>
//                 {data && data?.map((n, i) => {
//                     return (
//                         <tr key={i}>
//                             <td>{convertTo12HourFormat(n.time)}</td>
//                             <td>{n?.temp} {degree}</td>
//                         </tr>
//                     )
//                 })}

//             </thead>
//         </table>
//     </>;
// }




// import React, { useEffect, useState } from "react";
// import { fetchWeatherData } from "../utils/api";

// export const TableFormate = ({ inputData }) => {
//   const [data, setData] = useState([]);
//   const [degree, setDegree] = useState("");
//   const [loading, setLoading] = useState(false);

//   const convertTo12HourFormat = (isoString) => {
//     const date = new Date(isoString);
//     const formattedDate = date.toISOString().split("T")[0];

//     const formattedTime = date.toLocaleTimeString("en-US", {
//       hour: "2-digit",
//       minute: "2-digit",
//       hour12: true,
//     });

//     return `${formattedDate}, ${formattedTime}`;
//   };

//   const fetchAndFormatData = async () => {
//     if (!inputData) return;

//     setLoading(true);
//     try {
//       const { latitude, longitude, startDate, endDate } = inputData;
//       const res = await fetchWeatherData(latitude, longitude, startDate, endDate);

//       setDegree(res?.hourly_units?.temperature_2m);

//       const formattedData = res?.hourly?.time?.map((time, index) => ({
//         time,
//         temp: res?.hourly?.temperature_2m[index],
//       }));

//       setData(formattedData);
//     } catch (error) {
//       console.error("Error fetching weather data:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchAndFormatData();
//   }, [inputData]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (!data || data.length === 0) {
//     return <div>No data available for the selected range.</div>;
//   }

//   return (
//     <div className="overflow-x-auto">
//       <table className="min-w-full border-collapse border border-gray-300">
//         <thead className="bg-gray-200">
//           <tr>
//             <th className="border border-gray-400 px-4 py-2">Date & Time</th>
//             <th className="border border-gray-400 px-4 py-2">Temperature</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((item, index) => (
//             <tr key={index} className="text-center even:bg-gray-100">
//               <td className="border border-gray-400 px-4 py-2">
//                 {convertTo12HourFormat(item.time)}
//               </td>
//               <td className="border border-gray-400 px-4 py-2">
//                 {item.temp} {degree}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

import React, { useEffect, useState } from "react";
import { fetchWeatherData } from "../utils/api";
import { getDate } from "./helper";

export const TableFormate = ({ inputData,click,selectedValue }) => {
  const [data, setData] = useState([]);
  const [degree, setDegree] = useState("");
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Number of items to display per page

  const convertTo12HourFormat = (isoString) => {
    const date = new Date(isoString);
    const formattedDate = date.toISOString().split("T")[0];

    const formattedTime = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    // return `${formattedDate}, ${formattedTime}`;
    return `${formattedDate}`;
  };

  const fetchAndFormatData = async () => {
    if (!inputData) return;

    setLoading(true);
    try {
      const res = await fetchWeatherData(inputData,selectedValue);

      setDegree(res?.hourly_units?.temperature_2m);

      const formattedData = res?.daily?.time?.map((time, index) => ({
        time,
        temp: getDate(res?.daily,selectedValue)[index],
      }));

      setData(formattedData);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAndFormatData(selectedValue);
  }, [inputData,click,selectedValue]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!data || data.length === 0) {
    return <div>No data available for the selected range.</div>;
  }

  // Get current page data
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Total pages
  const totalPages = Math.ceil(data.length / itemsPerPage);

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-400 px-4 py-2">Date & Time</th>
              <th className="border border-gray-400 px-4 py-2">Temperature</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, index) => (
              <tr key={index} className="text-center even:bg-gray-100">
                <td className="border border-gray-400 px-4 py-2">
                  {convertTo12HourFormat(item.time)}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {item.temp} {degree}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls with Arrows and Current Page Number */}
      <div className="flex justify-center mt-4 items-center">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 border bg-gray-200 text-gray-600 rounded-l-md"
        >
          &lt; Prev
        </button>
        <span className="px-4 py-2 text-gray-600">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 border bg-gray-200 text-gray-600 rounded-r-md"
        >
          Next &gt;
        </button>
      </div>
    </div>
  );
};
