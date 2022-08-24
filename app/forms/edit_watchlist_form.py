from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError

def watchlist_name_length(form, field):
    watchlist_name = field.data
    if len(watchlist_name) >15:
        raise ValidationError("Watchlist's name must be 15 characters or less.")

class EditWatchlistForm(FlaskForm):
    name = StringField('name', validators=[DataRequired(), watchlist_name_length])
