// ----- 0
db.createCollection('vehicle')
// -----  1
db.vehicle.insert({_id: 'Mustang',name: 'Mustang',manufacturer: 'Ford',type: "auto",features: ['A/C','Power Windows','Pandora Radio']})
db.vehicle.insert({_id: 'Taurus',name: 'Taurus',manufacturer: 'Ford',type: "auto",features: ['A/C','Power Windows','Cassette/Radio/AM/FM']})
db.vehicle.insert({_id: 'F150',name: 'F150',manufacturer: 'Ford',type: "auto",features: ['A/C','Power Windows','CD/Radio/AM/FM']})
db.vehicle.insert({_id: 'Sunfire',name: 'Sunfire',manufacturer: 'Pontiac',type: "manual",features: ['A/C','5-gear Transmission','CD/Radio/AM/FM']})
db.vehicle.insert({_id: 'Solestice',name: 'Solestice',manufacturer: 'Pontiac',type: "auto",features: ['A/C','Power Windows','Pandora Radio']})
db.vehicle.insert({_id: 'PT Cruiser',name: 'PT Cruiser',manufacturer: 'Chrysler',type: "auto",features: ['A/C','Power Windows','CD/Radio/AM/FM']})

// ----- 2
db.vehicle.insert({
	_id: "Concours 14",
	name: "Concours 14",
	manufacturer: "Kawasaki",
	type: “motorcycle”
})
ninja = {_id: "Ninja ZX-14R",name: "Ninja ZX-14R",manufacturer: "Kawasaki",type: "motorcycle"}
nomad = {_id: "Vulcan 1700 Nomad",name: "Vulcan 1700 Nomad",	manufacturer: "Kawasaki",type: "motorcycle"}
concours = {_id: "Concours 14",name: "Concours 14",manufacturer: "Kawasaki",type: "motorcycle"}
hp4 = {_id: "HP 4",name: "HJP 4",manufacturer: "BMW",type: "motorcycle"}
k1300s = {_id: "K 1300 S",name: "K 1300 S",manufacturer: "BMW",type: "motorcycle"}
cbr650f = {_id: "CBR650F",name: "CBR650F",manufacturer: "Honda",type: "motorcycle"}
db.vehicle.insert(ninja)
db.vehicle.insert(nomad)
db.vehicle.insert(concours)
db.vehicle.insert(hp4)
db.vehicle.insert(k1300s)
db.vehicle.insert(cbr650f)

// ----- 3
db.vehicle.ensureIndex({"name":1})
db.vehicle.getIndexes()
// ----- 4
db.vehicle.find({name:'Solestice',type:'auto'}).limit(1)
// ----- 5
db.vehicle.find({type:'motorcycle',manufacturer:{$in: ["BMW","Honda"]}})
// ----- 
// ----- 
// ----- 
// ----- 
// ----- 
// ----- 
// ----- 
// ----- 
// ----- 