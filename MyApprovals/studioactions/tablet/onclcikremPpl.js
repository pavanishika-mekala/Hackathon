function onclcikremPpl(eventobject) {
    return AS_FlexContainer_ec5027cbcca84702a24ee0a9c0ffade1(eventobject);
}

function AS_FlexContainer_ec5027cbcca84702a24ee0a9c0ffade1(eventobject) {
    var id = eventobject.id;
    id = id.replace("fc", "");
    frmTabApprovalHistory["flexppl" + id].setVisibility(false);
    delete kony.apps.coe.ess.ApprovalHistoryTab.selectedPpls[id];
    if (kony.apps.coe.ess.ApprovalHistoryTab.selectedPpls.length == 0) frmTabApprovalHistory.flexselpplsH.setVisibility(false);
}