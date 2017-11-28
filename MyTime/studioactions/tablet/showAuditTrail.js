function showAuditTrail(eventobject, x, y) {
    return AS_Image_g1988c5addb240bea10d8dfae957d241(eventobject, x, y);
}

function AS_Image_g1988c5addb240bea10d8dfae957d241(eventobject, x, y) {
    kony.sdk.mvvm.KonyApplicationContext.showLoadingScreen("Loading Audit Trail");
    showAuditTrailForm();
}