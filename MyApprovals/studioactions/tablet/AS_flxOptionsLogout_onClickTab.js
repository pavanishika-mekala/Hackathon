function AS_flxOptionsLogout_onClickTab(eventobject) {
    return AS_FlexContainer_f05242a38df64ac087925b6e26fe995a(eventobject);
}

function AS_FlexContainer_f05242a38df64ac087925b6e26fe995a(eventobject) {
    kony.sdk.mvvm.LogoutAction();
    frmApprovalHome.flxFooterOptions.isVisible = false;
    frmApprovalHome.imgOption1.src = "circleinactive.png";
    frmApprovalHome.imgOption2.src = "circleinactive.png";
    frmApprovalHome.imgOption3.src = "circleinactive.png";
}