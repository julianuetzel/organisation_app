import datetime
import uuid
from enum import Enum

from pydantic import BaseModel, Field


class FinanceType(Enum):
    income = 0
    expenditure = 1


class Finance(BaseModel):
    id: str = Field(alias="_id")
    name: str = Field(...)
    amount: float = Field(...)
    type: FinanceType = Field(...)
    date: str = Field(default_factory=datetime.datetime.today())

    class Config:
        allow_population_by_field_name = True
        schema_extra = {
            "example": {"name": "Fressnapf", "amount": 10.00, "type": 0}
        }
