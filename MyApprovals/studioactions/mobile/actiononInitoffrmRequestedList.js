function actiononInitoffrmRequestedList(eventobject) {
    return AS_Form_2676772caad748ca85d9204f75d32178(eventobject);
}

function AS_Form_2676772caad748ca85d9204f75d32178(eventobject) {
    try {
        kony.apps.coe.ess.Approvals.RequestedList.applyGestureandSwipeAnimation();
    } catch (e) {
        handleError(e);
    }
}