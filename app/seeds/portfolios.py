from app.models import db, Portfolio


def seed_portfolios():
    p1 = Portfolio(
        symbol='AAPL',
        quantity_owned=10,
        total_purchase_price=560.70,
        user_id=1
    )
    p2 = Portfolio(
        symbol='BOX',
        quantity_owned=70,
        total_purchase_price=1334.20,
        user_id=1
    )
    p3 = Portfolio(
        symbol='DIS',
        quantity_owned=55,
        total_purchase_price=6865.10,
        user_id=1
    )
    p4 = Portfolio(
        symbol='TEAM',
        quantity_owned=33,
        total_purchase_price=8054.97,
        user_id=1
    )
    p5 = Portfolio(
        symbol='TSLA',
        quantity_owned=6,
        total_purchase_price=5280.12,
        user_id=1
    )

    db.session.add(p1)
    db.session.add(p2)
    db.session.add(p3)
    db.session.add(p4)
    db.session.add(p5)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_portfolios():
    db.session.execute('TRUNCATE portfolios RESTART IDENTITY CASCADE;')
    db.session.commit()
