from .db import db


class Transaction(db.Model):
    __tablename__ = 'transactions'

    id = db.Column(db.Integer, primary_key=True)
    symbol = db.Column(db.String(5), nullable=False)
    date = db.Column(db.Date, nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Float, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))

    user = db.relationship(
        "User", back_populates='transactions', cascade='all, delete')

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
