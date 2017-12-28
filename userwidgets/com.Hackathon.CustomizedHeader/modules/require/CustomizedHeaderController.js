define(function() {

	return {
		constructor: function(baseConfig, layoutConfig, pspConfig) {

		},
		//Logic for getters/setters of custom properties
		initGettersSetters: function() {

		},
      
      setBackgroundColor : function(color){
        this.view.flxHome.backgroundColor = color;
      },
      
      setSkinToHeaderTitle : function(skin){
        this.view.lblHeaderTitle.skin = skin;
      },
      
      setSkinToHeader : function(skin){
        this.view.flxHome.skin = skin;
      }
      
	};
});