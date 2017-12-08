function AS_FlexContainer_NavigateBack(eventobject) {
    return AS_FlexContainer_7ed5bc6b040d4093af2d74e14c3cf5c2(eventobject);
}

function AS_FlexContainer_7ed5bc6b040d4093af2d74e14c3cf5c2(eventobject) {
    var Prevform = kony.application.getPreviousForm();
    if (Prevform.id === "frmSearchLog") frmSearchLog.show();
}