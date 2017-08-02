function actionOnRowClickOfsegAllEmp(eventobject, sectionNumber, rowNumber) {
    return AS_Segment_b47fef185355485c9098a919f27cf276(eventobject, sectionNumber, rowNumber);
}

function AS_Segment_b47fef185355485c9098a919f27cf276(eventobject, sectionNumber, rowNumber) {
    //(new kony.apps.coe.ess.frmPendingUIDW()).onRowClickOfSegEmp(frmPendingRequest.segAllEmp);
    (new kony.apps.coe.ess.frmPendingUIDW()).onRowClickOfSegEmp();
    //kony.print("---- eventObject: "+JSON.stringify(data));
}