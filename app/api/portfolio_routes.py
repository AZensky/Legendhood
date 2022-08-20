from flask import Blueprint, jsonify, session, request
from app.models import User, Portfolio, db

portfolio_routes = Blueprint('portfolio', __name__)

# Portfolio route, returns all assets owned for a user, including the quantity owned, symbol, and the total purchase price for each asset
@portfolio_routes.route('/<userid>')
def get_users_portfolio(userid):
    assets = Portfolio.query.filter(Portfolio.user_id == userid).all()
    res = {"Assets": []}

    for asset in assets:
        res['Assets'].append(asset.to_dict_no_user())

    return res
