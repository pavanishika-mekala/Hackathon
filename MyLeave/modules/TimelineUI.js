/**
 *  @author     Nandhini.Subramaniam
 *  @category   Business Logic.
 *  @desc
 *  @ © 2016    Kony Inc.
 */
kony = kony || {};
kony.apps = kony.apps || {};
kony.apps.coe = kony.apps.coe || {};
kony.apps.coe.Reusable = kony.apps.coe.Reusable || {};

kony.apps.coe.Reusable.createTimeline = {
  
};

kony.apps.coe.Reusable.createTimeline ={

   leftOffSetX : 0,
   rightOffSetX : 0,
   parent : "",
   XCoordinatesOfTimeLine : [],
   startTime : 0 ,
   endTime : 0,
  
    setStartandEndTime : function(){
      this.startTime = 8;
      this.endTime = 6;
    },
  
    TimelineUI : function(parent) {
	    this.parent = parent;   
		var leftValue = 0,time=this.startTime;
		var timeLineScrollFlex = new kony.ui.FlexScrollContainer({
				"id" : "timeLineScrollFlex",
				"top" :  "0%",
				"left" : "0%",
				"width" : "preferred",
				"height" :  "100%",
				"zIndex" : 1,
				"isVisible" : true,
				"clipbounds" : true,
				"enableScrolling" : true,
				"scrollDirection" : kony.flex.SCROLL_HORIZONTAL,
				"horizontalScrollIndicator" : false,
				"bounces" : false,
				"allowHorizontalBounce" : false,
				"allowVerticalBounce" : false,
				"pagingEnabled" : false,
				"layoutType" : kony.flex.FREE_FORM
			}, {
				"padding" : [0, 0, 0, 0],
				"marginInPixel" : false,
				"paddingInPixel" : false
			}, {});
		parent.add(timeLineScrollFlex);
        
		for (var timeLineCount = 0; timeLineCount < 11; timeLineCount++) {
			leftValue = kony.apps.generalizeWidthInDp(timeLineCount * 80);
			var timeWithAMPM;
			if (timeLineCount === 0 && this.startTime === 12) {
				timeWithAMPM = "12 AM";
				time = 0;
			} else {
				timeWithAMPM = kony.apps.coe.Reusable.createTimeline.getTimeFormatWithAMPM(time);
			}
			var flexTimeLine = new kony.ui.FlexContainer({
					"id" : "flexTimeLine" + timeLineCount,
					"top" : "0dp",
					"left" : leftValue + "dp",
					"width" : kony.apps.generalizeWidthInDp(80) + "dp",
					"height" : "50dp",
					"zIndex" : 5,
					"isVisible" : true,
					"clipbounds" : true,
					"layoutType" : kony.flex.FREE_FORM
				}, {
					"padding" : [0, 0, 0, 0],
					"marginInPixel" : false,
					"paddingInPixel" : false
				}, {});
			var lblTime = new kony.ui.Label({
					id : "lblTime" + timeLineCount,
					skin : "sknLblMobFC333333Op100FS18px",
					"top" : "0%",
					"left" : "0%",
					"width" : "100%",
					"height" : "preferred",
					"text" : timeWithAMPM,
					"zIndex" : 7,
					"isVisible" : true
				}, {
					"padding" : [0, 0, 0, 0],
					"marginInPixel" : false,
					"paddingInPixel" : false,
					"contentAlignment" : constants.CONTENT_ALIGN_CENTER
				}, {});
			var lblBarLine = new kony.ui.Label({
					id : "lblBarLine" + timeLineCount,
					skin : "sknFlxMobBG979797Op100",
					"top" : "25%",
					"width" : "1px",
					"height" : "8dp",
					"centerX" : "50%",
					"zIndex" : 7,
					"isVisible" : true
				}, {
					"padding" : [0, 0, 0, 0],
					"marginInPixel" : false,
					"paddingInPixel" : false,
					"contentAlignment" : constants.CONTENT_ALIGN_CENTER
				}, {});
			parent.timeLineScrollFlex.add(flexTimeLine);
			flexTimeLine.add(lblTime);
			flexTimeLine.add(lblBarLine);
			time++;
			if (time > 24) {
				time = 1;
			}
		}
        var flexSlider= new kony.ui.FlexContainer({
                                "id": "flexSlider",
                                "top": "50%",
                                "left": "10dp",
                                "width": kony.apps.generalizeWidthInDp(165)+"dp",
                                "height": "48%",
                                "zIndex": 8,
                                "isVisible": true,
                                "clipbounds":true,
                                "layoutType": kony.flex.FREE_FORM
                                }, {
                                "padding": [0, 0, 0, 0],
                                "marginInPixel": false,
                                "paddingInPixel": false
                                },{}
                                );
    var flexSliderLeftPin= new kony.ui.FlexContainer({
                                "id": "flexSliderLeftPin",
                                "top": "0dp",
                                "left": "0dp",
                                "width": "26dp",
                                "height": "100%",
                                "zIndex": 6,
                                "isVisible": true,
                                "clipbounds":true,
                                "layoutType": kony.flex.FREE_FORM,
                                "onTouchStart":onTouchStartOfLeftPin,
                                "onTouchMove":onTouchMoveOfLeftPin
                                
                                }, {
                                "padding": [0, 0, 0, 0],
                                "marginInPixel": false,
                                "paddingInPixel": false
                                },{}
                                );
  var flexSliderRightPin= new kony.ui.FlexContainer({
                                "id": "flexSliderRightPin",
                                "top": "0dp",
                                "right": "0dp",
                                "width": "26dp",
                                "height": "100%",
                                "zIndex": 6,
                                "isVisible": true,
                                "clipbounds":true,
                                "layoutType": kony.flex.FREE_FORM,
                                "onTouchStart":onTouchStartOfRightPin,
                                "onTouchMove":onTouchMoveOfRightPin
                                }, {
                                "padding": [0, 0, 0, 0],
                                "marginInPixel": false,
                                "paddingInPixel": false
                                },{}
                                );
  
   var flexSliderTask= new kony.ui.FlexContainer({
                                "id": "flexSliderTask",
                                "top": "32%",
                                "left": "25dp",
                                "width": kony.apps.generalizeWidthInDp(165)-50+"dp",
                                "height": "52%",
                                "zIndex": 6,
                                "isVisible": true,
                                "clipbounds":true,

                                "layoutType": kony.flex.FREE_FORM
                                }, {
                                "padding": [0, 0, 0, 0],
                                "marginInPixel": false,
                                "paddingInPixel": false
                                },{}
                                );
   var lblLeftPinRound=new kony.ui.Label({
                                id:"lblLeftPinRound",
                                skin: "sknLblRound",
                                "top":"0dp",
                                "left": "0dp",
                                "width": "12dp",
                                "height": "12dp",
                                "zIndex": 7, 
                                "isVisible":true                
                                 },
                                 {
                                 "padding": [0, 0, 0, 0],
                                 "marginInPixel": false,
                                 "paddingInPixel": false ,
                                 "contentAlignment":constants.CONTENT_ALIGN_CENTER 
                                 }, {}                              
                                 );
  var lblRightPinRound=new kony.ui.Label({
                                "id":"lblRightPinRound",
                                "skin": "sknLblRound",
                                "top":"0dp",
                                "right": "0dp",
                                "width": "12dp",
                                "height": "12dp",
                                "zIndex": 7, 
                                "isVisible":true                
                                 },
                                 {
                                 "padding": [0, 0, 0, 0],
                                 "marginInPixel": false,
                                 "paddingInPixel": false ,
                                 "contentAlignment":constants.CONTENT_ALIGN_CENTER 
                                 }, {}                              
                                 );
  var lblLeftPinLine=new kony.ui.Label({
                                id:"lblLeftPinLine",
                                skin: "sknLblPin",
                                "top":"20%",
                                "left": "5dp",
                                "width": "3dp",
                                "height": "35dp",
                                "zIndex": 7, 
                                "isVisible":true                
                                 },
                                 {
                                 "padding": [0, 0, 0, 0],
                                 "marginInPixel": false,
                                 "paddingInPixel": false ,
                                 "contentAlignment":constants.CONTENT_ALIGN_CENTER 
                                 }, {}                              
                                 );
  var lblRightPinLine=new kony.ui.Label({
                                id:"lblRightPinLine",
                                skin: "sknLblPin",
                                "top":"20%",
                                "right": "5dp",
                                "width": "3dp",
                                "height": "35dp",
                                "zIndex": 7, 
                                "isVisible":true                
                                 },
                                 {
                                 "padding": [0, 0, 0, 0],
                                 "marginInPixel": false,
                                 "paddingInPixel": false ,
                                 "contentAlignment":constants.CONTENT_ALIGN_CENTER 
                                 }, {}                              
                                 );
  var lblLeftPinTouchableArea=new kony.ui.Label({
                                id:"lblLeftPinTouchableArea",
                                skin: "sknLblPin",
                                "top":"32%",
                                "left": "6dp",
                                "width": "80%",
                                "height": "51.8%",
                                "zIndex": 7, 
                                "isVisible":true                
                                 },
                                 {
                                 "padding": [0, 0, 0, 0],
                                 "marginInPixel": false,
                                 "paddingInPixel": false ,
                                 "contentAlignment":constants.CONTENT_ALIGN_CENTER 
                                 }, {}                              
                                 );
  var lblRightPinTouchableArea=new kony.ui.Label({
                                id:"lblRightPinTouchableArea",
                                skin: "sknLblPin",
                                "top":"32%",
                                "right": "6dp",
                                "width": "80%",
                                "height": "51.8%",
                                "zIndex": 7, 
                                "isVisible":true                
                                 },
                                 {
                                 "padding": [0, 0, 0, 0],
                                 "marginInPixel": false,
                                 "paddingInPixel": false ,
                                 "contentAlignment":constants.CONTENT_ALIGN_CENTER 
                                 }, {}                              
                                 );
  var lblTaskName=new kony.ui.Label({
                                id:"lblTaskName",
                                skin: "sknLblPin",
                                "top":"0%",
                                "left": "0%",
                                "width": "100%",
                                "height": "100%",
                                "text":"2.00",
                                "zIndex": 7, 
                                "isVisible":true                
                                 },
                                 {
                                 "padding": [0, 0, 0, 0],
                                 "marginInPixel": false,
                                 "paddingInPixel": false ,
                                 "contentAlignment":constants.CONTENT_ALIGN_CENTER 
                                 }, {}                              
                                 );
  parent.timeLineScrollFlex.add(flexSlider);
  flexSlider.add(flexSliderLeftPin);
  flexSlider.add(flexSliderTask);
  flexSlider.add(flexSliderRightPin);
  flexSliderLeftPin.add(lblLeftPinRound);
  flexSliderLeftPin.add(lblLeftPinLine);
  flexSliderLeftPin.add(lblLeftPinTouchableArea);
  flexSliderTask.add(lblTaskName);
  flexSliderRightPin.add(lblRightPinRound);
  flexSliderRightPin.add(lblRightPinLine);
  flexSliderRightPin.add(lblRightPinTouchableArea);
  parent.timeLineScrollFlex.showFadingEdges=false;
  kony.apps.coe.Reusable.createTimeline.storeCoordinatesOfTimeLine();
    }  
};

