// src/components/SearchBar.js
import React, {useState} from "react";
import {TextField, Button, Box, Typography} from "@mui/material";

const SearchBar = ({onSearch, stockInfo}) => {
  const [ticker, setTicker] = useState("");
  console.log(stockInfo);
  const handleSearch = () => {
    if (ticker.trim()) onSearch(ticker);
  };

  return (
    <Box sx={{display: "flex", flexDirection: "column", gap: 2}}>
      <Box sx={{display: "flex", alignItems: "center", gap: 2}}>
        <TextField
          value={ticker}
          onChange={(e) => setTicker(e.target.value)}
          placeholder="Enter Stock Ticker (e.g., AAPL)"
          variant="outlined"
          size="medium"
          sx={{width: 300}}
        />
        <Button variant="contained" color="primary" onClick={handleSearch} size="large">
          Search
        </Button>
      </Box>
      {stockInfo && (
        <Box>
          <Typography variant="body2" component="span" sx={{mr: 2, color: "darkgrey"}}>
            <b>Stock:</b> {stockInfo.ticker}
          </Typography>
          <Typography variant="body2" component="span" sx={{mr: 2, color: "darkgrey"}}>
            <b>Date:</b> {stockInfo.date}
          </Typography>
          <Typography variant="body2" component="span" sx={{mr: 2, color: "darkgrey"}}>
            <b>Open:</b> ${stockInfo.open}
          </Typography>
          <Typography variant="body2" component="span" sx={{mr: 2, color: "darkgrey"}}>
            <b>Close:</b> ${stockInfo.close}
          </Typography>
          <Typography variant="body2" component="span" sx={{color: "darkgrey"}}>
            <b>Volume:</b> {stockInfo.volume}
          </Typography>
        </Box>
      )}{" "}
    </Box>
  );
};

export default SearchBar;
