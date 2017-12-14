function tabNotificationSegmentRowclick(eventobject, sectionNumber, rowNumber) {
    return AS_Segment_dd29b133e6144830b4240042b5e2aa63(eventobject, sectionNumber, rowNumber);
}

function AS_Segment_dd29b133e6144830b4240042b5e2aa63(eventobject, sectionNumber, rowNumber) {
    kony.apps.coe.ess.notifications.getNotificationHistoryInstance().showDetailsOfRequest();
}