db.itunes.group({
    cond: {heightInches: { $exists: true }},
    key: {type: true},
    initial: {totalHeight: 0, maxHeights: 0, minHeights: 100, count: 0},
    reduce: function(obj, prev){
        if(obj.heightInches > prev.maxHeights){
            prev.maxHeights = obj.heightInches
        }else if(obj.heightInches < prev.minHeights){
            prev.minHeights = obj.heightInches
        }
        prev.totalHeight += obj.heightInches;
        prev.count++;
    },
    finalize: function(out){
        out.avgHeight = out.totalHeight / out.count;
    }
})

db.itunes.group({
    key: {type: true},
    initial: {amount: 0},
    reduce: function(obj, prev){
        type = obj.type
        if(type = 'album'){
            prev.amount += 1 
        }else if(type = 'artist'){
            prev.amount += 1
        }else if(type = 'library'){
            prev.amount += 1
        }else if(type = 'track'){
            prev.amount += 1
        }
    }
})

db.itunes.group({
    key: {type: true},
    initial: {amount: 0},
    reduce: function(obj, prev){
            prev.amount += 1
    }
})