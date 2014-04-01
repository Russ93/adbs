// Mongo how to run mongo

//start server
./mongod --dbpath db

//open a mongo runner
./mongo

// dump mongo
./mongodump -d "'database'" -o "'dir'"
./mongodump -d adb1403 -o export

// Restore mongo
./mongorestore "'dir/db'"
./mongorestore export/itunes

//Import into mongo

// ----- JSON
./mongoimport -d "'database'" -c "'collection'" -file dir
./mongoimport -d adb1403 -c location -file import/locations.js

// ----- CSV
./mongoimport -d "'database'" -c "'collection'" --type csv -file "'dir.csv'" -fields "'firstame,lastname'"
// NO SPACES in fields
./mongoimport -d adb1403 -c contacts --type csv --file import/contacts.csv -fields firstame,lastname,username,dob,userStatus,userType,createdDate

// Export from mongo
./mongoexport -db "'database'" --collection "'collection'" --csv --out dir --fields "'firstame,lastname'"
./mongoexport -db adb1403 --collection adb1403 --csv --out ~/Desktop/ADB/lecture/day4/adb1403_3_12_2014.csv --fields _id,name,age,height

// dropDatabase
use "'databse'"
use itunes
db.dropDatabase()

// Update
db.adb1403.update({_id:3},{$set: {id:'Really Odd Numbers'}})

// Append to an array
db."'collection'".update({_id:0},{$push:{prime:23}})
db.m.update({id:id},{$push:{comments:obj}})

// Create Collections
db.createCollection(name, options)

// get the collections
db.getCollectionNames()

{id:'183e0724-50f8-4e00-995e-23ac5e67fbfa', fullname:'John Doe', username:'student', password:'9c11a0f6cfa1f978b43fe1592df0c8c5'}