import React, { useState } from "react";
import { Chart as ChartJS } from "chart.js/auto";
import LineChart from "./LineChart";
import { chartData } from "../data/chartJsData";

export default function Report() {
  const [focusData, setFocusData] = useState({
    labels: chartData.map((user) => user.time), //labels is x-axis
    datasets: [
      {
        label: "Focus %",
        data: chartData.map((user) => user.focusRate),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: "white"
      },
    ]
  });

  return (
    <div className="flex flex-col my-3">
      {/* options */}
      <div className="flex flex-wrap gap-3 justify-around items-center py-3 border-b-4 border-gray-700">
        <select name="subject" id="" className="select bgGradient">
          <option value="maths">Subject</option>
          <option value="">Science</option>
          <option value="">Social Science</option>
          <option value="">English</option>
          <option value="">Hindi</option>
        </select>
        <select name="subject" id="" className="select bgGradient">
          <option value="maths">Student</option>
          <option value="">Science</option>
          <option value="">Social Science</option>
          <option value="">English</option>
          <option value="">Hindi</option>
        </select>
        <input type="date" name="" id="" className="select bgGradient" />
      </div>
      {/* charts */}
      <div className="flex flex-col items-center justify-center gap-10 my-5 py-3 bg-black">
        <h1 className="text-white text-2xl">Focus Percentage</h1>
        <LineChart chartData={focusData} />
      </div>
    </div>
  );
}
