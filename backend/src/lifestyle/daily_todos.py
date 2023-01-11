import datetime
import pymongo


def change_date(date):
    myclient = pymongo.MongoClient("mongodb://localhost:9000/")
    mydb = myclient["lifestyle_db"]
    mycol = mydb["daily_todos"]

    myquery = {"$and": [{"task_date": {"$gt": date}}, {"done": False}]}
    new_date = {"$set": {"task_date": datetime.datetime.today().strftime("%Y.%m.%d")}}
    mycol.update_many(myquery, new_date)