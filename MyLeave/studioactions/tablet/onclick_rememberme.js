function onclick_rememberme(eventobject) {
    return AS_FlexContainer_5bfb09521f19428a92a57459871f6008(eventobject);
}

function AS_FlexContainer_5bfb09521f19428a92a57459871f6008(eventobject) {
    if (frmLogin.imgRem.src === "uncheck.png") {
        frmLogin.imgRem.src = "check.png";
    } else {
        frmLogin.imgRem.src = "uncheck.png";
    }
}