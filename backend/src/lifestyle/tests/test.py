import uuid
from datetime import date

from lifestyle.models.daily_todo import DailyToDoStatus

print(
    str(date.today()),
    date.today().strftime("%d-%m-%Y"),
    date.today(),
    str(uuid.uuid4()),
    uuid.uuid4(),
    DailyToDoStatus.Open.value,
)
