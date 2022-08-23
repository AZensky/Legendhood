from flask_wtf import FlaskForm
from wtforms import DecimalField, SelectField
from wtforms.validators import DataRequired


class AddBuyingPowerForm(FlaskForm):
    amount = DecimalField('Amount', validators=[DataRequired()])
    from_account = SelectField(
        'From', choices=['Bank Account', 'Legendhood'], validators=[DataRequired()])
    to = SelectField('To', choices=[], validators=[DataRequired()])
