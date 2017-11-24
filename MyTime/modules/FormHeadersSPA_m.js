
//Type your code here

kony = kony || {};
kony.apps = kony.apps || {};
kony.apps.coe = kony.apps.coe || {};
kony.apps.coe.ess = kony.apps.coe.ess || {};
kony.apps.coe.ess.myTime = kony.apps.coe.ess.myTime || {};

kony.apps.coe.ess.myTime.SPAHeaders = function() {
  kony.print("--Start constructor: kony.apps.coe.ess.myTime.SPAHeaders.SPA--");
    this.selectedTabForHomeAndViewForm = 1;
  kony.print("--End constructor: kony.apps.coe.ess.myTime.SPAHeaders.SPA--");
};


kony.apps.coe.ess.myTime.SPAHeaders.getInstance = function() {
    kony.print("--Start: kony.apps.coe.ess.myTime.SPAHeaders.getInstance--");
    if(kony.apps.coe.ess.myTime.SPAHeaders.singletonObj !== undefined) {
        return kony.apps.coe.ess.myTime.SPAHeaders.singletonObj;
    } else {
        kony.apps.coe.ess.myTime.SPAHeaders.singletonObj = new kony.apps.coe.ess.myTime.SPAHeaders();
        return kony.apps.coe.ess.myTime.SPAHeaders.singletonObj;
    }
    kony.print("--End: kony.apps.coe.ess.myTime.SPAHeaders.getInstance--");
};

kony.apps.coe.ess.myTime.SPAHeaders.prototype.onClickOfSPAHeaderMenu = function(indexSelected) {
    kony.print("--Start: kony.apps.coe.ess.myTime.SPAHeaders.prototype.onClickOfSPAHeaderMenu--");
  switch (indexSelected) {
        case 1:
            flxHeaderHomeAndView.flxHomeButton.imgHomeButtonDisabled.isVisible = false;
            flxHeaderHomeAndView.flxHomeButton.imgHomeButton.isVisible = true;
            flxHeaderHomeAndView.flxViewButton.imgViewButtonActive.isVisible = false;
            flxHeaderHomeAndView.flxViewButton.imgViewButton.isVisible = true;
            flxHeaderHomeAndView.flxHomeButton.lblHeaderMenuHighlightHomeButton.isVisible = true;
            flxHeaderHomeAndView.flxViewButton.lblHeaderMenuHighlightViewButton.isVisible = false;
            kony.apps.coe.ess.myTime.frmTimesheetHomeUI.SPA.getInstance().setHeaderConfiguration();
            showTimesheetHomeForm();
            break;
        case 2:
            flxHeaderHomeAndView.flxHomeButton.imgHomeButton.isVisible = false;
            flxHeaderHomeAndView.flxHomeButton.imgHomeButtonDisabled.isVisible = true;
            flxHeaderHomeAndView.flxViewButton.imgViewButtonActive.isVisible = true;
            flxHeaderHomeAndView.flxViewButton.imgViewButton.isVisible = false;
            flxHeaderHomeAndView.flxHomeButton.lblHeaderMenuHighlightHomeButton.isVisible = false;
            flxHeaderHomeAndView.flxViewButton.lblHeaderMenuHighlightViewButton.isVisible = true;
            kony.apps.coe.ess.myTime.frmTimesheetHomeUI.SPA.getInstance().setHeaderConfiguration();
            showTimesheetHistoryForm();
            break;
        default:
            kony.print("--wrong input given--");
    }
  
  
  
  
   
    kony.print("--End: kony.apps.coe.ess.myTime.SPAHeaders.prototype.onClickOfSPAHeaderMenu--");
};