from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Watchlist, WatchlistStock, db
from app.forms import CreateWatchlistForm, EditWatchlistForm, AddStockToWatchListForm
from app.api.auth_routes import validation_errors_to_error_messages


watchlist_routes = Blueprint('watchlist', __name__)


@watchlist_routes.route('')
@login_required
def get_watchlists():
    watchlists = Watchlist.query.filter(
        Watchlist.user_id == current_user.id).all()
    return {'watchlists': [watchlist.to_dict() for watchlist in watchlists]}


@watchlist_routes.route('/<int:id>')
@login_required
def get_watchlist_by_id(id):
    watchlist = Watchlist.query.filter(
        Watchlist.user_id == current_user.id,  Watchlist.id == id).one_or_none()
    # else should throw 404
    if watchlist:
        return watchlist.to_dict()
    else:
       return  {"id": id, "watchlistStocks": []}, 404



@watchlist_routes.route('', methods=["POST"])
@login_required
def create_watchlist():
    form = CreateWatchlistForm()

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        data = form.data
        user = current_user
        new_watchlist = Watchlist(name=data['name'], user_id=user.id)
        db.session.add(new_watchlist)
        db.session.commit()
        return new_watchlist.to_dict()

    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400


@watchlist_routes.route('/<watchlistid>', methods=["PUT"])
@login_required
def edit_watchlist(watchlistid):
    form  = EditWatchlistForm()

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        data = form.data
        watch_list = Watchlist.query.get(watchlistid)
        watch_list.name = data['name']
        db.session.commit()
        return watch_list.to_dict()

    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400


@watchlist_routes.route('/<watchlistid>', methods=["DELETE"])
@login_required
def delete_watchlist(watchlistid):

    watch_list = Watchlist.query.get(watchlistid)

    if watch_list is not None:
        db.session.delete(watch_list)
        db.session.commit()
        return {"message": "Successfully deleted"}

    # else should throw 404
    else:
        return {"message": "Stock not found"}, 404


@watchlist_routes.route('/<int:id>/stocks/<symbol>', methods=['DELETE'])
@login_required
def delete_watchlist_stock_by_id(id, symbol):

    watchlist_stock = WatchlistStock.query.filter(WatchlistStock.watchlist_id == id, WatchlistStock.symbol == symbol).first()

    if watchlist_stock is not None:
        db.session.delete(watchlist_stock)
        db.session.commit()
        return {"message": "Successfully deleted"}

    # else should throw 404
    else:
        return {"message": "Stock not found"}, 404


@watchlist_routes.route('/<int:id>/stocks/<symbol>', methods=["POST"])
@login_required
def create_watchlist_stock_by_id(id, symbol):
    form = AddStockToWatchListForm()

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        data = form.data
        new_watchlist_stock = WatchlistStock(symbol=data['symbol'], watchlist_id = data['watchlist_id'])
        db.session.add(new_watchlist_stock)
        db.session.commit()
        return new_watchlist_stock.to_dict()

    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400
