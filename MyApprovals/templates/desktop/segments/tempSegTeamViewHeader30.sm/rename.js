var fs = require('fs');

for(var i=2; i<=30; i++){
	// var imgFilename = "imgDay"+i;
	var lblDateFileName = "lblDate";
	var lblDayFileName = "lblDay";
	var flxFilename = "flxDay";
		var currDay = lblDayFileName+i;
	var currFlx = flxFilename+i;
	var currDate = lblDateFileName+i;
var jsonStringFlx = fs.readFileSync(currFlx+".json", 'utf-8');
var jsonStringDate = fs.readFileSync(currDate+".json", 'utf-8');
var jsonStringDay = fs.readFileSync(currDay+".json", 'utf-8');


	var dataFlx = JSON.parse(jsonStringFlx);
	var dataDate = JSON.parse(jsonStringDate);
	var dataDay = JSON.parse(jsonStringDay);
	dataFlx.id = currFlx;
	dataDate.id = currDate;
	dataDay.id = currDay;
	dataFlx.parent = "flxWeekData";
	dataDate.parent = currFlx;
	dataDay.parent = currFlx;
	dataFlx.children = [currDay,currDate];
	var writeString = JSON.stringify(dataFlx,null,'\t');
	fs.writeFileSync(currFlx+".json",writeString,'utf-8' );
	writeString = JSON.stringify(dataDate,null,'\t');
	fs.writeFileSync(currDate+".json",writeString,'utf-8' );
	writeString = JSON.stringify(dataDay,null,'\t');
	fs.writeFileSync(currDay+".json",writeString,'utf-8' );
}

// var jsonStringParent =  fs.readFileSync("flxWeekData.json", 'utf-8');
// var parentData = JSON.parse(jsonStringParent);
// parentData.children = ["flxDay1", 
// "flxDay2", 
// "flxDay3", 
// "flxDay4", 
// "flxDay5", 
// "flxDay6", 
// "flxDay7", 
// "flxDay8", 
// "flxDay9", 
// "flxDay10", 
// "flxDay11", 
// "flxDay12", 
// "flxDay13", 
// "flxDay14", 
// "flxDay15", 
// "flxDay16", 
// "flxDay17", 
// "flxDay18", 
// "flxDay19", 
// "flxDay20", 
// "flxDay21", 
// "flxDay22", 
// "flxDay23", 
// "flxDay24", 
// "flxDay25", 
// "flxDay26", 
// "flxDay27", 
// "flxDay28", 
// "flxDay29", 
// "flxDay30"];
// fs.writeFileSync("flxWeekData.json",parentData,'utf-8' );