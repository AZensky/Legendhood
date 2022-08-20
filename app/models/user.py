from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    hashed_password = db.Column(db.String(255), nullable=False)
    buying_power = db.Column(
        db.Float(precision=2, asdecimal=False), default=0.00)

    watchlists = db.relationship(
        "Watchlist", back_populates='user', cascade='all, delete')
    transactions = db.relationship(
        'Transaction', back_populates='user', cascade='all, delete')
    portfolios = db.relationship(
        'Portfolio', back_populates='user', cascade='all, delete')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'email': self.email,
            'firstName': self.first_name,
            'lastName': self.last_name,
            'buyingPower': self.buying_power,
            'watchlists': [w.to_dict_no_user() for w in self.watchlists],
            'transactions': [t.to_dict_no_user() for t in self.transactions],
            'portfolios': [p.to_dict_no_user() for p in self.portfolios]
        }

    def to_dict_no_additions(self):
        return {
            'id': self.id,
            'email': self.email,
            'firstName': self.first_name,
            'lastName': self.last_name,
            'buyingPower': self.buying_power,
        }
