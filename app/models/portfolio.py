from .db import db


class Portfolio(db.Model):
    __tablename__ = 'portfolios'

    id = db.Column(db.Interger, primary_key=True)
    symbol = db.Column(db.String(5), nullable=False)
    quantity_owned = db.Column(db.Integer, nullable=False)
    total_purchase_price = db.Column(db.Float, nullable=False)
    user_id = db.Column(db.Integer, nullable=False)

    user = db.relationship(
        "User", back_populates='portfolios', cascade='all, delete')

    def to_dict(self):
        return {
            'id': self.id,
            'symbol': self.symbol,
            'quantityOwned': self.quantity_owned,
            'totalPurchasePrice': self.total_purchase_price,
            'userId': self.user_id,
            'user': self.user.to_dict_no_additions()
        }

    def to_dict_no_user(self):
        return {
            'id': self.id,
            'symbol': self.symbol,
            'quantityOwned': self.quantity_owned,
            'totalPurchasePrice': self.total_purchase_price,
            'userId': self.user_id,
        }
