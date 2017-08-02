function preshowTabHistory(eventobject) {
    return AS_Form_ca1b074f024d4391bf72639cb8cdc625(eventobject);
}

function AS_Form_ca1b074f024d4391bf72639cb8cdc625(eventobject) {
    frmTabApprovalHistory.flexselpplsH.setVisibility(false);
    frmTabApprovalHistory.flexDynamicPplsLayout.setVisibility(false);
    frmTabApprovalHistory.flxbottomPplSelection.setVisibility(false);
    for (var i = 0; i < 6; i++) frmTabApprovalHistory["flexppl" + i].setVisibility(false);
}