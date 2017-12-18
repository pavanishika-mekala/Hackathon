/**
 *  @author     Nandhini.Subramaniam
 *  @category   Business Logic.
 *  @desc
 *  @ © 2016    Kony Inc.
 */
kony = kony || {};
kony.apps = kony.apps || {};
kony.apps.coe = kony.apps.coe || {};
kony.apps.coe.ess = kony.apps.coe.ess || {};
kony.apps.coe.ess.myLeave = kony.apps.coe.ess.myLeave || {};

kony.apps.coe.ess.myLeave.applyLeave = kony.apps.coe.ess.myLeave.applyLeave || {};

kony.apps.coe.ess.myLeave.applyLeave.showForm = function() {
  var formController = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmApplyLeave");
  formController.loadDataAndShowForm();
};

kony.apps.coe.ess.myLeave.applyLeave.Initialization = {

  calendarWidgetObj: null,

  monthArray: [
    kony.i18n.getLocalizedString("i18n.ess.Date.Month.january"),// "January",
    kony.i18n.getLocalizedString("i18n.ess.Date.Month.Febrauary"),//"February",
    kony.i18n.getLocalizedString("i18n.ess.Date.Month.March"),//"March",
    kony.i18n.getLocalizedString("i18n.ess.Date.Month.April"),//"April",
    kony.i18n.getLocalizedString("i18n.ess.Date.Month.May"),//"May",
    kony.i18n.getLocalizedString("i18n.ess.Date.Month.June"),//"Jun",
    kony.i18n.getLocalizedString("i18n.ess.Date.Month.July"),//"July",
    kony.i18n.getLocalizedString("i18n.ess.Date.Month.August"),//"August",
    kony.i18n.getLocalizedString("i18n.ess.Date.Month.September"),//"September",
    kony.i18n.getLocalizedString("i18n.ess.Date.Month.October"),//"October",
    kony.i18n.getLocalizedString("i18n.ess.Date.Month.November"),//"November",
    kony.i18n.getLocalizedString("i18n.ess.Date.Month.December")//"December"
  ],

  frmApplyLeaveInit: function() {
    if (kony.apps.coe.ess.myLeave.applyLeave.preShow.startDate !== null) {
      frmApplyLeave.lblRequiredComments.isVisible = false;
      var currDate = new Date(kony.apps.coe.ess.myLeave.applyLeave.preShow.startDate);
      this.calendarWidgetObj = new kony.apps.coe.Reusable.calendarWIDGET(currDate.getMonth(), currDate.getFullYear(), "flxCalendarApplyLeave", "sknFlxMobOp0", "sknFlxFocus", "sknFlxMobOp0", "sknFlxMobOp100BgColD8F4FF", "sknBtnMobBg0OpFC777777Op100S79", "sknBtnMobOp100Bg2EBAEFFcFFFFFF", "sknLblMobFC333333Op100FS100", "sknBtnMobBg0OpFC333333Op100S24px", "sknBtnMobBg0OpFCC3C4CCOp100S24px", this.isValidMonthandYearforCalenderApplyLeave.bind(this), this.errorIsValidMonthandYearforCalenderApplyLeave.bind(this), this.onSwipeCallbackApplyLeave.bind(this), this.onTouchEndCallbackApplyLeave.bind(this), this.monthRefreshApplyLeave.bind(this), this.totalCalenderRefreshApplyLeave.bind(this));
      frmApplyLeave.flxCalendar.flxMonthData.add(this.calendarWidgetObj.getcalendar());
      frmApplyLeave.flxCalendar.flxCalendarHeader.lblMonthName.text = this.monthArray[currDate.getMonth()] + " " + currDate.getFullYear().toFixed();
      //           this.changeCalendarHeight();
      this.changeCurrentDateSkin();
    }
  },

  isValidMonthandYearforCalenderApplyLeave: function(month, year) {
    try {
      kony.print("-- Start isValidMonthandYearforCalender --");
      var currDate = new Date();
      if (year >= (currDate.getFullYear() - 1).toString().trim(0, 4) && year <= (currDate.getFullYear() + 1).toString().trim(0, 4)) {
        return true;
      } else {
        return false;
      }
      kony.print("-- End isValidMonthandYearforCalender --");
    } catch (e) {
      handleError(e);
    }
  },

  errorIsValidMonthandYearforCalenderApplyLeave: function(month, year) {
    kony.print("-----In errorIsValidMonthandYearforCalender---");
    kony.print("-----Out of errorIsValidMonthandYearforCalender---");
  },

  onSwipeCallbackApplyLeave: function(myWidget, gestureInfo, context) {
    frmApplyLeave.lblMonthName.text =  Date.getMonthName(kony.store.getItem("localeToBeSetLeave"),this.calendarWidgetObj.month) + " " + this.calendarWidgetObj.year;
    //frmApplyLeave.lblMonthName.text = this.monthArray[this.calendarWidgetObj.month] + " " + this.calendarWidgetObj.year;
  },

  onTouchEndCallbackApplyLeave: function(data) {
    var startDate = kony.apps.coe.ess.myLeave.applyLeave.preShow.startDate;
    if(data.LABEL !== undefined && data.LABEL !== null && String(data.LABEL) !== ""){
      if ((new Date(data.LABEL.Date)).compareOnlyDate(startDate) >= 0 && data.LABEL.isMothDay) {
        try {
          var toDate = data.LABEL.Date.split(" ");
          kony.apps.coe.ess.myLeave.applyLeave.preShow.endDate = data.LABEL.Date;
          var date = (kony.apps.coe.ess.myLeave.applyLeave.preShow.startDate).split(" ");
          var start_date = date[3] + kony.apps.coe.ess.myLeave.applyLeave.submitLeave.month_number[date[1].toLowerCase()] + date[2];
          date = (kony.apps.coe.ess.myLeave.applyLeave.preShow.endDate).split(" ");
          var end_date = date[3] + kony.apps.coe.ess.myLeave.applyLeave.submitLeave.month_number[date[1].toLowerCase()] + date[2];
          var sqlQuery = "select count(l.id) as leaveCount from leave l  " +
              "where (l.status_id = '0' OR l.status_id = '2') AND l.employee_id = '" + kony.apps.coe.ess.globalVariables.employeeId + "' AND ((l.start_date between '" + start_date +
              "' AND '" + end_date + "') OR (l.end_date between '" + start_date + "' AND '" + end_date + "'))";
          kony.sync.single_select_execute(kony.sync.getDBName(), sqlQuery, null, function(resdata) {
            if (resdata[0].leaveCount <= 0) {
              var monthNum = Date.getshortMonthNumber("en",toDate[1]);
              var monthNameLocale = Date.getMonthNameShort(kony.store.getItem("localeToBeSetLeave"),monthNum);
              frmApplyLeave.lblToDate.text = data.LABEL.Day + " " + monthNameLocale + " " + toDate[3]; //toDate[1] : month
              frmApplyLeave.lblToDate.isVisible = true;
              frmApplyLeave.lblSelect.isVisible = false;
              frmApplyLeave.flxFromToDate.height = "12%";
              frmApplyLeave.flxFullHalfDay.top = "0%";
              frmApplyLeave.flxCalendar.isVisible = false;
              kony.apps.coe.ess.myLeave.applyLeave.Initialization.changeCurrentDateSkin();
              kony.apps.coe.ess.myLeave.applyLeave.Initialization.mappingDataToCalendar();
              kony.apps.coe.ess.myLeave.applyLeave.fullDayHoursSelection.onClickOfFullDay();
              frmApplyLeave.flexMain.forceLayout();
            } else {
              frmApplyLeave.flxAlertPopup.isVisible = true;
              kony.apps.coe.ess.myLeave.applyLeave.preShow.endDate = null;
            }
          }, function(err) {
            handleError(err);
          }, false);

        } catch (err) {
          handleError(err);
        }
      }
    }
  },
  monthRefreshApplyLeave: function(month, year, index) {
    frmApplyLeave.lblMonthName.text =  Date.getMonthName(kony.store.getItem("localeToBeSetLeave"),this.calendarWidgetObj.month) + " " + this.calendarWidgetObj.year;
      //this.monthArray[this.calendarWidgetObj.month] + " " + this.calendarWidgetObj.year;
    this.changeCurrentDateSkin();
    this.mappingDataToCalendar();
    // 		this.changeCalendarHeight();
  },

  totalCalenderRefreshApplyLeave: function(month, year) {},

  onRightSwipe: function() {

    var month_name = frmApplyLeave.lblMonthName.text.split(" ")[0];
    var month_param = Number(Date.getMonthNumber(kony.store.getItem("localeToBeSetLeave"),month_name))+1;
   // var month_param = (this.monthArray.indexOf(month_name)) + 1;
    var currDate = new Date();
    var year_param = parseInt(frmApplyLeave.lblMonthName.text.split(" ")[1]);
    if (month_param < 12) {
      this.calendarWidgetObj.setMonthandYear(month_param, year_param);
      this.changeCurrentDateSkin();
      this.mappingDataToCalendar();
      // 			this.changeCalendarHeight();
    } else if (month_param >= 12) {
      month_param = month_param - 12;
      year_param = year_param + 1;
      this.calendarWidgetObj.setMonthandYear(month_param, year_param);
      this.changeCurrentDateSkin();
      this.mappingDataToCalendar();
    }
  },

  onLeftSwipe: function() {

    var month_name = frmApplyLeave.lblMonthName.text.split(" ")[0];
    var month_param = Number(Date.getMonthNumber(kony.store.getItem("localeToBeSetLeave"),month_name))-1;
   // var month_param = this.monthArray.indexOf(month_name) - 1;
    var currDate = new Date();
    var year_param = parseInt(frmApplyLeave.lblMonthName.text.split(" ")[1]);
    if (month_param >= 0) {
      this.calendarWidgetObj.setMonthandYear(month_param, year_param);
      this.changeCurrentDateSkin();
      this.mappingDataToCalendar();
      // 			this.changeCalendarHeight();
    } else if (month_param < 0) {
      month_param = 12 + month_param;
      year_param = year_param - 1;
      this.calendarWidgetObj.setMonthandYear(month_param, year_param);
      this.changeCurrentDateSkin();
      this.mappingDataToCalendar();
    }
  },

  mappingDataToCalendar: function() {

    var startDate = kony.apps.coe.ess.myLeave.applyLeave.preShow.startDate;
    var endDate = kony.apps.coe.ess.myLeave.applyLeave.preShow.endDate;
    if (startDate !== undefined && endDate !== undefined && endDate !== null) {
      endDate = new Date(endDate);
      if (endDate.compareOnlyDate(startDate) >= 0) {
        var cellData;
        for (var i = 0; i < 42; i++) {
          var curData = this.calendarWidgetObj.getCelldataAtIndex(i);
          if (new Date(curData.LABEL.Date).compareOnlyDate(startDate) === 0 && new Date(curData.LABEL.Date).compareOnlyDate(endDate) === 0) {
            cellData = {
              "CELL": {
                "skin": "sknFlxOneDay"
              },
              "data": {
                "CellData": {},
                "TYPE": ""
              },
              "IMAGE": {
                "isVisible": false,
                "src": ""
              },
              "LABEL": {
                "skin": "sknBtnMobBg0OpFCFFFFFFOp100S24px"
              }
            };
            this.calendarWidgetObj.setDataAtIndex(1, i, cellData);
          } else if ((new Date(curData.LABEL.Date)).compareOnlyDate(startDate) === 0) {
            cellData = {
              "CELL": {
                "skin": "sknFlexMobsavedLeftBar"
              },
              "data": {
                "CellData": {},
                "TYPE": ""
              },
              "IMAGE": {
                "isVisible": false,
                "src": ""
              },
              "LABEL": {
                "skin": "sknBtnMobBg0OpFCFFFFFFOp100S24px"
              }
            };
            this.calendarWidgetObj.setDataAtIndex(1, i, cellData);
          } else if ((new Date(curData.LABEL.Date)).compareOnlyDate(startDate) > 0 && (new Date(curData.LABEL.Date)).compareOnlyDate(endDate) < 0) {
            cellData = {
              "CELL": {
                "skin": "sknFlexMobsavedMiddleBar"
              },
              "data": {
                "CellData": {},
                "TYPE": ""
              },
              "IMAGE": {
                "isVisible": false,
                "src": ""
              },
              "LABEL": {
                "skin": "sknBtnMobBg0OpFCFFFFFFOp100S24px"
              }
            };
            this.calendarWidgetObj.setDataAtIndex(1, i, cellData);
          } else if ((new Date(curData.LABEL.Date)).compareOnlyDate(startDate) > 0 && (new Date(curData.LABEL.Date)).compareOnlyDate(endDate) === 0) {
            cellData = {
              "CELL": {
                "skin": "sknFlexMobsavedRightBar"
              },
              "data": {
                "CellData": {},
                "TYPE": ""
              },
              "IMAGE": {
                "isVisible": false,
                "src": ""
              },
              "LABEL": {
                "skin": "sknBtnMobBg0OpFCFFFFFFOp100S24px"
              }
            };
            this.calendarWidgetObj.setDataAtIndex(1, i, cellData);
          } else {
            var lblskin = "";
            if (curData.LABEL.isMothDay === false) {
              lblskin = this.calendarWidgetObj.labelSkinNotBelongsINmonth;
            } else {
              lblskin = this.calendarWidgetObj.labelSkinBelongsINmonth;
            }
            cellData = {
              "CELL": {
                "skin": "sknFlxMobFFFFFFOp100"
              },
              "data": {
                "CellData": {},
                "TYPE": ""
              },
              "IMAGE": {
                "isVisible": false,
                "src": ""
              },
              "LABEL": {
                "skin": lblskin
              }
            };
            this.calendarWidgetObj.setDataAtIndex(1, i, cellData);
            kony.print("-----cellData---" + i + "---" + JSON.stringify(curData));
          }
        }
      }
    } else if (startDate !== null && startDate !== undefined) {
      var cellData1;
      for (var k = 0; k < 42; k++) {
        var curData1 = this.calendarWidgetObj.getCelldataAtIndex(k);
        if (new Date(curData1.LABEL.Date).compareOnlyDate(startDate) === 0) {
          cellData1 = {
            "CELL": {
              "skin": "sknFlxOneDay"
            },
            "data": {
              "CellData": {},
              "TYPE": ""
            },
            "IMAGE": {
              "isVisible": false,
              "src": ""
            },
            "LABEL": {
              "skin": "sknBtnMobBg0OpFCFFFFFFOp100S24px"
            }
          };
          this.calendarWidgetObj.setDataAtIndex(1, k, cellData1);
        }
      }
    }
    this.changeCurrentDateSkin();
  },

  changeCalendarHeight: function() {
    var rows = this.calendarWidgetObj.calendarROWS;
    if (rows === 4) {
      frmApplyLeave.flxFullHalfDay.top = "-22%";
    } else if (rows === 5) {
      frmApplyLeave.flxFullHalfDay.top = "-12%";
    } else if (rows === 6) {
      frmApplyLeave.flxFullHalfDay.top = "-8%";
    }
    frmApplyLeave.forceLayout();
  },

  changeCalendarVisibility: function() {

    if (frmApplyLeave.flxCalendar.isVisible) {
      frmApplyLeave.flxCalendar.isVisible = false;
      kony.apps.coe.ess.myLeave.applyLeave.fullDayHoursSelection.updateDurationFullDay();
    } else {
      frmApplyLeave.flxCalendar.isVisible = true;
      kony.apps.coe.ess.myLeave.applyLeave.fullDayHoursSelection.updateDurationFullDay();
    }
  },

  changeCurrentDateSkin: function() {
    var currDate = new Date();
    if (currDate.getMonth() === this.calendarWidgetObj.month && currDate.getFullYear() === this.calendarWidgetObj.year) {
      var index = this.calendarWidgetObj.getIndexByDate(currDate);
      cellData = {
        "CELL": {
          "skin": "sknFlxMobOp0"
        },
        "data": {
          "CellData": {},
          "TYPE": ""
        },
        "IMAGE": {
          "isVisible": false,
          "src": ""
        },
        "LABEL": {
          "skin": "sknBtnMob2EBAEFS24Px"
        }
      };
      this.calendarWidgetObj.setDataAtIndex(1, index, cellData);
    }
  }

};

