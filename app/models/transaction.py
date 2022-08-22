from .db import db
from datetime import datetime


class Transaction(db.Model):
    __tablename__ = 'transactions'

    id = db.Column(db.Integer, primary_key=True)
    symbol = db.Column(db.String(5), nullable=False)
    date = db.Column(db.DateTime, default=datetime.utcnow)
    quantity = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Float(precision=2, asdecimal=False), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

    user = db.relationship(
        "User", back_populates='transactions')

    def to_dict(self):
        return {
            'id': self.id,
            'symbol': self.symbol,
            'date': self.date,
            'quantity': self.quantity,
            'price': self.price,
            'userId': self.user_id,
            'user': self.user.to_dict_no_additions()
        }

    def to_dict_no_user(self):
        return {
            'id': self.id,
            'symbol': self.symbol,
            'date': self.date,
            'quantity': self.quantity,
            'price': self.price,
            'userId': self.user_id,
        }
