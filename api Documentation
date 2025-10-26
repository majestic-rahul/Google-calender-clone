# Google Calendar API Documentation

This document outlines the available endpoints for the Google Calendar service API.

## 🗂️ Base URL

All endpoints are relative to a base URL, represented as `{{calender_local}}` in the Postman collection. This might be a local development URL (like `http://localhost:8000/api/v1`) or a production URL.

All request and response bodies are in **JSON** format.

---

## Endpoints

The endpoints are organized by functionality:

1.  [Create a New Event](#1-create-a-new-event)
2.  [Get Events (List)](#2-get-events-list)
3.  [Get Event by ID](#3-get-event-by-id)
4.  [Update an Event](#4-update-an-event)
5.  [Delete an Event](#5-delete-an-event)

---

### 1. Create a New Event

Adds a new event to the calendar.

* **Endpoint:** `POST /events`
* **Description:** Creates a single new event with specified details.

#### Request Body

The request body must be a JSON object containing the event details.

**Example Payload:**
```json
{
    "title": "Project Kick-off Meeting",
    "description": "Discussing the new project timeline and deliverables.",
    "start_time": "2025-11-05T14:00:00Z",
    "end_time": "2025-11-05T15:30:00Z",
    "location": "Main Conference Hall",
    "is_all_day": false,
    "guests": [
        "manager@example.com",
        "lead.dev@example.com"
    ]
}
