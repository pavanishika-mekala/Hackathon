/**
 * @module CalendarUI 
 * @Author   Shweta.Dasari
 * @category UI/actions 
 * @description 
 * © 2016 Kony Inc. 
 */
// Region - namespaces. 
kony = kony || {};
kony.apps = kony.apps || {};
kony.apps.ess = kony.apps.ess || {};
kony.apps.ess.myLeave = kony.apps.ess.myLeave || {};

kony.apps.ess.myLeave.tabApplyLeaveUI = kony.apps.ess.myLeave.tabApplyLeaveUI || {};
// Region - Class / object constructor.
/**
 * @class tabApplyLeaveUI
 * Contains the UI actions and the functions for the dynamic calendar
 */

kony.apps.ess.myLeave.tabApplyLeaveUI.checkIfEditLeaveMode = {
    editMode: false
};


function onClickEndWinDate() {
    frmTabApplyLeave.lblToCal.skin = sknlbldateselectfocus;
    frmTabApplyLeave.flxCalendar2.setVisibility(true);
    (new kony.apps.ess.myLeave.calendarUI(frmTabApplyLeave.lblToCal)).addDynamicCalendar();
    //frmTabApplyLeave.flxCalendar2.left="60.5";
}

function onClickStartWinDate() {
    frmTabApplyLeave.lblFrmCal.skin = sknlbldateselectfocus;
    frmTabApplyLeave.flxCalendar.setVisibility(true);
    (new kony.apps.ess.myLeave.calendarUI(frmTabApplyLeave.lblFrmCal)).addDynamicCalendar();
    //frmTabApplyLeave.flxCalendar.left="20.5";
}

kony.apps.ess.myLeave.tabApplyLeaveUI.preshowtabApplyLeave = {
    setDefaultValues: function() {
        frmTabApplyLeave.lblApproverName.text = kony.apps.ess.myLeave.tabApplyLeaveUI.ManagerName;
        var currYear = (kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.calendarWidget.year).toString().trim(0, 4);
        frmTabApplyLeave.lblYear.text = currYear;
        var query = "select  *  from leave_type";
        kony.sync.single_select_execute(kony.sync.getDBName(), query, null, kony.apps.ess.myLeave.tabApplyLeaveUI.LeaveType.mappingLeaveTypeData, function(err) {
            handleError(err);
        }, false);
        kony.apps.ess.myLeave.tabApplyLeaveUI.fullDayHoursSelection.onClickOfFullDay(); //CHECK
        kony.apps.ess.myLeave.tabApplyLeaveUI.fullDayHoursSelection.updateDurationFullDay();
        frmTabApplyLeave.flxAddAtachment.removeAll();
        kony.apps.ess.myLeave.tabApplyLeaveUI.staticAttachmentImg.setImgPlus();
        kony.apps.ess.myLeave.tabApplyLeaveUI.AddAttachment.lastIndex = 0;
        kony.apps.ess.myLeave.tabApplyLeaveUI.Attachment.proofData = [];
        kony.apps.ess.myLeave.tabApplyLeaveUI.submitLeave.leaveEntryData = {};
    },
    getManagerName: function() {
        var sqlQuery = "select e.First_Name,e.Last_Name ,c.Value ,c.Communication_Type_Id from Employee e join Communication_Channel c on c.Employee_Id = e.Id  where e.Id =(select emp.Manager_Id from Employee emp where emp.Id = '" + kony.apps.coe.ess.globalVariables.employeeId + "')";
        kony.sync.single_select_execute(kony.sync.getDBName(), sqlQuery, null, function(data) {
            if (data.length > 0 && data !== undefined && data[0].First_Name !== undefined && data[0].Last_Name !== undefined) {
                for (var i = 0; i < data.length; i++) {
                    if (data[i].Communication_Type_Id === "0010") {
                        kony.apps.ess.myLeave.tabApplyLeaveUI.mailId = data[i].Value;
                    } else if (data[i].Communication_Type_Id === "0020") {
                        kony.apps.ess.myLeave.tabApplyLeaveUI.phoneNumber = data[i].Value;
                    }
                }
                kony.apps.ess.myLeave.tabApplyLeaveUI.ManagerName = data[0].First_Name + " " + data[0].Last_Name;
            }
        }, function(err) {
            handleError(err);
        }, false);
    },
    editLeave: function() {
        kony.print("((((((((((((((((((((((ENTERED editLeave))))))))))))))))))))))");
        var selectedLeaveId = kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.selectedLeaveID;
        if (selectedLeaveId !== null && selectedLeaveId !== undefined && selectedLeaveId !== "") {
            var sqlQuery = "select l.id as LeaveID,l.start_time as StartTime, l.end_time as EndTime, lt.name as LeaveType, l.leave_type_id as LeaveTypeId,s.Status_Name as Status, l.start_date as StartDate, l.end_date as EndDate, l.no_of_hours as Hours, l.lastmodifiedts as LastModifiedDate, l.createdts as CreateDate, l.reason_desc as Comment " +
                "from leave l join leave_type lt on l.leave_type_id = lt.id " +
                "join Status s on l.status_id = s.id where l.id = '" + selectedLeaveId + "'";
            kony.sync.single_select_execute(kony.sync.getDBName(), sqlQuery, null, function(data) {
                kony.apps.ess.myLeave.editLeave.updateUI.setData(data);
            }, function(err) {
                handleError(err);
            }, false);
        } else {
            alert("Cannot get Leave ID!");
        }

    }
};

