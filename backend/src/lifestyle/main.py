import datetime

import uvicorn
from fastapi import FastAPI
from pymongo import MongoClient
from dotenv import dotenv_values
from fastapi.middleware.cors import CORSMiddleware

from lifestyle.daily_todos import change_date
from lifestyle.routers.daily_todo import router as daily_todo_router
from lifestyle.routers.weekly_todo import router as weekly_todo_router
from lifestyle.routers.finances import router as finance_router

config = dict(dotenv_values(".env"))
app = FastAPI()

app.include_router(daily_todo_router)
app.include_router(weekly_todo_router)
app.include_router(finance_router)


@app.on_event("startup")
def on_startup():
    app.mongodb_client = MongoClient(config["SERVER_URI"])
    app.database = app.mongodb_client[config["DB_NAME"]]
    change_date(datetime.datetime.today())


app.add_middleware(
    CORSMiddleware,
    allow_origins="*",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
def on_shut():
    app.mongodb_client.close()


if __name__ == "__main__":
    uvicorn.run("main:app", reload=True, host="127.0.0.1", port=5000)
