from sqlalchemy import String, Column, UUID, Enum, ARRAY
import uuid
from sqlalchemy.orm.exc import NoResultFound

from backend.calender.db.base import ModelBase


class UserModel(ModelBase):
    __tablename__ = "coulson_users"
    __label__ = "coulson_users"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String(), nullable=False)
    email = Column(String(), nullable=True, unique=True)
    username = Column(String(), nullable=False, unique=True)
    phone_number = Column(String(), nullable=False)