kony.apps.coe.Reusable.createTimeline.getTimeFormatWithAMPM = function (startTime) {
		var ampmtime = "";
		if (startTime === 0 || startTime === 24) {
			ampmtime = "12 AM";
		} else if (startTime < 12) {
			ampmtime = startTime + " AM";
		} else if (startTime > 12) {
			ampmtime = startTime % 12 + " PM";

		} else {
			ampmtime = "12 PM";
		}
		return ampmtime;
};

getOnTouchCoordinatesOfLeftSlider = function (eventobject, x, y) {
	var frmName = kony.apps.coe.Reusable.createTimeline.parent;
	frmName.timeLineScrollFlex.enableScrolling = false;
	kony.apps.coe.Reusable.createTimeline.leftOffSetX = x;
};
getOnTouchCoordinatesOfRightSlider = function (eventobject, x, y) {
	var frmName = kony.apps.coe.Reusable.createTimeline.parent;
	frmName.timeLineScrollFlex.enableScrolling = false;
	kony.apps.coe.Reusable.createTimeline.rightOffSetX = x;
};
movingSliderLeftPin = function (eventobject, x, y) {
	var frmName = kony.apps.coe.Reusable.createTimeline.parent;
	frmName.timeLineScrollFlex.enableScrolling = false;
    var coordinates = []; 
    coordinates = kony.apps.coe.Reusable.createTimeline.XCoordinatesOfTimeLine;
	var newOffsetX = parseInt(x) - parseInt(kony.apps.coe.Reusable.createTimeline.leftOffSetX);
	var left = (parseInt(frmName.flexSlider.left) + newOffsetX) + "dp";
	var width = (parseInt(frmName.flexSlider.width)) - newOffsetX + "dp";
	var widthOfInnerFlex = parseInt(width) - 50;
	if ((parseInt(left) > 35) && (parseInt(width) > 80)) {

		frmName.flexSliderTask.width = widthOfInnerFlex + "dp";
		//#ifdef iphone
		frmName.flexSlider.width = width;
		frmName.flexSlider.left = left;
		frmName.timeLineScrollFlex.enableScrolling = true;
        frmName.flexSliderLeftPin.onTouchEnd = function (){
                var startIndex = kony.apps.coe.Reusable.createTimeline.search(parseInt(left),coordinates);
                var endIndex = kony.apps.coe.Reusable.createTimeline.search(parseInt(left)+parseInt(width),coordinates);
                width = coordinates[endIndex][0]- coordinates[startIndex][0];
                widthOfInnerFlex = width - 50;
			    frmName.flexSliderTask.width = widthOfInnerFlex + "dp";
                kony.apps.coe.Reusable.createTimeline.animateSlider(coordinates[startIndex][0], width);
                if(endIndex-startIndex > 0){
                frmName.lblTaskName.text = endIndex-startIndex +":00";
                var hours = endIndex-startIndex;   
                kony.apps.coe.ess.myLeave.applyLeave.fullDayHoursSelection.updateDuration(hours,coordinates[startIndex][1],coordinates[endIndex][1]);
                }
            } ;
		//#endif
		//#ifdef android
		kony.apps.coe.Reusable.createTimeline.animateSlider(parseInt(left), parseInt(width));
		frmName.flexSliderLeftPin.onTouchEnd = function () {
			frmName.timeLineScrollFlex.enableScrolling = true;
            var startIndex = kony.apps.coe.Reusable.createTimeline.search(parseInt(left),coordinates);
            var endIndex = kony.apps.coe.Reusable.createTimeline.search(parseInt(left)+parseInt(width),coordinates);
            width = coordinates[endIndex][0]- coordinates[startIndex][0];
            widthOfInnerFlex = width - 50;
			frmName.flexSliderTask.width = widthOfInnerFlex + "dp";
            kony.apps.coe.Reusable.createTimeline.animateSlider(coordinates[startIndex][0], width);
            if((endIndex-startIndex) > 0){
            frmName.lblTaskName.text = endIndex-startIndex +":00";
            var hours = endIndex-startIndex;   
            kony.apps.coe.ess.myLeave.applyLeave.fullDayHoursSelection.updateDuration(hours,coordinates[startIndex][1],coordinates[endIndex][1]);
            }
                
		};
		//#endif

	}else{
      frmName.timeLineScrollFlex.enableScrolling = true;
    }
};
movingSliderRightPin = function (eventobject, x, y) {
	var frmName = kony.apps.coe.Reusable.createTimeline.parent;
	frmName.timeLineScrollFlex.enableScrolling = false;
    var coordinates = [];
    coordinates = kony.apps.coe.Reusable.createTimeline.XCoordinatesOfTimeLine;
	var newOffsetX = parseInt(x) - parseInt(kony.apps.coe.Reusable.createTimeline.rightOffSetX);
	var totalwidth = ((parseInt(frmName.flexSlider.width)) + newOffsetX) + parseInt(frmName.flexSlider.left);
	var length = coordinates.length;
    var left = (parseInt(frmName.flexSlider.left));
	var width =  (parseInt(frmName.flexSlider.width)) + newOffsetX + "dp";
	if (parseInt(width) > 80) {
		if ((totalwidth <= (kony.apps.coe.Reusable.createTimeline.XCoordinatesOfTimeLine[length - 1][0]))) {
			var widthOfInnerFlex = parseInt(width) - 50;
			frmName.flexSliderTask.width = widthOfInnerFlex + "dp";
			//#ifdef iphone
			frmName.flexSlider.width = width;
			frmName.timeLineScrollFlex.enableScrolling = true;
            frmName.flexSliderRightPin.onTouchEnd = function (){
                var startIndex = kony.apps.coe.Reusable.createTimeline.search(parseInt(left),coordinates);
                var endIndex = kony.apps.coe.Reusable.createTimeline.search(parseInt(left)+parseInt(width),coordinates);
                width = coordinates[endIndex][0]- coordinates[startIndex][0];
                widthOfInnerFlex = width - 50 ;
			    frmName.flexSliderTask.width = widthOfInnerFlex + "dp";
                kony.apps.coe.Reusable.createTimeline.animateSlider(coordinates[startIndex][0],width);
                if(endIndex-startIndex > 0){
                frmName.lblTaskName.text = endIndex-startIndex +":00";
                var hours = endIndex-startIndex;   
                kony.apps.coe.ess.myLeave.applyLeave.fullDayHoursSelection.updateDuration(hours,coordinates[startIndex][1],coordinates[endIndex][1]);
                }
            } ;
			//#endif
			//#ifdef android
			kony.apps.coe.Reusable.createTimeline.animateSlider(parseInt(frmName.flexSlider.left), parseInt(width));
			frmName.flexSliderRightPin.onTouchEnd = function () {
				frmName.timeLineScrollFlex.enableScrolling = true;
                var startIndex = kony.apps.coe.Reusable.createTimeline.search(parseInt(left),coordinates);
                var endIndex = kony.apps.coe.Reusable.createTimeline.search(parseInt(left)+parseInt(width),coordinates);
                width = coordinates[endIndex][0]- coordinates[startIndex][0];
                widthOfInnerFlex = width - 50 ;
			    frmName.flexSliderTask.width = widthOfInnerFlex + "dp";
                kony.apps.coe.Reusable.createTimeline.animateSlider(coordinates[startIndex][0], width);
                if(endIndex-startIndex > 0){
                frmName.lblTaskName.text = endIndex-startIndex +":00";
                var hours = endIndex-startIndex;   
                kony.apps.coe.ess.myLeave.applyLeave.fullDayHoursSelection.updateDuration(hours,coordinates[startIndex][1],coordinates[endIndex][1]);
                }
                
			};
			//#endif
		}else{
           frmName.timeLineScrollFlex.enableScrolling = true;
        }
	}

};
function onTouchStartOfLeftPin(eventobject, x, y) {
	getOnTouchCoordinatesOfLeftSlider.call(this, eventobject, x, y);
}
function onTouchMoveOfLeftPin(eventobject, x, y) {
	movingSliderLeftPin.call(this, eventobject, x, y);
}
function onTouchStartOfRightPin(eventobject, x, y) {
	getOnTouchCoordinatesOfRightSlider.call(this, eventobject, x, y);
}
function onTouchMoveOfRightPin(eventobject, x, y) {
	movingSliderRightPin.call(this, eventobject, x, y);
}
kony.apps.coe.Reusable.createTimeline.animateSlider = function (left, width) {
	var frmName = kony.apps.coe.Reusable.createTimeline.parent;
	frmName.flexSlider.animate(
		kony.ui.createAnimation({

			"100" : {
				"left" : left + "dp",
				"width" : width + "dp",
				"stepConfig" : {
					"timingFunction" : kony.anim.EASE
				}
			}
		}), {
		"delay" : 0,
		"iterationCount" : 1,
		"fillMode" : kony.anim.FILL_MODE_FORWARDS,
		"duration" : 0
	}, {
		"animationEnd" : function () {}
	});
};
kony.apps.coe.Reusable.createTimeline.storeCoordinatesOfTimeLine=function()
{
     var frmName=kony.apps.coe.Reusable.createTimeline.parent;
     var left,ampmTime,min,hoursMinutes,time;
     var coordinates=[];
     time = kony.apps.coe.Reusable.createTimeline.startTime;
     frmName.flexSlider.width=kony.apps.generalizeWidthInDp(155)+"dp";
     for(var loop = 0; loop < 11; loop++)
       {
          var gestureHandle=frmName.timeLineScrollFlex["flexTimeLine"+loop].setGestureRecognizer(constants.GESTURE_TYPE_TAP, {fingers:1},kony.apps.coe.Reusable.createTimeline.tapTimeToGetSlider.bind(this));
          if(loop===0 && kony.apps.coe.Reusable.createTimeline.startTime === 12 ){
             ampmTime="12 AM";
             time=0;
           }
          else{
             ampmTime=kony.apps.coe.Reusable.createTimeline.getTimeFormatWithAMPM(time);
           }
         left=parseInt(kony.apps.generalizeWidthInDp(40)+parseInt(frmName.timeLineScrollFlex["flexTimeLine"+loop].left));
         coordinates.push([left,ampmTime,0,"flexTimeLine"+loop]);
         time++;
         if(time>24)
           {
             time=1;
           }
         }
       kony.apps.coe.Reusable.createTimeline.XCoordinatesOfTimeLine=coordinates;
       frmName.flexSlider.left = coordinates[0][0]+"dp";
};
kony.apps.coe.Reusable.createTimeline.tapTimeToGetSlider = function (commonWidget, gestureInfo, context) {
	var frmName = kony.apps.coe.Reusable.createTimeline.parent;
	var leftPosition = 0,
	checkEndIndexFilled,
	length,
	endPosition = 0,
	checkStartIndexFilled = 0,
	XCoordinatesOfTimeLine = [];
	frmName.flexSlider.isVisible = true;
	leftPosition = (commonWidget.frame.x + 45);
	XCoordinatesOfTimeLine = kony.apps.coe.Reusable.createTimeline.XCoordinatesOfTimeLine;
	length = XCoordinatesOfTimeLine.length;
	checkStartIndexFilled = kony.apps.coe.Reusable.createTimeline.search((parseInt(commonWidget.frame.x) + 45), XCoordinatesOfTimeLine);
			if (checkStartIndexFilled ==length - 1 ) {
				leftPosition = XCoordinatesOfTimeLine[length-3][0];
                checkStartIndexFilled = kony.apps.coe.Reusable.createTimeline.search(leftPosition , XCoordinatesOfTimeLine);
			}else if(checkStartIndexFilled == length - 2 ){
                leftPosition = XCoordinatesOfTimeLine[length-3][0];
                checkStartIndexFilled = kony.apps.coe.Reusable.createTimeline.search(leftPosition, XCoordinatesOfTimeLine);
            }
			checkEndIndexFilled = checkStartIndexFilled+2;
            endPosition = XCoordinatesOfTimeLine[checkEndIndexFilled][0]-leftPosition;
			frmName.flexSliderTask.width = (endPosition - 50) + "dp";
			kony.apps.coe.Reusable.createTimeline.animateSlider(leftPosition, endPosition);
            frmName.flexSlider.lblTaskName.text = "2:00";
            kony.apps.coe.ess.myLeave.applyLeave.fullDayHoursSelection.updateDuration(2,XCoordinatesOfTimeLine[checkStartIndexFilled][1],XCoordinatesOfTimeLine[checkEndIndexFilled][1]);
		
};

