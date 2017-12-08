/**
 * @function jsonConcat
 * this function will create an app level theme containing configured skins 
 * @params{inputThemeJSON} - skin retrieved from middleware
 * @params{outputThemeJSON}- app level theme appending individual skin to previous skins
 */
function jsonConcat(outputThemeJSON, inputThemeJSON) {
    for (var key in inputThemeJSON) {
        outputThemeJSON[key] = inputThemeJSON[key];
    }
    return outputThemeJSON;
}

/**
 * @function ConfigProviderMFAPPOnline
 * this function will establish a connection from app to runtime environment of object services
 * @params{backendUrl} - url for runtime environment of the app
 */

function ConfigProviderMFAPPOnline(backendUrl) {
    function getConfigurationMasters(url, successCB) {
        try {
            var httpclient = new kony.net.HttpRequest();
            var returnResponse;
            var configObject = new ConfigurationObject();
            httpclient.onReadyStateChange = function() {
                if (this.readyState == constants.HTTP_READY_STATE_DONE) {
                    var response = httpclient.response.records;
                    if (response && response[0] !== undefined && response[0].bundles !== "") {
                        var bundles = response[0].bundles.split(",");
                        var successCallback;
                        for (var i = 0; i < bundles.length; i++) {
                            if (i == bundles.length - 1) {
                                successCallback = successCB;
                            }
                            getConfigurationFromBundle(bundles[i], configObject, successCallback);
                        }
                    } else {
                        successCB(configObject);
                    }
                }
            };
            httpclient.open(constants.HTTP_METHOD_GET, encodeURI(url));
            httpclient.send();
        } catch (e) {
            alert(e);
        }
    }

    function getConfigurationFromBundle(bundleId, configurationObject, successCallback) {
        try {
            var httpclient = new kony.net.HttpRequest();
            var configDataObject = {};
            httpclient.onReadyStateChange = function() {
                if (this.readyState == constants.HTTP_READY_STATE_DONE) {
                    var configurations = httpclient.response.records;
                    for (var i = 0; i < configurations.length; i++) {
                        if (configurations[i].type !== undefined) {
                            while (configurations[i].value.search("'") != -1) {
                                configurations[i].value = configurations[i].value.replace("'", "\"");
                            }
                            configDataObject[configurations[i].configkey] = configurations[i].value;
                        }
                    }
                    if (configurations.length !== 0) {
                        var type = configurations[0].type;
                        configurationObject.addConfigurationBundle(bundleId, type, configDataObject);
                    }
                }
                if (typeof successCallback == 'function'){
                	successCallback(configurationObject);
                }
            };
            httpclient.open(constants.HTTP_METHOD_GET, encodeURI(backendUrl+"/TimeConfigurations/objects/Configurations?$filter=configurationBundle_id eq "+bundleId));
            httpclient.send();
        } catch (e) {
            alert(e);
        }
    }

    this.getConfigurations = function(contextObject, successCB) {
        var urlForRole = backendUrl+"/TimeConfigurations/objects/ConfigurationMaster?$filter=role_id eq " + contextObject.roleId;
        getConfigurationMasters(urlForRole, successCB);
    };
}

var AppConfigurationController = (function() {
    var instance;

    function createInstance(backendUrl) {
        var bURL = backendUrl;
        var configProvider = new ConfigProviderMFAPPOnline(bURL); 
        var configurationFileLocation = kony.io.FileSystem.getDataDirectoryPath() + "/DynamicSkinning.txt";
        this.getConfigurationFileLocation = function() {
            return configurationFileLocation;
        };
        this.getConfigurations = function(context, successCB, isRefresh) {
            if (isRefresh) {
                var contextObject = {};
                contextObject.roleId = context.roleID;
                contextObject.appId = context.appID;
              	contextObject.backendURL = bURL;
				contextObject.versionNo=kony.apps.coe.ess.appconfig.appversion;
                var success = function(configurationObject) {
                    var myFile = kony.io.FileSystem.getFile(configurationFileLocation);
                    if (myFile.exists()){
                    	myFile.write(configurationObject.stringify());
                    }
                    else {
                        var file = new kony.io.File(configurationFileLocation);
                        file.write(configurationObject.stringify());
                    }
                    successCB(configurationObject);
                };
                configProvider.getConfigurations(contextObject, success);
            } else {
                var myFile = kony.io.FileSystem.getFile(configurationFileLocation);
                if (myFile.exists()) {
                    var a = myFile.read();
                    var configurationObject = new ConfigurationObject(JSON.parse(a.text));
                    if (typeof configurationObject == "object") {
                        successCB(configurationObject);
                    }
                } else {
                    this.getConfigurations(context, successCB, true);
                }
            }
        };
    }
    return {
        init: function(backendUrl) {
            instance = new createInstance(backendUrl);
        },
        getInstance: function(backendUrl) {
            if (!instance) instance = new createInstance(backendUrl);
            return instance;
        }
    };
})();

var ConfigurationFactory = (function() {
    var instance;

    function createInstance() {
        instance = {
            getConfigurationProvider: function() {
                var configProvider;
                configProvider = new ConfigProviderMFAPPOnline();
                return configProvider;
            }
        };
        return instance;
    }
    return {
        getInstance: function() {
            if (!instance) instance = new createInstance();
            return instance;
        }
    };
})();

var configObject = function(key, value) {
    this.key = key;
    this.value = value;
};

var ConfigurationBundle = function(t, d, b) {
    var data = d;
    var type = t;
    var bundleId = b;
    this.getBundleData = function() {
        return data;
    };
    this.getBundleType = function() {
        return type;
    };
    this.getBundleId = function() {
        return bundleId;
    };
};
var ConfigurationObject = function(configurationObjectJSON) {
    var configObject = {};
    if (configurationObjectJSON) {
        for (var cb in configurationObjectJSON) {
            var bundleJSON = configurationObjectJSON[cb];
            var bundle = new ConfigurationBundle(bundleJSON.type, bundleJSON.data, bundleJSON.bundleId);
            configObject[cb] = bundle;
        }
    }
    this.addConfigurationBundle = function(bundleId, type, data) {
        var configBundle = new ConfigurationBundle(type, data);
        configObject[bundleId] = configBundle;
    };
    this.getConfigurationBundleBasedOnType = function(type) {
        var configBundles = [];
        for (var cb in configObject) {
            if (configObject[cb].getBundleType() == type) configBundles.push(configObject[cb]);
        }
        return configBundles;
    };
    this.getConfigurationBundleBasedOnBundleId = function(bundleId) {
        return configObject[bundleId];
    };
    this.stringify = function() {
        var configObj = {};
        for (var key in configObject) {
            var bundle = configObject[key];
            var bundleJSON = {};
            bundleJSON.data = bundle.getBundleData();
            bundleJSON.type = bundle.getBundleType();
            bundleJSON.bundleId = bundle.getBundleId();
            configObj[key] = bundleJSON;
        }
        return JSON.stringify(configObj);
    };
    this.getConfigurationsBasedOnType = function(type) {
        var bundlesArray = this.getConfigurationBundleBasedOnType(type);
        var configurationsObject = {};
        for (var i = 0; i < bundlesArray.length; i++) {
            var bundle = bundlesArray[i];
            var bundleData = bundle.getBundleData();
            for (var configuration in bundleData) {
                configurationsObject[configuration] = bundleData[configuration];
            }
        }
        return configurationsObject;
    };
};