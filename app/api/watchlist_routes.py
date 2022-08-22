from flask import Blueprint
from flask_login import login_required, current_user
from app.models import Watchlist


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
    return watchlist.to_dict() if watchlist else {"id": id, "watchlistStocks": []}


@watchlist_routes.route('/<int:id>/stocks/<symbol>')
@login_required
def delete_stock_from_watchlist():
    return
