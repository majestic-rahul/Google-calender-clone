from sqlalchemy import Boolean, String, Column, UUID, Enum, ARRAY, DateTime
import uuid
from sqlalchemy.orm.exc import NoResultFound

from backend.calender.db.base import ModelBase
from sqlalchemy.orm import relationship


class EventModel(ModelBase):
    __tablename__ = "events"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    title = Column(String(), nullable=False)
    description = Column(String(), nullable=True)
    start_time = Column(DateTime(), nullable=False)
    end_time = Column(DateTime(), nullable=False)
    location = Column(String(), nullable=True)
    is_all_day = Column(Boolean(), nullable=True, default=False)

    # ASSUMPTION: Adding relationship for easier data loading
    guests = relationship("EventGuestModel", back_populates="event", cascade="all, delete-orphan")
