kony.apps = kony.apps || {};
kony.apps.coe = kony.apps.coe || {};
kony.apps.coe.ess = kony.apps.coe.ess || {};
kony.apps.coe.ess.myTime = kony.apps.coe.ess.myTime || {};

//%Region - Constructor
kony.apps.coe.ess.myTime.
ListViewUIDW = function() {
    try {
        kony.print("-- Start ListViewUIDW --");
        kony.print("-- End ListViewUIDW --");
    } catch (e) {
       handleError(e);
    }
};
kony.apps.coe.ess.myTime.
ListViewUIDW.prototype.OnImgTempListClick=function(){
  var selectedItem=frmListViewDW.segSavedData.selectedItems;
  var selectedIndex=frmListViewDW.segSavedData.selectedRowIndex;
  var selectedValue=frmListViewDW.segSavedData.data[selectedIndex[1]];
  for(var i=0;i<frmListViewDW.segSavedData.data.length;i++)
    {
      selectedValue = frmListViewDW.segSavedData.data[i];
      selectedValue.flxSegDetails={skin:"sknflxBGf2f2f2OP100DW"};
      if(i==selectedIndex[1])	
        {         
          if(selectedValue.imgSegDay=="closearrow.png")
            {
           selectedValue.flxSegDetails={height : "111px"};
           selectedValue.lblDates={isvisible : true};
           selectedValue.flxDates={isvisible : false};
           selectedValue.imgSegDay="openarrow.png";
            }
          else
            {
           selectedValue.flxSegDetails={height : "130px"};
 		   selectedValue.lblDates={isvisible : false};
           selectedValue.flxDates={isvisible : true};
           selectedValue.imgSegDay="closearrow.png";
            }
        }
      else
        {
           selectedValue.flxSegDetails={height : "111px"};
           selectedValue.lblDates={isvisible : true};
           selectedValue.flxDates={isvisible : false};
           selectedValue.imgSegDay="openarrow.png";
        }
      frmListViewDW.segSavedData.setDataAt(selectedValue, i, selectedIndex[0]);
    }

  frmListViewDW.forceLayout();
}; 

kony.apps.coe.ess.myTime.ListViewUIDW.prototype.CopyWeekTimesheet = function() {
    kony.print("-- Start CopyWeekTimesheet --");
    var segData=["15 Jan - 19 Jan","22 Jan - 26 Jan","29 Jan - 3 Feb"];
    var selectedIndex = frmListViewDW.segCopy.selectedRowIndex;
    var selectedValue = frmListViewDW.segCopy.data[selectedIndex[1]];
    if (selectedValue.imgActiveInactive === "checkboxinactive.png") {
        selectedValue.imgActiveInactive = "checkboxactive.png";
        selectedValue.flxCpy={skin:"sknflxBG087da8R40DW"};
        selectedValue.lblWeek={skin:"sknlblffffffPx12AveRomanDW"};
    }
  	else {
        selectedValue.imgActiveInactive = "checkboxinactive.png";
        selectedValue.flxCpy={skin:"sknflxB1Px087da8R40DW"};
        selectedValue.lblWeek={skin:"sknlblF087da8Px12AveRomanDW"};     
    }
    selectedValue.lblWeek.text=segData[selectedIndex[1]]; 
    frmListViewDW.segCopy.setDataAt(selectedValue, selectedIndex[1], selectedIndex[0]);
    kony.print("-- End CopyWeekTimesheet --");
};

