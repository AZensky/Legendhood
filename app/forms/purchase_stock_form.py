from flask_wtf import FlaskForm
from wtforms import StringField, DecimalField, IntegerField
from wtforms.validators import DataRequired, NumberRange

class PurchaseStockForm(FlaskForm):
    price = DecimalField('price', validators=[DataRequired(), NumberRange(min=0, max=None, message='Price must be positive')])
    symbol = StringField('symbol', validators=[DataRequired()])
    quantity = IntegerField('quantity', validators=[DataRequired()])
