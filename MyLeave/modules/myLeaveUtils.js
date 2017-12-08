/** 
 *  @author     Parveen.Chahal
 *  @category   Business Logic.	
 *  @desc       
 *  @ © 2016    Kony Inc. 
 */

kony = kony || {};
kony.apps = kony.apps || {};


kony.apps.screenHeightInPx = "1096";
kony.apps.screenWidthInPx = "640";
kony.apps.screenHeightInDp = "548";
kony.apps.screenWidthInDp = "320";

/**
 * @type           function
 * @param          {Number} dp - width in dp.
 * @return         {Number} - Converted Value according to device resolution.
 * @description    This method convert width of a widget in dp according to device screen size.
 */
kony.apps.
generalizeWidthInDp = function(dp) {
    dp = parseFloat(dp);
    if(!isNaN(dp)) {
        return dp * (kony.os.deviceInfo().screenWidth / kony.apps.screenWidthInDp);
    }
    return null;
};

/**
 * @type           function
 * @param          {Number} dp - height in dp.
 * @return         {Number} - Converted Value according to device resolution.
 * @description    This method convert height of a widget in dp according to device screen size.
 */
kony.apps.
generalizeHeightInDp = function(dp) {
    dp = parseFloat(dp);
    if(!isNaN(dp)) {
        return dp * (kony.os.deviceInfo().screenHeight / kony.apps.screenHeightInDp);
    }
    return null;
};

/**
 * @type           function
 * @param          {Number} px - width in px.
 * @return         {Number} - Converted Value according to device resolution.
 * @description    This method convert width of a widget in px according to device screen size.
 */
kony.apps.
generalizeWidthInPx = function(px) {
    px = parseFloat(px);
    if(!isNaN(px)) {
        return parseInt(px * (kony.os.deviceInfo().deviceWidth / parseInt(kony.apps.screenWidthInPx)));
    }
    return null;
};

/**
 * @type           function
 * @param          {Number} px - height in px.
 * @return         {Number} - Converted Value according to device resolution.
 * @description    This method convert height of a widget in px according to device screen size.
 */
kony.apps.
generalizeHeightInPx = function(px) {
    px = parseFloat(px);
    if(!isNaN(px)) {
        return parseInt(px * (kony.os.deviceInfo().deviceHeight / parseInt(kony.apps.screenHeightInPx)));
    }
    return null;
};