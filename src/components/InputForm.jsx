// import React, { useEffect, useState } from "react";
// import { isValidLatitude, isValidLongitude } from "../utils/validations";
// import { fetchWeatherData } from "../utils/api";

// const InputForm = ({  }) => {
//   const [latitude, setLatitude] = useState("");
//   const [longitude, setLongitude] = useState("");
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [error, setError] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!isValidLatitude(latitude) || !isValidLongitude(longitude)) {
//       setError("Invalid latitude or longitude.");
//       return;
//     }

//     if (!startDate || !endDate || startDate > endDate) {
//       setError("Invalid date range.");
//       return;
//     }

//     setError("");
//     // onSubmit({ latitude, longitude, startDate, endDate });
//   };
//   const callFun = async () => {
//     const data = await fetchWeatherData(

//     );
//     console.log(data);
//   }
//   useEffect(() => {
//     callFun()
//   }, [])

//   return (
//     <form onSubmit={handleSubmit} className="p-4 bg-white shadow rounded">
//       {error && <p className="text-red-500">{error}</p>}
//       <div className="grid grid-cols-2 gap-4">
// //         <input
// //           type="text"
// //           placeholder="Latitude"
// //           value={latitude}
// //           onChange={(e) => setLatitude(e.target.value)}
// //           className="border rounded p-2"
// //         />
// //         <input
// //           type="text"
// //           placeholder="Longitude"
// //           value={longitude}
// //           onChange={(e) => setLongitude(e.target.value)}
// //           className="border rounded p-2"
// //         />
// //         <input
// //           type="date"
// //           value={startDate}
// //           onChange={(e) => setStartDate(e.target.value)}
// //           className="border rounded p-2"
// //         />
// //         <input
// //           type="date"
// //           value={endDate}
// //           onChange={(e) => setEndDate(e.target.value)}
// //           className="border rounded p-2"
// //         />
// //       </div>
// //       <button
// //         type="submit"
// //         className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
// //       >
// //         Submit
// //       </button>
// //     </form>
// //   );
// // };

// // export default InputForm;


// import React, { useState } from "react";
// import { isValidLatitude, isValidLongitude } from "../utils/validations";

// const InputForm = ({ onSubmit }) => {
//   const [latitude, setLatitude] = useState("");
//   const [longitude, setLongitude] = useState("");
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [error, setError] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!isValidLatitude(latitude) || !isValidLongitude(longitude)) {
//       setError("Invalid latitude or longitude.");
//       return;
//     }

//     if (!startDate || !endDate || startDate > endDate) {
//       setError("Invalid date range.");
//       return;
//     }

//     setError("");
//     onSubmit({ latitude, longitude, startDate, endDate });
//   };

//   return (
//     <form onSubmit={handleSubmit} className="p-4 bg-white shadow rounded mb-6">
//       {error && <p className="text-red-500">{error}</p>}
//       <div className="grid grid-cols-2 gap-4">
//         <input
//           type="text"
//           placeholder="Latitude"
//           value={latitude}
//           onChange={(e) => setLatitude(e.target.value)}
//           className="border rounded p-2"
//         />
//         <input
//           type="text"
//           placeholder="Longitude"
//           value={longitude}
//           onChange={(e) => setLongitude(e.target.value)}
//           className="border rounded p-2"
//         />
//         <input
//           type="date"
//           value={startDate}
//           onChange={(e) => setStartDate(e.target.value)}
//           className="border rounded p-2"
//         />
//         <input
//           type="date"
//           value={endDate}
//           onChange={(e) => setEndDate(e.target.value)}
//           className="border rounded p-2"
//         />
//       </div>
//       <button
//         type="submit"
//         className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
//       >
//         Submit
//       </button>
//     </form>
//   );
// };

// export default InputForm;




import React, { useState } from "react";

const InputForm = ({ onSubmit }) => {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!latitude || !longitude || isNaN(latitude) || isNaN(longitude)) {
      setError("Please provide valid latitude and longitude.");
      return;
    }

    if (!startDate || !endDate || startDate > endDate) {
      setError("Please provide a valid date range.");
      return;
    }

    setError("");
    onSubmit({ latitude, longitude, startDate, endDate });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white shadow rounded">
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Latitude"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
          className="border rounded p-2"
        />
        <input
          type="text"
          placeholder="Longitude"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
          className="border rounded p-2"
        />
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border rounded p-2"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border rounded p-2"
        />
      </div>
      <button
        type="submit"
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Submit
      </button>
    </form>
  );
};

export default InputForm;
