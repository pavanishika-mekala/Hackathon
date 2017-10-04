/**
 *  @author     Rohit.Uppala
 *  @category   Business Logic.
 *  @desc
 *  @ © 2016    Kony Inc.
 */
kony = kony || {};
kony.apps = kony.apps || {};
kony.apps.coe = kony.apps.coe || {};
kony.apps.coe.ess = kony.apps.coe.ess || {};
kony.apps.coe.ess.myLeave = kony.apps.coe.ess.myLeave || {};

//%Region - Constructor
kony.apps.coe.ess.myLeave.searchLeaveType = function () {};
kony.apps.coe.ess.myLeave.searchLeaveType.data = "";

// %Region - Methods in search
/**
 * @class       searchLeaveType
 * @type        UI
 * @param       None
 * return       None.
 * desc         This method is used to make a MVVM call to get data from backend.
 */

kony.apps.coe.ess.myLeave.searchLeaveType.prototype.showForm = function () {
	kony.print("--------------------in kony.apps.coe.ess.myLeave.searchLeaveType.showForm ");
	try {
		kony.apps.coe.ess.myLeave.searchLeaveType.data = frmSearchLog.lblLeaveTypes.text;
		var formController = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmSearchLeaveType");
		formController.loadDataAndShowForm();
	} catch (e) {
		handleError(e);
	}
	kony.print("--------------------out of kony.apps.coe.ess.myLeave.searchLeaveType.showForm");
};

/**
 * @class       searchLeaveType
 * @type        UI
 * @param       None
 * return       None.
 * desc         This method is used change the image in segment on row click.
 */

kony.apps.coe.ess.myLeave.searchLeaveType.prototype.rowClick = function() {
    kony.print("----------------------in kony.apps.coe.ess.myLeave.searchLeaveType.prototype.rowClick");
    try {
        var segSelectedItems = [];
        if (frmSearchLeaveType.segLeaveType.selectedItems !== null) {
            var index = frmSearchLeaveType.segLeaveType.selectedRowIndex[1];
            var sData = frmSearchLeaveType.segLeaveType.data[index];
            var selData = frmSearchLeaveType.segLeaveType.data;
            if (sData.lblSearchTxt === kony.i18n.getLocalizedString("i18n.ess.MyLeave.frmSearchLeaveType.All")) {
                if (sData.imgStatusSelection === "checkboxinactive.png") {
                    for (var i in selData) {
                        if (i === 0) {
                            selData[i].imgStatusSelection = "checkboxactive.png";
                        } else {
                            selData[i].imgStatusSelection = "checkboxinactive.png";
                        }
                    }
                    frmSearchLeaveType.segLeaveType.setData(selData);
                    frmSearchLeaveType.segLeaveType.selectedRowIndices = [
                        [0, [0]]
                    ];
                } else {
                    selData[0].imgStatusSelection = "checkboxinactive.png";
                    frmSearchLeaveType.segLeaveType.setData(selData);
                }
            } else {
                for (var i = 0; i < frmSearchLeaveType.segLeaveType.selectedItems.length; i++) {
                    if (frmSearchLeaveType.segLeaveType.selectedRowIndices[0][1][i] !== 0)
                        segSelectedItems.push(frmSearchLeaveType.segLeaveType.selectedRowIndices[0][1][i]);
                }
                selData[0].imgStatusSelection = "checkboxinactive.png";
              	frmSearchLeaveType.segLeaveType.setData(selData);
                frmSearchLeaveType.segLeaveType.selectedRowIndices = [
                    [0, segSelectedItems]
                ];
            }
        }
    } catch (err) {
        handleError(err);
    }
    kony.print("-----------------------out of kony.apps.coe.ess.myLeave.searchLeaveType.prototype.rowClick");
};

/**
 * @class       searchLeaveType
 * @type        UI
 * @param       None
 * return       Processed Data.
 * desc         This method is used to process the data from backend.
 */

kony.apps.coe.ess.myLeave.searchLeaveType.prototype.dataProcess = function (data) {
	kony.print("-------------------------- in kony.apps.coe.ess.myLeave.searchLeaveType.dataProcess");
	var processedData = [];
	if (kony.apps.coe.ess.myLeave.searchLeaveType.data.indexOf(kony.i18n.getLocalizedString("i18n.ess.MyLeave.frmSearchLeaveType.All")) != -1)
		processedData = [{
				"lblSearchTxt" : kony.i18n.getLocalizedString("i18n.ess.MyLeave.frmSearchLeaveType.All"),
				"imgStatusSelection" : "checkboxactive.png",
				"lblLine1" : " "
			}
		];
	else
		processedData = [{
				"lblSearchTxt" : kony.i18n.getLocalizedString("i18n.ess.MyLeave.frmSearchLeaveType.All"),
				"imgStatusSelection" : "checkboxinactive.png",
				"lblLine1" : " "
			}
		];

	for (var i = 0; i < data.length; i++) {
		var leaveData = {};
		leaveData.lblSearchTxt = data[i].name;
		if (kony.apps.coe.ess.myLeave.searchLeaveType.data === kony.i18n.getLocalizedString("i18n.ess.myLeave.frmSearchLeaveType.lblTitle.valueKA")) {
			leaveData.imgStatusSelection = "checkboxinactive.png";
		} else {
			if (kony.apps.coe.ess.myLeave.searchLeaveType.data.indexOf(leaveData.lblSearchTxt) != -1) {
				leaveData.imgStatusSelection = "checkboxactive.png";
			} else
				leaveData.imgStatusSelection = "checkboxinactive.png";
		}
		leaveData.lblLine1 = " ";
		processedData.push(leaveData);
	}
	kony.print("-------------------------- out of kony.apps.coe.ess.myLeave.searchLeaveType.dataProcess");
	return processedData;
};

/**
 * @class       searchLeaveType
 * @type        UI
 * @param       None
 * return       None.
 * desc         This method is used to map and set data to segment .
 */

kony.apps.coe.ess.myLeave.searchLeaveType.prototype.setDataToSeg = function (data) {

	kony.print("-------------------------- in kony.apps.coe.ess.myLeave.searchLeaveType.setDataToSeg");
  	var selectedItems = String(frmSearchLog.lblLeaveTypes.text);
  	var selectedItemsArray = selectedItems.split(",");
    var tempJsonselectedItemsArray = {};
  	for(var i in selectedItemsArray) {
        tempJsonselectedItemsArray[selectedItemsArray[i].trim().toLowerCase()] = "";
    }
  	var selectedItems = [];
    for(var i in data){
        if(tempJsonselectedItemsArray[String(data[i].lblSearchTxt).trim().toLowerCase()] !== undefined) {
            selectedItems.push(parseInt(i));
        }
    }

	frmSearchLeaveType.segLeaveType.widgetDataMap = {
		"lblSearchTxt" : "lblSearchTxt",
		"imgStatusSelection" : "imgStatusSelection",
		"lblLine1" : "lblLine1"
	};
	frmSearchLeaveType.segLeaveType.setData(data);
    frmSearchLeaveType.segLeaveType.selectedRowIndices = [[0, selectedItems]];

	kony.print("-------------------------- out of kony.apps.coe.ess.myLeave.searchLeaveType.setDataToSeg");
};
