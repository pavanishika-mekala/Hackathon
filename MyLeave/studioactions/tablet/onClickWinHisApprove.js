function onClickWinHisApprove(eventobject) {
    return AS_FlexContainer_c4c3e532a72f4207ac2acba2bf1bd67e(eventobject);
}

function AS_FlexContainer_c4c3e532a72f4207ac2acba2bf1bd67e(eventobject) {
    if (frmHistory.flexApproved.skin == "sknFlxApproveStatusUnselectedWin") {
        frmHistory.flexApproved.skin = "sknFlxApprovedStatusWin";
        frmHistory.Apprlbl.skin = "sknLblFFFFFF100Op36Px";
        frmHistory.selimg1.src = "selectapprove.png";
        approved = 0;
        arrStatus.push("0");
    } else {
        frmHistory.flexApproved.skin = "sknFlxApproveStatusUnselectedWin";
        frmHistory.Apprlbl.skin = "sknLblApproveStatusUnselected";
        frmHistory.selimg1.src = "approvedoutline.png";
        approved = -1;
        for (var j = 0; j < arrStatus.length; j++) {
            if ("0" == arrStatus[j]) arrStatus.splice(j, 1);
        }
    }
    //alert(""+arrStatus);
}