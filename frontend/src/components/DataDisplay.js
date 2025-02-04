import React, { useState } from "react";
import { Box, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const DataDisplay = ({ data }) => {
    const [rows, setRows] = useState(data ? data : []);
    const [searchText, setSearchText] = useState("");

    const columns = [
        { field: "date", headerName: "Date", width: 150 },
        { field: "open", headerName: "Open", width: 180 },
        { field: "high", headerName: "High", width: 180 },
        { field: "low", headerName: "Low", width: 180 },
        { field: "close", headerName: "Close", width: 180 },
        { field: "volume", headerName: "Volume", width: 100 }
    ];

    // Handle search
    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchText(value);

        const filteredRows = data.filter((row) =>
            Object.values(row).some((field) =>
                String(field).toLowerCase().includes(value)
            )
        );
        setRows(filteredRows);
    };

    return (
        <Box sx={{ height: 400, width: "100%" }}>
            {/* Search Bar */}
            <TextField
                label="Search"
                variant="outlined"
                fullWidth
                value={searchText}
                onChange={handleSearch}
                sx={{ marginBottom: 2 }}
            />

            {/* Data Grid */}
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5, 10, 20]}
                checkboxSelection
                disableSelectionOnClick
                sortingOrder={['asc', 'desc']}
            />
        </Box>
    );
};

export default DataDisplay;
