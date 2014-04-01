import mysql.connector
import pymongo
import datetime

class sqlConn(object):
	def __init__(self):	
		# mssql.conncetor 
		self.__cnx = mysql.connector.connect(user='root',password='root',host='127.0.0.1',port=8889,database='itunes')
		self.__cursor = self.__cnx.cursor()

	def find(self, **kwargs):
		# key word arguments hold arguments in an object **kwargs
		# arr of arguments *args
		stmt = kwargs.pop('stmt', '')
 		query = ("SELECT PersistentID, Name, Album, Artist, Size, Kind, Year, PlayCount, LastModified from tracks "+stmt+" ;")
 		# query = ("SELECT PersistentID, Name, Album, Artist, Size, Kind, Year, PlayCount from tracks where PersistentID = %s;")
 		# params = (id)
		# self.__cursor.execute(query,params)
		self.__cursor.execute(query)
		arr = []
		for (PersistentID, Name, Album, Artist, Size, Kind, Year, PlayCount, LastModified) in self.__cursor:
			obj = dict()
			obj['PersistentID'] = PersistentID
			obj['Name'] = Name
			obj['Album'] = Album
			obj['Artist'] = Artist
			obj['Size'] = Size
			obj['Kind'] = Kind
			obj['Year'] = Year
			obj['PlayCount'] = PlayCount
			obj['LastModified'] = LastModified
			arr.append(obj)
		return arr

	def insert(self,obj):
		# create the SQLstatement
		sql = ("INSERT INTO tracks (PersistentID, Name, Album, Artist, Size, Kind, Year, PlayCount, lastModified) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,now())")
		# Bind params
		# PersistentID, name, artist, size, kind, year, playCount
		# obj.pop('Param', None) is the attribute doesn't exist then 0 takes it's place
		params = (obj['PersistentID'], obj.pop('Name', None), obj.pop('Album', None), obj.pop('Artist', None), obj.pop('Size', None), obj.pop('Kind', None), obj.pop('Year', None), obj.pop('PlayCount', 0))
		# execute the bound parameters
		self.__cursor.execute(sql,params)
		# commits the changes
		self.__cnx.commit()

 	def update(self,col,val,perId):
 		# create the SQLstatement
		sql = ("UPDATE tracks SET "+col+" = %s, LastModified = now() where PersistentID = %s;")
		# Bind params
		params = (val,perId)
		print (sql,params)
		# execute the bound parameters
		self.__cursor.execute(sql,params)
		# commits the changes
		self.__cnx.commit()


class mongoConn(object):
	def __init__(self):
		# connnect to to the db on standard port
		self.__connection = pymongo.Connection("mongodb://localhost:27017", safe=True)
		self.__db = self.__connection.itunes     # attach to db
		self.__collection = self.__db.itunes		# specify the collection

	def find(self, **kwargs):
		# key word arguments hold arguments in an object **kwargs
		# arr of arguments *args
		item = kwargs.pop('item', {'type': 'track'})
		filt = {'PersistentID':1,'Name':1,'Album':1,'Artist':1,'Size':1,'Kind':1,'Year':1,'PlayCount':1,'LastModified':1}
		result = self.__collection.find(item,filt).sort("name",pymongo.ASCENDING)
		arr = []
		for r in result:
			arr.append(r)
		return arr

	def insert(self,doc):
		time = str(datetime.datetime.now())
		#rfind Reverse Find
		miliSecondIndex = time.rfind('.')
		#remove[beforeIndex:untilIndex]
		#.replace('this','that')
		time = time.replace('.',':')[:miliSecondIndex]
		doc['LastModified'] = time
		doc['type'] = 'track'

		print doc
		self.__collection.insert(doc, safe=True)

	def update(self, item, param):
		self.__collection.update(item, {"$set":param}, safe=True)