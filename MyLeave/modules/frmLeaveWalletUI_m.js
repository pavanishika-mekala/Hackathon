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
  weekNo = Number(weekNo).tofixed(); // as weekno is coming as 34.0
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
      "top":"-11%",
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
    var left = 4.0;
    var flag1 = 0;
    var flag2 = 0;
    var flxlist;
    for (var i = 0; i < this.data.length; i++) {
      var colors = [];
      var skn = "";
      if (i % 2 === 0) {
        if (i === 0) {
          left = 4.0;
        } else {
          left = 4.0;
          top += 2.64 + 44.50;
        }

        flxlist = new kony.ui.FlexContainer({
          "id": "flxComplete" + i,
          "top": top + "%",
          "left": left + "%",
          "width": "44%",
          "height": "44.50%",
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
          "width": "44%",
          "height": "44.50%",
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
          colors = [
            ["0xE8F8F8ff", "0xE8F8F8ff"],
            ["0x3BD1D7ff", "0x51F1B7ff"]
          ];
          flag1 = 1;
        } else if (flag1 === 1) {
          skn = "LBLMOB3BD1D7";
          colors = [
            ["0xEAF9FDff", "0xEAF9FDff"],
            ["0x41B1EEff", "0x51D2F1ff"]
          ];
          flag1 = 0;
        }
      } else {
        if (flag2 === 0) {
          skn = "LBLMOBF74A4A";
          colors = [
            ["0xFFEDEDff", "0xFFEDEDff"],
            ["0xF74A4Aff", "0xF78686ff"]
          ];
          flag2 = 1;
        } else if (flag2 === 1) {
          skn = "LBLMOBF74A4A";
          colors = [
            ["0xFFEBF3ff", "0xFFEBF3ff"],
            ["0xF82B7Bff", "0xF56DD5ff"]
          ];
          flag2 = 0;
        }
      }
      var chartWidget = this.createChart(this.data[i], colors);
      kony.print("--------------------Created chart widget " + i);


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

      var label1 = new kony.ui.Label({
        id: "lblD1" + i,
        skin: skn,
        "top": "37%",
        "centerX": "50%",
        "width": "preffered",
        "height": "preffered",
        "text": (Number(this.data[i].LEAVEBALANCE)).toFixed(),
        "zIndex": 3,
        isVisible: true,
      }, {
        "padding": [0, 0, 0, 0],
        "marginInPixel": false,
        "paddingInPixel": false,
        contentAlignment: constants.CONTENT_ALIGN_CENTER
      }, {});
      var label = new kony.ui.Label({
        id: "lblD2" + i,
        skin: "LBLMOB555555PX24",
        "top": "52.26%",
        "left": "0%",
        "width": "100%",
        "height": "20%",
        "text": "Available",
        "zIndex": 2,
        isVisible: true,
      }, {
        "padding": [0, 0, 0, 0],
        "marginInPixel": false,
        "paddingInPixel": false,
        contentAlignment: constants.CONTENT_ALIGN_CENTER
      }, {});
      //#ifdef iphone
      var labelTotalValue = new kony.ui.Label({
        id: "lblLTV"+i,
        skin: "LBLMOB555555PX24",
        "top": "78%",
        "left": "61%",
        "width": "100%",
        "height": "20%",
        "text": (Number(this.data[i].LEAVEBALANCE)).toFixed(),
        "zIndex": 2,
        isVisible: true,
      }, {
        "padding": [0, 0, 0, 0],
        "marginInPixel": false,
        "paddingInPixel": false,
      }, {});
      //#endif
      //#ifdef android
      var labelTotalValue = new kony.ui.Label({
        id: "lblLTV"+i,
        skin: "LBLMOB555555PX24",
        "top": "84.8%",
        "left": "61%",
        "width": "100%",
        "height": "20%",
        "text": (Number(this.data[i].LEAVEBALANCE)).toFixed(),
        "zIndex": 2,
        isVisible: true,
      }, {
        "padding": [0, 0, 0, 0],
        "marginInPixel": false,
        "paddingInPixel": false,
      }, {});
      //#endif
      var labelTotal = new kony.ui.Label({
        id: "lblLT"+i,
        skin: "LBLMOB555555PX24",
        "top": "78%",
        "left": "-4%",
        "width": "100%",
        "height": "20%",
        "text": "Total :",
        "zIndex": 2,
        isVisible: true,
      }, {
        "padding": [0, 0, 0, 0],
        "marginInPixel": false,
        "paddingInPixel": false,
        contentAlignment: constants.CONTENT_ALIGN_CENTER
      }, {});
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
      flxlist.add(label);
      flxlist.add(label1);
      flxlist.add(chartWidget);
      flxlist.add(labelTotal);
      flxlist.add(labelTotalValue);
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
      "top": top + "%",
      "left": left + "%",
      "width": "100%",
      "height": "100%",
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
      skin: "LBLMOB555555PX24",
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
      skin: skn,
      "top": "44%",
      "centerX": "50%",
      "width": "preffered",
      "height": "preffered",
      "text": (Number(data.LEAVEBALANCE)).toFixed(),
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
      skin: "LBLMOB555555PX24",
      "top": "67.26%",
      "left": "0%",
      "width": "100%",
      "height": "20%",
      "text": "Available",
      "zIndex": 2,
      isVisible: true,
    }, {
      "padding": [0, 0, 0, 0],
      "marginInPixel": false,
      "paddingInPixel": false,
      contentAlignment: constants.CONTENT_ALIGN_CENTER
    }, {});

    flxlist.add(charttitle);
    flxlist.add(label);
    flxlist.add(label1);
    flxlist.add(chartWidget);
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
      "chartHeight": "100%",
      "chartwidth": "100%",
      "bottom": 11.6 + "%",
      "title": {
        "visible": true,
        "text": "",
        "position": "top",
        "alignment": "center",
        "direction": "up",
        "containerWt": 20,
        "top": 10 + "%",
        "margin": [0, 0, 0, 0],
        "background": {
          "fillType": "gradient",
          "transparency": 100,
          "gradientType": "linearTopToBottom",
          "gradientRatios": [0, 100],
          "color": ["0xFFFFFFFF",
                    "0xFFFFFFFF"
                   ]
        },
        "font": {
          "size": ["86%"],
          "family": ["AvenirLTStd-Medium"],
          "style": ["normal"],
          "color": ["0x555555ff"],
          "transparency": [0]
        }
      },
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
        "holeRadius": 92.5,
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
        "Accounts": [Number(data.LEAVETAKEN), Number(data.LEAVEBALANCE)],
      },

      "rowNames": {
        "values": ["Total Leave", " Leave Taken"]
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