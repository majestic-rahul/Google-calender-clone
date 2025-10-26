import logging

from backend.calender.settings import settings
import sqlalchemy as sa
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase


meta = sa.MetaData()

LOGGER = logging.getLogger(__package__)


class SqlalchemyBase(DeclarativeBase):
    """Base for all models."""

    metadata = meta


database = SQLAlchemy(model_class=SqlalchemyBase)


def init_database(app: Flask):
    logging.info(f" db_url : {str(settings.db_url)}")
    app.config["SQLALCHEMY_DATABASE_URI"] = str(settings.db_url)
    LOGGER.info("Attempting DB setup.")
    database.init_app(app)
    LOGGER.info("Database connection established")

    logging.info(f"auto gen : {settings.auto_generate_tables}")

    if settings.auto_generate_tables:
        LOGGER.debug("Creating tables.")
        with app.app_context():  # ✅ fix
            print("Tables detected:", list(SqlalchemyBase.metadata.tables.keys()))

            from backend.calender.db.models.events.event_model import EventModel
            from backend.calender.db.models.events.event_guest_model import EventGuestModel

            database.create_all()
            LOGGER.info(
                f"Created app tables - {list(SqlalchemyBase.metadata.tables.keys())}",
            )
