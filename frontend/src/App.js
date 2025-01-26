// src/App.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import _ from 'lodash';
import { Button, Container, Grid2, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import SearchBar from "./components/SearchBar";
import StockChart from "./components/StockChart";
import DataDisplay from "./components/DataDisplay";

const App = () => {
  const [stockData, setStockData] = useState(null);
  const [stockDisplayData, setStockDisplayData] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/stock/price/AAPL") // Flask
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          const dates = []
          const prices = [];
          _.map(data.data, data => {
            dates.push(data.dates)
            prices.push(data.prices)
          })
          setStockData({ dates, prices });
        } else {
          console.error(data.error);
        }
      })
      .catch((error) => console.error("Error fetching price data:", error));

      fetch("http://127.0.0.1:5000/api/stock/display/AAPL") // Flask
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setStockDisplayData(data.data);
        } else {
          console.error(data.error);
        }
      })
      .catch((error) => console.error("Error fetching display data:", error));
  }, []);

  const fetchStockData = async (ticker) => {
    try {
      const response = await axios.get(`http://127.0.0.1:5000/api/stock/price/${ticker}`);
      const dates = []
      const prices = [];
      _.map(response.data.data, data => {
        dates.push(data.dates)
        prices.push(data.prices)
      })
      setStockData({ dates, prices });

      const responseDisplay = await axios.get(`http://127.0.0.1:5000/api/stock/display/${ticker}`);
      setStockDisplayData(responseDisplay.data.data)
    } catch (error) {
      console.error("Error fetching stock data:", error);
    }
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: "#1976d2",
      },
      secondary: {
        main: "#dc004e",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Container maxWidth="lg" style={{ marginTop: "2rem" }}>
          <Typography variant="h4" component="h1" gutterBottom style={{ textAlign: "center" }}>
            Stock Visualizer
          </Typography>

          <SearchBar onSearch={fetchStockData} />

          <Grid2 container spacing={2} style={{ marginTop: "2rem" }}>
            {/* Chart Section */}
            <Grid2 item xs={12} md={6}>
              {stockData ? (
                <StockChart data={stockData} />
              ) : (
                <Button variant="contained" color="primary" style={{ marginTop: "1rem" }}>
                  Fetch Data
                </Button>
              )}
            </Grid2>

            {/* Data Display Section */}
            <Grid2 item xs={12} md={6}>
              <Typography variant="h4" component="h1" gutterBottom>
                Stock Data
              </Typography>
              {stockDisplayData ? <DataDisplay data={stockDisplayData} /> : null}
            </Grid2>
          </Grid2>
        </Container>
      </div>
    </ThemeProvider>
  );
};

export default App;
