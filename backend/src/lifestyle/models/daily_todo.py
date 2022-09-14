import datetime
import uuid
from enum import Enum
from typing import Optional
from pydantic import BaseModel, Field


class DailyTodoStatus(Enum):
    Open = "Open"
    Closed = "Closed"


class DailyToDo(BaseModel):
    id: str = Field(default_factory=uuid.uuid4)
    task: str = Field(...)
    status: DailyTodoStatus = Field(default=DailyTodoStatus.Open)
    date: str = Field(default_factory=datetime.date.today())

    class Config:
        allow_population_by_field_name = True
        schema_extra = {
            "example": {
                "id": "1",
                "task": "Abwaschen",
                "status": "Open",
                "date": "2022-09-14"
            }
        }


class DailyToDoUpdate(BaseModel):
    task: Optional[str]
    status: Optional[DailyTodoStatus]

    class Config:
        schema_extra = {
            "example": {
                "task": "Abwaschen",
                "status": "Done"
            }
        }
