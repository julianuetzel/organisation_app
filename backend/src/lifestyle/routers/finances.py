import datetime
from dataclasses import asdict
from typing import List
from fastapi import APIRouter, Request, HTTPException, status, Body, Response
from fastapi.encoders import jsonable_encoder

from lifestyle.models.finances import Finance
from lifestyle.utils import general_asdict_factory

router = APIRouter(prefix="/finances", tags=["finances"])


@router.get(
    "/",
    response_description="Get all finances",
    response_model=List[Finance],
)
async def get_all(request: Request):
    finances = list(request.app.database["finances"].find(limit=100))
    return finances


@router.get(
    "/{id}",
    response_description="Get single finance by id",
    response_model=Finance,
)
async def get_by_id(request: Request, id: str):
    if (finance := request.app.database["finances"].find_one({"_id": id})) is not None:
        return finance
    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND, detail=f"finance with ID {id} not found!"
    )


@router.get(
    "/month/{month}-{year}",
    response_description="Get finances by month",
    response_model=List[Finance],
)
async def get_by_month(request: Request, month: int, year: int):
    if month >= 1 & month < 10:
        month = "0" + month.__str__()
    date = month+"/"+year.__str__()
    print(date)
    if (
        finances := list(
            request.app.database["finances"].find({"date": date}))

    ) is not None:
        print(finances)
        return finances
    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=f"No finances for {month}/{year} found!",
    )


@router.post(
    "/",
    response_description="Create a new finance",
    status_code=status.HTTP_201_CREATED,
    response_model=Finance,
)
async def create(request: Request, finance: Finance = Body(...)):
    finance = jsonable_encoder(finance)
    new_finance = request.app.database["finances"].insert_one(finance)
    created_finance = request.app.database["finances"].find_one(
        {"_id": new_finance.inserted_id}
    )
    return created_finance


@router.put(
    "/{id}",
    response_description="Update a finance",
    status_code=status.HTTP_202_ACCEPTED,
    response_model=Finance,
)
async def update(request: Request, id: str, finance: Finance = Body(...)):
    if request.app.database["finances"].find_one({"_id": id}) is not None:
        request.app.database["finances"].update_one(
            {"_id": id},
            {"$set": asdict(finance, dict_factory=general_asdict_factory)},
        )
    if (finance := request.app.database["finances"].find_one({"_id": id})) is not None:
        return finance
    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=f"finance with ID {id} not found!",
    )


@router.delete(
    "/{id}", response_description="Delete a finance", status_code=status.HTTP_200_OK
)
async def delete(request: Request, id: str, response: Response):
    delete_result = request.app.database["finances"].delete_one({"_id": id})

    if delete_result.deleted_count == 1:
        response.status_code = status.HTTP_204_NO_CONTENT
        return response

    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=f"finance with ID {id} not found!",
    )