kony.apps.coe.ess.myLeave.applyLeave.preShow = {

  startDate: null,
  endDate: null,
  selectedLeaveId: null,
  ManagerName: "",
  mailId: "",
  phoneNumber: null,
  currentComment: "",

  setDefaultValues: function() {
    frmApplyLeave.flxRecurringLeave.imgRecurringOn.isVisible = false;
    frmApplyLeave.flxRecurringLeave.imgRecurringOff.isVisible = true;
    frmApplyLeave.lblRequiredComments.isVisible = false;
    frmApplyLeave.txtComments.text = "";
    kony.apps.coe.ess.myLeave.applyLeave.fullDayHoursSelection.onClickOfFullDay();
    frmApplyLeave.flxCalendar.MONTHFLEXCONTAINER.isVisible = false;
    frmApplyLeave.flxCalendar.DYNAMICCALNEDERWIDGETFLEX.height = "89.9%";
    frmApplyLeave.flexMain.enableScrolling = false;
    frmApplyLeave.lblPersonsOnLeave.text = "";
    frmApplyLeave.flxAddAtachment.removeAll();
    kony.apps.coe.ess.myLeave.applyLeave.staticAttachmentImg.setImgPlus();
    kony.apps.coe.ess.myLeave.applyLeave.AddAttachment.lastIndex = 0;
    kony.apps.coe.ess.myLeave.applyLeave.Attachment.proofData = [];
    frmApplyLeave.lblToDate.isVisible = true;
    frmApplyLeave.lblSelect.isVisible = false;
    frmApplyLeave.flxCalendar.isVisible = false;
    frmApplyLeave.lblContactApprover.text = kony.apps.coe.ess.myLeave.applyLeave.preShow.ManagerName;
    var currDate = new Date(this.startDate);
    this.endDate = this.startDate;
    kony.apps.coe.ess.myLeave.applyLeave.submitLeave.leaveEntryData = {};
    kony.apps.coe.ess.myLeave.applyLeave.Initialization.mappingDataToCalendar();
    frmApplyLeave.lblFromDate.text = currDate.getDate() + " " + Date.getMonthNameShort(kony.store.getItem("localeToBeSetLeave"),currDate.getMonth()) + " "+ currDate.getFullYear().toFixed();
      //kony.apps.coe.ess.myLeave.applyLeave.Initialization.monthArray[currDate.getMonth()].slice(0, 3) + " " + currDate.getFullYear().toFixed();
    frmApplyLeave.lblToDate.text = currDate.getDate()+ " "+Date.getMonthNameShort(kony.store.getItem("localeToBeSetLeave"),currDate.getMonth())+ " "+currDate.getFullYear().toFixed();
      //currDate.getDate() + " " + kony.apps.coe.ess.myLeave.applyLeave.Initialization.monthArray[currDate.getMonth()].slice(0, 3) + " " + currDate.getFullYear().toFixed();
    frmApplyLeave.lblMonthName.text =  Date.getMonthName(kony.store.getItem("localeToBeSetLeave"),currDate.getMonth()) + " " + currDate.getFullYear().toFixed();
    kony.apps.coe.ess.myLeave.applyLeave.fullDayHoursSelection.updateDurationFullDay();
    //to disable the recurring option if it is not supported
    if(kony.apps.coe.ess.appconfig.isRecurringSupported===false) {
      frmApplyLeave.flxRecurringLeave.setVisibility(false);
      frmApplyLeave.lblBorderweekly.setVisibility(false);
      frmApplyLeave.flxRecurringLeaveOptions.setVisibility(false);
    }
    /* It check whether the Attachements is enable or not.
           If attachements are enabled then it make the flxAttachement Visiblity as true othewise it make the flxAttachement Visibility as false
        */
    if (kony.apps.coe.ess.appconfig.isAttachementsEnabled === true) {
      frmApplyLeave.flxAttachment.isVisible = true;
      frmApplyLeave.flxAddAtachment.isVisible = true;
      frmApplyLeave.lblAttachmentBorder.isVisible = true;
    } else {
      frmApplyLeave.flxAttachment.isVisible = false;
      frmApplyLeave.flxAddAtachment.isVisible = false;
      frmApplyLeave.lblAttachmentBorder.isVisible = false;
    }
    if (this.selectedLeaveId !== null && this.selectedLeaveId !== undefined) {
      var sqlQuery = "select l.id as LeaveID,l.start_time as StartTime, l.end_time as EndTime, lt.name as LeaveType, l.leave_type_id as LeaveTypeId,s.Status_Name as Status, l.start_date as StartDate, l.end_date as EndDate, l.no_of_hours as Hours, l.lastmodifiedts as LastModifiedDate, l.createdts as CreateDate, l.reason_desc as Comment " +
          "from leave l join leave_type lt on l.leave_type_id = lt.id " +
          "join Status s on l.status_id = s.id where l.id = '" + this.selectedLeaveId + "'";
      kony.sync.single_select_execute(kony.sync.getDBName(), sqlQuery, null, function(data) {
        kony.apps.coe.ess.myLeave.applyLeave.preShow.currentComment = data[0].Comment;
        frmApplyLeave.lblSelectionIndicator.isVisible = false;
        frmApplyLeave.flxToDate.onClick = function() {};
        kony.apps.coe.ess.myLeave.modifyLeave.updateUI.setData(data);
      }, function(err) {
        handleError(err);
      }, false);
    } else {
      frmApplyLeave.flxToDate.onClick = function() {
        kony.apps.coe.ess.myLeave.applyLeave.Initialization.changeCalendarVisibility();
        // 				frmApplyLeave.flxCalendar.isVisible = true;
      };
      frmApplyLeave.lblSelectionIndicator.isVisible = true;
    }
  },

  getManagerName: function() {
    // Remove var sqlQuery = "select e.First_Name,e.Last_Name ,c.Value ,c.Communication_Type_Id from Employee e join Communication_Channel c on c.Employee_Id = e.Id  where e.Id =(select emp.Manager_Id from Employee emp where emp.Id = '" + kony.apps.coe.ess.globalVariables.employeeId + "')";
    var sqlQuery ="select e1.First_Name,e1.Last_Name from  Employee e join Employee e1 on e1.Id = e.Id  where e.Id =(select emp.Manager_Id from Employee emp where emp.Id = '" + kony.apps.coe.ess.globalVariables.employeeId + "')";
    kony.sync.single_select_execute(kony.sync.getDBName(), sqlQuery, null, function(data) {
      if (data.length > 0 && data !== undefined && data[0].First_Name !== undefined && data[0].Last_Name !== undefined) {
        for (var i = 0; i < data.length; i++) {
          if (data[i].Communication_Type_Id === "0010") {
            kony.apps.coe.ess.myLeave.applyLeave.preShow.mailId = data[i].Value;
          } else if (data[i].Communication_Type_Id === "0020") {
            kony.apps.coe.ess.myLeave.applyLeave.preShow.phoneNumber = data[i].Value;
          }
        }
        kony.apps.coe.ess.myLeave.applyLeave.preShow.ManagerName = data[0].First_Name + " " + data[0].Last_Name;
      }
    }, function(err) {
      handleError(err);
    }, false);
  }
};

