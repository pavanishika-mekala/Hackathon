kony = kony || {};
kony.servicesapp = kony.servicesapp || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.log = kony.sdk.mvvm.log || {};
kony.sdk.mvvm.constants = kony.sdk.mvvm.constants || {};

//App level theme containing all the skins information
var themeJSONString = {};

/**
 * @function loadAndConfigureApp
 * this function will invoke the controllers to fetch the configurations
 * @params{backendUrl} - url for runtime environment of the app
 * @params{success} - success call back function
 */

kony.servicesapp.loadAndConfigureApp = function(backendUrl, success) {
    var contextObject = {};
    contextObject.roleID = kony.apps.coe.ess.globalVariables.designation_id;
  	AppConfigurationController.init(backendUrl);
    var appController = AppConfigurationController.getInstance(backendUrl);
    appController.getConfigurations(contextObject, function(configurationObject) {
        SkinConfigHandller.getInstance().loadConfigurationBasedSkinsAndApply(configurationObject);
        success();
    }, kony.net.isNetworkAvailable(constants.NETWORK_TYPE_ANY));
};


/**
 * @function SkinConfigHandller
 * this function will handle the configurations fetched from the runtime environment
 */

var SkinConfigHandller = (function() {
    var instance;

    function createInstance() {
        this.loadConfigurationBasedSkinsAndApply = function(configurationObject) {
            var jsonString = configurationObject.getConfigurationsBasedOnType("SKIN");
            function onsuccesscallback(response) {
                kony.print("---json: " + response);                         
            }

            function onerrorcallback(error) {
                kony.print("---error json: " + error);
            }
            if (JSON.stringify(jsonString) !== JSON.stringify({}) && JSON.stringify(jsonString) !== null) {
                for (var c in jsonString) {
                    jsonString[c] = JSON.parse(jsonString[c]);
                }
                var formattedtheme = JSON.stringify(jsonString);
				kony.store.setItem("dynamicSkinningTheme", formattedtheme);
              	kony.theme.createThemeFromJSONString(formattedtheme, "MyTheme1", onsuccesscallback, onerrorcallback);
                kony.theme.setCurrentTheme("MyTheme1", onsuccesscallback, onerrorcallback);
            } else { 
              	//For default role users.
              	//First login with manager role and then default role
              	var themes=kony.theme.getAllThemes();
              	if(themes[1]==="MyTheme1"){
              		kony.theme.deleteTheme ("MyTheme1", onsuccesscallback, onerrorcallback);
                  	kony.store.setItem("dynamicSkinningTheme", JSON.stringify({}));
                }
              	else{
                  //First time login with default role users
              		kony.store.setItem("dynamicSkinningTheme", JSON.stringify({}));
              	}
            }
        };
    }
    return {
        getInstance: function() {
            if (!instance){
				instance = new createInstance();
			}
            return instance;
        }
    };
})();