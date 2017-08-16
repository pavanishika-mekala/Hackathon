function onclickwineveryweek(eventobject) {
    return AS_FlexContainer_8ad2154d21744154ae3e9d8672291356(eventobject);
}

function AS_FlexContainer_8ad2154d21744154ae3e9d8672291356(eventobject) {
    if (frmTabApplyLeave.flxEveryWeek.skin === sknFlx2EBAEE100) {
        frmTabApplyLeave.flxEveryWeek.skin = sknFlx2EBAEEOp100;
        frmTabApplyLeave.lblEveryWeek.skin = sknLblffffffF32AvenirLTStdRoman;
    } else {
        frmTabApplyLeave.flxEveryWeek.skin = sknFlx2EBAEE100;
        frmTabApplyLeave.lblEveryWeek.skin = sknlbl2EBAEEOp100S32pxRoman;
    }
}