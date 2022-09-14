import uvicorn
from fastapi import FastAPI
from dotenv import dotenv_values
from pymongo import MongoClient

from lifestyle.routers.daily_todo import daily_todo_router

config = dotenv_values(".env")

app = FastAPI()


app.include_router(daily_todo_router)


@app.on_event("startup")
def on_startup():
    app.mongodb_client = MongoClient(config["ATLAS_URI"])
    app.database = app.mongodb_client[config["DB_NAME"]]
    print("Connected to the MongoDB database!")


@app.on_event("shutdown")
def on_shut():
    app.mongodb_client.close()


if __name__ == "__main__":
    uvicorn.run("main:app", reload=True, host="127.0.0.1", port=5000)