kony.apps.coe.ess.myLeave.applyLeave.LeaveType = {

  selectedLeaveType: "",
  mappingLeaveTypeData: function(dataResponse) {
    kony.print("mappingLeaveTypeData Data"+JSON.stringify(dataResponse));
    var lstMasterData=[];
    var data={};
    data.selectleavetype=dataResponse;
    for (var i = 0; i < data.selectleavetype.length; i++) {
      var btnLeaveTypeObj = new kony.ui.Button({
        id: "btnLeaveType" + data.selectleavetype[i].id,
        width: kony.flex.USE_PREFERRED_SIZE,
        centerY: "50%",
        height: "45%",
        skin: "sknBtn777777S28pxRoman",
        focusSkin: "sknBtnBg1C7393S28pxRoman",
        text: "  " + data.selectleavetype[i].name + "   ",
        "widgetAlignment": constants.WIDGET_ALIGN_CENTER,
        isVisible: true,
        onClick: function() {
          kony.apps.coe.ess.myLeave.applyLeave.LeaveType.onClickOfLeaveType(this);
        }
      }, {
        "padding": [0, 0, 0, 0],
        "marginInPixel": false,
        "paddingInPixel": false,
        "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT
      }, {});
      lstMasterData.push([data.selectleavetype[i].id,data.selectleavetype[i].name]);
      //frmApplyLeave.flxLeaveType.add(btnLeaveTypeObj);
    }
    frmApplyLeave.lstLeaveType.masterData=lstMasterData;
    // frmApplyLeave.flxLeaveType["btnLeaveType" + data.selectleavetype[0].id].skin = "sknBtnBg1C7393S28pxRoman";
    // frmApplyLeave.lblLeaveTypeBalance.text = "Available " + frmApplyLeave["btnLeaveType" + data.selectleavetype[0].id].text + " leave";
    frmApplyLeave.lblLeaveTypeBalance.text = "Available " + data.selectleavetype[0].id+ " leave";
    //this.onClickOfLeaveType(frmApplyLeave["btnLeaveType" + data.selectleavetype[0].id]);
    frmApplyLeave.lstLeaveType.selectedKey=	data.selectleavetype[0].id;
    //frmApplyLeave.lstLeaveType.onSelection=this.onClickOfLeaveType(frmApplyLeave.lstLeaveType.selectedKey)
    //this.selectedLeaveType = "btnLeaveType" + data.selectleavetype[0].id;
    this.selectedLeaveType =  data.selectleavetype[0].id;
    this.onClickOfLeaveType(data.selectleavetype[0].id);
  },

  onClickOfLeaveType: function(id) {

    if (this.selectedLeaveType !== undefined && this.selectedLeaveType !== "") {
      //frmApplyLeave[this.selectedLeaveType].skin = "sknBtn777777S28pxRoman";
      frmApplyLeave.lstLeaveType.selectedKey=id;
    }
    //frmApplyLeave[eventobject.id].skin = "sknBtnBg1C7393S28pxRoman";
    var leave_type_id = id;//parseInt((eventobject.id).split("btnLeaveType")[1]);
    this.selectedLeaveType = id;//eventobject.id;
    var sqlquery = "select * from employee_leave_type where leave_type_id = '" + leave_type_id + "'";
    kony.sync.single_select_execute(kony.sync.getDBName(), sqlquery, null, function(data) {
      if (data.length > 0 && data !== undefined && data[0].balance !== undefined) {
        frmApplyLeave.lblLeaveBalanceCount.text = ((Number(data[0].balance).toFixed(1))+"").replace(".",","); // - data[0].availed
        //remove frmApplyLeave.lblLeaveTypeBalance.text = data[0].balance - data[0].availed;
        //frmApplyLeave.lblLeaveTypeBalance.text = "Available " + frmApplyLeave[eventobject.id].text + " leave";
        //remove frmApplyLeave.lblLeaveTypeBalance.text = "Available " + id+ " leave";
        frmApplyLeave.lblLeaveTypeBalance.text = kony.i18n.getLocalizedString("i18n.ess.common.availed.valueKA")+" " + frmApplyLeave.lstLeaveType.selectedKeyValue[1];
        frmApplyLeave.flxLeaveBalanceDetails.isVisible = true;
      } else if(kony.apps.coe.ess.myLeave.applyLeave.LeaveType.selectedLeaveType == "XABS"){
      		frmApplyLeave.flxLeaveBalanceDetails.isVisible = false;
        	frmApplyLeave.lblLeaveBalanceCount.text = ("0").replace(".",",");
      }else {
        //frmApplyLeave.flxLeaveBalanceDetails.isVisible = false;
        frmApplyLeave.lblLeaveBalanceCount.text = ("0").replace(".",",");
        frmApplyLeave.lblLeaveTypeBalance.text = kony.i18n.getLocalizedString("i18n.ess.common.availed.valueKA")+" " + frmApplyLeave.lstLeaveType.selectedKeyValue[1];
        frmApplyLeave.flxLeaveBalanceDetails.isVisible = true;
      }
    }, function(err) {
      handleError(err);
    }, false);
  },

};
kony.apps.coe.ess.myLeave.applyLeave.fullDayHoursSelection = {

  selectedItem: "",
  start_time: "",
  end_time: "",
  hours: "",

  onClickOfFullDay: function() {
    frmApplyLeave.flxHalfDay.isVisible = false;
    frmApplyLeave.flxTimeLayout.isVisible = false;
    frmApplyLeave.btnHalfDay.skin = "sknBtn777777S28pxRoman";
    frmApplyLeave.btnHours.skin = "sknBtn777777S28pxRoman";
    frmApplyLeave.btnFullDay.skin = "sknBtnBg1C7393S28pxRoman";
    frmApplyLeave.flxTimeline.isVisible = false;
    frmApplyLeave.lblTopSep.isVisible = false;
    this.selectedItem = "fullday";
    this.updateDurationFullDay();
  },

  onClickOfHours: function() {

    var start_date = kony.apps.coe.ess.myLeave.applyLeave.preShow.startDate;
    var end_date = kony.apps.coe.ess.myLeave.applyLeave.preShow.endDate;
    frmApplyLeave.flxHalfDay.isVisible = false;
    frmApplyLeave.flxTimeLayout.isVisible = false;
    frmApplyLeave.btnHalfDay.skin = "sknBtn777777S28pxRoman";
    if (frmApplyLeave.flxRecurringLeave.imgRecurringOn.isVisible) {
      frmApplyLeave.btnFullDay.skin = "sknBtn777777S28pxRoman";
      frmApplyLeave.btnHours.skin = "sknBtnBg1C7393S28pxRoman";
      frmApplyLeave.lblDurationHours.text = "2 "+kony.i18n.getLocalizedString("i18n.ess.common.hours.valueKA");
      frmApplyLeave.flxTimeline.removeAll();
      kony.apps.coe.Reusable.createTimeline.setStartandEndTime();
      kony.apps.coe.Reusable.createTimeline.TimelineUI(frmApplyLeave.flxTimeline);
      //frmApplyLeave.flxTimeline.isVisible = true;
      frmApplyLeave.lblTopSep.isVisible = true;
      this.selectedItem = "hours";
      this.start_time = "080000";
      this.end_time = "100000";
      this.hours = 2.0;
    } else {
      if (new Date(start_date).compareOnlyDate(new Date(end_date)) !== 0) {
        return;
      }
      frmApplyLeave.btnFullDay.skin = "sknBtn777777S28pxRoman";
      frmApplyLeave.btnHours.skin = "sknBtnBg1C7393S28pxRoman";
      frmApplyLeave.lblDurationHours.text = "2 "+kony.i18n.getLocalizedString("i18n.ess.common.hours.valueKA");
      frmApplyLeave.flxTimeline.removeAll();
      kony.apps.coe.Reusable.createTimeline.setStartandEndTime();
      kony.apps.coe.Reusable.createTimeline.TimelineUI(frmApplyLeave.flxTimeline);
     // frmApplyLeave.flxTimeline.isVisible = true;
      frmApplyLeave.lblTopSep.isVisible = true;
      this.selectedItem = "hours";
      this.start_time = "080000";
      this.end_time = "100000";
      this.hours = 2.0;
    }
  },
  onClickofHoursSel : function(startTime,endTime,hour){
    if(hour === undefined){
      frmApplyLeave.btnFrom.text = "08:00";
      frmApplyLeave.btnTo.text = "10:00";
      frmApplyLeave.pickTime.selectedKeys=["h8","m0"];
      frmApplyLeave.pickTime2.selectedKeys=["h10","m0"];
	  var fromDate = String(frmApplyLeave.lblFromDate.text).split(" ");
    var getMonthFrom = Date.getshortMonthNumber(kony.store.getItem("localeToBeSetLeave"),fromDate[1]);
	  var toDate = String(frmApplyLeave.lblToDate.text).split(" ");
    var getMonthTo = Date.getshortMonthNumber(kony.store.getItem("localeToBeSetLeave"),toDate[1]);
	  var fromMonth = getMonthFrom+1;//Number(new Date(getMonthFrom+"-1-01").getMonth())+1;
	  var toMonth = getMonthTo+1;//Number(new Date(getMonthTo+"-1-01").getMonth())+1;
	  kony.apps.coe.ess.myLeave.applyLeave.diffinTimeSelected("08","00","10","00",fromDate[2],fromMonth,fromDate[0],
                                                          toDate[2],toMonth,toDate[0]);
      frmApplyLeave.lblDurationHours.text  = "2 "+kony.i18n.getLocalizedString("i18n.ess.common.hours.valueKA");
      this.start_time = "080000";
      this.end_time = "100000";
      this.hours = 2.0;
    }else{
      frmApplyLeave.btnFrom.text = String(startTime).substring(0,2)+":"+String(startTime).substring(2,4);
      frmApplyLeave.btnTo.text = String(endTime).substring(0,2)+":"+String(endTime).substring(2,4); //10:00";
      frmApplyLeave.pickTime.selectedKeys=["h"+parseInt(String(startTime).substring(0,2)),"m"+parseInt(String(startTime).substring(2,4))];
      frmApplyLeave.pickTime2.selectedKeys=["h"+parseInt(String(endTime).substring(0,2)),"m"+parseInt(String(endTime).substring(2,4))];
      frmApplyLeave.lblDurationHours.text =  hour+" "+kony.i18n.getLocalizedString("i18n.ess.common.hours.valueKA");
      this.start_time = kony.apps.coe.ess.myLeave.applyLeave.updateTimeWithMins(startTime);
      this.end_time = kony.apps.coe.ess.myLeave.applyLeave.updateTimeWithMins(endTime);
      this.hours = hour;
    }
    frmApplyLeave.flxHalfDay.isVisible = true;
    if(frmApplyLeave.btnHours.skin !== "sknBtnBg1C7393S28pxRoman"){
      frmApplyLeave.flxHalfDay.isVisible = true;
      frmApplyLeave.btnFullDay.skin = "sknBtn777777S28pxRoman";
      frmApplyLeave.btnHours.skin = "sknBtnBg1C7393S28pxRoman";
      frmApplyLeave.btnHalfDay.skin = "sknBtn777777S28pxRoman";

    }else{
      frmApplyLeave.flxHalfDay.isVisible = false;
      frmApplyLeave.flxTimeLayout.isVisible = false;
      frmApplyLeave.btnFullDay.skin = "sknBtn777777S28pxRoman";
      frmApplyLeave.btnHours.skin = "sknBtn777777S28pxRoman";
      frmApplyLeave.btnHalfDay.skin = "sknBtn777777S28pxRoman";
    }

    this.selectedItem = "hours";

  },

  onClickofHalfDay : function(startTime,endTime,hour){
    if(hour === undefined){
      frmApplyLeave.btnFrom.text = "08:00";
      frmApplyLeave.btnTo.text = "12:00";
      frmApplyLeave.pickTime.selectedKeys=["h8","m0"];
      frmApplyLeave.pickTime2.selectedKeys=["h12","m0"];
	  var fromDate = String(frmApplyLeave.lblFromDate.text).split(" ");
    var getMonthFrom = Date.getshortMonthNumber(kony.store.getItem("localeToBeSetLeave"),fromDate[1]);
	  var toDate = String(frmApplyLeave.lblToDate.text).split(" ");
    var getMonthTo = Date.getshortMonthNumber(kony.store.getItem("localeToBeSetLeave"),toDate[1]);
	  var fromMonth = getMonthFrom+1;//Number(new Date(getMonthFrom+"-1-01").getMonth())+1;
	  var toMonth = getMonthTo+1;//Number(new Date(getMonthTo+"-1-01").getMonth())+1;
	  kony.apps.coe.ess.myLeave.applyLeave.diffinTimeSelected("08","00","12","00",fromDate[2],fromMonth,fromDate[0],
                                                          toDate[2],toMonth,toDate[0]);
      frmApplyLeave.lblDurationHours.text  = "4 "+kony.i18n.getLocalizedString("i18n.ess.common.hours.valueKA");
      this.start_time = "080000";
      this.end_time = "120000";
      this.hours = 4.0;
    }else{
      frmApplyLeave.btnFrom.text = String(startTime).substring(0,2)+":"+String(startTime).substring(2,4);
      frmApplyLeave.btnTo.text = String(endTime).substring(0,2)+":"+String(endTime).substring(2,4); //10:00";
      frmApplyLeave.pickTime.selectedKeys=["h"+parseInt(String(startTime).substring(0,2)),"m"+parseInt(String(startTime).substring(2,4))];
      frmApplyLeave.pickTime2.selectedKeys=["h"+parseInt(String(endTime).substring(0,2)),"m"+parseInt(String(endTime).substring(2,4))];
      frmApplyLeave.lblDurationHours.text =  hour+" "+kony.i18n.getLocalizedString("i18n.ess.common.hours.valueKA");
      this.start_time = kony.apps.coe.ess.myLeave.applyLeave.updateTimeWithMins(startTime);
      this.end_time = kony.apps.coe.ess.myLeave.applyLeave.updateTimeWithMins(endTime);
      this.hours = hour;
    }
    frmApplyLeave.flxHalfDay.isVisible = true;
    if(frmApplyLeave.btnHalfDay.skin !== "sknBtnBg1C7393S28pxRoman"){
      frmApplyLeave.flxHalfDay.isVisible = true;
      frmApplyLeave.btnFullDay.skin = "sknBtn777777S28pxRoman";
      frmApplyLeave.btnHours.skin = "sknBtn777777S28pxRoman";
      frmApplyLeave.btnHalfDay.skin = "sknBtnBg1C7393S28pxRoman";

    }else{
      frmApplyLeave.flxHalfDay.isVisible = false;
      frmApplyLeave.flxTimeLayout.isVisible = false;
      frmApplyLeave.btnFullDay.skin = "sknBtn777777S28pxRoman";
      frmApplyLeave.btnHours.skin = "sknBtn777777S28pxRoman";
      frmApplyLeave.btnHalfDay.skin = "sknBtn777777S28pxRoman";
    }

    frmApplyLeave.flxTimeline.isVisible = false;
    this.selectedItem = "hours";

  },


  updateDuration: function(hours, start_time, end_time) {
    this.start_time = start_time;
    this.end_time = end_time;
    this.hours = hours;
    frmApplyLeave.lblDurationHours.text = hours + " "+kony.i18n.getLocalizedString("i18n.ess.common.hours.valueKA");
    // 1 is added as break hour
    if (hours >= kony.apps.coe.ess.appconfig.workingHours + 1) {
      this.onClickOfFullDay();
    }

  },

  updateDurationFullDay: function() {
    var hours;
    if (kony.apps.coe.ess.myLeave.applyLeave.preShow.endDate !== null) {
      var day = 1000 * 60 * 60 * 24;
      var start_date = new Date(kony.apps.coe.ess.myLeave.applyLeave.preShow.startDate);
      var end_date = new Date(kony.apps.coe.ess.myLeave.applyLeave.preShow.endDate);
      var diff = end_date.getTime() - start_date.getTime();
      var startDateStringFormat = kony.apps.coe.ess.myLeave.applyLeave.submitLeave.convertdateObjToDbString(start_date);
      var endDateStringFormat = kony.apps.coe.ess.myLeave.applyLeave.submitLeave.convertdateObjToDbString(end_date);
      //hours = ((diff/day)+1)*8 + " hours";
      kony.print(frmApplyLeave.lblFromDate.text +" "+ frmApplyLeave.lblToDate.text + ": "+end_date);
      if((frmApplyLeave.lblFromDate.text === frmApplyLeave.lblToDate.text) || end_date === null){
           hours = "1 "+kony.i18n.getLocalizedString("i18.ess.frmTeamView.day");
           frmApplyLeave.lblDurationHours.text = hours;
      	}else if((frmApplyLeave.lblFromDate.text !== frmApplyLeave.lblToDate.text) || end_date !== null){
          var sqlQuery = "select Holiday_Date as holiday_date from Holiday where Holiday_Date between '" + startDateStringFormat +
              "' AND '" + endDateStringFormat + "'";
          kony.sync.single_select_execute(kony.sync.getDBName(), sqlQuery, null, (this.onSuccessOfHolidaySrv).bind(this), function(err) {
            kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
            handleError(err);
          }, false);
        }

       if ((diff / day) <= 0) {
        this.hours = ((diff / day) + 1) * kony.apps.coe.ess.appconfig.workingHours;
        hours = ((diff / day) + 1) + " "+kony.i18n.getLocalizedString("i18.ess.frmTeamView.day");
        frmApplyLeave.lblDurationHours.text = hours;
      }
    }

    this.start_time = "080000";
    this.end_time = "170000";
    //frmApplyLeave.lblDurationHours.text = hours; code added in conditional loops
  },
  onSuccessOfHolidaySrv : function(response) {
    kony.print("holidays response"+JSON.stringify(response));
    holidays = response;
    var day = 1000 * 60 * 60 * 24;
    var start_date = new Date(kony.apps.coe.ess.myLeave.applyLeave.preShow.startDate);
    var end_date = new Date(kony.apps.coe.ess.myLeave.applyLeave.preShow.endDate);
    var diff = end_date.getTime() - start_date.getTime();
    hours = ((diff / day)+1);
    if(Number(holidays.length) > 0){
      hours = ((diff / day)+1) - Number(holidays.length);
    }
    this.hours = hours * kony.apps.coe.ess.appconfig.workingHours;
    if(hours == 1){
      hours = "1 "+kony.i18n.getLocalizedString("i18.ess.frmTeamView.day");
    }else{
      hours = hours+" "+kony.i18n.getLocalizedString("i18.ess.frmTeamView.days");
    }
    frmApplyLeave.lblDurationHours.text = hours;
  }
};
kony.apps.coe.ess.myLeave.applyLeave.staticAttachmentImg = {

  setImgPlus: function() {
    var flxProof = new kony.ui.FlexContainer({
      "autogrowMode": kony.flex.AUTOGROW_NONE,
      "clipBounds": true,
      "height": "100%",
      "id": "flxAddImage",
      "isVisible": true,
      "layoutType": kony.flex.FREE_FORM,
      "left": "0%",
      "skin": "slFbox",
      "top": "0%",
      "width": "30%",
      "onClick": function() {
        kony.apps.coe.ess.myLeave.applyLeave.Attachment.onClickOfCamera();
      }
    }, {}, {});
    flxProof.setDefaultUnit(kony.flex.DP);
    var flxBorder = new kony.ui.FlexContainer({
      "autogrowMode": kony.flex.AUTOGROW_NONE,
      "centerX": "50%",
      "centerY": "50%",
      "clipBounds": true,
      "height": "80%",
      "id": "flxBorder",
      "isVisible": true,
      "layoutType": kony.flex.FREE_FORM,
      "skin": "sknFlx2EBAEFBorder2Px",
      "width": "80%",
      "zIndex": 2
    }, {}, {});
    flxBorder.setDefaultUnit(kony.flex.DP);
    var imgProof = new kony.ui.Image2({
      "centerX": "50%",
      "centerY": "50%",
      "height": "40dp",
      "id": "imgAdd",
      "isVisible": true,
      "left": "0%",
      "top": "5%",
      "width": "40dp",
      "zIndex": 1,
      "src": "blueplusshape.png"
    }, {
      "imageScaleMode": constants.IMAGE_SCALE_MODE_FIT_TO_DIMENSIONS,
      "padding": [0, 0, 0, 0],
      "paddingInPixel": false
    }, {});
    flxBorder.add(imgProof);
    flxProof.add(flxBorder);
    frmApplyLeave.flxAddAtachment.add(flxProof);
    frmApplyLeave.flxAddAtachment.height="0%";
  }

};
kony.apps.coe.ess.myLeave.applyLeave.Attachment = {

  proofData: [],
  deletedData: [],

  onClickOfCamera: function() {
    frmApplyLeave.flxCameraOptions.isVisible = true;
    frmApplyLeave.flxCameraOptions.animate(
      kony.ui.createAnimation({

        "100": {
          "top": "0%",
          "stepConfig": {
            "timingFunction": kony.anim.EASE
          }
        }
      }), {
        "delay": 0,
        "iterationCount": 1,
        "fillMode": kony.anim.FILL_MODE_FORWARDS,
        "duration": 0
      }, {
        "animationEnd": function() {}
      });

  },
	// media id attached for multiple attachment issue
  onClickOfTakePicture: function(base64String,mediaid) {

    kony.application.showLoadingScreen(null, "Loading", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, false, true, {
      enableMenuKey: false,
      enableBackKey: false
    });
    var mediaidval=null;
    if(mediaid != ""){
      mediaidval=mediaid;
    }
    if (base64String !== null) {
      var proofImage = kony.convertToRawBytes(base64String);
      this.proofData.push({
        "imgProof": base64String,
        "id": "",
        "leave_id": null,
        "media_id": mediaidval
      });
      kony.apps.coe.ess.myLeave.applyLeave.AddAttachment.add(this.proofData);
      kony.application.dismissLoadingScreen();
    }
  },
  gallerySelectionCallback: function(rawBytes, permissionStatus) {
    kony.print("-- gallerySelectionCallback:  Start--");
    if (rawBytes !== null) {
      var base64 = kony.convertToBase64(rawBytes);
      if ((base64 !== null) && (base64 !== undefined) && (base64 !== "")) {
        this.onClickOfTakePicture(base64,"");
      } else if (permissionStatus == kony.application.PERMISSION_DENIED) {
        alert("Permission Denied to Access the Photo Gallery");
      } else {
        alert("No Image Selected !");
      }
    }
    kony.print("-- gallerySelectionCallback:  End--");
  },

  onClickOfSelecfromGallery: function() {
    kony.print("-- showMediaGallery:  Start--");
    var queryContext = {
      mimetype: "image/png"
    };
    try {
      kony.phone.openMediaGallery(this.gallerySelectionCallback.bind(this), queryContext);
    } catch (error) {
      handleError(error);
    }
    kony.print("-- showMediaGallery:  End--");
  },

  onClickOfCancel: function() {
    frmApplyLeave.flxCameraOptions.animate(
      kony.ui.createAnimation({

        "100": {
          "top": "100%",
          "stepConfig": {
            "timingFunction": kony.anim.EASE
          }
        }
      }), {
        "delay": 0,
        "iterationCount": 1,
        "fillMode": kony.anim.FILL_MODE_FORWARDS,
        "duration": 0
      }, {
        "animationEnd": function() {}
      });
    frmApplyLeave.flxCameraOptions.isVisible = false;
  }

};
kony.apps.coe.ess.myLeave.applyLeave.AddAttachment = {

  lastIndex: 0,

  add: function(data) {

    for (var i = this.lastIndex; i < data.length; i++) {
      var flxProof = new kony.ui.FlexContainer({
        "autogrowMode": kony.flex.AUTOGROW_NONE,
        "clipBounds": true,
        "height": "100%",
        "id": "flxProof" + i,
        "isVisible": true,
        "layoutType": kony.flex.FREE_FORM,
        "left": "0%",
        "skin": "slFbox",
        "top": "0%",
        "width": "30%"
      }, {}, {});
      flxProof.setDefaultUnit(kony.flex.DP);
      kony.print("--End Creating flxPage1--");
      var flxBorder = new kony.ui.FlexContainer({
        "autogrowMode": kony.flex.AUTOGROW_NONE,
        "centerX": "50%",
        "centerY": "50%",
        "clipBounds": true,
        "height": "80%",
        "id": "flxBorder" + i,
        "isVisible": true,
        "layoutType": kony.flex.FREE_FORM,
        "skin": "sknFlx2ebaefBr2px",
        "width": "80%",
        "zIndex": 2
      }, {}, {});
      flxBorder.setDefaultUnit(kony.flex.DP);
      kony.print("--Start Creating imgReceipt--");
      var imgProof = new kony.ui.Image2({
        "centerX": "50%",
        "centerY": "50%",
        "height": "98%",
        "id": "imgProof" + i,
        "isVisible": true,
        "left": "0%",
        "top": "5%",
        "width": "85%",
        "zIndex": 1
      }, {
        "imageScaleMode": constants.IMAGE_SCALE_MODE_MAINTAIN_ASPECT_RATIO,
        "padding": [0, 0, 0, 0],
        "paddingInPixel": false
      }, {});
      kony.print("--End Creating imgReceipt--");
      flxBorder.add(imgProof);
      var deleteVisibility;
      if (kony.apps.coe.ess.myLeave.applyLeave.preShow.selectedLeaveId !== null && kony.apps.coe.ess.myLeave.applyLeave.preShow.selectedLeaveId !== undefined && kony.apps.coe.ess.myLeave.applyLeave.preShow.selectedLeaveId !== "") {
        deleteVisibility = false;
      } else {
        deleteVisibility = true;
      }
      var btnDelete = new kony.ui.Button({
        "focusSkin": "sknbtnff6e5f20",
        "height": "18dp",
        "id": "btnDelete" + i,
        "isVisible": deleteVisibility,
        "right": "10%",
        "skin": "sknbtnff6e5f20",
        "text": "X",
        "top": "7%",
        "width": "20dp",
        "zIndex": 4,
        "onClick": function() {
          kony.apps.coe.ess.myLeave.applyLeave.AddAttachment.deleteAttachment(this);
        }
      }, {
        "contentAlignment": constants.CONTENT_ALIGN_CENTER,
        "displayText": true,
        "padding": [0, 0, 0, 0],
        "paddingInPixel": false
      }, {});
      flxProof.add(flxBorder, btnDelete);
      if (kony.apps.coe.ess.globalVariables.isNativeTablet === true) {
        frmTabApplyLeave.flxAddAtachment.addAt(flxProof, i);
        frmTabApplyLeave["imgProof" + i].rawBytes = kony.convertToRawBytes(data[i].imgProof);
      }
      else{
        frmApplyLeave.flxAddAtachment.addAt(flxProof, i);
        if (data[i].imgProof !== "undefined" && data[i].imgProof !== null && data[i].imgProof !== undefined) {
          frmApplyLeave["imgProof" + i].rawBytes = kony.convertToRawBytes(data[i].imgProof);
          frmApplyLeave["imgProof" + i].onTouchEnd=function(event){
              frmApplyLeave.flxBigImage.isVisible=true;
              frmApplyLeave.imgBigImage.isVisible=true;
              frmApplyLeave.imgBigImage.rawBytes=this.rawBytes;
          };
        }
      }
      data[i].id = "flxProof" + i;
      this.lastIndex++;
    }
    if (kony.apps.coe.ess.globalVariables.isNativeTablet === true) {
      frmTabApplyLeave.flxCameraOptions.isVisible = false;
      frmTabApplyLeave.flxAddAtachment.isVisible = true;
      //frmTabApplyLeave.imgCamera.isVisible = false;
    }
    else{
      frmApplyLeave.flxCameraOptions.isVisible = false;
      if(kony.apps.coe.ess.myLeave.applyLeave.AddAttachment.lastIndex === 0){
        frmApplyLeave.flxAddAtachment.isVisible = false;
        frmApplyLeave.imgCamera.isVisible = true;
      }
      else{
        frmApplyLeave.flxAddAtachment.isVisible = true;
        frmApplyLeave.imgCamera.isVisible = false;
      }
      frmApplyLeave.flxAddAtachment.height="18%";
    }
  },

  deleteAttachment: function(eventobject) {
    var id = eventobject.id.split("btnDelete");
    frmApplyLeave.flxAddAtachment.remove(frmApplyLeave.flxAddAtachment["flxProof" + id[1]]);
    frmApplyLeave.forceLayout();
    id = "flxProof" + id[1];
    var index = kony.apps.coe.ess.myLeave.applyLeave.Attachment.proofData.map(function(d) {
      return d['id'];
    }).indexOf(id);
    kony.apps.coe.ess.myLeave.applyLeave.Attachment.proofData.splice(index, 1);
    this.lastIndex--;
    if (kony.apps.coe.ess.myLeave.applyLeave.Attachment.proofData.length <= 0) {
      frmApplyLeave.flxAddAtachment.isVisible = false;
      frmApplyLeave.imgCamera.isVisible = true;
    }
  }
};

