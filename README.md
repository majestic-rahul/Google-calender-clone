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
* **Frontend:** (Assumed) React/Vue/Svelte, etc. via `npm`

---

## 🚀 Getting Started

Follow these instructions to get the backend server and frontend application up and running on your local machine.

### Prerequisites

Before you begin, ensure you have the following software installed on your system:
* [Python 3](https://www.python.org/downloads/)
* [Docker](https://www.docker.com/get-started/)
* `make` (Usually pre-installed on macOS/Linux. Windows users may need to install it via [Chocolatey](https://chocolatey.org/packages/make) or use WSL).
* [Node.js and npm](https://nodejs.org/en/download) (for the frontend)

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

1.  **Clone the repository** (if you haven't already):
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
    
    Your backend server is now running on **`http://localhost:8080`**.

### 3. Frontend Application Setup

Set up the frontend to interact with your running backend.

1.  **Clone the repository** (if separate, or navigate to the frontend directory):
    *(Assuming it's in a directory named `calendar-clone` inside the main repo, adjust as needed)*
    ```bash
    cd calendar-clone 
    ```

2.  **Install npm dependencies:**
    ```bash
    npm install
    ```

3.  **Run the frontend development server:**
    ```bash
    npm run dev
    ```

    Your frontend application is now running (usually on `http://localhost:3000` or a similar port).

---

## 🧪 Adding Dummy Data (Optional)

Once your server is running, you can insert some sample data directly into the database to test your endpoints.

1.  **Find your container ID:**
    Run `docker ps` to list your running containers.
    ```bash
    docker ps
    ```
    Look for the container with the name `postgres_server` and copy its `CONTAINER ID`.

2.  **Access the database shell:**
    Use the `CONTAINER ID` to open a `psql` shell inside the running container.
    ```bash
    # Replace {container_id} with the ID you copied
    docker exec -it {container_id} psql -U admin -d calendar_db
    ```

3.  **Insert the sample data:**
    You should now see a `calendar_db=#` prompt. Paste the following SQL query and press Enter:

    ```sql
    INSERT INTO events (id, title, description, start_time, end_time, location, is_all_day)
    VALUES
    (
        '123e4567-e89b-12d3-a456-426614174001',
        'Daily Standup',
        'Quick team sync.',
        '2025-11-10 09:00:00Z',
        '2025-11-10 09:15:00Z',
        'Zoom',
        false
    ),
    (
        '123e4567-e89b-12d3-a456-426614174002',
        'Design Sprint',
        'All-day design workshop.',
        '2025-11-12 00:00:00Z',
        '2025-11-12 23:59:59Z',
        'Main Conference Room',
        true
    ),
    (
        '123e4567-e89b-12d3-a456-426614174003',
        'Project Alpha Deadline Push',
        'Working session to meet the deadline.',
        '2025-11-28 10:00:00Z',
        '2025-12-02 18:00:00Z',
        'Project Room',
        false
    ),
    (
        '123e4567-e89b-12d3-a456-426614174004',
        'Monthly Review',
        'Review of monthly goals.',
        '2025-11-20 14:00:00Z',
        '2025-11-20 15:30:00Z',
        'Zoom',
        false
    );
    ```

4.  **Verify and Exit:**
    You can confirm the data was added by running `SELECT * FROM events;`.
    
    To exit the `psql` shell, type `\q` and press Enter.

---
