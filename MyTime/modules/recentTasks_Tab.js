 function fetchDataForRecentTasks() {
        try {
            var arr = kony.ds.read(kony.apps.coe.ess.myTime.TimesheetCreate.Backend.RecentTasksIdForKonyStore);
            arr = arr === null ? [] : arr;
            arr.reverse();
            var allids = "";
            for (var i in arr) {
                allids += "'" + arr[i] + "',";
            }
            if (arr.length > 0) {
                allids = allids.substring(0, allids.length - 1);
            }
            var query = "SELECT pt.id as Project_Task_Id, pt.Type as Project_Task_Type, pt.Project_Id as Project_Id, pt.Task_Id as Task_Id, t.Task_Name as Task_Name, p.Project_Name as Project_Name FROM Project_Task pt" +
                " LEFT JOIN Project p ON pt.Project_Id = p.id" +
                " LEFT JOIN Task t ON pt.Task_Id = t.id" +
                " where pt.id IN (" + allids + ")";
            kony.apps.coe.ess.MVVM.executeDBQuery("MYTIME", query, success, function(res) {
                handleError(res);
            });
            //this.$class.$superp.fetchData.call(this, success, error);
        } catch (err) {
          //  kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
            kony.print("Error in fetchData of controllerExtension");
        }

        function success(response) {
            kony.print("success fetching data ", response);
            processDataForRecentTasks(response);
        }

        function error(err) {
            //Error fetching data
            //kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
            kony.print("In fetchData errorcallback in controller extension ", err);
         
        }
    }
    /** 
     * This method processes fetched data. Developer can edit.
     * Default implementation processes the provided data to required format for bind.
     * @param {Object} data - fetched data. (Default : data map, group id as key and records array as value)
     * @memberof frmTimeSheetCreateTabControllerExtension#
     * @returns {Object} - processed data
     */
    function processDataForRecentTasks(data) {
        try {
            kony.print("---Entered processData of frmTimeSheetCreateTab");
            var processedData = [];
            if (data !== null && data.length > 0) {
                for (var i = 0; i < data.length; i++) {
                    processedData.push({
                        projectName: data[i].Project_Name === null ? "" : data[i].Project_Name,
                        taskName: data[i].Task_Name === null ? "" : data[i].Task_Name,
                        orderId: data[i].Project_Task_Type + "-" + data[i].Project_Task_Id,
                        activityOrder: data[i].Task_Id === "" ? "" : "A.O - " + data[i].Task_Id,
                      	projectId : data[i].Project_Task_Id,
                      	projectType : data[i].Project_Task_Type
                    });
                }
            }
            bindDataForRecentTasks(processedData);
            kony.print("---End processData of frmTimeSheetCreateTab");
          //  return processedData;
        } catch (err) {
           // kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
            kony.print("Error in processData of controllerExtension",err);
           
        }
    }
    /** 
     * This method binds the processed data to the form. Developer can edit.
     * Default implementation binds the data to widgets in the form.
     * @param {Object} data - processed data.(Default : data map for each group, widget id as key and widget data as value)
     * @memberof frmTimeSheetCreateTabControllerExtension#
     */
    function bindDataForRecentTasks(data) {
        try {
            kony.print("---Entered bindData of frmTimeSheetCreateTab");
            if (data !== null && data.length > 0) {
                frmTimeSheetCreateTab.lblNoTasks.setVisibility(false);
                frmTimeSheetCreateTab.segRecentTasks.setVisibility(true);
                var widgetDataMap = {
                    "lblProjectName": "projectName",
                    "lblTaskName": "taskName",
                    "lblNetworkOrder": "orderId",
                    "lblActivityOrder": "activityOrder"
                };
               
                 frmTimeSheetCreateTab.segRecentTasks.widgetDataMap =widgetDataMap;
                 frmTimeSheetCreateTab.segRecentTasks.setData(data);
                 frmTimeSheetCreateTab.lblNoTasks.setVisibility(false);
            } else {
                frmTimeSheetCreateTab.lblNoTasks.setVisibility(true);
                frmTimeSheetCreateTab.segRecentTasks.setVisibility(false);
            }
            frmTimeSheetCreateTab.flxRecentTask.setVisibility(true);
            frmTimeSheetCreateTab.flxOuterTask.setVisibility(false);
            kony.print("---End bindData of frmTimeSheetCreateTab");
        } catch (err) {           
            kony.print("Error in bindData of controllerExtension",err);
            handleError(err);
        }

    }

function searchBoxStretchAnimation(){
  frmTimeSheetCreateTab.tbxSearch.skin="sknFFFFFF2ebaee";
  frmTimeSheetCreateTab.tbxSearch.animate(
    kony.ui.createAnimation({
        "100": {
            "left": "3%",
             "width":"93%",
            "stepConfig": {
                "timingFunction": kony.anim.EASE
            }
        }
    }), {
        "delay": 0.1,
        "iterationCount": 1,
        "fillMode": kony.anim.FILL_MODE_FORWARDS,
        "duration": 1.5
    }, {
        "animationEnd": function(){
          fetchDataForRecentTasks();
        }
    });
}

function searchBoxContractAnimation(){
  frmTimeSheetCreateTab.tbxSearch.skin="skntbx9d9d9d";
  frmTimeSheetCreateTab.tbxSearch.animate(
    kony.ui.createAnimation({
        "100": {
            "left": "51%",
             "width":"45%",
            "stepConfig": {
                "timingFunction": kony.anim.EASE
            }
        }
    }), {
        "delay": 0.1,
        "iterationCount": 1,
        "fillMode": kony.anim.FILL_MODE_FORWARDS,
        "duration": 1.5
    }, {
        "animationEnd": function(){
          frmTimeSheetCreateTab.flxRecentTask.setVisibility(false);
          frmTimeSheetCreateTab.flxOuterTask.setVisibility(true);
        }
    });
}
