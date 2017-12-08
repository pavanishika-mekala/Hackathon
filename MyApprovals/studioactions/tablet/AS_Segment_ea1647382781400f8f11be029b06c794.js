function AS_Segment_ea1647382781400f8f11be029b06c794(eventobject, sectionNumber, rowNumber) {
    var selectedItem = eventobject.selectedRowItems[0]
    var formController = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmRequestedList");
    var formConfig = {
        "Type": "RequestType",
        "selectedItem": selectedItem
    };
    formController.loadDataAndShowForm(formConfig);
}