kony.apps.coe.ess.myLeave.applyLeave.MailandPhone = {

  onClickOfMail: function() {
    try {
      if (kony.apps.coe.ess.myLeave.applyLeave.preShow.mailId !== "" && kony.apps.coe.ess.myLeave.applyLeave.preShow.mailId !== undefined && kony.apps.coe.ess.myLeave.applyLeave.preShow.mailId !== null) {
        var toRecepient = [kony.apps.coe.ess.myLeave.applyLeave.preShow.mailId];
        var ccRecepient = [];
        var bccRecepient = [];
        var subject = "Leave Request- " + kony.apps.coe.ess.globalVariables.employeeName;
        var messageBody = [];
        var isMessageBodyHTML = false;
        var attachment = [];
        try {
          kony.phone.openEmail(toRecepient, ccRecepient, bccRecepient, subject, messageBody, isMessageBodyHTML, attachment);
        } catch(err) {
          toastMsg.showToastMsg(err.errormessage, 3000);
        }
      }
    } catch (err) {
      handleError(err);
    }
  },

  onClickOfPhone: function() {
    try {
      if (kony.apps.coe.ess.myLeave.applyLeave.preShow.phoneNumber !== "" && kony.apps.coe.ess.myLeave.applyLeave.preShow.phoneNumber !== undefined && kony.apps.coe.ess.myLeave.applyLeave.preShow.phoneNumber !== null) {
        kony.phone.dial(kony.apps.coe.ess.myLeave.applyLeave.preShow.phoneNumber);
      }
    } catch (err) {
      handleError(err);
    }
  }
};

