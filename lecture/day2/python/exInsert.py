#!/usr/bin/env python
# Python Mongo INSERT Example

import pymongo

# connnecto to the db on standard port
connection = pymongo.Connection("mongodb://localhost", safe=True)

db = connection.adbXXXX     # attach to db
collection = db.adbXXXX		# specify the collection

doc = {"name":"Larry Farnsworth", 
	"type":"user"
	}

collection.insert(doc, safe=True)
