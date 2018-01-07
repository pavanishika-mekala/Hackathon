define(function() {

	return {
		constructor: function(baseConfig, layoutConfig, pspConfig) {

		},
		//Logic for getters/setters of custom properties
		initGettersSetters: function() {

		},
        setIcon :function(icon){
          this.view.imgMenuUIIcon.src =icon;
        },
        setName :function(name){
          this.view.lblMenuUIName.text = name;
        },
        setMenuOnClick : function(onClick){
          this.view.onClick = onClick;
        },
      	applyLookAndFeel : function(animated){
          this.applyLayout(animated);
      	  this.applySkins(animated);
        },
        applyLayout : function(animated){
          this.view.imgMenuUIIcon.isVisible = (animated === true) ? true : false;
          this.view.imgArrow.isVisible = (animated === true) ? false : true;
          this.view.lblMenuUIName.top = (animated === true) ? "65%" : "10%";
          this.view.lblMenuUIName.height = (animated === true) ? "25%" : "50%";
          this.view.imgArrow.top = (animated === true) ? "88%" : "70%";
        },
        applySkins : function(){
          
        }
	};
});