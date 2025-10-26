from flask import Blueprint
from flask_restful import Api

from backend.calender.modules.events.resource import EventListResource, EventResource

v1_blueprint = Blueprint("v1_blueprint", __name__)
v1_api = Api(v1_blueprint)

v1_api.add_resource(EventListResource, "/events")
v1_api.add_resource(EventResource, "/events/<uuid:event_id>")
