from dataclasses import dataclass
from datetime import date
import uuid
from pydantic import BaseModel, Field


class DailyToDo(BaseModel):
    id: str = Field(default_factory=uuid.uuid4, alias="_id")
    task: str = Field(...)
    done: bool = Field(default=False)
    task_date: str = Field(default=date.today().strftime("%d.%m.%Y"))

    class Config:
        allow_population_by_field_name = True
        schema_extra = {
            "example": {
                "task": "Abwaschen",
                "done": "False",
                "task_date": "2022.09.14",
            }
        }


@dataclass()
class DailyToDoUpdate:
    task: str
    done: bool

    class Config:
        allow_population_by_field_name = True
        schema_extra = {"example": {"task": "Abwaschen", "done": "True"}}
