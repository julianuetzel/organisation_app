import uuid
from dataclasses import dataclass
from datetime import date
from enum import Enum
from typing import Optional

from pydantic import BaseModel, Field


class WeeklyToDoStatus(str, Enum):
    open = "open"
    closed = "closed"


class WeeklyToDo(BaseModel):
    id: str = Field(default_factory=uuid.uuid4, alias="_id")
    task: str = Field(...)
    status: WeeklyToDoStatus = Field(default=WeeklyToDoStatus.open)
    task_week: str = Field(default=date.today().isocalendar()[1])
    done_by: str = Field(default="Sunday")

    class Config:
        allow_population_by_field_name = True
        schema_extra = {
            "example": {
                "task": "nächstes Kapitel schreiben",
                "status": "open",
                "task_week": "38",
                "done_by": "Sonntag",
            }
        }


@dataclass()
class WeeklyToDoUpdate:
    task: Optional[str]
    status: Optional[WeeklyToDoStatus]
    task_week: Optional[str]
    done_by: Optional[str]

    class Config:
        allow_population_by_field_name = True
        schema_extra = {
            "example": {
                "task": "nächstes Kapitel schreiben",
                "status": "open",
                "task_week": "39",
                "done_by": "Mittwoch",
            }
        }
