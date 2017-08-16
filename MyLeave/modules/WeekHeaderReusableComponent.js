//Type your code here
kony = kony || {};
kony.apps = kony.apps || {};
kony.apps.coe = kony.apps.coe || {};
kony.apps.coe.Reusable = kony.apps.coe.Reusable || {};
kony.apps.coe.Reusable.HelperFunctions = kony.apps.coe.Reusable.HelperFunctions || {};

/*
this is the constructor of the weekHeaderNavigation

monthInfo - This is the json which defines the key value pair of the month and the year
It contains {
"MONTH"://the skin need to provided is of type flexContainer.
"YEAR"://this represnets the year
"noOfWeekstobedisplayed"://this represnets the no of weeks to be displayed in the header
"previous"://this represnets the no of previous weeks to be shown in the header
"weekNamelength":
}
DimensionInfo - This is the json which defines the key value pair of the month and the year
It contains {
"weekLabelContainerHeight":,
"weekLabelPadding":"",
"weekNamePadding":"",

}
skinInfo  - This is the json which defines the skins for the WeekHeader widget.
It contains {
"WidgetSkin":""//the skin need to provided is of type flexContainer.
"weeklabelContainerSkin":""
"weekLabelSkin":"",
"weekLabelFocusSkin":""
"weekNameContainerSkin":""
}

callBackFunctions -this is the json contains the callbback functions.
{
"OnWeekLabelClick":this is invoked on click of the week label
}

 */
