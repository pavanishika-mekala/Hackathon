function initializetempSegDelegationRequestList() {
    flxSegDelegationRequestList = new kony.ui.FlexContainer({
        "autogrowMode": kony.flex.AUTOGROW_NONE,
        "clipBounds": true,
        "height": "25%",
        "id": "flxSegDelegationRequestList",
        "isVisible": true,
        "layoutType": kony.flex.FREE_FORM,
        "skin": "sknFlxMobBGfafafa100O"
    }, {}, {});
    flxSegDelegationRequestList.setDefaultUnit(kony.flex.DP);
    var flxColumn1 = new kony.ui.FlexContainer({
        "autogrowMode": kony.flex.AUTOGROW_NONE,
        "clipBounds": true,
        "height": "98.96%",
        "id": "flxColumn1",
        "isVisible": true,
        "layoutType": kony.flex.FREE_FORM,
        "left": "0%",
        "skin": "slFbox",
        "top": "0%",
        "width": "21.73%",
        "zIndex": 1
    }, {}, {});
    flxColumn1.setDefaultUnit(kony.flex.DP);
    var flxImage = new kony.ui.FlexContainer({
        "autogrowMode": kony.flex.AUTOGROW_NONE,
        "clipBounds": true,
        "height": "50.89%",
        "id": "flxImage",
        "isVisible": true,
        "layoutType": kony.flex.FREE_FORM,
        "left": "18.40%",
        "skin": "sknFlxBorCaaaaaaRounded",
        "top": "21.74%",
        "width": "67.48%",
        "zIndex": 1
    }, {}, {});
    flxImage.setDefaultUnit(kony.flex.DP);
    var flxImageInner = new kony.ui.FlexContainer({
        "autogrowMode": kony.flex.AUTOGROW_NONE,
        "centerX": "50%",
        "centerY": "50%",
        "clipBounds": true,
        "height": "90%",
        "id": "flxImageInner",
        "isVisible": true,
        "layoutType": kony.flex.FREE_FORM,
        "skin": "sknFlxMobRoundedWithoutBor",
        "width": "90%",
        "zIndex": 1
    }, {}, {});
    flxImageInner.setDefaultUnit(kony.flex.DP);
    var imgEmp = new kony.ui.Image2({
        "centerX": "50%",
        "centerY": "50%",
        "height": "100%",
        "id": "imgEmp",
        "isVisible": true,
        "skin": "slImage",
        "src": "imagedrag.png",
        "width": "100%",
        "zIndex": 1
    }, {
        "imageScaleMode": constants.IMAGE_SCALE_MODE_FIT_TO_DIMENSIONS,
        "padding": [0, 0, 0, 0],
        "paddingInPixel": false
    }, {});
    var lblShortName = new kony.ui.Label({
        "height": "100%",
        "id": "lblShortName",
        "isVisible": true,
        "left": "0dp",
        "skin": "sknLblShorNameDelegationRequestList",
        "text": "AB",
        "textStyle": {
            "letterSpacing": 0,
            "strikeThrough": false
        },
        "top": "0dp",
        "width": "100%",
        "zIndex": 1
    }, {
        "contentAlignment": constants.CONTENT_ALIGN_CENTER,
        "padding": [0, 0, 0, 0],
        "paddingInPixel": false
    }, {
        "textCopyable": false
    });
    flxImageInner.add(imgEmp, lblShortName);
    flxImage.add(flxImageInner);
    flxColumn1.add(flxImage);
    var flxColumn2 = new kony.ui.FlexContainer({
        "autogrowMode": kony.flex.AUTOGROW_NONE,
        "clipBounds": true,
        "height": "98.96%",
        "id": "flxColumn2",
        "isVisible": true,
        "layoutType": kony.flex.FLOW_VERTICAL,
        "left": "21.73%",
        "skin": "slFbox",
        "top": "0%",
        "width": "42%",
        "zIndex": 1
    }, {}, {});
    flxColumn2.setDefaultUnit(kony.flex.DP);
    var lblEmpName = new kony.ui.Label({
        "id": "lblEmpName",
        "isVisible": true,
        "left": "0%",
        "skin": "sknLblMobFC555555FS34px",
        "text": "Rose Grey",
        "textStyle": {
            "letterSpacing": 0,
            "strikeThrough": false
        },
        "top": "5%",
        "width": kony.flex.USE_PREFFERED_SIZE,
        "zIndex": 1
    }, {
        "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
        "padding": [0, 0, 0, 0],
        "paddingInPixel": false
    }, {
        "textCopyable": false
    });
    var flxEmpId = new kony.ui.FlexContainer({
        "autogrowMode": kony.flex.AUTOGROW_NONE,
        "clipBounds": true,
        "height": "15%",
        "id": "flxEmpId",
        "isVisible": true,
        "layoutType": kony.flex.FLOW_HORIZONTAL,
        "left": "0%",
        "skin": "slFbox",
        "top": "3%",
        "width": "100%",
        "zIndex": 1
    }, {}, {});
    flxEmpId.setDefaultUnit(kony.flex.DP);
    var lblEmpIdKey = new kony.ui.Label({
        "centerY": "50%",
        "id": "lblEmpIdKey",
        "isVisible": true,
        "left": "0%",
        "skin": "sknlbl888888ffpx24",
        "text": "EMP ID -",
        "textStyle": {
            "letterSpacing": 0,
            "strikeThrough": false
        },
        "width": kony.flex.USE_PREFFERED_SIZE,
        "zIndex": 1
    }, {
        "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
        "padding": [0, 0, 0, 0],
        "paddingInPixel": false
    }, {
        "textCopyable": false
    });
    var lblEmpId = new kony.ui.Label({
        "centerY": "50%",
        "id": "lblEmpId",
        "isVisible": true,
        "left": "2%",
        "skin": "sknlbl888888ffpx24",
        "text": "857464",
        "textStyle": {
            "letterSpacing": 0,
            "strikeThrough": false
        },
        "width": kony.flex.USE_PREFFERED_SIZE,
        "zIndex": 1
    }, {
        "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
        "padding": [0, 0, 0, 0],
        "paddingInPixel": false
    }, {
        "textCopyable": false
    });
    flxEmpId.add(lblEmpIdKey, lblEmpId);
    var flxRequestDuration = new kony.ui.FlexContainer({
        "autogrowMode": kony.flex.AUTOGROW_NONE,
        "clipBounds": true,
        "height": "18%",
        "id": "flxRequestDuration",
        "isVisible": true,
        "layoutType": kony.flex.FLOW_HORIZONTAL,
        "left": "0%",
        "skin": "slFbox",
        "top": "3%",
        "width": "100%",
        "zIndex": 1
    }, {}, {});
    flxRequestDuration.setDefaultUnit(kony.flex.DP);
    var lblStartAndEndDate = new kony.ui.Label({
        "centerY": "50%",
        "id": "lblStartAndEndDate",
        "isVisible": true,
        "left": "0%",
        "skin": "sknLblMobFC2ebaeeFS26px",
        "text": "10 Jan '17 -  30 Jan '17",
        "textStyle": {
            "letterSpacing": 0,
            "strikeThrough": false
        },
        "width": kony.flex.USE_PREFFERED_SIZE,
        "zIndex": 1
    }, {
        "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
        "padding": [0, 0, 0, 0],
        "paddingInPixel": false
    }, {
        "textCopyable": false
    });
    flxRequestDuration.add(lblStartAndEndDate);
    var flxDays = new kony.ui.FlexContainer({
        "autogrowMode": kony.flex.AUTOGROW_NONE,
        "clipBounds": true,
        "height": "18%",
        "id": "flxDays",
        "isVisible": true,
        "layoutType": kony.flex.FLOW_HORIZONTAL,
        "left": "0%",
        "skin": "slFbox",
        "top": "3%",
        "width": "100%",
        "zIndex": 1
    }, {}, {});
    flxDays.setDefaultUnit(kony.flex.DP);
    var lblDays = new kony.ui.Label({
        "centerX": "50%",
        "centerY": "50%",
        "id": "lblDays",
        "isVisible": true,
        "skin": "sknLblMobFC777777BCdfdfdfFS20px",
        "text": "7 DAYS",
        "textStyle": {
            "letterSpacing": 0,
            "strikeThrough": false
        },
        "width": kony.flex.USE_PREFFERED_SIZE,
        "zIndex": 1
    }, {
        "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
        "padding": [2, 0, 2, 0],
        "paddingInPixel": false
    }, {
        "textCopyable": false
    });
    flxDays.add(lblDays);
    var flxStatus = new kony.ui.FlexContainer({
        "autogrowMode": kony.flex.AUTOGROW_NONE,
        "clipBounds": true,
        "height": "18%",
        "id": "flxStatus",
        "isVisible": true,
        "layoutType": kony.flex.FLOW_HORIZONTAL,
        "left": "0%",
        "skin": "slFbox",
        "top": "0%",
        "width": "100%",
        "zIndex": 1
    }, {}, {});
    flxStatus.setDefaultUnit(kony.flex.DP);
    var flxStatusIcon = new kony.ui.FlexContainer({
        "autogrowMode": kony.flex.AUTOGROW_NONE,
        "centerY": "50%",
        "clipBounds": true,
        "height": "14dp",
        "id": "flxStatusIcon",
        "isVisible": true,
        "layoutType": kony.flex.FREE_FORM,
        "left": "0%",
        "skin": "sknflx3fbd00",
        "width": "14dp",
        "zIndex": 2
    }, {}, {});
    flxStatusIcon.setDefaultUnit(kony.flex.DP);
    flxStatusIcon.add();
    var lblStatus = new kony.ui.Label({
        "centerY": "50%",
        "id": "lblStatus",
        "isVisible": true,
        "left": "3%",
        "skin": "sknLblFC3fbd00FS28px",
        "text": "Active",
        "textStyle": {
            "letterSpacing": 0,
            "strikeThrough": false
        },
        "width": kony.flex.USE_PREFFERED_SIZE,
        "zIndex": 2
    }, {
        "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
        "padding": [0, 0, 0, 0],
        "paddingInPixel": false
    }, {
        "textCopyable": false
    });
    flxStatus.add(flxStatusIcon, lblStatus);
    flxColumn2.add(lblEmpName, flxEmpId, flxRequestDuration, flxDays, flxStatus);
    var flxColumn3 = new kony.ui.FlexContainer({
        "autogrowMode": kony.flex.AUTOGROW_NONE,
        "clipBounds": true,
        "height": "98.96%",
        "id": "flxColumn3",
        "isVisible": true,
        "layoutType": kony.flex.FLOW_VERTICAL,
        "right": "0%",
        "skin": "slFbox",
        "top": "0%",
        "width": "36.27%",
        "zIndex": 1
    }, {}, {});
    flxColumn3.setDefaultUnit(kony.flex.DP);
    var lblCreatedDate = new kony.ui.Label({
        "id": "lblCreatedDate",
        "isVisible": true,
        "left": "0dp",
        "skin": "sknlbl888888ffpx24",
        "text": "12 Dec’16 6:30 PM",
        "textStyle": {
            "letterSpacing": 0,
            "strikeThrough": false
        },
        "top": "8%",
        "width": "97%",
        "zIndex": 1
    }, {
        "contentAlignment": constants.CONTENT_ALIGN_CENTER,
        "padding": [0, 0, 0, 0],
        "paddingInPixel": false
    }, {
        "textCopyable": false
    });
    var lblTypeOfRequestHeader = new kony.ui.Label({
        "id": "lblTypeOfRequestHeader",
        "isVisible": true,
        "left": "0dp",
        "skin": "sknlbl888888ffpx24",
        "text": kony.i18n.getLocalizedString("i18n.ess.segment.typeofrequest"),
        "textStyle": {
            "letterSpacing": 0,
            "strikeThrough": false
        },
        "top": "7%",
        "width": "97%",
        "zIndex": 1
    }, {
        "contentAlignment": constants.CONTENT_ALIGN_CENTER,
        "padding": [0, 0, 0, 0],
        "paddingInPixel": false
    }, {
        "textCopyable": false
    });
    var lblRequestTypes = new kony.ui.Label({
        "id": "lblRequestTypes",
        "isVisible": true,
        "left": "0dp",
        "skin": "sknLblMobFC2ebaeeFS26px",
        "text": "MyTime, 2 more",
        "textStyle": {
            "letterSpacing": 0,
            "strikeThrough": false
        },
        "top": "8%",
        "width": "96%",
        "zIndex": 1
    }, {
        "contentAlignment": constants.CONTENT_ALIGN_CENTER,
        "padding": [0, 0, 0, 0],
        "paddingInPixel": false
    }, {
        "textCopyable": false
    });
    flxColumn3.add(lblCreatedDate, lblTypeOfRequestHeader, lblRequestTypes);
    var flxBottomLine = new kony.ui.FlexContainer({
        "autogrowMode": kony.flex.AUTOGROW_NONE,
        "bottom": "0%",
        "clipBounds": true,
        "height": "0.86%",
        "id": "flxBottomLine",
        "isVisible": true,
        "layoutType": kony.flex.FREE_FORM,
        "right": "0%",
        "skin": "sknFlxBCcfe7e7Op100",
        "width": "78.53%",
        "zIndex": 2
    }, {}, {});
    flxBottomLine.setDefaultUnit(kony.flex.DP);
    flxBottomLine.add();
    flxSegDelegationRequestList.add(flxColumn1, flxColumn2, flxColumn3, flxBottomLine);
}