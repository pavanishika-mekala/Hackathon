/*** @Author saipavan.jamboju@kony.com
 * @category Business Logic / Action
 * @desc genericFunctions
 * @ © 2016 kony Inc. */
kony = kony || {};
kony.apps = kony.apps || {};
kony.apps.coe = kony.apps.coe || {};
kony.apps.coe.ess = kony.apps.coe.ess || {};
/**
 constructor
 */
kony.apps.coe.ess.syncFunctions = function() {
  var syncHamburger = 0;
};

//Global variable that indicates availability of network
var isNetAvailable = null;
//*********************************************************************************
/**
 * @function checkConnectivity
 * Checks for internet connectivity
 * Params : None
 * Return type : void
 */

kony.apps.coe.ess.syncFunctions.prototype.checkConnectivity = function() {
    var config = {};
    config.statusChange = function(isOnLine) {
        if (isNetAvailable === null) {
            if (kony.net.isNetworkAvailable(constants.NETWORK_TYPE_ANY)) {
                isNetAvailable = 1;
                kony.print("device is Online");
            } else {
                isNetAvailable = 0;
                kony.print("device is offline");
            }
        } else {
            if (isOnLine && !isNetAvailable) {
                if (kony.net.isNetworkAvailable(constants.NETWORK_TYPE_ANY)) {
                    kony.print("Device is online");
                    isNetAvailable = 1;
                }
            } else if (!isOnLine && isNetAvailable) {
                if (!kony.net.isNetworkAvailable(constants.NETWORK_TYPE_ANY)) {
                    kony.print("Device is offline");
                    isNetAvailable = 0;
                }
            }
        }
    };
    kony.net.setNetworkCallbacks(config);
};


//*********************************************************************************
/**
 * @function generatePassword
 * generates and returns string of provided length
 * Params : length
 * Return type : String
 */

String.prototype.generatePassword = function(length) {
    var charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890@$&^()";
    var retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
};
//*********************************************************************************
/**
 * @function getSyncKey
 * generates and returns key that is used for encrypting sync db
 * Params : None
 * Return type : String
 */

kony.apps.coe.ess.syncFunctions.prototype.getSyncKey = function() {
    if (kony.store.getItem("syncKey") === null) {
        var data = "".generatePassword(23);
        var encryptDecryptKey = kony.crypto.newKey("passphrase", 128, {
            passphrasetext: ["".generatePassword(32)],
            subalgo: "aes",
            passphrasehashalgo: "md5"
        });
        var myUniqueIDKey = kony.crypto.saveKey("encryptionKey", encryptDecryptKey);
        kony.store.setItem("sync", myUniqueIDKey);
        var prptobj = {
            padding: "pkcs5",
            mode: "cbc",
            initializationvector: "1234567890123456"
        };
        var encryptedSyncData = kony.crypto.encrypt("aes", encryptDecryptKey, data, prptobj);
        kony.store.setItem("syncKey", kony.convertToBase64((encryptedSyncData)));
        return data;
    } else {
        var syncKey = kony.store.getItem("sync");
        var myUniqueKey = kony.crypto.readKey(syncKey);
        var properties = {
            padding: "pkcs5",
            mode: "cbc",
            initializationvector: "1234567890123456"
        };
        var temp = kony.store.getItem("syncKey");
        var mySyncKey = kony.crypto.decrypt("aes", myUniqueKey, kony.convertToRawBytes(temp), properties);
        return mySyncKey;
    }

};

//*********************************************************************************
/**
 * @function encryptData
 * Encrpyts the data using generated key
 * Params : String
 * Return type : String
 */

kony.apps.coe.ess.syncFunctions.prototype.encryptData = function(data) {
    if (kony.store.getItem("syncKey") === null) {
        var securityObj = new kony.apps.coe.ess.syncFunctions();
        securityObj.getSyncKey();
    }
    var syncKey = kony.store.getItem("sync");
    var myUniqueKey = kony.crypto.readKey(syncKey);
    var properties = {
        padding: "pkcs5",
        mode: "cbc",
        initializationvector: "1234567890123456"
    };
    var encryptedData = kony.crypto.encrypt("aes", myUniqueKey, data, properties);
    return (kony.convertToBase64(encryptedData));
};

//*******************************************************************************
/**
 * @function decryptData
 * decrypts the data using generated key
 * Params : String
 * Return type : String
 */

kony.apps.coe.ess.syncFunctions.prototype.decryptData = function(data) {
    if (kony.store.getItem("syncKey") === null) {
        var securityObj = new kony.apps.coe.ess.syncFunctions();
        securityObj.getSyncKey();
    }
    var syncKey = kony.store.getItem("sync");
    var myUniqueKey = kony.crypto.readKey(syncKey);
    var properties = {
        padding: "pkcs5",
        mode: "cbc",
        initializationvector: "1234567890123456"
    };
    var decryptedData = kony.crypto.decrypt("aes", myUniqueKey, kony.convertToRawBytes(data), properties);
    return decryptedData;
};
