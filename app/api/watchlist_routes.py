from flask import Blueprint
from app.models import Watchlist


watchlist_routes = Blueprint('watchlist', __name__)


@watchlist_routes.route('/<int:id>')
# @login_required
def get_watchlist(id):
    print(123)
    watchlist = Watchlist.query.get(id)
    return {'watchlist': watchlist.to_dict()}