kony.apps.coe.ess.myLeave.applyLeave.submitLeave = {

  month_number: {
    "jan": "01",
    "feb": "02",
    "mar": "03",
    "apr": "04",
    "may": "05",
    "jun": "06",
    "jul": "07",
    "aug": "08",
    "sep": "09",
    "oct": "10",
    "nov": "11",
    "dec": "12"
  },
  ScopeObject: "",
  imgIndex: 0,
  leaveEntryData: {},
  convertdateObjToDbString: function(date) {
    try {
      date = new Date(Date.parse(date));
      var tempDate = date.getDate();
      if (tempDate < 10) {
        tempDate = ("0" + tempDate).toString().trim(0, 2);
      } else {
        tempDate = tempDate.toString().trim(0, 2);
      }
      var tempMonth = date.getMonth() + 1;
      if (tempMonth < 10) {
        tempMonth = ("0" + tempMonth).toString().trim(0, 2);
      } else {
        tempMonth = tempMonth.toString().trim(0, 2);
      }
      var tempYear = date.getFullYear().toString().trim(0, 4);

      var return_date = tempYear + tempMonth + tempDate;
      return return_date;
    } catch (e) {
      kony.print("Error" + JSON.stringify(e));
    }

  },
  recurringSubmit: function() {
    var startDate = (kony.apps.coe.ess.myLeave.applyLeave.preShow.startDate);
    startDate = new Date(Date.parse(startDate));
    var endDate = (kony.apps.coe.ess.myLeave.applyLeave.preShow.endDate);
    endDate = new Date(Date.parse(endDate));
    var currentDate = new Date();
    var recurring_id = "RECUR_V3_" + currentDate.getTime();
    var leave_id = "";
    var startDateStringFormat = this.convertdateObjToDbString(startDate);
    var endDateStringFormat = this.convertdateObjToDbString(endDate);
    var sqlQuery = "select Holiday_Date as holiday_date from Holiday where Holiday_Date between '" + startDateStringFormat +
        "' AND '" + endDateStringFormat + "'";
    var dates = {
      "sDate": startDate,
      "eDate": endDate
    };
    kony.sync.single_select_execute(kony.sync.getDBName(), sqlQuery, null, (this.onSuccessOfHoliday).bind(this, dates), function(err) {
      kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
      handleError(err);
    }, false);
  },


  onSuccessOfHoliday: function(dates, response) {
    var biweeklyOccurrence = {
      "isValid": true,
      "Weekday": ""
    };
    var allSelectedData = [];
    var currentDate = new Date();
    var recurring_id = "RECUR_V3_" + currentDate.getTime();
    var leave_id = "";
    var date = dates.sDate;
    if (date <= dates.eDate) {
      var start_date = this.convertdateObjToDbString(date);
      var end_date = this.convertdateObjToDbString(date);
      var isHoliday = false;
      for (var i = 0; i < response.length; i++) {
        if (response[i].holiday_date == start_date) {
          isHoliday = true;
          break;
        }
      }
      if (!isHoliday) {
        if (kony.apps.coe.ess.myLeave.applyLeave.RecurringLeave.currentSelectedOption == "daily") {
          currentDate = new Date();
          leave_id = "MYLEAVE_V2_" + start_date + "_T_" + currentDate.getMilliseconds();
          this.onClickOfSubmit(start_date, end_date, recurring_id, leave_id, dates, response);
        } else if (kony.apps.coe.ess.myLeave.applyLeave.RecurringLeave.currentSelectedOption == "weekly") {
          var selectedDays = kony.apps.coe.ess.myLeave.applyLeave.weeklyMonthlyDaySelection.getSelectedWeekDays();
          var weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
          var isLeave = false;
          for (var a = 0; a < selectedDays.length; a++) {
            if (weekdays[date.getDay()].toLowerCase() == selectedDays[a].toLowerCase()) {
              currentDate = new Date();
              isLeave = true;
              leave_id = "MYLEAVE_V2_" + start_date + "_T_" + currentDate.getMilliseconds();
              this.onClickOfSubmit(start_date, end_date, recurring_id, leave_id, dates, response);
              break;
            }
          }
          if (isLeave == false) {
            var date1 = dates.sDate;
            dates.sDate = new Date(Date.parse(date1) + 86400000);
            this.onSuccessOfHoliday(dates, response);
          }
        } else if (kony.apps.coe.ess.myLeave.applyLeave.RecurringLeave.currentSelectedOption == "biweekly") {
          if (dates.biweeklyData != undefined && dates.biweeklyData != null && dates.biweeklyData != "") {
            biweeklyOccurrence = dates.biweeklyData;
          }
          var selectedDays = kony.apps.coe.ess.myLeave.applyLeave.weeklyMonthlyDaySelection.getSelectedWeekDays();
          var weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
          if (biweeklyOccurrence.Weekday === weekdays[date.getDay()].toLowerCase() && biweeklyOccurrence.isValid === true) {
            biweeklyOccurrence.isValid = false;
          } else if (biweeklyOccurrence.Weekday === weekdays[date.getDay()].toLowerCase() && biweeklyOccurrence.isValid === false) {
            biweeklyOccurrence.isValid = true;
          }
          var isLeave = false;
          for (var a = 0; a < selectedDays.length; a++) {
            if (weekdays[date.getDay()].toLowerCase() == selectedDays[a].toLowerCase() && biweeklyOccurrence.isValid === true) {
              if (biweeklyOccurrence.Weekday === "") {
                biweeklyOccurrence.Weekday = weekdays[date.getDay()].toLowerCase();
              }
              currentDate = new Date();
              isLeave = true;
              leave_id = "MYLEAVE_V2_" + start_date + "_T_" + currentDate.getMilliseconds();
              dates.biweeklyData = biweeklyOccurrence;
              this.onClickOfSubmit(start_date, end_date, recurring_id, leave_id, dates, response);
              break;
            }
          }
          if (isLeave == false) {
            var date1 = dates.sDate;
            dates.sDate = new Date(Date.parse(date1) + 86400000);
            this.onSuccessOfHoliday(dates, response);
          }
        }
      } else {
        var date1 = dates.sDate;
        dates.sDate = new Date(Date.parse(date1) + 86400000);
        this.onSuccessOfHoliday(dates, response);
      }
    } else {
      kony.apps.coe.ess.MyLeave.Footer.navigateFooter(1);
    }
  },

  onClickOfSubmit: function(IntervalStart_date, IntervalEnd_date, recurring_id, leave_id_recurrence, dates, holidayResponse) {

    kony.apps.coe.ess.myLeave.applyLeave.submitLeave.imgIndex = 0;
    var dataToForward = {};
    if (kony.apps.coe.ess.myLeave.applyLeave.preShow.endDate !== null && kony.apps.coe.ess.myLeave.applyLeave.preShow.endDate !== undefined) {
      var leaveEntryData = {};
      var date = (kony.apps.coe.ess.myLeave.applyLeave.preShow.startDate).split(" ");
      var lid;
      if (frmApplyLeave.flxRecurringLeave.imgRecurringOn.isVisible) {
        dataToForward.isRecuring = true;
        leaveEntryData.start_date = IntervalStart_date;
        leaveEntryData.end_date = IntervalEnd_date;
        leaveEntryData.recurrence_id = recurring_id;
        var day = 1000 * 60 * 60 * 24;
        var start_date = new Date(IntervalStart_date.substring(0, 4), IntervalStart_date.substring(4, 6) - 1, IntervalStart_date.substring(6, 8));
        var end_date = new Date(IntervalEnd_date.substring(0, 4), IntervalEnd_date.substring(4, 6) - 1, IntervalEnd_date.substring(6, 8));
        var duration = frmApplyLeave.lblDurationHours.text.split(" ")[1];
        if (duration == kony.i18n.getLocalizedString("i18.ess.frmTeamView.days") || duration == kony.i18n.getLocalizedString("i18.ess.frmTeamView.day")) {
          var diff = end_date.getTime() - start_date.getTime();
          leaveEntryData.no_of_hours = ((diff / day) + 1) * kony.apps.coe.ess.appconfig.workingHours;
        } else {
          leaveEntryData.no_of_hours = parseInt(frmApplyLeave.lblDurationHours.text.split(" ")[0]);
        }
        lid = leave_id_recurrence;
      } else {
        dataToForward.isRecuring = false;
        leaveEntryData.start_date = date[3] + this.month_number[date[1].toLowerCase()] + date[2];
        date = (kony.apps.coe.ess.myLeave.applyLeave.preShow.endDate).split(" ");
        leaveEntryData.end_date = date[3] + this.month_number[date[1].toLowerCase()] + date[2];
        leaveEntryData.no_of_hours = kony.apps.coe.ess.myLeave.applyLeave.fullDayHoursSelection.hours;
        leaveEntryData.recurrence_id = "";
        var dateTemp = new Date();
        lid = "MYLEAVE_V2_" + leaveEntryData.start_date + "_T_" + dateTemp.getMilliseconds();
      }
	  if(Number(leaveEntryData.no_of_hours) > 4 && frmApplyLeave.btnHalfDay.skin == "sknBtnBg1C7393S28pxRoman"){
       alert(kony.i18n.getLocalizedString("i18n.ess.MyLeave.frmApplyLeave.DurationExceedWarning")+" 4"  );//"Please select duration hours less than or equal to 4");
	  }else if(Number(leaveEntryData.no_of_hours) <= 0){
        alert(kony.i18n.getLocalizedString("i18n.ess.myLeave.frmApplyLeave.warningOnSubmit")); //("Please select a valid time duration");
      }else{
        dataToForward.start_date = leaveEntryData.start_date;
        dataToForward.end_date = leaveEntryData.end_date;
        //dataToForward.leave_type = (frmApplyLeave[kony.apps.coe.ess.myLeave.applyLeave.LeaveType.selectedLeaveType].text).trim();
        dataToForward.leave_type = (kony.apps.coe.ess.myLeave.applyLeave.LeaveType.selectedLeaveType).trim();
        leaveEntryData.leave_type_id = (kony.apps.coe.ess.myLeave.applyLeave.LeaveType.selectedLeaveType);//.split("btnLeaveType")[1];
        // var time = kony.apps.coe.ess.myLeave.applyLeave.convertTo24Hour(kony.apps.coe.ess.myLeave.applyLeave.fullDayHoursSelection.start_time);
        var startTime = kony.apps.coe.ess.myLeave.applyLeave.fullDayHoursSelection.start_time;
        var endTime = kony.apps.coe.ess.myLeave.applyLeave.fullDayHoursSelection.end_time;
        leaveEntryData.start_time = (startTime + "0000").replace(/\s/g, "");
        leaveEntryData.end_time = (endTime + "0000").replace(/\s/g, "");
        //leaveEntryData.end_time = (kony.apps.coe.ess.myLeave.applyLeave.convertTo24Hour(kony.apps.coe.ess.myLeave.applyLeave.fullDayHoursSelection.end_time) + "0000").replace(/\s/g, "");
        leaveEntryData.reason_desc = frmApplyLeave.txtComments.text;
        dataToForward.start_time = leaveEntryData.start_time;
        dataToForward.end_time = leaveEntryData.end_time;
        leaveEntryData.status_id = "7";

        var date1 = new Date();
        var timestamp = date1.getFullYear().toString().trim(0, 4) + "" + getTimeHourswithZero(date1.getMonth() + 1) + "" + getTimeHourswithZero(date1.getDate()) + "" + getTimeHourswithZero(date1.getHours()) + "" + getTimeHourswithZero(date1.getMinutes()) + "" + getTimeHourswithZero(date1.getSeconds());
        leaveEntryData.createdts = timestamp;
        leaveEntryData.lastmodifiedts = timestamp;
        date = new Date();
        var len = lid.length;
        leaveEntryData.id = lid;
        kony.apps.coe.ess.myLeave.applyLeave.leave_id = leaveEntryData.id;
        leaveEntryData.employee_id = kony.apps.coe.ess.globalVariables.employeeId;
        if (kony.apps.coe.ess.myLeave.applyLeave.preShow.selectedLeaveId !== null && kony.apps.coe.ess.myLeave.applyLeave.preShow.selectedLeaveId !== undefined) {
          leaveEntryData.id = kony.apps.coe.ess.myLeave.applyLeave.preShow.selectedLeaveId;
          kony.apps.coe.ess.myLeave.applyLeave.leave_id = leaveEntryData.id;
          this.leaveEntryData = leaveEntryData;
          dataToForward.isNewLeave = false;
          kony.application.showLoadingScreen("", "", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, {});
          kony.apps.coe.ess.MVVM.update("MYLEAVE", "leave", leaveEntryData, (this.leaveNoteUpdate).bind(this, dataToForward, dates, holidayResponse), (this.leaveUpdateError).bind(this));
        } else {
          this.leaveEntryData = leaveEntryData;
          dataToForward.isNewLeave = true;
          kony.application.showLoadingScreen("", "", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, {});
          kony.apps.coe.ess.MVVM.createRecord("MYLEAVE", "leave", leaveEntryData, (this.leaveNoteCreate).bind(this, dataToForward, dates, holidayResponse), (this.leaveCreateError).bind(this));
        }
      }
    }

  },
  leaveNoteCreate: function(dataToForward, dates, holidayResponse, response) {
    var data = {};
    data.employee_id = kony.apps.coe.ess.myLeave.applyLeave.submitLeave.leaveEntryData.employee_id;
    data.leave_id = response.id;
    data.comments = kony.apps.coe.ess.myLeave.applyLeave.submitLeave.leaveEntryData.reason_desc;
    if (data.comments !== "" && data.comments !== undefined && data.comments !== null) {
      var date = new Date();
      dataToForward.comment = data.comments;
      var timestamp = date.getFullYear().toString().trim(0, 4) + "" + getTimeHourswithZero(date.getMonth() + 1) + "" + getTimeHourswithZero(date.getDate()) + "" + getTimeHourswithZero(date.getHours()) + "" + getTimeHourswithZero(date.getMinutes()) + "" + getTimeHourswithZero(date.getSeconds());
      data.createdts = timestamp;
      kony.apps.coe.ess.MVVM.createRecord("MYLEAVE", "leave_note", data, kony.apps.coe.ess.myLeave.applyLeave.submitLeave.leaveCreateSuccess.bind(this, dataToForward, dates, holidayResponse), kony.apps.coe.ess.myLeave.applyLeave.submitLeave.leaveCreateError);
    } else {
      dataToForward.comment = " ";
      kony.apps.coe.ess.myLeave.applyLeave.submitLeave.leaveCreateSuccess(dataToForward, dates, holidayResponse);
    }
  },
  leaveNoteUpdate: function(dataToForward, dates, holidayResponse, response) {
    var data = {};
    data.employee_id = kony.apps.coe.ess.myLeave.applyLeave.submitLeave.leaveEntryData.employee_id;
    data.leave_id = kony.apps.coe.ess.myLeave.applyLeave.submitLeave.leaveEntryData.id;
    data.comments = kony.apps.coe.ess.myLeave.applyLeave.submitLeave.leaveEntryData.reason_desc;
//comenting Calendar Event Creation in Phone
//     var evtobj = {
//       type: "starting",
//       start: dataToForward.start_date.substring(6, 8) + "/" + dataToForward.start_date.substring(4, 6) + "/" + dataToForward.start_date.substring(0, 4) + " 00:00:00",
//       finish: dataToForward.end_date.substring(6, 8) + "/" + dataToForward.end_date.substring(4, 6) + "/" + dataToForward.end_date.substring(0, 4) + " 23:59:59"
//     };
//     var options = {};
//     var result = kony.application.checkPermission(kony.os.RESOURCE_CALENDAR,options);
//     if(result.status == kony.application.PERMISSION_DENIED) {
//       if(result.canRequestPermission){
//         kony.application.requestPermission(kony.os.RESOURCE_CALENDAR, permissionStatusCallback);
//       }
//       else{
//         var basicConfig = {
//           alertType : constants.ALERT_TYPE_CONFIRMATION,
//           message : kony.i18n.getLocalizedString("i18n.ess.common.enablePermissionSettings"),
//           alertHandler : alertCallback
//         }
//         var pspConfig={};
//         kony.ui.Alert(basicConfig,pspConfig);
//       }
//     }
//     else{
//       permissionStatusCallback(result);
//     }
//     function alertCallback(resp){
//       if(resp == true){
//         kony.application.openApplicationSettings();
//       }
//       permissionStatusCallback(result);
//     }
//     function permissionStatusCallback(response){
//       kony.print("permissionStatusCallback :: "+ JSON.stringify(response));
//       //50002 is permission granted and 500001 is permission denied.
//       if(response.status == true || response.status == 50002){
//         var events = kony.phone.findCalendarEvents(evtobj);
//         dataToForward.isPermissionStatus=true;
//         dataToForward.showPopup = true;
//         for (var eventNo = 0; eventNo < events.length; eventNo++) {
//           if (events[eventNo].summary.substring(0, 12) == kony.i18n.getLocalizedString("i18n.ess.common.MyLeaveApp.valueKA")) {
//             kony.phone.removeCalendarEvent(events[eventNo]);
//             dataToForward.showPopup = false;
//           }
//         }
//       }
//       else{
//         dataToForward.isPermissionStatus=false;
//       }

      dataToForward.comment = data.comments;
      if (data.comments !== "" && data.comments !== undefined && data.comments !== null && kony.apps.coe.ess.myLeave.applyLeave.preShow.currentComment != data.comments) {
        var date = new Date();
        var timestamp = date.getFullYear().toString().trim(0, 4) + "" + getTimeHourswithZero(date.getMonth() + 1) + "" + getTimeHourswithZero(date.getDate()) + "" + getTimeHourswithZero(date.getHours()) + "" + getTimeHourswithZero(date.getMinutes()) + "" + getTimeHourswithZero(date.getSeconds());
        data.createdts = timestamp;
        kony.apps.coe.ess.MVVM.createRecord("MYLEAVE", "leave_note", data, kony.apps.coe.ess.myLeave.applyLeave.submitLeave.leaveCreateSuccess.bind(this, dataToForward, dates, holidayResponse), kony.apps.coe.ess.myLeave.applyLeave.submitLeave.leaveCreateError);
      } else {
        kony.apps.coe.ess.myLeave.applyLeave.submitLeave.leaveCreateSuccess(dataToForward, dates, holidayResponse);
      }
//     }
  },
  leaveCreateSuccess: function(dataToForward, dates, holidayResponse, response) {
    kony.print("success" + JSON.stringify(response));
    function addLeaveToDevice(dataToForward) {
      var eventDetails = {
        summary: kony.i18n.getLocalizedString("i18n.ess.common.MyLeaveApp.valueKA") + " : " + dataToForward.leave_type,
        start: dataToForward.start_date.substring(6, 8) + "/" + dataToForward.start_date.substring(4, 6) + "/" + dataToForward.start_date.substring(0, 4) + " " + dataToForward.start_time.substring(0, 2) + ":" + dataToForward.start_time.substring(2, 4) + ":" + dataToForward.start_time.substring(4, 6),
        finish: dataToForward.end_date.substring(6, 8) + "/" + dataToForward.end_date.substring(4, 6) + "/" + dataToForward.end_date.substring(0, 4) + " " + dataToForward.end_time.substring(0, 2) + ":" + dataToForward.end_time.substring(2, 4) + ":" + dataToForward.end_time.substring(4, 6),
        alarm: 40,
        note: dataToForward.comment,
        access: "public"
      };
      var options = {};
      var result = kony.application.checkPermission(kony.os.RESOURCE_CALENDAR, options);
      if (result.status == kony.application.PERMISSION_DENIED) {
        if (result.canRequestPermission) {
          kony.application.requestPermission(kony.os.RESOURCE_CALENDAR, permissionStatusCallback);
        }
        else {
          var basicConfig = {
            alertType: constants.ALERT_TYPE_CONFIRMATION,
            message: kony.i18n.getLocalizedString("i18n.ess.common.enablePermissionSettings"),
            alertHandler: alertCallback
          }
          var pspConfig = {};
          kony.ui.Alert(basicConfig, pspConfig);
        }
      }
      else {
        permissionStatusCallback(result);
      }

      function alertCallback(resp) {
        if (resp == true) {
          kony.application.openApplicationSettings();
        }
        permissionStatusCallback(result)
      }
      function permissionStatusCallback(response) {
        kony.print("permissionStatusCallback :: " + JSON.stringify(response));
        //50002 is permission granted and 500001 is permission denied.
        if (response.status == true || response.status == 50002) {
          kony.phone.addCalendarEvent(eventDetails);
        }
        //Dismiss Popup
        frmLeaveHome.flxAddToDeviceCalendarPopupMain.isVisible = false;
        frmLeaveHome.flxLeaveHomeMain.setEnabled = true;
      }
    }

    function closeAddLeaveToDevicePopup() {
      //Dismiss Popup
      frmLeaveHome.flxAddToDeviceCalendarPopupMain.isVisible = false;
      frmLeaveHome.flxLeaveHomeMain.setEnabled = true;
    }
    if (dataToForward.isNewLeave === true) {
      var currentDate = new Date();
      var tempDate = new Date(dataToForward.start_date.substring(0, 4), (parseInt(dataToForward.start_date.substring(4, 6)) - 1) + "", dataToForward.start_date.substring(6, 8), dataToForward.start_time.substring(0, 2), dataToForward.start_time.substring(2, 4), dataToForward.start_time.substring(4, 6));
      if (tempDate >= currentDate && dataToForward.isRecuring == false) {
        kony.application.dismissLoadingScreen();
        frmLeaveHome.btnClose.onClick = closeAddLeaveToDevicePopup.bind(this);
        frmLeaveHome.btnAdd.onClick = addLeaveToDevice.bind(this, dataToForward);
        var monthsJSON = Date.getMonthMapNumberToMonth;
        //Show Add to device calender popup after creating leave successfully
        frmLeaveHome.lblFromAndToLeaveDate.text = dataToForward.start_date.substring(6, 8) + " " + (monthsJSON[dataToForward.start_date.substring(4, 6) + ""]).substring(0, 3) + " - " + dataToForward.end_date.substring(6, 8) + " " + (monthsJSON[dataToForward.end_date.substring(4, 6) + ""]).substring(0, 3);
        frmLeaveHome.flxLeaveHomeMain.setEnabled = false;
        frmLeaveHome.flxAddToDeviceCalendarPopupMain.isVisible = false;
      }
    } else {
      kony.application.dismissLoadingScreen();
      if(dataToForward.isPermissionStatus==true){
        if (dataToForward.showPopup === true) {
          var currentDate = new Date();
          var tempDate = new Date(dataToForward.start_date.substring(0, 4), (parseInt(dataToForward.start_date.substring(4, 6)) - 1) + "", dataToForward.start_date.substring(6, 8), dataToForward.start_time.substring(0, 2), dataToForward.start_time.substring(2, 4), dataToForward.start_time.substring(4, 6));
          if (tempDate >= currentDate) {

            frmLeaveHome.btnClose.onClick = closeAddLeaveToDevicePopup.bind(this);
            frmLeaveHome.btnAdd.onClick = addLeaveToDevice.bind(this, dataToForward);
            var monthsJSON = Date.getMonthMapNumberToMonth;
            //Show Add to device calender popup after creating leave successfully
            frmLeaveHome.lblFromAndToLeaveDate.text = dataToForward.start_date.substring(6, 8) + " " + (monthsJSON[dataToForward.start_date.substring(4, 6) + ""]).substring(0, 3) + " - " + dataToForward.end_date.substring(6, 8) + " " + (monthsJSON[dataToForward.end_date.substring(4, 6) + ""]).substring(0, 3);
            frmLeaveHome.flxLeaveHomeMain.setEnabled = false;
            frmLeaveHome.flxAddToDeviceCalendarPopupMain.isVisible = false;
          }
        } else {
          var currentDate = new Date();
          var tempDate = new Date(dataToForward.start_date.substring(0, 4), (parseInt(dataToForward.start_date.substring(4, 6)) - 1) + "", dataToForward.start_date.substring(6, 8), dataToForward.start_time.substring(0, 2), dataToForward.start_time.substring(2, 4), dataToForward.start_time.substring(4, 6));
          if (tempDate >= currentDate) {
            //addLeaveToDevice(dataToForward);
          }
        }
      }
    }
    if (kony.net.isNetworkAvailable(constants.NETWORK_TYPE_ANY)) {
      kony.apps.coe.ess.frmLogin.mediaSync(kony.apps.coe.ess.myLeave.applyLeave.submitLeave.successSyncCreate.bind(this, dataToForward, dates, holidayResponse), function(err) {});
    } else {
      kony.apps.coe.ess.myLeave.applyLeave.submitLeave.successSyncCreate(dataToForward, dates, holidayResponse);
    }
  },
  successSyncCreate: function(dataToForward, dates, holidayResponse, res) {
    kony.apps.coe.ess.myLeave.applyLeave.submitLeave.ScopeObject = "MyLeave2";
    if (kony.apps.coe.ess.myLeave.applyLeave.submitLeave.imgIndex === 0) {
      kony.apps.coe.ess.myLeave.media.seq = 0;
    }
    if (kony.apps.coe.ess.myLeave.applyLeave.Attachment.proofData.length > 0 && kony.apps.coe.ess.myLeave.applyLeave.submitLeave.imgIndex < kony.apps.coe.ess.myLeave.applyLeave.Attachment.proofData.length) {
      var i = kony.apps.coe.ess.myLeave.applyLeave.submitLeave.imgIndex;
      if (kony.apps.coe.ess.myLeave.applyLeave.Attachment.proofData[i].leave_id === null && kony.apps.coe.ess.myLeave.applyLeave.Attachment.proofData[i].media_id === null) {
        (new kony.apps.coe.ess.myLeave.media()).updateBinaryContent(kony.apps.coe.ess.myLeave.applyLeave.Attachment.proofData[i].imgProof, kony.apps.coe.ess.myLeave.applyLeave.submitLeave.multipleImageUploadSuccess.bind(this, dataToForward, dates, holidayResponse), kony.apps.coe.ess.myLeave.applyLeave.submitLeave.mediaError.bind(this, dataToForward, dates, holidayResponse));
      } else {
        kony.apps.coe.ess.myLeave.applyLeave.submitLeave.multipleImageUploadSuccess(dataToForward, dates, holidayResponse);
      }
    }
    else {
      kony.apps.coe.ess.myLeave.applyLeave.submitLeave.mediaUploadSuccess(dataToForward, dates, holidayResponse);
    }
  },
  leaveCreateError: function(err) {
    kony.application.dismissLoadingScreen();
    kony.print(err);
    kony.apps.coe.ess.MyLeave.Footer.navigateFooter(1);
  },

  leaveUpdateSuccess: function(res) {
    if (kony.net.isNetworkAvailable(constants.NETWORK_TYPE_ANY)) {
      kony.apps.coe.ess.frmLogin.mediaSync(kony.apps.coe.ess.myLeave.applyLeave.submitLeave.successSyncCreate, function(err) {});
    } else {
      kony.apps.coe.ess.myLeave.applyLeave.submitLeave.successSyncCreate();
    }
  },

  leaveUpdateError: function(err) {
    kony.application.dismissLoadingScreen();
    kony.print(JSON.stringify(err));
    kony.apps.coe.ess.MyLeave.Footer.navigateFooter(1);
  },

  multipleImageUploadSuccess: function(dataToForward, dates, holidayResponse, res) {
    kony.apps.coe.ess.myLeave.applyLeave.submitLeave.imgIndex = kony.apps.coe.ess.myLeave.applyLeave.submitLeave.imgIndex + 1;
    kony.apps.coe.ess.myLeave.applyLeave.submitLeave.successSyncCreate(dataToForward, dates, holidayResponse);
  },

  mediaUploadSuccess: function(dataToForward, dates, holidayResponse, res) {
    try {
      if (kony.net.isNetworkAvailable(constants.NETWORK_TYPE_ANY)) {
        kony.apps.coe.ess.frmLogin.mediaSync(kony.apps.coe.ess.myLeave.applyLeave.submitLeave.successCreation.bind(this, dataToForward, dates, holidayResponse), function(err) {});
      } else {
        kony.application.dismissLoadingScreen();
        if (kony.application.getCurrentForm().id === "frmApplyLeave") {
          if (dataToForward.isRecuring == true) {
            var date = dates.sDate;
            dates.sDate = new Date(Date.parse(date) + 86400000);
            this.onSuccessOfHoliday(dates, holidayResponse);
          } else {
            kony.apps.coe.ess.MyLeave.Footer.navigateFooter(1);
          }
        }
      }
    } catch (err) {
      handleError(err);
    }
    kony.print("-- profilePictureSuccessCallBack: End --");

  },

  mediaError: function(dataToForward, dates, holidayResponse, err) {
    kony.application.dismissLoadingScreen();
    if (kony.application.getCurrentForm().id === "frmApplyLeave") {
      if (dataToForward.isRecuring == true) {
        var date = dates.sDate;
        dates.sDate = new Date(Date.parse(date) + 86400000);
        this.onSuccessOfHoliday(dates, holidayResponse);
      } else {
        kony.apps.coe.ess.MyLeave.Footer.navigateFooter(1);
      }
    }
    kony.apps.coe.ess.myLeave.applyLeave.submitLeave.imgIndex = kony.apps.coe.ess.myLeave.applyLeave.submitLeave.imgIndex + 1;
    kony.apps.coe.ess.myLeave.applyLeave.submitLeave.successSyncCreate(dataToForward, dates, holidayResponse);
  },

  successCreation: function(dataToForward, dates, holidayResponse, res) {
    kony.application.dismissLoadingScreen();
    if (kony.application.getCurrentForm().id === "frmApplyLeave") {
      if (dataToForward.isRecuring == true) {
        var date = dates.sDate;
        dates.sDate = new Date(Date.parse(date) + 86400000);
        this.onSuccessOfHoliday(dates, holidayResponse);
      } else {
        kony.apps.coe.ess.MyLeave.Footer.navigateFooter(1);
      }
    }
  }

};

