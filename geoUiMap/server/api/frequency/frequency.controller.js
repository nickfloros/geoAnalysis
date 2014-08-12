/* 
 * frequency controller
 */


 (function(frequencyController) {
 	var _=require('lodash');
 	var frequecyRepository=require('../../repository/frequencyRepository');
 	var categoryRepository=require('../../repository/categoryRepository');
 	var poiRepository=require('../../repository/poiRepository');


 	//
 	// process response
 	//
 	var _processResponce=function(set,page, dataSet, resp) {
		var payload = {
 				status : true,
 				data : dataSet,
 				page : frequecyRepository.page(page,dataSet.length)
 		};

		var ids=[];
		_.forEach(payload.data,function(item) {ids.push(parseInt(item._id));});
		if (set==='catid') { // add category names ... 
			categoryRepository.getList(ids,function(err,dataSet) {
				_.forEach(dataSet,
					function(item) { 
						var idx=_.findIndex(payload.data,{_id:item.aa_category_id});
						if(idx>=0) payload.data[idx].name = item.layer_name;
				});
 			resp.json(payload);
			});
		}
		if (set==='poiid') { // addd poiid names ... 
			poiRepository.getList(ids,function(err,dataSet) {
				_.forEach(dataSet,
					function(item) { 
						var idx=_.findIndex(payload.data,{_id:item.aa_id});
						if(idx>=0) payload.data[idx].name = item.name;
				});
 			resp.json(payload);
			})
		}
 	}

 	frequencyController.get=function(req,resp) {
 		var set = req.params.set;
 		var day = req.params.day;
 		var page = parseInt(req.params.page);
 		console.log('set : '+set + ' day : '+day+' page :'+page);
 		frequecyRepository.get(set,day,page,function(err, dataSet) {
			_processResponce(set,page, dataSet, resp); 			
 		});
 	};

 	frequencyController.exclude=function(req,resp) {
 		var set = req.params.set;
 		var day = req.params.day;
		var exlcudeListStr = req.params.exludeList.split(',');
		var exlcudeList = [];
		for (var i=0; i<exlcudeListStr.length; i++)
			exlcudeList.push(parseInt(exlcudeListStr[i]));
 		frequecyRepository.getExclude(set,day, exlcudeList,function(err, dataSet) {
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
		frequecyRepository.getRange(set,day,from,to,page,function(err,dataSet) {
			_processResponce(set,page, dataSet, resp); 			
		});	
 	};

 })(module.exports);