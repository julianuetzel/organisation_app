from typing import List

from fastapi import APIRouter, Body, HTTPException
from fastapi.encoders import jsonable_encoder
from starlette import status
from starlette.requests import Request

from lifestyle.models.daily_todo import DailyTodoStatus, DailyToDo, DailyToDoUpdate

daily_todo_router = APIRouter(prefix="/daily-todo", tags=["daily-todo"])


@daily_todo_router.get(
    "/",
    response_description="Get all daily_todos",
    response_model=List[DailyToDo],
)
async def get_daily_todos(request: Request):
    daily_todos = list(request.app.database["daily_todos"].find(limit=100))
    return daily_todos


@daily_todo_router.get(
    "/{id}",
    response_description="Get a single daily_todo by id",
    response_model=DailyToDo
)
async def find_daily_todo(request: Request, id: str):
    if(daily_todo := request.app.database["daily_todos"].find_one({"id": id})) is not None:
        return daily_todo
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"daily_todo with ID {id} not found!")


@daily_todo_router.get(
    "/{date}",
    response_description="Get all daily_todos for the day",
    response_model=List[DailyToDo]
)
async def find_daily_todos(request: Request, date: str):
    if(daily_todos := request.app.database["daily_todos"].find({"date": date})) is not None:
        return daily_todos
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"daily_todos of date {date} not found!")


@daily_todo_router.post(
    "/",
    response_description="Create a new daily_todo",
    status_code=status.HTTP_201_CREATED,
    response_model=DailyToDo,
)
async def create_daily_todo(request: Request, daily_todo: DailyToDo = Body(...)):
    daily_todo = jsonable_encoder(daily_todo)
    new_daily_todo = request.app.database["daily_todos"].insert_one(daily_todo)
    created_daily_todo = request.app.database["daily_todos"].find_one(
        {"id": new_daily_todo.inserted_id}
    )
    return created_daily_todo
