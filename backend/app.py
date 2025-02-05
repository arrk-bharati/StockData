from flask import Flask, jsonify
from flask_cors import CORS
import yfinance as yf
import uuid
import json
from datetime import datetime,timedelta

app = Flask(__name__)
CORS(app)  # Enable Cross-Origin Resource Sharing

@app.route("/api/stock/<ticker>", methods=["GET"])
def get_stock_display_data(ticker):
    try:
        # Fetch stock data
        stock = yf.Ticker(ticker)
        hist = stock.history(period="1mo")  # Get 1 month of data

        # Prepare the response data
        response_data = []
        for index, row in hist.iterrows():
            response_data.append({
                "id": str(uuid.uuid4()),  # Generate a unique ID for each entry
                "date": index.strftime('%Y-%m-%d'),  # Format the date
                "open": row['Open'],
                "high": row['High'],
                "low": row['Low'],
                "close": row['Close'],
                "volume": row['Volume']
            })
        
        return jsonify({"success": True, "data": response_data})
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 400
    
if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")
