function MyApprovalNotifictionSegmenrRowClick(eventobject, sectionNumber, rowNumber) {
    return AS_Segment_bc344c3a622a4c53be99f431e604b820(eventobject, sectionNumber, rowNumber);
}

function AS_Segment_bc344c3a622a4c53be99f431e604b820(eventobject, sectionNumber, rowNumber) {
    kony.apps.coe.ess.notifications.getNotificationHistoryInstance().showDetailsOfRequest();
}