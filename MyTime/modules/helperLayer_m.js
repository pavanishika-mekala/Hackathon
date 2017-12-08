kony = kony || {};
kony.apps = kony.apps || {};
kony.apps.coe = kony.apps.coe || {};
kony.apps.coe.ess = kony.apps.coe.ess || {};
kony.apps.coe.ess.myTime = kony.apps.coe.ess.myTime || {};
kony.apps.coe.ess.myTime.frmTimesheetHelp = kony.apps.coe.ess.myTime.frmTimesheetHelp || {};

kony.apps.coe.ess.myTime.frmTimesheetHelp.helpLayerObj = null;
kony.apps.coe.ess.myTime.frmTimesheetHelp.HelpLayer = function (formref) {
	this.formref = formref;
	this.index = 0;
    this.flxHelper = frmTimesheetHelp.flxHelperImages.clone("");
	this.images = ["help_layer001.png", "help_layer002.png", "help_layer003.png", "help_layer004.png", "help_layer005.png", "help_layer006.png", "help_layer007.png", "help_layer008.png"];
};

kony.apps.coe.ess.myTime.frmTimesheetHelp.HelpLayer.prototype.showHelpLayer = function () {
  
  //for spa helperLayer not required 
  if(kony.apps.coe.ess.globalVariables.isSPA===true)
    {
      return;
    }
  
    if (this.formref == frmTimesheetHelp) {
      	frmTimesheetHelp.flxTimesheetHelpMain.isVisible = false;
		this.formref.flxHelperImages.isVisible = true;
	} 
    else {
      if(kony.store.getItem("flag") === 0){
         return;
      } else{
        frmTimesheetHome.flxTimesheetHome.isVisible = false;
        this.formref.add(this.flxHelper);
        this.formref.flxHelperImages.isVisible = true;
        kony.store.setItem("flag", 0);
      }
    }
//  outerFlexFooterNavigation.setVisibility(false);//hides footer as footer should bde diasabled while displaying help layer
  this.showImageAt(this.index);
};

kony.apps.coe.ess.myTime.frmTimesheetHelp.HelpLayer.prototype.hideHelpLayer = function () {
  	if (this.formref == frmTimesheetHelp) {
      	frmTimesheetHelp.flxTimesheetHelpMain.isVisible = true;
	} 
    else {
        frmTimesheetHome.flxTimesheetHome.isVisible = true;
    }
  //  outerFlexFooterNavigation.isVisible=true;
	kony.store.setItem("isFirstTime",1);
  	this.formref.flxHelperImages.isVisible = false;
};
kony.apps.coe.ess.myTime.frmTimesheetHelp.HelpLayer.prototype.showImageAt = function (ind) {
	if (ind < 0 || ind >= this.images.length) {
		return;
	}
	if (ind === 0) {
		this.formref.imgPrev.src = "backarrowdisable.png";
		this.formref.imgNext.src = "next_arrow.png";      	
	} else if (ind === this.images.length - 1) {
		this.formref.imgPrev.src = "back_arrow.png";
		this.formref.imgNext.src = "nextarrowdisabke.png";      	
	} else {
		this.formref.imgPrev.src = "back_arrow.png";
		this.formref.imgNext.src = "next_arrow.png";      	
	}
	this.formref.imgHelperImage.src = this.images[ind];
};
kony.apps.coe.ess.myTime.frmTimesheetHelp.HelpLayer.prototype.showNextImage = function () {
	if (this.index < this.images.length - 1) {
		this.showImageAt(++this.index);
	}
};
kony.apps.coe.ess.myTime.frmTimesheetHelp.HelpLayer.prototype.showPrevImage = function () {
	if (this.index > 0) {
		this.showImageAt(--this.index);
	}
};
