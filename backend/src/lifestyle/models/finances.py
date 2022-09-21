import uuid
from dataclasses import dataclass
from enum import Enum
from typing import Optional

from pydantic import BaseModel, Field


class FinanceType(str, Enum):
    income = "INCOME"
    expenditure = "EXPENDITUR"


class Finance(BaseModel):
    id: str = Field(default_factory=uuid.uuid4, alias="_id")
    name: str = Field(...)
    amount: float = Field(...)
    type: FinanceType = Field(...)

    class Config:
        allow_population_by_field_name = True
        schema_extra = {
            "example": {
                "name": "Fressnapf",
                "amount": 10.00,
                "type": "INCOME"
            }
        }


@dataclass
class FinanceUpdate:
    name: Optional[str]
    amount: Optional[float]
    type: Optional[FinanceType]

    class Config:
        allow_population_by_field_name = True
        schema_extra = {"example": {"name": "Amazon", "amount": "10.50", "type": "EXPENDITUR"}}