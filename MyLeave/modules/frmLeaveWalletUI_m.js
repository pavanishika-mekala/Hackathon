/*** @Author Sumeet.bartha@kony.com
 * @category Business Logic / Action  / UI data Binding
 * @desc  Login class
 * @ © 2016 Kony Inc. */
kony = kony || {};
kony.apps = kony.apps || {};
kony.apps.coe = kony.apps.coe || {};
kony.apps.coe.ess = kony.apps.coe.ess || {};
kony.apps.coe.ess.myLeave = kony.apps.coe.ess.myLeave || {};
//%Region - Constructor
/** 
 * @param {JSON} data - data passed after fetching.
 */
kony.apps.coe.ess.myLeave.leaveWalletUI = function(frmname, widgets, data) {
  this.data = data;
  this.frmname = frmname;
  this.widgets = widgets;
  var curntDate = new Date();
  var d = new Date(Date.UTC(curntDate.getFullYear(), curntDate.getMonth(), curntDate.getDate()));
  // Set to nearest Thursday: current date + 4 - current day number
  // Make Sunday's day number 7
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
  // Get first day of year
  var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
  // Calculate full weeks to nearest Thursday
  var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
  weekNo = Number(weekNo).toFixed(); // as weekno is coming as 34.0
  var yearToShow = curntDate.getFullYear();
  this.frmname[this.widgets.lblTop].text = kony.i18n.getLocalizedString("i18n.ess.myLeave.frmLeaveWallet.Y")+yearToShow+" - "+kony.i18n.getLocalizedString("i18n.ess.myLeave.frmLeaveWallet.W")+weekNo;
  //this.frmname[this.widgets.lblTop].text = "FY" + dateToshow + "-" + ((curntDate.getFullYear()+1).toString()).slice(2, 4);
};
// %Region - Methods in leaveWalletUI
/**
 * @member of  leaveWalletUI
 * @return {void} - none.
 * @throws Exception if something goes wrong,
 * @Desc - function called after fetching the data to bind it to leavewallet Flex
 */
kony.apps.coe.ess.myLeave.leaveWalletUI.prototype.createChart = function(data, colors) {
  kony.print("--------------------in kony.apps.coe.myLeave.leaveWalletUI.createChart LeaveWalletUI_m.js");
  try {
    var chartObj = this.createChartJSObjectAcc(data, colors);
    var chartWidget = new kony.ui.Chart2D3D({
      "id": data.LEAVETYPETITLE,
      "isVisible": true,
      "height": "100%",
      "width": "100%",
      //"top":"-11%",
      "chartheight": "100%",
      "chartwidth": "100%",
      "enableScrolling": false
    }, {
      "widgetAlignment": constants.WIDGET_ALIGN_CENTER,
      "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
      "containerWeight": 100
    },
                                            chartObj);
    kony.print("--------------------out kony.apps.coe.myLeave.leaveWalletUI.createChart LeaveWalletUI_m.js");
    return chartWidget;

  } catch (e) {
    handleError(e);
  }

};

/**
 * @member of  leaveWalletUI
 * @return {void} - none.
 * @throws Exception if something goes wrong,
 * @Desc - function called after fetching the data to bind it to leavewallet Flex
 */
kony.apps.coe.ess.myLeave.leaveWalletUI.prototype.createChartonLeaveBalance = function(data, colors) {
  kony.print("--------------------in kony.apps.coe.myLeave.leaveWalletUI.createChartonLeaveBalance LeaveWalletUI_m.js");
  try {
    var chartObj = this.createChartJSObjectAcc(data, colors);
    var chartWidget = new kony.ui.Chart2D3D({
      "id": data.LEAVETYPETITLE,
      "isVisible": true,
      "height": "100%",
      "width": "100%",
      "chartheight": "100%",
      "chartwidth": "100%",
      "enableScrolling": false
    }, {
      "widgetAlignment": constants.WIDGET_ALIGN_CENTER,
      "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
      "containerWeight": 100
    },
                                            chartObj);
    kony.print("--------------------out kony.apps.coe.myLeave.leaveWalletUI.createChartonLeaveBalance LeaveWalletUI_m.js");
    return chartWidget;

  } catch (e) {
    handleError(e);
  }

};

// %Region - Methods in leaveWalletUI
/**
 * @member of  leaveWalletUI
 * @return {void} - none.
 * @throws Exception if something goes wrong,
 * @Desc - function called after fetching the data to bind it to leavewallet Flex
 * If index(i) is even the chart widgets are placed on left and for odd on the right
 * and skining is applied on alternate rows
 */
