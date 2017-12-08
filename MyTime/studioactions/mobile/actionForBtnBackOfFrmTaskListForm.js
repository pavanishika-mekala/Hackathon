function actionForBtnBackOfFrmTaskListForm(eventobject, x, y) {
    return AS_Button_bb6d65afd387482a8a00546ba1098e9b(eventobject, x, y);
}

function AS_Button_bb6d65afd387482a8a00546ba1098e9b(eventobject, x, y) {
    if (kony.application.getPreviousForm().id == "frmTimeSheetCreate") {
        frmTimeSheetCreate.show();
    } else {
        refreshAndShowTimesheetHomeForm();
    }
}