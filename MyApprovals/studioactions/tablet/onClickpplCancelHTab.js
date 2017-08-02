function onClickpplCancelHTab(eventobject) {
    return AS_FlexContainer_b30fbf2a747f4a658dca76bbf60062c4(eventobject);
}

function AS_FlexContainer_b30fbf2a747f4a658dca76bbf60062c4(eventobject) {
    var id = eventobject.id;
    id = id.replace("fc", "");
    frmTabApprovalHistory["flexppl" + id].setVisibility(false);
    delete kony.apps.coe.ess.ApprovalHistoryTab.selectedPpls[id];
}