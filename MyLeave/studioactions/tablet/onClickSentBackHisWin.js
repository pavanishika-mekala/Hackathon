function onClickSentBackHisWin(eventobject) {
    return AS_FlexContainer_abefdf318c3d4b5f9c9d52c2659b484d(eventobject);
}

function AS_FlexContainer_abefdf318c3d4b5f9c9d52c2659b484d(eventobject) {
    if (frmHistory.flxSentBack.skin == "sknFlxSentBackUnselectedWin") {
        frmHistory.flxSentBack.skin = "sknFlxSentBackSelectedWin";
        frmHistory.lblSentBack.skin = "sknLblFFFFFF100Op36Px";
        frmHistory.imgSel4.src = "select_pendingcopy.png";
        sentBack = 4;
        arrStatus.push("4");
    } else {
        frmHistory.flxSentBack.skin = "sknFlxSentBackUnselectedWin";
        frmHistory.lblSentBack.skin = "sknLblSentBackUnselected";
        frmHistory.imgSel4.src = "selectblue.png";
        sentBack = -1;
        for (var j = 0; j < arrStatus.length; j++) {
            if ("4" == arrStatus[j]) arrStatus.splice(j, 1);
        }
    }
    //alert(""+arrStatus);
}