kony.apps.ess.myLeave.tabApplyLeaveUI.MailandPhone = {

    onClickOfMail: function() {
        try {
            if (kony.apps.ess.myLeave.tabApplyLeaveUI.mailId !== "" && kony.apps.ess.myLeave.tabApplyLeaveUI.mailId !== undefined && kony.apps.ess.myLeave.tabApplyLeaveUI.mailId !== null) {
                var toRecepient = [kony.apps.ess.myLeave.tabApplyLeaveUI.mailId];
                var ccRecepient = [];
                var bccRecepient = []; 
                var subject = kony.i18n.getLocalizedString("i18n.ess.myLeave.LeaveRequest") + kony.apps.coe.ess.globalVariables.employeeName;
                var messageBody = [];
                var isMessageBodyHTML = false;
                var attachment = [];
                kony.phone.openEmail(toRecepient, ccRecepient, bccRecepient, subject, messageBody, isMessageBodyHTML, attachment);
            }
        } catch (err) {
            //handleError(err);
            if (err.errorCode === 2102) {
                alert("Email is not configured in this device!");
            } else {
                handleError(err);
            }
        }
    },

    onClickOfPhone: function() {
        try {
            if (kony.apps.ess.myLeave.tabApplyLeaveUI.phoneNumber !== "" && kony.apps.ess.myLeave.tabApplyLeaveUI.phoneNumber !== undefined && kony.apps.ess.myLeave.tabApplyLeaveUI.phoneNumber !== null) {
                kony.phone.dial(kony.apps.ess.myLeave.tabApplyLeaveUI.phoneNumber);
            }
        } catch (err) {
            handleError(err);
        }
    }
};

