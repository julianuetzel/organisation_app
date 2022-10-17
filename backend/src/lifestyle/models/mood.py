import uuid
from datetime import date
from pydantic import BaseModel, Field


class Mood(BaseModel):
    id: str = Field(default_factory=uuid.uuid4, alias="_id")
    mood_date: str = Field(default=date.today().strftime("%d.%m.%Y"))
    anger: int = Field(default=0)
    fear: int = Field(default=0)
    fault: int = Field(default=0)
    shame: int = Field(default=0)
    happyness: int = Field(default=0)
    sadness: int = Field(default=0)

    class Config:
        allow_population_by_field_name = True
        schema_extra = {
            "example": {
                "anger": "0",
                "fear": "0",
                "fault": "0",
                "shame": "0",
                "happyness": "0",
                "sadness": "0",
            }
        }
