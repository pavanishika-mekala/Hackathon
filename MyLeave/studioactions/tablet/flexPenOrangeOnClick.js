function flexPenOrangeOnClick(eventobject) {
    return AS_FlexContainer_ef2e41a62cb94a379f48b31472b114f4(eventobject);
}

function AS_FlexContainer_ef2e41a62cb94a379f48b31472b114f4(eventobject) {
    if (frmHistory.flexPenOrange.skin == "sknFlxPendingUnselected") {
        frmHistory.flexPenOrange.skin = "sknFlxOrangePending";
        frmHistory.penlbl1.skin = "sknLblFFFFFF100Op36Px";
        frmHistory.imgsel2.src = "select_pending.png";
        pending = 2;
        arrStatus.push("2");
    } else {
        frmHistory.flexPenOrange.skin = "sknFlxPendingUnselected";
        frmHistory.penlbl1.skin = "sknLblPendingUnselected";
        frmHistory.imgsel2.src = "selectyellow.png";
        pending = -1;
        for (var j = 0; j < arrStatus.length; j++) {
            if ("2" == arrStatus[j]) arrStatus.splice(j, 1);
        }
    }
    //alert(""+arrStatus);
}