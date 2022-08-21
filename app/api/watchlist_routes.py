from flask import Blueprint
# from flask_login import login_required
from app.models import Watchlist


watchlist_routes = Blueprint('watchlist', __name__)


@watchlist_routes.route('/<int:id>')
# @login_required
def get_watchlist(id):
    watchlist = Watchlist.query.get(id)
    return watchlist.to_dict()
