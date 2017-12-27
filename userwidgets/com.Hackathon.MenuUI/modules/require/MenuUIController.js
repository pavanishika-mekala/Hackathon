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
        }
	};
});