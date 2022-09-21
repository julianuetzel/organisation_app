from dataclasses import dataclass
from datetime import date
import uuid
from enum import Enum
from typing import Optional
from pydantic import BaseModel, Field


class DailyToDoStatus(str, Enum):
    open = "open"
    closed = "closed"


class DailyToDo(BaseModel):
    id: str = Field(default_factory=uuid.uuid4, alias="_id")
    task: str = Field(...)
    status: DailyToDoStatus = Field(default=DailyToDoStatus.open)
    task_date: str = Field(default=date.today().strftime("%d-%m-%Y"))

    class Config:
        allow_population_by_field_name = True
        schema_extra = {
            "example": {
                "_id": "066de609-b04a-4b30-b46c-32537c7f1f6e",
                "task": "Abwaschen",
                "status": "open",
                "task_date": "2022-09-14",
            }
        }


@dataclass()
class DailyToDoUpdate:
    task: Optional[str]
    status: Optional[DailyToDoStatus]

    class Config:
        allow_population_by_field_name = True
        schema_extra = {"example": {"task": "Abwaschen", "status": "closed"}}
