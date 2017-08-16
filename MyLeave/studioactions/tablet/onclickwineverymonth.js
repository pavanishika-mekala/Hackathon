function onclickwineverymonth(eventobject) {
    return AS_FlexContainer_6043dc5d4a3f4ca5a8bef95ca3a141dd(eventobject);
}

function AS_FlexContainer_6043dc5d4a3f4ca5a8bef95ca3a141dd(eventobject) {
    if (frmTabApplyLeave.flxEveryMonth.skin === sknFlx2EBAEE100) {
        frmTabApplyLeave.flxEveryMonth.skin = sknFlx2EBAEEOp100;
        frmTabApplyLeave.lblEveryMonth.skin = sknLblffffffF32AvenirLTStdRoman;
    } else {
        frmTabApplyLeave.flxEveryMonth.skin = sknFlx2EBAEE100;
        frmTabApplyLeave.lblEveryMonth.skin = sknlbl2EBAEEOp100S32pxRoman;
    }
}