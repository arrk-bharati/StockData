# Stock Market Data Visualizer 📈

A powerful React and Flask-based application for real-time stock market visualization with interactive charts and comprehensive data analysis.

## Architecture Overview 🏗️

### Frontend Structure

frontend/
├── src/
│ ├── components/
│ │ ├── SearchBar.js # Stock ticker search component
│ │ ├── StockChart.js # Dual chart visualization (Price & Volume)
│ │ └── DataTable.js # Interactive data grid component
│ └── App.js # Main application component

### Backend API Endpoints

GET /api/stock/<ticker>
Response: {
"success": true,
"data": [
{
"date": "YYYY-MM-DD",
"open": float,
"high": float,
"low": float,
"close": float,
"volume": int
}
]
}

## Component Details 🔍

### SearchBar Component

- Real-time stock ticker input
- Displays current stock information
- Material-UI styled interface
- Triggers API calls on search

### StockChart Component

- Dual chart layout using Chart.js
- Price movement line chart
- Volume analysis bar chart
- Interactive tooltips and legends
- Responsive design

### DataTable Component

- MUI DataGrid implementation
- Sortable columns
- Search functionality
- Formatted price display
- Date-based sorting
- Pagination support

## Framework & Library Specifications 🔧

### Python Dependencies

Flask==2.0.1
pandas==1.5.3
yfinance==0.2.28
numpy==1.24.3
python-dotenv==1.0.0
Flask-CORS==4.0.0
requests==2.31.0

### React Dependencies

{
"dependencies": {
"@emotion/react": "^11.11.1",
"@emotion/styled": "^11.11.0",
"@mui/material": "^5.14.15",
"@mui/x-data-grid": "^6.16.3",
"chart.js": "^4.4.0",
"react": "^18.2.0",
"react-chartjs-2": "^5.2.0",
"react-dom": "^18.2.0",
"lodash": "^4.17.21"
}
}

## Framework Features 🎯

### Flask Framework

- RESTful API architecture
- CORS support for cross-origin requests
- Error handling middleware
- JSON response formatting
- Environment configuration
- Request validation

### React Framework

- Component-based architecture
- Material-UI theming system
- Responsive grid layout
- Custom hooks for data fetching
- State management with useState/useEffect
- Event handling system

### Chart.js Integration

- Dual chart rendering
- Custom tooltips
- Interactive legends
- Responsive canvas
- Dynamic data updates
- Custom color schemes

### Material-UI Features

- Custom theme provider
- Grid system
- Data grid functionality
- Paper components
- Typography system
- Form controls

## Installation Guide 📦

### Clone Repository

git clone https://github.com/yourusername/stock-visualizer.git
cd stock-visualizer

### Frontend Setup

cd frontend
npm install
npm start

### Backend Setup

cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python app.py

## Features ✨

- Real-time stock data fetching
- Interactive price and volume charts
- Searchable and sortable data grid
- Responsive Material-UI design
- Date-based data organization
- Formatted numerical displays
- Cross-browser compatibility

## API Integration 🔌

The application uses a Flask backend that:

- Fetches stock data using yfinance
- Processes data with Pandas
- Serves formatted JSON responses
- Handles error cases gracefully

## Data Flow 🔄

1. User enters stock ticker
2. Frontend sends GET request to Flask API
3. Backend fetches and processes stock data
4. Frontend receives and formats data
5. Charts and DataGrid update simultaneously

## Usage Examples 💡

// Fetch stock data
const fetchStockData = async (ticker) => {
const response = await fetch(`http://127.0.0.1:5000/api/stock/${ticker}`);
const data = await response.json();
// Process and display data
}

## Contributing 🤝

1. Fork repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## License 📝

MIT License

Made with ❤️ by Bharati Patil
