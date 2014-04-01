#!/usr/bin/env python
# Python Mongo Find Example

import pymongo

# connnecto to the db on standard port
connection = pymongo.Connection("mongodb://localhost", safe=True)

db = connection.adbXXXX     # attach to db
collection = db.adbXXXX		# specify the collection

result = collection.find({"name":{"$exists":"true"}}).sort("name",pymongo.ASCENDING)

author, title, text, datetime, category
{author:'', id:'', title:'', text:'', posted: 0, category:'' comments:[]}