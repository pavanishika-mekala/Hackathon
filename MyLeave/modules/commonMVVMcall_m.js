/*** @Author Sumeet.bartha@kony.com
 * @category Business Logic / Action
 * @desc  Login class
 * @ © 2016 Kony Inc. */
kony = kony || {};
kony.apps = kony.apps || {};
kony.apps.coe = kony.apps.coe || {};
kony.apps.coe.ess = kony.apps.coe.ess || {};
kony.apps.coe.ess.MVVM = kony.apps.coe.ess.MVVM || {};
kony.apps.coe.ess.MVVM.objectservice = kony.apps.coe.ess.MVVM.objectservice || {};
// %Region - Methods in leaveWallet
/**
 * @member of  leaveWallet
 * @param {ModelName-DatabaseName} ModelName - ModelName of the object to be used.
 * @param {dataObject - TableName} dataobject - dataobject name of the Model to be accessed
 * @param {sqlQuery} - queryParams - any queryParam required to fetch data
 * @param {callback} - successcallback - successcallback function
 * @param {callback} - errorcallback - failure/error callback function
 * @return {void} - none.
 * @throws Exception if something goes wrong,
 */
kony.apps.coe.ess.MVVM.objectservice =
    function(ModelName, dataobject, queryParams, successcallback, errorcallback) {
        try {
            kony.print("--------------------in kony.apps.coe.ess.MVVM.objecservice commomMVVMcalls_m.js");
            var objServiceInstance = kony.sdk.getCurrentInstance().getObjectService(ModelName, {
                "access": "offline"
            });

            var dataObject = new kony.sdk.dto.DataObject(dataobject);
            var options = {
                "dataObject": dataObject,
                "queryParams": queryParams
            };
            objServiceInstance.fetch(options, successcallback, errorcallback);
            kony.print("--------------------out of kony.apps.coe.ess.MVVM.objecservice commomMVVMcalls_m.js");
        } catch (e) {
            kony.print("MVVM Error at CommonMVVMcalls.js at Fetch Data" + JSON.stringify(e));
        }
    };
// %Region - Methods in leaveWallet
/**
 * @member of  leaveWallet
 * @param {ModelName-DatabaseName} ModelName - ModelName of the object to be used.
 * @param {dataObject - TableName} dataobject - dataobject name of the Model to be accessed
 * @param {sqlQuery} - queryParams - sqllite query to be executed - {write only end part i.e do not write select * from dataobjet ,}
 * @param {callback} - successcallback - successcallback function
 * @param {callback} - errorcallback - failure/error callback function
 * @return {void} - none.
 * @throws Exception if something goes wrong,
 */
kony.apps.coe.ess.MVVM.executequery =
    function(ModelName, dataobject, queryParams, successcallback, errorcallback) {
        try {
            kony.print("--------------------in kony.apps.coe.ess.MVVM.executequery commomMVVMcalls_m.js");
            var objServiceInstance = kony.sdk.getCurrentInstance().getObjectService(ModelName, {
                "access": "offline"
            });

            var dataObject = new kony.sdk.dto.DataObject(dataobject);
            objServiceInstance.executeSelectQuery("select * from " + dataobject + " " + queryParams, successcallback, errorcallback);
            kony.print("--------------------out kony.apps.coe.ess.MVVM.executequery commomMVVMcalls_m.js");
        } catch (e) {
            kony.print("MVVM Error at CommonMVVMcalls.js at Fetch Data" + JSON.stringify(e));
        }
    };
// %Region - Methods in leaveWallet
/**
 * @member of  leaveWallet
 * @param {ModelName-DatabaseName} ModelName - ModelName of the object to be used.
 * @param {dataObject - TableName} dataobject - dataobject name of the Model to be accessed
 * @param {Array} - rowData - Array of JSON  {"fieldName": somefieldname, "fieldData":somefieldata}
 * @param {callback} - successcallback - successcallback function
 * @param {callback} - errorcallback - failure/error callback function
 * @return {void} - none.
 * @throws Exception if something goes wrong,
 */
kony.apps.coe.ess.MVVM.createRecord =
    function(ModelName, dataobject, rowData, successcallback, errorcallback) {
        try {
            kony.print("--------------------in kony.apps.coe.ess.MVVM.createRecord commomMVVMcalls_m.js");
            if(kony.apps.coe.ess.globalVariables.isWebDesktop === true){
               var objServiceInstance = kony.sdk.getCurrentInstance().getObjectService(ModelName, {
                    "access": "online"
                }); 
            }
            else{
                var objServiceInstance = kony.sdk.getCurrentInstance().getObjectService(ModelName, {
                    "access": "offline"
                });
            }
            
            var dataObject = new kony.sdk.dto.DataObject(dataobject, rowData);
            var options = {
                "dataObject": dataObject
            };
            objServiceInstance.create(options, successcallback, errorcallback);
            kony.print("--------------------out of kony.apps.coe.ess.MVVM.createRecord commomMVVMcalls_m.js");
        } catch (e) {
            handleError(e);
        }
    };
