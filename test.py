from flask import Flask, render_template, jsonify
import sqlalchemy
from flask_pymongo import PyMongo

app = Flask(__name__)
# Use flask_pymongo to set up mongo connection
app.config["MONGO_URI"] = "mongodb+srv://coffee:uncgroupproject@unccoffee.2mz8n.mongodb.net/coffee?retryWrites=true&w=majority"
mongo = PyMongo(app)
ratings_collection = mongo.db.ratings
country_collection = mongo.db.country
methods_collection = mongo.db.methods

ratingsdict = {}
ratings_docs = ratings_collection.find({})
# for index, document in enumerate(ratings_docs):
#     print(document)
#     ratingsdict[f"{index}"] = document
for document in ratings_docs:
    print(document)
   