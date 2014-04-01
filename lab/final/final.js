// ----- 1
se adb1403f
// ----- 2
ikea = {_id: 'ikea',name: 'IKEA',type:"vendor",address: "4092 Eastgate Drive",city: "Orlando",state: "FL",ll: [-79.441833,44.012893],phone: [{type:'main', number:'(888) 888-4532'},{type:'fax', number:'(888) 888-4532'}]}
go = {_id: 'gocalendars', name: 'Go! Calendars',type:"vendor",address: "451 E Altamonte Dr",city: "Altamonte Springs",state: "FL",ll: [-81.375883,28.667207],phone: [{type:'main', number:'(321) 207-0021'},{type:'fax', number:'(321) 207-0021'}]}
microsoft = {_id: 'microsoftcorporation',name: 'Microsoft Corporation',type:"vendor",address: "One Microsoft Way",city: "Redmond",state: "WA",ll: [-122.131378,47.638197],phone: [{type:'main', number:'(425) 882-8080'},{type:'fax', number:'(425) 882-8080'}]}
viewsonic = {_id: 'viewsoniccorporation',name: 'ViewSonic Corporation',type:"vendor",address: "381 Brea Canyon, Road",city: "Walnut",state: "CA",ll: [-117.844840,34.013444],phone: [{type:'main', number:'(425) 882-8080'},{type:'fax', number:'(425) 882-8080'}]}
db.adb.insert(ikea)
db.adb.insert(go)
db.adb.insert(microsoft)
db.adb.insert(viewsonic)
// ----- 3
db.adb.insert({_id: 'xbox360',name: 'Xbox 360',type: "product",vendor: "Microsoft Corporation",category: "Electronic",features: ["RGBY Compatible", "Wi-Fi", "Wireless Controllers"]})
db.adb.insert({_id: 'zune',name: 'Zune',type: "product",vendor: "Microsoft Corporation",category: "Electronic",features: ["Mp3", "Mp4", "Wi-Fi"]})
db.adb.insert({_id: 'microsoftsurface',name: 'Microsoft Surface',type: "product",vendor: "Microsoft Corporation",category: "Electronic",features: ["USB", "Stand Up", "Wi-Fi"]})
db.adb.insert({_id: 'xboxone',name: 'Xbox One',type: "product",vendor: "Microsoft Corporation",category: "Electronic",features: ["HDMI", "1080 p", "Wi-Fi"]})
db.adb.insert({_id: 'microsoftmouse',name: 'Microsoft Mouse',type: "product",vendor: "Microsoft Corporation",category: "Electronic",features: ["USB", "Blue Tooth", "Rechargeable"]})
db.adb.insert({_id: 'arholma',name: 'Arholma',type: "product",vendor: "IKEA",category: "Furniture",features: ["Modular", "Combination"]})
db.adb.insert({_id: 'falster',name: 'Falster',type: "product",vendor: "IKEA",category: "Furniture",features: ["Wood", "Patio", 'Paintable']})
db.adb.insert({_id: 'applaro',name: 'Applaro',type: "product",vendor: "IKEA",category: "Furniture",features: ["Drop-Leaf", "Table", 'Wood']})
db.adb.insert({_id: 'borisvallejo',name: "Boris Vallejo & Julie Bell's Fantasy 2014 Wall Calendar",type: "product",vendor: "Go! Calendars",category: "Electronic",features: ["12-month span", "mediumsquare"]})
db.adb.insert({_id: 'badcat2014wallcalendar',name: 'Bad Cat 2014 Wall Calendar',type: "product",vendor: "Go! Calendars",category: "Electronic",features ["12-month span", "mediumsquare"]})
db.adb.insert({_id: 'vt4200l',name: 'VT4200-L',type: "product",vendor: "ViewSonic Corporation",category: "Electronic",features: ["HDMI", "RGB", 'Wi-Fi']})
db.adb.insert({_id: 'pro9000',name: 'Pro9000',type: "product",vendor: "ViewSonic Corporation",category: "Electronic",features: ["HDMI", "RGB", 'Wi-Fi']})

// ----- 4
db.adb.ensureIndex({"name":1})
db.adb.getIndexes()
// ----- 5
db.adb.find({type:'product',vendor:'Microsoft Corporation'}).limit(1)
// ----- 6
db.adb.find({type:'product',vendor:{$in:['ViewSonic Corporation','Go! Calendars']}})
// ----- 7
db.adb.find({type:'vendor',phone:{$elemMatch:{number:'(888) 888-4532'}}})
// ----- 8
db.adb.update({_id:'xbox360'},{$set:{rating:5}})
db.adb.update({_id:'zune'},{$set:{rating:3}})
db.adb.update({_id:'xboxone'},{$set:{rating:1}})
db.adb.update({_id:'arholma'},{$set:{rating:7}})
db.adb.update({_id:'falster'},{$set:{rating:8}})
db.adb.update({_id:'vt4200l'},{$set:{rating:9}})
db.adb.update({_id:'badcat2014wallcalendar'},{$set:{rating:6}})
db.adb.update({_id:'borisvallejo'},{$set:{rating:4}})
// ----- 9
db.adb.update({_id:'zune'},{$push:{features:'EMP Resistant'}})
// ----- 10
db.adb.ensureIndex({ll:'2d'}, {type:1})
// ----- 11
db.adb.find({ll:{$near:[-81.30151,28.59716]}}).limit(1)
// ----- 12
db.adb.find().sort({name:1})
// ----- 13
db.adb.findOne({$query:{type:'product',rating:{$exists:true}}, $orderby:{rating:-1}})
// ----- 14
db.adb.find({$query:{type:'product',rating:{$exists:true}}, $orderby:{rating:-1}}).skip(3).limit(1)
// ----- 15
db.adb.group({
	cond: {rating:{$exists:true},type:'product'}, 
	key: {vendor: true}, 
	initial: {ratingAvg: 0, totalRating:0, count:0},
	reduce: function(obj,prev){ 
		prev.totalRating += obj.rating
		prev.count ++
	}, 
	finalize: function(out){
		out.ratingAvg = out.totalRating / out.count;
	}
})

// ----- 16
db.adb.findOne({type:'vendor', name:'Microsoft Corporation'})
// ----- 17
db.adb.remove({_id:'arholma'})
// ----- 18
db.adb.find({type:'product'}).count()
// ----- 19
db.adb.remove({vendor:'Go! Calendars'})
// ----- 20
./mongoexport -db adb1403f --collection adb --csv --out ~/Desktop/ADB/lab/final/adb1403f_3_26_2014.csv --fields _id,address,city,name,state,type,category,vendor