// src/components/SearchBar.js
import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
    const [ticker, setTicker] = useState("");

    const handleSearch = () => {
        if (ticker.trim()) onSearch(ticker);
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Enter Stock Ticker (e.g., AAPL)"
                value={ticker}
                onChange={(e) => setTicker(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
        </div>
    );
};

export default SearchBar;
