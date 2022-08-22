from flask import Blueprint
# from flask_login import login_required
from app.models import Watchlist


watchlist_routes = Blueprint('watchlist', __name__)


@watchlist_routes.route('')
# @login_required
def get_watchlists():
    watchlists = Watchlist.query.all()
    return {'watchlists': [watchlist.to_dict() for watchlist in watchlists]}


@watchlist_routes.route('/<int:id>')
# @login_required
def get_watchlist_by_id(id):
    watchlist = Watchlist.query.get(id)
    return watchlist.to_dict()
