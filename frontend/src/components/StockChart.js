// src/components/StockChart.js
import React from "react";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const StockChart = ({ data }) => {
    const chartData = {
        labels: data.dates,
        datasets: [
            {
                label: "Stock Price",
                data: data.prices,
                borderColor: "blue",
                fill: false,
                tension: 0.1,
            },
        ],
    };

    return <Line data={chartData} />;
};

export default StockChart;
