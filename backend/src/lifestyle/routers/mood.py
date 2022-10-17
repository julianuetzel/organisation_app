from typing import List
from fastapi import APIRouter, Request, HTTPException, status, Body
from fastapi.encoders import jsonable_encoder

from lifestyle.models.mood import Mood

router = APIRouter(prefix="/mood", tags=["mood"])


@router.get(
    "/",
    response_description="Get all daily_todos",
    response_model=List[Mood])
def get_all(request: Request):
    mood = list(request.app.database["mood"].find(limit=100))
    return mood


@router.get(
    "/date/{mood_date}",
    response_description="Get mood for the day",
    response_model=Mood,
)
async def get_by_date(request: Request, mood_date: str):
    daily_mood = request.app.database["mood"].find({"mood_date": mood_date})

    if daily_mood is not None:
        return daily_mood
    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=f"daily_todos of date {daily_mood} not found!",
    )


@router.post(
    "/",
    response_description="Create a new daily_mood",
    status_code=status.HTTP_201_CREATED,
    response_model=Mood,
)
async def create(request: Request, mood: Mood = Body(...)):
    mood = jsonable_encoder(mood)
    new_mood = request.app.database["mood"].insert_one(mood)
    created_mood = request.app.database["mood"].find_one(
        {"mood_id": new_mood.inserted_id}
    )
    return created_mood
