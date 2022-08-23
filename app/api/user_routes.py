from flask import Blueprint, request
from flask_login import login_required
from app.models import User, db
from ..forms import AddBuyingPowerForm
from .auth_routes import validation_errors_to_error_messages

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()


@user_routes.route('/<int:userId>/buyingpower', methods=['PUT'])
@login_required
def add_buying_power(userId):
    form = AddBuyingPowerForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        user = User.query.get(userId)
        if form.data['from_account'] == 'bank account':
            user.buying_power = user.buying_power + float(form.data['amount'])
        else:
            user.buying_power = user.buying_power - float(form.data['amount'])
        db.session.commit()
        return user.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400
