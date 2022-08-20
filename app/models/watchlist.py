from .db import db


class Watchlist(db.Model):
    __tablename__ = 'watchlists'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(15), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

    user = db.relationship(
        "User", back_populates='watchlists')
    watchlist_stocks = db.relationship(
        "WatchlistStock", back_populates='watchlist', cascade='all, delete')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'userId': self.user_id,
            'user': self.user.to_dict_no_additions(),
            'watchlistStocks': [w.to_dict_no_watchlist() for w in self.watchlist_stocks]
        }

    def to_dict_no_additions(self):
        return {
            'id': self.id,
            'name': self.name,
            'userId': self.user_id
        }
