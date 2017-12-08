function actiononInitoffrmRequestedListTab(eventobject) {
    return AS_Form_b110d76278484911999d4004c455fb2f(eventobject);
}

function AS_Form_b110d76278484911999d4004c455fb2f(eventobject) {
    try {
        kony.apps.coe.ess.Approvals.RequestedList.applyGestureandSwipeAnimation();
    } catch (e) {
        handleError(e);
    }
}