// %Region - Methods in leaveWallet
/**
 * @member of  leaveWallet
 * @param {ModelName-DatabaseName} ModelName - ModelName of the object to be used.
 * @param {dataObject - TableName} dataobject - dataobject name of the Model to be accessed
 * @param {Array} rowData - Array of JSON  {"fieldName": somefieldname, "fieldData":somefieldata}
 * @param {callback} - successcallback - successcallback function
 * @param {callback} - errorcallback - failure/error callback function
 * @return {void} - none.
 * @throws Exception if something goes wrong,
 */
kony.apps.coe.ess.MVVM.update =
    function(ModelName, dataobject, rowData, successcallback, errorcallback) {
        try {
            kony.print("--------------------in kony.apps.coe.ess.MVVM.update commomMVVMcalls_m.js");
            var objServiceInstance = kony.sdk.getCurrentInstance().getObjectService(ModelName, {
                "access": "offline"
            });

            var dataObject = new kony.sdk.dto.DataObject(dataobject,rowData);
          	var options = {
                "dataObject": dataObject
            };
            objServiceInstance.update(options, successcallback, errorcallback);
            kony.print("--------------------out kony.apps.coe.ess.MVVM.update commomMVVMcalls_m.js");
        } catch (e) {
            kony.print("MVVM Error at CommonMVVMcalls.js at Fetch Data" + JSON.stringify(e));
        }
    };
/**
 * @member of  MVVM object
 * @param {ModelName-DatabaseName} ModelName - ModelName of the object to be used.
 * @param {dataObject - TableName} dataobject - dataobject name of the Model to be accessed
 * @param {sqlQuery} - queryParams - any queryParam required to fetch data
 * @param {callback} - successcallback - successcallback function
 * @param {callback} - errorcallback - failure/error callback function
 * @return {void} - none.
 * @throws Exception if something goes wrong,
 */
kony.apps.coe.ess.MVVM.OnlineServiceCall =
    function(ModelName, dataobject, queryParams, successcallback, errorcallback) {
        try {
            kony.print("--------------------in kony.apps.coe.ess.MVVM.objecservice commomMVVMcalls_m.js");
            var objServiceInstance = kony.sdk.getCurrentInstance().getObjectService(ModelName, {
                "access": "online"
            });

            var dataObject = new kony.sdk.dto.DataObject(dataobject);
            var options = {
                "dataObject": dataObject,
                "queryParams": queryParams
            };
            objServiceInstance.fetch(options, successcallback, errorcallback);
            kony.print("--------------------out of kony.apps.coe.ess.MVVM.objecservice commomMVVMcalls_m.js");
        } catch (e) {
            kony.print("MVVM Error at CommonMVVMcalls.js at Fetch Data" + JSON.stringify(e));
        }
    };

/**
 * @member of  MVVM object
 * @param {ModelName-DatabaseName} ModelName - ModelName of the object to be used.
 * @param {dataObject - TableName} dataobject - dataobject name of the Model to be accessed
 * @param {sqlQuery} - queryParams - any queryParam required to fetch data
 * @param {callback} - successcallback - successcallback function
 * @param {callback} - errorcallback - failure/error callback function
 * @return {void} - none.
 * @throws Exception if something goes wrong,
 */
kony.apps.coe.ess.MVVM.partialUpdate =
    function(ModelName, dataobject, rowData, successcallback, errorcallback) {
        try {
            kony.print("--------------------in kony.apps.coe.ess.MVVM.update commomMVVMcalls_m.js");
            if(kony.apps.coe.ess.globalVariables.isWebDesktop === true){
               var objServiceInstance = kony.sdk.getCurrentInstance().getObjectService(ModelName, {
                    "access": "online"
                }); 
            }
            else{
                var objServiceInstance = kony.sdk.getCurrentInstance().getObjectService(ModelName, {
                    "access": "offline"
                });
            }

            var dataObject = new kony.sdk.dto.DataObject(dataobject,rowData);
            var options = {
                "dataObject": dataObject
            };
            objServiceInstance.partialUpdate(options, successcallback, errorcallback);
            kony.print("--------------------out kony.apps.coe.ess.MVVM.update commomMVVMcalls_m.js");
        } catch (e) {
            kony.print("MVVM Error at CommonMVVMcalls.js at Fetch Data" + JSON.stringify(e));
        }
    };