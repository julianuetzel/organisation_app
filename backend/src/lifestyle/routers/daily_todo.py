from dataclasses import asdict
from typing import List

from fastapi import APIRouter, Body, Request, Response, HTTPException, status
from fastapi.encoders import jsonable_encoder

from lifestyle.models.daily_todo import DailyToDo, DailyToDoUpdate
from lifestyle.utils import general_asdict_factory

from src.lifestyle.daily_todos import change_date

router = APIRouter(prefix="/daily-todos", tags=["daily-todos"])


@router.get(
    "/",
    response_description="Get all daily_todos",
    response_model=List[DailyToDo],
)
async def get_all(request: Request):
    daily_todos = list(request.app.database["daily_todos"].find(limit=100))
    return daily_todos


@router.get(
    "/{id}",
    response_description="Get a single daily_todo by id",
    response_model=DailyToDo,
)
async def get_by_id(request: Request, id: str):
    if (
        daily_todo := request.app.database["daily_todos"].find_one({"_id": id})
    ) is not None:
        return daily_todo
    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=f"daily_todo with ID {id} not found!",
    )


@router.get(
    "/date/{task_date}",
    response_description="Get all daily_todos for the day",
    response_model=List[DailyToDo],
)
async def get_by_date(request: Request, task_date: str):
    daily_todos = list(
        request.app.database["daily_todos"].find({"task_date": task_date})
    )
    if daily_todos is not None:
        change_date(task_date)
        return daily_todos
    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=f"daily_todos of date {task_date} not found!",
    )


@router.post(
    "/",
    response_description="Create a new daily_todo",
    status_code=status.HTTP_201_CREATED,
    response_model=DailyToDo,
)
async def create(request: Request, daily_todo: DailyToDo = Body(...)):
    daily_todo = jsonable_encoder(daily_todo)
    new_daily_todo = request.app.database["daily_todos"].insert_one(daily_todo)
    created_daily_todo = request.app.database["daily_todos"].find_one(
        {"_id": new_daily_todo.inserted_id}
    )
    return created_daily_todo


@router.put(
    "/{id}",
    response_description="Update a daily_todo",
    status_code=status.HTTP_202_ACCEPTED,
    response_model=DailyToDoUpdate,
)
async def update(
    request: Request, id: str, daily_todo_update: DailyToDoUpdate = Body(...)
):
    if request.app.database["daily_todos"].find_one({"_id": id}) is not None:
        request.app.database["daily_todos"].update_one(
            {"_id": id},
            {"$set": asdict(daily_todo_update, dict_factory=general_asdict_factory)},
        )
    if (
        daily_todo := request.app.database["daily_todos"].find_one({"_id": id})
    ) is not None:
        return daily_todo
    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=f"daily_todo with ID {id} not found!",
    )


@router.delete(
    "/{id}", response_description="Delete a daily_todo", status_code=status.HTTP_200_OK
)
async def delete(request: Request, id: str, response: Response):
    delete_result = request.app.database["daily_todos"].delete_one({"_id": id})

    if delete_result.deleted_count == 1:
        response.status_code = status.HTTP_204_NO_CONTENT
        return response

    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=f"daily_todo with ID {id} not found!",
    )