kony.apps.ess.myLeave.tabApplyLeaveUI.LeaveType = {

    selectedLeaveType: "",
    mappingLeaveTypeData: function(data) {
        frmTabApplyLeave.flxLeaveType.removeAll();
        for (var i = 0; i < data.length; i++) {
            var btnLeaveTypeObj = new kony.ui.Button({
                id: "btnLeaveType" + data[i].id,
                width: kony.flex.USE_PREFERRED_SIZE,
                centerY: "50%",
                left: "2%",
                //#ifdef windows8
                height: "90%",
                //#else
                height: "45%",
                //#endif

                skin: "sknbtntabF4F4F4",
                focusSkin: "sknbtntab4A90E2",
                text: "  " + data[i].name + "   ",
                "widgetAlignment": constants.WIDGET_ALIGN_CENTER,
                isVisible: true,
                onClick: function() {
                    kony.apps.ess.myLeave.tabApplyLeaveUI.LeaveType.onClickOfLeaveType(this);
                }
            }, {
                "padding": [0, 0, 0, 0],
                "marginInPixel": false,
                "paddingInPixel": false,
                "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT
            }, {});
            frmTabApplyLeave.flxLeaveType.add(btnLeaveTypeObj);
        }
        frmTabApplyLeave.flxLeaveType["btnLeaveType" + data[0].id].skin = "sknbtntab4A90E2";

        //#ifndef

        frmTabApplyLeave.lblLeavesLeft.text = "Available " + frmTabApplyLeave["btnLeaveType" + data[0].id].text;
        //#endif

        //       if (data.length > 0 && data !== undefined && data[0].balance !== undefined) {
        // 				frmTabApplyLeave.lblLeavesLeft.text = data[0].balance - data[0].availed;
        // 				frmTabApplyLeave.lblLeavesRemaining.text = 	frmTabApplyLeave["btnLeaveType" + data[0].id].text+ " leaves Remaining";
        //       }

        kony.apps.ess.myLeave.tabApplyLeaveUI.LeaveType.onClickOfLeaveType(frmTabApplyLeave["btnLeaveType" + data[0].id]);
        kony.apps.ess.myLeave.tabApplyLeaveUI.LeaveType.selectedLeaveType = "btnLeaveType" + data[0].id;
    },

    onClickOfLeaveType: function(eventobject) {

        if (this.selectedLeaveType !== undefined && this.selectedLeaveType !== "") {
            frmTabApplyLeave[this.selectedLeaveType].skin = "sknbtntabF4F4F4";
        }
        frmTabApplyLeave[eventobject.id].skin = "sknbtntab4A90E2";
        var leave_type_id = parseInt((eventobject.id).split("btnLeaveType")[1]);
        kony.print("eventobjdect.id=" + eventobject.id + "::::::::::::leave_type_id" + leave_type_id);
        kony.apps.ess.myLeave.tabApplyLeaveUI.LeaveType.selectedLeaveType = eventobject.id;
        var sqlquery = "select * from employee_leave_type where leave_type_id =  '" + leave_type_id + "'";
        kony.sync.single_select_execute(kony.sync.getDBName(), sqlquery, null, function(data) {
            if (data.length > 0 && data !== undefined && data[0].balance !== undefined) {
                //#ifdef windows8
                frmTabApplyLeave.lblLeavesRemaining.text = data[0].balance - data[0].availed + " " + frmTabApplyLeave[eventobject.id].text + " leaves remaining";
                //#else
                frmTabApplyLeave.lblLeavesLeft.text = data[0].balance - data[0].availed;
                frmTabApplyLeave.lblLeavesRemaining.text = frmTabApplyLeave[eventobject.id].text + " leaves remaining";
                //#endif

            } else {
                //#ifndef windows8
                frmTabApplyLeave.lblLeavesLeft.setVisibility(false);
                //#endif
                frmTabApplyLeave.lblLeavesRemaining.setVisibility(false);
            }
        }, function(err) {
            handleError(err);
        }, false);
    },

};

