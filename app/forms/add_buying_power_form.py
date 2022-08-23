from flask_wtf import FlaskForm
from wtforms import DecimalField, SelectField
from wtforms.validators import DataRequired, ValidationError
from flask_login import current_user


def transfer_out_limit(form, field):
    amount = form.data['amount']
    from_account = form.data['from_account']
    to = form.data['to']
    if from_account == 'legendhood'\
            and to == "bank account"\
            and amount > current_user.to_dict()['buyingPower']:
        raise ValidationError(
            'Amount transfers out cannot exceed your current buying power.')


def account_check(form, field):
    from_account = form.data['from_account']
    to = form.data['to']
    if from_account == to:
        raise ValidationError('Cannot transfer between the same account')


def amount_valid(form, field):
    amount = field.data
    if amount <= 0:
        raise ValidationError('Invalid transfer amount')


class AddBuyingPowerForm(FlaskForm):
    amount = DecimalField('Amount', validators=[
                          DataRequired(), transfer_out_limit, amount_valid])
    from_account = SelectField(
        'From', choices=['bank account', 'legendhood'], validators=[DataRequired(), account_check])
    to = SelectField(
        'To', choices=['bank account', 'legendhood'], validators=[DataRequired(), account_check])
