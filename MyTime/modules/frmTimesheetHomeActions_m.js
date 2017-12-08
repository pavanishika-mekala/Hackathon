kony = kony || {};
kony.apps = kony.apps || {};
kony.apps.coe = kony.apps.coe || {};
kony.apps.coe.ess = kony.apps.coe.ess || {};
kony.apps.coe.ess.myTime = kony.apps.coe.ess.myTime || {};
kony.apps.coe.ess.myTime.frmTimesheetHomeActions = kony.apps.coe.ess.myTime.frmTimesheetHomeActions || {};


kony.apps.coe.ess.myTime.frmTimesheetHomeActions.SPA = function() {
    kony.print("--Start constructor: kony.apps.coe.ess.myTime.frmTimesheetHomeActions.SPA--");
    this.menuOptionsData = [{
            "name": "View History",
            "onClick": function() {
                alert("1");
            }
        },
        {
            "name": "Preferences",
            "onClick": function() {
                alert("2");
            }
        },
        {
            "name": "Notifications",
            "onClick": function() {
                alert("3");
            }
        },
        {
            "name": "App Gallery",
            "onClick": function() {
                alert("4");
            }
        },
        {
            "name": "Log Out",
            "onClick": function() {
                alert("5");
            }
        }
    ];
    kony.print("--End constructor: kony.apps.coe.ess.myTime.frmTimesheetHomeActions.SPA--");
};

kony.apps.coe.ess.myTime.frmTimesheetHomeActions.SPA.getInstance = function() {
    kony.print("--Start: kony.apps.coe.ess.myTime.frmTimesheetHomeActions.SPA.getInstance--");
    if (kony.apps.coe.ess.myTime.frmTimesheetHomeActions.SPA.singletonObj !== undefined) {
        return kony.apps.coe.ess.myTime.frmTimesheetHomeActions.SPA.singletonObj;
    } else {
        kony.apps.coe.ess.myTime.frmTimesheetHomeActions.SPA.singletonObj = new kony.apps.coe.ess.myTime.frmTimesheetHomeActions.SPA();
        return kony.apps.coe.ess.myTime.frmTimesheetHomeActions.SPA.singletonObj;
    }
    kony.print("--End: kony.apps.coe.ess.myTime.frmTimesheetHomeActions.SPA.getInstance--");
};
//added for spa
kony.apps.coe.ess.myTime.frmTimesheetHomeActions.SPA.prototype.onClickOfMenuButton = function() {
    var scopeObj = this;

    kony.print("--Start: kony.apps.coe.ess.myTime.frmTimesheetHomeActions.SPA.prototype.onClickOfMenuButton--");
    kony.apps.coe.ess.myTime.frmTimesheetHomeUI.SPA.getInstance().toggleMenuButton(successCallback);

    function successCallback(isClicked) {

        if (isClicked) {
            kony.print("--show SPA menu options popup--");
            kony.apps.coe.ess.myTime.TimesheetHomeClone.showSPAMenuOptions();
            frmTimesheetHome.segMenuWeb.widgetDataMap = { "lblName": "name" };
            kony.print("---- setData in scopeObj.menuOptionsData");
            frmTimesheetHome.segMenuWeb.setData(scopeObj.menuOptionsData);
            frmTimesheetHome.segMenuWeb.onClick = function() {
                frmTimesheetHome.segMenuWeb.selectedItems[0].onClick.call();
            };
        } else {
            kony.print("--hide SPA menu options popup--");
            kony.apps.coe.ess.myTime.TimesheetHomeClone.hideAllPopups();
            kony.apps.coe.ess.myTime.TimesheetHomeClone.hideSPAMenuOptions();
        }
    }
    kony.print("--End: kony.apps.coe.ess.myTime.frmTimesheetHomeActions.SPA.prototype.onClickOfMenuButton--");
};