kony.apps.coe.ess.myLeave.applyLeave.convertTo24Hour = function(time) {
  var hours = parseInt(time.substr(0, 2));
  if (time.indexOf('AM') != -1 && hours == 12) {
    time = time.replace('12', '0');
  }
  if (time.indexOf('PM') != -1 && hours < 12) {
    time = time.replace(hours, (hours + 12));
  }
  return time.replace(/(AM|PM)/, '');
};

kony.apps.coe.ess.myLeave.applyLeave.RecurringLeave = {

  previousSelectedOption: "",
  currentSelectedOption: "",
  onClickofRecurring: function() {
    if (frmApplyLeave.flxRecurringLeave.imgRecurringOn.isVisible) {
      frmApplyLeave.flxRecurringLeave.imgRecurringOn.isVisible = false;
      frmApplyLeave.flxRecurringLeave.imgRecurringOff.isVisible = true;
      frmApplyLeave.flxRecurringLeaveOptions.isVisible = false;
      frmApplyLeave.flxWeekly.isVisible = false;
      frmApplyLeave.flxMonthlyCalendar.isVisible = false;
      frmApplyLeave.lblBorderweekly.isVisible = false;
    } else if (frmApplyLeave.flxRecurringLeave.imgRecurringOff.isVisible) {
      frmApplyLeave.flxRecurringLeave.imgRecurringOff.isVisible = false;
      frmApplyLeave.flxRecurringLeave.imgRecurringOn.isVisible = true;
      frmApplyLeave.flxRecurringLeaveOptions.isVisible = true;
      if (this.previousSelectedOption !== undefined && this.previousSelectedOption !== "") {
        frmApplyLeave[this.previousSelectedOption].skin = "sknBtn777777S28pxRoman";
      }
      frmApplyLeave.flxRecurringLeaveOptions.btnWeekly.skin = "sknBtnBg1C7393S28pxRoman";
      frmApplyLeave.flxWeekly.isVisible = true;
      frmApplyLeave.lblBorderweekly.isVisible = true;
      frmApplyLeave.flxWeekly.flxFirstSecondWeek.isVisible = false;
      if (kony.apps.coe.ess.myLeave.applyLeave.weeklyMonthlyDaySelection.selectedDay !== undefined && kony.apps.coe.ess.myLeave.applyLeave.weeklyMonthlyDaySelection.selectedDay !== "") {
        frmApplyLeave[kony.apps.coe.ess.myLeave.applyLeave.weeklyMonthlyDaySelection.selectedDay].skin = "sknMobBtn777777Px28";
      }
      this.previousSelectedOption = "btnWeekly";
      this.currentSelectedOption = "weekly";
    }

  },
  recurringMonthlyDayActions: function() {
    for (var i = 1; i <= 30; i++) {
      frmApplyLeave["btnDay" + i].onClick = function() {
        kony.apps.coe.ess.myLeave.applyLeave.weeklyMonthlyDaySelection.onClickOfMonthDates(this);
      };
    }
    frmApplyLeave.btnDay12.skin = "sknMobBtn549CE5Px28";
    kony.apps.coe.ess.myLeave.applyLeave.weeklyMonthlyDaySelection.selectedDate = "btnDay12";
  },
  onClickofDaily: function() {
    this.currentSelectedOption = "daily";
    frmApplyLeave.flxWeekly.isVisible = false;
    frmApplyLeave.flxMonthlyCalendar.isVisible = false;
    if (this.previousSelectedOption !== undefined && this.previousSelectedOption !== "") {
      frmApplyLeave[this.previousSelectedOption].skin = "sknBtn777777S28pxRoman";
    }
    frmApplyLeave.btnDaily.skin = "sknBtnBg1C7393S28pxRoman";
    this.previousSelectedOption = "btnDaily";
  },

  onClickOfWeekly: function() {
    frmApplyLeave.flxWeekly.removeAll();
    var flxFirstSecondWeek = new kony.ui.FlexContainer({
      "autogrowMode": kony.flex.AUTOGROW_NONE,
      "centerY": "50%",
      "clipBounds": true,
      "height": "86%",
      "id": "flxFirstSecondWeek",
      "isVisible": false,
      "layoutType": kony.flex.FREE_FORM,
      "left": "0%",
      "skin": "sknMobFlxBR549CE51Px",
      "top": "0%",
      "width": "12%",
      "zIndex": 1
    }, {}, {});
    flxFirstSecondWeek.setDefaultUnit(kony.flex.DP);
    var btnFirstWeek = new kony.ui.Button({
      "focusSkin": "sknMobBtnBG549CE528Px",
      "height": "50%",
      "id": "btnFirstWeek",
      "isVisible": true,
      "left": "0%",
      "onClick":kony.apps.coe.ess.myLeave.applyLeave.weeklyMonthlyDaySelection.onClickOfFirstSecondWeek, //AS_Button_15ab21a85808463382e51a0b8dba4a02,
      "skin": "sknMobBtnBG549CE528Px",
      "text": "1st",
      "top": "0%",
      "width": "100%"
    }, {
      "contentAlignment": constants.CONTENT_ALIGN_CENTER,
      "displayText": true,
      "padding": [0, 0, 0, 0],
      "paddingInPixel": false
    }, {});
    var btnSecondWeek = new kony.ui.Button({
      "focusSkin": "sknMobBtnBG549CE528Px",
      "height": "50%",
      "id": "btnSecondWeek",
      "isVisible": true,
      "left": "0%",
      "onClick": kony.apps.coe.ess.myLeave.applyLeave.weeklyMonthlyDaySelection.onClickOfFirstSecondWeek,//AS_Button_729cb3aac1a64553849c00a3f985d223,
      "skin": "sknMobBtn666A8128Px",
      "text": "2nd",
      "top": "50%",
      "width": "100%",
      "zIndex": 1
    }, {
      "contentAlignment": constants.CONTENT_ALIGN_CENTER,
      "displayText": true,
      "padding": [0, 0, 0, 0],
      "paddingInPixel": false
    }, {});
    flxFirstSecondWeek.add(btnFirstWeek, btnSecondWeek);
    var btnSunday = new kony.ui.Button({
      "centerY": "50%",
      "focusSkin": "sknMobBtn549CE5Px28",
      "height": "50%",
      "id": "btnSunday",
      "isVisible": true,
      "left": "0%",
      "onClick": kony.apps.coe.ess.myLeave.applyLeave.weeklyMonthlyDaySelection.onClickofWeeklyDays,//AS_Button_778c45b0e3954180aa15c394d2ddaa0e,
      "skin": "sknMobBtn777777Px28",
      "text": "Su",
      "top": "10%",
      "width": "11%"
    }, {
      "contentAlignment": constants.CONTENT_ALIGN_CENTER,
      "displayText": true,
      "padding": [0, 0, 0, 0],
      "paddingInPixel": false
    }, {});
    var btnMonday = new kony.ui.Button({
      "centerY": "50%",
      "height": "50%",
      "id": "btnMonday",
      "isVisible": true,
      "left": "0%",
      "onClick": kony.apps.coe.ess.myLeave.applyLeave.weeklyMonthlyDaySelection.onClickofWeeklyDays,//AS_Button_72819b6b1d554c8fb99503bd158fdd13,
      "skin": "sknMobBtn777777Px28",
      "text": "Mo",
      "top": "10%",
      "width": "11%",
      "zIndex": 1
    }, {
      "contentAlignment": constants.CONTENT_ALIGN_CENTER,
      "displayText": true,
      "padding": [0, 0, 0, 0],
      "paddingInPixel": false
    }, {});
    var btnTuesday = new kony.ui.Button({
      "centerY": "50%",
      "focusSkin": "sknMobBtn549CE5Px28",
      "height": "50%",
      "id": "btnTuesday",
      "isVisible": true,
      "left": "0%",
      "onClick": kony.apps.coe.ess.myLeave.applyLeave.weeklyMonthlyDaySelection.onClickofWeeklyDays,// AS_Button_4316530912c249b9ba73a65b05a6b53b,
      "skin": "sknMobBtn777777Px28",
      "text": "Tu",
      "top": "10%",
      "width": "11%",
      "zIndex": 1
    }, {
      "contentAlignment": constants.CONTENT_ALIGN_CENTER,
      "displayText": true,
      "padding": [0, 0, 0, 0],
      "paddingInPixel": false
    }, {});
    var btnWednesday = new kony.ui.Button({
      "centerY": "50%",
      "focusSkin": "sknMobBtn549CE5Px28",
      "height": "50%",
      "id": "btnWednesday",
      "isVisible": true,
      "left": "0%",
      "onClick": kony.apps.coe.ess.myLeave.applyLeave.weeklyMonthlyDaySelection.onClickofWeeklyDays,//AS_Button_3f388530a9e44896b852a2a3be241812,
      "skin": "sknMobBtn777777Px28",
      "text": "We",
      "top": "10%",
      "width": "11%",
      "zIndex": 1
    }, {
      "contentAlignment": constants.CONTENT_ALIGN_CENTER,
      "displayText": true,
      "padding": [0, 0, 0, 0],
      "paddingInPixel": false
    }, {});
    var btnThursday = new kony.ui.Button({
      "centerY": "50%",
      "focusSkin": "sknMobBtn549CE5Px28",
      "height": "50%",
      "id": "btnThursday",
      "isVisible": true,
      "left": "0%",
      "onClick": kony.apps.coe.ess.myLeave.applyLeave.weeklyMonthlyDaySelection.onClickofWeeklyDays,//AS_Button_ad1ebd41315d45ceaf575d5c68ff56b4,
      "skin": "sknMobBtn777777Px28",
      "text": "Th",
      "top": "10%",
      "width": "11%",
      "zIndex": 1
    }, {
      "contentAlignment": constants.CONTENT_ALIGN_CENTER,
      "displayText": true,
      "padding": [0, 0, 0, 0],
      "paddingInPixel": false
    }, {});
    var btnFriday = new kony.ui.Button({
      "centerY": "50%",
      "focusSkin": "sknMobBtn549CE5Px28",
      "height": "50%",
      "id": "btnFriday",
      "isVisible": true,
      "left": "0%",
      "onClick": kony.apps.coe.ess.myLeave.applyLeave.weeklyMonthlyDaySelection.onClickofWeeklyDays,//AS_Button_a790a3d2ad524d2f8f3f78706f85b5f6,
      "skin": "sknMobBtn777777Px28",
      "text": "Fr",
      "top": "10%",
      "width": "11%",
      "zIndex": 1
    }, {
      "contentAlignment": constants.CONTENT_ALIGN_CENTER,
      "displayText": true,
      "padding": [0, 0, 0, 0],
      "paddingInPixel": false
    }, {});
    var btnSaturday = new kony.ui.Button({
      "centerY": "50%",
      "focusSkin": "sknMobBtn549CE5Px28",
      "height": "50%",
      "id": "btnSaturday",
      "isVisible": true,
      "left": "0%",
      "onClick": kony.apps.coe.ess.myLeave.applyLeave.weeklyMonthlyDaySelection.onClickofWeeklyDays,//AS_Button_cd9098e89c004c3291aa7a5cb2cfa52f,
      "skin": "sknMobBtn777777Px28",
      "text": "Sa",
      "top": "10%",
      "width": "11%",
      "zIndex": 1
    }, {
      "contentAlignment": constants.CONTENT_ALIGN_CENTER,
      "displayText": true,
      "padding": [0, 0, 0, 0],
      "paddingInPixel": false
    }, {});
    frmApplyLeave.flxWeekly.add(flxFirstSecondWeek, btnMonday, btnTuesday, btnWednesday, btnThursday, btnFriday, btnSaturday, btnSunday);
    this.currentSelectedOption = "weekly";
    frmApplyLeave.btnSunday.left = "0%";
    frmApplyLeave.flxWeekly.flxFirstSecondWeek.isVisible = false;
    frmApplyLeave.flxMonthlyCalendar.isVisible = false;
    frmApplyLeave.flxWeekly.isVisible = true;
    if (this.previousSelectedOption !== undefined && this.previousSelectedOption !== "") {
      frmApplyLeave[this.previousSelectedOption].skin = "sknBtn777777S28pxRoman";
    }
    frmApplyLeave.btnWeekly.skin = "sknBtnBg1C7393S28pxRoman";
    if (kony.apps.coe.ess.myLeave.applyLeave.weeklyMonthlyDaySelection.selectedDay !== undefined && kony.apps.coe.ess.myLeave.applyLeave.weeklyMonthlyDaySelection.selectedDay !== "") {
      frmApplyLeave[kony.apps.coe.ess.myLeave.applyLeave.weeklyMonthlyDaySelection.selectedDay].skin = "sknMobBtn777777Px28";
    }
    this.previousSelectedOption = "btnWeekly";
  },

  onClickOfBiweekly: function() {
    frmApplyLeave.flxWeekly.removeAll();
    var flxFirstSecondWeek = new kony.ui.FlexContainer({
      "autogrowMode": kony.flex.AUTOGROW_NONE,
      "centerY": "50%",
      "clipBounds": true,
      "height": "86%",
      "id": "flxFirstSecondWeek",
      "isVisible": false,
      "layoutType": kony.flex.FREE_FORM,
      "left": "0%",
      "skin": "sknMobFlxBR549CE51Px",
      "top": "0%",
      "width": "12%",
      "zIndex": 1
    }, {}, {});
    flxFirstSecondWeek.setDefaultUnit(kony.flex.DP);
    var btnFirstWeek = new kony.ui.Button({
      "focusSkin": "sknMobBtnBG549CE528Px",
      "height": "50%",
      "id": "btnFirstWeek",
      "isVisible": true,
      "left": "0%",
      "onClick": kony.apps.coe.ess.myLeave.applyLeave.weeklyMonthlyDaySelection.onClickOfFirstSecondWeek,//AS_Button_15ab21a85808463382e51a0b8dba4a02,
      "skin": "sknMobBtnBG549CE528Px",
      "text": "1st",
      "top": "0%",
      "width": "100%"
    }, {
      "contentAlignment": constants.CONTENT_ALIGN_CENTER,
      "displayText": true,
      "padding": [0, 0, 0, 0],
      "paddingInPixel": false
    }, {});
    var btnSecondWeek = new kony.ui.Button({
      "focusSkin": "sknMobBtnBG549CE528Px",
      "height": "50%",
      "id": "btnSecondWeek",
      "isVisible": true,
      "left": "0%",
      "onClick": kony.apps.coe.ess.myLeave.applyLeave.weeklyMonthlyDaySelection.onClickOfFirstSecondWeek,//AS_Button_729cb3aac1a64553849c00a3f985d223,
      "skin": "sknMobBtn666A8128Px",
      "text": "2nd",
      "top": "50%",
      "width": "100%",
      "zIndex": 1
    }, {
      "contentAlignment": constants.CONTENT_ALIGN_CENTER,
      "displayText": true,
      "padding": [0, 0, 0, 0],
      "paddingInPixel": false
    }, {});
    flxFirstSecondWeek.add(btnFirstWeek, btnSecondWeek);
    var btnSunday = new kony.ui.Button({
      "centerY": "50%",
      "focusSkin": "sknMobBtn549CE5Px28",
      "height": "50%",
      "id": "btnSunday",
      "isVisible": true,
      "left": "0%",
      "onClick": kony.apps.coe.ess.myLeave.applyLeave.weeklyMonthlyDaySelection.onClickofWeeklyDays,//AS_Button_778c45b0e3954180aa15c394d2ddaa0e,
      "skin": "sknMobBtn777777Px28",
      "text": "Su",
      "top": "10%",
      "width": "11%"
    }, {
      "contentAlignment": constants.CONTENT_ALIGN_CENTER,
      "displayText": true,
      "padding": [0, 0, 0, 0],
      "paddingInPixel": false
    }, {});
    var btnMonday = new kony.ui.Button({
      "centerY": "50%",
      "height": "50%",
      "id": "btnMonday",
      "isVisible": true,
      "left": "0%",
      "onClick": kony.apps.coe.ess.myLeave.applyLeave.weeklyMonthlyDaySelection.onClickofWeeklyDays,//AS_Button_72819b6b1d554c8fb99503bd158fdd13,
      "skin": "sknMobBtn777777Px28",
      "text": "Mo",
      "top": "10%",
      "width": "11%",
      "zIndex": 1
    }, {
      "contentAlignment": constants.CONTENT_ALIGN_CENTER,
      "displayText": true,
      "padding": [0, 0, 0, 0],
      "paddingInPixel": false
    }, {});
    var btnTuesday = new kony.ui.Button({
      "centerY": "50%",
      "focusSkin": "sknMobBtn549CE5Px28",
      "height": "50%",
      "id": "btnTuesday",
      "isVisible": true,
      "left": "0%",
      "onClick": kony.apps.coe.ess.myLeave.applyLeave.weeklyMonthlyDaySelection.onClickofWeeklyDays,//AS_Button_4316530912c249b9ba73a65b05a6b53b,
      "skin": "sknMobBtn777777Px28",
      "text": "Tu",
      "top": "10%",
      "width": "11%",
      "zIndex": 1
    }, {
      "contentAlignment": constants.CONTENT_ALIGN_CENTER,
      "displayText": true,
      "padding": [0, 0, 0, 0],
      "paddingInPixel": false
    }, {});
    var btnWednesday = new kony.ui.Button({
      "centerY": "50%",
      "focusSkin": "sknMobBtn549CE5Px28",
      "height": "50%",
      "id": "btnWednesday",
      "isVisible": true,
      "left": "0%",
      "onClick": kony.apps.coe.ess.myLeave.applyLeave.weeklyMonthlyDaySelection.onClickofWeeklyDays,//AS_Button_3f388530a9e44896b852a2a3be241812,
      "skin": "sknMobBtn777777Px28",
      "text": "We",
      "top": "10%",
      "width": "11%",
      "zIndex": 1
    }, {
      "contentAlignment": constants.CONTENT_ALIGN_CENTER,
      "displayText": true,
      "padding": [0, 0, 0, 0],
      "paddingInPixel": false
    }, {});
    var btnThursday = new kony.ui.Button({
      "centerY": "50%",
      "focusSkin": "sknMobBtn549CE5Px28",
      "height": "50%",
      "id": "btnThursday",
      "isVisible": true,
      "left": "0%",
      "onClick": kony.apps.coe.ess.myLeave.applyLeave.weeklyMonthlyDaySelection.onClickofWeeklyDays,//AS_Button_ad1ebd41315d45ceaf575d5c68ff56b4,
      "skin": "sknMobBtn777777Px28",
      "text": "Th",
      "top": "10%",
      "width": "11%",
      "zIndex": 1
    }, {
      "contentAlignment": constants.CONTENT_ALIGN_CENTER,
      "displayText": true,
      "padding": [0, 0, 0, 0],
      "paddingInPixel": false
    }, {});
    var btnFriday = new kony.ui.Button({
      "centerY": "50%",
      "focusSkin": "sknMobBtn549CE5Px28",
      "height": "50%",
      "id": "btnFriday",
      "isVisible": true,
      "left": "0%",
      "onClick": kony.apps.coe.ess.myLeave.applyLeave.weeklyMonthlyDaySelection.onClickofWeeklyDays,//AS_Button_a790a3d2ad524d2f8f3f78706f85b5f6,
      "skin": "sknMobBtn777777Px28",
      "text": "Fr",
      "top": "10%",
      "width": "11%",
      "zIndex": 1
    }, {
      "contentAlignment": constants.CONTENT_ALIGN_CENTER,
      "displayText": true,
      "padding": [0, 0, 0, 0],
      "paddingInPixel": false
    }, {});
    var btnSaturday = new kony.ui.Button({
      "centerY": "50%",
      "focusSkin": "sknMobBtn549CE5Px28",
      "height": "50%",
      "id": "btnSaturday",
      "isVisible": true,
      "left": "0%",
      "onClick": kony.apps.coe.ess.myLeave.applyLeave.weeklyMonthlyDaySelection.onClickofWeeklyDays,//AS_Button_cd9098e89c004c3291aa7a5cb2cfa52f,
      "skin": "sknMobBtn777777Px28",
      "text": "Sa",
      "top": "10%",
      "width": "11%",
      "zIndex": 1
    }, {
      "contentAlignment": constants.CONTENT_ALIGN_CENTER,
      "displayText": true,
      "padding": [0, 0, 0, 0],
      "paddingInPixel": false
    }, {});
    frmApplyLeave.flxWeekly.add(flxFirstSecondWeek, btnMonday, btnTuesday, btnWednesday, btnThursday, btnFriday, btnSaturday, btnSunday);
    this.currentSelectedOption = "biweekly";
    frmApplyLeave.btnSunday.left = "2%";
    frmApplyLeave.flxWeekly.flxFirstSecondWeek.isVisible = false;
    frmApplyLeave.flxMonthlyCalendar.isVisible = false;
    frmApplyLeave.flxWeekly.isVisible = true;
    if (this.previousSelectedOption !== undefined && this.previousSelectedOption !== "") {
      frmApplyLeave[this.previousSelectedOption].skin = "sknBtn777777S28pxRoman";
    }
    frmApplyLeave.btnBiweekly.skin = "sknBtnBg1C7393S28pxRoman";
    if (kony.apps.coe.ess.myLeave.applyLeave.weeklyMonthlyDaySelection.selectedDay !== undefined && kony.apps.coe.ess.myLeave.applyLeave.weeklyMonthlyDaySelection.selectedDay !== "") {
      frmApplyLeave[kony.apps.coe.ess.myLeave.applyLeave.weeklyMonthlyDaySelection.selectedDay].skin = "sknMobBtn777777Px28";
    }
    frmApplyLeave.btnFirstWeek.skin = "sknMobBtnBG549CE528Px";
    frmApplyLeave.btnSecondWeek.skin = "sknMobBtn666A8128Px";
    kony.apps.coe.ess.myLeave.applyLeave.weeklyMonthlyDaySelection.selectedWeek = "btnFirstWeek";
    this.previousSelectedOption = "btnBiweekly";
  },

  onClickOfMonthly: function() {
    this.currentSelectedOption = "monthly";
    frmApplyLeave.flxWeekly.flxFirstSecondWeek.isVisible = false;
    frmApplyLeave.flxWeekly.isVisible = false;
    frmApplyLeave.flxMonthlyCalendar.isVisible = true;
    if (this.previousSelectedOption !== undefined && this.previousSelectedOption !== "") {
      frmApplyLeave[this.previousSelectedOption].skin = "sknBtn777777S28pxRoman";
    }
    frmApplyLeave.btnMonthly.skin = "sknBtnBg1C7393S28pxRoman";
    this.previousSelectedOption = "btnMonthly";
  }
};

