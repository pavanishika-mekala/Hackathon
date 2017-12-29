function initializeTempEmployeeSelection() {
    flxEmployeeSelection = new kony.ui.FlexContainer({
        "autogrowMode": kony.flex.AUTOGROW_NONE,
        "clipBounds": true,
        "height": "37%",
        "id": "flxEmployeeSelection",
        "isVisible": true,
        "layoutType": kony.flex.FREE_FORM,
        "skin": "slFbox"
    }, {}, {});
    flxEmployeeSelection.setDefaultUnit(kony.flex.DP);
    var flxImgEmployee = new kony.ui.FlexContainer({
        "autogrowMode": kony.flex.AUTOGROW_NONE,
        "centerX": "50%",
        "clipBounds": true,
        "height": "56dp",
        "id": "flxImgEmployee",
        "isVisible": true,
        "layoutType": kony.flex.FREE_FORM,
        "skin": "SknImg",
        "top": "15%",
        "width": "56dp",
        "zIndex": 1
    }, {}, {});
    flxImgEmployee.setDefaultUnit(kony.flex.DP);
    var imgEmployee = new kony.ui.Image2({
        "centerX": "50%",
        "centerY": "50%",
        "height": "100%",
        "id": "imgEmployee",
        "isVisible": false,
        "skin": "slImage",
        "src": "imagedrag.png",
        "width": "100%",
        "zIndex": 2
    }, {
        "imageScaleMode": constants.IMAGE_SCALE_MODE_FIT_TO_DIMENSIONS,
        "padding": [0, 0, 0, 0],
        "paddingInPixel": false
    }, {});
    var lblShortName = new kony.ui.Label({
        "centerX": "50%",
        "centerY": "50%",
        "height": "100%",
        "id": "lblShortName",
        "isVisible": true,
        "skin": "sknLblffffff100O1db6c9",
        "text": "A",
        "textStyle": {
            "letterSpacing": 0,
            "strikeThrough": false
        },
        "width": "100%",
        "zIndex": 1
    }, {
        "contentAlignment": constants.CONTENT_ALIGN_CENTER,
        "padding": [0, 0, 0, 0],
        "paddingInPixel": false
    }, {
        "textCopyable": false
    });
    flxImgEmployee.add(imgEmployee, lblShortName);
    var imgSelection = new kony.ui.Image2({
        "centerX": "71.95%",
        "height": "25dp",
        "id": "imgSelection",
        "isVisible": false,
        "right": 12,
        "skin": "slImage",
        "src": "imagedrag.png",
        "top": "16.08%",
        "width": "25dp",
        "zIndex": 1
    }, {
        "imageScaleMode": constants.IMAGE_SCALE_MODE_MAINTAIN_ASPECT_RATIO,
        "padding": [0, 0, 0, 0],
        "paddingInPixel": false
    }, {});
    var lblEmployeeName = new kony.ui.Label({
        "centerX": "50%",
        "id": "lblEmployeeName",
        "isVisible": true,
        "skin": "sknLblMob777777100OFS28px",
        "textStyle": {
            "letterSpacing": 0,
            "strikeThrough": false
        },
        "top": "75%",
        "width": "98%",
        "zIndex": 1
    }, {
        "contentAlignment": constants.CONTENT_ALIGN_CENTER,
        "padding": [0, 0, 0, 0],
        "paddingInPixel": false
    }, {
        "textCopyable": false
    });
    flxEmployeeSelection.add(flxImgEmployee, imgSelection, lblEmployeeName);
}