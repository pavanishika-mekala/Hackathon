function ActionToScrollSliderRight(eventobject, x, y) {
    return AS_Image_e20c2f77ad784edcb48a447abca6822d(eventobject, x, y);
}

function AS_Image_e20c2f77ad784edcb48a447abca6822d(eventobject, x, y) {
    var contentOffset = {
        x: "100",
        y: "0"
    };
    frmCreateViewDW.flxTimeLine.timeLineScrollFlex.setContentOffset(contentOffset, true);
}