kony.apps.coe.ess.myLeave.applyLeave.weeklyMonthlyDaySelection = {

  selectedDay: "",
  selectedDate: "",
  selectedWeek: "",

  onClickofWeeklyDays: function(eventobject) {
    if (frmApplyLeave[eventobject.id].skin != "sknMobBtn549CE5Px28") {
      frmApplyLeave[eventobject.id].skin = "sknMobBtn549CE5Px28";
    } else {
      frmApplyLeave[eventobject.id].skin = "sknMobBtn777777Px28";
    }
    /*if (this.selectedDay !== undefined && this.selectedDay !== "" && this.selectedDay !== eventobject.id) {
        	frmApplyLeave[this.selectedDay].skin = "sknMobBtn777777Px28";
        }
        this.selectedDay = eventobject.id;*/
  },
  getSelectedWeekDays: function() {
    var weekDay = frmApplyLeave.flxWeekly.widgets();
    var selectedWeek = [];
    for (var i = 1; i < weekDay.length; i++) {
      if (weekDay[i].skin === "sknMobBtn549CE5Px28") {
        selectedWeek.push(weekDay[i].id.slice(3, weekDay[i].id.length));
      }
    }
    return selectedWeek;
  },
  onClickOfMonthDates: function(eventobject) {
    frmApplyLeave[eventobject.id].skin = "sknMobBtn549CE5Px28";
    if (this.selectedDate !== undefined && this.selectedDate !== "" && this.selectedDate !== eventobject.id) {
      frmApplyLeave[this.selectedDate].skin = "sknMobBtn777777Px28";
    }
    this.selectedDate = eventobject.id;
  },

  onClickOfFirstSecondWeek: function(eventobject) {
    if (this.selectedWeek !== undefined && this.selectedWeek !== "") {
      frmApplyLeave[this.selectedWeek].skin = "sknMobBtn666A8128Px";
    }
    frmApplyLeave[eventobject.id].skin = "sknMobBtnBG549CE528Px";
    this.selectedWeek = eventobject.id;
  }
};
/*
 * Description: This function handles action to be performed on txtComments
 * Params: No Params
 * Return : Null
 */
