/** 
 *  @author     Shantam Agarwal
 *  @category   Business Logic.	
 *  @desc       Contains UI related code for frmLeaveWalletDW
 *  @ © 2016    Kony Inc. 
 */
kony = kony || {};
kony.apps = kony.apps || {};
kony.apps.coe = kony.apps.coe || {};
kony.apps.coe.ess = kony.apps.coe.ess || {};
kony.apps.coe.ess.myLeave = kony.apps.coe.ess.myLeave || {};
kony.apps.coe.ess.myLeave.frmLeaveWalletDW = kony.apps.coe.ess.myLeave.frmLeaveWalletDW || {};

/**
 * @memberof       frmLeaveWalletDW
 * @param          None.
 * @return         None.
 * @description    initializes UI for Leave Wallet Form
 */
kony.apps.coe.ess.myLeave.frmLeaveWalletDW.initializeUI = function(dataParam){
	frmLeaveWalletDW.destroy();
	var numOfRows = Math.ceil(dataParam.length/3);
	kony.apps.coe.ess.myLeave.frmLeaveWalletDW.generateRows(numOfRows, kony.apps.coe.ess.myLeave.frmLeaveWalletDW.generateTiles.bind(this, dataParam));
}


/**
 * @memberof       frmLeaveWalletDW
 * @param          None.
 * @return         None.
 * @description    generates rows for tiles
 */
kony.apps.coe.ess.myLeave.frmLeaveWalletDW.generateRows = function(rowCount, callback){
	var flexChildrenCount = frmLeaveWalletDW.flxMain.children.length;
	for(var i=1; i<=rowCount; i++){
		var newRowFlex = new kony.ui.FlexContainer({
	        "id": "flxWalletTileContainer"+i,
	        "top": "30dp",
	        "left": "0dp",
	        "width": "100%",
	        "height": "230dp",
	        "zIndex": 1,
	        "isVisible": true,
	        "clipBounds": true,
	        "layoutType": kony.flex.FLOW_HORIZONTAL,
	        "skin": "slFbox"
	    }, {
	        "padding": [0, 0, 0, 0]
	    }, {});;
		frmLeaveWalletDW.flxMain.addAt(newRowFlex, flexChildrenCount-2);
	}
	callback()
}

/**
 * @memberof       frmLeaveWalletDW
 * @param          None.
 * @return         None.
 * @description    populates tiles in rows
 */
kony.apps.coe.ess.myLeave.frmLeaveWalletDW.generateTiles = function(dataParam){
	var rowIterator = 1;
	for(var i=0; i<dataParam.length; i++){
		if(i%3 === 0 && i!= 0){
			rowIterator++;
		}
		var newTileFlex =  kony.apps.coe.ess.myLeave.frmLeaveWalletDW.getTileObject(i);
		frmLeaveWalletDW["flxWalletTileContainer"+rowIterator].add(newTileFlex);
	}
	kony.apps.coe.ess.myLeave.frmLeaveWalletDW.setLeaveTypes(dataParam);
}

/**
 * @memberof       frmLeaveWalletDW
 * @param          None.
 * @return         None.
 * @description    Creates and Returns a single tile
 */
kony.apps.coe.ess.myLeave.frmLeaveWalletDW.getTileObject = function(suffix){
	var newTileFlex = new kony.ui.FlexContainer({
	        "id": "flxLeaveTile"+suffix,
	        "top": "0dp",
	        "left": "3.10%",
	        "width": "29.2%",
	        "height": "100%",
	        "zIndex": 1,
	        "isVisible": true,
	        "clipBounds": true,
	        "layoutType": kony.flex.FLOW_VERTICAL,
	        "skin": "sknFlxMobFAFAFAOp100BorderEFEFEF1pxDW"
	    }, {
	        "padding": [0, 0, 0, 0]
	    }, {});
	var newLeaveCountLabel = new kony.ui.Label(
		{
			id:"lblLeaveCount"+suffix, 
			skin:"sknLbl5677fc36pxMediumDW", 
			text:"20", 
			isVisible:true,
			top: "35dp",
			centerX: "50%"
		},{
	        "padding": [0, 0, 0, 0]
	    }, {});
	newTileFlex.add(newLeaveCountLabel);
	var newTotalAvailableLabel = new kony.ui.Label(
		{
			id:"lblTotalAvailable"+suffix, 
			skin:"sknLbl77777712pxRomanDW", 
			text:"AVAILABLE OF TOTAL 18", 
			isVisible:true,
			top: "6dp",
			centerX: "50%"
		},{
	        "padding": [0, 0, 0, 0]
	    }, {});
	newTileFlex.add(newTotalAvailableLabel);
	var newLeaveName = new kony.ui.Label(
		{
			id:"lblLeaveName"+suffix, 
			skin:"sknLbl52627018pxMediumDW", 
			text:"Casual Leave", 
			isVisible:true,
			top: "28dp",
			centerX: "50%"
		},{
	        "padding": [0, 0, 0, 0]
	    }, {});
	newTileFlex.add(newLeaveName);
	var progressBarFlex = new kony.ui.FlexContainer({
	        "id": "flxProgressBar"+suffix,
	        "top": "20dp",
	        "width": "200dp",
	        "height": "100%",
	        "zIndex": 1,
	        "isVisible": true,
	        "clipBounds": true,
	        "layoutType": kony.flex.FREE_FORM,
	        "skin": "slFbox",
			"centerX": "50%"
	    }, {
	        "padding": [0, 0, 0, 0]
	    }, {});
	var progressBarBack = new kony.ui.FlexContainer({
	        "id": "flxProgressBarBack"+suffix,
	        "top": "0dp",
	        "width": "100%",
	        "height": "6dp",
	        "zIndex": 1,
	        "isVisible": true,
	        "clipBounds": true,
	        "layoutType": kony.flex.FREE_FORM,
	        "skin": "sknFlxC9F2F1Op100Bor1pxR5pxOp0DW",
			"centerX": "50%"
	    }, {
	        "padding": [0, 0, 0, 0]
	    }, {});
	var progressBarFront = new kony.ui.FlexContainer({
	        "id": "flxProgressBarFront"+suffix,
	        "top": "0dp",
	        "left":"0dp",
	        "width": "30%",
	        "height": "6dp",
	        "zIndex": 2,
	        "isVisible": true,
	        "clipBounds": true,
	        "layoutType": kony.flex.FREE_FORM,
	        "skin": "sknFlx3ed8d51Op100Bor1pxR5pxOp0DW"
	    }, {
	        "padding": [0, 0, 0, 0]
	    }, {});
	progressBarFlex.add(progressBarBack);
	progressBarFlex.add(progressBarFront);
	newTileFlex.add(progressBarFlex);
	return newTileFlex;
}

