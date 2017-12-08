function onClickRejHisWin(eventobject) {
    return AS_FlexContainer_b4744ee29d094aa486645d79bbf63f8b(eventobject);
}

function AS_FlexContainer_b4744ee29d094aa486645d79bbf63f8b(eventobject) {
    if (frmHistory.flexRejRed.skin == "sknFlxRejectUnselectedWin") {
        frmHistory.flexRejRed.skin = "sknFlxRejectStatusWin";
        frmHistory.rejlbl2.skin = "sknLblFFFFFF100Op36Px";
        frmHistory.imgsel3.src = "selectapprovecopy.png";
        rejected = 1;
        arrStatus.push("1");
    } else {
        frmHistory.flexRejRed.skin = "sknFlxRejectUnselectedWin";
        frmHistory.rejlbl2.skin = "sknLblLeaveStatusRejected";
        frmHistory.imgsel3.src = "selectred.png";
        rejected = -1;
        for (var j = 0; j < arrStatus.length; j++) {
            if ("1" == arrStatus[j]) arrStatus.splice(j, 1);
        }
    }
    //alert(""+arrStatus);
}