kony.apps.coe.Reusable.WeekHeader = function (widgetInfo, DimensionInfo, skinInfo,callBackFunctions) {

	this.MONTH = widgetInfo.MONTH;
	this.YEAR = widgetInfo.YEAR;
	this.noOfWeekstobedisplayed = parseInt(widgetInfo.noOfWeekstobedisplayed);
	this.previous = parseInt(widgetInfo.previous);
	this.WeekDayStart = 0;
	this.weekLabelSkin = skinInfo.weekLabelSkin;
	this.weekLabelFocusSkin = skinInfo.weekLabelFocusSkin;
	this.weekNameCurrentSkin = skinInfo.weekNameCurrentSkin;
	this.weekDayCurrentSkin = skinInfo.weekDayCurrentSkin;
    this.weekDaySkin = skinInfo.weekDaySkin;
    this.weekNameSkin = skinInfo.weekNameSkin;
	this.data = [];

	for (var i = 0; i < this.noOfWeekstobedisplayed; i++) {
		this.data[i] = {
			"text" : "NA",
			"INDEX" : i,
			"startDate" : undefined,
			"endDate" : undefined
		};
	}

	//creation of the WeekHeader container flex
	var basicconfig_Main = {
		"id" : "WeekHeader_Reusable",
		"top" : "0%",
		"left" : "0%",
		"width" : "100%",
		"height" : "100%",
		"zIndex" : 1,
		"skin" : skinInfo.WidgetSkin,
		"isVisible" : true,
		"clipBounds" : true,
		"layoutType" : kony.flex.FREE_FORM
	};
	this.containerWidget = new kony.ui.FlexContainer(basicconfig_Main, {}, {});

	//creation of the week info flex
	var basicconfig_Main = {
		"id" : "Weeks_LABEL_container",
		"top" : "11.33%",
		"left" : "-8.5%",
		"width" : "120%",
		"height" : DimensionInfo.weekLabelContainerHeight,
		"zIndex" : 1,
		"skin" : skinInfo.weeklabelContainerSkin,
		"isVisible" : true,
		"clipBounds" : true,
		"layoutType" : kony.flex.FLOW_HORIZONTAL
	};
	this.weekLabelContainer = new kony.ui.FlexContainer(basicconfig_Main, {}, {});

	this.containerWidget.add(this.weekLabelContainer);

	//creation of the weeksLables dynamically

	for (var i = 0; i < this.noOfWeekstobedisplayed; i++) {

		var lblBasic = {
            "top":"0%",
			"zIndex" : 1,
			"isVisible" : true,
			"height" : "76%",
			"width" : "14%"
		};
		//lblBasic.width=((100/this.noOfWeekstobedisplayed)-DimensionInfo.weekLabelPadding).toString()+"%";
		lblBasic.left = DimensionInfo.weekLabelPadding;
		lblBasic.skin = skinInfo.weekLabelSkin;
		lblBasic.focusSkin = skinInfo.weekLabelFocusSkin;
		lblBasic.text = i;
		lblBasic.id = "WEEKLABEL" + i.toString();
		lblBasic.onClick = function () {
			var buttonID = arguments[0].id;
			var replaceText = "WEEKLABEL";
			var id = buttonID.replace(replaceText, "");
			var clickedIndex;
			for (clickedIndex = 0; clickedIndex < this.noOfWeekstobedisplayed; clickedIndex++) {

				if (this.data[clickedIndex].INDEX == id) {
					break;
				}
			}

			var shift = parseInt(clickedIndex - this.previous);
			if (shift == "NAN" || shift == undefined) {
				throw "undefined shift value " + shift;
			} else {
				this.shift(shift)
			}
				callBackFunctions.OnWeekLabelClick.call(this,this.data[this.previous]);
		}
		.bind(this);
		this[lblBasic.id] = new kony.ui.Button(lblBasic, {
		   "widgetAlignment":constants.WIDGET_ALIGN_CENTER,
           "vExpand":false,
           "hExpand":false,
           "padding":[1,1,1,1],
           "paddingInPixel":true,
           "margin":[0,0,0,0], 
           "marginInPixel":true,
           "displayText":true, 
           "contentAlignment":constants.CONTENT_ALIGN_CENTER
			}, {});

		this.weekLabelContainer.add(this[lblBasic.id]);
	}

	//creation of the week name info flex
	var basicconfig_Main = {
		"id" : "Weeks_NAMES_container",
		"left" : DimensionInfo.weekNameleft,
		"top" : DimensionInfo.weekNameTop,
		"width" : DimensionInfo.weekNameContainerWidth,
		"height" : DimensionInfo.weekNameContainerheight,
		"zIndex" : 1,
		"skin" : skinInfo.weeklabelContainerSkin,
		"isVisible" : true,
		"clipBounds" : true,
		"layoutType" : kony.flex.FLOW_HORIZONTAL
	};
	this.weekNameContainer = new kony.ui.FlexContainer(basicconfig_Main, {}, {});
	this.containerWidget.add(this.weekNameContainer);

	//creation of the week data elements
	for (var i = 0; i < 7; i++) {
		var lblBasic = {
			//"centerY" : "50%",
			"zIndex" : 1,
			"isVisible" : true,
			"height" : kony.flex.USE_PREFERED_SIZE,
			"width" : "14.29%"
		};
		lblBasic.left = DimensionInfo.weekNamePadding;
		lblBasic.skin = skinInfo.weekNameSkin;
		lblBasic.focusSkin = skinInfo.weekNameSkin;
		var day = this.WeekDayStart + i % 7;
		lblBasic.text = kony.apps.coe.Reusable.calendar.HelperFunction.retriveDayName(day).substr(0, widgetInfo.weekNamelength);
		lblBasic.id = "WEEKNAME" + i.toString();
		this[lblBasic.id] = new kony.ui.Button(lblBasic, {
				"widgetAlignment":constants.WIDGET_ALIGN_CENTER,
           "vExpand":false,
           "hExpand":false,
           "containerWeight":80,
           "padding":[1,1,1,1],
           "paddingInPixel":false,
           "margin":[0,1,1,1], 
           "marginInPixel":false,
           "displayText":true, 
           "contentAlignment":constants.CONTENT_ALIGN_CENTER
			}, {});
		this.weekNameContainer.add(this[lblBasic.id]);
	}
	//creation of the days info flex
	var basicconfig_Main = {
		"id" : "Weeks_DAYS_container",
		"left" : DimensionInfo.weekDayleft,
		"top" : DimensionInfo.weekDayTop,
		"height" : DimensionInfo.weekDayContainerheight,
		"zIndex" : 1,
		"width" : DimensionInfo.weekDayContainerWidth,
		"skin" : skinInfo.weeklabelContainerSkin,
		"isVisible" : true,
		"clipBounds" : true,
		"layoutType" : kony.flex.FLOW_HORIZONTAL
	};
	this.DaysContainer = new kony.ui.FlexContainer(basicconfig_Main, {}, {});
	this.containerWidget.add(this.DaysContainer);

	//week day label
	for (var i = 0; i < 7; i++) {
		var lblBasic = {
			//"centerY" : "50%",
			"zIndex" : 1,
			"isVisible" : true,
			"width" : "14.29%",
			"height" : "100%"
		};
		lblBasic.left = DimensionInfo.weekDayPadding;
		lblBasic.skin = skinInfo.weekDaySkin;
		lblBasic.focusSkin = skinInfo.weekDaySkin;
		lblBasic.text = i.toFixed() ;
		lblBasic.id = "DAY" + i.toString();
		this[lblBasic.id] = new kony.ui.Button(lblBasic, {
				"widgetAlignment":constants.WIDGET_ALIGN_CENTER,
           "vExpand":false,
           "hExpand":false,
           "containerWeight":80,
           "padding":[1,1,1,1],
           "paddingInPixel":false,
           "margin":[0,1,1,1], 
           "marginInPixel":false,
           "displayText":true, 
           "contentAlignment":constants.CONTENT_ALIGN_CENTER
			}, {});
		this.DaysContainer.add(this[lblBasic.id]);
	}

	this.WeekDatesIntialize();
	this.daysIntialize();
	this.highlightTheCurrentWeek();
};