/**
 * @memberof       frmLeaveWalletDW
 * @param          None.
 * @return         None.
 * @description    Creates and Returns a single tile
 */
kony.apps.coe.ess.myLeave.frmLeaveWalletDW.setLeaveTypes = function(dataParam){
	var tileNum;
	for(var i=0; i<dataParam.length; i++){
		// tileNum = i+1;
		frmLeaveWalletDW["lblLeaveCount"+i].text = (parseInt(dataParam[i].balance)).toString();
		frmLeaveWalletDW["lblLeaveName"+i].text = dataParam[i].leave_type_name;
		frmLeaveWalletDW["lblTotalAvailable"+i].text = "AVAILABLE OF TOTAL " + (parseInt(dataParam[i].availed) + parseInt(dataParam[i].balance)).toString();
	}
	kony.apps.coe.ess.myLeave.frmLeaveWalletDW.setWidthOfProgressBars(dataParam);
	kony.apps.coe.ess.myLeave.frmLeaveWalletDW.setColorOfBars(dataParam);

}

/**
 * @memberof       frmLeaveWalletDW
 * @param          None.
 * @return         None.
 * @description    Set color schemes of different wallets
 */
kony.apps.coe.ess.myLeave.frmLeaveWalletDW.setColorOfBars = function(dataParam){
	for(var i=0; i<dataParam.length; i++){
		var colorObject = kony.apps.coe.ess.myLeave.frmLeaveWalletDW.getColorObject(i);
		frmLeaveWalletDW["lblLeaveCount"+i].skin = colorObject.leaveBalance;
		frmLeaveWalletDW["flxProgressBarBack"+i].skin = colorObject.progressBack;
		frmLeaveWalletDW["flxProgressBarFront"+i].skin = colorObject.progressFront;
	}
}

/**
 * @memberof       frmLeaveWalletDW
 * @param          None.
 * @return         None.
 * @description    Return color object according to index
 */
kony.apps.coe.ess.myLeave.frmLeaveWalletDW.getColorObject = function(index){
	var colorObjectArray = [
		{
			"leaveBalance" : "sknLbl5677fc36pxMediumDW",
			"progressBack":"sknFlxC9F2F1Op100Bor1pxR5pxOp0DW",
			"progressFront": "sknFlx3ed8d51Op100Bor1pxR5pxOp0DW"
		},{
			"leaveBalance" : "sknLblf36c6036pxMediumDW",
			"progressBack":"sknFlxFEB1AA1Op100Bor1pxR5pxOp0DW",
			"progressFront": "sknFlxf36c60Op100Bor1pxR5pxOp0DW"
		},{
			"leaveBalance" : "sknLblFF408136pxMediumDW",
			"progressBack":"sknFlxFEB1AA1Op100Bor1pxR5pxOp0DW",
			"progressFront": "sknFlxf36c60Op100Bor1pxR5pxOp0DW"
		},{
			"leaveBalance" : "sknLbl41a49d36pxMediumDW",
			"progressBack":"sknFlxC9F2F1Op100Bor1pxR5pxOp0DW",
			"progressFront": "sknFlx3ed8d51Op100Bor1pxR5pxOp0DW"
		},{
			"leaveBalance" : "sknLbl4dd0e136pxMediumDW",
			"progressBack":"sknFlxC9F2F1Op100Bor1pxR5pxOp0DW",
			"progressFront": "sknFlx3ed8d51Op100Bor1pxR5pxOp0DW"
		},{
			"leaveBalance" : "sknLbl0091EA36pxMediumDW",
			"progressBack":"sknFlxC9F2F1Op100Bor1pxR5pxOp0DW",
			"progressFront": "sknFlx3ed8d51Op100Bor1pxR5pxOp0DW"
		}
	];
	return colorObjectArray[index];

}

/**
 * @memberof       frmHistoryLeaveRequestDW
 * @param          None.
 * @return         None.
 * @description    changes width of progress bar
 */
kony.apps.coe.ess.myLeave.frmLeaveWalletDW.setWidthOfProgressBars = function(dataParam){
	for(var i=0; i<dataParam.length; i++){
		frmLeaveWalletDW["flxProgressBarFront"+i].width = parseFloat((parseInt(dataParam[i].balance)/(parseInt(dataParam[i].availed) + parseInt(dataParam[i].balance))) *100).toFixed(2).toString()+"%";
	}
}

/**
 * @memberof       frmLeaveDashboard
 * @param          None.
 * @return         None.
 * @description    navigate to leave wallet
 */
kony.apps.coe.ess.myLeave.frmLeaveWalletDW.navigateToLeaveWalletForm = function(){
    var formController = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmLeaveWalletDW");
    formController.loadDataAndShowForm();
}