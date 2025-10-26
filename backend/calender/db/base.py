from datetime import datetime, timezone
from sqlalchemy import Column, func, text
from sqlalchemy.types import Boolean, DateTime

from backend.calender.db import SqlalchemyBase, database


class Base(SqlalchemyBase, database.Model):
    __abstract__ = True


class ModelBase(Base):
    """
    Model Base class with created_at and updated_at functionality.
    - To be able to use this across all table in the database.
    """

    __abstract__ = True

    _created_at = Column(
        "_created_at",
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
        doc="Entry created at",
        comment="row created at",
    )

    _updated_at = Column(
        "_updated_at",
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False,
        doc="Entry last updated",
        comment="row last updated",
    )

    _deleted = Column(
        "_deleted",
        Boolean,
        server_default=text("false"),
        default=False,
        nullable=False,
        doc="soft deleted?",
        comment="soft deleted?",
    )
