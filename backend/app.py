from flask import Flask, jsonify
from flask_cors import CORS
import yfinance as yf
import uuid

app = Flask(__name__)
CORS(app)  # Enable Cross-Origin Resource Sharing

@app.route("/api/stock/display/<ticker>", methods=["GET"])
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
    
@app.route("/api/stock/price/<ticker>", methods=["GET"])
def get_stock_price_data(ticker):
    try:
        # Fetch stock data
        stock = yf.Ticker(ticker)
        hist = stock.history(period="1mo")  # Get 1 month of data

         # Extract dates and closing prices
        dates = list(hist.index.strftime('%Y-%m-%d'))  # Format index as date strings
        closing_prices = list(hist['Close'])           # Extract closing prices

        # Combine dates and prices into a list of dictionaries
        stock_data = [{"dates": date, "prices": price} for date, price in zip(dates, closing_prices)]
            
        return jsonify({"success": True, "data": stock_data})
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 400

if __name__ == "__main__":
    app.run(debug=True)