kony.apps.coe.ess.myLeave.applyLeave.onclickoftxtComments = function() {
  frmApplyLeave.lblRequiredComments.isVisible = false;
  return;
};
/*
 * Description: This function handles action to be performed on click of submit
 * Params: No Params
 * Return : Null
 */
kony.apps.coe.ess.myLeave.applyLeave.onClickOfApplySubmit = function() {
  //used to enable the hamburger icon on leave home screen if it is invisible
  if(frmLeaveHome.flxHamburgerMenu.isVisible === false){
    frmLeaveHome.flxHamburgerMenu.isVisible = true;
  }
  if (frmApplyLeave.flxRecurringLeave.imgRecurringOn.isVisible) {
    kony.apps.coe.ess.myLeave.applyLeave.submitLeave.recurringSubmit();
  } else {
    kony.apps.coe.ess.myLeave.applyLeave.submitLeave.onClickOfSubmit();
  }
  return;
};

//Showing TimePicker form
kony.apps.coe.ess.myLeave.applyLeave.showTimePicker = function(selectionEvent) {
  frmApplyLeave.flxTimeLayout.isVisible = true;
  var x = frmApplyLeave.btnTo.text;
  var y = frmApplyLeave.btnFrom.text;
  var hrStart = y.slice(0,2);
  var minStart = y.slice(3,5);
  var hrEnd = x.slice(0,2);
  var minEnd = x.slice(3,5);
  frmApplyLeave.pickTime.selectedKeys=["h"+parseInt(String(y).substring(0,2)),"m"+parseInt(String(y).substring(3,5))];
  frmApplyLeave.pickTime2.selectedKeys=["h"+parseInt(String(x).substring(0,2)),"m"+parseInt(String(x).substring(3,5))];
  if(selectionEvent === "Start"){
    frmApplyLeave.pickTime.isVisible = true;
    frmApplyLeave.pickTime2.isVisible = false;
  }else if(selectionEvent === "End"){
    frmApplyLeave.pickTime.isVisible = false;
    frmApplyLeave.pickTime2.isVisible = true;
  }
};

//Dismissing TimePicker form
kony.apps.coe.ess.myLeave.applyLeave.dismissTimePicker = function(event) {
  frmApplyLeave.flxTimeLayout.isVisible = false;
  if(frmApplyLeave.pickTime.isVisible === true){
    var selection = frmApplyLeave.pickTime.selectedKeyValues;
    frmApplyLeave.btnFrom.text = selection[0][1]+":"+selection[1][1];
    if(frmApplyLeave.btnHours.skin === "sknBtnBg1C7393S28pxRoman"){
      var temp=parseInt(selection[0][1])+2;
    }else{
    var temp=parseInt(selection[0][1])+4;
    }
    if(temp >23){
      temp=temp-23;
    }
    frmApplyLeave.btnTo.text =("0"+temp).slice(-2)+":"+selection[1][1];
  }else if(frmApplyLeave.pickTime2.isVisible === true){
    var selection = frmApplyLeave.pickTime2.selectedKeyValues;
    frmApplyLeave.btnTo.text = selection[0][1]+":"+selection[1][1];
  }
  var x = frmApplyLeave.btnTo.text;
  var y = frmApplyLeave.btnFrom.text;
  var hrStart = y.slice(0,2);
  var minStart = y.slice(3,5);
  var hrEnd = x.slice(0,2);
  var minEnd = x.slice(3,5);
  var fromDate = String(frmApplyLeave.lblFromDate.text).split(" ");
  var convert_fromDate = Date.getMonthNameShort(kony.store.getItem("localeToBeSetLeave"),fromDate[1]);
  var toDate = String(frmApplyLeave.lblToDate.text).split(" ");
  var convert_toDate = String(Date.getMonthNameShort(kony.store.getItem("localeToBeSetLeave"),toDate[1]));
  var getMonthFrom = Date.getshortMonthNumber(kony.store.getItem("localeToBeSetLeave"),fromDate[1]);
  var getMonthTo = Date.getshortMonthNumber(kony.store.getItem("localeToBeSetLeave"),toDate[1]);
  var fromMonth = getMonthFrom+1;//Number(new Date(getMonthFrom+"-1-01").getMonth())+1;
  var toMonth = getMonthTo+1;//Number(new Date(getMonthTo+"-1-01").getMonth())+1;
  kony.apps.coe.ess.myLeave.applyLeave.diffinTimeSelected(hrStart,minStart,hrEnd,minEnd,fromDate[2],fromMonth,fromDate[0],
                                                          toDate[2],toMonth,toDate[0]);
};

kony.apps.coe.ess.myLeave.applyLeave.diffinTimeSelected = function(hrStart,minStart,hrEnd,minEnd,fromYear,fromMonth,fromDate,
                                                             toYear,toMonth,toDate){
  var btnAction = "";
  if(frmApplyLeave.btnHalfDay.skin == "sknBtnBg1C7393S28pxRoman"){
    btnAction = "HalfDay";
  }
  if(frmApplyLeave.btnHours.skin == "sknBtnBg1C7393S28pxRoman"){
    btnAction = "Hours";
  }
  var hr = hrStart+minStart;
  var min = hrEnd+minEnd;
  var d = new Date();
  var start = new Date(fromYear,fromMonth,fromDate, hrStart, minStart, 0).getTime();
  var end = new Date(toYear,toMonth,toDate, hrEnd, minEnd, 0).getTime();
  var hours = (Number(end)-Number(start))/(1000*60*60);
  hours = Math.abs(hours);
  var btnToText;
  kony.apps.coe.ess.myLeave.applyLeave.fullDayHoursSelection.start_time = kony.apps.coe.ess.myLeave.applyLeave.updateTimeWithMins(hr);
  kony.apps.coe.ess.myLeave.applyLeave.fullDayHoursSelection.end_time = kony.apps.coe.ess.myLeave.applyLeave.updateTimeWithMins(min);
  kony.apps.coe.ess.myLeave.applyLeave.fullDayHoursSelection.hours = hours;

  frmApplyLeave.lblDurationHours.text = hours + " "+kony.i18n.getLocalizedString("i18n.ess.common.hours.valueKA");
  //commented as warning is not needed , if half day is > 4 show alert on submit
   // if((Number(hours) > 4 && btnAction == "HalfDay") ||( Number(hours) > 10 && btnAction == "Hours")){
    // if(btnAction == "HalfDay"){
      // alert(kony.i18n.getLocalizedString("i18n.ess.MyLeave.frmApplyLeave.DurationExceedWarning")+" 4"  );//"Please select duration hours less than or equal to 4");
    // }else if(btnAction == "Hours"){
      // alert(kony.i18n.getLocalizedString("i18n.ess.MyLeave.frmApplyLeave.DurationExceedWarning")+" 10");    //"Please select duration hours less than or equal to 10");
    // }
    // }
};

kony.apps.coe.ess.myLeave.applyLeave.findHours = function(hrStart,minStart,hrEnd,minEnd){
  var d = new Date();
  var start = new Date(d.getYear(), d.getMonth(), d.getDate(), hrStart, minStart, 0).getTime();
  var end = new Date(d.getYear(), d.getMonth(), d.getDate(), hrEnd, minEnd, 0).getTime();
  var hours = (Number(end)-Number(start))/(1000*60*60);
  return hours;
};

kony.apps.coe.ess.myLeave.applyLeave.updateTimeWithMins = function(time){
  var hrMins = (time + "00").replace(/\s/g, "");
  return hrMins;
};
