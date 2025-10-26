from flask import Flask, jsonify
from backend.calender.routes.v1 import v1_blueprint


def register_routes(app: Flask):

    @app.route("/api/health")
    def health():
        return jsonify({"status": "ok", "message": "pong"}), 200

    app.register_blueprint(v1_blueprint, url_prefix="/api/v1")
