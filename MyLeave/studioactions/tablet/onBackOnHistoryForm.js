function onBackOnHistoryForm(eventobject) {
    return AS_FlexContainer_b48ce849029c4b909a1f5629231489a5(eventobject);
}

function AS_FlexContainer_b48ce849029c4b909a1f5629231489a5(eventobject) {
    var prevform = kony.application.getPreviousForm();
    prevform.show();
}