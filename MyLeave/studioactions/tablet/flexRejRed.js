function flexRejRed(eventobject) {
    return AS_FlexContainer_e24a44ebe09145df82657aab5e529954(eventobject);
}

function AS_FlexContainer_e24a44ebe09145df82657aab5e529954(eventobject) {
    if (frmHistory.flexRejRed.skin == "sknFlxRejectUnselected") {
        frmHistory.flexRejRed.skin = "sknFlxRejectStatus";
        frmHistory.rejlbl2.skin = "sknLblFFFFFF100Op36Px";
        frmHistory.imgsel3.src = "selectapprovecopy.png";
        rejected = 1;
        arrStatus.push("1");
    } else {
        frmHistory.flexRejRed.skin = "sknFlxRejectUnselected";
        frmHistory.rejlbl2.skin = "sknLblLeaveStatusRejected";
        frmHistory.imgsel3.src = "selectred.png";
        rejected = -1;
        for (var j = 0; j < arrStatus.length; j++) {
            if ("1" == arrStatus[j]) arrStatus.splice(j, 1);
        }
    }
    //alert(""+arrStatus);
}