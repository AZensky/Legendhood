from flask import Blueprint
from flask_login import login_required


watchlist_routes = Blueprint('watchlist', __name__)


@watchlist_routes.route('/<int:id>')
@login_required
def get_watchlist():
    # users = User.query.all()
    # return {'users': [user.to_dict() for user in users]}
    return
