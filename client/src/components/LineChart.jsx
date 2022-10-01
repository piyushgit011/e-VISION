import React from "react";
import { Line, Pie } from "react-chartjs-2";

export default function LineChart({ chartData }) {
  return (
    <div style={{ width: "70%", margin: "auto"}}>
      <Line data={chartData} />
      <div>
        
      </div>
      <h1 className="text-white text-2xl text-center my-3 mt-10">Drowsiness Index</h1>
      <Pie data={chartData}/>
    </div>
  );
}
