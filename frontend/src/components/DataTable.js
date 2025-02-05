import React, {useState, useEffect} from "react";
import {Box, TextField, Paper} from "@mui/material";
import {DataGrid, GridToolbar} from "@mui/x-data-grid";

const DataTable = ({data}) => {
  const [rows, setRows] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    if (data) {
      const formattedRows = data.dates
        .map((date, index) => ({
          id: index,
          date: date,
          open: parseFloat(data.openPrices[index]),
          high: parseFloat(data.highPrices[index]),
          low: parseFloat(data.lowPrices[index]),
          close: parseFloat(data.closePrices[index]),
          volume: parseInt(data.volume[index]),
        }))
        .sort((a, b) => new Date(b.date) - new Date(a.date));

      setRows(formattedRows);
    }
  }, [data]);

  const columns = [
    {
      field: "date",
      headerName: "Date",
      width: 130,
      sortable: true,
      sortingOrder: ["desc", "asc"],
      filterable: true,
    },
    {
      field: "open",
      headerName: "Open",
      width: 130,
      type: "number",
      filterable: true,
      //   valueFormatter: (params) => `${params.value.toFixed(2)}`,
    },
    {
      field: "high",
      headerName: "High",
      width: 130,
      type: "number",
      filterable: true,
      //   valueFormatter: (params) => `${params.value.toFixed(2)}`,
    },
    {
      field: "low",
      headerName: "Low",
      width: 130,
      type: "number",
      filterable: true,
      //   valueFormatter: (params) => `${params.value.toFixed(2)}`,
    },
    {
      field: "close",
      headerName: "Close",
      width: 130,
      type: "number",
      filterable: true,
      //   valueFormatter: (params) => `${params.value.toFixed(2)}`,
    },
    {
      field: "volume",
      headerName: "Volume",
      width: 130,
      type: "number",
      filterable: true,
      //   valueFormatter: (params) => params.value.toLocaleString(),
    },
  ];

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchText(value);

    if (data) {
      const filteredRows = rows.filter((row) =>
        Object.values(row).some((field) => String(field).toLowerCase().includes(value))
      );
      setRows(filteredRows);
    }
  };

  return (
    <Paper elevation={6} sx={{p: 3, borderRadius: 3, background: "linear-gradient(145deg, #ffffff 0%, #f5f5f5 100%)"}}>
      <Box sx={{width: "100%"}}>
        <TextField
          label="Search Data"
          variant="outlined"
          fullWidth
          value={searchText}
          onChange={handleSearch}
          sx={{
            mb: 2,
            "& .MuiOutlinedInput-root": {
              background: "#ffffff",
              "&:hover fieldset": {
                borderColor: "primary.main",
                borderWidth: 2,
              },
              "&.Mui-focused fieldset": {
                borderColor: "secondary.main",
                borderWidth: 2,
              },
            },
          }}
        />
        <Box sx={{height: 600}}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[5, 10, 20, 50]}
            checkboxSelection
            disableSelectionOnClick
            components={{
              Toolbar: GridToolbar,
            }}
            initialState={{
              sorting: {
                sortModel: [{field: "date", sort: "desc"}],
              },
            }}
            sx={{
              border: 2,
              borderColor: "primary.light",
              borderRadius: 2,
              "& .MuiDataGrid-cell": {
                fontSize: "0.9rem",
                padding: "12px 16px",
                color: "#2c3e50",
              },
              "& .MuiDataGrid-columnHeaders": {
                background: "linear-gradient(90deg, #1976d2 0%, #2196f3 100%)",
                color: "black",
                fontSize: "0.9rem",
                fontWeight: "bold",
                textTransform: "uppercase",
              },
              "& .MuiDataGrid-row": {
                "&:nth-of-type(even)": {
                  backgroundColor: "rgba(144, 202, 249, 0.08)",
                },
                "&:hover": {
                  backgroundColor: "rgba(144, 202, 249, 0.2)",
                  cursor: "pointer",
                  transition: "all 0.2s ease-in-out",
                },
              },
              "& .MuiDataGrid-toolbarContainer": {
                padding: "16px",
                background: "linear-gradient(90deg, #f5f5f5 0%, #ffffff 100%)",
                borderBottom: 2,
                borderColor: "primary.gre",
              },
              "& .MuiButton-root": {
                margin: "0 8px",
                background: "linear-gradient(45deg, #1976d2 30%, #2196f3 90%)",
                color: "white",
                fontWeight: "bold",
                "&:hover": {
                  background: "linear-gradient(45deg, #2196f3 30%, #1976d2 90%)",
                  transform: "scale(1.02)",
                  transition: "all 0.2s ease-in-out",
                },
              },
              "& .MuiCheckbox-root": {
                color: "primary.main",
              },
              "& .MuiDataGrid-columnSeparator": {
                color: "primary.light",
              },
              "& .MuiDataGrid-menuIcon": {
                color: "black",
              },
              "& .MuiDataGrid-sortIcon": {
                color: "black",
              },
            }}
          />
        </Box>
      </Box>
    </Paper>
  );
};

export default DataTable;
