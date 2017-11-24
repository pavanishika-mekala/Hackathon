kony.apps = kony.apps || {};
kony.apps.coe = kony.apps.coe || {};
kony.apps.coe.ess = kony.apps.coe.ess || {};
kony.apps.coe.ess.myTime = kony.apps.coe.ess.myTime || {};

//%Region - Constructor
kony.apps.coe.ess.myTime.
CreateViewUIDW = function() {
    try {
        kony.print("-- Start CreateViewUIDW --");
        kony.print("-- End CreateViewUIDW --");
    } catch (e) {
       handleError(e);
    }
};

kony.apps.coe.ess.myTime.CreateViewUIDW.prototype.addTimeLineDates = function (datePassed) {
     frmCreateViewDW.flxTimesheetDetails.removeAll();
	try {
      var idSuffix=0;
      var d=datePassed;
      for(var num=0;num<7;num++){
		var dateobj = new Date(2017,0,d++);
		var day = kony.apps.coe.ess.myTime.nToStr.week[dateobj.getDay()].toUpperCase();
		var date = parseInt(dateobj.getDate())+" "+kony.apps.coe.ess.myTime.nToStr.month[dateobj.getMonth()].toUpperCase();

		var flxTimesheetDetailsLeft = new kony.ui.FlexContainer({
				id : "flxTimesheetDetailsLeft" + idSuffix,
				left : "0%",
				top : "0%",
				height : "100%",
				width : "14.3%",
				clipBounds : true,
				layoutType : kony.flex.FREE_FORM,
               	skin : "sknflxBGfafafaB1Pxe2e2e2DW",
				zIndex : "1"
			}, {
				padding : [0, 0, 0, 0]
			}, {});
		var lblLeftDay = new kony.ui.Label({
				id : "lblLeftDay" + idSuffix,
				text : day,
				centerX : "50%",
				top : "6px",
				width : "100%",
				height : "preferred",
				zIndex : "1",
  			    skin : "sknlbl777777Px10AveMediumDW"
			}, {
				padding : [0, 0, 0, 0],
				contentAlignment : constants.CONTENT_ALIGN_CENTER
			}, {});

		var lblLeftDate = new kony.ui.Label({
				id : "lblLeftDate" + idSuffix,
				text : date,
				centerX : "50%",
				bottom : "10px",
				width : "44.4%",
				height : "41.2%",
				zIndex : "1",
                skin : "sknlbl333333Px14AveMediumDW"
			}, {
				padding : [0, 0, 0, 0],
				contentAlignment : constants.CONTENT_ALIGN_CENTER
			}, {});

		flxTimesheetDetailsLeft.add(lblLeftDay);
		flxTimesheetDetailsLeft.add(lblLeftDate);
        flxTimesheetDetailsLeft.onClick = function(index){
          for(var i=0;i<frmCreateViewDW.flxTimesheetDetails.widgets().length;i++){
        if(frmCreateViewDW[index.id]==frmCreateViewDW.flxTimesheetDetails.widgets()[i]){
        frmCreateViewDW[index.id].skin="sknFlx2ebaeeDW";
        frmCreateViewDW[index.id].widgets()[0].skin="sknlblFffffffPx10AveMediumDW";
        frmCreateViewDW[index.id].widgets()[1].skin="sknlblFffffffPx14AveMediumDW";
        }
        else
        {
        frmCreateViewDW.flxTimesheetDetails.widgets()[i].skin="slFbox";
        frmCreateViewDW.flxTimesheetDetails.widgets()[i].widgets()[0].skin="sknlbl777777Px10AveMediumDW";
     	frmCreateViewDW.flxTimesheetDetails.widgets()[i].widgets()[1].skin="sknlbl333333Px14AveMediumDW";
        }
        }

        index = parseInt(index);
        (new kony.apps.coe.ess.myTime.CreateViewUIDW()).AddTimelineToFormDW(index);
        frmCreateViewDW.forceLayout();
        };
        frmCreateViewDW.flxTimesheetDetails.add(flxTimesheetDetailsLeft);
        idSuffix++;
    }
	} catch (err) {
		handleError(err);
	}
    frmCreateViewDW.forceLayout();
};



