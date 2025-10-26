import logging

from flask_cors import CORS

# Configure logging
logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(name)s: %(message)s")  # Show INFO and above


from backend.calender.db import init_database
from backend.calender.routes import register_routes
from flask import Flask

app = Flask(__name__)
CORS(app)
register_routes(app)
logging.info("Route configuration successful.")

init_database(app)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=True)
