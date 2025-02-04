// src/components/StockChart.js
import React from "react";
import { Bar, Line } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from "chart.js";

// Register chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend);

const StockChart = ({ data }) => {
    const barChartData = {
        labels: data.dates,
        datasets: [
            {
                label: "High Prices",
                data: data.highPrices,
                backgroundColor: "rgba(0, 200, 0, 0.5)",
                borderColor: "green",
                borderWidth: 1,
            },
            {
                label: "Low Prices",
                data: data.lowPrices,
                backgroundColor: "rgba(200, 0, 0, 0.5)",
                borderColor: "red",
                borderWidth: 1,
            },
        ],
    };

    const chartData = {
        labels: data.dates,
        datasets: [
            {
                label: "Stock Price",
                data: data.highPrices,
                borderColor: "blue",
                fill: false,
                tension: 0.1,
                borderWidth: 2,
                pointRadius: 3,
            },
        ],
    };
    return (
        <div>
            <h2>Stock Prices</h2>
            <Bar id="bar" data={barChartData} style={{width: 600}}/>
            <Line id="line" data={chartData}/>
        </div>);
};

export default StockChart;
