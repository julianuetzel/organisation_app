from datetime import date
import uuid
from typing import List, Optional

from pydantic import BaseModel, Field


class ShoppingListItem:
    name: str = Field(...)
    amount: str = Field(default="1")

    class Config:
        allow_population_by_field_name = True
        schema_extra = {
            "example": {
                "name": "Äpfel",
                "amount": "6",
            }
        }


class UpdateShoppingListItem:
    name: Optional[str]
    amount: Optional[str]

    class Config:
        allow_population_by_field_name = True
        schema_extra = {
            "example": {
                "name": "Äpfel",
                "amount": "5",
            }
        }


class ShoppingList(BaseModel):
    id: str = Field(default_factory=uuid.uuid4, alias="_id")
    items: List[ShoppingListItem]
    date: str = Field(default=date.today())
