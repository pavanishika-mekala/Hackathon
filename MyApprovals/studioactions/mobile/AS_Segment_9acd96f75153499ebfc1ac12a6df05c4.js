function AS_Segment_9acd96f75153499ebfc1ac12a6df05c4(eventobject, sectionNumber, rowNumber) {
    var selectedItem = eventobject.selectedRowItems[0]
    var formController = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmRequestedList");
    var formConfig = {
        "Type": "RequestType",
        "selectedItem": selectedItem
    };
    formController.loadDataAndShowForm(formConfig);
}