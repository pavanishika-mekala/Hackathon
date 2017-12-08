
kony = kony || {};
kony.apps = kony.apps || {};
kony.apps.coe = kony.apps.coe || {};
kony.apps.coe.ess = kony.apps.coe.ess || {};
kony.apps.coe.ess.myTime = kony.apps.coe.ess.myTime || {};
kony.apps.coe.ess.myTime.CreateViewTabUI = function () {
	kony.print("-- Start CreateViewTabUI --");
	kony.print("-- End CreateViewTabUI --");
};

kony.apps.coe.ess.myTime.
CreateViewTabUI.prototype.createViewInit = function(data) {
    try {
        kony.print("-- Start createViewInit --");
        kony.apps.coe.ess.myTime.CreateViewTabUI.monthsArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var currDate = new Date();
        frmCreateView.lblMonth.text = kony.apps.coe.ess.myTime.CreateViewTabUI.monthsArray[currDate.getMonth()];
        frmCreateView.lblYear.text = currDate.getFullYear().toString().trim(0, 4);
    
      kony.print("-- End createViewInit --");
    } catch (e) {}
    };

kony.apps.coe.ess.myTime.
CreateViewTabUI.prototype.createViewPreshow = function () {
};