kony.apps.coe.Reusable.createTimeline.search = function (searchElement, searchArray) {
	var minIndex = 0;
	var maxIndex = searchArray.length - 1;
	var mid;
	while (maxIndex - minIndex > 1) {
		mid = Math.round((minIndex + maxIndex) / 2);
		if (searchArray[mid][0] <= searchElement) {
			minIndex = mid;
		} else {
			maxIndex = mid;
		}
	}
	if (searchElement - searchArray[minIndex][0] <= searchArray[maxIndex][0] - searchElement) {
		return minIndex;
	} else {
		return maxIndex;
	}

};

kony.apps.coe.Reusable.createTimeline.fillHours = function(start_time , end_time){
     var coordinates = kony.apps.coe.Reusable.createTimeline.XCoordinatesOfTimeLine;
     var frmName = kony.apps.coe.Reusable.createTimeline.parent;
     var startsAt=coordinates.map(function(el){return el[1];}).indexOf(start_time);
     var endsAt=coordinates.map(function(el){return el[1];}).indexOf(end_time);
     if( coordinates[startsAt] !== undefined &&  coordinates[startsAt] !== null){
     frmApplyLeave.flexSlider.left = coordinates[startsAt][0]+"dp";
     }if( coordinates[startsAt] !== undefined &&  coordinates[startsAt] !== null&& coordinates[endsAt] !== undefined && coordinates[endsAt] !== null){
     frmApplyLeave.flexSlider.width = (coordinates[endsAt][0] - coordinates[startsAt][0])+"dp";
     frmApplyLeave.flexSliderTask.width = (coordinates[endsAt][0] - coordinates[startsAt][0]-50)+"dp";
     }
     var hours = endsAt-startsAt; 
     frmName.flexSlider.lblTaskName .text = endsAt-startsAt +":00";
     kony.apps.coe.ess.myLeave.applyLeave.fullDayHoursSelection.updateDuration(hours,start_time,end_time);
};