kony.apps.coe.Reusable.WeekHeader.prototype.getWidget = function () {

	return this.containerWidget;

};

kony.apps.coe.Reusable.WeekHeader.prototype.shift = function (shiftIndex) {

	if (shiftIndex == 0) {}
	else if (shiftIndex > 0) {
		for (var i = 0; i < shiftIndex; i++) {
			this.leftshift();
		}

	} else {
		shiftIndex = shiftIndex * -1;
		for (var i = 0; i < shiftIndex; i++) {
			this.rightshift();
		}

	}

}

kony.apps.coe.Reusable.WeekHeader.prototype.leftshift = function (shiftIndex) {

	var removedWeekLabelIndex = this.data[0].INDEX.toString();
	var labelid = "WEEKLABEL" + removedWeekLabelIndex;

	//this.data.leftshift();
    this.data = leftShiftArray(this.data);

	this.weekLabelContainer.remove(this[labelid]);

	var datajson = {
		"text" : "NA",
		"INDEX" : removedWeekLabelIndex,
		"startDate" : undefined,
		"endDate" : undefined
	};
	this.weekLabelContainer.add(this[labelid]);

	var newStartDate = new Date(this.data[this.noOfWeekstobedisplayed - 2].startDate);
	newStartDate.setDate(newStartDate.getDate() + 7);
	datajson.startDate = newStartDate;

	var newendDate = new Date(this.data[this.noOfWeekstobedisplayed - 2].endDate);
	newendDate.setDate(newendDate.getDate() + 7);
	datajson.endDate = newendDate;

	datajson.text = newStartDate.getDate() + "-" + newendDate.getDate();
	this.data[this.noOfWeekstobedisplayed - 1] = datajson;
	//alert("the data json is" + JSON.stringify(this.data));

	this.changeWeekLabelsUiatIndex(this.noOfWeekstobedisplayed - 1);
	this.daysIntialize();
	this.highlightTheCurrentWeek();

}

kony.apps.coe.Reusable.WeekHeader.prototype.rightshift = function (shiftIndex) {
	var removedWeekLabelIndex = this.data[this.noOfWeekstobedisplayed - 1].INDEX.toString();
	var labelid = "WEEKLABEL" + removedWeekLabelIndex;

	this.data = rightShiftArray(this.data);
	this.weekLabelContainer.remove(this[labelid]);

	var datajson = {
		"text" : "NA",
		"INDEX" : removedWeekLabelIndex,
		"startDate" : undefined,
		"endDate" : undefined
	};
	this.weekLabelContainer.addAt(this[labelid], 0);

	var newStartDate = new Date(this.data[1].startDate);
	newStartDate.setDate(newStartDate.getDate() - 7);
	datajson.startDate = newStartDate;

	var newendDate = new Date(this.data[1].endDate);
	newendDate.setDate(newendDate.getDate() - 7);
	datajson.endDate = newendDate;

	datajson.text = newStartDate.getDate() + "-" + newendDate.getDate();

	this.data[0] = datajson;
	this.changeWeekLabelsUiatIndex(0);
	this.daysIntialize();
	this.highlightTheCurrentWeek();
}

kony.apps.coe.Reusable.WeekHeader.prototype.WeekDatesIntialize = function () {

	var d = new Date();
	//checking whether the month and year input params for the widget is same as current month and year
	if (d.getMonth() == this.MONTH && d.getFullYear() == this.YEAR) {
		//setting the Current Date for the week Labels intalization

	} else {
		//setting the weeklabels to input in widgetinfo month and year
		d.setDate(1);
		d.setMonth(this.MONTH);
		d.setFullYear(this.YEAR);

	}

	for (var i = 0; i < this.previous; i++) {
		d.setDate(d.getDate() - 7);
	}

	for (var i = 0; i < this.noOfWeekstobedisplayed; i++) {
		this.data[i].startDate = d.thisWeekInterval(this.WeekDayStart)[0];
		this.data[i].endDate = d.thisWeekInterval(this.WeekDayStart)[1];
		this.data[i].text = d.thisWeekInterval(this.WeekDayStart)[0].getDate() + "-" + d.thisWeekInterval(this.WeekDayStart)[1].getDate();
		d.setDate(d.getDate() + 7);
		this.changeWeekLabelsUiatIndex(i);
	}
};

