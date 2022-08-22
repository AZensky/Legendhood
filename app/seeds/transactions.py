from app.models import db, Transaction
from datetime import datetime


def seed_transactions():
    # t1 = Transaction(
    #     symbol='AAPL',
    #     date=datetime.fromisoformat('2018-10-05'),
    #     quantity=10,
    #     price=56.07,
    #     user_id=1
    # )
    t2 = Transaction(
        symbol='BOX',
        date=datetime.fromisoformat('2019-01-11'),
        quantity=100,
        price=19.06,
        user_id=1
    )
    t3 = Transaction(
        symbol='DIS',
        date=datetime.fromisoformat('2020-06-05'),
        quantity=55,
        price=124.82,
        user_id=1
    )
    t4 = Transaction(
        symbol='TEAM',
        date=datetime.fromisoformat('2021-06-11'),
        quantity=66,
        price=244.09,
        user_id=1
    )
    # t5 = Transaction(
    #     symbol='TSLA',
    #     date=datetime.fromisoformat('2021-01-08'),
    #     quantity=6,
    #     price=880.02,
    #     user_id=1
    # )

    t6 = Transaction(
        symbol='BOX',
        date=datetime.fromisoformat('2020-11-20'),
        quantity=-30,
        price=17.60,
        user_id=1
    )

    t7 = Transaction(
        symbol='TEAM',
        date=datetime.fromisoformat('2022-05-20'),
        quantity=-33,
        price=177.4,
        user_id=1
    )

    # db.session.add(t1)
    db.session.add(t2)
    db.session.add(t3)
    db.session.add(t4)
    # db.session.add(t5)
    db.session.add(t6)
    db.session.add(t7)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_transactions():
    db.session.execute('TRUNCATE transactions RESTART IDENTITY CASCADE;')
    db.session.commit()