kony.apps.coe.ess.myTime.
ListViewUIDW.prototype.displaySentBackListData=function(){
  var selectedIndex = frmListViewDW.segSentBackData.selectedRowIndex;
  var selectedValue;
  var selectedItem= frmListViewDW.segSentBackData.selectedItems;
  for(var i=0;i<frmListViewDW.segSentBackData.data.length;i++)
    {
      selectedValue = frmListViewDW.segSentBackData.data[i];
      if(i==selectedIndex[1])
        {
          selectedValue.flxSentBackMain={skin:"sknflxBGf2f2f2OP100DW"};
        }
      else
        {
           selectedValue.flxSentBackMain={skin:"slFbox"};
        }
      frmListViewDW.segSentBackData.setDataAt(selectedValue, i, selectedIndex[0]);
    }
    frmListViewDW.forceLayout();
};
kony.apps.coe.ess.myTime.
ListViewUIDW.prototype.onCloneTimesheet=function(){
if(frmListViewDW.imgCpy.src == "clone.png"){
frmListViewDW.flxSegCopy.setVisibility(true);
frmListViewDW.imgCpy.src = "cloneselected.png";
frmListViewDW.imgCpy.width = "50dp";
frmListViewDW.imgCpy.height = "50dp";
frmListViewDW.forceLayout();
}
else
  {
   frmListViewDW.flxSegCopy.setVisibility(false);
frmListViewDW.imgCpy.src = "clone.png";
frmListViewDW.imgCpy.width = "25dp";
frmListViewDW.imgCpy.height = "25dp";
frmListViewDW.forceLayout(); 
  }
};
kony.apps.coe.ess.myTime.
ListViewUIDW.prototype.showSentBackList=function(){
 if (frmListViewDW.lblSentBack.skin == "sknlblF555555Px14AveRomanDW"){
        frmListViewDW.lblSentBack.skin = "sknlblF2ebaeePx14AveRomanDW";
        frmListViewDW.lblSaved.skin = "sknlblF555555Px14AveRomanDW";
        frmListViewDW.lblPastDues.skin = "sknlblF555555Px14AveRomanDW";
        frmListViewDW.lblAppr.skin = "sknlblF1c7393Px16AveMediumDW";
        frmListViewDW.lblDash.setVisibility(false);
        frmListViewDW.lblAppr.text = "Sent Back";
        frmListViewDW.lblApprStatus.setVisibility(true);
        frmListViewDW.lblAppr.setVisibility(true);
        frmListViewDW.lblSubmitted.text = "Submitted";
		frmListViewDW.btnSubmit.text = "Revise Timesheet";
        frmListViewDW.flxHighlight.setVisibility(true);
        frmListViewDW.flxHighlight.left="132px";
        frmListViewDW.flxSavedDetails.setVisibility(false);
        frmListViewDW.flxSentBackDetails.setVisibility(true);
        frmListViewDW.flxPD.setVisibility(false);
        frmListViewDW.imgPDArrow.setVisibility(false);
		frmListViewDW.flxImgNo.setVisibility(true);
    }
        frmListViewDW.forceLayout();
};
kony.apps.coe.ess.myTime.
ListViewUIDW.prototype.showSavedList=function(){
if(frmListViewDW.lblSaved.skin == "sknlblF555555Px14AveRomanDW"){
        frmListViewDW.lblSaved.skin = "sknlblF2ebaeePx14AveRomanDW";
        frmListViewDW.lblSentBack.skin = "sknlblF555555Px14AveRomanDW";
        frmListViewDW.lblPastDues.skin = "sknlblF555555Px14AveRomanDW";
        //frmListViewDW.lblAppr.skin = "sknlblF00c6adPx14DW";
          frmListViewDW.lblAppr.setVisibility(false);
        frmListViewDW.lblApprStatus.setVisibility(false);
        frmListViewDW.lblDash.setVisibility(true);
        frmListViewDW.btnSubmit.text = "Submit Timesheet";
		frmListViewDW.flxHighlight.setVisibility(true);
        frmListViewDW.flxHighlight.left="14dp";
        frmListViewDW.flxSentBackDetails.setVisibility(false);
        frmListViewDW.flxSavedDetails.setVisibility(true);
        frmListViewDW.imgPDArrow.setVisibility(false);
        frmListViewDW.flxPD.setVisibility(false);
		frmListViewDW.flxImgNo.setVisibility(true);
        }
        frmListViewDW.forceLayout();
};


kony.apps.coe.ess.myTime.
ListViewUIDW.prototype.displaySentBackListData=function(){
  var selectedIndex = frmListViewDW.segSentBackData.selectedRowIndex;
  var selectedValue;
  var selectedItem= frmListViewDW.segSentBackData.selectedItems;
  var weekDates=["1 Jan - 7 Jan","8 Jan - 14 Jan","15 Jan - 21 Jan"];
  for(var i=0;i<frmListViewDW.segSentBackData.data.length;i++)
    {
      selectedValue = frmListViewDW.segSentBackData.data[i];
      if(i==selectedIndex[1])
        {
          selectedValue.flxSentBackMain={skin:"sknflxBGf2f2f2OP100DW"};
          selectedValue.flxDate={skin:"sknflxBG087da8R40DW"};
          selectedValue.lblDate={skin:"sknlblffffffPx12AveRomanDW",text:weekDates[i]};
          frmListViewDW.flxTimesheetDate.text=selectedValue.lblDate.text;
        }
      else
        {
          selectedValue.flxSentBackMain={skin:"slFbox"};
          selectedValue.flxDate={skin:"sknflxB1Px087da8R40DW"};
          selectedValue.lblDate={skin:"sknlblF087da8Px12AveRomanDW",text:weekDates[i]};
        }
      frmListViewDW.segSentBackData.setDataAt(selectedValue, i, selectedIndex[0]);
    }
    frmListViewDW.forceLayout();
};

