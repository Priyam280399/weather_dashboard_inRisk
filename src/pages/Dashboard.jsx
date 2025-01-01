// import React, { useState } from "react";
// import { WeatherGraph } from "../components/WeatherGraph";
// import { TableFormate } from "../components/TableFormate";


// const Dashboard = () => {

//     const [tab, setTab] = useState("graph")
//     return (
//         <div className="p-8 bg-gray-100 min-h-screen">
//             <h1 className="text-2xl font-bold mb-4">Weather Dashboard</h1>
//             {/* <InputForm onSubmit={handleFetchData} />
//             <InputForm  /> */}
//             <div className="flex gap-3 ">
//                 <div className={`bg-[${tab == "graph" ? "red" : ""}] rounded py-2 px-4 text-[${tab == "graph" ? "white" : "black"}] cursor-pointer`} onClick={() => setTab("graph")}>Graph</div>
//                 <div className={`bg-[${tab == "table" ? "red" : ""}] rounded py-2 px-4 text-[${tab == "table" ? "white" : "black"}] cursor-pointer`} onClick={() => setTab("table")}>Table</div>
//             </div>
//             {tab == "graph" ? <WeatherGraph /> : <TableFormate />}
//             {/* <WeatherGraph  />
//             <WeatherTable data={weatherData} /> */}
//         </div>
//     );
// };

// export default Dashboard;






import React, { useState } from "react";
import { WeatherGraph } from "../components/WeatherGraph";
import { TableFormate } from "../components/TableFormate";
import InputForm from "../components/InputForm";

const Dashboard = () => {
    const [tab, setTab] = useState("graph");
    const [click, setClick] = useState(0)
    const [inputData, setInputData] = useState(null); // State to hold user inputs
    const [selectedValue, setSelectedValue] = useState("temperature_2m_max");

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
        console.log("Selected Value:", event.target.value); // Log the selected value
    };
    const handleInputSubmit = (formData) => {
        formData["daily"] = selectedValue ? selectedValue : "temperature_2m_max"
        setClick(a => a + 1)
        setInputData(formData); // Save form data to state
    };

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold mb-4">Weather Dashboard</h1>

            {/* Input Form */}
            <InputForm onSubmit={handleInputSubmit} />

            {/* Tab Navigation */}
            <div className="flex gap-3 my-6">
                <button
                    className={`py-2 px-4 rounded ${tab === "graph"
                        ? "bg-red-500 text-white font-bold"
                        : "bg-gray-300 text-black"
                        }`}
                    onClick={() => setTab("graph")}
                >
                    Graph
                </button>
                <button
                    className={`py-2 px-4 rounded ${tab === "table"
                        ? "bg-red-500 text-white font-bold"
                        : "bg-gray-300 text-black"
                        }`}
                    onClick={() => setTab("table")}
                >
                    Table
                </button>
                <select value={selectedValue} onChange={handleChange} className="border p-2 rounded">
                    <option value="">Select Temperature Type</option>
                    <option value="temperature_2m_max">Maximum Temperature</option>
                    <option value="temperature_2m_min">Minimum Temperature</option>
                    <option value="temperature_2m_mean">Mean Temperature</option>
                    <option value="apparent_temperature_max">Maximum Apparent Temperature</option>
                    <option value="apparent_temperature_min">Minimum Apparent Temperature</option>
                    <option value="apparent_temperature_mean">Mean Apparent Temperature</option>
                </select>
            </div>

            {/* Render Tab Content */}
            {tab === "graph" ? (
                <WeatherGraph click={click} selectedValue={selectedValue} inputData={inputData} />
            ) : (
                <TableFormate click={click} selectedValue={selectedValue} inputData={inputData} />
            )}
        </div>
    );
};

export default Dashboard;



// import React, { useState } from "react";
// import { WeatherGraph } from "../components/WeatherGraph";
// import { TableFormate } from "../components/TableFormate";
// import InputForm from "../components/InputForm";

// const Dashboard = () => {
//   const [tab, setTab] = useState("graph");
//   const [inputData, setInputData] = useState(null);

//   const handleFormSubmit = (data) => {
//     setInputData(data);
//   };

//   return (
//     <div className="p-8 bg-gray-100 min-h-screen">
//       <h1 className="text-2xl font-bold mb-4">Weather Dashboard</h1>
//       <InputForm onSubmit={handleFormSubmit} />
//       <div className="flex gap-3 mt-4">
//         <div
//           className={`cursor-pointer py-2 px-4 rounded ${
//             tab === "graph" ? "bg-red-500 text-white" : "bg-gray-300"
//           }`}
//           onClick={() => setTab("graph")}
//         >
//           Graph
//         </div>
//         <div
//           className={`cursor-pointer py-2 px-4 rounded ${
//             tab === "table" ? "bg-red-500 text-white" : "bg-gray-300"
//           }`}
//           onClick={() => setTab("table")}
//         >
//           Table
//         </div>
//       </div>
//       {tab === "graph" ? (
//         <div>Graph Component Placeholder</div>
//       ) : (
//         <TableFormate inputData={inputData} />
//       )}
//     </div>
//   );
// };

// export default Dashboard;
