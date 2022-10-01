import React, { useContext, useState } from "react";
import { Chart as ChartJS } from "chart.js/auto";
import LineChart from "./LineChart";
import { chartData } from "../data/chartJsData";
import { Store } from "../store";

export default function Report() {
  const { state } = useContext(Store);
  const { userInfo } = state;

  const getData = () => {
    
  }

  const [focusData, setFocusData] = useState({
    labels: chartData.map((user) => user.time), //labels is x-axis
    datasets: [
      {
        label: "Focus %",
        data: chartData.map((user) => user.focusRate),
        backgroundColor: [
          "white",
          "blue",
          "skyblue",
          "lightgreen",
          "yellow",
          "red"
        ],
        borderColor: "green",
      },
    ],
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
        {userInfo.person === 'teacher' ? (
          <select name="subject" id="" className="select bgGradient">
            <option value="maths">Students</option>
            <option value="">Mohan</option>
            <option value="">Sonia</option>
            <option value="">Mohini</option>
            <option value="">Rahul</option>
          </select>
        ) : (
          ""
        )}
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
