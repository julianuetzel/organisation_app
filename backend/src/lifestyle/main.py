import uvicorn
from fastapi import FastAPI
from pymongo import MongoClient
from dotenv import dotenv_values

from lifestyle.routers.daily_todo import router as daily_todo_router
from lifestyle.routers.weekly_todo import router as weekly_todo_router
from lifestyle.routers.finances import router as finance_router

config = dict(dotenv_values("lifestyle/.env"))

app = FastAPI()

app.include_router(daily_todo_router)
app.include_router(weekly_todo_router)
app.include_router(finance_router)


@app.on_event("startup")
def on_startup():
    app.mongodb_client = MongoClient(config["SERVER_URI"])
    app.database = app.mongodb_client[config["DB_NAME"]]


@app.on_event("shutdown")
def on_shut():
    app.mongodb_client.close()


if __name__ == "__main__":
    uvicorn.run("main:app", reload=True, host="127.0.0.1", port=5000)
