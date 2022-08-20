from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        email='demo@aa.io', first_name='Demo', last_name='Demo', password='password', buying_power=1000000)
    alex = User(
        email='alex@aa.io', first_name='Alex', last_name='Zelinsky', password='password', buying_power=1000)
    yue = User(
        email='yue@aa.io', first_name='Yue', last_name='Huang', password='password')
    zeus = User(
        email='zeus@aa.io', first_name='Zeus', last_name='Ronzan', password='password')
    lisa = User(
        email='lisa@aa.io', first_name='Lisa', last_name='Zhou', password='password')

    db.session.add(demo)
    db.session.add(alex)
    db.session.add(yue)
    db.session.add(zeus)
    db.session.add(lisa)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
