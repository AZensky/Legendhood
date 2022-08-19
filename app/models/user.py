from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)

    watchlists = db.relationship("Watchlist", back_populates='user')
    transactions = db.relationship('Transaction', back_populates='user')
    portfolios = db.relationship('Portfolio', back_populates='user')

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
            'watchlists': [w.to_dict_no_user() for w in self.watchlists],
            'transactions': [t.to_dict_no_user() for t in self.transactions],
            'portfolios': [p.to_dict_no_user() for p in self.portfolios]
        }

    def to_dict_no_additions(self):
        return {
            'id': self.id,
            'email': self.email
        }