kony.apps.coe.ess.myTime.CreateViewUIDW.prototype.AddTimelineToFormDW= function(index){
   var task;
   var ProjectTaskId=[];
   var oldestTaskHour = 24;

    function makeItTwoDigits(x) {
        x = parseInt(x);
        if (x < 10) {
            return "0" + x;
        } else {
            return "" + x;
        }
    }

    function convertHoursMinutesForTimeline(hour, min) {
        var isPM = false;
        if (hour >= 12) {
            isPM = true;
        }
        if (hour === 0) {
            hour = 12;
        }
        if (hour >= 13) {
            hour -= 12;
        }
        var finalTime = "" + hour;
        if (min > 0) {
            finalTime += "." + makeItTwoDigits(min);
        }
        if (isPM) {
            finalTime += " PM";
        } else {
            finalTime += " AM";
        }
        return finalTime;
    }
    var tempdata = [];
    if (oldestTaskHour == 24) {
        kony.apps.coe.Reusable.TimelineCreationDW.initialScrollHour = "9 AM";
    } else {
        kony.apps.coe.Reusable.TimelineCreationDW.initialScrollHour = convertHoursMinutesForTimeline(oldestTaskHour, 0);
    }
    frmCreateViewDW.flxTimeLine.removeAll();
    var slider = new kony.apps.coe.Reusable.TimelineCreationDW();
    slider.drawSliderUIDW(frmCreateViewDW.flxTimeLine, 12, 12);
   frmCreateViewDW.show();
   slider.storeCoordinatesOfTimeLineDW();
};
kony.apps.coe.ess.myTime.
CreateViewUIDW.prototype.OnDropDownSegClick=function(){
  var selectedIndex = frmCreateViewDW.segAdvSearch.selectedRowIndex;
  var selectedValue;
  for(var i=0;i<frmCreateViewDW.segAdvSearch.data.length;i++)
    {
      selectedValue = frmCreateViewDW.segAdvSearch.data[i];
      if(i==selectedIndex[1])
        {
          selectedValue.imgTick="check.png";
        }
      else
        {
           selectedValue.imgTick="";
        }
      frmCreateViewDW.segAdvSearch.setDataAt(selectedValue,i,selectedIndex[0]);
    }
frmCreateViewDW.lblSelectCriteria.text=frmCreateViewDW.segAdvSearch.data[selectedIndex[1]].lblData;
frmCreateViewDW.imgDropDown.src="dropbox.png";
frmCreateViewDW.flxSelectId.skin="sknflxBGf2f2f2B1PxdfdfdfDW";
frmCreateViewDW.flxSearchTypeId.setVisibility(true);
frmCreateViewDW.flxSearchIconinAdvSearch.setVisibility(true);
frmCreateViewDW.flxtbxSearch.setVisibility(false);
frmCreateViewDW.flxAdvSearchSegDropdown.setVisibility(false);
frmCreateViewDW.forceLayout();
}; 

kony.apps.coe.ess.myTime.
CreateViewUIDW.prototype.OnDropDownIconClick = function(){
frmCreateViewDW.flxSegSearch.setVisibility(false);
if(frmCreateViewDW.imgDropDown.src=="listbrowseblue.png")
  {
    frmCreateViewDW.imgDropDown.src="dropbox.png";
    frmCreateViewDW.flxAdvSeg.setVisibility(true);
    frmCreateViewDW.flxAdvSearchSegDropdown.setVisibility(false);
    frmCreateViewDW.flxSelectId.skin="sknflxBGf2f2f2B1PxdfdfdfDW";

  }
else
    {
      frmCreateViewDW.imgDropDown.src="listbrowseblue.png";
      frmCreateViewDW.flxAdvSeg.setVisibility(false);
      frmCreateViewDW.flxAdvSearchSegDropdown.setVisibility(true);
      frmCreateViewDW.lblSelectCriteria.text="Select a search criteria";
      frmCreateViewDW.flxSelectId.skin="sknflxBGdfdfdfB1PxRDW";
    }
frmCreateViewDW.forceLayout();
};

