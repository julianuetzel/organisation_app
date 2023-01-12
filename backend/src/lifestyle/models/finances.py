import uuid
from enum import Enum
from datetime import datetime

from pydantic import BaseModel, Field

class Finance(BaseModel):
    id: str = Field(default_factory=uuid.uuid4, alias="_id")
    name: str = Field(...)
    amount: float = Field(...)
    type: int = Field(...)
    date = Field(default=datetime.today().strftime("%m/%Y"))

    class Config:
        allow_population_by_field_name = True
        schema_extra = {
            "example": {"name": "Fressnapf", "amount": 10.00, "type": 0}
        }
