from .db import db


class WatchlistStock(db.Model):
    __tablename__ = 'watchlist_stocks'

    id = db.Column(db.Integer, primary_key=True)
    symbol = db.Column(db.String(5), nullable=False)
    watchlist_id = db.Column(db.Integer, db.ForeignKey(
        'watchlists.id'), nullable=False)

    watchlist = db.relationship("Watchlist", back_populates='watchlist_stocks')

    def to_dict(self):
        return {
            'id': self.id,
            'symbol': self.symbol,
            'watchlist_id': self.watchlist_id,
            'watchlist': self.watchlist.to_dict_no_additions()
        }

    def to_dict_no_watchlist(self):
        return {
            'id': self.id,
            'symbol': self.symbol,
            'watchlist_id': self.watchlist_id
        }
