from dataclasses import asdict
from typing import List
from fastapi import APIRouter, Request, HTTPException, status, Body, Response
from fastapi.encoders import jsonable_encoder

from lifestyle.models.weekly_todo import WeeklyToDo, WeeklyToDoUpdate
from lifestyle.utils import general_asdict_factory

router = APIRouter(prefix="/weekly-todos", tags=["weekly-todos"])


@router.get(
    "/", response_description="Get all weekly_todos", response_model=List[WeeklyToDo]
)
async def get_all(request: Request):
    weekly_todos = list(request.app.database["weekly_todos"].find(limit=100))
    return weekly_todos


@router.get(
    "/{id}",
    response_description="Get a single weekly_todo by id",
    response_model=WeeklyToDo,
)
async def get_by_id(request: Request, id: str):
    if (
        weekly_todo := request.app.database["weekly_todos"].find_one({"_id": id})
    ) is not None:
        return weekly_todo
    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=f"weekly_todo with ID {id} not found!",
    )


@router.get(
    "/week/{task_week}",
    response_description="Get all weekly_todos for the week",
    response_model=List[WeeklyToDo],
)
async def get_by_week(request: Request, task_week: int):
    weekly_todos = list(
        request.app.database["weekly_todos"].find({"task_week": task_week})
    )
    if weekly_todos is not None:
        return weekly_todos
    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=f"weekly_todos of week {task_week} not found!",
    )


@router.post(
    "/",
    response_description="Create a new weekly_todo",
    status_code=status.HTTP_201_CREATED,
    response_model=WeeklyToDo,
)
async def create(request: Request, weekly_todo: WeeklyToDo = Body(...)):
    weekly_todo = jsonable_encoder(weekly_todo)
    new_weekly_todo = request.app.database["weekly_todos"].insert_one(weekly_todo)
    created_weekly_todo = request.app.database["weekly_todos"].find_one(
        {"_id": new_weekly_todo.inserted_id}
    )
    return created_weekly_todo


@router.put(
    "/{id}",
    response_description="Update a weekly_todo",
    status_code=status.HTTP_202_ACCEPTED,
    response_model=WeeklyToDo,
)
async def update(
    request: Request, id: str, weekly_todo_update: WeeklyToDoUpdate = Body(...)
):
    if request.app.database["weekly_todos"].find_one({"_id": id}) is not None:
        request.app.database["weekly_todos"].update_one(
            {"_id": id},
            {"$set": asdict(weekly_todo_update, dict_factory=general_asdict_factory)},
        )
    if (
        weekly_todo := request.app.database["weekly_todos"].find_one({"_id": id})
    ) is not None:
        return weekly_todo
    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=f"weekly_todo with ID {id} not found!",
    )


@router.delete(
    "/{id}", response_description="Delete a weekly_todo", status_code=status.HTTP_200_OK
)
async def delete(request: Request, id: str, response: Response):
    delete_result = request.app.database["weekly_todos"].delete_one({"_id": id})

    if delete_result.deleted_count == 1:
        response.status_code = status.HTTP_204_NO_CONTENT
        return response

    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=f"weekly_todo with ID {id} not found!",
    )
