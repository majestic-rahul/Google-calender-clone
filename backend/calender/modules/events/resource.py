from flask import request, jsonify
from flask_restful import Resource
from marshmallow.exceptions import ValidationError
from sqlalchemy.exc import IntegrityError
from datetime import datetime, time, timedelta
import calendar

from backend.calender.db.models.events.event_guest_model import EventGuestModel
from backend.calender.db.models.events.event_model import EventModel
from backend.calender.modules.events.event_schemas import EventResponseSchema, EventSchema
from backend.calender.modules.events.helper import get_day_range, get_month_range, get_week_range

from ...db import database

db = database.session

# --- Resources ---

EVENTS_LIST_ENDPOINT = "/events"


class EventListResource(Resource):
    """
    Resource for creating new events and querying lists of events.
    Handles:
    - POST /events
    - GET /events?view=<day|week|month>&date=YYYY-MM-DD
    """

    def post(self):
        """Create a new event."""
        json_data = request.get_json()
        if not json_data:
            return {"message": "No input data provided"}, 400

        schema = EventSchema()
        try:
            # 1. Validate input data
            data = schema.load(json_data)
        except ValidationError as err:
            return {"errors": err.messages}, 400

        # 2. Separate guest emails from event data
        guest_emails = data.pop("guests", [])

        # 3. Create EventModel instance
        new_event = EventModel(**data)

        # 4. Create EventGuestModel instances
        for email in guest_emails:
            new_event.guests.append(EventGuestModel(email=email))

        try:
            # 5. Add to session and commit
            db.add(new_event)
            db.commit()
        except IntegrityError as e:
            db.rollback()
            return {"message": "Database integrity error", "details": str(e)}, 400
        except Exception as e:
            db.rollback()
            return {"message": "An error occurred", "details": str(e)}, 500

        # 6. Serialize and return the created event
        response_schema = EventResponseSchema()
        return response_schema.dump(new_event), 201

    def get(self):
        """Get events for a specific day, week, or month."""

        # 1. Get query parameters
        view_type = request.args.get("view", "month").lower()
        date_str = request.args.get("date")

        # 2. Parse date string or default to today
        try:
            query_date = datetime.strptime(date_str, "%Y-%m-%d").date() if date_str else datetime.utcnow().date()
        except ValueError:
            return {"message": "Invalid date format. Use YYYY-MM-DD."}, 400

        # 3. Get date range based on view_type
        if view_type == "day":
            start_range, end_range = get_day_range(query_date)
        elif view_type == "week":
            start_range, end_range = get_week_range(query_date)
        elif view_type == "month":
            start_range, end_range = get_month_range(query_date)
        else:
            return {"message": "Invalid 'view' parameter. Use 'day', 'week', or 'month'."}, 400

        # 4. Query for events that overlap with the date range
        # An event overlaps if:
        # (Event.start_time <= end_range) AND (Event.end_time >= start_range)
        try:
            events = (
                db.query(EventModel).filter(EventModel.start_time <= end_range, EventModel.end_time >= start_range).all()
            )  # Use .options(selectinload(EventModel.guests)) if you have relationships set up

            # 5. Serialize and return the results
            response_schema = EventResponseSchema(many=True)
            return response_schema.dump(events), 200

        except Exception as e:
            return {"message": "An error occurred while querying events", "details": str(e)}, 500


EVENT_ENDPOINT = EVENTS_LIST_ENDPOINT + f"/<uuid:event_id>"


class EventResource(Resource):
    """
    Resource for managing a single event.
    Handles:
    - GET /events/<uuid:event_id>
    - PUT /events/<uuid:event_id>
    - DELETE /events/<uuid:event_id>
    """

    def get(self, event_id):
        """Get a single event by its ID."""
        try:
            event = db.query(EventModel).get(event_id)
            if not event:
                return {"message": "Event not found"}, 404

            response_schema = EventResponseSchema()
            return response_schema.dump(event), 200

        except Exception as e:
            return {"message": "An error occurred", "details": str(e)}, 500

    def put(self, event_id):
        """Update (edit) a single event by its ID."""
        try:
            event = db.query(EventModel).get(event_id)
            if not event:
                return {"message": "Event not found"}, 404

            json_data = request.get_json()
            if not json_data:
                return {"message": "No input data provided"}, 400

            # 1. Validate input data, allowing partial updates
            schema = EventSchema()
            try:
                # partial=True allows users to send only the fields they want to change
                data = schema.load(json_data, partial=True)
            except ValidationError as err:
                return {"errors": err.messages}, 400

            # 2. Separate guest emails if provided
            # If 'guests' key is not in json, guest_emails will be None
            guest_emails = data.pop("guests", None)

            # 3. Update basic event fields
            for key, value in data.items():
                setattr(event, key, value)

            # 4. Handle guest list update *if* 'guests' was part of the request
            if guest_emails is not None:
                # This logic replaces the entire guest list.
                # First, delete all existing guests for this event.
                db.query(EventGuestModel).filter_by(event_id=event_id).delete()

                # Second, add the new guest list
                new_guests = []
                for email in guest_emails:
                    new_guests.append(EventGuestModel(email=email, event_id=event_id))

                # Add all new guests to the session
                if new_guests:
                    db.bulk_save_objects(new_guests)

            # 5. Commit changes
            db.commit()

            # 6. Serialize and return the updated event
            response_schema = EventResponseSchema()
            return response_schema.dump(event), 200

        except IntegrityError as e:
            db.rollback()
            return {"message": "Database integrity error", "details": str(e)}, 400
        except Exception as e:
            db.rollback()
            return {"message": "An error occurred", "details": str(e)}, 500

    def delete(self, event_id):
        """Delete a single event by its ID."""
        try:
            event = db.query(EventModel).get(event_id)

            if not event:
                return {"message": "Event not found"}, 404

            # Note: Because of `cascade="all, delete-orphan"` on the
            # relationship, deleting the event will automatically delete
            # its associated EventGuestModel entries.
            # If cascade is not set, you must delete guests manually first:
            # db.query(EventGuestModel).filter_by(event_id=event_id).delete()

            db.delete(event)
            db.commit()

            return "", 204  # 204 No Content is standard for successful DELETE

        except Exception as e:
            db.rollback()
            return {"message": "An error occurred", "details": str(e)}, 500
