from sqlalchemy import Boolean, ForeignKey, Index, String, Column, UUID, Enum, ARRAY, DateTime
import uuid
from sqlalchemy.orm.exc import NoResultFound

from backend.calender.db.base import ModelBase
from backend.calender.db.models.events.event_model import EventModel
from sqlalchemy.orm import relationship


class EventGuestModel(ModelBase):
    __tablename__ = "events_guests"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    event_id = Column(UUID(as_uuid=True), ForeignKey(EventModel.id), nullable=False)
    email = Column(String(), nullable=False)
    __table_args__ = (Index("uq_event_quest_const", "event_id", "email", unique=True),)

    # ASSUMPTION: Adding relationship for easier data loading
    event = relationship("EventModel", back_populates="guests")
