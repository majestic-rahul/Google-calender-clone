# 📅 Google Calendar Clone

A backend service designed to replicate the core functionalities of Google Calendar. This project provides a robust API for managing events, calendars, and users, built with Python and PostgreSQL.

![Python Version](https://img.shields.io/badge/python-3.x-blue)
![Database](https://img.shields.io/badge/database-PostgreSQL_16-blue)
![License](https://img.shields.io/badge/license-MIT-green)

---

## ✨ Features

* **Event Management:** Full CRUD (Create, Read, Update, Delete) operations for calendar events.
* **Database Driven:** Uses PostgreSQL for robust and persistent data storage.
* **Scalable Structure:** Organized into modules, routes, and database models for easy expansion.

## 🛠️ Tech Stack

* **Backend:** Python 3
* **Database:** PostgreSQL (v16)
* **Containerization:** Docker
* **Build/Task Runner:** `make`

---

## 🚀 Getting Started

Follow these instructions to get the backend server up and running on your local machine for development and testing.

### Prerequisites

Before you begin, ensure you have the following software installed on your system:
* [Python 3](https://www.python.org/downloads/)
* [Docker](https://www.docker.com/get-started/)
* `make` (Usually pre-installed on macOS/Linux. Windows users may need to install it via [Chocolatey](https://chocolatey.org/packages/make) or use WSL).

### 1. Database Setup (PostgreSQL with Docker)

We use Docker to run a PostgreSQL database container. This avoids having to install Postgres directly on your machine.

1.  Open your terminal.
2.  Run the following command to pull the `postgres:16` image and start the container:

    ```bash
    docker run -d \
      --name postgres_server \
      -e POSTGRES_USER=admin \
      -e POSTGRES_PASSWORD=admin123 \
      -e POSTGRES_DB=calendar_db \
      -p 5432:5432 \
      -v pg_data:/var/lib/postgresql/data \
      postgres:16
    ```

> **Note:** This command does the following:
> * `-d`: Runs the container in detached mode (in the background).
> * `--name postgres_server`: Names the container for easy reference.
> * `-e ...`: Sets the environment variables for the **user**, **password**, and **database name**.
> * `-p 5432:5432`: Maps port 5432 on your local machine to port 5432 in the container.
> * `-v pg_data...`: Creates a persistent volume named `pg_data` to ensure your data survives container restarts.

### 2. Backend Application Setup

Now that the database is running, let's set up the Python application.

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git](https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git)
    cd YOUR_REPOSITORY
    ```

2.  **Create and activate a virtual environment:**
    ```bash
    # Create the virtual environment
    python3 -m venv .venv
    
    # Activate it (macOS/Linux)
    source .venv/bin/activate
    
    # On Windows, use:
    # .\.venv\Scripts\activate
    ```

3.  **Install all dependencies:**
    This command uses the `makefile` to install everything required.
    ```bash
    make install
    ```

4.  **Run the application:**
    This will start the backend server.
    ```bash
    make run
    ```

5.  **You're all set!**
    The server is now running on **`http://localhost:8080`**. You can now use an API client like Postman or Insomnia to test the endpoints.

---

## 📁 Project Structure

Here is an overview of the project's directory structure and the purpose of each file.