kony.apps.coe.ess.myTime.
CreateViewUIDW.prototype.addBreak = function(){
  var selectedIndex = frmCreateViewDW.segBreak.selectedRowIndex;
  var selectedValue=frmCreateViewDW.segBreak.data[selectedIndex[1]];
  var selectedItem= frmCreateViewDW.segBreak.selectedItems;


  if(selectedValue.lblBreakType=="Lunch Break")
    {
      frmCreateViewDW.lblBreak.text="Lunch Break";
    }
  else if(selectedValue.lblBreakType=="Tea Break")
    {
      frmCreateViewDW.lblBreak.text="Tea Break";
    }
    else if(selectedValue.lblBreakType=="Smoking Break")
    {
      frmCreateViewDW.lblBreak.text="Smoking Break";
    }
    else if(selectedValue.lblBreakType=="Snacks Break")
    {
      frmCreateViewDW.lblBreak.text="Snacks Break";
    }
    else if(selectedValue.lblBreakType=="Other 1")
    {
      frmCreateViewDW.lblBreak.text="Other 1";
    }  else if(selectedValue.lblBreakType=="Other 2")
    {
      frmCreateViewDW.lblBreak.text="Other 2";
    }
  	 frmCreateViewDW.lblBreakHours.setVisibility(true);
     frmCreateViewDW.flxSelectBreak.setVisibility(false);
  	 frmCreateViewDW.imgDeleteBreak.setVisibility(false);
	 frmCreateViewDW.imgEditBreak.setVisibility(false);
     frmCreateViewDW.flxBlank.setVisibility(false);
};
kony.apps.coe.ess.myTime.CreateViewUIDW.prototype.onActiveInactiveChange = function () {
  if(frmCreateViewDW.imgActiveInactive.src=="checkboxinactive.png")
  {
    frmCreateViewDW.imgActiveInactive.src="checkboxactive.png";
    frmCreateViewDW.flxSegSearch.setVisibility(false);
    frmCreateViewDW.flxSelectId.setVisibility(true);
    frmCreateViewDW.flxAdvSeg.setVisibility(true);
    frmCreateViewDW.flxSearchTypeId.setVisibility(false);
    frmCreateViewDW.lblAdd.setVisibility(false);

  }
else{
      frmCreateViewDW.flxAdvSearchSegDropdown.setVisibility(false);
    frmCreateViewDW.imgActiveInactive.src="checkboxinactive.png";
	frmCreateViewDW.flxSegSearch.setVisibility(true);
    frmCreateViewDW.flxSelectId.setVisibility(false);
    frmCreateViewDW.flxAdvSeg.setVisibility(false);
    frmCreateViewDW.flxSearchTypeId.setVisibility(false);
    frmCreateViewDW.lblAdd.setVisibility(false);
  frmCreateViewDW.flxtbxSearch.setVisibility(true);
  frmCreateViewDW.flxSearchIconinAdvSearch.setVisibility(false);
}
frmCreateViewDW.forceLayout();  
};

kony.apps.coe.ess.myTime.CreateViewUIDW.prototype.onAddTaskConfirm = function () {
frmCreateViewDW.flxBlank.setVisibility(false);
frmCreateViewDW.flxSelectId.setVisibility(false);
frmCreateViewDW.lblAdd.setVisibility(false);
frmCreateViewDW.flxSearchIconinAdvSearch.setVisibility(false);
frmCreateViewDW.flxtbxSearch.setVisibility(true);
frmCreateViewDW.flxSearchTypeId.setVisibility(false);
frmCreateViewDW.flxSelectTask.setVisibility(false);
frmCreateViewDW.flxAdvSearchSegDropdown.setVisibility(false);
frmCreateViewDW.imgDropDown.src="dropbox.png";
frmCreateViewDW.flxSelectId.skin="sknflxBGf2f2f2B1PxdfdfdfDW";
frmCreateViewDW.imgActiveInactive.src="checkboxinactive.png";
frmCreateViewDW.forceLayout();
};