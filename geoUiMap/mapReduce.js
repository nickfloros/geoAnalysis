var mapCategoryId = function() {
for (var idx = 0; idx < this.waypoints.pois.length; idx++) {
var key = this.waypoints.pois[idx].aa_category_id;
var value = {
count: 1,
};
emit(key, value);
}
};


var categoryReduce=function(aaCategoryKey,countObjKey) {
	var reduceVal = {count:0};

  for(var idx=0; idx<countObjKey.length; idx++) 
  	reduceVal.count++;
  return reduceVal;
}

db.trips.mapReduce(mapCategoryId,categoryReduce, {out : {merge:"result"},qeury:{weekday:'Monday'}} );