kony.apps.coe.ess.myTime.
ListViewUIDW.prototype.viewSavedDetails=function(){
    var weekDates=["1 Nov - 7 Nov","8 Nov - 14 Nov","15 Nov - 21 Nov"];

    var selectedIndex = frmListViewDW.segSavedData.selectedRowIndex;
  var selectedValue;
  var selectedItem= frmListViewDW.segSavedData.selectedItems;
  for(var j=0;j<frmListViewDW.segSavedData.data.length;j++)
    {
      selectedValue = frmListViewDW.segSavedData.data[j];
      selectedValue.flxWeek={skin:"sknflxBGffffffB2ebaeeDW"};
      selectedValue.lblWeek={skin:"sknlblF2ebaeePx12AveRomanDW"};
      selectedValue.btnDay1={skin:"sknbtnB1Px2ebaeeFPx12DW"};
      selectedValue.btnDay2={skin:"sknbtnB1Px2ebaeeFPx12DW"};
      selectedValue.btnDay3={skin:"sknbtnB1Px2ebaeeFPx12DW"};
      selectedValue.btnDay4={skin:"sknbtnB1Px2ebaeeFPx12DW"};
      selectedValue.btnDay5={skin:"sknbtnB1Px2ebaeeFPx12DW"};
      frmListViewDW.segSavedData.setDataAt(selectedValue, j, selectedIndex[0]);

    }
  for(var i=0;i<frmListViewDW.segSavedData.data.length;i++)
    {
      selectedValue = frmListViewDW.segSavedData.data[i];
      if(i==selectedIndex[1])
        {
          selectedValue.flxSegDetails={skin:"sknflxBGf2f2f2OP100DW"};
          selectedValue.flxWeek={skin:"sknflx2EBAEEOP100R40DW"};
          selectedValue.lblWeek={skin:"sknlblffffffPx12AveRomanDW",text:weekDates[i]};
          frmListViewDW.flxTimesheetDate.text=selectedValue.lblWeek.text;
        }
      else
        {
           selectedValue.flxSegDetails={skin:"slFbox"};
           selectedValue.flxWeek={skin:"sknflxBGffffffB2ebaeeDW"};
       	   selectedValue.lblWeek={skin:"sknlblF2ebaeePx12AveRomanDW",text:weekDates[i]};
        }
      frmListViewDW.segSavedData.setDataAt(selectedValue, i, selectedIndex[0]);
    }
};

kony.apps.coe.ess.myTime.
ListViewUIDW.prototype.viewSavedDetailsBtn=function(value){
    var selectedIndex = frmListViewDW.segSavedData.selectedRowIndex;
  var selectedValue;
  var selectedItem= frmListViewDW.segSavedData.selectedItems;
  var dayData=["1 Nov","2 Nov","3 Nov","4 Nov","5 Nov"];
  for(var j=0;j<frmListViewDW.segSavedData.data.length;j++)
    {
      selectedValue = frmListViewDW.segSavedData.data[j];
      var selectedItemValue=selectedValue["btnDay"+(value-1)];
      selectedValue.flxWeek={skin:"sknflxBGffffffB2ebaeeDW"};
      selectedValue.lblWeek={skin:"sknlblF2ebaeePx12AveRomanDW"};
      selectedValue.btnDay1={skin:"sknbtnB1Px2ebaeeFPx12DW"};
      selectedValue.btnDay2={skin:"sknbtnB1Px2ebaeeFPx12DW"};
      selectedValue.btnDay3={skin:"sknbtnB1Px2ebaeeFPx12DW"};
      selectedValue.btnDay4={skin:"sknbtnB1Px2ebaeeFPx12DW"};
      selectedValue.btnDay5={skin:"sknbtnB1Px2ebaeeFPx12DW"};
      frmListViewDW.segSavedData.setDataAt(selectedValue, j, selectedIndex[0]);

    }
  for(var i=0;i<frmListViewDW.segSavedData.data.length;i++)
    {
      selectedValue = frmListViewDW.segSavedData.data[i];
      if(i==selectedIndex[1])
        {
          selectedValue.flxSegDetails={skin:"sknflxBGf2f2f2OP100DW"};
          selectedValue["btnDay"+value]={skin:"sknBtnBG2ebaeeOP100Rad40pxDW",
                                        text: dayData[value-1]
                                        };
         frmListViewDW.flxTimesheetDate.text=selectedValue["btnDay"+value];
         frmListViewDW.flxTimesheetDate.text=selectedValue["btnDay"+value].text;

        }
      else
        {
         selectedValue.flxSegDetails={skin:"slFbox"};
         selectedValue["btnDay"+value]={skin:"sknbtnB1Px2ebaeeFPx12DW"};
        }
      frmListViewDW.segSavedData.setDataAt(selectedValue, i, selectedIndex[0]);
    }
};