from app.models import db, WatchlistStock


def seed_watchlist_stocks():
    ws1 = WatchlistStock(
        symbol='AMZN',
        watchlist_id=1
    )
    ws2 = WatchlistStock(
        symbol='BAC',
        watchlist_id=1
    )
    ws3 = WatchlistStock(
        symbol='META',
        watchlist_id=1
    )
    ws4 = WatchlistStock(
        symbol='TSLA',
        watchlist_id=2
    )
    ws5 = WatchlistStock(
        symbol='AAPL',
        watchlist_id=2
    )
    ws6 = WatchlistStock(
        symbol='COST',
        watchlist_id=3
    )
    ws7 = WatchlistStock(
        symbol='OKTA',
        watchlist_id=3
    )
    ws8 = WatchlistStock(
        symbol='GME',
        watchlist_id=4
    )
    ws9 = WatchlistStock(
        symbol='NIO',
        watchlist_id=4
    )
    ws10 = WatchlistStock(
        symbol='DIS',
        watchlist_id=4
    )
    ws11 = WatchlistStock(
        symbol='MSFT',
        watchlist_id=4
    )
    ws12 = WatchlistStock(
        symbol='NFLX',
        watchlist_id=4
    )

    db.session.add(ws1)
    db.session.add(ws2)
    db.session.add(ws3)
    db.session.add(ws4)
    db.session.add(ws5)
    db.session.add(ws6)
    db.session.add(ws7)
    db.session.add(ws8)
    db.session.add(ws9)
    db.session.add(ws10)
    db.session.add(ws11)
    db.session.add(ws12)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_watchlist_stocks():
    db.session.execute('TRUNCATE watchlist_stocks RESTART IDENTITY CASCADE;')
    db.session.commit()
