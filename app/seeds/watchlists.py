from app.models import db, Watchlist


def seed_watchlists():
    w1 = Watchlist(
        name='To buy',
        user_id=1
    )
    w2 = Watchlist(
        name='To sell',
        user_id=1
    )
    w3 = Watchlist(
        name='Upcoming Earning calls',
        user_id=1
    )
    w4 = Watchlist(
        name='Watching',
        user_id=1
    )

    db.session.add(w1)
    db.session.add(w2)
    db.session.add(w3)
    db.session.add(w4)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_watchlists():
    db.session.execute('TRUNCATE watchlists RESTART IDENTITY CASCADE;')
    db.session.commit()
