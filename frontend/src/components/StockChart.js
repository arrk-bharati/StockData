import React from "react";
import {Bar, Line} from "react-chartjs-2";
import {Box, Typography, Paper} from "@mui/material";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend);

const StockChart = ({data}) => {
  const getVolumeColors = () => {
    return data.volume.map((vol, index) => {
      if (index === 0) return ["rgba(77, 220, 129, 0.3)", "rgb(13, 154, 107)"]; // Primary color with border
      return vol > data.volume[index - 1]
        ? ["rgba(77, 220, 129, 0.3)", "rgb(13, 154, 107)"] // Primary color with border
        : ["rgba(220, 0, 78, 0.3)", "rgba(198, 0, 57, 1)"]; // Secondary color with border
    });
  };

  const barChartData = {
    labels: data.dates,
    datasets: [
      {
        label: "Volume",
        data: data.volume,
        backgroundColor: getVolumeColors().map((colors) => colors[0]),
        borderColor: getVolumeColors().map((colors) => colors[1]),
        borderWidth: 2,
        borderRadius: 0,
      },
    ],
  };

  const lineChartData = {
    labels: data.dates,
    datasets: [
      {
        label: "Stock Price",
        data: data.closePrices,
        borderColor: "#2E8B57",
        backgroundColor: "rgba(46, 139, 87, 0.1)",
        fill: true,
        tension: 0.4,
        borderWidth: 1.5,
        pointRadius: 4,
        pointHoverRadius: 8,
        pointBackgroundColor: "#2E8B57",
        pointBorderColor: "#2E8B57",
        pointBorderWidth: 2,
        pointHoverBackgroundColor: "#2E8B57",
        pointHoverBorderColor: "#FFFFFF",
      },
    ],
  };
  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <Box sx={{display: "flex", gap: 2}}>
      <Paper sx={{flex: 1, p: 2}}>
        <Typography variant="h6" gutterBottom>
          Volume Analysis
        </Typography>
        <Bar data={barChartData} options={options} />
      </Paper>
      <Paper sx={{flex: 1, p: 2}}>
        <Typography variant="h6" gutterBottom>
          Price Movement
        </Typography>
        <Line data={lineChartData} options={options} />
      </Paper>
    </Box>
  );
};

export default StockChart;
