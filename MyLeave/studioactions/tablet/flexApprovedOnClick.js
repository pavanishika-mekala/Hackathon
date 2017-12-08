function flexApprovedOnClick(eventobject) {
    return AS_FlexContainer_0556b5133543461d83c26a567604295d(eventobject);
}

function AS_FlexContainer_0556b5133543461d83c26a567604295d(eventobject) {
    if (frmHistory.flexApproved.skin == "sknFlxApproveStatusUnselected") {
        frmHistory.flexApproved.skin = "sknFlxApprovedStatus";
        frmHistory.Apprlbl.skin = "sknLblFFFFFF100Op36Px";
        frmHistory.selimg1.src = "selectapprove.png";
        approved = 0;
        arrStatus.push("0");
    } else {
        frmHistory.flexApproved.skin = "sknFlxApproveStatusUnselected";
        frmHistory.Apprlbl.skin = "sknLblApproveStatusUnselected";
        frmHistory.selimg1.src = "approvedoutline.png";
        approved = -1;
        for (var j = 0; j < arrStatus.length; j++) {
            if ("0" == arrStatus[j]) arrStatus.splice(j, 1);
        }
    }
    //alert(""+arrStatus);
}