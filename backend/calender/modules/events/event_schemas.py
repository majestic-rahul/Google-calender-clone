from marshmallow import Schema, fields, validate, post_load
from marshmallow.exceptions import ValidationError
import uuid
from datetime import datetime

# --- Guest Schemas ---


class EventGuestSchema(Schema):
    """
    Schema for validating a single guest's email.
    Used for *input* when creating/updating an event's guest list.
    """

    email = fields.Email(required=True)


class EventGuestResponseSchema(Schema):
    """
    Schema for *displaying* a guest associated with an event.
    Includes the guest's own ID and email.
    """

    id = fields.UUID(dump_only=True)
    email = fields.Email(dump_only=True)


# --- Event Schemas ---


class EventSchema(Schema):
    """
    Schema for *creating* and *updating* an event.
    Validates the input data.
    """

    title = fields.Str(required=True, validate=validate.Length(min=1))
    description = fields.Str(allow_none=True)
    start_time = fields.DateTime(required=True)
    end_time = fields.DateTime(required=True)
    location = fields.Str(allow_none=True)
    is_all_day = fields.Bool(missing=False)

    # On input, we just want a simple list of email addresses
    guests = fields.List(fields.Email(), allow_none=True, missing=[])

    @post_load
    def validate_times(self, data, **kwargs):
        """
        Validate that end_time is after start_time.
        """
        if data.get("end_time") and data.get("start_time"):
            if data["end_time"] <= data["start_time"]:
                raise ValidationError("end_time must be after start_time", "end_time")
        return data


class EventResponseSchema(Schema):
    """
    Schema for *displaying* a full event, including its details
    and the list of guests.
    """

    id = fields.UUID(dump_only=True)
    title = fields.Str(dump_only=True)
    description = fields.Str(dump_only=True)
    start_time = fields.DateTime(dump_only=True)
    end_time = fields.DateTime(dump_only=True)
    location = fields.Str(dump_only=True)
    is_all_day = fields.Bool(dump_only=True)

    # On output, we'll show the full guest objects
    guests = fields.List(fields.Nested(EventGuestResponseSchema()), dump_only=True)