kony.apps.ess.myLeave.tabApplyLeaveUI.staticAttachmentImg = {

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
                kony.apps.ess.myLeave.tabApplyLeaveUI.Attachment.onClickOfCamera();
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
        frmTabApplyLeave.flxAddAtachment.add(flxProof);
    }

};
kony.apps.ess.myLeave.tabApplyLeaveUI.Attachment = {

    proofData: [],
    deletedData: [],

    onClickOfCamera: function() {
        frmTabApplyLeave.flxCameraOptions.isVisible = true;
        frmTabApplyLeave.flxCameraOptions.animate(
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

    onClickOfTakePicture: function(base64String) {

        kony.application.showLoadingScreen(null,kony.i18n.getLocalizedString("i18n.ess.common.loadingForm"), constants.LOADING_SCREEN_POSITION_ONLY_CENTER,  false, true, {
            enableMenuKey: false,
            enableBackKey: false
        });
        if (base64String !== null) {
            var proofImage = kony.convertToRawBytes(base64String);
            this.proofData.push({
                "imgProof": base64String,
                "id": "",
                "leave_id": null,
                "media_id": null
            });
            kony.apps.ess.myLeave.tabApplyLeaveUI.AddAttachment.add(this.proofData);
            kony.application.dismissLoadingScreen();
        }
    },
    gallerySelectionCallback: function(rawBytes, permissionStatus) {
        kony.print("-- gallerySelectionCallback:  Start--");
        if (rawBytes !== null) {
            var base64 = kony.convertToBase64(rawBytes);
            if ((base64 !== null) && (base64 !== undefined) && (base64 !== "")) {
                this.onClickOfTakePicture(base64);
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
        frmTabApplyLeave.flxCameraOptions.animate(
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
        frmTabApplyLeave.flxCameraOptions.isVisible = false;
    }

};
kony.apps.ess.myLeave.tabApplyLeaveUI.AddAttachment = {

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
            if (kony.apps.ess.myLeave.tabApplyLeaveUI.selectedLeaveId !== null && kony.apps.ess.myLeave.tabApplyLeaveUI.selectedLeaveId !== undefined && kony.apps.ess.myLeave.tabApplyLeaveUI.selectedLeaveId !== "") {
                deleteVisibility = false;
            } else {
                deleteVisibility = true;
            }
            //           if(kony.application.getPreviousForm().id==="frmTabPendingList")
            //             {
            //              deleteVisibility = true;
            //             }
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
                    kony.apps.ess.myLeave.tabApplyLeaveUI.AddAttachment.deleteAttachment(this);
                }
            }, {
                "contentAlignment": constants.CONTENT_ALIGN_CENTER,
                "displayText": true,
                "padding": [0, 0, 0, 0],
                "paddingInPixel": false
            }, {});
            flxProof.add(flxBorder, btnDelete);
            frmTabApplyLeave.flxAddAtachment.addAt(flxProof, i);
            frmTabApplyLeave["imgProof" + i].rawBytes = kony.convertToRawBytes(data[i].imgProof);
            data[i].id = "flxProof" + i;
            this.lastIndex++;
        }
        frmTabApplyLeave.flxCameraOptions.isVisible = false;
        frmTabApplyLeave.flxAddAtachment.isVisible = true;
    },

    deleteAttachment: function(eventobject) {
        var id = eventobject.id.split("btnDelete");
        frmTabApplyLeave.flxAddAtachment.remove(frmTabApplyLeave.flxAddAtachment["flxProof" + id[1]]);
        frmTabApplyLeave.forceLayout();
        id = "flxProof" + id[1];
        var index = kony.apps.ess.myLeave.tabApplyLeaveUI.Attachment.proofData.map(function(d) {
            return d['id'];
        }).indexOf(id);
        kony.apps.ess.myLeave.tabApplyLeaveUI.Attachment.proofData.splice(index, 1);
        this.lastIndex--;
        // 		if (kony.apps.ess.myLeave.tabApplyLeaveUI.Attachment.proofData.length <= 0) {
        // 			frmTabApplyLeave.flxAddAtachment.isVisible = false;
        // 		}
    }
};
kony.apps.ess.myLeave.tabApplyLeaveUI.fullDayHoursSelection = {


	selectedItem : "",
	start_time : "",
	end_time : "",
	hours : "",

	onClickOfFullDay : function () {
		frmTabApplyLeave.btnHours.skin = "sknbtntabF4F4F4";
		frmTabApplyLeave.btnFullDay.skin = "sknbtntab2ebaeeround";
		frmTabApplyLeave.flxTimeline.isVisible = false;
      //#ifndef windows8
		frmTabApplyLeave.lblTopSep.isVisible = false;
      //#endif
		this.selectedItem = "fullday";
		this.updateDurationFullDay();
	},

	onClickOfHours : function () {

		var start_date = kony.apps.ess.myLeave.tabApplyLeaveUI.startDate;
		var end_date = kony.apps.ess.myLeave.tabApplyLeaveUI.endDate;
		if (new Date(start_date).compareOnlyDate(new Date(end_date)) !== 0) {
			return;
		}
		frmTabApplyLeave.btnFullDay.skin = "sknbtntabF4F4F4";
		frmTabApplyLeave.btnHours.skin = "sknbtntab2ebaeeround";
		frmTabApplyLeave.lblDurationHours.text = "2 "+kony.i18n.getLocalizedString("i18n.ess.common.hours.valueKA");
		frmTabApplyLeave.flxTimeline.removeAll();
        frmTabApplyLeave.lblDurationHours.setVisibility(true);
		kony.apps.coe.Reusable.createTabTimeline.setStartandEndTime();
		kony.apps.coe.Reusable.createTabTimeline.TimelineUI(frmTabApplyLeave.flxTimeline);
		frmTabApplyLeave.flxTimeline.isVisible = true;
      //#ifndef windows8
		frmTabApplyLeave.lblTopSep.isVisible = true;
      //#endif
		this.selectedItem = "hours";
	},

	updateDuration : function (hours, start_time, end_time) {
		this.start_time = start_time;
		this.end_time = end_time;
		this.hours = hours;
		frmTabApplyLeave.lblDurationHours.text = hours +" "+kony.i18n.getLocalizedString("i18n.ess.common.hours.valueKA");
        frmTabApplyLeave.lblDurationHours.setVisibility(true);
		if (hours > 8) {
			this.onClickOfFullDay();
		}

	},

	updateDurationFullDay: function() {
    if((frmTabApplyLeave.lblFrmCal.text).trim() !== "Select from date on Calendar"){
    var startd=[];
    startd = frmTabApplyLeave.lblFrmCal.text.split(" ");
    var frm =startd[0] ;
    
    var endd=[];
    endd = frmTabApplyLeave.lblToCal.text.split(" ");
    var to =endd[0] ;
    var diff = to-frm;
    
    frmTabApplyLeave.lblDaySelected.text = diff+1;
    
    if(diff>=1){
      frmTabApplyLeave.lblDaySelected.text=frmTabApplyLeave.lblDaySelected.text+" Days Selected";
      frmTabApplyLeave.lblDurationHours.text = diff+1+" "+kony.i18n.getLocalizedString("i18.ess.frmTeamView.days");
      frmTabApplyLeave.lblDurationHours.isVisible=true;
      frmTabApplyLeave.lblDaySelected.isVisible=true;
    }else if(diff==0){
      frmTabApplyLeave.lblDaySelected.text=frmTabApplyLeave.lblDaySelected.text+" Day Selected";
      frmTabApplyLeave.lblDurationHours.text = "1 Day";
      frmTabApplyLeave.lblDurationHours.isVisible=true;
      frmTabApplyLeave.lblDaySelected.isVisible=true;
    }
    else{
      frmTabApplyLeave.lblDurationHours.isVisible=false;
      frmTabApplyLeave.lblDaySelected.isVisible=false;
    }
   }
   else{
     frmTabApplyLeave.lblDurationHours.isVisible=false;
     frmTabApplyLeave.lblDaySelected.isVisible=false;
   }

}
};

