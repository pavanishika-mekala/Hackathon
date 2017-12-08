function onClickPendingHisWin(eventobject) {
    return AS_FlexContainer_0b01881dbb984156b65c5aac42476cac(eventobject);
}

function AS_FlexContainer_0b01881dbb984156b65c5aac42476cac(eventobject) {
    if (frmHistory.flexPenOrange.skin == "sknFlxPendingUnselectedWin") {
        frmHistory.flexPenOrange.skin = "sknFlxOrangePendingWIn";
        frmHistory.penlbl1.skin = "sknLblFFFFFF100Op36Px";
        frmHistory.imgsel2.src = "select_pending.png";
        pending = 2;
        arrStatus.push("2");
    } else {
        frmHistory.flexPenOrange.skin = "sknFlxPendingUnselectedWin";
        frmHistory.penlbl1.skin = "sknLblPendingUnselected";
        frmHistory.imgsel2.src = "selectyellow.png";
        pending = -1;
        for (var j = 0; j < arrStatus.length; j++) {
            if ("2" == arrStatus[j]) arrStatus.splice(j, 1);
        }
    }
    //alert(""+arrStatus);
}