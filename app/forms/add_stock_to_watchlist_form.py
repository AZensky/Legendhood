from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired

class AddStockToWatchListForm(FlaskForm):
    symbol = StringField('symbol', validators=[DataRequired()])
    watchlist_id = IntegerField('watchlist_id', validators=[DataRequired()])
