
/*** @Author Rohit.Uppala@kony.com
 * @category Business Logic / Action  / UI data Binding
 * @desc  Login class
 * @ © 2016 Kony Inc. */
kony = kony || {};
kony.apps = kony.apps || {};
kony.apps.coe = kony.apps.coe || {};
kony.apps.coe.myLeave = kony.apps.coe.myLeave || {};

//%Region - Constructor
kony.apps.coe.myLeave.searchStatus = function () {};
kony.apps.coe.myLeave.searchStatus.data = "";

// %Region - Methods in search
/**
 * @class       searchStatus
 * @type        UI
 * @param       None
 * return       None.
 * desc         This method is used to make a MVVM call to get data from backend.
 */

kony.apps.coe.myLeave.searchStatus.prototype.showForm = function () {
	kony.print("-------------------- in kony.apps.coe.myLeave.searchStatus.prototype. ");
	try {
		kony.apps.coe.myLeave.searchStatus.data = frmSearchLog.lblLeaveStatus.text;
        var formController = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmStatusSearch");
		formController.loadDataAndShowForm();
	} catch (e) {
		handleError(e);
	}
	kony.print("--------------------out of kony.apps.coe.myLeave.searchStatus.prototype.");
};


/**
 * @class       searchStatus
 * @type        UI
 * @param       None
 * return       Processed Data.
 * desc         This method is used to map data from backend .
 */

kony.apps.coe.myLeave.searchStatus.prototype.widMap = function (data) {
	kony.print("-------------in searchStatus widMap");
	var processedData = [];
	if (kony.apps.coe.myLeave.searchStatus.data.indexOf("All") != -1)
		processedData = [{
				"lblSearchTxt" : "All",
				"imgStatusSelection" : "checkboxactive.png",
				"lblLine1" : " "
			}
		];
	else
		processedData = [{
				"lblSearchTxt" : "All",
				"imgStatusSelection" : "checkboxinactive.png",
				"lblLine1" : " "
			}
		];
	for (var i = 0; i < data.segStatus.length; i++) {
      	
		if (data.segStatus[i].Status_Name.toLowerCase() != "sentback" && data.segStatus[i].Status_Name.toLowerCase() != "saved" && data.segStatus[i].Status_Name.toLowerCase() != "error" && data.segStatus[i].Status_Name.toLowerCase() != "submitted") {
			var status = {};
          	if(data.segStatus[i].Id == 0)
				status.lblSearchTxt = kony.i18n.getLocalizedString("i18n.ess.common.approved.valueKA");
          else if(data.segStatus[i].Id == 1)
            status.lblSearchTxt = kony.i18n.getLocalizedString("i18n.ess.common.rejected.valueKA");
          else if(data.segStatus[i].Id == 2)
            status.lblSearchTxt = kony.i18n.getLocalizedString("i18n.ess.common.pending.valueKA");
          else if(data.segStatus[i].Id == 3)
            status.lblSearchTxt = kony.i18n.getLocalizedString("i18n.ess.common.cancelled.valueKA");
			if (kony.apps.coe.myLeave.searchStatus.data === "select status") {
				status.imgStatusSelection = "checkboxinactive.png";
			} else {
				if (kony.apps.coe.myLeave.searchStatus.data.indexOf(status.lblSearchTxt) != -1) {
					status.imgStatusSelection = "checkboxactive.png";
				} else {
					status.imgStatusSelection = "checkboxinactive.png";
				}

			}
			status.lblLine1 = " ";
			processedData.push(status);
		}

	}
	kony.print("-------------out of searchStatus widMap");
	return processedData;

};

/**
 * @class       searchStatus
 * @type        UI
 * @param       None
 * return       None.
 * desc         This method is used to set data to segment.
 */

kony.apps.coe.myLeave.searchStatus.prototype.setDataseg = function (data) {
	kony.print("---------in searchstatus setDataseg");
  	var selectedItems = String(frmSearchLog.lblLeaveStatus.text);
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

	frmStatusSearch.segStatus.widgetDataMap = {
		"lblSearchTxt" : "lblSearchTxt",
		"imgStatusSelection" : "imgStatusSelection",
		"lblLine1" : "lblLine1"
	};
	frmStatusSearch.segStatus.setData(data);
  
    frmStatusSearch.segStatus.selectedRowIndices = [[0, selectedItems]];

	kony.print("---------out of searchstatus setDataseg");
};
/**
 * @class       searchStatus
 * @type        UI
 * @param       None
 * return       None.
 * desc         This method is used change the image in segment on row click.
 */

kony.apps.coe.myLeave.searchStatus.prototype.rowClick = function() {

    kony.print("----------------------in kony.apps.coe.myLeave.searchStatus.prototype.rowClick");
    try {
        var segSelectedItems = [];
        if (frmStatusSearch.segStatus.selectedItems !== null) {
            var index = frmStatusSearch.segStatus.selectedRowIndex[1];
            var sData = frmStatusSearch.segStatus.data[index];
            var selData = frmStatusSearch.segStatus.data;
            if (sData.lblSearchTxt.toLowerCase() === "all") {
                if (sData.imgStatusSelection === "checkboxinactive.png") {
                    for (var i in selData) {
                        if (i === 0) {
                            selData[i].imgStatusSelection = "checkboxactive.png";
                        } else {
                            selData[i].imgStatusSelection = "checkboxinactive.png";
                        }
                    }
                    frmStatusSearch.segStatus.setData(selData);
                    frmStatusSearch.segStatus.selectedRowIndices = [
                        [0, [0]]
                    ];
                } else {
                    selData[0].imgStatusSelection = "checkboxinactive.png";
                    frmStatusSearch.segStatus.setData(selData);
                }
            } else {
                for (var i = 0; i < frmStatusSearch.segStatus.selectedItems.length; i++) {
                    if (frmStatusSearch.segStatus.selectedRowIndices[0][1][i] !== 0)
                        segSelectedItems.push(frmStatusSearch.segStatus.selectedRowIndices[0][1][i]);
                }
              	selData[0].imgStatusSelection = "checkboxinactive.png";
                frmStatusSearch.segStatus.setData(selData);
                frmStatusSearch.segStatus.selectedRowIndices = [
                    [0, segSelectedItems]
                ];
            }
        }
    } catch (err) {
        handleError(err);
    }
    kony.print("-----------------------out of kony.apps.coe.myLeave.searchStatus.prototype.rowClick");
};