kony.apps.coe.ess.myLeave.leaveWalletUI.prototype.bindData = function() {
  kony.print("--------------------in kony.apps.coe.ess.myLeave.leaveWalletUI.bindData LeaveWalletUI_m.js");
  try {
    var top = 10;
    var left = 2.0;
    var flag1 = 0;
    var flag2 = 0;
    var flxlist;
    for (var i = 0; i < this.data.length; i++) {
      var colors = [];
      var skn = "";
      if (i % 2 === 0) {
        if (i === 0) {
          left = 2.0;
        } else {
          left = 2.0;
          top += 1.0 + 40;
        }

        flxlist = new kony.ui.FlexContainer({
          "id": "flxComplete" + i,
          "top": top + "%",
          "left": left + "%",
          "width": "47%",
          "height": "40%",
          "zIndex": 1,
          "isVisible": true,
          "clipbounds": true,
          "skin": "sknFlxFFFFFF100BorderDDDDDD1px",
          "layoutType": kony.flex.FREE_FORM
        }, {
          "padding": [0, 0, 0, 0],
          "marginInPixel": false,
          "paddingInPixel": false
        }, {});
      } else {
        flxlist = new kony.ui.FlexContainer({
          "id": "flxComplete" + i,
          "top": top + "%",
          "right": left + "%",
          "width": "47%",
          "height": "40%",
          "zIndex": 1,
          "isVisible": true,
          "clipbounds": true,
          "skin": "sknFlxFFFFFF100BorderDDDDDD1px",
          "layoutType": kony.flex.FREE_FORM
        }, {
          "padding": [0, 0, 0, 0],
          "marginInPixel": false,
          "paddingInPixel": false
        }, {});
      }

      if (i % 2 === 0) {
        if (flag1 === 0) {
          skn = "LBLMOB3BD1D7";
          colors = kony.apps.coe.ess.globalVariables.leaveWalletcolors;
          flag1 = 1;
        } else if (flag1 === 1) {
          skn = "LBLMOB3BD1D7";
          colors = kony.apps.coe.ess.globalVariables.leaveWalletcolors;
          flag1 = 0;
        }
      } else {
        if (flag2 === 0) {
          skn = "LBLMOBF74A4A";
          colors = kony.apps.coe.ess.globalVariables.leaveWalletcolors;
          flag2 = 1;
        } else if (flag2 === 1) {
          skn = "LBLMOBF74A4A";
          colors = kony.apps.coe.ess.globalVariables.leaveWallet.colors;
          flag2 = 0;
        }
      }
      var chartWidget = this.createChart(this.data[i], colors);
      kony.print("--------------------Created chart widget " + i);
      var countTop = 2;
      //#ifdef tabrcandroid
      countTop = 6;
      //#endif
      //#ifdef ipad
      countTop = 4;
      //#endif
	  var flxChart = new kony.ui.FlexContainer({
          "id": "flxChart" + i,
          "top": 12.6 + "%",
          "letf": 0 + "%",
          "width": "100%",
          "height": "60%",
          "zIndex": 1,
          "isVisible": true,
          "clipbounds": true,
          "skin":"slFbox",
          "layoutType": kony.flex.FREE_FORM
        }, {
          "padding": [0, 0, 0, 0],
          "marginInPixel": false,
          "paddingInPixel": false
        }, {});
	  flxChart.add(chartWidget);

      var charttitle = new kony.ui.Label({
        id: "lblCT" + i,
        skin: "LBLMOB555555PX24",
        "top": "5%",
        "centerX": "50%",
        "width": "preffered",
        "height": "preffered",
        "text": this.data[i].LEAVETYPETITLE,
        "zIndex": 3,
        isVisible: true,
      }, {
        "padding": [0, 0, 0, 0],
        "marginInPixel": false,
        "paddingInPixel": false,
        contentAlignment: constants.CONTENT_ALIGN_CENTER
      }, {});
	  var flxLegend = new kony.ui.FlexContainer({
        "autogrowMode": kony.flex.AUTOGROW_NONE,
        "clipBounds": true,
        "height": "20%",
        "id": "flxLegend"+i,
        "isVisible": true,
        "layoutType": kony.flex.FREE_FORM,
        "left": "5%",
        "skin": "slFbox",
        "top": "75%",
        "width": "57%",
        "zIndex": 1
    }, {}, {});
     flxLegend.setDefaultUnit(kony.flex.DP);
    var flxConsumed = new kony.ui.FlexContainer({
        "autogrowMode": kony.flex.AUTOGROW_NONE,
        "clipBounds": true,
        "height": "30%",
        "id": "flxConsumed"+i,
        "isVisible": true,
        "layoutType": kony.flex.FREE_FORM,
        "left": "0%",
        "skin": "slFbox",
        "top": "0%",
        "width": "76%",
        "zIndex": 1
    }, {}, {});
     flxConsumed.setDefaultUnit(kony.flex.DP);
    var lblConsumed1 = new kony.ui.Label({
        "centerY": "50%",
        "height": "7dp",
        "id": "lblConsumed1"+i,
        "isVisible": true,
        "left": "1%",
        "skin": kony.apps.coe.ess.globalVariables.leaveWalletconsumedSkn,
        "textStyle": {
            "letterSpacing": 0,
            "strikeThrough": false
        },
        "width": "7dp",
        "zIndex": 1
    }, {
        "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
        "padding": [0, 0, 0, 0],
        "paddingInPixel": false
    }, {
        "textCopyable": false
    });
    var lblConsumed2 = new kony.ui.Label({
        "centerY": "60%",
        "id": "lblConsumed2"+i,
        "isVisible": true,
        "left": "16%",
        "skin": "LblSkn555555Px57M",
        "text": kony.i18n.getLocalizedString("i18n.ess.graph.consumed.valueKA"), //FIX ME
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
    flxConsumed.add(lblConsumed1, lblConsumed2);
    var flxPlanned = new kony.ui.FlexContainer({
        "autogrowMode": kony.flex.AUTOGROW_NONE,
        "clipBounds": true,
        "height": "30%",
        "id": "flxPlanned"+i,
        "isVisible": true,
        "layoutType": kony.flex.FREE_FORM,
        "left": "0%",
        "skin": "slFbox",
        "top": "30%",
        "width": "76%",
        "zIndex": 1
    }, {}, {});
    flxPlanned.setDefaultUnit(kony.flex.DP);
    var lblPlanned1 = new kony.ui.Label({
        "centerY": "50%",
        "height": "7dp",
        "id": "lblPlanned1"+i,
        "isVisible": true,
        "left": "1%",
        "skin": kony.apps.coe.ess.globalVariables.leaveWalletPlanedSkn,
        "textStyle": {
            "letterSpacing": 0,
            "strikeThrough": false
        },
        "width": "7dp",
        "zIndex": 1
    }, {
        "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
        "padding": [0, 0, 0, 0],
        "paddingInPixel": false
    }, {
        "textCopyable": false
    });
    var lblPlanned2 = new kony.ui.Label({
        "centerY": "60%",
        "id": "lblPlanned2"+i,
        "isVisible": true,
        "left": "16%",
        "skin": "LblSkn555555Px57M",
        "text": kony.i18n.getLocalizedString("i18n.ess.graph.planned.valueKA"),
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
    flxPlanned.add(lblPlanned1, lblPlanned2);
    var flxAvailable = new kony.ui.FlexContainer({
        "autogrowMode": kony.flex.AUTOGROW_NONE,
        "clipBounds": true,
        "height": "30%",
        "id": "flxAvailable"+i,
        "isVisible": true,
        "layoutType": kony.flex.FREE_FORM,
        "left": "0%",
        "skin": "slFbox",
        "top": "60%",
        "width": "76%",
        "zIndex": 1
    }, {}, {});
    flxAvailable.setDefaultUnit(kony.flex.DP);
    var lblAvailable1 = new kony.ui.Label({
        "centerY": "50%",
        "height": "7dp",
        "id": "lblAvailable1"+i,
        "isVisible": true,
        "left": "1%",
        "skin": kony.apps.coe.ess.globalVariables.leaveWalletAvailableSkn,
        "textStyle": {
            "letterSpacing": 0,
            "strikeThrough": false
        },
        "width": "7dp",
        "zIndex": 1
    }, {
        "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
        "padding": [0, 0, 0, 0],
        "paddingInPixel": false
    }, {
        "textCopyable": false
    });
    var lblAvailable2 = new kony.ui.Label({
        "centerY": "60%",
        "id": "lblAvailable2"+i,
        "isVisible": true,
        "left": "16%",
        "skin": "LblSkn555555Px57M",
        "text": kony.i18n.getLocalizedString("i18n.ess.common.availed.valueKA"),
      	//"height":"100%",
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
    flxAvailable.add(lblAvailable1, lblAvailable2);
    var lblCountConsumed = new kony.ui.Label({
        "height": "30%",
        "id": "lblCountConsumed"+i,
        "isVisible": true,
        "left": "78%",
        "skin": "LblSkn555555Px57M",
        "text": this.data[i].LEAVETAKEN,//"230",
        "textStyle": {
            "letterSpacing": 0,
            "strikeThrough": false
        },
        "top": countTop+"%",
        "width": "20%",
        "zIndex": 1
    }, {
        "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
        "padding": [0, 0, 0, 0],
        "paddingInPixel": false
    }, {
        "textCopyable": false
    });
    var lblCountPlanned = new kony.ui.Label({
        "height": "30%",
        "id": "lblCountPlanned"+i,
        "isVisible": true,
        "left": "78%",
        "skin": "LblSkn555555Px57M",
        "text": this.data[i].LEAVEPLANNED,//"360",
        "textStyle": {
            "letterSpacing": 0,
            "strikeThrough": false
        },
        "top": (30+countTop)+"%",
        "width": "20%",
        "zIndex": 1
    }, {
        "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
        "padding": [0, 0, 0, 0],
        "paddingInPixel": false
    }, {
        "textCopyable": false
    });
    var lblCountAvailable = new kony.ui.Label({
        "height": "30%",
        "id": "lblCountAvailable"+i,
        "isVisible": true,
        "left": "78%",
        "skin": "LblSkn555555Px57M",
        "text": this.data[i].LEAVEBALANCE,
        "textStyle": {
            "letterSpacing": 0,
            "strikeThrough": false
        },
        "top": (60+countTop)+"%",
        "width": "20%",
        "zIndex": 1
    }, {
        "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
        "padding": [0, 0, 0, 0],
        "paddingInPixel": false
    }, {
        "textCopyable": false
    });
    flxLegend.add(flxConsumed, flxPlanned, flxAvailable, lblCountConsumed, lblCountPlanned, lblCountAvailable);
    var flxTotal = new kony.ui.FlexContainer({
        "autogrowMode": kony.flex.AUTOGROW_NONE,
        "clipBounds": true,
        "height": "20%",
        "id": this.data[i].LEAVETYPETITLE,
        "isVisible": true,
        "layoutType": kony.flex.FREE_FORM,
        "left": "58%",
        "skin": "slFbox",
        "top": "75%",
        "width": "40%",
        "zIndex": 1
    }, {}, {});
    var lblTotal = new kony.ui.Label({
        "centerX": "50%",
        "centerY": "28%",
        "id": "lblTotal"+i,
        "isVisible": true,
        "skin": "LBLMOB555555PX24",
        "text": kony.i18n.getLocalizedString("i18n.ess.common.total.valueKA"),
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
    var lblCountTotal = new kony.ui.Label({
        "centerX": "50%",
        "centerY": "60%",
        "id": "lblCountTotal"+i,
        "isVisible": true,
        "skin": "LBLMOB555555PX24",
        "text": this.data[i].TOTALLEAVE,
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
    flxTotal.setDefaultUnit(kony.flex.DP);
    flxTotal.add(lblTotal, lblCountTotal);
      var label1 = new kony.ui.Label({
        id: "lblD1" + i,
        //skin: skn,
        skin:"LBLMOB555555PX24",
        "top": "57%",
        "centerX": "50%",
        "width": "preffered",
        "height": "preffered",
        "text": this.data[i].LEAVEBALANCE,
        "zIndex": 3,
        isVisible: true,
      }, {
        "padding": [0, 0, 0, 0],
        "marginInPixel": false,
        "paddingInPixel": false,
        contentAlignment: constants.CONTENT_ALIGN_CENTER
      }, {});
      flxChart.add(label1);
      var label = new kony.ui.Label({
        id: "lblD2" + i,
        skin: "LBLMOB555555PX24",
        "top": "38.26%",
        "left": "0%",
        "width": "100%",
        "height": "20%",
        "text": kony.i18n.getLocalizedString("i18n.ess.common.availed.valueKA"),
        "zIndex": 2,
        isVisible: true,
      }, {
        "padding": [0, 0, 0, 0],
        "marginInPixel": false,
        "paddingInPixel": false,
        contentAlignment: constants.CONTENT_ALIGN_CENTER
      }, {});
      flxChart.add(label);
      var flxCover = new kony.ui.FlexContainer({
        "onClick": this.onflxClick,
        "id": "flxCoverForAction" + i,
        "top": "0%",
        "left": "0%",
        "width": "100%",
        "height": "100%",
        "zIndex": 99,
        "isVisible": true,
        "clipbounds": true,
        "skin": "slFbox",
        "layoutType": kony.flex.FREE_FORM
      }, {
        "padding": [0, 0, 0, 0],
        "marginInPixel": false,
        "paddingInPixel": false
      }, {});

      flxlist.add(charttitle);
      //flxlist.add(label);
     // flxlist.add(label1);
      flxlist.add(flxChart, flxLegend, flxTotal);
     // flxlist.add(labelTaken);
     // flxlist.add(labelPlanned);
     // flxlist.add(labelAvailable);
      //flxlist.add(chartWidget);
      //flxlist.add(labelTotal);
//       flxlist.add(labelTotalValue);
//       flxlist.add(labelPlannedValue);
//       flxlist.add(labelAvailableValue);
      flxlist.add(flxCover);
      this.frmname[this.widgets.flxChartContainer].add(flxlist);
    }
    //#ifdef iphone
    frmLeaveWallet.lblLine.height="1px";
    //#endif
    //#ifdef android
    frmLeaveWallet.lblLine.height="5px";
    //#endif
    kony.print("--------------------out kony.apps.coe.ess.myLeave.leaveWalletUI.bindData LeaveWalletUI_m.js");
  } catch (e) {
    handleError(e);
  }
};
// %Region - Methods in leaveWalletUI
/**
 * @member of  leaveWalletUI
 * @return {void} - none.
 * @throws Exception if something goes wrong,
 * @Desc - function called after fetching the data to bind it to leavewallet Flex
 * If index(i) is even the chart widgets are placed on left and for odd on the right
 * and skining is applied on alternate rows
 */
kony.apps.coe.ess.myLeave.leaveWalletUI.prototype.createSingleChart = function(data, color, skn) {
  kony.print("--------------------in kony.apps.coe.ess.myLeave.leaveWalletUI.bindData LeaveWalletUI_m.js");
  try {
    var top = 0;
    var left = 0;
    var flxlist;

    this.frmname[this.widgets.flxChartContainer].removeAll();
    flxlist = new kony.ui.FlexContainer({
      "id": "flxComplete",
      "top": 15 + "%",
      "left": 0 + "%",
      "width": "100%",
      "height": "84%",
      "zIndex": 1,
      "isVisible": true,
      "clipbounds": true,
      "layoutType": kony.flex.FREE_FORM
    }, {
      "padding": [0, 0, 0, 0],
      "marginInPixel": false,
      "paddingInPixel": false
    }, {});
    var chartWidget = this.createChartonLeaveBalance(data, color);
    kony.print("--------------------Created chart widget ");
    var charttitle = new kony.ui.Label({
      id: "lblCT",
      skin: "LblSkn555555Px30M",//removed "LBLMOB555555PX24",
      "top": "5%",
      "centerX": "50%",
      "width": "preffered",
      "height": "preffered",
      "text": data.LEAVETYPETITLE,
      "zIndex": 3,
      isVisible: true,
    }, {
      "padding": [0, 0, 0, 0],
      "marginInPixel": false,
      "paddingInPixel": false,
      contentAlignment: constants.CONTENT_ALIGN_CENTER
    }, {});

    var label1 = new kony.ui.Label({
      id: "lblD1",
      skin: "LblSkn555555Px80M",//skn,
      "top": "57%",
      "centerX": "50%",
      "width": "preffered",
      "height": "preffered",
      "text": data.LEAVEBALANCE,
      "zIndex": 3,
      isVisible: true,
    }, {
      "padding": [0, 0, 0, 0],
      "marginInPixel": false,
      "paddingInPixel": false,
      contentAlignment: constants.CONTENT_ALIGN_CENTER
    }, {});
    var label = new kony.ui.Label({
      id: "lblD2",
      skin: "LblSkn555555Px80M",
      "top": "38.26%",
      "left": "0%",
      "width": "100%",
      "height": "20%",
      "text": kony.i18n.getLocalizedString("i18n.ess.common.availed.valueKA"),
      "zIndex": 2,
      isVisible: true,
    }, {
      "padding": [0, 0, 0, 0],
      "marginInPixel": false,
      "paddingInPixel": false,
      contentAlignment: constants.CONTENT_ALIGN_CENTER
    }, {});

    flxlist.add(chartWidget);
    flxlist.add(label);
    flxlist.add(label1);
    this.frmname[this.widgets.flxChartContainer].add(charttitle);
    this.frmname[this.widgets.flxChartContainer].add(flxlist);

    kony.print("--------------------out kony.apps.coe.ess.myLeave.leaveWalletUI.bindData LeaveWalletUI_m.js");
  } catch (e) {
    handleError(e);
  }
};
// %Region - Methods in leaveWalletUI
/**
 * @member of  leaveWalletUI
 * @return {void} - none.
 * @throws Exception if something goes wrong,
 * @Desc - function called after fetching the data to bind it to leavewallet Flex
 */
kony.apps.coe.ess.myLeave.leaveWalletUI.prototype.createChartJSObjectAcc = function(data, colors) {

  var chartJSObj = {
    "chartProperties": {
      "enableScrolling": true,
      "drawEntities": ["donutChart"],
      //"chartHeight": "100%",
      "chartwidth": "100%",
      //"bottom": 11.6 + "%",
//       "title": {
//         "visible": true,
//         "text": "",
//         "position": "top",
//         "alignment": "center",
//         "direction": "up",
//         "containerWt": 20,
//         "top": 10 + "%",
//         "margin": [0, 0, 0, 0],
//         "background": {
//           "fillType": "gradient",
//           "transparency": 100,
//           "gradientType": "linearTopToBottom",
//           "gradientRatios": [0, 100],
//           "color": ["0xFFFFFFFF",
//                     "0xFFFFFFFF"
//                    ]
//         },
//         "font": {
//           "size": ["86%"],
//           "family": ["AvenirLTStd-Medium"],
//           "style": ["normal"],
//           "color": ["0x555555ff"],
//           "transparency": [0]
//         }
//       },
      "layerArea": {
        "border": {
          "visible": false,
          "line": {
            "color": ["0xDDDDDDff"],
            "width": [1],
            "transparency": [40]
          }
        },
        "background": {
          "fillType": "gradient",
          "transparency": 100,
          "gradientType": "linearTopToBottom",
          "gradientRatios": [0, 30, 70,
                             100
                            ],
          "color": ["0xFFFFFFFF",
                    "0xFFFFFFFF", "0xFFFFFFFF", "0xFFFFFFFF"
                   ]
        }
      },

      "background": {
        "fillType": "gradient",
        "transparency": 0,
        "gradientType": "linearTopToBottom",
        "gradientRatios": [0, 100],
        "color": ["0xFFFFFFFF",
                  "0xFFFFFFFF"
                 ]
      },
      "donutChart": {
        "startAngle": 270,
        "animations": {
          "onInitAnimation": true
        },
        "axis": {
          "isVisible": true
        },
        "columnId": [0],
        "spinWheel": false,
        "direction": "clockWise",
        "holeRadius": 80.5,
        "border": {
          "line": {
            "color": ["0xffffffff"],
            "transparency": [100],
            "width": 1
          }
        },

        "pieSlice": {
          "fillType": ["gradient"],
          "gradientType": ["linearTopToBottom"],
          "transparency": [0],
          "color": colors
        },

        "dataLabels": {
          "font": {
            "size": [0],
            "color": ["0xffffffff"]
          }
        }
      }
    },

    "chartData": {
      "columnNames": {
        "values": ["Accounts"]
      },

      "data": {
        "Accounts": [Number(data.LEAVETAKEN), Number(data.LEAVEBALANCE),5],//FIXME static variable 5
      },

      "rowNames": {
        "values": ["Total Leave", " Leave Taken","static data"]
      }

    }

  };
  return chartJSObj;
};
// %Region - Methods in leaveWalletUI
/**
 * @member of  leaveWalletUI
 * @return {void} - none.
 * @throws Exception if something goes wrong,
 * @Desc - callbackfunction of chart
 */
kony.apps.coe.ess.myLeave.leaveWalletUI.prototype.onflxClick = function(source) {
  var obj = new kony.apps.coe.ess.myLeave.leaveBalanceUI();
  obj.bindDataToForm(source.parent);
};