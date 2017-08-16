function flxSentBackOnClick(eventobject) {
    return AS_FlexContainer_e168ee47cb52492cb8076a27c5b00902(eventobject);
}

function AS_FlexContainer_e168ee47cb52492cb8076a27c5b00902(eventobject) {
    if (frmHistory.flxSentBack.skin == "sknFlxSentBackUnselected") {
        frmHistory.flxSentBack.skin = "sknFlxSentBackSelected";
        frmHistory.lblSentBack.skin = "sknLblFFFFFF100Op36Px";
        frmHistory.imgSel4.src = "select_pendingcopy.png";
        sentBack = 4;
        arrStatus.push("4");
    } else {
        frmHistory.flxSentBack.skin = "sknFlxSentBackUnselected";
        frmHistory.lblSentBack.skin = "sknLblSentBackUnselected";
        frmHistory.imgSel4.src = "selectblue.png";
        sentBack = -1;
        for (var j = 0; j < arrStatus.length; j++) {
            if ("4" == arrStatus[j]) arrStatus.splice(j, 1);
        }
    }
    //alert(""+arrStatus);
}