#!/usr/bin/env python
# Python Mongo INSERT Example

import pymongo

# connnecto to the db on standard port
connection = pymongo.Connection("mongodb://localhost", safe=True)

db = connection.adbXXXX     # attach to db
collection = db.adbXXXX		# specify the collection

collection.update({"name":"Larry Farnsworth"}, {"$set":{"age":23}}, safe=True)
