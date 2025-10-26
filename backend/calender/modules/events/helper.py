import calendar
from datetime import datetime, time, timedelta


def get_day_range(date_obj):
    """Returns the start and end datetime for a given date."""
    start_of_day = datetime.combine(date_obj, time.min)
    end_of_day = datetime.combine(date_obj, time.max)
    return start_of_day, end_of_day


def get_week_range(date_obj):
    """Returns the start and end datetime for the week containing a given date (Mon-Sun)."""
    start_of_week_date = date_obj - timedelta(days=date_obj.weekday())
    end_of_week_date = start_of_week_date + timedelta(days=6)

    start_of_week = datetime.combine(start_of_week_date, time.min)
    end_of_week = datetime.combine(end_of_week_date, time.max)
    return start_of_week, end_of_week


def get_month_range(date_obj):
    """Returns the start and end datetime for the month containing a given date."""
    year, month = date_obj.year, date_obj.month
    _, num_days = calendar.monthrange(year, month)

    start_of_month = datetime(year, month, 1, 0, 0, 0)
    end_of_month = datetime(year, month, num_days, 23, 59, 59, 999999)
    return start_of_month, end_of_month
