/* 
 * frequency controller
 */

 (function(frequencyController){

 	var repository=require('../../repository/frequencyRepository');

 	frequencyController.get=function(req,resp) {
 		var set = req.params.set;
 		var day = req.params.day;
 		var page = parseInt(req.params.page);
 		console.log('set : '+set + ' day : '+day+' page :'+page);
 		repository.get(set,day,page,function(err, dataSet) {
 			console.log(dataSet.length);
 			var payload = {
 				status : true,
 				data : dataSet,
 				page : dataSet.length>0?page+1:-1
 			};
 			resp.json(payload);
 		})
 	};

 	frequencyController.exclude=function(req,resp) {
 		var set = req.params.set;
 		var day = req.params.day;
		var exlcudeListStr = req.params.exludeList.split(',');
		var exlcudeList = [];
		for (var i=0; i<exlcudeListStr.length; i++)
			exlcudeList.push(parseInt(exlcudeListStr[i]));
 		repository.getExclude(set,day, exlcudeList,function(err, dataSet) {
 			var payload = {
 				status : true,
 				data : dataSet
 			};
 			resp.json(payload);
 		})
 	};


 	frequencyController.getRange=function(req,resp) {
 		var set = req.params.set;
 		var day = req.params.day;
		var from = parseInt(req.params.from);
		var to = parseInt(req.params.to);
		var page = parseInt(req.params.page);
 		console.log('set : '+set + ' day : '+day+' from : '+from+' to :'+to+' page :'+page);
		repository.getRange(set,day,from,to,page,function(err,dataSet) {
			var payload = {
				status : err===null,
				data:null,
				page:null
			};
			if (err===null) {
					payload.data=dataSet,
					payload.page=dataSet.length>0?page+1:-1
			}
			else 
				payload.errMsg = err.toString();

			resp.json(payload);
		});	
 	};

 })(module.exports);