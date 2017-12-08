function AS_Form_31b5412dd9b04bfba9bac3bb2715eb68(eventobject) {
    var currDate = new Date()
    console.log(currDate);
    console.log(kony.modules.loadFunctionalModule("appjsmodules"));
    var calendarWidgetObj = new kony.apps.coe.Reusable.calendarWIDGET(currDate.getMonth(), currDate.getFullYear(), "flxCalendarContainer", "sknFlxMobOp0", "sknFlxFocus", "sknFlxMobOp0", "sknFlxMobOp100BgColD8F4FF", "sknBtnMobBg0OpFC777777Op100S79", "sknBtnMobOp100Bg2EBAEFFcFFFFFF", "sknLblMobFC333333Op100FS100", "sknBtnMobBg0OpFC333333Op100S24px", "sknBtnMobBg0OpFCC3C4CCOp100S24px");
    console.log(calendarWidgetObj.calendarWidget);
    frmTest.flxCalendarContainer.add(calendarWidgetObj.calendarWidget);
}