//APPLY LEAVE SUBMIT 
kony.apps.ess.myLeave.tabApplyLeaveUI.submitLeave = {

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

    onClickOfSubmit: function() {
        kony.print("#############################  entered on click submit");
        kony.apps.ess.myLeave.tabApplyLeaveUI.submitLeave.imgIndex = 0;
        kony.apps.ess.myLeave.tabApplyLeaveUI.startDate = frmTabApplyLeave.lblFrmCal.text;
        kony.apps.ess.myLeave.tabApplyLeaveUI.endDate = frmTabApplyLeave.lblToCal.text;
        kony.print("#############################  end_Date:" + kony.apps.ess.myLeave.tabApplyLeaveUI.endDate + ":: start_date:" + kony.apps.ess.myLeave.tabApplyLeaveUI.startDate);
        var date = (kony.apps.ess.myLeave.tabApplyLeaveUI.startDate).split(" ");
        kony.print("#############################  startDate[0]:" + date[0] + " [1]:" + date[1] + "[2]:" + date[2]);

        if (kony.apps.ess.myLeave.tabApplyLeaveUI.endDate !== null && kony.apps.ess.myLeave.tabApplyLeaveUI.endDate !== undefined) {
            var leaveEntryData = {};
            var date = (kony.apps.ess.myLeave.tabApplyLeaveUI.startDate).split(" ");
            leaveEntryData.start_date = date[2] + this.month_number[date[1].toLowerCase()] + date[0];
            date = (kony.apps.ess.myLeave.tabApplyLeaveUI.endDate).split(" ");
            leaveEntryData.end_date = date[2] + this.month_number[date[1].toLowerCase()] + date[0];
            leaveEntryData.leave_type_id = (kony.apps.ess.myLeave.tabApplyLeaveUI.LeaveType.selectedLeaveType).split("btnLeaveType")[1];
            var time = kony.apps.ess.myLeave.tabApplyLeaveUI.convertTo24Hour(kony.apps.ess.myLeave.tabApplyLeaveUI.fullDayHoursSelection.start_time);
            if (parseInt(time) < 10) {
                time = "0" + time;
            }
            leaveEntryData.start_time = (time + "0000").replace(/\s/g, "");
            leaveEntryData.end_time = (kony.apps.ess.myLeave.tabApplyLeaveUI.convertTo24Hour(kony.apps.ess.myLeave.tabApplyLeaveUI.fullDayHoursSelection.end_time) + "0000").replace(/\s/g, "");
            leaveEntryData.reason_desc = frmTabApplyLeave.txtAreaComments.text;
            leaveEntryData.recurrence_id = "";
            leaveEntryData.status_id = "2";
            var date1 = new Date();
            var timestamp = date1.getFullYear().toString().trim(0, 4) + "" + getTimeHourswithZero(date1.getMonth() + 1) + "" + getTimeHourswithZero(date1.getDate()) + "" + getTimeHourswithZero(date1.getHours()) + "" + getTimeHourswithZero(date1.getMinutes()) + "" + getTimeHourswithZero(date1.getSeconds());
            leaveEntryData.createdts = timestamp;
            leaveEntryData.lastmodifiedts = "";
            leaveEntryData.no_of_hours = kony.apps.ess.myLeave.tabApplyLeaveUI.fullDayHoursSelection.hours;
            date = new Date();
            var lid = "MYLEAVE_V2_" + leaveEntryData.start_date + "_T_" + date.getMilliseconds();
            var len = lid.length;
            leaveEntryData.id = lid;
            kony.apps.ess.myLeave.tabApplyLeaveUI.leave_id = leaveEntryData.id;
            leaveEntryData.employee_id = kony.apps.coe.ess.globalVariables.employeeId;
            kony.print("##################  FINAL LEAVE ENTRY DATA JSON=" + JSON.stringify(leaveEntryData));
            if ((kony.apps.ess.myLeave.tabApplyLeaveUI.selectedLeaveId !== null && kony.apps.ess.myLeave.tabApplyLeaveUI.selectedLeaveId !== undefined && kony.apps.ess.myLeave.tabApplyLeaveUI.selectedLeaveId !== "") || (kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.selectedLeaveID !== "" && kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.selectedLeaveID !== null && kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.selectedLeaveID !== undefined)) {
                if (kony.apps.ess.myLeave.tabApplyLeaveUI.selectedLeaveId !== null && kony.apps.ess.myLeave.tabApplyLeaveUI.selectedLeaveId !== undefined && kony.apps.ess.myLeave.tabApplyLeaveUI.selectedLeaveId !== "") {
                    leaveEntryData.id = kony.apps.ess.myLeave.tabApplyLeaveUI.selectedLeaveId;
                } else {
                    leaveEntryData.id = kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.selectedLeaveID;

                }
                kony.apps.ess.myLeave.tabApplyLeaveUI.leave_id = leaveEntryData.id;
                this.leaveEntryData = leaveEntryData;
                kony.application.showLoadingScreen("", "", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, {});
                kony.apps.coe.ess.MVVM.update("MYLEAVE", "leave", leaveEntryData, (this.leaveNoteUpdate).bind(this), (this.leaveUpdateError).bind(this));
            } else {
                this.leaveEntryData = leaveEntryData;
                kony.application.showLoadingScreen("", "", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, {});
                kony.apps.coe.ess.MVVM.createRecord("MYLEAVE", "leave", leaveEntryData, (this.leaveNoteCreate).bind(this), (this.leaveCreateError).bind(this));
            }
        }
    },
    leaveNoteCreate: function(response) {
        kony.print("##################  entered leave note create");
        var data = {};
        data.employee_id = kony.apps.ess.myLeave.tabApplyLeaveUI.submitLeave.leaveEntryData.employee_id;
        data.leave_id = kony.apps.ess.myLeave.tabApplyLeaveUI.submitLeave.leaveEntryData.id;
        data.comments = kony.apps.ess.myLeave.tabApplyLeaveUI.submitLeave.leaveEntryData.reason_desc;
        kony.print("##################  comments = " + data.comments);
        if (data.comments !== "" && data.comments !== undefined && data.comments !== null) {
            var date = new Date();
            var timestamp = date.getFullYear().toString().trim(0, 4) + "" + getTimeHourswithZero(date.getMonth() + 1) + "" + getTimeHourswithZero(date.getDate()) + "" + getTimeHourswithZero(date.getHours()) + "" + getTimeHourswithZero(date.getMinutes()) + "" + getTimeHourswithZero(date.getSeconds());
            data.createdts = timestamp;
            kony.apps.coe.ess.MVVM.createRecord("MYLEAVE", "leave_note", data, kony.apps.ess.myLeave.tabApplyLeaveUI.submitLeave.leaveCreateSuccess, kony.apps.ess.myLeave.tabApplyLeaveUI.submitLeave.leaveCreateError);
        } else {
            kony.apps.ess.myLeave.tabApplyLeaveUI.submitLeave.leaveCreateSuccess();
        }
    },
    leaveNoteUpdate: function(response) {
        kony.print("##################  entered leave note update");
        var data = {};
        data.employee_id = kony.apps.ess.myLeave.tabApplyLeaveUI.submitLeave.leaveEntryData.employee_id;
        data.leave_id = kony.apps.ess.myLeave.tabApplyLeaveUI.submitLeave.leaveEntryData.id;
        data.comments = kony.apps.ess.myLeave.tabApplyLeaveUI.submitLeave.leaveEntryData.reason_desc;
        if (data.comments !== "" && data.comments !== undefined && data.comments !== null && kony.apps.coe.ess.myLeave.applyLeave.preShow.currentComment !== data.comments) {
            var date = new Date();
            var timestamp = date.getFullYear().toString().trim(0, 4) + "" + getTimeHourswithZero(date.getMonth() + 1) + "" + getTimeHourswithZero(date.getDate()) + "" + getTimeHourswithZero(date.getHours()) + "" + getTimeHourswithZero(date.getMinutes()) + "" + getTimeHourswithZero(date.getSeconds());
            data.createdts = timestamp;
            kony.apps.coe.ess.MVVM.createRecord("MYLEAVE", "leave_note", data, kony.apps.ess.myLeave.tabApplyLeaveUI.submitLeave.leaveCreateSuccess, kony.apps.ess.myLeave.tabApplyLeaveUI.submitLeave.leaveCreateError);
        } else {
            kony.apps.ess.myLeave.tabApplyLeaveUI.submitLeave.leaveCreateSuccess();
        }
    },

    leaveCreateSuccess: function(response) {
        kony.print("#############$$$$$$$$$$$$$$$$$$$   create success" + response);
        if (kony.net.isNetworkAvailable(constants.NETWORK_TYPE_ANY)) {
            kony.apps.coe.ess.frmLogin.mediaSync(kony.apps.ess.myLeave.tabApplyLeaveUI.submitLeave.successSyncCreate, function(err) {});
        } else {
            kony.apps.ess.myLeave.tabApplyLeaveUI.submitLeave.successSyncCreate();
        }
    },
    successSyncCreate: function(res) {
        kony.print("#############$$$$$$$$$$$$$$$$$$$   successSyncCreate");
        kony.apps.ess.myLeave.tabApplyLeaveUI.submitLeave.ScopeObject = "MyLeave2";
        if (kony.apps.ess.myLeave.tabApplyLeaveUI.submitLeave.imgIndex === 0) {
            kony.apps.ess.myLeave.tabmedia.seq = 0;
        }
        if (kony.apps.ess.myLeave.tabApplyLeaveUI.Attachment.proofData.length > 0 && kony.apps.ess.myLeave.tabApplyLeaveUI.submitLeave.imgIndex < kony.apps.ess.myLeave.tabApplyLeaveUI.Attachment.proofData.length) {
            var i = kony.apps.ess.myLeave.tabApplyLeaveUI.submitLeave.imgIndex;
            if (kony.apps.ess.myLeave.tabApplyLeaveUI.Attachment.proofData[i].leave_id === null) {
                (new kony.apps.ess.myLeave.tabmedia()).updateBinaryContent(kony.apps.ess.myLeave.tabApplyLeaveUI.Attachment.proofData[i].imgProof, kony.apps.ess.myLeave.tabApplyLeaveUI.submitLeave.multipleImageUploadSuccess, kony.apps.ess.myLeave.tabApplyLeaveUI.submitLeave.mediaError);
            } else {
                kony.apps.ess.myLeave.tabApplyLeaveUI.submitLeave.multipleImageUploadSuccess();
            }
        } else {
            kony.apps.ess.myLeave.tabApplyLeaveUI.submitLeave.mediaUploadSuccess();
            //             kony.apps.coe.ess.myLeave.MyLeaveHomeUI.showLeaveHome();
        }
    },
    leaveCreateError: function(err) {
        kony.print("#############$$$$$$$$$$$$$$$$$$$   leaveCreateError");
        kony.application.dismissLoadingScreen();
        kony.print(err);
        alert(err);
        //kony.apps.ess.myLeave.MyLeaveHomeUI.showLeaveHome();
    },

    leaveUpdateSuccess: function(res) {
        kony.print("#############$$$$$$$$$$$$$$$$$$$   leaveUpdateSuccess");
        if (kony.net.isNetworkAvailable(constants.NETWORK_TYPE_ANY)) {
            kony.apps.coe.ess.frmLogin.mediaSync(kony.apps.ess.myLeave.tabApplyLeaveUI.submitLeave.successSyncCreate, function(err) {});
        } else {
            kony.apps.ess.myLeave.tabApplyLeaveUI.submitLeave.successSyncCreate();
        }
    },

    leaveUpdateError: function(err) {
        kony.print("#############$$$$$$$$$$$$$$$$$$$   leaveUpdateError");
        kony.application.dismissLoadingScreen();
        kony.print(JSON.stringify(err));
        alert(err);
        //kony.apps.coe.ess.myLeave.MyLeaveHomeUI.showLeaveHome();
    },

    multipleImageUploadSuccess: function(res) {
        kony.print("#############$$$$$$$$$$$$$$$$$$$   multipleImageUploadSuccess");
        kony.apps.ess.myLeave.tabApplyLeaveUI.submitLeave.imgIndex = kony.apps.ess.myLeave.tabApplyLeaveUI.submitLeave.imgIndex + 1;
        kony.apps.ess.myLeave.tabApplyLeaveUI.submitLeave.successSyncCreate();
    },

    mediaUploadSuccess: function(res) {
        kony.print("#############$$$$$$$$$$$$$$$$$$$   mediaUploadSuccess");
        try {
            if (kony.net.isNetworkAvailable(constants.NETWORK_TYPE_ANY)) {
                kony.apps.coe.ess.frmLogin.mediaSync(kony.apps.ess.myLeave.tabApplyLeaveUI.submitLeave.successCreation, function(err) {});
            } else {
                kony.application.dismissLoadingScreen();
                //	alert("NO NETWORK!");
                //kony.apps.coe.ess.myLeave.MyLeaveHomeUI.showLeaveHome();
            }
        } catch (err) {
            handleError(err);
        }
        kony.print("-- profilePictureSuccessCallBack: End --");

    },

    mediaError: function(err) {
        kony.print("#############$$$$$$$$$$$$$$$$$$$   mediaUploadSuccess");

        kony.application.dismissLoadingScreen();
        //kony.apps.coe.ess.myLeave.MyLeaveHomeUI.showLeaveHome();
        alert(err);
    },

    successCreation: function(res) {
        kony.print("#############$$$$$$$$$$$$$$$$$$$   successCreation");
        (new kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard()).addCalendarOnLeaveHome();
        (new kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard()).isValidMonthandYearforCalender();
        var formController = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmTabLeaveDashboard");
        formController.loadDataAndShowForm();
        kony.application.dismissLoadingScreen();
    }

};

kony.apps.ess.myLeave.tabApplyLeaveUI.convertTo24Hour = function(time) {
    var hours = parseInt(time.substr(0, 2));
    if (time.indexOf('AM') != -1 && hours == 12) {
        time = time.replace('12', '0');
    }
    if (time.indexOf('PM') != -1 && hours < 12) {
        time = time.replace(hours, (hours + 12));
    }
    return time.replace(/(AM|PM)/, '');
};