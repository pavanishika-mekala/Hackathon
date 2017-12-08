kony = kony || {};
kony.apps = kony.apps || {};
kony.apps.coe = kony.apps.coe || {};
kony.apps.coe.ess = kony.apps.coe.ess || {};
kony.apps.coe.ess.myLeave = kony.apps.coe.ess.myLeave || {};
kony.apps.coe.ess.myLeave.frmLeaveWalletTab = kony.apps.coe.ess.myLeave.frmLeaveWalletTab || {};

/**
 * @memberof       frmLeaveWalletTab
 * @param          None.
 * @return         None.
 * @description    initializes UI for Leave Wallet Form
 */
kony.apps.coe.ess.myLeave.frmLeaveWalletTab.initializeUI = function(dataParam){
    frmLeaveWalletTab.flxMain.removeAll();
	var numOfRows = Math.ceil(dataParam.length/3);
	kony.apps.coe.ess.myLeave.frmLeaveWalletTab.generateRows(numOfRows, kony.apps.coe.ess.myLeave.frmLeaveWalletTab.generateTiles.bind(this, dataParam));
}


/**
 * @memberof       frmLeaveWalletTab
 * @param          None.
 * @return         None.
 * @description    generates rows for tiles
 */
kony.apps.coe.ess.myLeave.frmLeaveWalletTab.generateRows = function(rowCount, callback){
	var flexChildrenCount = frmLeaveWalletTab.flxMain.widgets().length;
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
		frmLeaveWalletTab.flxMain.addAt(newRowFlex, 1);
	}
	callback()
}

/**
 * @memberof       frmLeaveWalletTab
 * @param          None.
 * @return         None.
 * @description    populates tiles in rows
 */
kony.apps.coe.ess.myLeave.frmLeaveWalletTab.generateTiles = function(dataParam){
	var rowIterator = 1;
	for(var i=0; i<dataParam.length; i++){
		if(i%3 === 0 && i!= 0){
			rowIterator++;
		}
		var newTileFlex =  kony.apps.coe.ess.myLeave.frmLeaveWalletTab.getTileObject(i);
		frmLeaveWalletTab["flxWalletTileContainer"+rowIterator].add(newTileFlex);
	}
	kony.apps.coe.ess.myLeave.frmLeaveWalletTab.setLeaveTypes(dataParam);
}

/**
 * @memberof       frmLeaveWalletTab
 * @param          None.
 * @return         None.
 * @description    Creates and Returns a single tile
 */
kony.apps.coe.ess.myLeave.frmLeaveWalletTab.getTileObject = function(suffix){
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
 * @memberof       frmLeaveWalletTab
 * @param          None.
 * @return         None.
 * @description    Creates and Returns a single tile
 */
kony.apps.coe.ess.myLeave.frmLeaveWalletTab.setLeaveTypes = function(dataParam){
	var tileNum;
	for(var i=0; i<dataParam.length; i++){
		frmLeaveWalletTab["lblLeaveCount"+i].text = (parseInt(dataParam[i].balance,10)).toString();
		frmLeaveWalletTab["lblLeaveName"+i].text = dataParam[i].leave_type_name;
		frmLeaveWalletTab["lblTotalAvailable"+i].text = "AVAILABLE OF TOTAL " + (parseInt(dataParam[i].availed,10) + parseInt(dataParam[i].balance,10)).toString();
	}
	kony.apps.coe.ess.myLeave.frmLeaveWalletTab.setWidthOfProgressBars(dataParam);
	kony.apps.coe.ess.myLeave.frmLeaveWalletTab.setColorOfBars(dataParam);

}

/**
 * @memberof       frmLeaveWalletTab
 * @param          None.
 * @return         None.
 * @description    Set color schemes of different wallets
 */
kony.apps.coe.ess.myLeave.frmLeaveWalletTab.setColorOfBars = function(dataParam){
	for(var i=0; i<dataParam.length; i++){
		var colorObject = kony.apps.coe.ess.myLeave.frmLeaveWalletTab.getColorObject(i);
		frmLeaveWalletTab["lblLeaveCount"+i].skin = colorObject.leaveBalance;
		frmLeaveWalletTab["flxProgressBarBack"+i].skin = colorObject.progressBack;
		frmLeaveWalletTab["flxProgressBarFront"+i].skin = colorObject.progressFront;
	}
}

/**
 * @memberof       frmLeaveWalletTab
 * @param          None.
 * @return         None.
 * @description    Return color object according to index
 */
kony.apps.coe.ess.myLeave.frmLeaveWalletTab.getColorObject = function(index){
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
kony.apps.coe.ess.myLeave.frmLeaveWalletTab.setWidthOfProgressBars = function(dataParam){
	for(var i=0; i<dataParam.length; i++){
		frmLeaveWalletTab["flxProgressBarFront"+i].width = parseFloat((parseInt(dataParam[i].balance)/(parseInt(dataParam[i].availed) + parseInt(dataParam[i].balance))) *100).toFixed(2).toString()+"%";
	}
}