import uuid
from dataclasses import dataclass
from datetime import date
from pydantic import BaseModel, Field


class WeeklyToDo(BaseModel):
    id: str = Field(default_factory=uuid.uuid4, alias="_id")
    task: str = Field(...)
    done: bool = Field(default=False)
    task_week: int = Field(default=date.today().isocalendar()[1])
    done_by: str = Field(default="Sunday")

    class Config:
        allow_population_by_field_name = True
        schema_extra = {
            "example": {
                "task": "nächstes Kapitel schreiben",
                "done": "False",
                "task_week": "38",
                "done_by": "Sonntag",
            }
        }


@dataclass()
class WeeklyToDoUpdate:
    task: str
    done: bool
    done_by: str

    class Config:
        allow_population_by_field_name = True
        schema_extra = {
            "example": {
                "task": "nächstes Kapitel schreiben",
                "done": "False",
                "done_by": "Mittwoch",
            }
        }
