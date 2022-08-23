from flask import Blueprint, jsonify, session, request
from app.models import User, Transaction, db
from flask_login import current_user
from sqlalchemy import and_
from .auth_routes import validation_errors_to_error_messages
from ..forms import PurchaseStockForm, SellStockForm


portfolio_routes = Blueprint('portfolio', __name__)

# Portfolio route, returns all assets owned for a user, including the quantity owned, symbol, and the total purchase price for each asset
@portfolio_routes.route('/<userid>')
def get_users_portfolio(userid):
    assets = Transaction.query.filter(Transaction.user_id == userid).all()
    res = {"Assets": []}

    for asset in assets:
        res['Assets'].append(asset.to_dict_no_user())

    return res

# API route for buying stocks
@portfolio_routes.route('/<int:userid>/stocks', methods=["POST"])
def purchase_stock(userid):
    form = PurchaseStockForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():

        user = User.query.get(userid)
        if user.buying_power < form.data['price']:
            return {"message": "Insufficent Funds", "statusCode": 400}, 400
        else:
            user.buying_power = user.buying_power - float(round(form.data['price'] * form.data['quantity'], 2))

            transaction = Transaction(symbol=form.data['symbol'], quantity=form.data['quantity'], price=form.data['price'], user_id=userid)

            db.session.add(transaction)
            db.session.commit()
            return transaction.to_dict()

    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400

# API route to sell stock
@portfolio_routes.route('/<userid>/stocks/<symbol>', methods=["POST"])
def sell_stock(userid, symbol):
    form = SellStockForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        data = form.data

        user_transactions = Transaction.query.filter(and_(
            Transaction.user_id == userid, Transaction.symbol == data['symbol'])).all()

        if user_transactions is None:
            return {"message": "You do not own this stock", "statusCode": 400}, 400

        quantity_owned = 0

        for transaction in user_transactions:
            quantity_owned += transaction.quantity

        if quantity_owned < data['quantity']:
            return {"message": "You can not sell more stock than you own", "statusCode": 400}

        user = User.query.get(userid)
        user.buying_power += float(data['price'] * data['quantity'])

        transaction = Transaction(
            symbol=symbol, quantity=-abs(data['quantity']), price=data['price'], user_id=userid)

        db.session.add(transaction)
        db.session.commit()
        return {'message': "Successfully sold stock", 'statusCode': 200}

    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400
