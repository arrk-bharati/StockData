// src/App.js
import React, {useState, useEffect} from "react";
import _ from "lodash";
import {Button, Container, Grid2, Typography} from "@mui/material";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import SearchBar from "./components/SearchBar";
import StockChart from "./components/StockChart";
import DataTable from "./components/DataTable";

const App = () => {
  const [stockData, setStockData] = useState(null);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchStockData("AAPL");
  }, []);

  const fetchStockData = async (ticker) => {
    try {
      setSearchText(ticker);
      const response = await fetch(`http://127.0.0.1:5000/api/stock/${ticker}`);
      const data = await response.json();

      if (data.success) {
        const processedData = {
          dates: [],
          highPrices: [],
          lowPrices: [],
          openPrices: [],
          closePrices: [],
          volume: [],
        };

        data.data.forEach((item) => {
          processedData.dates.push(item.date);
          processedData.highPrices.push(item.high);
          processedData.lowPrices.push(item.low);
          processedData.openPrices.push(item.open);
          processedData.closePrices.push(item.close);
          processedData.volume.push(item.volume);
        });
        setStockData(processedData);
      } else {
        console.error(data.error);
      }
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

  const getStockInfo = () => {
    if (stockData) {
      const lastIndex = stockData.dates.length - 1;
      console.log(searchText);
      return {
        ticker: searchText,
        date: stockData.dates[lastIndex],
        open: stockData.openPrices[lastIndex],
        high: stockData.highPrices[lastIndex],
        low: stockData.lowPrices[lastIndex],
        close: stockData.closePrices[lastIndex],
        volume: stockData.volume[lastIndex],
      };
    }
    return null;
  };

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Container maxWidth="lg" style={{marginTop: "2rem"}}>
          <Typography variant="h4" component="h1" gutterBottom>
            Stock Market Data Viewer
          </Typography>
          <Typography variant="body1" gutterBottom>
            Welcome to the Stock Market Data Viewer application. This tool allows you to:
          </Typography>
          <Typography component="div" style={{marginLeft: "1rem", marginBottom: "1rem"}}>
            <ul>
              <li>Search for any stock using its ticker symbol (e.g., AAPL, GOOGL, MSFT)</li>
              <li>View interactive price charts with historical data</li>
              <li>Access detailed price information including open, high, low, and close prices</li>
              <li>Monitor trading volume data</li>
            </ul>
          </Typography>
          <Typography variant="body1" gutterBottom>
            To get started, simply enter a stock ticker symbol in the search bar below.
          </Typography>

          <Grid2 container spacing={2} style={{marginTop: "2rem"}}>
            <Grid2 item xs={12} style={{width: "100%"}}>
              <SearchBar onSearch={fetchStockData} stockInfo={getStockInfo()} />
            </Grid2>
          </Grid2>
          {stockData ? (
            <Grid2 container spacing={2} style={{marginTop: "2rem"}}>
              {/* Chart Section */}
              <Grid2 item xs={12} style={{width: "100%"}}>
                {stockData && <StockChart data={stockData} />}
              </Grid2>

              {/* Data Display Section */}
              <Grid2 item xs={12} md={6} style={{width: "100%"}}>
                {stockData && <DataTable data={stockData} />}
              </Grid2>
            </Grid2>
          ) : (
            <Typography variant="h5" component="h1" gutterBottom>
              Please enter a stock ticker to fetch data.
            </Typography>
          )}
        </Container>
      </div>
    </ThemeProvider>
  );
};

export default App;
