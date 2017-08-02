function AS_Segment_onRowClickSeg_DelegationRequestListSentByMe(eventobject, sectionNumber, rowNumber) {
    return AS_Segment_46ad328109164fa197258397853420e6(eventobject, sectionNumber, rowNumber);
}

function AS_Segment_46ad328109164fa197258397853420e6(eventobject, sectionNumber, rowNumber) {
    kony.apps.coe.ess.Approvals.DelegationRequestList.Actions.getInstance().onRowClickOfSentByMeList();
}