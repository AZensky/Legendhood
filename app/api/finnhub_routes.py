from flask import Blueprint, jsonify

import os
import requests

finnhub_routes = Blueprint('finnhub', __name__)

FINNHUB_API_KEY = os.environ.get('FINNHUB_API_KEY')

@finnhub_routes.route('/stock-data')
# It will take in a dynamic symbol. This is for testing.
def fetch_stock_data():
    print(FINNHUB_API_KEY)
    res = requests.get(f'https://finnhub.io/api/v1/quote?symbol=AAPL&token={FINNHUB_API_KEY}')
    data = res.json()
    print(data)
    return data
