# Russell Schlup
# March 8, 2014
# ADB
# Synchronizer
import conn
import time
import calendar
import datetime

mc = conn.mongoConn()
sc = conn.sqlConn()


# --------------- Find --------------- #
mongoDB = mc.find(item = {'type':'track'})
sqlDB = sc.find()

# --------------- Sequel --------------- #
for sObj in sqlDB:
	check = mc.find(item = {'type':'track','PersistentID': sObj['PersistentID']})
	if check == []:
		mc.insert(sObj)
		print 'Added an Entry'
	elif calendar.timegm(time.strptime(str(sObj['LastModified']), '%Y-%m-%d %H:%M:%S')) > calendar.timegm(time.strptime(str(check[0]['LastModified']), '%Y-%m-%d %H:%M:%S')):
		for key in sObj.keys():
			if sObj[key] != check[0][key]:
				mc.update({'PersistentID':sObj['PersistentID']},{key: str(sObj[key])})
				print "ID: %s , Mongo: %s , SQL: %s" % (sObj['PersistentID'],check[0][key],sObj[key])
		print 'SQL update'

# --------------- Mongo --------------- #
for mObj in mongoDB:
	mObj.pop('_id')
	stmt = "where PersistentID = '"+mObj['PersistentID']+"'"
	check = sc.find(stmt = stmt)
	if check == []:
		sc.insert(mObj)
		print 'Added an Entry'
	elif calendar.timegm(time.strptime(str(mObj['LastModified']), '%Y-%m-%d %H:%M:%S')) > calendar.timegm(time.strptime(str(check[0]['LastModified']), '%Y-%m-%d %H:%M:%S')):
		for key in mObj.keys():
			if mObj[key] != check[0][key] and key != u'LastModified':
				sc.update(key, mObj[key], mObj['PersistentID'])
				print "Mongo: %s , SQL: %s" % (mObj[key], check[0][key])
		print "Key: %s , Mongo: %s , SQL: %s" % (mObj['PersistentID'], type(mObj[key]), type(check[0][key]))
		print 'Mongo update'

# persistentId, name, artist, size, kind, year, playCount