kony.apps.coe.Reusable.WeekHeader.prototype.daysIntialize = function () {

	for (var i = 0; i < 7; i++) {
		this.changeDayUiatIndex(i);
	}
};

kony.apps.coe.Reusable.WeekHeader.prototype.changeWeekLabelsUiatIndex = function (index) {

	index = parseInt(index);
	if ((index < 0 && index >= this.noOfWeekstobedisplayed) || index === undefined || index === null) {
		//inappropriate index parameter
		throw "invalid parameter index for the method changeWeekLabelsUiatIndex";

	} else {
		//appropriate index parameter

		var widgetIndex = this.data[index].INDEX;

		var labelid = "WEEKLABEL" + widgetIndex.toString();

		var attributesJson = this.data[index];

		kony.apps.coe.Reusable.HelperFunctions.assignWidgetProperties(this[labelid], attributesJson);

	}

};

kony.apps.coe.Reusable.WeekHeader.prototype.highlightTheCurrentWeek = function () {

	var selectedIndex = this.previous;
	attributesJson = {};
	//resetting all the weeklabel skins to normal
	for (var i = 0; i < this.noOfWeekstobedisplayed; i++) {
		var labelid = "WEEKLABEL" + i.toString();
		kony.apps.coe.Reusable.HelperFunctions.assignWidgetProperties(this[labelid], {
			skin : this.weekLabelSkin
		});
	}
	
	//chainging the selected weeklabel skin as a highlighted 
	var dataindex = this.data[this.previous].INDEX;
	var labelid = "WEEKLABEL" + dataindex.toString();
	attributesJson.skin = this.weekLabelFocusSkin;
	kony.apps.coe.Reusable.HelperFunctions.assignWidgetProperties(this[labelid], attributesJson);

};
kony.apps.coe.Reusable.WeekHeader.prototype.changeDayUiatIndex = function (index) {

	index = parseInt(index);
	if ((index < 0 && index >= 7) || index === undefined || index === null) {
		//inappropriate index parameter
		throw "invalid parameter index for the method changeWeekLabelsUiatIndex";

	} else {
		//appropriate index parameter
		var labelid = "DAY" + index.toString();
		var currentWeek = this.previous;
		var currentWeekStartdate = this.data[currentWeek].startDate;
		var dayDate = new Date(currentWeekStartdate.toDateString());
		dayDate.setDate(currentWeekStartdate.getDate() + index);

		var d = new Date();
		var diff = Math.ceil((dayDate - d) / (1000 * 3600 * 24));
		var weekLabelJson = {
			"text" : dayDate.getDate().toFixed(),
			"skin" : this.weekDaySkin
		};
      //alert("tjje"+this.weekDaySkin);
		var weekNameid = "WEEKNAME" + dayDate.getDay().toString();

		if (diff == 0) {
			weekLabelJson.skin = this.weekDayCurrentSkin;
			kony.apps.coe.Reusable.HelperFunctions.assignWidgetProperties(this[weekNameid], {
				"skin" : this.weekNameCurrentSkin
			});
		} else {
			kony.apps.coe.Reusable.HelperFunctions.assignWidgetProperties(this[weekNameid], {
				"skin" : this.weekNameSkin
			});
		}

		kony.apps.coe.Reusable.HelperFunctions.assignWidgetProperties(this[labelid], weekLabelJson);

	}

};
kony.apps.coe.Reusable.HelperFunctions.assignWidgetProperties = function (widget, attributeJson) {
	if (attributeJson instanceof Object || attributeJson !== undefined || attributeJson !== null) {
		if (attributeJson.text !== undefined) {
			widget.text = attributeJson.text;
		}
		if (attributeJson.top !== undefined) {
			widget.top = attributeJson.top;
		}
		if (attributeJson.left !== undefined) {
			widget.left = attributeJson.left;
		}
		if (attributeJson.width !== undefined) {
			widget.width = attributeJson.width;
		}
		if (attributeJson.height !== undefined) {
			widget.height = attributeJson.height;
		}
		if (attributeJson.skin !== undefined) {
			widget.skin = attributeJson.skin;
		}
		if (attributeJson.focusSkin !== undefined) {
			widget.focusSkin = attributeJson.focusSkin;
		}
		if (attributeJson.isVisible !== undefined) {
			widget.isVisible = attributeJson.isVisible;
		}
		if (attributeJson.src !== undefined) {
			widget.src = attributeJson.src;
		}
		if (attributeJson.centerX !== undefined) {
			widget.centerX = attributeJson.centerX;
		}
		if (attributeJson.centerY !== undefined) {
			widget.centerY = attributeJson.centerY;
		}

	} else {

		throw "invalid parameter attributeJson in the method assignWidgetProperties";
	}

}
