from flask import Blueprint, jsonify, session, request
from app.models import User, Portfolio, Transaction, db
from flask_login import current_user
from sqlalchemy import and_
from .auth_routes import validation_errors_to_error_messages

portfolio_routes = Blueprint('portfolio', __name__)

# Portfolio route, returns all assets owned for a user, including the quantity owned, symbol, and the total purchase price for each asset
@portfolio_routes.route('/<userid>')
def get_users_portfolio(userid):
    assets = Portfolio.query.filter(Portfolio.user_id == userid).all()
    res = {"Assets": []}

    for asset in assets:
        res['Assets'].append(asset.to_dict_no_user())

    return res

@portfolio_routes.route('/<int:userid>/stocks', methods=["POST"])
def purchase_stock(userid):
    form = PurchaseStockForm()

    if form.validate_on_submit():
        transaction = Transaction(symbol=form.data['symbol'], quantity=form.data['quantity'], price=form.data['price'], user_id = userid)
        user_asset = Portfolio.query.filter(and_(Portfolio.user_id == userid, Portfolio.symbol == form.data['symbol'])).first()

        if len(user_asset) > 0:
            user_asset['quantity_owned'] += form.data['quantity']
            user_asset['total_purchase_price'] += round(form.data['quantity'] * form.data['price'], 2)
        else:
            new_asset = Portfolio(symbol=form.data['symbol'], quantityOwned=form.data['quantity'], totalPurchasePrice=round(form.data['quantity']*form.data['price'], 2), user_id=userid)
            db.session.add(new_asset)

        db.session.add(transaction)
        db.session.commit()

    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401
