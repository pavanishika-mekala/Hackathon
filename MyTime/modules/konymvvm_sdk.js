/*
 * JSFace Object Oriented Programming Library
 * https://github.com/tnhu/jsface
 *
 * Copyright (c) 2009-2013 Tan Nhu
 * Licensed under MIT license (https://github.com/tnhu/jsface/blob/master/LICENSE.txt)
 */
(function(context, OBJECT, NUMBER, LENGTH, toString, undefined, oldClass, jsface) {
    /**
     * Return a map itself or null. A map is a set of { key: value }
     * @param obj object to be checked
     * @return obj itself as a map or false
     */
    function mapOrNil(obj) {
        return (obj && typeof obj === OBJECT && !(typeof obj.length === NUMBER && !(obj.propertyIsEnumerable(LENGTH))) && obj) || null;
    }

    /**
     * Return an array itself or null
     * @param obj object to be checked
     * @return obj itself as an array or null
     */
    function arrayOrNil(obj) {
        return (obj && typeof obj === OBJECT && typeof obj.length === NUMBER && !(obj.propertyIsEnumerable(LENGTH)) && obj) || null;
    }

    /**
     * Return a function itself or null
     * @param obj object to be checked
     * @return obj itself as a function or null
     */
    function functionOrNil(obj) {
        return (obj && typeof obj === "function" && obj) || null;
    }

    /**
     * Return a string itself or null
     * @param obj object to be checked
     * @return obj itself as a string or null
     */
    function stringOrNil(obj) {
        return (toString.apply(obj) === "[object String]" && obj) || null;
    }

    /**
     * Return a class itself or null
     * @param obj object to be checked
     * @return obj itself as a class or false
     */
    function classOrNil(obj) {
        return (functionOrNil(obj) && (obj.prototype && obj === obj.prototype.constructor) && obj) || null;
    }

    /**
     * Util for extend() to copy a map of { key:value } to an object
     * @param key key
     * @param value value
     * @param ignoredKeys ignored keys
     * @param object object
     * @param iClass true if object is a class
     * @param oPrototype object prototype
     */
    function copier(key, value, ignoredKeys, object, iClass, oPrototype) {
        if (!ignoredKeys || !ignoredKeys.hasOwnProperty(key)) {
            object[key] = value;
            if (iClass) {
                oPrototype[key] = value;
            } // class? copy to prototype as well
        }
    }

    /**
     * Extend object from subject, ignore properties in ignoredKeys
     * @param object the child
     * @param subject the parent
     * @param ignoredKeys (optional) keys should not be copied to child
     */
    function extend(object, subject, ignoredKeys) {
        if (arrayOrNil(subject)) {
            for (var len = subject.length; --len >= 0;) {
                extend(object, subject[len], ignoredKeys);
            }
        } else {
            ignoredKeys = ignoredKeys || {
                constructor: 1,
                $super: 1,
                prototype: 1,
                $superp: 1
            };

            var iClass = classOrNil(object),
                isSubClass = classOrNil(subject),
                oPrototype = object.prototype,
                supez, key, proto;

            // copy static properties and prototype.* to object
            if (mapOrNil(subject)) {
                for (key in subject) {
                    copier(key, subject[key], ignoredKeys, object, iClass, oPrototype);
                }
            }

            if (isSubClass) {
                proto = subject.prototype;
                for (key in proto) {
                    copier(key, proto[key], ignoredKeys, object, iClass, oPrototype);
                }
            }

            // prototype properties
            if (iClass && isSubClass) {
                extend(oPrototype, subject.prototype, ignoredKeys);
            }
        }
    }

    /**
     * Create a class.
     * @param parent parent class(es)
     * @param api class api
     * @return class
     */
    function Class(parent, api) {
        if (!api) {
            parent = (api = parent, 0); // !api means there's no parent
        }

        var clazz, constructor, singleton, statics, key, bindTo, len, i = 0,
            p,
            ignoredKeys = {
                constructor: 1,
                $singleton: 1,
                $statics: 1,
                prototype: 1,
                $super: 1,
                $superp: 1,
                main: 1,
                toString: 0
            },
            plugins = Class.plugins;

        api = (typeof api === "function" ? api() : api) || {}; // execute api if it's a function
        constructor = api.hasOwnProperty("constructor") ? api.constructor : 0; // hasOwnProperty is a must, constructor is special
        singleton = api.$singleton;
        statics = api.$statics;

        // add plugins' keys into ignoredKeys
        for (key in plugins) {
            ignoredKeys[key] = 1;
        }

        // construct constructor
        clazz = singleton ? {} : (constructor ? constructor : function() {});

        // determine bindTo: where api should be bound
        bindTo = singleton ? clazz : clazz.prototype;

        // make sure parent is always an array
        parent = !parent || arrayOrNil(parent) ? parent : [parent];

        // do inherit
        len = parent && parent.length;
        while (i < len) {
            p = parent[i++];
            for (key in p) {
                if (!ignoredKeys[key]) {
                    bindTo[key] = p[key];
                    if (!singleton) {
                        clazz[key] = p[key];
                    }
                }
            }
            for (key in p.prototype) {
                if (!ignoredKeys[key]) {
                    bindTo[key] = p.prototype[key];
                }
            }
        }

        // copy properties from api to bindTo
        for (key in api) {
            if (!ignoredKeys[key]) {
                bindTo[key] = api[key];
            }
        }

        // copy static properties from statics to both clazz and bindTo
        for (key in statics) {
            clazz[key] = bindTo[key] = statics[key];
        }

        // if class is not a singleton, add $super and $superp
        if (!singleton) {
            p = parent && parent[0] || parent;
            clazz.$super = p;
            clazz.$superp = p && p.prototype ? p.prototype : p;
            bindTo.$class = clazz;
        }

        for (key in plugins) {
            plugins[key](clazz, parent, api);
        } // pass control to plugins
        if (functionOrNil(api.main)) {
            api.main.call(clazz, clazz);
        } // execute main()
        return clazz;
    }

    /* Class plugins repository */
    Class.plugins = {};

    /* Initialization */
    jsface = {
        Class: Class,
        extend: extend,
        mapOrNil: mapOrNil,
        arrayOrNil: arrayOrNil,
        functionOrNil: functionOrNil,
        stringOrNil: stringOrNil,
        classOrNil: classOrNil
    };

    if (typeof module !== "undefined" && module.exports) { // NodeJS/CommonJS
        module.exports = jsface;
    } else {
        oldClass = context.Class; // save current Class namespace
        context.Class = Class; // bind Class and jsface to global scope
        context.jsface = jsface;
        jsface.noConflict = function() {
            context.Class = oldClass;
        }; // no conflict
    }
})(this, "object", "number", "length", Object.prototype.toString);
kony = kony || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.Utils = kony.sdk.mvvm.Utils || {};

kony.sdk.mvvm.Utils.isAndroidTablet = function() {
    var isAndroidTab = false;
    //#ifdef tabrcandroid
    isAndroidTab = true;
    //#endif
    return isAndroidTab;
};
kony = kony || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.Util = Class({
    $statics: {
        getQueryForDynamicFields: function(entity, fields, entityMetadata) {
            if (!kony.sdk.mvvm.KonyApplicationContext.getAppInstance().isTenantSyncEnabled()) {
                var error = new kony.sdk.mvvm.Exception(kony.sdk.mvvm.ExceptionCode.CD_TENANT_NOT_SYNC_ENABLED, kony.sdk.mvvm.ExceptionCode.MSG_TENANT_NOT_SYNC_ENABLED);
                kony.sdk.mvvm.log.error("ERROR " + error);
                kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
                throw error
            }
            var table = new kony.sdk.mvvm.Table(entity);
            var query = new kony.sdk.mvvm.SelectQuery(table);
            if (typeof fields === "string") {
                var column = new kony.sdk.mvvm.Column(table, fields);
                query.addColumn(column)
            } else {
                var fieldsLength = fields.length;
                for (var i = 0; i < fieldsLength; i++) {
                    kony.print("fields[i] " + fields[i]);
                    var column = {};
                    var tab = new kony.sdk.mvvm.Table(fields[i]["tableName"]);
                    var alias = fields[i]["aliasName"];
                    var aggrfunction = fields[i]["aggrfunction"];
                    var fieldType = fields[i]["fieldtype"];
                    if ((fields[i]["fieldName"] == undefined || fields[i]["fieldName"] == null || fields[i]["fieldName"].trim() == "") && (fieldType == undefined || fieldType == null || !kony.sdk.mvvm.Utils.matchIgnoreCase(fieldType, "computed"))) {
                        continue
                    }
                    if (fields[i]["tableName"]) {
                        column = new kony.sdk.mvvm.Column(tab, fields[i]["fieldName"])
                    } else {
                        column = new kony.sdk.mvvm.Column(table, fields[i]["fieldName"])
                    }
                    if (alias !== undefined && alias !== null && alias !== "") {
                        column.setAlias(alias)
                    }
                    if (aggrfunction !== undefined && aggrfunction !== null && aggrfunction !== "") {
                        column.setAggregation(aggrfunction)
                    }
                    if (fieldType !== undefined && fieldType !== null && kony.sdk.mvvm.Utils.matchIgnoreCase(fieldType, "computed")) {
                        column.setComputedField(true)
                    }
                    kony.print("column obj " + kony.sdk.mvvm.util.stringifyKonyObject(column));
                    query.addColumn(column)
                }
            }
            kony.print("Query --- > " + kony.sdk.mvvm.util.stringifyKonyObject(query));
            return query
        },
        validateFieldMapping: function(entityMetadata, fieldName) {
            if (entityMetadata && fieldName && fieldName.trim() !== "") {
                if (entityMetadata.columnsMap && entityMetadata.columnsMap[fieldName]) {
                    return true
                } else {
                    for (var i = 0; i < entityMetadata.fields.length; i++) {
                        var fm = entityMetadata.fields[i];
                        if (kony.sdk.mvvm.Utils.matchIgnoreCase(fm.name, fieldName)) {
                            return true
                        }
                    }
                    return false
                }
            }
            return false
        },
        getQueryForFields: function(entity, fields, criteriaObj) {
            kony.sdk.mvvm.log.info("tableName 000 ", entity);
            var table = new kony.sdk.mvvm.Table(entity);
            var query = new kony.sdk.mvvm.SelectQuery(table);
            if (typeof fields === "string") {
                var column = new kony.sdk.mvvm.Column(table, fields);
                query.addColumn(column)
            } else {
                var fieldsLength = fields.length;
                for (var i = 0; i < fieldsLength; i++) {
                    kony.sdk.mvvm.log.info("fields[i] " + fields[i]);
                    var column = new kony.sdk.mvvm.Column(table, fields[i]);
                    kony.sdk.mvvm.log.info("column obj ", column);
                    query.addColumn(column)
                }
            }
            if (criteriaObj !== null || criteriaObj !== undefined || criteriaObj !== {}) {
                for (var key in criteriaObj) {
                    kony.sdk.mvvm.log.info("Key in criteriaObj +++ " + key + "  value " + criteriaObj[key]);
                    var column = new kony.sdk.mvvm.Column(table, key);
                    var match = new kony.sdk.mvvm.Match(column, kony.sdk.mvvm.MatchType.EQUALS, criteriaObj[key]);
                    kony.sdk.mvvm.log.info("criteria obj +++ ", match);
                    query.addCriteria(match)
                }
            }
            kony.sdk.mvvm.log.info("Query --- > ", query);
            return query
        },
        getDataAsPerType: function(val, dataType, widgetType) {
            var convertedVal = val;
            dataType = dataType.toLowerCase();
            switch (dataType) {
                case "varchar":
                case "picklist":
                case "picklistmultiselect":
                case "extendedfield":
                    convertedVal = String(val);
                    break;
                case "int2":
                case "int8":
                case "integer":
                case "serial":
                    if (kony.sdk.mvvm.Utils.isValidNumberType(val)) {
                        convertedVal = parseInt(val, 10);
                        if (isNaN(convertedVal)) convertedVal = null
                    }
                    break;
                case "boolean":
                    convertedVal = String(typeof val === "string" ? val === "true" ? true : false : new Boolean(val));
                    break;
                case "date":
                case "timestamp":
                    if (widgetType === "calendar") convertedVal = new Date(val);
                    else convertedVal = String(val);
                    break;
                case "reference":
                    convertedVal = val;
                    break;
                default:
                    kony.sdk.mvvm.log.error("Invalid datatype");
                    break
            }
            return convertedVal
        },
        clone: function(src) {
            return clone(src);

            function clone(src) {
                function mixin(dest, source, copyFunc) {
                    var name, s, i, empty = {};
                    for (name in source) {
                        s = source[name];
                        if (!(name in dest) || dest[name] !== s && (!(name in empty) || empty[name] !== s)) {
                            dest[name] = copyFunc ? copyFunc(s) : s
                        }
                    }
                    return dest
                }
                if (!src || typeof src != "object" || Object.prototype.toString.call(src) === "[object Function]") {
                    return src
                }
                if (src.nodeType && "cloneNode" in src) {
                    return src.cloneNode(true)
                }
                if (src instanceof Date) {
                    return new Date(src.getTime())
                }
                if (src instanceof RegExp) {
                    return new RegExp(src)
                }
                var r, i, l;
                if (src instanceof Array) {
                    r = [];
                    for (i = 0, l = src.length; i < l; ++i) {
                        if (i in src) {
                            r.push(clone(src[i]))
                        }
                    }
                } else {
                    r = src.constructor ? new src.constructor : {}
                }
                return mixin(r, src, clone)
            }
        },
        formatDate: function(date) {
            var now = date;
            year = "" + now.getFullYear();
            month = "" + (now.getMonth() + 1);
            if (month.length == 1) {
                month = "0" + month
            }
            day = "" + now.getDate();
            if (day.length == 1) {
                day = "0" + day
            }
            return year + "-" + month + "-" + day
        },
        formatTimeStamp: function(date) {
            var now = date;
            year = "" + now.getFullYear();
            month = "" + (now.getMonth() + 1);
            if (month.length == 1) {
                month = "0" + month
            }
            day = "" + now.getDate();
            if (day.length == 1) {
                day = "0" + day
            }
            hour = "" + now.getHours();
            if (hour.length == 1) {
                hour = "0" + hour
            }
            minute = "" + now.getMinutes();
            if (minute.length == 1) {
                minute = "0" + minute
            }
            second = "" + now.getSeconds();
            if (second.length == 1) {
                second = "0" + second
            }
            return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second
        },
        validateQuery: function(query, parametersToQuery, widgetId, initErrorCallback) {
            if (query) {
                var noOfOccurences = query.split("{").length - 1;
                var noOfSecondOccurences = query.split("}").length - 1;
                if (noOfOccurences !== noOfSecondOccurences) {
                    initErrorCallback(new kony.sdk.mvvm.Exception(kony.sdk.mvvm.ExceptionCode.CD_ERROR_BRACES_ARE_NOT_DEFINED_PROPERLY, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_BRACES_ARE_NOT_DEFINED_PROPERLY + " for the widget query :" + widgetId));
                    return
                }
                kony.sdk.mvvm.log.info("QueryParams provided to widgetId are {} ", parametersToQuery);
                var noOfParamsSupplied = 0;
                for (var k in parametersToQuery) {
                    noOfParamsSupplied = noOfParamsSupplied + 1
                }
                var firstIndex, secondIndex, subString, paramValue;
                for (var i = 0; i < noOfOccurences; i += 1) {
                    firstIndex = -1;
                    secondIndex = -1;
                    firstIndex = query.indexOf("{", firstIndex + 1);
                    secondIndex = query.indexOf("}", secondIndex + 1);
                    if (firstIndex > secondIndex) {
                        initErrorCallback(new kony.sdk.mvvm.Exception(kony.sdk.mvvm.ExceptionCode.CD_ERROR_BRACES_ARE_NOT_DEFINED_PROPERLY, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_BRACES_ARE_NOT_DEFINED_PROPERLY + " in " + this.konyWidget.id + " widget query :" + widgetId));
                        return
                    }
                    subString = query.substring(firstIndex + 1, secondIndex);
                    paramValue = parametersToQuery[subString];
                    if (paramValue !== undefined) query = query.replace("{" + subString + "}", paramValue);
                    else {
                        initErrorCallback(new kony.sdk.mvvm.Exception(kony.sdk.mvvm.ExceptionCode.CD_ERROR_PARAM_VALUE_NOT_DEFINED_IN_QUERYPARAM, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_PARAM_VALUE_NOT_DEFINED_IN_QUERYPARAM + " " + subString + " regarding this widget :" + widgetId));
                        return
                    }
                }
            }
            kony.sdk.mvvm.log.info("query after replacing the queryParams with its values from navObj is " + query);
            return query
        },
        format: {
            segmentData: function(data, widgetConfig) {
                if (widgetConfig && widgetConfig.isSortByDefined()) {
                    if (data && data.length) {
                        if (!data[0].hasOwnProperty(widgetConfig.getSortByKey())) throw kony.sdk.mvvm.KonyApplicationContext.getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_INVALID_SORTBYKEY, kony.sdk.mvvm.ExceptionCode.MSG_INVALID_SORTBYKEY);
                        data = kony.sdk.mvvm.Util.format.sortObjectArrayByKey(data, widgetConfig.getSortByKey(), widgetConfig.getSortType())
                    }
                }
                if (widgetConfig && widgetConfig.isGroupByDefined()) {
                    groupByField = widgetConfig.getGroupByKey();
                    if (data && data.length)
                        if (!data[0].hasOwnProperty(groupByField)) throw kony.sdk.mvvm.KonyApplicationContext.getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_INVALID_GROUPBYKEY, kony.sdk.mvvm.ExceptionCode.MSG_INVALID_GROUPBYKEY);
                    if (groupByField) {
                        var tempData = kony.sdk.mvvm.Util.format.groupObjectArrayByKey(data, groupByField);
                        var groupedData = [];
                        for (name in tempData) {
                            groupedData.push([name, tempData[name]])
                        }
                        if (groupedData.length) data = groupedData
                    }
                }
                return data
            },
            groupObjectArrayByKey: function(objArray, key) {
                var tempData = {};
                for (var index = 0; index < objArray.length; index++) {
                    if (objArray[index].hasOwnProperty(key)) {
                        if (tempData.hasOwnProperty(objArray[index][key])) tempData[objArray[index][key]].push(objArray[index]);
                        else tempData[objArray[index][key]] = [objArray[index]]
                    }
                }
                return tempData
            },
            sortObjectArrayByKey: function(objArray, key, sortType) {
                try {
                    var compare;
                    if (sortType == "Ascending") {
                        compare = function(a, b) {
                            if (a[key] < b[key]) return -1;
                            if (a[key] > b[key]) return 1;
                            return 0
                        }
                    } else if (sortType == "Descending") {
                        compare = function(a, b) {
                            if (a[key] < b[key]) return 1;
                            if (a[key] > b[key]) return -1;
                            return 0
                        }
                    } else if (sortType == "Length_Ascending") {
                        compare = function(a, b) {
                            if (a[key].length < b[key].length) return -1;
                            if (a[key].length > b[key].length) return 1;
                            return 0
                        }
                    } else if (sortType == "Length_Descending") {
                        compare = function(a, b) {
                            if (a[key].length < b[key].length) return 1;
                            if (a[key].length > b[key].length) return -1;
                            return 0
                        }
                    } else {
                        compare = function(a, b) {
                            if (a[key] < b[key]) return -1;
                            if (a[key] > b[key]) return 1;
                            return 0
                        }
                    }
                    return objArray.sort(compare)
                } catch (err) {
                    return objArray
                }
            }
        },
        mergeJSONs: function(json1, json2) {
            if (!json1) return json2;
            if (!json2) return json1;
            for (var key in json2)
                if (!json1.hasOwnProperty(key)) json1[key] = json2[key];
            return json1
        }
    }
});
kony.sdk.mvvm.Util.callAlert = function(msg, type, alertHandler, title, yesLabel, noLabel) {
    var numType;
    var pspConf = {};
    var basicConf;
    if (yesLabel == null) yesLabel = "Ok";
    if (noLabel == null) noLabel = "Cancel";
    if (alertHandler == null) alertHandler = null;
    if (title == null) title = "";
    if (type == "info") {
        numType = constants.ALERT_TYPE_INFO
    }
    if (type == "error") {
        numType = constants.ALERT_TYPE_ERROR
    }
    if (type == "confirmation") {
        numType = constants.ALERT_TYPE_CONFIRMATION
    }
    basicConf = {
        message: msg,
        alertType: numType,
        alertTitle: title,
        yesLabel: yesLabel,
        noLabel: noLabel,
        alertHandler: alertHandler
    };
    kony.ui.Alert(basicConf, pspConf)
};
kony.sdk.mvvm.Util.convertDateToYYYYMMDD = function(inDate, inChar) {
    var outDate = "";
    if (inDate != null && inDate != "0") {
        var dateTab = inDate.split(inChar);
        outDate = dateTab[2] + dateTab[1] + dateTab[0]
    }
    return outDate
};
kony.sdk.mvvm.Util.formatDateFromSky = function(inDate, dateFormat, spliter) {
    var outDate = "";
    if (inDate != null && inDate != "0") {
        var year = kony.string.sub(inDate, 0, 3);
        var month = kony.string.sub(inDate, 4, 5);
        var day = kony.string.sub(inDate, 6, 7);
        if (dateFormat == "ddmmyyyy") {
            outDate = day + spliter + month + spliter + year
        } else if (dateFormat == "mmddyyyy") {
            outDate = month + spliter + day + spliter + year
        } else if (dateFormat == "yyyymmdd") {
            outDate = year + spliter + month + spliter + day
        }
    }
    return outDate
};
kony.sdk.mvvm.Util.formatToSetDate = function(givendate) {
    var calWidgetTab = [];
    if (givendate != null && givendate != "") {
        calWidgetTab = givendate.split("/");
        if (kony.os.deviceInfo().name == "blackberry") {
            var mmm = kony.os.toNumber(calWidgetTab[kony.decrement(2)]);
            var ddd = kony.os.toNumber(calWidgetTab[kony.decrement(1)]);
            var yyy = kony.os.toNumber(calWidgetTab[kony.decrement(3)]);
            var temp = [];
            temp = [mmm, ddd, yyy];
            return temp
        } else {
            var mmm = calWidgetTab[kony.decrement(2)];
            var ddd = calWidgetTab[kony.decrement(1)];
            var yyy = calWidgetTab[kony.decrement(3)];
            calWidgetTab = [ddd, mmm, yyy];
            return calWidgetTab
        }
    }
    return givendate
};
kony = kony || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.v2 = kony.sdk.mvvm.v2 || {};
kony.sdk.mvvm.AppFactoryInterface = Class({
    constructor: function() {},
    createApplicationContextImpl: function() {},
    createExceptionObject: function(errCode, errMsg, errorObj) {},
    createDataServiceObject: function(isOnline) {},
    createUIConfigServiceObject: function(isOnline) {},
    createSyncManagerObject: function() {},
    createMetaDataServiceObject: function(isOnline) {},
    createDataProviderObject: function(dataprovider) {},
    createDataObject: function(data) {},
    createModelObject: function(entityName, context) {},
    createApplicationPropertiesObject: function() {},
    createQueryObject: function(query, queryType) {},
    createViewObject: function(modelConfig) {},
    createConfigClassObject: function(configObj) {},
    createEventObject: function(eventname) {},
    createFormControllerObject: function(formControllerName, context, modelConfigObj) {},
    createFormControllerExtObject: function(formControllerExtName, controllerObj) {},
    createFormModelObject: function(formModelName, controllerObj) {},
    createFormModelExtObject: function(formModelExtName, formModelObj) {},
    createAppInitManagerObject: function() {},
    createAuthManager: function() {},
    getAuthManager: function() {},
    createAuthenticationServiceManagerObject: function(AuthenticationManagerClassName) {},
    createDataStoreObject: function() {},
    createMetadataServiceManagerObject: function() {},
    createQueryManagerObject: function() {},
    createODataQueryObject: function(queryObj) {},
    createSQLQueryObject: function(queryObj) {},
    createSegmentFieldObject: function(widgetid, fieldInfo) {},
    createSearchInfoObject: function(widgetid, searchVal) {},
    createSegmentWidgetConfigObject: function(widgetid, widgetConfig) {},
    createWidgetConfigObject: function(widgetid, widgetConfig) {},
    createORMControllerObject: function(appContext, options) {},
    createConfigurationServiceManagerObject: function() {},
    createORMControllerOdataObject: function(applicationContext) {},
    createORMControllerOdataExpandObject: function(applicationContext) {},
    createORMControllerSQLObject: function(applicationContext) {},
    createBaseControllerExtObject: function(controllerObj) {},
    createGroupWidgetsContextOffline: function(config, contextData) {},
    createGroupWidgetsContextOnline: function(config, contextData) {},
    createGroupWidgetsContextCommon: function(config, contextData) {},
    createMetadataStore: function() {}
});
kony = kony || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.v2 = kony.sdk.mvvm.v2 || {};
kony.sdk.mvvm.AppFactory = Class(kony.sdk.mvvm.AppFactoryInterface, {
    constructor: function() {},
    createApplicationContextImpl: function(factoryObj) {
        return new kony.sdk.mvvm.KonyApplicationContextMFAPP(factoryObj)
    },
    createExceptionObject: function(errCode, errMsg, errorObj) {
        return new kony.sdk.mvvm.Exception(errCode, errMsg, errorObj)
    },
    createDataServiceObject: function(isOnline) {
        var instance = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
        if (instance && instance.getApplicationProperties() && instance.getApplicationProperties().getApplicationPropertiesByKey("DataService")) {
            var dataService = instance.getApplicationProperties().getApplicationPropertiesByKey("DataService");
            try {
                var dataServiceHndlr = eval.call(null, dataService);
                return new dataServiceHndlr(isOnline)
            } catch (e) {
                return new kony.sdk.mvvm.DataService(isOnline)
            }
        } else {
            return new kony.sdk.mvvm.DataService(isOnline)
        }
    },
    createUIConfigServiceObject: function(isOnline) {
        var instance = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
        if (instance && instance.getApplicationProperties() && instance.getApplicationProperties().getApplicationPropertiesByKey("UIConfigService")) {
            var configService = instance.getApplicationProperties().getApplicationPropertiesByKey("UIConfigService");
            try {
                var configServiceHndlr = eval.call(null, configService);
                return new configServiceHndlr(isOnline)
            } catch (e) {
                return new kony.sdk.mvvm.UIConfigService(isOnline)
            }
        } else {
            return new kony.sdk.mvvm.UIConfigService(isOnline)
        }
    },
    createSyncManagerObject: function() {
        return new kony.sdk.mvvm.SyncManagerMF
    },
    createMetaDataServiceObject: function(isOnline) {
        var instance = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
        if (instance && instance.getApplicationProperties() && instance.getApplicationProperties().getApplicationPropertiesByKey("MetadataService")) {
            var metadataService = instance.getApplicationProperties().getApplicationPropertiesByKey("MetadataService");
            try {
                var metadatServiceHndlr = eval.call(null, metadataService);
                return new metadatServiceHndlr(isOnline)
            } catch (e) {
                return new kony.sdk.mvvm.MetadataService(isOnline)
            }
        } else {
            return new kony.sdk.mvvm.MetadataService(isOnline)
        }
    },
    createDataProviderObject: function(dataprovider) {
        return new kony.sdk.mvvm.v2.DataProvider(dataprovider)
    },
    createDataObject: function(data) {
        return new kony.sdk.mvvm.Data(data)
    },
    createModelObject: function(context, entityName, serviceName, options) {
        if (entityName) {
            var modelObj;
            var modelName = "kony.sdk.mvvm.ObjectServices." + serviceName + "." + entityName + "Model";
            eval.call(null, "var modelHandler = " + modelName);
            eval.call(null, "var modelExtensionHandler = " + modelName + "Extension");
            var metadataStore = context.getMetadataStore();
            var entityMetadata = metadataStore.getEntityMetadata(entityName, serviceName, options);
            if (entityMetadata) {
                var configOptions = {};
                configOptions["serviceName"] = serviceName;
                configOptions["options"] = options;
                modelObj = new modelHandler(context, entityMetadata, configOptions)
            } else {
                kony.sdk.mvvm.log.error("error in entity controller factory, entity meta data for " + entityName + " undefined")
            }
            if (modelExtensionHandler !== undefined && typeof modelExtensionHandler === "function") {
                modelExtensionObj = new modelExtensionHandler(modelObj);
                modelObj.setControllerExtensionObject(modelExtensionObj)
            } else {
                kony.sdk.mvvm.log.error("error in entity controller factory, model Extension Object for " + entityName + " is undefined")
            }
            return modelObj
        }
    },
    createApplicationPropertiesObject: function() {
        return new kony.sdk.mvvm.ApplicationProperties
    },
    createQueryObject: function(query, queryType) {
        return new kony.sdk.mvvm.Query(query, queryType)
    },
    createViewObject: function(modelConfig) {
        return new kony.sdk.mvvm.View(modelConfig)
    },
    createConfigClassObject: function(configObj) {
        return new kony.sdk.mvvm.ConfigClass(configObj)
    },
    createEventObject: function(eventname) {
        return new kony.sdk.mvvm.event(eventname)
    },
    createFormControllerObject: function(formControllerName, context, modelConfigObj) {
        var formControllerHandler = eval.call(null, formControllerName);
        return new formControllerHandler(context, modelConfigObj)
    },
    createFormControllerExtObject: function(formControllerExtName, controllerObj) {
        var formControllerExtHandler = eval.call(null, formControllerExtName);
        return new formControllerExtHandler(controllerObj)
    },
    createFormModelObject: function(formModelName, controllerObj) {
        var formModelHandler = eval.call(null, formModelName);
        return new formModelHandler(controllerObj)
    },
    createFormModelExtObject: function(formModelExtName, formModelObj) {
        var formModelExtHandler = eval.call(null, formModelExtName);
        return new formModelExtHandler(formModelObj)
    },
    createAuthManager: function() {
        var authManager = new kony.sdk.mvvm.AuthManagerMF;
        if (kony.sdk.mvvm.KonyApplicationContext.getAppInstance()) kony.sdk.mvvm.KonyApplicationContext.getAppInstance().setAuthManager(authManager);
        return authManager
    },
    createAuthenticationManager: function() {
        var authManager = new kony.sdk.mvvm.AuthenticationManager;
        if (kony.sdk.mvvm.KonyApplicationContext.getAppInstance()) kony.sdk.mvvm.KonyApplicationContext.getAppInstance().setAuthManager(authManager);
        return authManager
    },
    getAuthManager: function() {
        if (kony.sdk.mvvm.KonyApplicationContext.getAppInstance() && kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getAuthManager()) return kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getAuthManager();
        else return this.createAuthManager()
    },
    createDataStoreObject: function() {
        return new kony.sdk.mvvm.DataStore
    },
    createAppInitManagerObject: function() {
        return new kony.sdk.mvvm.AppInitManager
    },
    createAuthenticationServiceManagerObject: function(AuthenticationManagerClassName) {
        try {
            temp = eval.call(null, "new " + AuthenticationManagerClassName + "();");
            return temp
        } catch (err) {
            kony.sdk.mvvm.log.error("Error while creating AuthenticationServiceManager : " + err.toString())
        }
    },
    createMetadataServiceManagerObject: function() {
        return new kony.sdk.mvvm.MetadataServiceManagerMF
    },
    createMetadataManagerObject: function() {
        return new kony.sdk.mvvm.MetadataServiceManager
    },
    createQueryManagerObject: function() {
        return new kony.sdk.mvvm.QueryManager
    },
    createODataQueryObject: function(queryObj) {
        return new kony.sdk.mvvm.ODataQuery(queryObj)
    },
    createSQLQueryObject: function(queryObj) {
        return new kony.sdk.mvvm.SQLQuery(queryObj)
    },
    createSegmentFieldObject: function(widgetid, fieldInfo) {
        return new kony.sdk.mvvm.SegmentField(widgetid, fieldInfo)
    },
    createSearchInfoObject: function(widgetid, searchVal) {
        return new kony.sdk.mvvm.searchInfo(widgetid, searchVal)
    },
    createSegmentWidgetConfigObject: function(widgetid, widgetConfig) {
        return new kony.sdk.mvvm.SegmentWidgetConfig(widgetid, widgetConfig)
    },
    createWidgetConfigObject: function(widgetid, widgetConfig) {
        return new kony.sdk.mvvm.widgetConfig(widgetid, widgetConfig)
    },
    createORMControllerObject: function(appContext, options) {
        return new kony.sdk.mvvm.persistent.ORMControllerMFAPP(appContext, options)
    },
    createConfigurationServiceManagerObject: function() {
        return new kony.sdk.mvvm.ConfigurationServiceManager
    },
    createORMControllerOdataObject: function(applicationContext) {
        return new kony.sdk.mvvm.persistent.ORMControllerMFAPPOData(applicationContext)
    },
    createORMControllerOdataExpandObject: function(applicationContext) {
        return new kony.sdk.mvvm.persistent.ORMControllerMFAPPODataExpand(applicationContext)
    },
    createORMControllerSQLObject: function(applicationContext) {
        return new kony.sdk.mvvm.persistent.ORMControllerMFAPPSQL(applicationContext)
    },
    createBaseControllerExtObject: function(controllerObj) {
        return new kony.sdk.mvvm.BaseFormControllerExtension(controllerObj)
    },
    createGroupWidgetsContextOffline: function(config, contextData) {
        return new kony.sdk.mvvm.persistent.GroupWidgetsContextOffline(config, contextData)
    },
    createGroupWidgetsContextOnline: function(config, contextData) {
        return new kony.sdk.mvvm.persistent.GroupWidgetsContextOnline(config, contextData)
    },
    createGroupWidgetsContextCommon: function(config, contextData) {
        return new kony.sdk.mvvm.persistent.GroupWidgetsContextCommon(config, contextData)
    },
    createMetadataStore: function() {
        return new kony.sdk.mvvm.MetadataStore
    }
});
kony = kony || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.log = kony.sdk.mvvm.log || {};
kony.sdk.mvvm.util = kony.sdk.mvvm.util || {};
kony.sdk.mvvm.constants = kony.sdk.mvvm.constants || {};
kony.sdk.mvvm.v2 = kony.sdk.mvvm.v2 || {};
kony.sdk.mvvm.constants.applicationStatus = {};
kony.sdk.mvvm.constants.applicationStatus.PROCESSING = "processing";
kony.sdk.mvvm.constants.applicationStatus.COMPLETED = "completed";
kony.sdk.mvvm.applicationStatus = kony.sdk.mvvm.constants.applicationStatus.PROCESSING;
kony.sdk.mvvm.KonyGlobalObject = this;
kony.sdk.mvvm.APPLOGINDETAILS = {};
kony.sdk.mvvm.minimumSupportedVersion = "1.1.0";
if (kony.sdk.mvvm.APPTYPE === undefined || kony.sdk.mvvm.APPTYPE === null) kony.sdk.mvvm.APPTYPE = "standalone";
kony.sdk.mvvm.OperationType = Class({
    $statics: {
        NO_FILTER: 1,
        FILTER_BY_PRIMARY_KEY: 2,
        ADD: 3
    }
});
kony.sdk.mvvm.v2.Model = {};
kony.sdk.mvvm.v2.Model.ValidationType = Class({
    $statics: {
        CREATE: 1,
        UPDATE: 2
    }
});
kony.sdk.mvvm.DataModel = Class({
    constructor: function() {
        var masterEntityName;
        var primaryFieldValue;
        var primaryKeyValueMap = {};
        var entityDataMap = {};
        this.setPrimaryKeyValueMap = function(primarykeyMap) {
            primaryKeyValueMap = primarykeyMap
        };
        this.getPrimaryKeyValueMap = function() {
            return primaryKeyValueMap
        };
        this.getEntityDataMap = function(entity) {
            return entityDataMap[entity]
        };
        this.setEntityDataMap = function(entity, map) {
            entityDataMap[entity] = map
        }
    }
});
kony.sdk.mvvm.NavigationObject = Class({
    constructor: function() {
        var dataModel = undefined;
        var operationType = {};
        var requestOptions = undefined;
        operationType["form"] = kony.sdk.mvvm.OperationType.NO_FILTER;
        var customInfo = undefined;
        var additionalFields = undefined;
        var query = undefined;
        var queryType = undefined;
        var queryParams = undefined;
        this.getDataModel = function(widgetId) {
            if (!widgetId) {
                widgetId = "form"
            }
            return dataModel && dataModel[widgetId]
        };
        this.setDataModel = function(dataModelArg, operationType, widgetId) {
            if (!dataModel) {
                dataModel = {}
            }
            if (!widgetId) {
                widgetId = "form"
            }
            this.setOperationType(operationType, widgetId);
            dataModel[widgetId] = dataModelArg
        };
        this.getOperationType = function(widgetId) {
            if (!widgetId) {
                return operationType["form"]
            } else {
                return operationType[widgetId]
            }
        };
        this.setOperationType = function(operationTypeArg, widgetId) {
            if (!widgetId) {
                widgetId = "form"
            }
            if (!operationType) {
                operationType = {}
            }
            operationType[widgetId] = operationTypeArg
        };
        this.getCustomInfo = function(key) {
            return customInfo && customInfo[key]
        };
        this.setCustomInfo = function(key, value) {
            if (!customInfo) {
                customInfo = {}
            }
            customInfo[key] = value
        };
        this.setAdditionalFields = function(widgetId, keys) {
            var ArrayConstructor = [].constructor;
            try {
                if (!additionalFields) {
                    additionalFields = {}
                }
                if (keys && keys.constructor !== ArrayConstructor || arguments.length === 1 && arguments[0].constructor !== ArrayConstructor) {
                    throw kony.sdk.mvvm.KonyApplicationContext.getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_ADDITIONAL_FIELDS_ARE_NOT_DEFINED_PROPERLY, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_ADDITIONAL_FIELDS_ARE_NOT_DEFINED_PROPERLY + "for this widget : " + widgetId)
                }
                if (widgetId && keys) {
                    additionalFields[widgetId] = keys
                } else if (arguments.length === 1) {
                    additionalFields["form"] = arguments[0]
                }
            } catch (err) {
                kony.sdk.mvvm.log.error("error in setting AdditionalFields " + err);
                throw kony.sdk.mvvm.KonyApplicationContext.getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_IN_SET_ADDITIONAL_FIELDS, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_IN_SET_ADDITIONAL_FIELDS + " : " + err.toString(), err)
            }
        };
        this.getAdditionalFields = function(widgetId) {
            if (!widgetId) {
                return additionalFields && additionalFields["form"]
            } else {
                return additionalFields && additionalFields[widgetId]
            }
        };
        this.setQuery = function(widgetId, queryArg, queryTypeArg) {
            var stringConstructor = "test".constructor;
            try {
                if (queryArg && queryArg.constructor !== stringConstructor || arguments.length === 1 && arguments[0].constructor !== stringConstructor) {
                    throw kony.sdk.mvvm.KonyApplicationContext.getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_QUERY_NOT_DEFINED_PROPERLY, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_QUERY_NOT_DEFINED_PROPERLY + "for this widget : " + widgetId)
                }
                if (!query) {
                    query = {}
                }
                if (!queryType) {
                    queryType = {}
                }
                if (arguments.length === 3 && queryArg && widgetId && queryTypeArg) {
                    query[widgetId] = queryArg;
                    queryType[widgetId] = queryTypeArg
                } else if (arguments.length === 2) {
                    if (queryArg === "sql" || queryArg === "sql_union" || queryArg === "odata") {
                        query["form"] = arguments[0];
                        queryType["form"] = arguments[1]
                    } else {
                        query[widgetId] = queryArg
                    }
                } else if (arguments.length === 1) {
                    query["form"] = arguments[0]
                }
            } catch (err) {
                kony.sdk.mvvm.log.error("error in setting Query " + err);
                throw kony.sdk.mvvm.KonyApplicationContext.getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_IN_SET_QUERY, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_IN_SET_QUERY + " : " + err.toString(), err)
            }
        };
        this.getQuery = function(widgetId) {
            if (!widgetId) {
                return query && query["form"]
            } else {
                return query && query[widgetId]
            }
        };
        this.setQueryParams = function(widgetId, queryParamsArg) {
            var JSONConstructor = {}.constructor;
            if (!queryParams) {
                queryParams = {}
            }
            try {
                if (queryParamsArg && queryParamsArg.constructor !== JSONConstructor || arguments.length === 1 && arguments[0].constructor !== JSONConstructor) {
                    throw kony.sdk.mvvm.KonyApplicationContext.getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_QUERYPARAMS_NOT_DEFINED_PROPERLY, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_QUERYPARAMS_NOT_DEFINED_PROPERLY + "for this widget : " + widgetId)
                }
                if (queryParamsArg && widgetId) {
                    queryParams[widgetId] = queryParamsArg
                } else if (arguments.length === 1) {
                    queryParams["form"] = arguments[0]
                }
            } catch (err) {
                kony.sdk.mvvm.log.error("error in setting QueryParams " + err);
                throw kony.sdk.mvvm.KonyApplicationContext.getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_IN_SET_QUERY_PARAMS, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_IN_SET_QUERY_PARAMS + " : " + err.toString(), err)
            }
        };
        this.getQueryParams = function(widgetId) {
            if (!widgetId) {
                return queryParams && queryParams["form"]
            } else {
                return queryParams && queryParams[widgetId]
            }
        };
        this.getQueryType = function(widgetId) {
            if (!widgetId) {
                return queryType && queryType["form"]
            } else {
                return queryType && queryType[widgetId]
            }
        };
        this.setQueryType = function(widgetId, queryTypeArg) {
            if (!queryType) {
                queryType = {}
            }
            if (arguments.length === 2 && widgetId && queryTypeArg) {
                queryType[widgetId] = queryTypeArg
            } else if (arguments.length === 1 && queryTypeArg) {
                queryType["form"] = arguments[0]
            }
        };
        this.setRequestOptions = function(widgetId, options) {
            var JSONConstructor = {}.constructor;
            try {
                if (!requestOptions) {
                    requestOptions = {}
                }
                if (options && options.constructor !== JSONConstructor || arguments.length === 1 && arguments[0].constructor !== JSONConstructor) {
                    throw kony.sdk.mvvm.KonyApplicationContext.getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_OPTIONS_ARE_NOT_DEFINED_PROPERLY, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_OPTIONS_ARE_NOT_DEFINED_PROPERLY + "for this widget : " + widgetId)
                }
                if (widgetId && options) {
                    requestOptions[widgetId] = options
                } else if (arguments.length === 1) {
                    requestOptions["form"] = arguments[0]
                }
            } catch (err) {
                kony.sdk.mvvm.log.error("error in setting options " + err);
                throw kony.sdk.mvvm.KonyApplicationContext.getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_IN_SET_OPTIONS, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_IN_SET_OPTIONS + " : " + err.toString(), err)
            }
        };
        this.getRequestOptions = function(widgetId) {
            if (!widgetId) {
                return requestOptions && requestOptions["form"]
            } else {
                return requestOptions && requestOptions[widgetId]
            }
        }
    },
    addCustomInfo: function(key, value) {
        this.setCustomInfo(key, value)
    },
    removeCustomInfo: function(key) {
        if (!this.getCustomInfo()) {
            return
        }
        this.setCustomInfo(key, undefined)
    },
    removeAdditionalFields: function(widgetId) {
        if (widgetId && this.getAdditionalFields(widgetId)) {
            this.setAdditionalFields(widgetId) = null
        } else {
            this.setAdditionalFields("form") = null
        }
    },
    removeQuery: function(widgetId) {
        if (widgetId && this.getQuery(widgetId)) {
            this.setQuery(widgetId) = undefined
        } else {
            this.setQuery("form") = undefined
        }
    },
    removeQueryParams: function(widgetId) {
        if (widgetId && this.getQueryParams(widgetId)) {
            this.setQueryParams(widgetId) = undefined
        } else {
            this.setQueryParams("form") = undefined
        }
    },
    removeQueryType: function(widgetId) {
        if (widgetId && this.getQueryType(widgetId)) {
            this.setQueryType(widgetId) = undefined
        } else {
            this.setQueryType("form") = undefined
        }
    },
    clone: function() {
        var newObj = kony.sdk.mvvm.Util.clone(this);
        return newObj
    }
});
kony.sdk.mvvm.View = Class({
    constructor: function(modelConfig) {
        this.modelConfig = modelConfig;
        this.konyform = kony.sdk.mvvm.KonyGlobalObject[this.modelConfig.getFormId()];
        this.konyWidgetObjects = {};
        this.observerViewModels = [];
        this.decorator = undefined;
        var scopeObj = this;
        var appFactoryInstance = kony.sdk.mvvm.KonyApplicationContext.getFactorySharedInstance();

        function createWidgetControllers() {
            if (scopeObj.konyform === undefined || scopeObj.konyform === null) {
                throw appFactoryInstance.createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_KONY_FORM_OBJECT_UNDEFINED, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_KONY_FORM_OBJECT_UNDEFINED)
            }
            var widgets = scopeObj.modelConfig.getWidgets();
            kony.sdk.mvvm.log.info("inside widget controller create ... ");
            for (var widgetId in widgets) {
                if (scopeObj.konyform[widgetId] !== null) {
                    var widgetType = widgets[widgetId]["widgettype"] ? widgets[widgetId]["widgettype"].toLowerCase() : undefined;
                    if (widgetType === undefined || !widgets[widgetId]) continue;
                    kony.sdk.mvvm.log.info("widgetcontroller for id : " + widgetId + " widgetType : " + widgetType);
                    var tabpaneId = widgets[widgetId]["tabpaneId"];
                    var konyWidget = tabpaneId === undefined || tabpaneId === null ? scopeObj.konyform[widgetId] : scopeObj.konyform[tabpaneId][widgetId];
                    if (konyWidget === undefined || konyWidget === null) continue;
                    var widgetControllerName = "WidgetController";
                    widgetControllerName = widgets[widgetId]["controller"];
                    kony.sdk.mvvm.log.info("widget controller 1 -- " + widgetControllerName);
                    var defaultWidgetControllerName = "WidgetController";
                    var widgetType = widgetType.toLowerCase().trim();
                    switch (widgetType.toLowerCase().trim()) {
                        case "label":
                        case "button":
                        case "textbox":
                        case "textarea":
                        case "textarea2":
                        case "textfield":
                        case "textbox2":
                        case "image":
                        case "link":
                        case "calendar":
                        case "switch":
                        case "slider":
                        case "phone":
                        case "richtext":
                            if (widgets[widgetId]["isMultiEntityLabel"]) {
                                defaultWidgetControllerName = "MultiEntityLabelController";
                                widgetcontrollername = "MultiEntityLabelController";
                                break
                            }
                            defaultWidgetControllerName = "WidgetController";
                            widgetcontrollername = widgetControllerName === undefined || widgetControllerName === null || widgetControllerName === "" ? defaultWidgetControllerName : widgetControllerName;
                            break;
                        case "flexscrollcontainer":
                        case "flexcontainer":
                            defaultWidgetControllerName = "WidgetController";
                            widgetcontrollername = widgetControllerName === undefined || widgetControllerName === null || widgetControllerName === "" ? defaultWidgetControllerName : widgetControllerName;
                            break;
                        case "combobox":
                            defaultWidgetControllerName = "ComboBoxWidgetController";
                            widgetcontrollername = widgetControllerName === undefined || widgetControllerName === null || widgetControllerName === "" ? defaultWidgetControllerName : widgetControllerName;
                            break;
                        case "listbox":
                            defaultWidgetControllerName = "ListBoxWidgetController";
                            widgetcontrollername = widgetControllerName === undefined || widgetControllerName === null || widgetControllerName === "" ? defaultWidgetControllerName : widgetControllerName;
                            break;
                        case "segment":
                            defaultWidgetControllerName = "SegmentWidgetController";
                            widgetcontrollername = widgetControllerName === undefined || widgetControllerName === null || widgetControllerName === "" ? defaultWidgetControllerName : widgetControllerName;
                            break;
                        case "map":
                            defaultWidgetControllerName = "MapWidgetController";
                            widgetcontrollername = widgetControllerName === undefined || widgetControllerName === null || widgetControllerName === "" ? defaultWidgetControllerName : widgetControllerName;
                            break;
                        default:
                            widgetcontrollername = "WidgetController";
                            defaultWidgetControllerName = "WidgetController";
                            break
                    }
                    var controllerHandler = null;
                    if (widgetcontrollername.indexOf(".") === -1) {
                        widgetcontrollername = "kony.sdk.mvvm." + widgetcontrollername
                    }
                    controllerHandler = eval.call(null, widgetcontrollername);
                    if (controllerHandler === undefined || controllerHandler === null) {
                        kony.sdk.mvvm.log.error("Defined controller is not found so throwing exception");
                        throw appFactoryInstance.createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_UNDEFINED_WIDGET_CONTROLLER, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_UNDEFINED_WIDGET_CONTROLLER + " : " + widgetcontrollername)
                    }
                    kony.sdk.mvvm.log.info("create widget controller -- " + widgetId + " -- " + widgetType + " -- " + widgetcontrollername + " -- " + defaultWidgetControllerName);
                    if (controllerHandler === undefined || controllerHandler === null) continue;
                    switch (widgetType) {
                        case "label":
                        case "button":
                        case "textbox":
                        case "textarea":
                        case "textarea2":
                        case "textfield":
                        case "textbox2":
                        case "image":
                        case "link":
                        case "calendar":
                        case "flexcontainer":
                        case "flexscrollcontainer":
                        case "switch":
                        case "slider":
                        case "phone":
                        case "richtext":
                            var controller = new controllerHandler(scopeObj, konyWidget, widgets[widgetId]);
                            scopeObj.konyWidgetObjects[widgetId] = controller;
                            kony.sdk.mvvm.log.info("generic widget controller creation success ");
                            break;
                        case "listbox":
                        case "combobox":
                            var controller = new controllerHandler(scopeObj, konyWidget, widgets[widgetId]);
                            if (controller.$class.$super !== kony.sdk.mvvm.WidgetController && controller.$class !== kony.sdk.mvvm.WidgetController) {
                                throw appFactoryInstance.createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_NOT_INHERITING_WIDGET_CONTROLLER, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_NOT_INHERITING_WIDGET_CONTROLLER + " : " + widgetcontrollername)
                            }
                            scopeObj.konyWidgetObjects[widgetId] = controller;
                            kony.sdk.mvvm.log.info("listbox/combobox widget controller creation success ");
                            break;
                        case "segment":
                            var controller = new controllerHandler(scopeObj, konyWidget, widgets[widgetId]);
                            if (controller.$class.$super !== kony.sdk.mvvm.WidgetController && controller.$class !== kony.sdk.mvvm.WidgetController) {
                                throw appFactoryInstance.createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_NOT_INHERITING_WIDGET_CONTROLLER, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_NOT_INHERITING_WIDGET_CONTROLLER + " : " + widgetcontrollername)
                            }
                            scopeObj.konyWidgetObjects[widgetId] = controller;
                            kony.sdk.mvvm.log.info("segment widget controller creation success ");
                            break;
                        case "map":
                            var controller = new controllerHandler(scopeObj, konyWidget, widgets[widgetId]);
                            if (controller.$class.$super !== kony.sdk.mvvm.WidgetController && controller.$class !== kony.sdk.mvvm.WidgetController) {
                                throw appFactoryInstance.createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_NOT_INHERITING_WIDGET_CONTROLLER, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_NOT_INHERITING_WIDGET_CONTROLLER + " : " + widgetcontrollername)
                            }
                            scopeObj.konyWidgetObjects[widgetId] = controller;
                            kony.sdk.mvvm.log.info("map widget controller creation success ");
                            break;
                        default:
                            kony.sdk.mvvm.log.error("Not a widget, do nothing!!!");
                            break
                    }
                }
            }
        }
        createWidgetControllers()
    },
    destroy: function() {
        try {
            this.modelConfig = null;
            this.konyform.destroy();
            this.observerViewModels = null;
            this.konyWidgetObjects = null;
            this.decorator = null
        } catch (err) {
            kony.sdk.mvvm.log.error("Error in destroy view : " + err.toString());
            throw err
        }
    },
    updateAll: function(viewModel) {
        kony.sdk.mvvm.log.info("inside view update all...");
        try {
            for (var widgetId in this.konyWidgetObjects) {
                kony.sdk.mvvm.log.info("inside view update all for : " + widgetId);
                this.update(widgetId, viewModel[widgetId])
            }
            kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen()
        } catch (err) {
            kony.sdk.mvvm.log.error("error in update all view.." + err.toString());
            throw err
        }
    },
    setDecorator: function(decorator) {
        this.decorator = decorator;
        this.decorator.init(this)
    },
    getDecorator: function() {
        return this.decorator
    },
    showform: function() {
        try {
            if (this.getDecorator()) {
                this.getDecorator().preshow(this)
            }
            kony.sdk.mvvm.applicationStatus = kony.sdk.mvvm.constants.applicationStatus.COMPLETED;
            this.konyform.show();
            kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen()
        } catch (err) {
            kony.sdk.mvvm.log.error("error in showform view.." + err.toString());
            throw err
        }
    },
    getKonyForm: function() {
        return this.konyform
    },
    getKonyFormId: function() {
        return this.getKonyForm().id
    },
    getKonyWidget: function(widgetId) {
        return this.getKonyForm()[widgetId]
    },
    update: function(widgetId, data) {
        try {
            var viewWidget = this.konyWidgetObjects[widgetId];
            kony.sdk.mvvm.log.info("setting data ..to view widget : ", data);
            if (viewWidget && data) {
                if (data instanceof kony.sdk.mvvm.Data) {
                    viewWidget.setDataToWidget(data)
                } else {
                    kony.sdk.mvvm.log.error("Invalid data object, expected 'kony.sdk.mvvm.Data' object");
                    throw kony.sdk.mvvm.KonyApplicationContext.getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_INVALID_DATA_OBJECT, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_INVALID_DATA_OBJECT)
                }
            }
        } catch (err) {
            kony.sdk.mvvm.log.error("failed to set data to view widget : " + err);
            throw err
        }
    },
    registerObserver: function(observer) {
        this.observerViewModels.push(observer)
    },
    removeObserver: function(observer) {},
    getDataFromWidget: function(widgetId) {
        try {
            var widgetData = this.konyWidgetObjects[widgetId].getDataFromWidget();
            return widgetData
        } catch (err) {
            kony.sdk.mvvm.log.error("error in get data from widget : " + err);
            throw err
        }
    },
    getConfig: function() {
        return this.modelConfig
    },
    isWidgetValueChanged: function(widgetId, data) {
        try {
            return this.konyWidgetObjects[widgetId].isValueChanged(data)
        } catch (err) {
            kony.sdk.mvvm.log.error("error in is widget value change : " + err);
            throw err
        }
    },
    updateMasterData: function(masterData, widgetId) {
        try {
            this.konyWidgetObjects[widgetId].setMasterDataToWidget(masterData)
        } catch (err) {
            kony.sdk.mvvm.log.error("error in update widget master data : " + err);
            throw err
        }
    },
    getMasterDataFromWidget: function(widgetId) {
        try {
            return this.konyWidgetObjects[widgetId].getMasterDataFromWidget()
        } catch (err) {
            kony.sdk.mvvm.log.error("error in get widget master data : " + err);
            throw err
        }
    },
    performAction: function(widgetId, actionName, argsArray) {
        try {
            var response;
            var relativeView;
            if (widgetId === this.getKonyFormId()) {
                relativeView = this.getKonyForm()
            } else {
                relativeView = this.getKonyWidget(widgetId)
            }
            if (relativeView[actionName] && typeof relativeView[actionName] === "function") {
                response = relativeView[actionName].apply(relativeView, argsArray);
                return response
            } else {
                kony.sdk.mvvm.log.error("no action found in view for actionname : " + actionName);
                return
            }
        } catch (err) {
            kony.sdk.mvvm.log.error("error in get widget method execute : " + err);
            throw err
        }
    },
    setAttributeByProperty: function(widgetId, attributeName, attributeVal) {
        try {
            if (widgetId === this.getKonyFormId()) {
                this.getKonyForm()[attributeName] = attributeVal
            } else {
                this.getKonyWidget(widgetId)[attributeName] = attributeVal
            }
        } catch (err) {
            kony.sdk.mvvm.log.error("error in set widget attribute : " + err);
            throw err
        }
    },
    getAttributeByProperty: function(widgetId, attributeName) {
        try {
            var attributeVal;
            if (widgetId === this.getKonyFormId()) {
                attributeVal = this.getKonyForm()[attributeName]
            } else {
                attributeVal = this.getKonyWidget(widgetId)[attributeName]
            }
            return attributeVal
        } catch (err) {
            kony.sdk.mvvm.log.error("error in get widget attribute : " + err);
            throw err
        }
    },
    clear: function() {
        try {
            kony.sdk.mvvm.log.info("clearing view data..");
            for (var widgetId in this.konyWidgetObjects) {
                if (this.konyWidgetObjects[widgetId]) {
                    this.konyWidgetObjects[widgetId].clear()
                }
            }
        } catch (err) {
            kony.sdk.mvvm.log.error("error in clear view observers.." + err);
            throw err
        }
    }
});
kony.sdk.mvvm.WidgetController = Class({
    constructor: function(viewObj, konyWidget, widgetConfig) {
        this.konyWidget = konyWidget;
        this.widgetConfig = widgetConfig ? widgetConfig : {};
        this.widgetType = this.widgetConfig.hasOwnProperty("widgettype") ? this.widgetConfig["widgettype"].toLowerCase() : undefined;
        this.viewObj = viewObj;
        this.data = undefined
    },
    destroy: function() {
        try {
            kony.sdk.mvvm.log.info("Destroying widget controller..");
            this.konyWidget = null;
            this.widgetConfig = null;
            this.widgetType = null;
            this.data = null
        } catch (err) {
            kony.sdk.mvvm.log.error("error in destroy widget controller.." + err.toString());
            throw err
        }
    },
    setDataToWidget: function(data) {
        try {
            if (!data) {
                return
            }
            if (!(data instanceof kony.sdk.mvvm.Data)) {
                kony.sdk.mvvm.log.error("Invalid data Object, expected 'kony.sdk.mvvm.Data' object");
                throw kony.sdk.mvvm.KonyApplicationContext.getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_INVALID_DATA_OBJECT, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_INVALID_DATA_OBJECT);
                return
            }
            var konyWidget = this.getKonyWidget();
            switch (this.getWidgetType()) {
                case "label":
                case "textbox":
                case "textarea":
                case "textarea2":
                case "textfield":
                case "textbox2":
                case "button":
                case "link":
                case "phone":
                case "richtext":
                    if (data.getDisplayValue() !== undefined) {
                        konyWidget.text = data.getDisplayValue()
                    } else {
                        konyWidget.text = data.getData()
                    }
                    break;
                case "image":
                    konyWidget.src = data.getData();
                    break;
                case "calendar":
                    konyWidget.dateComponents = [data.getData().getDate(), data.getData().getMonth() + 1, data.getData().getFullYear(), data.getData().getHours(), data.getData().getMinutes(), data.getData().getSeconds()];
                    break;
                case "switch":
                    konyWidget.selectedIndex = data.getData();
                    break;
                case "slider":
                    konyWidget.selectedValue = data.getData();
                    break;
                default:
                    kony.sdk.mvvm.log.error("Not a data widget, do nothing!!!");
                    break
            }
            this.data = data
        } catch (err) {
            kony.sdk.mvvm.log.error("error in setDataToWidget of widget controller.." + err.toString());
            throw err
        }
    },
    getDataFromWidget: function() {
        try {
            var data = this.data;
            if (!this.data) {
                data = kony.sdk.mvvm.KonyApplicationContext.getFactorySharedInstance().createDataObject()
            }
            var konyWidget = this.getKonyWidget();
            switch (this.getWidgetType()) {
                case "label":
                case "textbox":
                case "textarea":
                case "textarea2":
                case "textfield":
                case "textbox2":
                case "button":
                case "link":
                case "phone":
                case "richtext":
                    if (data.getDisplayValue() !== undefined) {
                        data.setDisplayValue(konyWidget.text)
                    } else {
                        data.setData(konyWidget.text)
                    }
                    break;
                case "image":
                    data.setData(konyWidget.src);
                    break;
                case "calendar":
                    var dateArr = konyWidget.dateComponents;
                    data.setData(new Date(dateArr[2], dateArr[1] - 1, dateArr[0], dateArr[3], dateArr[4], dateArr[5], 0));
                    break;
                case "switch":
                    data.setData(konyWidget.selectedIndex);
                    break;
                case "slider":
                    data.setData(konyWidget.selectedValue);
                    break;
                default:
                    kony.sdk.mvvm.log.error("Not a data widget, do nothing!!!");
                    break
            }
            return data
        } catch (err) {
            kony.sdk.mvvm.log.error("error in getDataToWidget of widget controller.." + err.toString());
            throw err
        }
    },
    getKonyWidget: function() {
        return this.konyWidget
    },
    getWidgetType: function() {
        return this.widgetType
    },
    getWidgetConfig: function() {
        return this.widgetConfig
    },
    getWidgetId: function() {
        return this.konyWidget.id
    },
    isValueChanged: function(data) {
        try {
            if (data && !(data instanceof kony.sdk.mvvm.Data)) {
                data = kony.sdk.mvvm.KonyApplicationContext.getFactorySharedInstance().createDataObject(data)
            }
            var newValue = this.getDataFromWidget().getData();
            var widgetData = data === undefined ? data : data.getData();
            if (this.getWidgetType() === "calendar") {
                if (widgetData === undefined && newValue !== undefined) return true;
                if (widgetData.getTime() === newValue.getTime()) return false;
                else return true
            } else {
                if (widgetData === undefined && newValue !== undefined && newValue !== "") return true;
                else if (widgetData === undefined && newValue !== undefined && newValue === "") return false;
                if (widgetData === newValue) return false;
                else return true
            }
        } catch (err) {
            kony.sdk.mvvm.log.error("error in isValueChanged of widget controller.." + err.toString());
            throw err
        }
    },
    setMasterDataToWidget: function(masterData) {
        kony.sdk.mvvm.log.error("Not a data widget, do nothing!!!");
        this.clear()
    },
    getMasterDataFromWidget: function() {
        return null
    },
    clear: function() {
        try {
            this.data = undefined;
            var konyWidget = this.getKonyWidget();
            switch (this.getWidgetType()) {
                case "label":
                case "textbox":
                case "textfield":
                case "textarea":
                case "textarea2":
                case "textbox2":
                case "button":
                case "link":
                case "richtext":
                    konyWidget.text = null;
                    break;
                case "calendar":
                    var date = new Date;
                    konyWidget.dateComponents = [date.getDate(), date.getMonth() + 1, date.getFullYear(), date.getHours(), date.getMinutes(), date.getSeconds()];
                    break;
                case "image":
                    konyWidget.src = null;
                    break;
                case "switch":
                    konyWidget.selectedIndex = 0;
                    break;
                case "slider":
                    konyWidget.selectedValue = 0;
                    break;
                case "phone":
                    konyWidget.text = null;
                    break
            }
        } catch (err) {
            kony.sdk.mvvm.log.error("error in clear of widget controller.." + err.toString());
            throw err
        }
    }
});
kony.sdk.mvvm.SegmentWidgetController = Class(kony.sdk.mvvm.WidgetController, {
    constructor: function(viewObj, konyWidget, widgetConfig) {
        this.$class.$super.call(this, viewObj, konyWidget, widgetConfig)
    },
    destroy: function() {
        this.$class.$superp.destroy.call(this)
    },
    setDataToWidget: function(data) {
        try {
            if (!data) {
                return
            }
            kony.sdk.mvvm.log.info(this.getWidgetId() + " JSON : ", data.getData());
            if (data && data instanceof kony.sdk.mvvm.Data) {
                this.data = data;
                if (data.getData().length > 0) {
                    this.getKonyWidget().setData(data.getData())
                } else {
                    this.clear()
                }
            } else {
                kony.sdk.mvvm.log.error("Invalid data Object, expected 'kony.sdk.mvvm.Data' object");
                throw kony.sdk.mvvm.KonyApplicationContext.getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_INVALID_DATA_OBJECT, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_INVALID_DATA_OBJECT)
            }
        } catch (err) {
            kony.sdk.mvvm.log.error("Error while setting the data into " + this.getWidgetId() + ", error: " + err.message);
            throw err
        }
    },
    addDataToSegment: function(data, index) {
        try {
            if (data && data instanceof kony.sdk.mvvm.Data) {
                if (index !== undefined && index !== null) {
                    this.getKonyWidget().addDataAt(data.getData(), index)
                } else {
                    this.getKonyWidget().addAll(data.getData())
                }
            } else {
                kony.sdk.mvvm.log.error("Invalid data Object, expected 'kony.sdk.mvvm.Data' object");
                throw kony.sdk.mvvm.KonyApplicationContext.getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_INVALID_DATA_OBJECT, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_INVALID_DATA_OBJECT)
            }
        } catch (err) {
            kony.sdk.mvvm.log.error("Error while setting the data into " + this.getWidgetId() + ", error: " + err.message);
            throw err
        }
    },
    getDataFromWidget: function() {
        var data = this.data;
        if (!this.data) {
            data = kony.sdk.mvvm.KonyApplicationContext.getFactorySharedInstance().createDataObject()
        }
        data.setData(this.konyWidget.data);
        return data
    },
    getKonyWidget: function() {
        return this.$class.$superp.getKonyWidget.call(this)
    },
    getWidgetType: function() {
        return this.$class.$superp.getWidgetType.call(this)
    },
    getWidgetConfig: function() {
        return this.$class.$superp.getWidgetConfig.call(this)
    },
    getWidgetId: function() {
        return this.$class.$superp.getWidgetId.call(this)
    },
    isValueChanged: function(data) {
        return false
    },
    setMasterDataToWidget: function(masterData) {
        kony.sdk.mvvm.log.error("Not a data widget, do nothing!!!");
        this.clear()
    },
    getMasterDataFromWidget: function() {
        return null
    },
    clear: function() {
        try {
            this.data = undefined;
            this.getKonyWidget().removeAll();
            if (kony.sdk.mvvm.Utils.isIphone() || kony.sdk.mvvm.Utils.isIpad()) {
                this.getKonyWidget().setData([])
            } else if (kony.sdk.mvvm.Utils.isAndroid() || kony.sdk.mvvm.Utils.isAndroidTablet()) {
                this.getKonyWidget().setData([{}])
            } else {
                this.getKonyWidget().setData([{}])
            }
            this.getKonyWidget().widgetDataMap = this.getWidgetConfig().getWidgetDataMap()
        } catch (err) {
            kony.sdk.mvvm.log.error("error in clear of segmentWidget controller.." + err.toString());
            throw err
        }
    }
});
kony.sdk.mvvm.ListBoxWidgetController = Class(kony.sdk.mvvm.WidgetController, {
    constructor: function(viewObj, konyWidget, widgetConfig) {
        this.$class.$super.call(this, viewObj, konyWidget, widgetConfig)
    },
    destroy: function() {
        this.$class.$superp.destroy.call(this)
    },
    setDataToWidget: function(data) {
        try {
            if (!data) {
                return
            }
            if (data instanceof kony.sdk.mvvm.Data) {
                this.getKonyWidget().selectedKey = data.getData() + "";
                kony.sdk.mvvm.log.info("selected key for widget : " + this.getWidgetId() + " is " + this.getKonyWidget().selectedKey);
                this.data = data
            } else {
                kony.sdk.mvvm.log.error("Invalid data Object, expected 'kony.sdk.mvvm.Data' object");
                throw kony.sdk.mvvm.KonyApplicationContext.getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_INVALID_DATA_OBJECT, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_INVALID_DATA_OBJECT)
            }
        } catch (err) {
            kony.sdk.mvvm.log.error("error in setDataToWidget for listbox " + err.toString());
            throw err
        }
    },
    getDataFromWidget: function() {
        try {
            var data = this.data;
            if (!this.data) {
                data = kony.sdk.mvvm.KonyApplicationContext.getFactorySharedInstance().createDataObject()
            }
            data.setData(this.getKonyWidget().selectedKey);
            return data
        } catch (err) {
            kony.sdk.mvvm.log.error("error in getData from widget for listbox " + err.toString());
            throw err
        }
    },
    getKonyWidget: function() {
        return this.$class.$superp.getKonyWidget.call(this)
    },
    getWidgetType: function() {
        return this.$class.$superp.getWidgetType.call(this)
    },
    getWidgetConfig: function() {
        return this.$class.$superp.getWidgetConfig.call(this)
    },
    getWidgetId: function() {
        return this.$class.$superp.getWidgetId.call(this)
    },
    isValueChanged: function(data) {
        try {
            if (data && !(data instanceof kony.sdk.mvvm.Data)) {
                data = kony.sdk.mvvm.KonyApplicationContext.getFactorySharedInstance().createDataObject(data)
            }
            var response;
            var tempData = this.getDataFromWidget().getData();
            var widgetData = data === undefined ? data : data.getData();
            if (tempData === widgetData) {
                response = false
            } else {
                response = true
            }
            return response
        } catch (err) {
            kony.sdk.mvvm.log.error("error in isvalueChanged for listbox " + err.toString());
            throw err
        }
    },
    setMasterDataToWidget: function(masterData) {
        try {
            this.getKonyWidget().masterData = masterData;
            if (masterData && masterData[0] && masterData[0][0] === -1) {
                this.getKonyWidget().selectedKey = masterData[0][0]
            } else {
                this.getKonyWidget().selectedKey = null
            }
        } catch (err) {
            kony.sdk.mvvm.log.error("Error in setting master data to widget for listbox " + err.toString());
            throw err
        }
    },
    getMasterDataFromWidget: function() {
        return this.getKonyWidget().masterData
    },
    clear: function() {
        this.data = undefined;
        this.getKonyWidget().selectedKey = null
    }
});
kony.sdk.mvvm.ComboBoxWidgetController = Class(kony.sdk.mvvm.WidgetController, {
    constructor: function(viewObj, konyWidget, widgetConfig) {
        this.$class.$super.call(this, viewObj, konyWidget, widgetConfig)
    },
    destroy: function() {
        this.$class.$superp.destroy.call(this)
    },
    setDataToWidget: function(data) {
        try {
            if (!data) {
                return
            }
            if (data instanceof kony.sdk.mvvm.Data) {
                this.getKonyWidget().selectedKey = data.getData() + "";
                kony.sdk.mvvm.log.info("selected key for widget : " + this.getWidgetId() + " is " + this.getKonyWidget().selectedKey);
                this.data = data
            } else {
                kony.sdk.mvvm.log.error("Invalid data Object, expected 'kony.sdk.mvvm.Data' object");
                throw kony.sdk.mvvm.KonyApplicationContext.getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_INVALID_DATA_OBJECT, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_INVALID_DATA_OBJECT)
            }
        } catch (err) {
            kony.sdk.mvvm.log.error("Error in setting data to widget for combobox " + err.toString());
            throw err
        }
    },
    getDataFromWidget: function() {
        try {
            var data = this.data;
            if (!this.data) {
                data = kony.sdk.mvvm.KonyApplicationContext.getFactorySharedInstance().createDataObject()
            }
            data.setData(this.getKonyWidget().selectedKey);
            return data
        } catch (err) {
            kony.sdk.mvvm.log.error("Error in getting data to widget for combobox " + err.toString());
            throw err
        }
    },
    getKonyWidget: function() {
        return this.$class.$superp.getKonyWidget.call(this)
    },
    getWidgetType: function() {
        return this.$class.$superp.getWidgetType.call(this)
    },
    getWidgetConfig: function() {
        return this.$class.$superp.getWidgetConfig.call(this)
    },
    getWidgetId: function() {
        return this.$class.$superp.getWidgetId.call(this)
    },
    isValueChanged: function(data) {
        try {
            if (data && !(data instanceof kony.sdk.mvvm.Data)) {
                data = kony.sdk.mvvm.KonyApplicationContext.getFactorySharedInstance().createDataObject()
            }
            var response;
            var tempData = this.getDataFromWidget().getData();
            var widgetData = data === undefined ? data : data.getData();
            if (tempData === widgetData) {
                response = false
            } else {
                response = true
            }
            return response
        } catch (err) {
            kony.sdk.mvvm.log.error("Error in isValueChanged for combobox " + err.toString());
            throw err
        }
    },
    setMasterDataToWidget: function(masterData) {
        try {
            this.getKonyWidget().masterData = masterData;
            if (masterData && masterData[0] && masterData[0][0] === -1) {
                this.getKonyWidget().selectedKey = masterData[0][0]
            } else {
                this.getKonyWidget().selectedKey = null
            }
        } catch (err) {
            kony.sdk.mvvm.log.error("Error in setting master data to widget for combobox " + err.toString());
            throw err
        }
    },
    getMasterDataFromWidget: function() {
        return this.getKonyWidget().masterData
    },
    clear: function() {
        this.data = undefined;
        this.getKonyWidget().selectedKey = null
    }
});
kony.sdk.mvvm.MapWidgetController = Class(kony.sdk.mvvm.WidgetController, {
    constructor: function(viewObj, konyWidget, widgetConfig) {
        this.$class.$super.call(this, viewObj, konyWidget, widgetConfig)
    },
    destroy: function() {
        this.$class.$superp.destroy.call(this)
    },
    setDataToWidget: function(data) {
        try {
            if (!data) {
                return
            }
            this.getKonyWidget().locationData = data.getData();
            this.data = data
        } catch (err) {
            kony.sdk.mvvm.log.error("Error while setting the data into " + this.getWidgetId() + ", error: " + err.message)
        }
    },
    getDataFromWidget: function() {
        try {
            var data = this.data;
            if (!this.data) {
                data = kony.sdk.mvvm.KonyApplicationContext.getFactorySharedInstance().createDataObject()
            }
            data.setData(this.getKonyWidget().locationData);
            return data
        } catch (err) {
            kony.sdk.mvvm.log.error("Error in getting data to widget for map " + err.toString());
            throw err
        }
    },
    getKonyWidget: function() {
        return this.$class.$superp.getKonyWidget.call(this)
    },
    getWidgetType: function() {
        return this.$class.$superp.getWidgetType.call(this)
    },
    getWidgetConfig: function() {
        return this.$class.$superp.getWidgetConfig.call(this)
    },
    getWidgetId: function() {
        return this.$class.$superp.getWidgetId.call(this)
    },
    isValueChanged: function(data) {
        try {
            if (data && !(data instanceof kony.sdk.mvvm.Data)) {
                data = kony.sdk.mvvm.KonyApplicationContext.getFactorySharedInstance().createDataObject()
            }
            var response;
            var tempData = this.getDataFromWidget().getData();
            var widgetData = data === undefined ? data : data.getData();
            if (tempData === widgetData) {
                response = false
            } else {
                response = true
            }
            return response
        } catch (err) {
            kony.sdk.mvvm.log.error("Error in isValueChanged for map " + err.toString());
            throw err
        }
    },
    setMasterDataToWidget: function(masterData) {
        kony.sdk.mvvm.log.error("Not a data widget, do nothing!!!");
        this.clear()
    },
    getMasterDataFromWidget: function() {
        return null
    },
    clear: function() {
        this.getKonyWidget().clear()
    }
});
kony.sdk.mvvm.v2.util = Class({
    $statics: {
        getDataAsPerType: function(val, dataType, widgetType) {
            try {
                var convertedVal = val;
                if (!dataType || widgetType.toLowerCase() === "segment") {
                    return convertedVal
                }
                dataType = dataType.toLowerCase();
                switch (dataType) {
                    case "varchar":
                    case "picklist":
                    case "picklistmultiselect":
                    case "extendedfield":
                        convertedVal = String(val);
                        break;
                    case "int2":
                    case "int8":
                    case "integer":
                    case "serial":
                        if (kony.sdk.mvvm.Utils.isValidNumberType(val)) {
                            convertedVal = parseInt(val, 10);
                            if (isNaN(convertedVal)) convertedVal = null
                        }
                        break;
                    case "boolean":
                        convertedVal = String(typeof val === "string" ? val === "true" ? true : false : new Boolean(val));
                        break;
                    case "date":
                    case "timestamp":
                        if (widgetType === "calendar") {
                            convertedVal = new Date(val)
                        } else {
                            convertedVal = String(val)
                        }
                        break;
                    default:
                        kony.sdk.mvvm.log.error("dataType not found " + dataType);
                        break
                }
                return convertedVal
            } catch (err) {
                kony.sdk.mvvm.log.error("Error in getDataAsPerType " + err.toString())
            }
        },
        showValidationErrors: function(errors) {
            var len = errors.length;
            if (len > 0) {
                var eMessage = errors[0];
                kony.sdk.mvvm.v2.util.showInfoAlert({
                    text: eMessage,
                    btnConfirmText: "Ok",
                    header: "Info"
                })
            }
        },
        showInfoAlert: function(config) {
            var hdrText = config.header || "Info";
            var btnText = config.btnConfirmText || "Ok";
            var callback = function() {};
            var callbackFunc = config.callback || callback;
            kony.ui.Alert(config.text, callbackFunc, "info", btnText, null, hdrText, null)
        }
    }
});
kony.sdk.mvvm.ConfigClass = Class({
    constructor: function(modelConfig) {
        var formid = undefined;
        var controller = undefined;
        var entity = undefined;
        var query = undefined;
        var querytype = undefined;
        var queryParams = undefined;
        var events = {};
        var widgets = {};
        var flexform = undefined;
        var searchConfig = undefined;
        var customInfo = undefined;
        var widgetController = "controller";
        var objectServiceName = undefined;
        var objectServiceOptions = undefined;
        var requestOptions = undefined;
        var additionalFields = undefined;
        var constrained = undefined;
        var appFactoryInstance = kony.sdk.mvvm.KonyApplicationContext.getFactorySharedInstance();
        if (typeof modelConfig === "undefined" || modelConfig === "") {
            modelConfig = {};
            return
        }
        try {
            var modelConfig = modelConfig;
            formid = modelConfig.formid;
            this.getFormId = function() {
                return formid
            };
            this.getController = function() {
                return controller
            };
            this.getEntity = function() {
                return entity
            };
            this.getQuery = function() {
                return query
            };
            this.getQueryType = function() {
                return querytype
            };
            this.getQueryParams = function() {
                return queryParams
            };
            this.getEvents = function() {
                return events
            };
            this.getEvent = function(eventname) {
                if (typeof eventname === "undefined") {
                    throw appFactoryInstance.createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_EVENTNAME_NOT_DEFINED, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_EVENTNAME_NOT_DEFINED + " - " + eventname)
                }
                return events[eventname]
            };
            this.getWidgets = function() {
                return widgets
            };
            this.getWidget = function(widgetid) {
                if (typeof widgetid === "undefined") {
                    throw appFactoryInstance.createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_WIDGETID_NOT_DEFINED, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_WIDGETID_NOT_DEFINED + " - " + widgetid)
                }
                return widgets[widgetid]
            };
            this.getSearchInfo = function(widgetid) {
                if (typeof widgetid == "undefined") {
                    return searchConfig
                }
                return searchConfig && searchConfig[widgetid]
            };
            this.getCustomInfoKeys = function() {
                var keys = [];
                for (var key in customInfo) {
                    keys.push(key)
                }
                return keys
            };
            this.getCustomInfo = function(key) {
                if (typeof key == "undefined") {
                    return customInfo
                }
                return customInfo && customInfo[key]
            };
            this.getObjectServiceOptions = function() {
                return objectServiceOptions
            };
            this.getObjectServiceName = function() {
                return objectServiceName
            };
            this.getRequestOptions = function() {
                return requestOptions
            };
            this.getAdditionalFields = function() {
                return additionalFields
            };
            this.isConstrained = function() {
                if (typeof this.constrained == "undefined") {
                    return false
                }
                return true
            };
            controller = modelConfig[this.getFormId()]["controller"];
            entity = modelConfig[this.getFormId()]["entity"];
            query = modelConfig[this.getFormId()]["query"];
            querytype = modelConfig[this.getFormId()]["querytype"];
            queryParams = modelConfig[this.getFormId()]["queryParams"];
            objectServiceOptions = modelConfig[this.getFormId()]["objectServiceOptions"];
            objectServiceName = modelConfig[this.getFormId()]["objectServiceName"];
            requestOptions = modelConfig[this.getFormId()]["requestOptions"];
            additionalFields = modelConfig[this.getFormId()]["additionalFields"];
            constrained = modelConfig[this.getFormId()]["constrained"];
            for (var eventname in modelConfig[this.getFormId()]["events"]) {
                var evnt = appFactoryInstance.createEventObject(eventname);
                for (var tag in modelConfig[this.getFormId()]["events"][eventname]) {
                    if (tag == "locked") {
                        continue
                    }
                    var code = modelConfig[this.getFormId()]["events"][eventname][tag]["code"];
                    evnt.setCode(code, tag)
                }
                events[eventname] = evnt
            }
            for (var widgetid in modelConfig) {
                if (!(widgetid == "formid" || widgetid == this.getFormId())) {
                    var widgettype = modelConfig[widgetid]["fieldprops"] && modelConfig[widgetid]["fieldprops"]["widgettype"];
                    var widgetconfig;
                    if (widgettype == "Segment" || widgettype == "segment") {
                        widgetconfig = appFactoryInstance.createSegmentWidgetConfigObject(widgetid, modelConfig[widgetid])
                    } else {
                        widgetconfig = appFactoryInstance.createWidgetConfigObject(widgetid, modelConfig[widgetid])
                    }
                    widgets[widgetid] = widgetconfig
                }
            }
            var searchConfigVal = modelConfig[this.getFormId()]["searchConfig"];
            searchConfig = {};
            for (var widgetid in searchConfigVal) {
                var searchConfigObj = appFactoryInstance.createSearchInfoObject(widgetid, searchConfigVal[widgetid]);
                searchConfig[widgetid] = searchConfigObj
            }
            customInfo = modelConfig[this.getFormId()]["customInfo"]
        } catch (err) {
            kony.sdk.mvvm.log.error("error in config constructor :: " + err);
            throw err
        }
    },
    getDataWidgetsOfForm: function() {
        try {
            var widgets = this.getWidgets();
            var dataWidgetsList = [];
            for (var widget in widgets) {
                var widgetType = widgets[widget].getWidgetType();
                if (widgetType == "Segment") dataWidgetsList.push(widgets[widget])
            }
            return dataWidgetsList
        } catch (err) {
            kony.sdk.mvvm.log.error("Error getting datawidgets of form - " + err.toString());
            throw kony.sdk.mvvm.KonyApplicationContext.getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_GET_DATA_WIDGETS_OF_FORM, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_GET_DATA_WIDGETS_OF_FORM, err)
        }
    },
    containsDataWidget: function() {
        if (this.getDataWidgetsOfForm().length) return true;
        return false
    },
    getWidgetProperty: function(widgetid, propertyName) {
        if (typeof widgetid === "undefined") {
            throw kony.sdk.mvvm.KonyApplicationContext.getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_WIDGETID_NOT_DEFINED, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_WIDGETID_NOT_DEFINED)
        }
        if (this.getWidgets()[widgetid].hasOwnProperty(propertyName)) {
            return this.getWidgets()[widgetid][propertyName]
        } else {
            return null
        }
    },
    getWidgetController: function(widgetid) {
        if (typeof widgetid === "undefined") {
            throw kony.sdk.mvvm.KonyApplicationContext.getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_WIDGETID_NOT_DEFINED, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_WIDGETID_NOT_DEFINED)
        }
        if (this.getWidgets()[widgetid]) {
            return this.getWidgets()[widgetid].getWidgetController()
        } else {
            return null
        }
    },
    getWidgetType: function(widgetid) {
        if (typeof widgetid === "undefined") {
            throw kony.sdk.mvvm.KonyApplicationContext.getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_WIDGETID_NOT_DEFINED, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_WIDGETID_NOT_DEFINED)
        }
        if (this.getWidgets()[widgetid]) {
            return this.getWidgets()[widgetid].getWidgetType()
        } else {
            return null
        }
    },
    getWidgetEntity: function(widgetid) {
        if (typeof widgetid === "undefined") {
            throw kony.sdk.mvvm.KonyApplicationContext.getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_WIDGETID_NOT_DEFINED, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_WIDGETID_NOT_DEFINED)
        }
        if (this.getWidgets()[widgetid]) {
            return this.getWidgets()[widgetid].getWidgetEntity()
        } else {
            return null
        }
    },
    getWidgetField: function(widgetid) {
        if (typeof widgetid === "undefined") {
            throw kony.sdk.mvvm.KonyApplicationContext.getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_WIDGETID_NOT_DEFINED, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_WIDGETID_NOT_DEFINED)
        }
        if (this.getWidgets()[widgetid]) {
            return this.getWidgets()[widgetid].getField()
        } else {
            return null
        }
    },
    getWidgetNames: function() {
        var widgetnames = [];
        var widgets = this.getWidgets();
        for (var widgetid in widgets) {
            widgetnames.push(widgetid)
        }
        return widgetnames
    },
    getEventNames: function() {
        var eventnames = [];
        var events = this.getEvents();
        for (eventname in events) {
            eventnames.push(eventname)
        }
        return eventnames
    },
    getWidgetDataMap: function(widgetid) {
        if (typeof widgetid == "undefined") {
            return null
        } else {
            return this.getWidgets()[widgetid].getWidgetDataMap()
        }
    },
    getMasterDataEnabledWidgets: function() {
        var widgets = this.getWidgets();
        var widgetArray = [];
        var widgetType;
        for (var widget in widgets) {
            widgetType = widgets[widget].getWidgetType();
            if (widgetType && (widgetType.toLowerCase() === "combobox" || widgetType.toLowerCase() === "listbox")) {
                widgetArray.push(widget)
            }
        }
        return widgetArray
    },
    getQueryEnabledWidgetsMap: function() {
        try {
            var widgets = this.getWidgets();
            var queryWidgetsMapping = {};
            var formEntityName = this.getEntity();
            var widgetType, entityName, parentName, fieldName;
            for (var widget in widgets) {
                widgetType = widgets[widget].getWidgetType().toLowerCase();
                switch (widgetType) {
                    case "label":
                    case "button":
                    case "textbox":
                    case "textarea":
                    case "textarea2":
                    case "textfield":
                    case "textbox2":
                    case "link":
                    case "image":
                    case "calendar":
                    case "listbox":
                    case "combobox":
                    case "switch":
                    case "slider":
                    case "phone":
                    case "richtext":
                        if (widgets[widget].isQueryDefined()) {
                            queryWidgetsMapping[widget] = {};
                            queryWidgetsMapping[widget]["widgets"] = {};
                            queryWidgetsMapping[widget]["config"] = widgets[widget];
                            queryWidgetsMapping[widget]["widgets"][widget] = widgets[widget];
                            break
                        }
                        entityName = widgets[widget].getWidgetEntity();
                        fieldName = widgets[widget].getField();
                        if (widgets[widget].isParentDefined()) {
                            parentName = widgets[widget].getParent();
                            if (widgets[widget].isComputedField() || fieldName && entityName === widgets[parentName].getWidgetEntity()) {
                                queryWidgetsMapping[parentName] = queryWidgetsMapping[parentName] || {};
                                queryWidgetsMapping[parentName]["widgets"] = queryWidgetsMapping[parentName]["widgets"] || {};
                                queryWidgetsMapping[parentName]["widgets"][widget] = widgets[widget];
                                queryWidgetsMapping[parentName]["config"] = queryWidgetsMapping[parentName]["config"] || widgets[parentName]
                            }
                        } else {
                            parentName = "form";
                            if (widgets[widget].isComputedField() || fieldName && entityName === formEntityName) {
                                queryWidgetsMapping[parentName] = queryWidgetsMapping[parentName] || {};
                                queryWidgetsMapping[parentName]["widgets"] = queryWidgetsMapping[parentName]["widgets"] || {};
                                queryWidgetsMapping[parentName]["widgets"][widget] = widgets[widget];
                                queryWidgetsMapping[parentName]["config"] = widgets[widget]
                            }
                        }
                        break;
                    case "flexcontainer":
                    case "flexscrollcontainer":
                        if (widgets[widget].isQueryDefined()) {
                            queryWidgetsMapping[widget] = queryWidgetsMapping[widget] || {};
                            queryWidgetsMapping[widget]["widgets"] = queryWidgetsMapping[widget]["widgets"] || {};
                            queryWidgetsMapping[widget]["config"] = widgets[widget]
                        }
                        break;
                    case "map":
                    case "segment":
                        queryWidgetsMapping[widget] = {};
                        queryWidgetsMapping[widget]["config"] = widgets[widget];
                        queryWidgetsMapping[widget]["widgets"] = {};
                        queryWidgetsMapping[widget]["widgets"][widget] = widgets[widget];
                        break;
                    default:
                        kony.sdk.mvvm.log.error("Not a data widget, do nothing!!!");
                        break
                }
            }
            return queryWidgetsMapping
        } catch (err) {
            kony.sdk.mvvm.log.error("Error getting query enabled widgets map - " + err.toString());
            throw kony.sdk.mvvm.KonyApplicationContext.getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_GETTING_QUERY_WIDGETS_MAPPING, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_GETTING_QUERY_WIDGETS_MAPPING, err)
        }
    },
    getFormEntityDefinitionMap: function() {
        var widgets = this.getWidgets();
        var formName = this.getFormId();
        var formEntityName = this.getEntity();
        var widgetType, entityName, parentName, fieldName;
        var formEntityDefinition = {};
        for (var widget in widgets) {
            widgetType = widgets[widget].getWidgetType().toLowerCase();
            switch (widgetType) {
                case "label":
                case "button":
                case "textbox":
                case "textarea":
                case "textarea2":
                case "textfield":
                case "textbox2":
                case "link":
                case "image":
                case "calendar":
                case "listbox":
                case "combobox":
                case "switch":
                case "slider":
                case "phone":
                case "richtext":
                    entityName = widgets[widget].getWidgetEntity();
                    fieldName = widgets[widget].getField();
                    if (widgets[widget].isParentDefined()) {
                        parentName = widgets[widget].getParent();
                        if (widgets[widget].isComputedField() || fieldName && entityName === widgets[parentName].getWidgetEntity()) {
                            formEntityDefinition[parentName] = formEntityDefinition[parentName] || {};
                            formEntityDefinition[parentName]["widgets"] = formEntityDefinition[parentName]["widgets"] || {};
                            formEntityDefinition[parentName]["widgets"][widget] = widgets[widget];
                            formEntityDefinition[parentName]["entityName"] = entityName;
                            formEntityDefinition[parentName]["child"] = {}
                        }
                    } else {
                        parentName = "form";
                        if (widgets[widget].isComputedField() || fieldName && entityName === formEntityName) {
                            formEntityDefinition[parentName] = formEntityDefinition[parentName] || {};
                            formEntityDefinition[parentName]["widgets"] = formEntityDefinition[parentName]["widgets"] || {};
                            formEntityDefinition[parentName]["widgets"][widget] = widgets[widget];
                            formEntityDefinition[parentName]["entityName"] = formEntityName;
                            formEntityDefinition[parentName]["child"] = {}
                        }
                    }
                    break;
                case "flexcontainer":
                case "flexscrollcontainer":
                case "map":
                case "segment":
                default:
                    kony.sdk.mvvm.log.error("Not a input widget, do nothing!!!");
                    break
            }
        }

        function prepareFormEntityDefTree(entityDef, containerId) {
            var parent;
            for (var container in entityDef) {
                if (containerId !== "form" && container !== containerId && widgets[containerId].isParentDefined()) {
                    parent = widgets[containerId].getParent();
                    parent = parent === formName ? "form" : parent;
                    if (parent === container) {
                        entityDef[container]["child"][containerId] = formEntityDefinition[containerId];
                        delete formEntityDefinition[containerId];
                        break
                    } else {
                        prepareFormEntityDefTree(entityDef[container]["child"], containerId)
                    }
                }
            }
            return
        }
        var containerWidgets = Object.keys(formEntityDefinition);
        for (var i in containerWidgets) {
            prepareFormEntityDefTree(formEntityDefinition, containerWidgets[i])
        }
        return formEntityDefinition
    },
    getFormEntitiesName: function() {
        var formEntities = {};
        var widgets = this.getWidgets();
        var entityName;
        for (var widget in widgets) {
            entityName = widgets[widget].getWidgetEntity();
            if (entityName) {
                formEntities[entityName] = {}
            }
        }
        return Object.keys(formEntities)
    },
    getColumnsForEntity: function(entityName) {
        var columns = [];
        var widgets = this.getWidgets();
        var widgetType = widgets[widget].getWidgetType().toLowerCase();
        for (var widget in widgets) {
            var field;
            if (widgets[widget].getWidgetEntity() === entityName) {
                if (widgetType == "segment") {
                    for (var subWidget in widgets[widget].getField()) {
                        if (widgets[widget].getField()) {
                            field = widgets[widget].getSubField(subWidget).field;
                            if (field) {
                                for (var indx in field) columns.push(field[indx])
                            }
                        }
                    }
                } else {
                    if (widgets[widget].getField()) {
                        field = widgets[widget].getField();
                        for (var indx in field) columns.push(field[indx])
                    }
                }
            }
        }
        return columns
    },
    getWidgetHierarchyMap: function() {
        try {
            var widgets = this.getWidgets();
            var widgetHierarchyMap = {};
            var formEntityName = this.getEntity();
            var formName = this.getFormId();
            var widgetType, entityName, parentName, fieldName;
            for (var widget in widgets) {
                widgetType = widgets[widget].getWidgetType().toLowerCase();
                entityName = widgets[widget].getWidgetEntity();
                switch (widgetType) {
                    case "label":
                    case "button":
                    case "textbox":
                    case "textarea":
                    case "textarea2":
                    case "textfield":
                    case "textbox2":
                    case "link":
                    case "image":
                    case "calendar":
                    case "listbox":
                    case "combobox":
                    case "switch":
                    case "slider":
                    case "phone":
                    case "richtext":
                        if (widgets[widget].isQueryDefined()) {
                            widgetHierarchyMap[widget] = {};
                            widgetHierarchyMap[widget]["widgets"] = {};
                            widgetHierarchyMap[widget]["config"] = widgets[widget];
                            widgetHierarchyMap[widget]["widgets"][widget] = widgets[widget];
                            widgetHierarchyMap[widget]["entityName"] = entityName;
                            widgetHierarchyMap[widget]["child"] = {};
                            break
                        }
                        fieldName = widgets[widget].getField();
                        if (widgets[widget].isParentDefined()) {
                            parentName = widgets[widget].getParent();
                            if (parentName == this.getFormId()) parentName == "form";
                            if (widgets[widget].isComputedField() || fieldName && entityName === widgets[parentName].getWidgetEntity()) {
                                widgetHierarchyMap[parentName] = widgetHierarchyMap[parentName] || {};
                                widgetHierarchyMap[parentName]["widgets"] = widgetHierarchyMap[parentName]["widgets"] || {};
                                widgetHierarchyMap[parentName]["widgets"][widget] = widgets[widget];
                                widgetHierarchyMap[parentName]["config"] = widgetHierarchyMap[parentName]["config"] || widgets[parentName];
                                widgetHierarchyMap[parentName]["entityName"] = entityName;
                                widgetHierarchyMap[parentName]["child"] = {}
                            }
                        } else {
                            parentName = "form";
                            if (widgets[widget].isComputedField() || fieldName && entityName === formEntityName) {
                                widgetHierarchyMap[parentName] = widgetHierarchyMap[parentName] || {};
                                widgetHierarchyMap[parentName]["widgets"] = widgetHierarchyMap[parentName]["widgets"] || {};
                                widgetHierarchyMap[parentName]["widgets"][widget] = widgets[widget];
                                widgetHierarchyMap[parentName]["config"] = this;
                                widgetHierarchyMap[parentName]["entityName"] = formEntityName;
                                widgetHierarchyMap[parentName]["child"] = {}
                            }
                        }
                        break;
                    case "flexcontainer":
                    case "flexscrollcontainer":
                        if (widgets[widget].isQueryDefined() || widgets[widget].getAdditionalFields()) {
                            widgetHierarchyMap[widget] = widgetHierarchyMap[widget] || {};
                            widgetHierarchyMap[widget]["widgets"] = widgetHierarchyMap[widget]["widgets"] || {};
                            widgetHierarchyMap[widget]["config"] = widgets[widget];
                            widgetHierarchyMap[widget]["entityName"] = entityName;
                            widgetHierarchyMap[widget]["child"] = {}
                        }
                        break;
                    case "map":
                    case "segment":
                        widgetHierarchyMap[widget] = {};
                        widgetHierarchyMap[widget]["config"] = widgets[widget];
                        widgetHierarchyMap[widget]["widgets"] = {};
                        widgetHierarchyMap[widget]["widgets"][widget] = widgets[widget];
                        widgetHierarchyMap[widget]["entityName"] = entityName;
                        break;
                    default:
                        kony.sdk.mvvm.log.error("Not a data widget, do nothing!!!");
                        break
                }
            }

            function prepareFormEntityDefTree(entityDef, containerId) {
                var parent;
                for (var container in entityDef) {
                    if (containerId !== "form" && container !== containerId && widgets[containerId].isParentDefined()) {
                        parent = widgets[containerId].getParent();
                        parent = parent === formName ? "form" : parent;
                        if (parent === container) {
                            entityDef[container]["child"][containerId] = widgetHierarchyMap[containerId];
                            delete widgetHierarchyMap[containerId];
                            break
                        } else {
                            prepareFormEntityDefTree(entityDef[container]["child"], containerId)
                        }
                    }
                }
                return
            }
            if (this.getAdditionalFields()) {
                widgetHierarchyMap["form"] = widgetHierarchyMap["form"] || {};
                widgetHierarchyMap["form"]["widgets"] = widgetHierarchyMap["form"]["widgets"] || {};
                widgetHierarchyMap["form"]["config"] = this;
                widgetHierarchyMap["form"]["entityName"] = formEntityName;
                widgetHierarchyMap["form"]["child"] = {}
            }
            var containerWidgets = Object.keys(widgetHierarchyMap);
            for (var i in containerWidgets) {
                prepareFormEntityDefTree(widgetHierarchyMap, containerWidgets[i])
            }
            return widgetHierarchyMap
        } catch (err) {
            kony.sdk.mvvm.log.error("Error getting query enabled widgets map - " + err.toString());
            throw kony.sdk.mvvm.KonyApplicationContext.getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_GETTING_QUERY_WIDGETS_MAPPING, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_GETTING_QUERY_WIDGETS_MAPPING, err)
        }
    }
});
kony.sdk.mvvm.widgetConfig = Class({
    constructor: function(widgetid, widgetconfig) {
        if (typeof widgetid === "undefined") {
            throw kony.sdk.mvvm.KonyApplicationContext.getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_WIDGETID_NOT_DEFINED, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_WIDGETID_NOT_DEFINED)
        }
        this.widgetid = widgetid;
        this.widgetcontroller = undefined;
        this.widgettype = undefined;
        this.entity = undefined;
        this.field = undefined;
        this.events = {};
        this.fieldQuery = undefined;
        this.constrained = undefined;
        this.parent = undefined;
        this.query = undefined;
        this.computed = false;
        this.aggrfunction = undefined;
        this.additionalFields = undefined;
        this.requestOptions = undefined;
        try {
            if (typeof widgetconfig == "undefined" || widgetconfig == "") {
                widgetconfig = {};
                return
            }
            var fieldProps = widgetconfig["fieldprops"];
            this.widgettype = fieldProps && fieldProps["widgettype"];
            this.entity = fieldProps && fieldProps["entity"];
            this.field = fieldProps && fieldProps["field"];
            if (typeof this.field == "string") this.field = [this.field];
            this.widgetcontroller = fieldProps && fieldProps["controller"] || fieldProps && "WidgetController";
            this.fieldQuery = fieldProps && fieldProps["fieldQuery"];
            this.constrained = fieldProps && fieldProps["constrained"];
            this.parent = fieldProps && fieldProps["parent"];
            this.query = fieldProps && fieldProps["query"];
            this.querytype = fieldProps && fieldProps["querytype"];
            this.queryParams = fieldProps && fieldProps["queryParams"];
            var events = widgetconfig["events"];
            this.tabepaneId = widgetconfig["tabpaneId"];
            this.computed = fieldProps && fieldProps["computed"];
            this.aggrfunction = fieldProps && fieldProps["aggrfunction"];
            this.additionalFields = fieldProps && fieldProps["additionalFields"];
            this.requestOptions = fieldProps && fieldProps["requestOptions"];
            this.postProcessor = fieldProps && fieldProps["postProcessor"];
            for (var eventname in events) {
                var evnt = kony.sdk.mvvm.KonyApplicationContext.getFactorySharedInstance().createEventObject(eventname);
                for (var tag in events[eventname]) {
                    if (tag == "locked") {
                        continue
                    }
                    var code = events[eventname][tag]["code"];
                    evnt.setCode(code, tag)
                }
                this.events[eventname] = evnt
            }
        } catch (err) {
            throw kony.sdk.mvvm.KonyApplicationContext.getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_WHILE_PROCESSING_WIDGETCONFIG, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_WHILE_PROCESSING_WIDGETCONFIG + widgetid + "err: " + err.toString())
        }
    },
    setWidgetId: function(widgetId) {
        this.widgetid = widgetId
    },
    getWidgetId: function() {
        return this.widgetid
    },
    setWidgetController: function(widgetController) {
        this.widgetcontroller = widgetController
    },
    getWidgetController: function() {
        return this.widgetcontroller
    },
    setWidgetType: function(widgettype) {
        this.widgettype = widgettype
    },
    getWidgetType: function() {
        return this.widgettype
    },
    setWidgetEntity: function(entity) {
        this.entity = entity
    },
    getWidgetEntity: function() {
        return this.entity
    },
    getEntity: function() {
        return this.entity
    },
    setField: function(fieldName) {
        this.field = fieldName;
        if (typeof this.field == "string") this.field = [this.field]
    },
    getField: function() {
        return this.field
    },
    getPostProcessor: function() {
        return this.postProcessor
    },
    getEvents: function() {
        return this.events
    },
    getEvent: function(eventname) {
        if (typeof eventname === "undefined") {
            throw kony.sdk.mvvm.KonyApplicationContext.getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_EVENTNAME_NOT_DEFINED, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_EVENTNAME_NOT_DEFINED)
        }
        return this.events[eventname]
    },
    getEventNames: function() {
        var events = [];
        for (var eventname in this.events) {
            events.push(eventname)
        }
        return events
    },
    isQueryDefined: function() {
        if (typeof this.query == "undefined") {
            return false
        }
        return true
    },
    isParentDefined: function() {
        if (typeof this.parent == "undefined") {
            return false
        }
        return true
    },
    isComputedField: function() {
        if (typeof this.computed == "undefined") {
            return false
        }
        return true
    },
    isDataWidget: function() {
        return false
    },
    getFieldQuery: function() {
        return this.fieldQuery
    },
    getQuery: function() {
        return this.query
    },
    getQueryType: function() {
        return this.querytype
    },
    getQueryParams: function() {
        return this.queryParams
    },
    isTabPaneWidget: function() {
        if (typeof this.tabepaneId == "undefined") return false;
        return true
    },
    getTabPaneId: function() {
        return this.tabepaneId
    },
    getWidgetDataMap: function() {
        return null
    },
    isConstrained: function() {
        if (typeof this.constrained == "undefined") {
            return false
        }
        return true
    },
    getParent: function() {
        return this.parent
    },
    getAdditionalFields: function() {
        return this.additionalFields
    },
    getRequestOptions: function() {
        return this.requestOptions
    }
});
kony.sdk.mvvm.SegmentWidgetConfig = Class(kony.sdk.mvvm.widgetConfig, {
    constructor: function(widgetid, segmentwidgetConfig) {
        this.$class.$super.call(this, widgetid, segmentwidgetConfig);
        var fieldprops = segmentwidgetConfig["fieldprops"];
        this.pagination = fieldprops && fieldprops["pagination"];
        this.pagesize = fieldprops && fieldprops["pagesize"];
        this.widgettype = fieldprops && fieldprops["widgettype"];
        this.entity = fieldprops && fieldprops["entity"];
        this.field = fieldprops && fieldprops["field"];
        this.query = fieldprops && fieldprops["query"];
        this.querytype = fieldprops && fieldprops["querytype"];
        this.queryParams = fieldprops && fieldprops["queryParams"];
        this.constrained = fieldprops && fieldprops["constrained"];
        this.secheaderfields = this.field && this.field["header_Fields"];
        this.groupByKey = fieldprops["groupBy"];
        this.sortByKey = fieldprops["sortBy"];
        this.sortType = fieldprops["sortType"];
        this.additionalFields = fieldprops && fieldprops["additionalFields"];
        this.requestOptions = fieldprops && fieldprops["requestOptions"];
        if (this.field && this.field["header_Fields"]) {
            delete this.field["header_Fields"]
        }
        var appFactoryInstance = kony.sdk.mvvm.KonyApplicationContext.getFactorySharedInstance();
        for (var widgetid in this.field) {
            this.field[widgetid] = appFactoryInstance.createSegmentFieldObject(widgetid, this.field[widgetid])
        }
        if (this.secheaderfields) {
            for (var secheaderId in this.secheaderfields) {
                this.field[secheaderId] = appFactoryInstance.createSegmentFieldObject(secheaderId, this.secheaderfields[secheaderId]);
                this.secheaderfields[secheaderId] = this.field[secheaderId]
            }
        }
    },
    getWidgetType: function() {
        return this.widgettype
    },
    getWidgetEntity: function() {
        return this.entity
    },
    getEntity: function() {
        return this.entity
    },
    setField: function(widgetid, fieldInfo) {
        if (typeof widgetid === "undefined") {
            throw kony.sdk.mvvm.KonyApplicationContext.getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_WIDGETID_NOT_DEFINED, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_WIDGETID_NOT_DEFINED)
        }
        this.field[widgetid] = kony.sdk.mvvm.KonyApplicationContext.getFactorySharedInstance().createSegmentFieldObject(widgetid, fieldInfo)
    },
    getSubField: function(widgetid) {
        return this.field[widgetid]
    },
    getField: function() {
        return this.field
    },
    setPagination: function(bool) {
        this.pagination = bool
    },
    isPagination: function() {
        return this.pagination
    },
    setPageSize: function(pagesize) {
        this.pagesize = pagesize
    },
    getPageSize: function() {
        return this.pagesize
    },
    isDataWidget: function() {
        return true
    },
    getQuery: function() {
        return this.query
    },
    getQueryType: function() {
        return this.querytype
    },
    getQueryParams: function() {
        return this.queryParams
    },
    getWidgetDataMap: function() {
        var widgetDataMap = {};
        var segmentMap = this.getField();
        for (var segmentKey in segmentMap) {
            var fieldName = segmentMap[segmentKey].getFieldName();
            var aliasName = segmentMap[segmentKey].getAliasName();
            if (!aliasName) {
                aliasName = "";
                for (var indx in fieldName) aliasName = aliasName + "_" + fieldName[indx];
                aliasName = aliasName.substring(1, aliasName.length)
            }
            widgetDataMap[segmentKey] = aliasName
        }
        return widgetDataMap
    },
    isConstrained: function() {
        if (typeof this.constrained == "undefined") {
            return false
        }
        return true
    },
    isSecHeaderDefined: function() {
        if (!this.secheaderfields) {
            return false
        }
        return true
    },
    getSecHeaderFields: function() {
        return this.secheaderfields
    },
    isGroupByDefined: function() {
        if (this.groupByKey) return true;
        return false
    },
    isSortByDefined: function() {
        if (this.sortByKey) return true;
        return false
    },
    getGroupByKey: function() {
        return this.groupByKey
    },
    getSortByKey: function() {
        return this.sortByKey
    },
    getSortType: function() {
        return this.sortType
    },
    getAdditionalFields: function() {
        return this.additionalFields
    },
    getRequestOptions: function() {
        return this.requestOptions
    }
});
kony.sdk.mvvm.event = Class(function() {
    function validateTagName(tagname) {
        if (kony.sdk.mvvm.event.TAG_NAME.indexOf(tagname) != -1) {
            return true
        }
        return false
    }
    return {
        $statics: {
            TAG_NAME: ["pre", "post", "main"]
        },
        constructor: function(eventname) {
            if (typeof eventname === "undefined") {
                throw kony.sdk.mvvm.KonyApplicationContext.getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_EVENTNAME_NOT_DEFINED, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_EVENTNAME_NOT_DEFINED)
            }
            this.eventname = eventname;
            this.code = {}
        },
        setCode: function(code, tagname) {
            tagname = tagname || "main";
            if (validateTagName(tagname)) {
                this.code[tagname] = code
            } else {
                throw kony.sdk.mvvm.KonyApplicationContext.getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_TAGNAME_NOTVALID, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_TAGNAME_NOTVALID)
            }
        },
        getCode: function(tagname) {
            tagname = tagname || "main";
            if (validateTagName(tagname)) {
                return this.code[tagname]
            } else {
                throw kony.sdk.mvvm.KonyApplicationContext.getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_TAGNAME_NOTVALID, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_TAGNAME_NOTVALID)
            }
        },
        getEventName: function() {
            return this.eventname
        }
    }
});
kony.sdk.mvvm.SegmentField = Class({
    constructor: function(widgetid, fieldInfo) {
        if (typeof widgetid === "undefined") {
            throw kony.sdk.mvvm.KonyApplicationContext.getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_WIDGETID_NOT_DEFINED, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_WIDGETID_NOT_DEFINED)
        }
        this.widgetid = widgetid;
        this.widgettype = fieldInfo.widgettype;
        this.field = fieldInfo.field;
        if (typeof this.field == "string") this.field = [this.field];
        this.table = fieldInfo.table;
        this.alias = fieldInfo.alias;
        this.aggrfunction = fieldInfo.aggrfunction;
        this.fieldtype = fieldInfo.fieldtype;
        this.text = fieldInfo.text;
        this.postProcessor = fieldInfo.postProcessor
    },
    getWidgetType: function() {
        return this.widgettype
    },
    getFieldName: function() {
        return this.field
    },
    getWidgetId: function() {
        return this.widgetid
    },
    getEntityName: function() {
        return this.table
    },
    getAliasName: function() {
        return this.alias
    },
    getAggrfunction: function() {
        return this.aggrfunction
    },
    getFieldtype: function() {
        return this.fieldtype
    },
    getWidgetText: function() {
        return this.text
    },
    getPostProcessor: function() {
        return this.postProcessor
    }
});
kony.sdk.mvvm.Data = Class({
    constructor: function(dataVal, displayVal, dataTypeVal, contextDataVal) {
        var data;
        var displayValue;
        var dataType;
        var contextData;
        this.getData = function() {
            return data
        };
        this.setData = function(dataVal) {
            data = dataVal
        };
        this.getDisplayValue = function() {
            return displayValue
        };
        this.setDisplayValue = function(displayVal) {
            displayValue = displayVal
        };
        this.getDataType = function() {
            return dataType
        };
        this.setDataType = function(dataTypeVal) {
            dataType = dataTypeVal
        };
        this.getContextData = function() {
            return contextData
        };
        this.setContextData = function(contextDataVal) {
            contextData = contextDataVal
        };
        this.setData(dataVal);
        this.setDisplayValue(displayVal);
        this.setDataType(dataTypeVal);
        this.setContextData(contextDataVal)
    },
    clone: function() {
        var dataClone = kony.sdk.mvvm.KonyApplicationContext.getFactorySharedInstance().createDataObject();
        var baseData = this.getData();
        if (typeof baseData === "object") {
            var copyData = JSON.parse(JSON.stringify(baseData))
        } else {
            var copyData = baseData
        }
        dataClone.setData(copyData);
        dataClone.setDisplayValue(this.getDisplayValue());
        dataClone.setDataType(this.getDataType());
        dataClone.setContextData(this.getContextData());
        return dataClone
    }
});
kony.sdk.mvvm.ViewDecorator = Class({
    constructor: function() {},
    init: function(view) {},
    preshow: function(view) {}
});
kony.sdk.mvvm.Query = Class({
    constructor: function(queryObj, queryTypeArg) {
        var queryType = queryTypeArg;
        var query = undefined;
        var appFactoryInstance = kony.sdk.mvvm.KonyApplicationContext.getFactorySharedInstance();
        this.getQueryType = function() {
            return queryType
        };
        this.setQueryType = function(queryTypeStr) {
            queryType = queryTypeStr
        };
        this.getQuery = function() {
            return query
        };
        this.setQuery = function(queryObj) {
            query = queryObj
        };
        if (queryType && queryType === "sql") {
            query = appFactoryInstance.createSQLQueryObject(queryObj)
        } else if (queryType && queryType === "odata") {
            query = appFactoryInstance.createODataQueryObject(queryObj)
        }
    },
    getQueryString: function() {
        return this.getQuery().getQueryString()
    },
    setQueryString: function(queryString) {
        this.getQuery().setQueryString(queryString)
    },
    appendQueryString: function(querySubString) {
        this.getQuery().appendQueryString(querySubString)
    },
    prepareQueryString: function(variables) {
        this.getQuery().prepareQueryString(variables)
    },
    validateQuery: function() {}
});
kony.sdk.mvvm.SQLQuery = Class({
    constructor: function(query) {
        this.query = query
    },
    getQuery: function() {
        return this.query
    },
    setQueryString: function(queryString) {
        this.query = queryString
    },
    getQueryString: function() {
        return this.getQuery()
    },
    appendQueryString: function(querySubString) {
        var currQuery = this.getQueryString();
        if (currQuery !== undefined && currQuery !== null) {
            this.setQueryString(currQuery.concat(querySubString))
        } else {
            this.setQueryString(querySubString)
        }
    },
    prepareQueryString: function(variables) {
        try {
            var queryString = this.getQueryString();
            var regEx;
            if (queryString) {
                var noOfOccurences = queryString.split("{").length - 1;
                var noOfSecondOccurences = queryString.split("}").length - 1;
                if (noOfOccurences !== noOfSecondOccurences) {
                    kony.sdk.mvvm.log.error("Parameters to be replaced in the query string are not provided correctly");
                    return
                }
                var firstIndex, secondIndex, subString, paramValue;
                for (var i = 0; i < noOfOccurences; i += 1) {
                    firstIndex = -1;
                    secondIndex = -1;
                    firstIndex = queryString.indexOf("{", firstIndex + 1);
                    secondIndex = queryString.indexOf("}", secondIndex + 1);
                    if (firstIndex > secondIndex) {
                        kony.sdk.mvvm.log.error("Parameters to be replaced in the query string are not provided correctly");
                        return
                    }
                    subString = queryString.substring(firstIndex + 1, secondIndex);
                    paramValue = variables[subString];
                    if (paramValue !== undefined) {
                        queryString = queryString.replace("{" + subString + "}", paramValue)
                    } else {
                        kony.sdk.mvvm.log.error("Parameters to be replaced in the query string are not provided correctly");
                        return
                    }
                }
                this.setQueryString(queryString)
            }
        } catch (err) {
            kony.sdk.mvvm.log.error("Error preparting sql query string - " + err.toString());
            throw kony.sdk.mvvm.KonyApplicationContext.getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_PREPARING_QUERY_STRING, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_PREPARING_QUERY_STRING, err)
        }
    },
    validateQuery: function() {}
});
kony.sdk.mvvm.ODataQuery = Class({
    constructor: function(query) {
        this.query = query
    },
    getQuery: function() {
        return this.query
    },
    setQueryString: function(queryString) {
        this.query = queryString
    },
    getQueryString: function() {
        return this.getQuery()
    },
    appendQueryString: function(querySubString) {
        var currQuery = this.getQueryString();
        if (currQuery !== undefined && currQuery !== null) {
            this.setQueryString(currQuery.concat(querySubString))
        } else {
            this.setQueryString(querySubString)
        }
    },
    prepareQueryString: function(variables) {
        try {
            var queryString = this.getQueryString();
            var regEx;
            if (queryString) {
                var noOfOccurences = queryString.split("{").length - 1;
                var noOfSecondOccurences = queryString.split("}").length - 1;
                if (noOfOccurences !== noOfSecondOccurences) {
                    kony.sdk.mvvm.log.error("Parameters to be replaced in the query string are not provided correctly");
                    return
                }
                var firstIndex, secondIndex, subString, paramValue;
                for (var i = 0; i < noOfOccurences; i += 1) {
                    firstIndex = -1;
                    secondIndex = -1;
                    firstIndex = queryString.indexOf("{", firstIndex + 1);
                    secondIndex = queryString.indexOf("}", secondIndex + 1);
                    if (firstIndex > secondIndex) {
                        kony.sdk.mvvm.log.error("Parameters to be replaced in the query string are not provided correctly");
                        return
                    }
                    subString = queryString.substring(firstIndex + 1, secondIndex);
                    paramValue = variables[subString];
                    if (paramValue !== undefined) {
                        queryString = queryString.replace("{" + subString + "}", paramValue)
                    } else {
                        kony.sdk.mvvm.log.error("Parameters to be replaced in the query string are not provided correctly");
                        return
                    }
                }
                this.setQueryString(queryString)
            }
        } catch (err) {
            kony.sdk.mvvm.log.error("Error preparting odata query string - " + err.toString());
            throw kony.sdk.mvvm.KonyApplicationContext.getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_PREPARING_QUERY_STRING, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_PREPARING_QUERY_STRING, err)
        }
    },
    validateQuery: function() {}
});
kony.sdk.mvvm.v2.DataProvider = Class({
    constructor: function(saasDataProvider) {
        var dataProvider = saasDataProvider;
        this.getDataProvider = function() {
            return dataProvider
        };
        this.setDataProvider = function(saasDataProvider) {
            dataProvider = saasDataProvider
        }
    },
    fetch: function(queryObj, successCallback, errorCallback) {
        if (queryObj instanceof kony.sdk.mvvm.Query) {
            if (queryObj.getQueryType() === "odata") {
                var query = queryObj.getQueryString();
                var selectQueryObj = new kony.sdk.mvvm.SelectQuery(query);
                this.getDataProvider().fetch(selectQueryObj, successCallback, errorCallback)
            } else if (queryObj.getQueryType() === "sql") {
                this.getDataProvider().executeSelectQuery(queryObj.getQueryString(), successCallback, errorCallback)
            } else {
                kony.sdk.mvvm.log.error("Invalid querytype")
            }
        } else {
            kony.sdk.mvvm.log.error("Invalid query object, expected 'kony.sdk.mvvm.query' type object")
        }
    },
    customservice: function(httpcustomrequest, customservicename, customserviceCallback, customserviceErrorCallback) {
        this.getDataProvider().customservice(httpcustomrequest, customservicename, customserviceCallback, customserviceErrorCallback)
    },
    create: function(model, successCallback, errorCallback) {
        this.getDataProvider().create(model, successCallback, errorCallback)
    },
    update: function(model, successCallback, errorCallback) {
        this.getDataProvider().update(model, successCallback, errorCallback)
    },
    read: function(entityName, id) {
        this.getDataProvider().read(entityName, id)
    },
    deleteRecord: function(model, id, successCallback, errorCallback) {
        this.getDataProvider().deleteRecord(model, id, successCallback, errorCallback)
    },
    downloadClientArtifact: function() {
        this.getDataProvider().downloadClientArtifact()
    },
    executeSelectQuery: function(queryStr, succCallback, errCallback) {
        this.getDataProvider().executeSelectQuery(queryStr, succCallback, errCallback)
    },
    getRelationData: function(entityName, entityKeyName, entityKeyValue, relation, uiFields, syncRelatedDataSuccess, syncRelatedDataError, queryObj) {
        this.getDataProvider().getRelationData(entityName, entityKeyName, entityKeyValue, relation, uiFields, syncRelatedDataSuccess, syncRelatedDataError, queryObj)
    },
    associate: function(pkName, parent, parentId, child, payload, relation, relationshipname, successcallback, errorcallback) {
        this.getDataProvider().associate(pkName, parent, parentId, child, payload, relation, relationshipname, successcallback, errorcallback)
    },
    associateexistingrecord: function(pkName, parent, parentId, child, childId, relation, relationshipname, successcallback, errorcallback) {
        this.getDataProvider().associateexistingrecord(pkName, parent, parentId, child, childId, relation, relationshipname, successcallback, errorcallback)
    },
    dissociate: function(pkName, parent, parentId, child, childId, relation, relationshipname, successcallback, errorcallback) {
        this.getDataProvider().dissociate(pkName, parent, parentId, child, childId, relation, relationshipname, successcallback, errorcallback)
    },
    executeGeneratedSQLQuery: function(selectQueryObj, generatedsqlquery, sucCallBack, errCallBack) {
        this.getDataProvider().executeGeneratedSQLQuery(selectQueryObj, generatedsqlquery, sucCallBack, errCallBack)
    }
});
kony.sdk.mvvm.ApplicationProperties = Class({
    constructor: function() {
        this.appMenu = undefined;
        this.applicationproperties = []
    },
    setAppMenuProperties: function(appMenu) {
        kony.sdk.mvvm.log.info("In set app menu - ", appMenu);
        this.appMenu = appMenu
    },
    getAppMenuProperties: function() {
        return this.appMenu
    },
    getApplicationPropertiesByKey: function(key) {
        kony.print("in get app props by key  " + kony.sdk.mvvm.util.stringifyKonyObject(this.applicationproperties));
        var value = undefined;
        for (var i = 0; i < this.applicationproperties.length; i++) {
            if (key === this.applicationproperties[i].key) {
                value = this.applicationproperties[i].value;
                if (value.hasOwnProperty(key)) value = value[key];
                break
            }
        }
        return value
    },
    setApplicationpropertiesByKey: function(key, value) {
        kony.print("in set app props by key " + kony.sdk.mvvm.util.stringifyKonyObject(this.applicationproperties));
        this.applicationproperties.push({
            key: value
        })
    },
    setApplicationproperties: function(appprops) {
        this.applicationproperties = appprops
    },
    getApplicationproperties: function() {
        return this.applicationproperties
    }
});
kony.sdk.mvvm.DataStore = Class({
    constructor: function() {
        var inMemoryData = {};
        this.getDataByKey = function(key) {
            if (inMemoryData.hasOwnProperty(key)) return inMemoryData[key]
        };
        this.setDataByKey = function(key, data) {
            inMemoryData[key] = data
        }
    },
    storeData: function(key, data, inMemory) {
        if (inMemory == true) this.setDataByKey(key, data);
        else kony.store.setItem(key, data)
    },
    getData: function(key, inMemory) {
        if (inMemory == true) return this.getDataByKey(key);
        else return kony.store.getItem(key)
    }
});
kony = kony || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.v2 = kony.sdk.mvvm.v2 || {};
kony.sdk.mvvm.KonyApplicationContext = Class(function() {
    var applicationContextImpl;

    function getApplicationContextImpl() {
        return applicationContextImpl
    }

    function setApplicationContextImpl(implObj) {
        applicationContextImpl = implObj
    }
    var appContextInstance;

    function setAppContextInstance(appInst) {
        appContextInstance = appInst
    }

    function getAppContextInstance() {
        return appContextInstance
    }
    return {
        $statics: {
            getAppInstance: function() {
                return getAppContextInstance()
            },
            setAuthProfile: function(authProf) {
                getApplicationContextImpl().setAuthProfile(authProf)
            },
            getAuthProfile: function() {
                return getApplicationContextImpl().getAuthProfile()
            },
            isFirstLogin: function(userame, tenant, hostName) {
                return getApplicationContextImpl().isFirstLogin(userame, tenant, hostName)
            },
            isAppsFirstLogin: function(params) {
                return getApplicationContextImpl().isAppsFirstLogin(params)
            },
            getRecentlyLoggedUserDetails: function() {
                return getApplicationContextImpl().getRecentlyLoggedUserDetails()
            },
            getLocalDbConnection: function(dbName, errCallback) {
                return getApplicationContextImpl().getLocalDbConnection(dbName, errCallback)
            },
            getUIConfigDataProvider: function() {
                return getApplicationContextImpl().getUIConfigDataProvider()
            },
            getMetaDataProvider: function() {
                return getApplicationContextImpl().getMetaDataProvider()
            },
            getDataProvider: function() {
                return getApplicationContextImpl().getDataProvider()
            },
            getFactorySharedInstance: function() {
                return getApplicationContextImpl().getFactorySharedInstance()
            },
            appServicesLogin: function(params, loginSuccessCallback, loginErrorCallback) {
                this.init(params);
                getApplicationContextImpl().appServicesLogin(params, loginSuccessCallback, loginErrorCallback)
            },
            getObjectService: function(options, objectServiceName) {
                return getApplicationContextImpl().getObjectService(options, objectServiceName)
            },
            refreshApp: function() {
                getApplicationContextImpl().refreshApp()
            },
            logout: function(logoutSucCallback, logoutErrCallback,options) {
                getApplicationContextImpl().logout(success, logoutErrCallback,options);

                function success() {
                    setApplicationContextImpl(undefined);
                    logoutSucCallback()
                }
            },
            showLoadingScreen: function(text) {
                getApplicationContextImpl().showLoadingScreen(text)
            },
            showSyncLoadingScreen: function(text) {
                getApplicationContextImpl().showSyncLoadingScreen(text)
            },
            dismissLoadingScreen: function() {
                getApplicationContextImpl().dismissLoadingScreen()
            },
            dismissSyncLoadingScreen: function() {
                getApplicationContextImpl().dismissSyncLoadingScreen()
            },
            registerHasPermission: function(hasPermissionFunc) {
                getApplicationContextImpl().registerHasPermission(hasPermissionFunc)
            },
            hasPermission: function(resourceName, recordId, operation) {
                return getApplicationContextImpl().hasPermission(resourceName, recordId, operation)
            },
            init: function() {
                setAppContextInstance(new kony.sdk.mvvm.KonyApplicationContext(new kony.sdk.mvvm.AppFactory))
            }
        },
        constructor: function(factoryObj) {
            setApplicationContextImpl(factoryObj.createApplicationContextImpl(factoryObj))
        },
        getSessionToken: function() {
            return getApplicationContextImpl().getSessionToken()
        },
        setSessionToken: function(sessionToken) {
            getApplicationContextImpl().setSessionToken(sessionToken)
        },
        setOnlineStatus: function(isOnline) {
            getApplicationContextImpl().setOnlineStatus(isOnline)
        },
        setUserCredentialObj: function(obj) {
            getApplicationContextImpl().setUserCredentialObj(obj)
        },
        getUserCredentialObj: function() {
            return getApplicationContextImpl().getUserCredentialObj()
        },
        getAuthManager: function() {
            return getApplicationContextImpl().getAuthManager()
        },
        isAppSyncEnabled: function() {
            return getApplicationContextImpl().isAppSyncEnabled()
        },
        setAuthManager: function(authManager) {
            getApplicationContextImpl().setAuthManager(authManager)
        },
        isTenantSyncEnabled: function() {
            return getApplicationContextImpl().isTenantSyncEnabled()
        },
        getDataProviderMetaData: function(serviceName, options) {
            return getApplicationContextImpl().getDataProviderMetaData(serviceName, options)
        },
        setDataProviderMetaData: function(dataProviderMetaData, serviceName, options) {
            getApplicationContextImpl().setDataProviderMetaData(dataProviderMetaData, serviceName, options)
        },
        getMetadataStore: function() {
            return getApplicationContextImpl().getMetadataStore()
        },
        getSyncManager: function() {
            return getApplicationContextImpl().getSyncManager()
        },
        setStartupForm: function(formid) {
            getApplicationContextImpl().setStartupForm(formid)
        },
        getStartupForm: function() {
            return getApplicationContextImpl().getStartupForm()
        },
        getNavigController: function() {
            return getApplicationContextImpl().getNavigController()
        },
        reset: function() {
            getApplicationContextImpl().reset()
        },
        setApplicationProperties: function(appProperties) {
            getApplicationContextImpl().setApplicationProperties(appProperties)
        },
        getApplicationProperties: function() {
            return getApplicationContextImpl().getApplicationProperties()
        },
        getUserName: function() {
            return getApplicationContextImpl().getUserName()
        },
        getUserAuthProfile: function() {
            return getApplicationContextImpl().getUserAuthProfile()
        },
        getModel: function(entityName, serviceName, options) {
            return getApplicationContextImpl().getModel(entityName, serviceName, options)
        },
        createModel: function(entityName) {
            return getApplicationContextImpl().createModel(entityName)
        },
        getInstance: function(className, args) {
            return getApplicationContextImpl().getInstance(className, args)
        },
        createInstance: function(className, args) {
            return getApplicationContextImpl().createInstance(className, args)
        },
        getFormController: function(formId) {
            return getApplicationContextImpl().getFormController(formId)
        },
        getAllFormControllers: function() {
            return getApplicationContextImpl().getAllFormControllers()
        },
        setAllFormControllers: function(formControllers) {
            getApplicationContextImpl().setAllFormControllers(formControllers)
        },
        setFormController: function(formId, controller) {
            getApplicationContextImpl().setFormController(formId, controller)
        },
        setIdentityService: function(identityService) {
            getApplicationContextImpl().setIdentityService(identityService)
        },
        getIdentityService: function() {
            return getApplicationContextImpl().getIdentityService()
        }
    }
});
kony.sdk.mvvm.KonyApplicationContextMFAPP = Class(function() {
    function LicenseJSUtil() {
        function innerlog(arg) {
            kony.sdk.mvvm.log.info(arg)
        }

        function dsSave(arg1, arg2) {
            kony.ds.save(arg1, arg2)
        }

        function isCloud(arg1, arg2) {
            return kony.license.isCloud()
        }

        function disableLicenseCheck() {
            var retvalue = false;
            if (isCloud() === true) {
                retvalue = true;
                dsSave(["true"], "LicenseDisableFlag")
            }
            return retvalue
        }

        function enableLicenseCheck(didTouchLicenseDisableFlag) {
            if (didTouchLicenseDisableFlag === true) {
                dsSave(["false"], "LicenseDisableFlag")
            }
        }
        var interfaceFunctions = {
            disableLicenseCheck: function() {
                return disableLicenseCheck()
            },
            enableLicenseCheck: function(didTouchLicenseDisableFlag) {
                enableLicenseCheck(didTouchLicenseDisableFlag)
            }
        };
        return interfaceFunctions
    }

    function FunctionEvents(funcArgs) {
        var successCallback = funcArgs["successCallback"];
        var errorCallback = funcArgs["errorCallback"];
        var preEventsList = funcArgs["preEventsList"];
        var postEventsList = funcArgs["postEventsList"];

        function innerlog(arg) {
            kony.sdk.mvvm.log.info(arg)
        }

        function initiateEvent(eventsList) {
            if (eventsList.length) {
                for (i in eventsList) {
                    var evtFunc = eventsList[i];
                    if (typeof evtFunc === "function") {
                        evtFunc()
                    }
                }
            }
        }

        function preEvent() {
            initiateEvent(preEventsList)
        }

        function postEvent() {
            initiateEvent(postEventsList)
        }

        function onEvent(evttype) {
            if (evttype === "pre") {
                preEvent()
            } else {
                postEvent()
            }
        }

        function onFunctionExit(callbacktype, funcCallback, arg) {
            postEvent();
            var callback = typeof funcCallback === "function" ? funcCallback : function() {};
            if (callbacktype === "success") {
                callback()
            } else {
                callback(arg)
            }
        }

        function successCallbackInvoker(successCallback) {
            onFunctionExit("success", successCallback)
        }

        function errorCallbackInvoker(errorCallback, error) {
            onFunctionExit("error", errorCallback, error)
        }
        var interfaceFunctions = {
            onEvent: function(evttype) {
                onEvent(evttype)
            },
            successCallbackInvoker: function() {
                successCallbackInvoker(successCallback)
            },
            errorCallbackInvoker: function(error) {
                errorCallbackInvoker(errorCallback, error)
            }
        };
        return interfaceFunctions
    }

    function ApplicationCallbacksUtil() {
        function innerlog(arg) {
            kony.sdk.mvvm.log.info(arg)
        }

        function getApplicationCallbacksFunction() {
            var retvalue = null;
            if (kony.sdk.mvvm.Utils.isIphone() || kony.sdk.mvvm.Utils.isIpad()) {
                retvalue = kony.application.getApplicationCallbacks
            }
            return retvalue
        }

        function getApplicationCallbacks(callbacksList) {
            var func = kony.application.getApplicationCallbacks;
            return typeof func === "function" ? func(callbacksList) : {}
        }

        function setApplicationCallbacks(callbacksList) {
            var func = kony.application.setApplicationCallbacks;
            return func ? func(callbacksList) : {}
        }

        function modifyApplicationCallbacksToOverride(callbacksList) {
            var applicationCallbacks = getApplicationCallbacks(callbacksList);
            setApplicationCallbacks({
                onactive: null,
                oninactive: null,
                onbackground: null,
                onforeground: null
            });
            return applicationCallbacks
        }

        function modifyApplicationCallbacksToRevert(callbacksList, savedCallbacks) {
            setApplicationCallbacks({
                onactive: savedCallbacks["onactive"],
                oninactive: savedCallbacks["oninactive"],
                onbackground: savedCallbacks["onbackground"],
                onforeground: savedCallbacks["onforeground"]
            })
        }

        function overrideApplicationCallbacks(licenseJSUtil, callbacksList) {
            var didTouchLicenseDisableFlag = licenseJSUtil.disableLicenseCheck();
            var applicationCallbacks = modifyApplicationCallbacksToOverride(callbacksList);
            licenseJSUtil.enableLicenseCheck(didTouchLicenseDisableFlag);
            return applicationCallbacks
        }

        function revertApplicationCallbacks(licenseJSUtil, callbacksList, savedCallbacks) {
            var didTouchLicenseDisableFlag = licenseJSUtil.disableLicenseCheck();
            modifyApplicationCallbacksToRevert(callbacksList, savedCallbacks);
            licenseJSUtil.enableLicenseCheck(didTouchLicenseDisableFlag)
        }
        var interfaceFunctions = {
            overrideApplicationCallbacks: function(licenseJSUtil, callbacksList) {
                return overrideApplicationCallbacks(licenseJSUtil, callbacksList)
            },
            revertApplicationCallbacks: function(licenseJSUtil, callbacksList, savedCallbacks) {
                revertApplicationCallbacks(licenseJSUtil, callbacksList, savedCallbacks)
            },
            storeApplicationCallbacks: function(callbacks) {
                return function() {
                    return callbacks
                }
            },
            isGetApplicationCallbacksFunctionSupported: function() {
                return typeof getApplicationCallbacksFunction() === "function" ? true : false
            }
        };
        return interfaceFunctions
    }
    var storedCredentialObj;
    var applicationContext;
    var factoryObj;
    var authProfile;
    var IS_ONLINE = true;
    var implInstance;
    var userDefinedPermissions;
    var SESSION_TOKEN;
    var identityService;
    return {
        $statics: {
            getSessionToken: function() {
                return SESSION_TOKEN
            },
            getImplInstance: function() {
                return implInstance
            },
            setImplInstance: function(implInst) {
                implInstance = implInst
            },
            setAuthProfile: function(authProf) {
                authProfile = authProf
            },
            getAuthProfile: function() {
                return authProfile
            },
            getUserDefinedHasPermission: function() {
                return userDefinedPermissions
            },
            setUserDefinedHasPermission: function(userPerms) {
                userDefinedPermissions = userPerms
            },
            isFirstLogin: function() {
                throw "not implemented"
            },
            isAppsFirstLogin: function(params) {
                var username = params["username"];
                if (!username && params["authParams"]) {
                    username = params["authParams"]["userid"]
                }
                var options = params["options"];
                var identityServiceName = params["identityServiceName"];
                var credStore = kony.store.getItem(kony.sdk.mvvm.credStoreName);
                if (credStore !== null && credStore !== undefined) {
                    var storedOptions = credStore[kony.sdk.mvvm.credStoreOptions];
                    var storedIdentityServiceName = credStore[kony.sdk.mvvm.credStoreIdentityService];
                    var storedUsername = credStore[kony.sdk.mvvm.credStoreUsername];
                    if (storedUsername !== undefined && storedOptions !== undefined && kony.sdk.mvvm.Utils.matchIgnoreCase(storedUsername, username) && kony.sdk.mvvm.Utils.matchIgnoreCase(storedOptions.access, options.access) && kony.sdk.mvvm.Utils.matchIgnoreCase(storedIdentityServiceName, identityServiceName)) {
                        return false
                    }
                }
                return true
            },
            getRecentlyLoggedUserDetails: function() {
                var userDetails = {};
                var credStore = kony.store.getItem(kony.sdk.mvvm.credStoreName);
                if (credStore !== null && credStore !== undefined) {
                    var storedOptions = credStore[kony.sdk.mvvm.credStoreOptions];
                    var storedUsername = credStore[kony.sdk.mvvm.credStoreUsername];
                    if (storedUsername !== undefined && storedOptions !== undefined) {
                        userDetails["username"] = storedUsername;
                        userDetails["options"] = storedOptions
                    }
                }
                return userDetails
            },
            getLocalDbConnection: function(dbName, errCallback) {
                var connection;
                var version = "1.0";
                var displayName = "AFN FormData SQL Database";
                var estimatedSize = 2 * 1024 * 1024;
                try {
                    connection = kony.db.openDatabaseSync(dbName, version, displayName, estimatedSize)
                } catch (error) {
                    connection = null;
                    if (typeof errCallback === "function") errCallback(error)
                }
                return connection
            },
            getUIConfigDataProvider: function() {
                try {
                    if (kony.sdk.mvvm.localDBConstants && kony.sdk.mvvm.localDBConstants.fetchUIConfigDataFromLocalDB == true) {
                        return new kony.sdk.mvvm.LocalDBDataProvider(kony.sdk.mvvm.KonyApplicationContextMFAPP.getSessionToken())
                    }
                    var uiConfigService = this.getFactorySharedInstance().createUIConfigServiceObject(IS_ONLINE);
                    var uiConfigProvider = uiConfigService.getUIConfigProvider(kony.sdk.mvvm.KonyApplicationContextMFAPP.getSessionToken());
                    return uiConfigProvider
                } catch (err) {
                    throw this.getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_INITIALIZING_UI_CONFIG_DATA_PROVIDER, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_INITIALIZING_UI_CONFIG_DATA_PROVIDER + " -- " + err.message)
                }
            },
            getMetaDataProvider: function() {
                try {
                    var metaDataServiceObj = this.getFactorySharedInstance().createMetaDataServiceObject(IS_ONLINE);
                    if (kony.sdk.mvvm.localDBConstants && kony.sdk.mvvm.localDBConstants.fetchMetadataFromLocalDB == true) {
                        return new kony.sdk.mvvm.LocalDBDataProvider(kony.sdk.mvvm.KonyApplicationContextMFAPP.getSessionToken())
                    }
                    var metaDataProvider = metaDataServiceObj.getMetadataProvider(kony.sdk.mvvm.KonyApplicationContextMFAPP.getSessionToken());
                    return metaDataProvider
                } catch (err) {
                    throw this.getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_INITIALIZING_METADATA_PROVIDER, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_INITIALIZING_METADATA_PROVIDER + " -- " + err.message)
                }
            },
            getDataProvider: function() {
                try {
                    var dataServiceObj = this.getFactorySharedInstance().createDataServiceObject(IS_ONLINE);
                    var dataProvider = dataServiceObj.getDataProvider(kony.sdk.mvvm.KonyApplicationContextMFAPP.getSessionToken());
                    var dataProviderV2 = this.getFactorySharedInstance().createDataProviderObject(dataProvider);
                    return dataProviderV2
                } catch (err) {
                    throw this.getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_INITIALIZING_DATA_PROVIDER, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_INITIALIZING_DATA_PROVIDER + " -- " + err.message)
                }
            },
            getFactorySharedInstance: function() {
                return factoryObj
            },
            appServicesLogin: function(params, loginSuccessCallback, loginErrorCallback) {
                try {
                    var options = params["options"];
                    var syncOptions = params["syncOptions"];
                    var isOffline = options["access"] === "offline" ? true : false;
                    var configParams = params["configParams"];
                    var syncParams = {
                        syncOptions: syncOptions
                    };
                    var authConfig = {};
                    authConfig["authParams"] = params["authParams"];
                    authConfig["options"] = params["options"];
                    authConfig["identityServiceName"] = params["identityServiceName"];
                    var appfactoryInstance = this.getFactorySharedInstance();
                    if (configParams && configParams.constructor === Object && Object.keys(configParams).length > 0) {
                        var appPropertiesInstance = appfactoryInstance.createConfigurationServiceManagerObject();
                        var appPropertyObj = appPropertiesInstance.generateAppPropsObj(configParams);
                        appPropertiesInstance.apply(appPropertyObj)
                    }
                    var initManager = appfactoryInstance.createAppInitManagerObject();
                    initManager.registerService("AuthenticationServiceManager", {
                        object: appfactoryInstance.createAuthManager(),
                        params: authConfig
                    });
                    initManager.registerService("MetadataServiceManager", {
                        object: appfactoryInstance.createMetadataManagerObject(),
                        params: {
                            options: options
                        }
                    });
                    if (isOffline) {
                        initManager.registerService("SyncManager", {
                            object: appfactoryInstance.createSyncManagerObject(),
                            params: syncParams
                        })
                    }
                    initManager.executeRegistedServices(loginSuccessCallback, loginErrorCallback)
                } catch (err) {
                    var exception;
                    kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
                    kony.sdk.mvvm.log.error("Error while authentication: " + err.toString());
                    if (err !== undefined && err !== null) {
                        exception = this.getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_APP_INITIALIZATION_FAILED, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_APP_INITIALIZATION_FAILED)
                    } else exception = this.getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_APP_INITIALIZATION_FAILED, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_APP_INITIALIZATION_FAILED);
                    loginErrorCallback(exception)
                }
            },
            getObjectService: function(options, objectServiceName) {
                try {
                    var objectService;
                    if (options.hasOwnProperty("mock") && options["mock"] == true) {
                        kony.sdk.mvvm.log.info("Initialising mocked object service");
                        objectService = kony.sdk.getCurrentInstance().getObjectService(objectServiceName, {
                            access: objectServiceName
                        })
                    } else {
                        objectService = kony.sdk.getCurrentInstance().getObjectService(objectServiceName, options)
                    }
                    return objectService
                } catch (error) {
                    throw this.getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_INITIALIZING_METADATA_PROVIDER, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_INITIALIZING_METADATA_PROVIDER + " -- " + error.message)
                }
            },
            refreshApp: function() {
                var scopeObj = this;
                var RefreshTS = new Date;
                var sessionToken = kony.sdk.mvvm.KonyApplicationContextMFAPP.getSessionToken();
                var isOnline = IS_ONLINE;
                var loginSuccessCallback = kony.sdk.mvvm.KonyApplicationContextMFAPP.getImplInstance().loginSucCallBack;
                var loginErrorCallback = kony.sdk.mvvm.KonyApplicationContextMFAPP.getImplInstance().loginErrCallBack;

                function refreshCallback(appInstance) {
                    var RefreshEndTS = new Date;
                    if (kony.sdk.mvvm.KonyApplicationContextMFAPP.getImplInstance() !== undefined && kony.sdk.mvvm.KonyApplicationContextMFAPP.getImplInstance() !== null) {
                        kony.sdk.mvvm.KonyApplicationContextMFAPP.getImplInstance().loginSucCallBack = null;
                        kony.sdk.mvvm.KonyApplicationContextMFAPP.getImplInstance().loginErrCallBack = null;
                        kony.sdk.mvvm.KonyApplicationContextMFAPP.getImplInstance().reset();
                        kony.sdk.mvvm.KonyApplicationContextMFAPP.setImplInstance(null)
                    }
                    SESSION_TOKEN = sessionToken;
                    kony.sdk.mvvm.KonyApplicationContextMFAPP.setImplInstance(appInstance);
                    kony.sdk.mvvm.KonyApplicationContextMFAPP.getImplInstance().loginSucCallBack = loginSuccessCallback;
                    kony.sdk.mvvm.KonyApplicationContextMFAPP.getImplInstance().loginErrCallBack = loginErrorCallback;
                    kony.sdk.mvvm.Utils.perftimecal("Refresh >>", "Refresh Ended >>", RefreshTS, RefreshEndTS);
                    if (typeof loginSuccessCallback === "function") loginSuccessCallback()
                }

                function refreshErrCallback(err) {
                    var exception;
                    exception = scopeObj.getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_FAILED_TO_LOAD_APPLICATION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_FAILED_TO_LOAD_APPLICATION, err);
                    if (typeof loginErrorCallback === "function") loginErrorCallback(exception)
                }
                saasApp.reset();
                saasApp = undefined;
                kony.sdk.mvvm.constants["entityMetadataMap"] = {};
                saasApp = new kony.sdk.mvvm.KonyApplicationContext(sessionToken, isOnline, false, refreshCallback, refreshErrCallback)
            },
            logout: function(logoutSucCallback, logoutErrCallback,options) {
                var logoutTS = new Date;
                try {
                    this.reset();
                    var identityService = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getIdentityService();
                    if (identityService) {
                        identityService.logout(success, logoutErrCallback,options)
                    } else {
                        success()
                    }

                    function success() {
                        var logoutEndTS = new Date;
                        kony.sdk.mvvm.Utils.perftimecal("Logout >>", "Logout Ended >>", logoutTS, logoutEndTS);
                        kony.sdk.mvvm.Utils.perlogout();
                        logoutSucCallback()
                    }
                } catch (err) {
                    logoutErrCallback(this.getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_FAILED_TO_LOGOUT, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_FAILED_TO_LOGOUT + " : " + err.toString(), err))
                }
            },
            showLoadingScreen: function(text) {
                if (kony.sdk.mvvm.KonyApplicationContext.getAppInstance() && kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getApplicationProperties() && kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getApplicationProperties().getApplicationPropertiesByKey("ShowLoadingScreenFunction")) {
                    var userDefinedLoadingScreen = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getApplicationProperties().getApplicationPropertiesByKey("ShowLoadingScreenFunction");
                    userDefinedLoadingScreen(text)
                } else {
                    text = " " + text + " \n";
                    kony.application.showLoadingScreen(null, text, constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, null)
                }
            },
            showSyncLoadingScreen: function(text) {
                if (kony.sdk.mvvm.KonyApplicationContext.getAppInstance() && kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getApplicationProperties() && kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getApplicationProperties().getApplicationPropertiesByKey("ShowSyncLoadingScreenFunction")) {
                    var userDefinedLoadingScreen = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getApplicationProperties().getApplicationPropertiesByKey("ShowSyncLoadingScreenFunction");
                    userDefinedLoadingScreen(text)
                } else {
                    text = " " + text + " \n";
                    kony.application.showLoadingScreen(null, text, constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, null)
                }
            },
            dismissLoadingScreen: function() {
                if (kony.sdk.mvvm.KonyApplicationContext.getAppInstance() && kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getApplicationProperties() && kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getApplicationProperties().getApplicationPropertiesByKey("DismissLoadingScreenFunction")) {
                    var userDefinedLoadingScreen = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getApplicationProperties().getApplicationPropertiesByKey("DismissLoadingScreenFunction");
                    userDefinedLoadingScreen()
                } else {
                    kony.application.dismissLoadingScreen()
                }
            },
            dismissSyncLoadingScreen: function() {
                if (kony.sdk.mvvm.KonyApplicationContext.getAppInstance() && kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getApplicationProperties() && kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getApplicationProperties().getApplicationPropertiesByKey("DismissSyncLoadingScreenFunction")) {
                    var userDefinedLoadingScreen = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getApplicationProperties().getApplicationPropertiesByKey("DismissSyncLoadingScreenFunction");
                    userDefinedLoadingScreen()
                } else {
                    kony.application.dismissLoadingScreen()
                }
            },
            registerHasPermission: function(hasPermissionFunc) {
                if (typeof hasPermissionFunc == "function") {
                    kony.sdk.mvvm.KonyApplicationContextMFAPP.setUserDefinedHasPermission(hasPermissionFunc)
                } else {
                    kony.sdk.mvvm.log.error("The argument is not of type 'function', registering has permission callback failed")
                }
            },
            hasPermission: function(resourceName, recordId, operation) {
                var hasPerm = false;
                if (kony.sdk.mvvm.KonyApplicationContextMFAPP.getUserDefinedHasPermission()) {
                    kony.sdk.mvvm.log.info("handling the call to user defined hasPermission that is registered.");
                    return kony.sdk.mvvm.KonyApplicationContextMFAPP.getUserDefinedHasPermission()(resourceName, recordId, operation)
                }
                if (kony.sdk.mvvm.Utils.matchIgnoreCase(operation, "create")) {
                    operationVal = 1
                } else if (kony.sdk.mvvm.Utils.matchIgnoreCase(operation, "retrieve")) {
                    operationVal = 2
                } else if (kony.sdk.mvvm.Utils.matchIgnoreCase(operation, "update")) {
                    operationVal = 4
                } else if (kony.sdk.mvvm.Utils.matchIgnoreCase(operation, "delete")) {
                    operationVal = 8
                }
                if (kony.sdk.mvvm.KonyApplicationContextMFAPP.getAuthProfile()) {
                    resourceName = resourceName.toLowerCase();
                    if (kony.sdk.mvvm.KonyApplicationContextMFAPP.getAuthProfile().hasOwnProperty(resourceName)) {
                        var permValue = kony.sdk.mvvm.KonyApplicationContextMFAPP.getAuthProfile()[resourceName];
                        var convertedVal = 0;
                        if (kony.sdk.mvvm.Utils.isValidNumberType(permValue)) {
                            convertedVal = parseInt(permValue, 10);
                            if (isNaN(convertedVal)) convertedVal = null
                        }
                        if (convertedVal && convertedVal !== 0) convertedVal = convertedVal & operationVal;
                        if (convertedVal === operationVal) hasPerm = true;
                        return hasPerm
                    }
                } else {
                    kony.sdk.mvvm.log.info("AUTHPROFILE is not defined for the loggedIn user ");
                    hasPerm = true
                }
                if (!hasPerm) {
                    kony.sdk.mvvm.log.info("the loggedin user does not have required permission for the operation {}", operation)
                }
                return hasPerm
            }
        },
        constructor: function(factoryObject) {
            this.formObjects = undefined;
            this.metadataStore = undefined;
            this.applicationProperties = undefined;
            this.modelObjects = {};
            this.ORMControllerObject = undefined;
            this.formControllers = {};
            this.authManager = undefined;
            this.setCredentialObj = function(obj) {
                storedCredentialObj = obj
            };
            this.getCredentialObj = function() {
                return storedCredentialObj
            };
            factoryObj = factoryObject
        },
        getAuthManager: function() {
            return this.authManager
        },
        setAuthManager: function(authManager) {
            this.authManager = authManager
        },
        getSessionToken: function() {
            return kony.sdk.mvvm.KonyApplicationContextMFAPP.getSessionToken()
        },
        setSessionToken: function(sessionToken) {
            if (IS_ONLINE === false || sessionToken !== undefined && sessionToken !== null && typeof sessionToken === "object" && sessionToken["token"] !== undefined && sessionToken["token"] !== null && sessionToken["tenant"] !== undefined && sessionToken["tenant"] !== null) {
                SESSION_TOKEN = sessionToken
            } else {
                SESSION_TOKEN = {};
                throw this.getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_SESSION_TOKEN_INVALID, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_SESSION_TOKEN_INVALID)
            }
        },
        setUserCredentialObj: function(obj) {
            this.setCredentialObj(obj)
        },
        getUserCredentialObj: function() {
            return this.getCredentialObj()
        },
        setOnlineStatus: function(isOnline) {
            IS_ONLINE = isOnline === true ? true : false
        },
        isTenantSyncEnabled: function() {
            return IS_ONLINE === false ? true : false
        },
        isAppSyncEnabled: function() {
            return IS_ONLINE === false ? true : false
        },
        getMetadataStore: function() {
            if (!this.metadataStore) this.metadataStore = this.getFactorySharedInstance().createMetadataStore();
            return this.metadataStore
        },
        getSyncManager: function() {
            if (!this.syncManager) this.syncManager = this.getFactorySharedInstance().createSyncManagerObject();
            return this.syncManager
        },
        setStartupForm: function(formid) {
            this.landingFormId = formid
        },
        getStartupForm: function() {
            return this.landingFormId
        },
        reset: function() {
            this.sessionToken = undefined;
            this.metadataStore = undefined;
            this.formObjects = undefined
        },
        setApplicationProperties: function(appProperties) {
            if (this.getApplicationProperties()) {
                var appProps = this.getApplicationProperties().getApplicationproperties();
                this.getApplicationProperties().setApplicationproperties(appProps.concat(appProperties.getApplicationproperties()))
            } else {
                this.applicationProperties = appProperties
            }
        },
        getApplicationProperties: function() {
            return this.applicationProperties
        },
        getUserAuthProfile: function() {
            return kony.sdk.mvvm.KonyApplicationContextMFAPP.getAuthProfile()
        },
        getModel: function(entityName, serviceName, options) {
            var modelName = serviceName + "." + entityName;
            if (!this.modelObjects.hasOwnProperty(modelName)) {
                this.modelObjects[modelName] = this.getFactorySharedInstance().createModelObject(this, entityName, serviceName, options)
            }
            this.modelObjects[modelName].setOptions(options);
            return this.modelObjects[modelName]
        },
        createModel: function(entityName, serviceName, options) {
            var modelName = serviceName + "." + entityName;
            if (!this.modelObjects.hasOwnProperty(modelName)) {
                this.modelObjects[modelName] = this.getFactorySharedInstance().createModelObject(this, entityName, serviceName, options)
            }
            return this.modelObjects[modelName]
        },
        getInstance: function(className, args) {
            if (className) {
                var tempClassName = className;
                eval.call(null, "var classHandler = " + tempClassName);
                if (classHandler && typeof classHandler === "function") {
                    var instance = undefined;
                    switch (className.toLowerCase()) {
                        case "kony.sdk.mvvm.persistent.ormcontrollermfapp":
                            if (!this.ORMControllerObject) {
                                this.ORMControllerObject = this.getFactorySharedInstance().createORMControllerObject(this, args)
                            }
                            instance = this.ORMControllerObject;
                            break;
                        case "kony.sdk.mvvm.model":
                            instance = this.getModel.apply(this, args);
                            break;
                        default:
                            kony.sdk.mvvm.log.info("Cannot instantiate " + className + " - unknown class");
                            break
                    }
                    return instance
                }
                kony.sdk.mvvm.log.info("Cannot instantiate " + className + " not a function")
            }
            kony.sdk.mvvm.log.info("Cannot instantiate " + className)
        },
        createInstance: function(className, args) {
            if (className) {
                var tempClassName = className;
                eval.call(null, "var classHandler = " + tempClassName);
                if (classHandler && typeof classHandler === "function") {
                    var instance = undefined;
                    switch (className.toLowerCase()) {
                        case "kony.sdk.mvvm.persistent.ormcontrollermfapp":
                            if (!this.ORMControllerObject) {
                                this.ORMControllerObject = this.getFactorySharedInstance().createORMControllerObject(this, args)
                            }
                            instance = this.ORMControllerObject;
                            break;
                        case "kony.sdk.mvvm.model":
                            instance = this.createModel.apply(this, args);
                            break;
                        default:
                            kony.sdk.mvvm.log.info("Cannot instantiate " + className + " - unknown class");
                            break
                    }
                    return instance
                }
                kony.sdk.mvvm.log.info("Cannot instantiate " + className + " not a function")
            }
            kony.sdk.mvvm.log.info("Cannot instantiate " + className)
        },
        getFormController: function(formId) {
            if (this.formControllers && this.formControllers[formId]) return this.formControllers[formId].viewController;
            else return null
        },
        getAllFormControllers: function() {
            return this.formControllers
        },
        setAllFormControllers: function(formControllers) {
            this.formControllers = formControllers
        },
        setFormController: function(formId, controller) {
            if (!this.formControllers[formId]) {
                this.formControllers[formId] = {}
            }
            this.formControllers[formId].viewController = controller
        },
        setIdentityService: function(identityservice) {
            identityService = identityservice
        },
        getIdentityService: function() {
            return identityService
        }
    }
});
kony.sdk.mvvm.AppInitServiceMangerInterface = Class({
    constructor: function() {},
    execute: function(params, successcallback, errorCallback) {}
});
kony.sdk.mvvm.AuthenticationManager = Class(kony.sdk.mvvm.BaseAuthenticationServiceManager, {
    constructor: function() {},
    authenticate: function(params, successCallback, errorCallback) {
        try {
            var appFactoryInstance = kony.sdk.mvvm.KonyApplicationContext.getFactorySharedInstance();
            var authParams = params["authParams"];
            var options = params["options"];
            var identityServiceName = params["identityServiceName"];
            var appLoginDetails = {
                authParams: authParams,
                options: options,
                identityServiceName: identityServiceName
            };
            var dataStoreObj = kony.sdk.mvvm.KonyApplicationContext.getFactorySharedInstance().createDataStoreObject();
            dataStoreObj.storeData("UserCredentials", appLoginDetails, true);
            kony.sdk.mvvm.KonyApplicationContext.getAppInstance().setUserCredentialObj(dataStoreObj);
            authenticateService()
        } catch (e) {
            kony.sdk.mvvm.log.error("Error while offline authentication: " + e.toString());
            var exception = appFactoryInstance.createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_OFFLINE_LOGIN_FAILURE, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_OFFLINE_LOGIN_FAILURE);
            errorCallback(exception)
        }

        function authenticateService() {
            var identityClient = kony.sdk.getCurrentInstance().getIdentityService(identityServiceName);
            kony.sdk.mvvm.KonyApplicationContext.getAppInstance().setIdentityService(identityClient);
            identityClient.login(authParams, authSuccess, authError)
        }

        function authSuccess() {
            var isAppSyncEnabled = options["access"] === "offline" ? true : false;
            kony.sdk.mvvm.KonyApplicationContext.getAppInstance().setOnlineStatus(!isAppSyncEnabled);
            successCallback()
        }

        function authError(err) {
            var exception = appFactoryInstance.createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_LOGIN_FAILURE, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_LOGIN_FAILURE, err);
            errorCallback(exception)
        }
    },
    saveUserDetails: function() {
        var storeObj = kony.sdk.mvvm.KonyApplicationContext.getFactorySharedInstance().createDataStoreObject();
        var credentialObj = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getUserCredentialObj().getData("UserCredentials", true);
        var authParams = credentialObj["authParams"];
        var username = authParams["userid"];
        var options = credentialObj["options"];
        var identityServiceName = credentialObj["identityServiceName"];
        var credentials_store = {};
        credentials_store[kony.sdk.mvvm.credStoreUsername] = username;
        credentials_store[kony.sdk.mvvm.credStoreOptions] = options;
        credentials_store[kony.sdk.mvvm.credStoreIdentityService] = identityServiceName;
        storeObj.storeData(kony.sdk.mvvm.credStoreName, credentials_store)
    },
    getSavedUserDetails: function() {
        var storeObj = kony.sdk.mvvm.KonyApplicationContext.getFactorySharedInstance().createDataStoreObject();
        var credentialObj = storeObj.getData(kony.sdk.mvvm.credStoreName);
        return credentialObj
    },
    execute: function(params, success, error) {
        this.authenticate(params, success, error)
    }
});
kony.sdk.mvvm.AuthManagerMF = Class(kony.sdk.mvvm.BaseAuthenticationServiceManager, {
    constructor: function() {
        var appFactoryInstance = kony.sdk.mvvm.KonyApplicationContext.getFactorySharedInstance();
        this.authenticationManager = undefined;
        if (kony.sdk.mvvm.isNetworkAvailabile()) {
            this.authenticationManager = appFactoryInstance.createAuthenticationServiceManagerObject("kony.sdk.mvvm.AuthManagerImpl")
        } else {
            var userDefinedAuthenticationManager = undefined;
            if (kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getApplicationProperties()) userDefinedAuthenticationManager = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getApplicationProperties().getApplicationPropertiesByKey("OfflineAuthenticationManager");
            if (userDefinedAuthenticationManager) this.authenticationManager = appFactoryInstance.createAuthenticationServiceManagerObject(userDefinedAuthenticationManager);
            else this.authenticationManager = appFactoryInstance.createAuthenticationServiceManagerObject("kony.sdk.mvvm.AuthManagerImpl")
        }
    },
    authenticate: function(params, successCallback, errorCallback) {
        this.authenticationManager.authenticate(params, successCallback, errorCallback)
    },
    saveUserDetails: function() {
        this.authenticationManager.saveUserDetails()
    },
    getSavedUserDetails: function() {
        this.authenticationManager.getSavedUserDetails()
    },
    execute: function(params, success, error) {
        this.authenticationManager.execute(params, success, error)
    }
});
kony.sdk.mvvm.AuthManagerImpl = Class(kony.sdk.mvvm.BaseAuthenticationServiceManager, {
    constructor: function() {
        var appFactoryInstance = kony.sdk.mvvm.KonyApplicationContext.getFactorySharedInstance();
        this.authenticationManager = appFactoryInstance.createAuthenticationServiceManagerObject("kony.sdk.mvvm.AuthenticationManager")
    },
    authenticate: function(params, successCallback, errorCallback) {
        this.authenticationManager.authenticate(params, successCallback, errorCallback)
    },
    saveUserDetails: function() {
        this.authenticationManager.saveUserDetails()
    },
    getSavedUserDetails: function() {
        return this.authenticationManager.getSavedUserDetails()
    },
    execute: function(params, success, error) {
        kony.sdk.mvvm.KonyApplicationContext.showLoadingScreen("Authenticating");
        this.authenticationManager.execute(params, successCallback, errorCallback);

        function successCallback(res) {
            kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
            success(res)
        }

        function errorCallback(err) {
            kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
            error(err)
        }
    }
});
kony.sdk.mvvm.BaseAuthenticationServiceManager = Class(kony.sdk.mvvm.AppInitServiceMangerInterface, {
    constructor: function() {},
    authenticate: function(params, successCallback, errorCallback) {},
    saveUserDetails: function() {},
    getSavedUserDetails: function() {},
    execute: function(params, success, error) {}
});
kony = kony || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.v2 = kony.sdk.mvvm.v2 || {};
kony.sdk.mvvm.BaseFormController = Class({
    constructor: function(applicationContext, config) {
        var application = applicationContext;
        var modelConfig = config;
        var formModel = undefined;
        var contextData = undefined;
        var controllerExtensionObject = undefined;
        this.getControllerExtensionObject = function() {
            return controllerExtensionObject
        };
        this.setControllerExtensionObject = function(controllerExtension) {
            controllerExtensionObject = controllerExtension
        };
        this.getContextData = function() {
            return contextData
        };
        this.setContextData = function(contextdata) {
            contextData = contextdata
        };
        this.getFormModel = function() {
            return formModel
        };
        this.setFormModel = function(formmodel) {
            if (formmodel) {
                formModel = formmodel
            }
        };
        this.getConfig = function() {
            return modelConfig
        };
        this.getApplicationContext = function() {
            return application
        }
    },
    fetchData: function() {
        try {
            if (this.getControllerExtensionObject()) {
                this.getControllerExtensionObject().fetchData()
            }
        } catch (err) {
            kony.sdk.mvvm.log.error("Error in controller fetch data " + err);
            throw this.getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_FETCH_IN_CONTROLLER, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_FETCH_IN_CONTROLLER, err)
        }
    },
    processData: function(data) {
        var processedData = null;
        try {
            if (this.getControllerExtensionObject()) {
                processedData = this.getControllerExtensionObject().processData(data)
            }
        } catch (err) {
            kony.sdk.mvvm.log.error("Error in controller format data ", err);
            throw this.getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_FORMATDATA_IN_CONTROLLER, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_FORMATDATA_IN_CONTROLLER, err)
        }
        return processedData
    },
    bindData: function(data) {
        try {
            if (this.getControllerExtensionObject()) {
                this.getControllerExtensionObject().bindData(data)
            }
        } catch (err) {
            kony.sdk.mvvm.log.error("Error in controller bind data ", err);
            throw this.getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_BIND_IN_CONTROLLER, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_BIND_IN_CONTROLLER, err)
        }
    },
    saveData: function() {
        try {
            if (this.getControllerExtensionObject()) {
                this.getControllerExtensionObject().saveData()
            }
        } catch (err) {
            kony.sdk.mvvm.log.error("Error in controller save data ", err);
            throw this.getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_SAVE_IN_CONTROLLER, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_SAVE_IN_CONTROLLER, err)
        }
    },
    deleteData: function() {
        try {
            if (this.getControllerExtensionObject()) {
                this.getControllerExtensionObject().deleteData()
            }
        } catch (err) {
            kony.sdk.mvvm.log.error("Error in controller delete data ", err);
            throw this.getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_DELETE_IN_CONTROLLER, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_DELETE_IN_CONTROLLER, err)
        }
    },
    getModel: function(entityName, serviceName, options) {
        try {
            return this.getApplicationContext().getModel(entityName, serviceName, options)
        } catch (e) {
            kony.sdk.mvvm.log.error("Error in getting entity controller");
            throw this.getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_GETTING_ENTITY_CONTROLLER, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_GETTING_ENTITY_CONTROLLER, e)
        }
    },
    getApplicationEntityMetaData: function(entityName, serviceName, options) {
        try {
            return this.getApplicationContext().getMetadataStore().getEntityMetadata(entityName, serviceName, options)
        } catch (e) {
            kony.sdk.mvvm.log.error("Error in getting applicationEntity metadata");
            throw this.getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_GETTING_ENTITY_METADATA, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_GETTING_ENTITY_METADATA, e)
        }
    },
    loadDataAndShowForm: function(contextData) {
        try {
            this.setContextData(contextData);
            this.fetchData()
        } catch (err) {
            kony.sdk.mvvm.log.error("Error in controller load and show form : " + err);
            throw this.getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_LOADDATA_SHOWFORM_CONTROLLER, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_LOADDATA_SHOWFORM_CONTROLLER, err)
        }
    },
    refreshFormData: function() {},
    getDataAsPerType: function(val, srcDataType, destDataType, entityName, fieldName, serviceName, options) {
        var scopeObj = this;
        var convertedVal = val;
        srcDataType = srcDataType.toLowerCase();
        destDataType = destDataType.toLowerCase();

        function getConvertedVal(srcDataTypeArg, destDataTypeArg, inputVal, isFetchViewData) {
            var resultVal;
            if (destDataTypeArg === "segment") {
                resultVal = inputVal;
                return resultVal
            }
            switch (srcDataTypeArg) {
                case "picklist":
                    if (!isFetchViewData) {
                        var pickListValues = scopeObj.getModel(entityName).getFieldPickListValues(fieldName, serviceName, options);
                        var label = kony.sdk.mvvm.Utils.getPicklistLabel(inputVal, pickListValues);
                        if (label !== undefined && label !== null) {
                            resultVal = label
                        } else {
                            kony.sdk.mvvm.log.error("Error fetching picklist data for field " + fieldName + "***error*** ", "picklist values donot contain value : " + inputVal);
                            resultVal = "-NA-"
                        }
                    }
                    break;
                case "string":
                case "varchar":
                case "picklistmultiselect":
                case "extendedfield":
                    resultVal = String(inputVal);
                    break;
                case "int2":
                case "int8":
                case "integer":
                case "serial":
                    if (kony.sdk.mvvm.Utils.isValidNumberType(inputVal)) {
                        resultVal = parseInt(inputVal, 10);
                        if (isNaN(resultVal)) resultVal = null
                    }
                    break;
                case "number":
                    if (kony.sdk.mvvm.Utils.isValidNumberType(inputVal)) {
                        resultVal = Number(inputVal);
                        if (isNaN(resultVal)) resultVal = null
                    }
                    break;
                case "boolean":
                    resultVal = String(typeof val === "string" ? val === "true" ? true : false : new Boolean(inputVal));
                    break;
                case "date":
                case "timestamp":
                    if (destDataType === "calendar") {
                        resultVal = new Date(inputVal)
                    } else {
                        resultVal = String(inputVal)
                    }
                    break;
                case "label":
                case "textbox":
                case "textarea":
                case "textarea2":
                case "textfield":
                case "textbox2":
                case "button":
                case "link":
                case "switch":
                case "slider":
                case "phone":
                case "richtext":
                    getConvertedVal(destDataTypeArg, srcDataTypeArg, inputVal, true);
                    break;
                case "calendar":
                    if (destDataTypeArg === "date") {
                        resultVal = kony.sdk.mvvm.Util.formatDate(inputVal)
                    } else {
                        resultVal = kony.sdk.mvvm.Util.formatTimeStamp(inputVal)
                    }
                    break
            }
            return resultVal
        }
        try {
            return getConvertedVal(srcDataType, destDataType, convertedVal)
        } catch (e) {
            kony.sdk.mvvm.log.error("Error getting converted value ", e)
        }
    },
    performAction: function(actionName, argsArray) {
        try {
            if (this.getControllerExtensionObject() && this.getControllerExtensionObject()[actionName] && typeof this.getControllerExtensionObject()[actionName] === "function") {
                return this.getControllerExtensionObject()[actionName].apply(this.getControllerExtensionObject(), argsArray)
            } else if (this[actionName] && typeof this[actionName] === "function") {
                return this[actionName].apply(this, argsArray)
            } else {
                kony.sdk.mvvm.log.error("no action found in controller for actionname : " + actionName);
                throw this.getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_ACTION_NOT_FOUND_IN_CONTROLLER, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_ACTION_NOT_FOUND_IN_CONTROLLER + " - " + actionName)
            }
        } catch (err) {
            throw err
        }
    },
    showForm: function() {
        try {
            if (this.getControllerExtensionObject()) {
                this.getControllerExtensionObject().showForm()
            }
        } catch (err) {
            kony.sdk.mvvm.log.error("Error in controller delete data ", err);
            throw this.getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_DELETE_IN_CONTROLLER, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_DELETE_IN_CONTROLLER, err)
        }
    }
});
kony = kony || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.BaseFormControllerExtension = Class({
    constructor: function(controllerObj) {
        var controller = controllerObj;
        var ORMController = undefined;
        var groupWidgetsContext = undefined;
        var containerRecords = {};
        var formWidgetsData = {};
        this.getController = function() {
            return controller
        };
        this.getContainerRecord = function(prop) {
            return containerRecords[prop]
        };
        this.setContainerRecord = function(prop, data) {
            containerRecords[prop] = data
        };
        this.getWidgetData = function(prop) {
            return containerRecords[prop]
        };
        this.setWidgetData = function(prop, data) {
            containerRecords[prop] = data
        };
        this.getORMController = function() {
            if (!ORMController) {
                var configOptions = controller.getConfig().getObjectServiceOptions();
                var appFactoryInstance = controller.getApplicationContext().getFactorySharedInstance();
                ORMController = appFactoryInstance.createORMControllerObject(controller.getApplicationContext(), configOptions)
            }
            return ORMController
        };
        this.setGroupWidgetsContext = function(groupContext) {
            groupWidgetsContext = groupContext
        };
        this.getGroupWidgetsContext = function() {
            if (!groupWidgetsContext) {
                groupWidgetsContext = this.createGroupWidgetsContext()
            }
            return groupWidgetsContext
        };
        this.createGroupWidgetsContext = function() {
            var isOnline = function() {
                var configOptions = controller.getConfig().getObjectServiceOptions();
                if (configOptions && configOptions.hasOwnProperty("access") && configOptions.access === "offline") {
                    return false
                }
                return true
            };
            var appFactoryInstance = controller.getApplicationContext().getFactorySharedInstance();
            if (isOnline()) groupWidgetsContext = appFactoryInstance.createGroupWidgetsContextOnline(controller.getConfig(), controller.getContextData());
            else groupWidgetsContext = appFactoryInstance.createGroupWidgetsContextOffline(controller.getConfig(), controller.getContextData());
            return groupWidgetsContext
        };
        this.getRecordsDataMap = function(isDelete) {
            try {
                var scopeObj = this;

                function setDataFromContext(containerName, entityName, recordObject, containerConfig) {
                    var contextData = scopeObj.getController().getContextData();
                    if (contextData) {
                        var dataModel = contextData.getDataModel(containerName);
                        var primaryKeyValueMap = dataModel && dataModel.getPrimaryKeyValueMap();
                        for (var key in primaryKeyValueMap) {
                            recordObject.set(key, primaryKeyValueMap[key])
                        }
                        var operationType = contextData.getOperationType(containerName);
                        recordObject.setInfo("operation", operationType);
                        var requestOptions = containerConfig && containerConfig.getRequestOptions();
                        requestOptions = contextData.getRequestOptions(containerName) || requestOptions;
                        recordObject.setInfo("requestOptions", requestOptions);
                        var contextDataDataMap = dataModel && dataModel.getEntityDataMap(entityName);
                        if (contextDataDataMap) {
                            for (var column in contextDataDataMap) {
                                recordObject.set(column, contextDataDataMap[column])
                            }
                        }
                    }
                }

                function setDataFromWidgets(widgets, modelObj, recordObject) {
                    var formmodel = scopeObj.getController().getFormModel();
                    for (var widget in widgets) {
                        if (widgets[widget].isComputedField()) {
                            continue
                        }
                        var fieldValue = formmodel.getWidgetData(widget);
                        if (fieldValue instanceof kony.sdk.mvvm.Data) {
                            fieldValue = fieldValue.getData()
                        }
                        var fieldName = widgets[widget].getField()[0];
                        var fieldNameArray = fieldName.split(".");
                        var aliasName = fieldNameArray[fieldNameArray.length - 1];
                        var fieldType = null;
                        if (modelObj.getColumnInfo(aliasName)) {
                            fieldType = modelObj.getValueForColumnProperty(aliasName, "type")
                        }
                        if (fieldType === "picklist") {
                            var picklistVals = modelObj.getFieldPickListValues(aliasName);
                            for (var val in picklistVals) {
                                if (picklistVals[val].getValue().toString() === fieldValue.toString()) {
                                    recordObject.set(aliasName, picklistVals[val]);
                                    break
                                }
                            }
                        } else {
                            recordObject.set(aliasName, fieldValue)
                        }
                    }
                }

                function setDataFromSegment(widget) {
                    var segmentData = [];
                    var formmodel = scopeObj.getController().getFormModel();
                    var config = scopeObj.getController().getConfig();
                    var entityName = widget.getWidgetEntity();
                    var serviceName = config.getObjectServiceName();
                    var options = config.getObjectServiceOptions();
                    if (widget.isComputedField()) {
                        return segmentData
                    }
                    var fieldValue = formmodel.getWidgetData(widget.getWidgetId());
                    if (fieldValue instanceof kony.sdk.mvvm.Data) {
                        fieldValue = fieldValue.getData()
                    }
                    if (fieldValue !== null && fieldValue !== undefined) {
                        for (var indx in fieldValue) {
                            var recordObject = new kony.sdk.mvvm.persistent.Record(entityName);
                            recordObject.setInfo("serviceName", serviceName);
                            recordObject.setInfo("options", options);
                            recordObject.setInfo("operation", kony.sdk.mvvm.OperationType.ADD);
                            for (var column in fieldValue[indx]) {
                                recordObject.set(column, fieldValue[indx][column])
                            }
                            segmentData.push(recordObject)
                        }
                    }
                    return segmentData
                }

                function getSegmentRecordsArray(widget) {
                    var segmentRecords = [];
                    var widgetId = widget.getWidgetId();
                    var widgetType = widget.getWidgetType();
                    if (widgetType && widgetType.toLowerCase() === "segment") {
                        var contextData = scopeObj.getController().getContextData();
                        if (contextData) {
                            var operation = contextData.getOperationType(widgetId);
                            if (operation && operation === kony.sdk.mvvm.OperationType.ADD) {
                                var segmentData = setDataFromSegment(widget);
                                segmentRecords = segmentData || []
                            }
                        }
                    }
                    return segmentRecords
                }

                function prepareRecordsDataMap(entityDef) {
                    var dataMapDefArray = [];
                    for (var containerName in entityDef) {
                        var widgets = entityDef[containerName]["widgets"];
                        if (!widgets || widgets.length == 0) {
                            continue
                        }
                        var entityName = entityDef[containerName]["entityName"];
                        var configObj = scopeObj.getController().getConfig();
                        var widgetNames = Object.keys(widgets);
                        if (widgetNames && widgetNames.length === 1 && widgets[widgetNames[0]].isDataWidget()) {
                            if (!isDelete) {
                                var segmentRecords = getSegmentRecordsArray(widgets[widgetNames[0]]) || [];
                                dataMapDefArray = dataMapDefArray.concat(segmentRecords)
                            }
                            continue
                        }
                        var recordObject = new kony.sdk.mvvm.persistent.Record(entityName);
                        recordObject.setInfo("serviceName", configObj.getObjectServiceName());
                        recordObject.setInfo("options", configObj.getObjectServiceOptions());
                        var modelObj = scopeObj.getController().getModel(entityName, configObj.getObjectServiceName(), configObj.getObjectServiceOptions());
                        setDataFromContext(containerName, entityName, recordObject, entityDef[containerName]["config"]);
                        setDataFromWidgets(widgets, modelObj, recordObject);
                        var childDataMapDef = prepareRecordsDataMap(entityDef[containerName]["child"]);
                        for (var indx in childDataMapDef) {
                            var child = childDataMapDef[indx].getInfo("entity");
                            var childarray;
                            if (recordObject.hasOwnProperty(child)) {
                                childarray = recordObject.get(child);
                                childarray.push(childDataMapDef[indx]);
                                recordObject.set(child, childarray)
                            } else {
                                childarray = [];
                                childarray.push(childDataMapDef[indx]);
                                recordObject.set(child, childarray)
                            }
                        }
                        dataMapDefArray.push(recordObject)
                    }
                    return dataMapDefArray
                }
                var config = this.getController().getConfig();
                var formEntityDefinition = config.getWidgetHierarchyMap();
                var recordsDataMap = prepareRecordsDataMap(formEntityDefinition);
                kony.sdk.mvvm.log.info("Prepared recordsDataMap is : ", recordsDataMap);
                return recordsDataMap
            } catch (error) {
                kony.sdk.mvvm.log.error("Error in prepare entity data map : ", error)
            }
        }
    },
    fetchData: function(successCallback, errorCallback) {
        try {
            var appFactoryInstance = this.getController().getApplicationContext().getFactorySharedInstance();
            if (typeof successCallback !== "function" || typeof errorCallback !== "function") throw appFactoryInstance.createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_CALLBACK_NOT_A_FUNCTION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_CALLBACK_NOT_A_FUNCTION);
            var scopeObj = this;
            var groupContext = this.createGroupWidgetsContext();
            var groupWidgets = groupContext.getFetchWidgetList() || [];
            var indx = 0;
            var responseDataMap = {};
            fetchDataForWidgetGroup();

            function fetchDataForWidgetGroup() {
                if (indx >= groupWidgets.length) {
                    successCallback.call(scopeObj, responseDataMap);
                    return
                }
                groupContext.fetchDataForGroupWidget(groupWidgets[indx], sucCallback, errCallback);

                function sucCallback(response) {
                    for (var widgetId in response) {
                        if (widgetId === "_raw_response_") {
                            var rawResponse = response[widgetId];
                            responseDataMap["_raw_response_"] = responseDataMap["_raw_response_"] || {};
                            for (var widget in rawResponse) {
                                responseDataMap["_raw_response_"][widget] = rawResponse[widget]
                            }
                        } else {
                            responseDataMap[widgetId] = response[widgetId];
                            scopeObj.setContainerRecord(widgetId, response[widgetId])
                        }
                    }
                    indx++;
                    fetchDataForWidgetGroup()
                }

                function errCallback(error) {
                    kony.sdk.mvvm.log.error("Error in perform fetch data for widget : " + groupWidgets[indx], error);
                    errorCallback(error)
                }
            }
        } catch (err) {
            var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_FETCH_IN_BASE_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_FETCH_IN_BASE_CONTROLLER_EXTENSION, err);
            errorCallback(exception)
        }
    },
    processData: function(data) {
        if (data instanceof Array) {
            var groupContext = this.createGroupWidgetsContext();
            var groupWidgets = groupContext.getFetchWidgetList() || [];
            var result = {};
            if (groupWidgets.length === 1) {
                var groupWidgetId = groupWidgets[0];
                result[groupWidgetId] = data;
                data = result
            }
        }
        for (var widgetGroupId in data) {
            var widgetContext = this.getGroupWidgetsContext().getWidgetContext(widgetGroupId);
            if (widgetContext && widgetContext["resultProcessor"]) {
                var widgetResultProcessor = widgetContext["resultProcessor"];
                data[widgetGroupId] = widgetResultProcessor.process(data[widgetGroupId], widgetContext)
            } else kony.sdk.mvvm.log.error("Error in process data : ResultProcessor undefined")
        }
        return data
    },
    bindData: function(data) {
        try {
            var scopeObj = this;
            var formmodel = scopeObj.getController().getFormModel();
            for (var widgetGroupId in data) {
                var widgetContext = this.getGroupWidgetsContext().getWidgetContext(widgetGroupId);
                var widgetData = data[widgetGroupId];
                if (widgetData && widgetContext && widgetContext["widgets"]) {
                    var widgets = Object.keys(widgetContext["widgets"]);
                    for (var indx in widgets) {
                        formmodel.setWidgetData(widgets[indx], widgetData[widgets[indx]]);
                        scopeObj.setWidgetData(widgets[indx], widgetData[widgets[indx]])
                    }
                }
            }
        } catch (err) {
            var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_BIND_IN_BASE_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_BIND_IN_BASE_CONTROLLER_EXTENSION, err);
            throw exception
        }
    },
    saveData: function(successCallback, errorCallback) {
        try {
            var scopeObj = this;
            var groupWidgetsContext = this.getGroupWidgetsContext();
            var recordsDataMap = scopeObj.getRecordsDataMap();
            var dataMaplen = recordsDataMap.length;
            if (dataMaplen >= 1) {
                groupWidgetsContext.saveRecords(recordsDataMap, sucCallback, errCallback)
            } else {
                return
            }

            function sucCallback(response) {
                successCallback.call(scopeObj, response)
            }

            function errCallback(err) {
                errorCallback.call(scopeObj, err)
            }
        } catch (error) {
            kony.sdk.mvvm.log.error("Error in save data : ", error);
            var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_SAVE_IN_BASE_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_SAVE_IN_BASE_CONTROLLER_EXTENSION, error);
            errorCallback(exception)
        }
    },
    deleteData: function(successCallback, errorCallback) {
        try {
            var scopeObj = this;
            var groupWidgetsContext = this.getGroupWidgetsContext();
            var recordsDataMap = scopeObj.getRecordsDataMap(true);
            var dataMaplen = recordsDataMap.length;
            if (dataMaplen >= 1) {
                groupWidgetsContext.removeRecords(recordsDataMap, sucCallback, errCallback)
            } else {
                return
            }

            function sucCallback(response) {
                successCallback.call(scopeObj, response)
            }

            function errCallback(err) {
                errorCallback.call(scopeObj, err)
            }
        } catch (error) {
            kony.sdk.mvvm.log.error("Error in delete data : ", error);
            var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_DELETE_IN_BASE_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_DELETE_IN_BASE_CONTROLLER_EXTENSION, error);
            errorCallback(exception)
        }
    },
    saveRecord: function(record, successCallback, errorCallback) {
        try {
            var scopeObj = this;
            var groupWidgetsContext = this.getGroupWidgetsContext();
            groupWidgetsContext.saveRecord(record, sucCallback, errCallback);

            function sucCallback(response) {
                successCallback.call(scopeObj, response)
            }

            function errCallback(err) {
                errorCallback.call(scopeObj, err)
            }
        } catch (error) {
            kony.sdk.mvvm.log.error("Error in save record : ", error);
            var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_SAVE_IN_BASE_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_SAVE_IN_BASE_CONTROLLER_EXTENSION, error);
            errorCallback(exception)
        }
    },
    saveRecords: function(records, successCallback, errorCallback) {
        try {
            var scopeObj = this;
            var groupWidgetsContext = this.getGroupWidgetsContext();
            groupWidgetsContext.saveRecords(records, sucCallback, errCallback);

            function sucCallback(response) {
                successCallback.call(scopeObj, response)
            }

            function errCallback(err) {
                errorCallback.call(scopeObj, err)
            }
        } catch (error) {
            kony.sdk.mvvm.log.error("Error in save records : ", error);
            var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_SAVE_IN_BASE_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_SAVE_IN_BASE_CONTROLLER_EXTENSION, error);
            errorCallback(exception)
        }
    },
    removeRecord: function(record, successCallback, errorCallback) {
        try {
            var scopeObj = this;
            var groupWidgetsContext = this.getGroupWidgetsContext();
            groupWidgetsContext.removeRecord(record, sucCallback, errCallback);

            function sucCallback(response) {
                successCallback.call(scopeObj, response)
            }

            function errCallback(err) {
                errorCallback.call(scopeObj, err)
            }
        } catch (error) {
            kony.sdk.mvvm.log.error("Error in delete record : ", error);
            var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_DELETE_IN_BASE_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_DELETE_IN_BASE_CONTROLLER_EXTENSION, error);
            errorCallback(exception)
        }
    },
    removeRecords: function(records, successCallback, errorCallback) {
        try {
            var scopeObj = this;
            var groupWidgetsContext = this.getGroupWidgetsContext();
            groupWidgetsContext.removeRecords(records, sucCallback, errCallback);

            function sucCallback(response) {
                successCallback.call(scopeObj, response)
            }

            function errCallback(err) {
                errorCallback.call(scopeObj, err)
            }
        } catch (error) {
            kony.sdk.mvvm.log.error("Error in delete records : ", error);
            var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_DELETE_IN_BASE_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_DELETE_IN_BASE_CONTROLLER_EXTENSION, error);
            errorCallback(exception)
        }
    },
    generateRecords: function(isDelete) {
        try {
            var scopeObj = this;
            var records = scopeObj.getRecordsDataMap(isDelete);
            return records
        } catch (error) {
            kony.sdk.mvvm.log.error("Error in generating records : ", error);
            var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_GENERATE_RECORDS_IN_BASE_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_GENERATE_RECORDS_IN_BASE_CONTROLLER_EXTENSION, error);
            throw exception
        }
    }
});
kony = kony || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.v2 = kony.sdk.mvvm.v2 || {};
kony.sdk.mvvm.BaseFormModel = Class({
    constructor: function(controller) {
        var formModelProperties = {};
        var observerViews = {};
        var modelConfig = controller.getConfig() || {};
        controller.setFormModel(this);
        var formModelExt;
        var view = controller.getApplicationContext().getFactorySharedInstance().createViewObject(modelConfig);
        this.getFormModelExtensionObj = function() {
            return formModelExt
        };
        this.setFormModelExtensionObj = function(formModelExtObj) {
            formModelExt = formModelExtObj
        };
        this.getObserverViews = function() {
            return observerViews
        };
        this.registerObserver = function(observer) {
            observerViews[observer.getConfig().getFormId()] = observer
        };
        this.removeObserver = function(observer) {
            observerViews[observer.getConfig().getFormId()] = undefined
        };
        this.getConfig = function() {
            return modelConfig
        };
        this.getView = function() {
            return view
        };
        this.getController = function() {
            return controller
        };
        this.getFormModelProperties = function() {
            return formModelProperties
        };
        this.getFormModelProperty = function(formModelPropertyName) {
            return formModelProperties[formModelPropertyName]
        };
        this.setFormModelProperty = function(formModelPropertyName, data) {
            formModelProperties[formModelPropertyName] = data
        };
        this.clearFormModelProperties = function() {
            formModelProperties = {}
        };
        this.initializeFormModelProperties = function(view) {
            try {
                var widgets = view.getConfig().getWidgets();
                for (var widgetId in widgets) {
                    if (view.getKonyWidget(widgetId)) {
                        this.getWidgetData(widgetId)
                    }
                }
            } catch (err) {
                kony.sdk.mvvm.log.error("error in initialize form model properties : " + err);
                throw controller.getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_FORMMODEL_PROPERTIES_INIT, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_FORMMODEL_PROPERTIES_INIT, err)
            }
        };
        this.registerObserver(view);
        this.initializeFormModelProperties(view)
    },
    notifyObservers: function(formModelPropertyName) {
        try {
            var data = this.getFormModelProperty(formModelPropertyName);
            if (!(data instanceof kony.sdk.mvvm.Data)) {
                data = this.getController().getApplicationContext().getFactorySharedInstance().createDataObject(data)
            }
            for (var key in this.getObserverViews()) {
                this.getObserverViews()[key].update(formModelPropertyName, data.clone())
            }
        } catch (err) {
            kony.sdk.mvvm.log.error("error in form model notify view observer : " + err);
            throw this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_NOTIFYING_OBSERVERS, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_NOTIFYING_OBSERVERS, err)
        }
    },
    getWidgetData: function(formModelPropertyName) {
        try {
            var viewdata = this.getView().getDataFromWidget(formModelPropertyName);
            this.setFormModelProperty(formModelPropertyName, viewdata.clone());
            return this.getFormModelProperty(formModelPropertyName)
        } catch (err) {
            kony.sdk.mvvm.log.error("error in form model get property data :" + err);
            throw this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_GET_WIDGET_DATA_FORMMODEL, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_GET_WIDGET_DATA_FORMMODEL, err)
        }
    },
    setWidgetData: function(formModelPropertyName, data, doNotNotify) {
        try {
            if (!(data instanceof kony.sdk.mvvm.Data)) {
                data = this.getController().getApplicationContext().getFactorySharedInstance().createDataObject(data)
            }
            this.setFormModelProperty(formModelPropertyName, data);
            if (!doNotNotify) {
                this.notifyObservers(formModelPropertyName)
            }
        } catch (err) {
            kony.sdk.mvvm.log.error("error in form model set property data :" + err);
            throw this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_SET_WIDGET_DATA_FORMMODEL, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_SET_WIDGET_DATA_FORMMODEL, err)
        }
    },
    isPropertyValueChanged: function(formModelPropertyName) {
        try {
            return this.getView().isWidgetValueChanged(formModelPropertyName, this.getFormModelProperty(formModelPropertyName))
        } catch (err) {
            kony.sdk.mvvm.log.error("error in form model property value change :" + err);
            throw this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_FORMMODEL_PROPERTY_VALUE_CHANGED, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_FORMMODEL_PROPERTY_VALUE_CHANGED, err)
        }
    },
    clear: function() {
        kony.sdk.mvvm.log.info("inside form model clear");
        try {
            this.clearFormModelProperties();
            for (var key in this.getObserverViews()) {
                this.getObserverViews()[key].clear();
                this.initializeFormModelProperties(this.getObserverViews()[key])
            }
        } catch (err) {
            kony.sdk.mvvm.log.error("error in clear view observers.." + err);
            throw this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_FORMMODEL_CLEAR, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_FORMMODEL_CLEAR, err)
        }
    },
    destroy: function() {
        try {
            this.clearFormModelProperties();
            modelConfig = null;
            for (var key in this.getObserverViews()) {
                this.getObserverViews()[key].destroy()
            }
            kony.sdk.mvvm.log.info("Destroying FormModel end ")
        } catch (err) {
            kony.sdk.mvvm.log.error("error in form model destroy : " + err);
            throw this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_FORMMODEL_DESTROY, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_FORMMODEL_DESTROY, err)
        }
    },
    update: function(widgetArray) {
        try {
            var data;
            if (!widgetArray) {
                widgetArray = this.getConfig().getWidgetNames()
            }
            for (var index in widgetArray) {
                data = this.getFormModelProperty(widgetArray[index]);
                for (var key in this.getObserverViews()) {
                    this.getObserverViews()[key].update(widgetArray[index], data.clone())
                }
            }
        } catch (err) {
            kony.sdk.mvvm.log.error("error in form model update view observer : " + err);
            throw this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_FORMMODEL_UPDATE, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_FORMMODEL_UPDATE, err)
        }
    },
    showView: function() {
        try {
            this.getView().showform()
        } catch (err) {
            kony.sdk.mvvm.log.error("error in form model show form : " + err);
            throw kony.sdk.mvvm.KonyApplicationContext.getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_FORMMODEL_SHOWVIEW, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_FORMMODEL_SHOWVIEW, err)
        }
    },
    setMasterDataByProperty: function(masterData, formModelPropertyName) {
        try {
            for (var key in this.getObserverViews()) {
                this.getObserverViews()[key].updateMasterData(masterData, formModelPropertyName)
            }
        } catch (err) {
            kony.sdk.mvvm.log.error("error in form model set property master data :" + err);
            throw kony.sdk.mvvm.KonyApplicationContext.getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_FORMMODEL_SET_MASTERDATA, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_FORMMODEL_SET_MASTERDATA, err)
        }
    },
    getMasterDataByProperty: function(formModelPropertyName) {
        try {
            return this.getView().getMasterDataFromWidget(formModelPropertyName)
        } catch (err) {
            kony.sdk.mvvm.log.error("error in form model get property master data :" + err);
            throw kony.sdk.mvvm.KonyApplicationContext.getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_FORMMODEL_GET_MASTERDATA, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_FORMMODEL_GET_MASTERDATA, err)
        }
    },
    setViewAttributeByProperty: function(formModelPropertyName, attributeName, attributeVal) {
        try {
            this.getView().setAttributeByProperty(formModelPropertyName, attributeName, attributeVal)
        } catch (err) {
            kony.sdk.mvvm.log.error("error in form model set property view attribute :" + err);
            throw kony.sdk.mvvm.KonyApplicationContext.getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_FORMMODEL_SET_VIEW_ATTRIBUTE, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_FORMMODEL_SET_VIEW_ATTRIBUTE, err)
        }
    },
    getViewAttributeByProperty: function(formModelPropertyName, attributeName) {
        try {
            var attributeVal = this.getView().getAttributeByProperty(formModelPropertyName, attributeName);
            return attributeVal
        } catch (err) {
            kony.sdk.mvvm.log.error("error in form model get property view attribute :" + err);
            throw kony.sdk.mvvm.KonyApplicationContext.getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_FORMMODEL_GET_VIEW_ATTRIBUTE, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_FORMMODEL_GET_VIEW_ATTRIBUTE, err)
        }
    },
    performActionOnView: function(formModelPropertyName, actionName, argsArray) {
        try {
            return this.getView().performAction(formModelPropertyName, actionName, argsArray)
        } catch (err) {
            kony.sdk.mvvm.log.error("error in form model execute property view method :" + err);
            throw kony.sdk.mvvm.KonyApplicationContext.getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_FORMMODEL_PERFORM_ACTION_ONVIEW, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_FORMMODEL_PERFORM_ACTION_ONVIEW, err)
        }
    },
    performAction: function(actionName, argsArray) {
        try {
            if (this[actionName] && typeof this[actionName] === "function") {
                return this[actionName].apply(this, argsArray)
            } else {
                kony.sdk.mvvm.log.error("no action found in form model for actionname : " + actionName)
            }
        } catch (err) {
            kony.sdk.mvvm.log.error("error in form model perform action : " + err);
            throw kony.sdk.mvvm.KonyApplicationContext.getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_FORMMODEL_PERFORM_ACTION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_FORMMODEL_PERFORM_ACTION, err);
        }
    },
    getForm: function() {
        return this.getView().konyform
    },
    formatUI: function() {
        return this.getFormModelExtensionObj().formatUI()
    }
});
kony = kony || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.v2 = kony.sdk.mvvm.v2 || {};
kony.sdk.mvvm.BaseModel = Class({
    constructor: function(applicationContext, entityMetaData, configOptions) {
        var appContext = applicationContext;
        var entityMetadata = entityMetaData;
        var fields = entityMetaData.fields;
        var columnsMap = entityMetaData.columnsMap;
        var relatedEntities = entityMetaData.relatedEntities;
        var entityDefinition = undefined;
        var controllerExtensionObject = undefined;
        var serviceName = configOptions.serviceName;
        var options = configOptions.options;
        this.getServiceName = function() {
            return serviceName
        }, this.setServiceName = function(serviceNameVal) {
            serviceName = serviceNameVal
        }, this.getOptions = function() {
            return options
        }, this.setOptions = function(optionsObj) {
            options = optionsObj
        }, this.getObjectService = function() {
            return this.getApplicationContext().getObjectService(this.getOptions(), this.getServiceName())
        }, this.getControllerExtensionObject = function() {
            return controllerExtensionObject
        };
        this.setControllerExtensionObject = function(controllerExtension) {
            controllerExtensionObject = controllerExtension
        };
        this.getApplicationContext = function() {
            return appContext
        };
        this.getEntityMetaData = function() {
            return entityMetadata
        };
        this.getFields = function() {
            return fields
        };
        this.getColumnsMap = function() {
            return columnsMap
        };
        this.getRelatedEntities = function() {
            return relatedEntities
        };
        this.getAccessType = function() {
            if (options && options.hasOwnProperty("access") && options.access === "offline") return "offline";
            else return "online"
        };
        this.getDataObjectOnline = function(columnNames, dataModel) {
            var entityName = this.getValueForProperty("name");
            var self = this;
            var columnNamesString = "*";
            var primaryKeyColumns = this.getValueForProperty("primaryKey");
            for (var i = 0; i < primaryKeyColumns.length; i++) {
                if (columnNames.indexOf(primaryKeyColumns[i]) === -1) {
                    columnNames.push(primaryKeyColumns[i])
                }
            }
            for (var column in columnNames) {
                if (columnNamesString === "*") {
                    columnNamesString = columnNames[column]
                } else {
                    columnNamesString = columnNamesString + "," + columnNames[column]
                }
            }
            var queryStr = "$select=" + columnNamesString;
            kony.sdk.mvvm.log.info("columnNamesString : " + columnNamesString);
            if (dataModel) {
                kony.sdk.mvvm.log.info("DataModel object --> ", dataModel);
                var primaryKeyValueMap = dataModel.getPrimaryKeyValueMap();
                if (primaryKeyValueMap) {
                    queryStr = queryStr.concat("&$filter=");
                    var primaryKeyValuesArr = Object.keys(primaryKeyValueMap);
                    for (var j = 1; j < primaryKeyValuesArr.length; j++) {
                        queryStr = queryStr.concat(primaryKeyValuesArr[j - 1] + " eq " + primaryKeyValueMap[primaryKeyValuesArr[j - 1]] + " and ")
                    }
                    queryStr = queryStr.concat(primaryKeyValuesArr[j - 1] + " eq " + primaryKeyValueMap[primaryKeyValuesArr[j - 1]])
                }
            }
            var dataObject = new kony.sdk.dto.DataObject(self.getValueForProperty("name"));
            dataObject.setOdataUrl(queryStr);
            return dataObject
        };
        this.getDataObjectOffline = function(columnNames, dataModel) {
            var self = this;
            var entityName = this.getValueForProperty("name");
            var tblDto = new kony.sdk.dto.Table(entityName, entityName, false);
            var selQuery = new kony.sdk.dto.SelectQuery(self.getServiceName(), tblDto);
            var primaryKeyColumns = this.getValueForProperty("primaryKey");
            for (var i = 0; i < primaryKeyColumns.length; i++) {
                if (columnNames.indexOf(primaryKeyColumns[i]) === -1) {
                    columnNames.push(primaryKeyColumns[i])
                }
            }
            for (var index in columnNames) {
                var colObj = new kony.sdk.dto.Column(tblDto, columnNames[index]);
                selQuery.addColumn(colObj)
            }
            if (dataModel) {
                var primaryKeyValueMap = dataModel.getPrimaryKeyValueMap();
                if (primaryKeyValueMap) {
                    var primaryKeyValuesArr = Object.keys(primaryKeyValueMap);
                    for (var j = 0; j < primaryKeyValuesArr.length; j++) {
                        var colObj = new kony.sdk.dto.Column(tblDto, primaryKeyValuesArr[j]);
                        var crtObj = new kony.sdk.dto.Match(colObj, kony.sdk.constants.MatchType.EQUALS, primaryKeyValueMap[primaryKeyValuesArr[j]]);
                        selQuery.addCriteria(crtObj)
                    }
                }
            }
            var dataObject = new kony.sdk.dto.DataObject(self.getValueForProperty("name"));
            dataObject.setSelectQueryObject(selQuery);
            return dataObject
        };
        this.getRequestOptions = function(options) {
            if (options && !options.hasOwnProperty("dataObject")) {
                var newOptions = {};
                newOptions["dataObject"] = options;
                return newOptions
            } else {
                return options
            }
        }
    },
    getValueForColumnProperty: function(columnName, key) {
        var propertyVal = null;
        if (columnName && key) {
            propertyVal = this.getColumnInfo(columnName)[key]
        }
        return propertyVal
    },
    getColumnNames: function() {
        var columnNames = [];
        for (var key in this.getColumnsMap()) {
            columnNames.push(key)
        }
        return columnNames
    },
    getValueForProperty: function(propertyName) {
        return this.getEntityMetaData()[propertyName]
    },
    getColumnInfo: function(columnName) {
        return this.getColumnsMap()[columnName]
    },
    getFieldPickListValues: function(columnName) {
        return this.getColumnInfo(columnName)["pickListValues"]
    },
    getChildRelationshipList: function(successCallback, errorCallback) {
        var scopeObj = this;
        var childRelationships = this.getValueForProperty("relationshipList");
        successCallback.call(scopeObj, childRelationships)
    },
    getRelationshipForChildEntityName: function(childEntityName, successCallback, errorCallback) {
        var scopeObj = this;
        var relatedEntities = this.getValueForProperty("relatedEntities");
        if (relatedEntities) {
            successCallback.call(scopeObj, relatedEntities[childEntityName])
        } else {
            errorCallback.call(scopeObj, relatedEntities)
        }
    },
    fetchDataForColumns: function(columnNames, onSuccess, onError, dataModel) {
        try {
            var self = this;
            var dataObject;
            if (this.getAccessType() === "offline") dataObject = this.getDataObjectOffline(columnNames, dataModel);
            else dataObject = this.getDataObjectOnline(columnNames, dataModel);
            this.fetch(dataObject, success, error)
        } catch (err) {
            kony.sdk.mvvm.log.error("Error fetching data for columns in entity controller");
            var exception;
            exception = self.getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_FETCHING_DATA_FOR_COLUMNS, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_FETCHING_DATA_FOR_COLUMNS, err);
            onError(exception)
        }

        function success(response) {
            kony.sdk.mvvm.log.info("Success fetching data for columns in entity controller");
            onSuccess(response)
        }

        function error(err) {
            kony.sdk.mvvm.log.error("Error fetching data for columns in entity controller");
            var exception = self.getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_FETCHING_DATA_FOR_COLUMNS, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_FETCHING_DATA_FOR_COLUMNS, err);
            onError(exception)
        }
    },
    fetch: function(options, onSuccess, onError) {
        this.fetchResponseWithRecords(options, success, onError);

        function success(response) {
            response = response["records"];
            onSuccess(response)
        }
    },
    create: function(options, onSuccess, onError) {
        try {
            var scopeObj = this;
            var requestOptions = scopeObj.getRequestOptions(options);
            if (false === this.validate(requestOptions["dataObject"], kony.sdk.mvvm.v2.Model.ValidationType.CREATE)) {
                var exception = this.getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_VALIDATION_CREATE, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_VALIDATION_CREATE);
                throw exception
            }
            var createInEntityCntrlTS = new Date;
            scopeObj.getObjectService().create(requestOptions, success, error)
        } catch (e) {
            var exception = scopeObj.getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_CREATE, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_CREATE, e);
            onError(exception)
        }

        function success(response) {
            var createEndInEntityCntrlTS = new Date;
            kony.sdk.mvvm.Utils.perftimecal("Create in entity controller >>", "Create in entity controller done >>", createInEntityCntrlTS, createEndInEntityCntrlTS);
            onSuccess(response)
        }

        function error(e) {
            var exception = scopeObj.getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_CREATE, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_CREATE, e);
            onError(exception)
        }
    },
    update: function(options, onSuccess, onError) {
        var updateInEntityCntrlTS = new Date;
        try {
            var scopeObj = this;
            var requestOptions = scopeObj.getRequestOptions(options);
            if (false === this.validate(requestOptions["dataObject"], kony.sdk.mvvm.v2.Model.ValidationType.UPDATE)) {
                var exception = this.getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_VALIDATION_UPDATE, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_VALIDATION_UPDATE);
                throw exception
            }
            if (this.getAccessType() === "offline") scopeObj.getObjectService().update(requestOptions, success, error);
            else scopeObj.getObjectService().partialUpdate(requestOptions, success, error)
        } catch (err) {
            var exception = scopeObj.getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_UPDATE, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_UPDATE, err);
            onError(exception)
        }

        function success(response) {
            var updateEndInEntityCntrlTS = new Date;
            kony.sdk.mvvm.Utils.perftimecal("Update in entity controller >>", "Update in entity controller done >>", updateInEntityCntrlTS, updateEndInEntityCntrlTS);
            onSuccess(response)
        }

        function error(err) {
            var exception = scopeObj.getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_UPDATE, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_UPDATE, err);
            onError(exception)
        }
    },
    partialUpdate: function(options, onSuccess, onError) {
        var scopeObj = this;
        scopeObj.update(options, onSuccess, onError)
    },
    completeUpdate: function(options, onSuccess, onError) {
        var updateInEntityCntrlTS = new Date;
        try {
            var scopeObj = this;
            var requestOptions = scopeObj.getRequestOptions(options);
            if (false === this.validate(requestOptions["dataObject"], kony.sdk.mvvm.v2.Model.ValidationType.UPDATE)) {
                var exception = this.getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_VALIDATION_UPDATE, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_VALIDATION_UPDATE);
                throw exception
            }
            scopeObj.getObjectService().update(requestOptions, success, error)
        } catch (err) {
            var exception = scopeObj.getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_UPDATE, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_UPDATE, err);
            onError(exception)
        }

        function success(response) {
            var updateEndInEntityCntrlTS = new Date;
            kony.sdk.mvvm.Utils.perftimecal("Update in entity controller >>", "Update in entity controller done >>", updateInEntityCntrlTS, updateEndInEntityCntrlTS);
            onSuccess(response)
        }

        function error(err) {
            var exception = scopeObj.getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_UPDATE, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_UPDATE, err);
            onError(exception)
        }
    },
    remove: function(options, onSuccess, onError) {
        try {
            var scopeObj = this;
            var removeInEntityCntrlTS = new Date;
            var requestOptions = scopeObj.getRequestOptions(options);
            scopeObj.getObjectService().deleteRecord(requestOptions, success, error)
        } catch (err) {
            var exception = scopeObj.getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_DELETE, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_DELETE, err);
            onError(exception)
        }

        function success(response) {
            var removeEndInEntityCntrlTS = new Date;
            kony.sdk.mvvm.Utils.perftimecal("Remove in entity controller >>", "Remove in entity controller done >>", removeInEntityCntrlTS, removeEndInEntityCntrlTS);
            onSuccess(response)
        }

        function error(err) {
            var exception = scopeObj.getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_DELETE, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_DELETE, err);
            onError(exception)
        }
    },
    removeByPrimaryKey: function(primaryKeyValueMap, onSuccess, onError) {
        try {
            var scopeObj = this;
            var entityName = this.getValueForProperty("name");
            var dataObject = new kony.sdk.dto.DataObject(scopeObj.getValueForProperty("name"));
            dataObject.setRecord(primaryKeyValueMap);
            this.remove(dataObject, success, error)
        } catch (err) {
            var exception = scopeObj.getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_DELETE_BY_PRIMARY_KEY, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_DELETE_BY_PRIMARY_KEY, err);
            onError(exception)
        }

        function success(response) {
            kony.sdk.mvvm.log.info("Record with primaryFieldValue - " + primaryKeyValueMap + " - of entity '" + entityName + "' deleted successfully");
            onSuccess(response)
        }

        function error(err) {
            var exception = scopeObj.getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_DELETE_BY_PRIMARY_KEY, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_DELETE_BY_PRIMARY_KEY, err);
            onError(exception)
        }
    },
    executeSelectQuery: function(query, succCallback, errCallback) {
        try {
            var self = this;
            this.getObjectService().executeSelectQuery(query, success, error);

            function success(response) {
                var primaryKeyColumns = self.getValueForProperty("primaryKey");
                if (response && response.length > 0) {
                    for (var key in response) {
                        var primaryKeyValueMap = {};
                        for (var i = 0; i < primaryKeyColumns.length; i++) {
                            if (response[key].hasOwnProperty(primaryKeyColumns[i])) {
                                primaryKeyValueMap[primaryKeyColumns[i]] = response[key][primaryKeyColumns[i]]
                            }
                        }
                        response[key]["primaryKeyValueMap"] = primaryKeyValueMap
                    }
                }
                succCallback(response)
            }

            function error(err) {
                var exception = self.getApplicationContext().getFactorySharedInstance().createExceptionObject(-1, "Error executing executeSelectQuery", err);
                errCallback(exception)
            }
        } catch (err) {
            kony.sdk.mvvm.log.error("Error fetching data for columns in entity controller");
            var exception = self.getApplicationContext().getFactorySharedInstance().createExceptionObject(-1, "Error executing executeSelectQuery", err);
            errCallback(exception)
        }
    },
    fetchResponse: function(options, onSuccess, onError) {
        var fetchInEntityCntrlTS = new Date;
        try {
            var self = this;
            var requestOptions = self.getRequestOptions(options);
            self.getObjectService().fetch(requestOptions, success, error)
        } catch (e) {
            var exception;
            if (e instanceof kony.sdk.mvvm.Exception) exception = self.getApplicationContext().getFactorySharedInstance().createExceptionObject(e.code, e.message, e);
            else exception = self.getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_FETCH, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_FETCH, e);
            onError(exception)
        }

        function success(response) {
            var records = response["records"];
            var primaryKeyColumns = self.getValueForProperty("primaryKey");
            if (records && records.length > 0) {
                for (var key in records) {
                    var primaryKeyValueMap = {};
                    for (var i = 0; i < primaryKeyColumns.length; i++) {
                        if (records[key].hasOwnProperty(primaryKeyColumns[i])) {
                            primaryKeyValueMap[primaryKeyColumns[i]] = records[key][primaryKeyColumns[i]]
                        }
                    }
                    records[key]["primaryKeyValueMap"] = primaryKeyValueMap
                }
            }
            var fetchEndInEntityCntrlTS = new Date;
            kony.sdk.mvvm.Utils.perftimecal("Fetch in entity controller >>", "Fetch in entity controller done >>", fetchInEntityCntrlTS, fetchEndInEntityCntrlTS);
            onSuccess(response)
        }

        function error(err) {
            kony.sdk.mvvm.log.error("Error in fetching data for given query", err);
            var exception = self.getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_FETCH, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_FETCH, err);
            onError(exception)
        }
    },
    fetchResponseWithRecords: function(options, onSuccess, onError) {
        var self = this;
        this.fetchResponse(options, success, onError);

        function success(response) {
            if (!response.hasOwnProperty("records")) {
                for (var key in response) {
                    if (response[key] instanceof Array) {
                        response["records"] = response[key];
                        break
                    }
                }
                var records = response["records"];
                var primaryKeyColumns = self.getValueForProperty("primaryKey");
                if (records && records.length > 0) {
                    for (var key in records) {
                        var primaryKeyValueMap = {};
                        for (var i = 0; i < primaryKeyColumns.length; i++) {
                            if (records[key].hasOwnProperty(primaryKeyColumns[i])) {
                                primaryKeyValueMap[primaryKeyColumns[i]] = records[key][primaryKeyColumns[i]]
                            }
                        }
                        records[key]["primaryKeyValueMap"] = primaryKeyValueMap
                    }
                }
            }
            onSuccess(response)
        }
    },
    validate: function(dataObject, validationType) {
        return this.getControllerExtensionObject().validate(dataObject, validationType)
    }
});
kony.sdk.mvvm.ConfigurationServiceManager = Class(kony.sdk.mvvm.AppInitServiceMangerInterface, {
    constructor: function() {},
    fetch: function(successcallback, errorCallback) {
        var uiConfigProvider = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getUIConfigDataProvider();
        uiConfigProvider.getAppMenuJson(successcallback, errorCallback)
    },
    apply: function(response, successcallback, errorCallback) {
        var appProperties = kony.sdk.mvvm.KonyApplicationContext.getFactorySharedInstance().createApplicationPropertiesObject();
        appProperties.setApplicationproperties(response);
        var instance = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
        instance.setApplicationProperties(appProperties);
        if (successcallback && typeof successcallback === "function") successcallback()
    },
    execute: function(params, success, error) {
        var scopeObj = this;
        this.fetch(fetchSuccess, error);

        function fetchSuccess(response) {
            scopeObj.apply(response, success, error)
        }
    },
    generateAppPropsObj: function(configParams) {
        var configProps = [];
        for (var key in configParams) {
            var obj = {};
            obj.key = key;
            obj.value = configParams[key];
            configProps.push(obj)
        }
        return configProps
    }
});
kony = kony || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.log = kony.sdk.mvvm.log || {};
kony.sdk.mvvm.util = kony.sdk.mvvm.util || {};
kony.sdk.mvvm.constants = kony.sdk.mvvm.constants || {};
kony.sdk.mvvm.persistent = kony.sdk.mvvm.persistent || {};
kony.sdk.mvvm.persistent.GroupWidgetsContextCommon = Class({
    constructor: function(configObject, contextDataObj) {
        var widgetContextMap = {};
        var config = configObject;
        var contextData = contextDataObj;
        var widgetsList = [];
        var ORMController = undefined;
        this.getConfig = function() {
            return config
        };
        this.getContextData = function() {
            return contextData
        };
        this.getORMController = function() {
            if (!ORMController) {
                var appFactoryInstance = kony.sdk.mvvm.KonyApplicationContext.getFactorySharedInstance();
                var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
                ORMController = appFactoryInstance.createORMControllerObject(INSTANCE, config.getObjectServiceOptions())
            }
            return ORMController
        };
        this.setWidgetContext = function(widget, context) {
            widgetContextMap[widget] = context
        };
        this.getWidgetContext = function(widget) {
            return widgetContextMap[widget]
        };
        this.getWidgetContextMap = function() {
            return widgetContextMap
        };
        this.getWidgetHierarchyMap = function() {
            return widgetHierarchyMap
        };
        this.addToWidgetList = function(widgetId) {
            widgetsList.push(widgetId)
        };
        this.getWidgetList = function() {
            return widgetsList
        };
        this.getFetchWidgetList = function() {
            var widgets = [];
            for (var indx in widgetsList) {
                if (widgetContextMap[widgetsList[indx]] && !widgetContextMap[widgetsList[indx]]["constrained"]) widgets.push(widgetsList[indx])
            }
            return widgets
        };
        this.generateContextForWidgets = function(widgetHierarchyMap) {
            for (var widgetId in widgetHierarchyMap) {
                if (widgetHierarchyMap[widgetId]) {
                    this.addToWidgetList(widgetId);
                    this.generateWidgetContext(widgetId, widgetHierarchyMap[widgetId]);
                    var childWidgetsMap = widgetHierarchyMap[widgetId]["child"];
                    this.generateContextForWidgets(childWidgetsMap)
                }
            }
        };
        this.generateWidgetContext = function(widgetId, widgetConfig) {
            var dataModel, operationType, childWidgets;
            var contextData = this.getContextData();
            var config = this.getConfig();
            if (contextData && contextData instanceof kony.sdk.mvvm.NavigationObject) {
                operationType = contextData.getOperationType(widgetId);
                dataModel = contextData.getDataModel(widgetId)
            }
            if (operationType && operationType === kony.sdk.mvvm.OperationType.ADD) {
                return
            }
            var widgetContext = {};
            widgetContext["widgetGroupId"] = widgetId;
            widgetContext["widgets"] = widgetConfig["widgets"];
            widgetContext["resultProcessor"] = kony.sdk.mvvm.persistent.WidgetResultProcessor;
            var widgetNames = Object.keys(widgetContext["widgets"]);
            if (widgetNames && widgetNames.length === 1 && widgetContext["widgets"][widgetNames[0]].isDataWidget()) {
                widgetContext["resultProcessor"] = kony.sdk.mvvm.persistent.DataWidgetResultProcessor
            }
            widgetContext["serviceName"] = config.getObjectServiceName();
            widgetContext["serviceOptions"] = config.getObjectServiceOptions();
            if (widgetConfig["child"]) {
                childWidgets = Object.keys(widgetConfig["child"])
            }
            widgetContext["child"] = childWidgets || [];
            var entityName, query, queryParams, columns, requestOptions;
            entityName = widgetConfig["config"].getEntity();
            query = widgetConfig["config"].getQuery();
            queryParams = widgetConfig["config"].getQueryParams() || {};
            columns = widgetConfig["config"].getAdditionalFields();
            requestOptions = widgetConfig["config"].getRequestOptions();
            widgetContext["constrained"] = widgetConfig["config"].isConstrained();
            if (contextData) {
                var navQuery, navQueryParams, navRequestOptions;
                navQuery = contextData.getQuery(widgetId);
                navRequestOptions = contextData.getRequestOptions(widgetId);
                navQueryParams = contextData.getQueryParams(widgetId);
                for (var key in navQueryParams) {
                    queryParams[key] = navQueryParams[key]
                }
                query = navQuery || query;
                requestOptions = navRequestOptions || requestOptions
            }
            widgetContext["entityName"] = entityName;
            widgetContext["query"] = query;
            widgetContext["queryParams"] = queryParams;
            widgetContext["dataModel"] = dataModel;
            widgetContext["operationType"] = operationType;
            widgetContext["columns"] = columns;
            widgetContext["requestOptions"] = requestOptions;
            this.setWidgetContext(widgetId, widgetContext)
        };
        var widgetHierarchyMap = config.getWidgetHierarchyMap();
        this.generateContextForWidgets(widgetHierarchyMap)
    },
    fetchDataForGroupWidget: function(widgetId, successCallback, errorCallback) {},
    updateChildWidgetsFilter: function(widgetContext, resultRow) {},
    getColumnsDef: function(widgetContext) {},
    prepareQueryString: function(queryString, variables) {
        try {
            if (!queryString) {
                return
            }
            for (var param in variables) {
                var paramKey = "{" + param + "}";
                var paramVal = variables[param];
                var regEx = new RegExp(paramKey, "g");
                queryString = queryString.replace(regEx, paramVal)
            }
            return queryString
        } catch (err) {
            kony.sdk.mvvm.log.error("Error preparting query string - " + err.toString());
            throw kony.sdk.mvvm.KonyApplicationContext.getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_PREPARING_QUERY_STRING, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_PREPARING_QUERY_STRING, err)
        }
    }
});
kony.sdk.mvvm.persistent.GroupWidgetsContextOffline = Class({
    constructor: function(configObject, contextDataObj) {
        var config = configObject;
        var contextData = contextDataObj;
        var commonGroupWidgetsContext = undefined;
        var ORMController = undefined;
        this.getCommonGroupWidgetsContext = function() {
            if (!commonGroupWidgetsContext) {
                var appFactoryInstance = kony.sdk.mvvm.KonyApplicationContext.getFactorySharedInstance();
                commonGroupWidgetsContext = appFactoryInstance.createGroupWidgetsContextCommon(config, contextData)
            }
            return commonGroupWidgetsContext
        };
        this.getORMController = function() {
            if (!ORMController) {
                var appFactoryInstance = kony.sdk.mvvm.KonyApplicationContext.getFactorySharedInstance();
                var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
                ORMController = appFactoryInstance.createORMControllerObject(INSTANCE, config.getObjectServiceOptions())
            }
            return ORMController
        };
        this.getFetchWidgetList = function() {
            var widgets = [];
            var widgetsList = this.getCommonGroupWidgetsContext().getWidgetList();
            var widgetContextMap = this.getCommonGroupWidgetsContext().getWidgetContextMap();
            for (var indx in widgetsList) {
                if (widgetContextMap[widgetsList[indx]] && !widgetContextMap[widgetsList[indx]]["constrained"]) widgets.push(widgetsList[indx])
            }
            return widgets
        };
        this.getWidgetContext = function(widget) {
            return this.getCommonGroupWidgetsContext().getWidgetContext(widget)
        }
    },
    fetchDataForGroupWidget: function(widgetId, successCallback, errorCallback) {
        var scopeObj = this;
        var widgetContext = this.getCommonGroupWidgetsContext().getWidgetContext(widgetId);
        var fetchContext = {};
        var dataModel = widgetContext["dataModel"];
        var operationType = widgetContext["operationType"];
        fetchContext["entityName"] = widgetContext["entityName"];
        var query = widgetContext["query"];
        var queryParams = widgetContext["queryParams"];
        fetchContext["serviceName"] = widgetContext["serviceName"];
        fetchContext["serviceOptions"] = widgetContext["serviceOptions"];
        var requestOptions = widgetContext["requestOptions"];
        fetchContext["requestOptions"] = requestOptions;
        var ORMController = this.getORMController();
        var columnsdef = this.getColumnsDef(widgetContext);
        fetchContext["columnsdef"] = columnsdef;
        var filter = this.prepareQueryString(query, queryParams);
        fetchContext["filter"] = filter;
        if (query && query.toLowerCase().indexOf("select") > -1) {
            if (filter) {
                ORMController.fetchByNativeQuery(fetchContext, succCallback, errCallback)
            }
        } else if (dataModel && dataModel.getPrimaryKeyValueMap() && operationType === kony.sdk.mvvm.OperationType.FILTER_BY_PRIMARY_KEY) {
            fetchContext["primaryKeyValueMap"] = dataModel.getPrimaryKeyValueMap();
            ORMController.fetchRecordByPrimaryKey(fetchContext, succCallback, errCallback)
        } else if (!operationType || operationType === kony.sdk.mvvm.OperationType.NO_FILTER) {
            ORMController.fetchByColumns(fetchContext, succCallback, errCallback)
        } else {
            kony.sdk.mvvm.log.error("Error in fetching data for group widget, Wrong config");
            return
        }

        function succCallback(response) {
            if (response && response.length === 1) {
                scopeObj.updateChildWidgetsFilter(widgetContext, response[0])
            }
            var result = {};
            result[widgetId] = response;
            successCallback.call(scopeObj, result)
        }

        function errCallback(err) {
            errorCallback.call(scopeObj, err)
        }
    },
    updateChildWidgetsFilter: function(widgetContext, resultRow) {
        var entityName = widgetContext["entityName"];
        var serviceName = widgetContext["serviceName"];
        var serviceOptions = widgetContext["serviceOptions"];
        var childGroupWidgets = widgetContext["child"];
        var ORMController = this.getORMController();
        for (var indx in childGroupWidgets) {
            var childWidgetContext = this.getWidgetContext(childGroupWidgets[indx]);
            var childEntityName = childWidgetContext["entityName"];
            var query = childWidgetContext["query"];
            var updatedQuery = ORMController.updateChildFilter(entityName, serviceName, serviceOptions, childEntityName, query, resultRow);
            childWidgetContext["query"] = updatedQuery
        }
    },
    getColumnsDef: function(widgetContext) {
        var columns = widgetContext["columns"] || [];
        var widgets = widgetContext["widgets"];
        var fieldName, fieldNameArray, len;
        var columnsdef = {};
        var tempcolumnsdef, i;
        var widgetNames = Object.keys(widgets);
        if (widgetNames && widgetNames.length === 1 && widgets[widgetNames[0]].isDataWidget()) {
            var fields = widgets[widgetNames[0]].getField();
            for (var field in fields) {
                fieldName = fields[field].getFieldName();
                for (var indx in fieldName) {
                    fieldNameArray = fieldName[indx].split(".");
                    len = fieldNameArray.length;
                    tempcolumnsdef = columnsdef;
                    for (i = 0; i < len; i++) {
                        if (!tempcolumnsdef.hasOwnProperty(fieldNameArray[i])) {
                            tempcolumnsdef[fieldNameArray[i]] = {}
                        }
                        tempcolumnsdef = tempcolumnsdef[fieldNameArray[i]]
                    }
                }
            }
        } else {
            for (var widget in widgets) {
                fieldName = widgets[widget].getField();
                for (var indx in fieldName) {
                    fieldNameArray = fieldName[indx].split(".");
                    len = fieldNameArray.length;
                    tempcolumnsdef = columnsdef;
                    for (i = 0; i < len; i++) {
                        if (!tempcolumnsdef.hasOwnProperty(fieldNameArray[i])) {
                            tempcolumnsdef[fieldNameArray[i]] = {}
                        }
                        tempcolumnsdef = tempcolumnsdef[fieldNameArray[i]]
                    }
                }
            }
        }
        for (var indx in columns) {
            fieldName = columns[indx];
            fieldNameArray = fieldName.split(".");
            len = fieldNameArray.length;
            tempcolumnsdef = columnsdef;
            for (i = 0; i < len; i++) {
                if (!tempcolumnsdef.hasOwnProperty(fieldNameArray[i])) {
                    tempcolumnsdef[fieldNameArray[i]] = {}
                }
                tempcolumnsdef = tempcolumnsdef[fieldNameArray[i]]
            }
        }
        return columnsdef
    },
    prepareQueryString: function(queryString, variables) {
        return this.getCommonGroupWidgetsContext().prepareQueryString(queryString, variables)
    },
    saveRecord: function(record, sucCallback, errCallback) {
        this.getORMController().saveRecord(record, sucCallback, errCallback)
    },
    saveRecords: function(records, sucCallback, errCallback) {
        this.getORMController().saveRecords(records, sucCallback, errCallback)
    },
    removeRecord: function(record, sucCallback, errCallback) {
        this.getORMController().removeRecord(record, sucCallback, errCallback)
    },
    removeRecords: function(records, sucCallback, errCallback) {
        this.getORMController().removeRecords(records, sucCallback, errCallback)
    }
});
kony.sdk.mvvm.persistent.GroupWidgetsContextOnline = Class({
    constructor: function(configObject, contextDataObj) {
        var config = configObject;
        var contextData = contextDataObj;
        var commonGroupWidgetsContext = undefined;
        this.getCommonGroupWidgetsContext = function() {
            if (!commonGroupWidgetsContext) {
                var appFactoryInstance = kony.sdk.mvvm.KonyApplicationContext.getFactorySharedInstance();
                commonGroupWidgetsContext = appFactoryInstance.createGroupWidgetsContextCommon(config, contextData)
            }
            return commonGroupWidgetsContext
        };
        this.getORMController = function(widget) {
            var appFactoryInstance = kony.sdk.mvvm.KonyApplicationContext.getFactorySharedInstance();
            var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
            var options = config.getObjectServiceOptions();
            if (!options) options = {};
            if (this.isGroupExpand(widget)) options["expand"] = true;
            var ORMController = appFactoryInstance.createORMControllerObject(INSTANCE, options);
            return ORMController
        };
        this.getFetchWidgetList = function() {
            var widgets = [];
            var scopeObj = this;
            var widgetHierarchyMap = this.getCommonGroupWidgetsContext().getWidgetHierarchyMap();
            var widgetContextMap = this.getCommonGroupWidgetsContext().getWidgetContextMap();
            for (var widgetId in widgetHierarchyMap) {
                if (widgetContextMap[widgetId] && !widgetContextMap[widgetId]["constrained"]) {
                    widgets.push(widgetId);
                    getChildFetchList(widgetId, widgetContextMap, widgets)
                }
            }

            function getChildFetchList(widgetId, widgetContextMap, widgets) {
                if (scopeObj.isGroupExpand(widgetId)) return;
                var childWidgets = widgetContextMap[widgetId]["child"];
                for (var indx in childWidgets) {
                    var childId = childWidgets[indx];
                    if (widgetContextMap[childId] && !widgetContextMap[childId]["constrained"]) {
                        widgets.push(childId);
                        getChildFetchList(childId, widgetContextMap, widgets)
                    }
                }
            }
            return widgets
        };
        this.getWidgetContext = function(widget) {
            return this.getCommonGroupWidgetsContext().getWidgetContext(widget)
        };
        this.isGroupExpand = function(widget) {
            var widgetContext = this.getWidgetContext(widget);
            var query = widgetContext && widgetContext["query"];
            if (query && query.indexOf("&$expand=") > -1) {
                return true
            }
            return false
        }
    },
    fetchDataForGroupWidget: function(widgetId, successCallback, errorCallback) {
        var scopeObj = this;
        var widgetContext = this.getCommonGroupWidgetsContext().getWidgetContext(widgetId);
        var fetchContext = {};
        var dataModel = widgetContext["dataModel"];
        var operationType = widgetContext["operationType"];
        fetchContext["entityName"] = widgetContext["entityName"];
        var query = widgetContext["query"];
        var queryParams = widgetContext["queryParams"];
        fetchContext["serviceName"] = widgetContext["serviceName"];
        fetchContext["serviceOptions"] = widgetContext["serviceOptions"];
        var requestOptions = widgetContext["requestOptions"];
        fetchContext["requestOptions"] = requestOptions;
        var ORMController = this.getORMController(widgetId);
        var fetchChild = this.isGroupExpand(widgetId);
        var columnsdef = this.getColumnsDef(widgetContext, {}, fetchChild);
        fetchContext["columnsdef"] = columnsdef;
        var filter = this.prepareQueryString(query, queryParams);
        fetchContext["filter"] = filter;
        if (query && query.toLowerCase().indexOf("select") > -1) {
            if (filter) {
                ORMController.fetchByNativeQuery(fetchContext, succCallback, errCallback)
            }
        } else if (dataModel && dataModel.getPrimaryKeyValueMap() && operationType === kony.sdk.mvvm.OperationType.FILTER_BY_PRIMARY_KEY) {
            fetchContext["primaryKeyValueMap"] = dataModel.getPrimaryKeyValueMap();
            ORMController.fetchRecordByPrimaryKey(fetchContext, succCallback, errCallback)
        } else if (!operationType || operationType === kony.sdk.mvvm.OperationType.NO_FILTER) {
            ORMController.fetchByColumns(fetchContext, succCallback, errCallback)
        } else {
            kony.sdk.mvvm.log.error("Error in fetching data for group widget, Wrong config");
            return
        }

        function succCallback(response) {
            var result = {};
            result["_raw_response_"] = {};
            result["_raw_response_"][widgetId] = response;
            if (response && response["records"]) result[widgetId] = JSON.parse(JSON.stringify(response["records"]));
            scopeObj.updateChildResponse(widgetContext, result[widgetId], result);
            successCallback.call(scopeObj, result)
        }

        function errCallback(err) {
            errorCallback.call(scopeObj, err)
        }
    },
    updateChildResponse: function(widgetContext, response, result) {
        if (response && response.length === 1) {
            response = response[0]
        } else {
            return
        }
        var entityName = widgetContext["entityName"];
        var serviceName = widgetContext["serviceName"];
        var serviceOptions = widgetContext["serviceOptions"];
        var childGroupWidgets = widgetContext["child"];
        var ORMController = this.getORMController();
        for (var indx in childGroupWidgets) {
            var childId = childGroupWidgets[indx];
            var childWidgetContext = this.getWidgetContext(childId);
            var childEntityName = childWidgetContext["entityName"];
            var query = childWidgetContext["query"];
            var updatedQuery = ORMController.updateChildFilter(entityName, serviceName, serviceOptions, childEntityName, query, response);
            childWidgetContext["query"] = updatedQuery;
            if (response[childEntityName]) {
                result[childId] = JSON.parse(JSON.stringify(response[childEntityName]));
                this.updateChildResponse(childWidgetContext, response[childEntityName], result)
            }
        }
    },
    getColumnsDef: function(widgetContext, columnsdef, fetchChild) {
        var columns = widgetContext["columns"] || [];
        var widgets = widgetContext["widgets"];
        var fieldName, fieldNameArray, len;
        var tempcolumnsdef, i;
        var widgetNames = Object.keys(widgets);
        if (widgetNames && widgetNames.length === 1 && widgets[widgetNames[0]].isDataWidget()) {
            var fields = widgets[widgetNames[0]].getField();
            for (var field in fields) {
                fieldName = fields[field].getFieldName();
                for (var indx in fieldName) {
                    fieldNameArray = fieldName[indx].split(".");
                    len = fieldNameArray.length;
                    tempcolumnsdef = columnsdef;
                    for (i = 0; i < len; i++) {
                        if (!tempcolumnsdef.hasOwnProperty(fieldNameArray[i])) {
                            tempcolumnsdef[fieldNameArray[i]] = {}
                        }
                        tempcolumnsdef = tempcolumnsdef[fieldNameArray[i]]
                    }
                }
            }
        } else {
            for (var widget in widgets) {
                fieldName = widgets[widget].getField();
                for (var indx in fieldName) {
                    fieldNameArray = fieldName[indx].split(".");
                    len = fieldNameArray.length;
                    tempcolumnsdef = columnsdef;
                    for (i = 0; i < len; i++) {
                        if (!tempcolumnsdef.hasOwnProperty(fieldNameArray[i])) {
                            tempcolumnsdef[fieldNameArray[i]] = {}
                        }
                        tempcolumnsdef = tempcolumnsdef[fieldNameArray[i]]
                    }
                }
            }
        }
        for (var indx in columns) {
            fieldName = columns[indx];
            fieldNameArray = fieldName.split(".");
            len = fieldNameArray.length;
            tempcolumnsdef = columnsdef;
            for (i = 0; i < len; i++) {
                if (!tempcolumnsdef.hasOwnProperty(fieldNameArray[i])) {
                    tempcolumnsdef[fieldNameArray[i]] = {}
                }
                tempcolumnsdef = tempcolumnsdef[fieldNameArray[i]]
            }
        }
        if (!fetchChild) {
            return columnsdef
        }
        var childWidgets = widgetContext["child"];
        for (var indx in childWidgets) {
            var childWidgetContext = this.getWidgetContext(childWidgets[indx]);
            if (!childWidgetContext["constrained"]) {
                var childEntityName = childWidgetContext["entityName"];
                columnsdef[childEntityName] = columnsdef[childEntityName] || {};
                columnsdef[childEntityName] = this.getColumnsDef(childWidgetContext, columnsdef[childEntityName], fetchChild)
            }
        }
        return columnsdef
    },
    prepareQueryString: function(queryString, variables) {
        return this.getCommonGroupWidgetsContext().prepareQueryString(queryString, variables)
    },
    saveRecord: function(record, sucCallback, errCallback) {
        this.getORMController().saveRecord(record, sucCallback, errCallback)
    },
    saveRecords: function(records, sucCallback, errCallback) {
        this.getORMController().saveRecords(records, sucCallback, errCallback)
    },
    removeRecord: function(record, sucCallback, errCallback) {
        this.getORMController().removeRecord(record, sucCallback, errCallback)
    },
    removeRecords: function(records, sucCallback, errCallback) {
        this.getORMController().removeRecords(records, sucCallback, errCallback)
    }
});
kony.sdk.mvvm.persistent.GroupWidgetsContextInterface = Class({
    constructor: function(configObject, contextDataObj) {},
    getFetchWidgetList: function() {},
    getWidgetContext: function(widget) {},
    fetchDataForGroupWidget: function(widgetId, successCallback, errorCallback) {},
    saveRecord: function(record, sucCallback, errCallback) {},
    saveRecords: function(records, sucCallback, errCallback) {},
    removeRecord: function(record, sucCallback, errCallback) {},
    removeRecords: function(records, sucCallback, errCallback) {}
});
kony.sdk.mvvm.HashBasedOfflineAuthentication = Class(kony.sdk.mvvm.OfflineAuthenticationServiceManager, {
    constructor: function() {},
    authenticate: function(params, successCallback, errorCallback) {
        this.$class.$superp.authenticate.call(this, params, successCallback, errorCallback)
    },
    saveUserDetails: function() {
        var storeObj = kony.sdk.mvvm.KonyApplicationContext.getFactorySharedInstance().createDataStoreObject();
        var credentialObj = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getUserCredentialObj().getData("UserCredentials", true);
        var authParams = credentialObj["authParams"];
        var username = authParams["userid"];
        var options = credentialObj["options"];
        var appType = credentialObj["APPTYPE"];
        var identityServiceName = credentialObj["identityServiceName"];
        var key = kony.sdk.mvvm.generateAndSaveKey("AFN");
        var encryptedUserName = kony.sdk.mvvm.encryptData(key, username);
        var storedDB = "";
        var storedCredStore = storeObj.getData(kony.sdk.mvvm.credStoreName);
        if (storedCredStore && storedCredStore[kony.sdk.mvvm.credStoreDb]) {
            storedDB = storedCredStore[kony.sdk.mvvm.credStoreDb]
        }
        var syncCount = 0;
        if (storedCredStore && storedCredStore[kony.sdk.mvvm.credStoreSyncCount]) {
            syncCount = storedCredStore[kony.sdk.mvvm.credStoreSyncCount]
        }
        var credentials_store = {};
        credentials_store[kony.sdk.mvvm.credStoreUsername] = encryptedUserName;
        credentials_store[kony.sdk.mvvm.credStoreOptions] = options;
        credentials_store[kony.sdk.mvvm.credStoreIdentityService] = identityServiceName;
        credentials_store[kony.sdk.mvvm.credStoreAppType] = appType;
        credentials_store[kony.sdk.mvvm.credStoreSecretKey] = key;
        credentials_store[kony.sdk.mvvm.credStoreDb] = storedDB;
        storeObj.storeData(kony.sdk.mvvm.credStoreName, credentials_store)
    },
    getSavedUserDetails: function() {
        return this.$class.$superp.getSavedUserDetails.call(this)
    },
    execute: function(params, success, error) {
        this.authenticate(params, success, error)
    }
});
kony.sdk.mvvm.AppInitManager = Class({
    constructor: function() {
        var registry = [];
        var params = [];
        this.addRegistry = function(obj) {
            registry.push(obj)
        };
        this.addParams = function(parameters) {
            params.push(parameters)
        };
        this.getRegistry = function() {
            return registry
        };
        this.getParams = function() {
            return params
        }
    },
    init: function(isOnline) {},
    registerService: function(objName, obj) {
        this.addRegistry(obj)
    },
    executeRegistedServices: function(successcallback, errorcallback) {
        var count = 0;
        errorOccured = false;
        var registry = this.getRegistry();

        function serviceExecutionSuccess(response) {
            if (errorOccured) return;
            count += 1;
            if (count === registry.length) {
                successcallback()
            } else {
                initiateFetch(count)
            }
        }

        function initiateFetch(index) {
            registry[index]["object"].execute(registry[index]["params"], serviceExecutionSuccess, error);

            function error(err) {
                if (errorOccured) return;
                errorOccured = true;
                errorcallback(err)
            }
        }
        initiateFetch(count)
    }
});
kony.sdk.mvvm.MetadataServiceManagerMF = Class(kony.sdk.mvvm.AppInitServiceMangerInterface, {
    constructor: function() {},
    fetch: function(options, serviceName, successcallback, errorCallback) {
        var objectService = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getObjectService(options, serviceName);
        objectService.getMetadataOfAllObjects({}, successcallback, errorCallback)
    },
    apply: function(response, options, serviceName, successcallback, errorCallback) {
        var entityMetaDataMap = {};
        for (var objectName in response) {
            var metadata = response[objectName];
            entityMetaDataMap[objectName] = metadata;
            var fields = metadata.columns;
            entityMetaDataMap[objectName]["columnsMap"] = {};
            for (var j = 0; j < fields.length; j++) {
                var field = fields[j];
                entityMetaDataMap[objectName]["columnsMap"][field.name] = field
            }
            setRelatedEntities(metadata)
        }

        function setRelatedEntities(metadata) {
            var relationList = metadata["relationshipList"];
            var relatedEntities = {};
            for (var idx in relationList) {
                var relation = relationList[idx];
                var relatedEntity = {};
                relatedEntity["relationshipFields"] = relation.relationshipFields;
                relatedEntity["relationshipType"] = relation.relationshipType;
                relatedEntity["relationshipName"] = relation.relationshipName;
                relatedEntities[relation.relatedEntity] = relatedEntity
            }
            metadata["relatedEntities"] = relatedEntities
        }
        var result = {};
        result["dataModel"] = entityMetaDataMap;
        if (kony.sdk.mvvm.KonyApplicationContext.getAppInstance()) {
            var metadataStore = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getMetadataStore();
            metadataStore.setServiceMetadata(entityMetaDataMap, serviceName, options)
        }
        if (successcallback) successcallback(result)
    },
    fetchForAllObjectServices: function(options, success, error) {
        var self = this;

        function getAllObjectServicesFromSdk() {
            var objectServicesMapFromSdk = kony.sdk.mvvm.Util.clone(kony.sdk.getCurrentInstance().objectsvc);
            if (kony.sdk.registeredobjsvcs)
                if (objectServicesMapFromSdk) objectServicesMapFromSdk = kony.sdk.mvvm.Util.mergeJSONs(objectServicesMapFromSdk, kony.sdk.registeredobjsvcs);
                else objectServicesMapFromSdk = kony.sdk.registeredobjsvcs;
            var objectServicesNames = [];
            for (var key in objectServicesMapFromSdk) {
                if (key.indexOf("_metadata") === -1) {
                    objectServicesNames.push(key)
                }
            }
            return objectServicesNames
        }
        var objectServicesList = getAllObjectServicesFromSdk();
        var osvIndx = 0;
        self.fetch(options, objectServicesList[osvIndx], successCbk, errorCbk);

        function successCbk(response) {
            self.apply(response, options, objectServicesList[osvIndx]);
            osvIndx++;
            if (osvIndx >= objectServicesList.length) {
                success(response);
                return
            }
            self.fetch(options, objectServicesList[osvIndx], successCbk, errorCbk)
        }

        function errorCbk(err) {
            kony.sdk.mvvm.log.error("error fetching metadata" + JSON.stringify(err));
            error(err)
        }
    },
    execute: function(params, success, error) {
        var scopeObj = this;
        this.fetchForAllObjectServices(params["options"], fetchSuccess, fetchError);

        function fetchSuccess(response) {
            success(response);
            return
        }

        function fetchError(err) {
            error(err);
            return
        }
    }
});
kony.sdk.mvvm.MetadataServiceManager = Class(kony.sdk.mvvm.AppInitServiceMangerInterface, {
    constructor: function() {
        var appFactoryInstance = kony.sdk.mvvm.KonyApplicationContext.getFactorySharedInstance();
        this.metadataManager = appFactoryInstance.createMetadataServiceManagerObject()
    },
    fetch: function(options, serviceName, successcallback, errorCallback) {
        this.metadataManager.fetch(options, serviceName, successcallback, errorCallback)
    },
    apply: function(response, options, serviceName, successcallback, errorCallback) {
        this.metadataManager.apply(response, options, serviceName, successcallback, errorCallback)
    },
    fetchForAllObjectServices: function(options, success, error) {
        this.metadataManager.fetchForAllObjectServices(options, success, error)
    },
    execute: function(params, success, error) {
        kony.sdk.mvvm.KonyApplicationContext.showLoadingScreen("Loading Metadata");
        this.metadataManager.execute(params, fetchSuccess, fetchError);

        function fetchSuccess(response) {
            kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
            success(response);
            return
        }

        function fetchError(err) {
            kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
            error(err);
            return
        }
    }
});
kony = kony || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.MetadataStore = Class({
    constructor: function() {
        var serviceMetadata = {};
        this.getServiceMetadata = function(serviceName, options) {
            return serviceMetadata[serviceName]
        };
        this.setServiceMetadata = function(metadata, serviceName, options) {
            serviceMetadata[serviceName] = metadata
        }
    },
    getEntityMetadata: function(entity, serviceName, options) {
        var svcMetadata = this.getServiceMetadata(serviceName, options);
        if (svcMetadata && svcMetadata[entity]) return svcMetadata[entity]
    }
});
kony = kony || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.log = kony.sdk.mvvm.log || {};
kony.sdk.mvvm.util = kony.sdk.mvvm.util || {};
kony.sdk.mvvm.constants = kony.sdk.mvvm.constants || {};
kony.sdk.mvvm.persistent = kony.sdk.mvvm.persistent || {};
kony.sdk.mvvm.persistent.ORMControllerMFAPP = Class(kony.sdk.mvvm.persistent.ORMControllerInterface, {
    constructor: function(applicationContext, configOptions) {
        var ormcontroller;
        var appFactoryInstance = kony.sdk.mvvm.KonyApplicationContext.getFactorySharedInstance();
        var appContext = applicationContext;
        if (configOptions && configOptions.hasOwnProperty("access") && configOptions.access === "offline") {
            ormcontroller = appFactoryInstance.createORMControllerSQLObject(applicationContext)
        } else if (configOptions && configOptions.hasOwnProperty("expand") && configOptions.expand === true) {
            ormcontroller = appFactoryInstance.createORMControllerOdataExpandObject(applicationContext)
        } else {
            ormcontroller = appFactoryInstance.createORMControllerOdataObject(applicationContext)
        }
        this.getORMController = function() {
            return ormcontroller
        };
        this.getApplicationContext = function() {
            return appContext
        }
    },
    fetchRecordByPrimaryKey: function(fetchContext, onSuccess, onError) {
        this.getORMController().fetchRecordByPrimaryKey(fetchContext, onSuccess, onError)
    },
    fetchByNativeQuery: function(fetchContext, onSuccess, onError) {
        this.getORMController().fetchByNativeQuery(fetchContext, onSuccess, onError)
    },
    fetchByColumns: function(fetchContext, onSuccess, onError) {
        this.getORMController().fetchByColumns(fetchContext, onSuccess, onError)
    },
    updateChildFilter: function(entityName, serviceName, options, childEntityName, query, parentRow) {
        return this.getORMController().updateChildFilter(entityName, serviceName, options, childEntityName, query, parentRow)
    },
    saveChildRecords: function(childRecordsList, record, response, childSuccess, childError) {
        this.getORMController().saveChildRecords(childRecordsList, record, response, childSuccess, childError)
    },
    saveRecord: function(record, onSuccess, onError) {
        this.getORMController().saveRecord(record, onSuccess, onError)
    },
    saveRecords: function(records, onSuccess, onError) {
        this.getORMController().saveRecords(records, onSuccess, onError)
    },
    removeChildRecords: function(childRecordsList, childSuccess, childError) {
        this.getORMController().removeChildRecords(childRecordsList, childSuccess, childError)
    },
    removeRecord: function(record, onSuccess, onError) {
        this.getORMController().removeRecord(record, onSuccess, onError)
    },
    removeRecords: function(records, onSuccess, onError) {
        this.getORMController().removeRecords(records, onSuccess, onError)
    }
});
kony.sdk.mvvm.persistent.ORMControllerMFAPPSuper = Class(kony.sdk.mvvm.persistent.ORMControllerInterface, {
    constructor: function(applicationContext) {
        var appContext = applicationContext;
        this.getApplicationContext = function() {
            return appContext
        };
        this.getRecordsListNModel = function(entityName, record, serviceName, options) {
            var entityCtrlr = this.getApplicationContext().getModel(entityName, serviceName, options);
            var childRecordsList = [];
            var recordColumns = {};
            for (var column in record) {
                if (typeof record[column] !== "function" && record[column] !== null) {
                    if (entityCtrlr.getColumnInfo(column)) {
                        if (entityCtrlr.getValueForColumnProperty(column, "type") === "picklist") {
                            recordColumns[column] = record[column].getValue()
                        } else {
                            recordColumns[column] = record[column]
                        }
                    } else if (this.getChildRelationship(entityName, column, serviceName, options)) {
                        var childObj = null;
                        for (var i in record[column]) {
                            childObj = childObj || {};
                            childObj["entityName"] = childObj["entityName"] || column;
                            childObj["childRecords"] = childObj["childRecords"] || [];
                            childObj["childRecords"].push(record[column][i])
                        }
                        if (childObj) childRecordsList.push(childObj)
                    }
                }
            }
            var dataObject = new kony.sdk.dto.DataObject(entityName);
            dataObject.setRecord(recordColumns);
            return {
                dataObject: dataObject,
                childRecordsList: childRecordsList
            }
        };
        this.getChildRelationship = function(entityName, childEntityName, serviceName, options) {
            var entityCtrlr = this.getApplicationContext().getModel(entityName, serviceName, options);
            var relatedEntities = entityCtrlr.getRelatedEntities();
            return relatedEntities[childEntityName]
        }
    },
    fetchRecordByPrimaryKey: function(fetchContext, onSuccess, onError) {},
    fetchByNativeQuery: function(fetchContext, onSuccess, onError) {},
    fetchByColumns: function(fetchContext, onSuccess, onError) {},
    updateChildFilter: function(entityName, serviceName, options, childEntityName, query, parentRow) {},
    saveChildRecords: function(childRecordsList, record, response, childSuccess, childError) {
        var scopeObj = this;
        var entityName = record.getInfo("entity");
        var serviceName = record.getInfo("serviceName");
        var options = record.getInfo("options");
        var modelObj = this.getApplicationContext().getModel(entityName, serviceName, options);
        var primaryKeyArray = modelObj.getValueForProperty("primaryKey");
        if (response) {
            for (var i in primaryKeyArray) {
                if (response[primaryKeyArray[i]]) record[primaryKeyArray[i]] = response[primaryKeyArray[i]]
            }
            var childRecordsLen = childRecordsList.length;
            if (childRecordsLen > 0) {
                var relationshipData;
                var childEntityName;
                var len;
                for (var index in childRecordsList) {
                    childEntityName = childRecordsList[index]["entityName"];
                    relationshipData = this.getChildRelationship(entityName, childEntityName, serviceName, options);
                    var relFields = relationshipData["relationshipFields"];
                    len = childRecordsList[index]["childRecords"].length;
                    for (var i = 0; i < len; i++) {
                        for (var j in relFields) {
                            var referencingField = relFields[j]["referencingField"];
                            var referencedField = relFields[j]["referencedField"];
                            childRecordsList[index]["childRecords"][i].set(referencedField, record[referencingField])
                        }
                    }
                }
                var indx = 0;
                saveChildRecords()
            } else {
                childSuccess.call(this, record);
                return
            }
        } else {
            childSuccess.call(this, record);
            return
        }

        function saveChildRecords() {
            if (indx >= childRecordsLen) {
                childSuccess.call(scopeObj, record);
                return
            }
            scopeObj.saveRecords(childRecordsList[indx]["childRecords"], saveSuccessCallback, errorCallback)
        }

        function saveSuccessCallback(response) {
            indx++;
            saveChildRecords()
        }

        function errorCallback(error) {
            childError.call(scopeObj, error);
            return
        }
    },
    saveRecord: function(record, onSuccess, onError) {
        try {
            var scopeObj = this;
            if (record.getInfo("remove")) {
                scopeObj.removeRecord(record, onSuccess, onError);
                return
            }
            var entityName = record.getInfo("entity");
            var serviceName = record.getInfo("serviceName");
            var options = record.getInfo("options");
            var modelObj = this.getApplicationContext().getModel(entityName, serviceName, options);
            var primaryKeyArr = modelObj.getValueForProperty("primaryKey");
            var recordsListAndModelObj = this.getRecordsListNModel(entityName, record, serviceName, options);
            var childRecordsList = recordsListAndModelObj.childRecordsList;
            var dataObject = recordsListAndModelObj.dataObject;

            function primaryValuesExist(record, primaryKeyArr) {
                var result = true;
                for (var index in primaryKeyArr) {
                    if (!record.hasOwnProperty(primaryKeyArr[index])) {
                        result = false
                    }
                }
                return result
            }
            var operation = record.getInfo("operation");
            var requestOptions = record.getInfo("requestOptions");
            if (!requestOptions) {
                requestOptions = {}
            }
            requestOptions["dataObject"] = dataObject;
            if (operation && operation === kony.sdk.mvvm.OperationType.ADD) {
                modelObj.create(requestOptions, success, error)
            } else if (primaryValuesExist(record, primaryKeyArr)) {
                modelObj.update(requestOptions, success, error)
            } else {
                modelObj.create(requestOptions, success, error)
            }

            function success(response) {
                scopeObj.saveChildRecords(childRecordsList, record, response, childSuccess, childError);

                function childSuccess(record) {
                    onSuccess.call(scopeObj, record);
                    return
                }

                function childError(err) {
                    onError.call(scopeObj, err);
                    return
                }
            }

            function error(response) {
                onError.call(scopeObj, response)
            }
        } catch (e) {
            var err = this.getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_ORM_CONTROLLER_SAVE_RECORD, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_ORM_CONTROLLER_SAVE_RECORD, e);
            onError(err)
        }
    },
    saveRecords: function(records, onSuccess, onError) {
        try {
            var scopeObj = this;
            var indx = 0;
            scopeObj.saveRecord(records[indx], successCallback, errorCallback);

            function successCallback(response) {
                indx++;
                if (indx >= records.length) {
                    onSuccess.call(scopeObj, response);
                    return
                }
                scopeObj.saveRecord(records[indx], successCallback, errorCallback)
            }

            function errorCallback(error) {
                onError.call(scopeObj, error)
            }
        } catch (e) {
            var err = this.getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_ORM_CONTROLLER_SAVE_RECORDS, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_ORM_CONTROLLER_SAVE_RECORDS, e);
            onError(err)
        }
    },
    removeChildRecords: function(childRecordsList, childSuccess, childError) {
        var scopeObj = this;
        var childRecordsLen = childRecordsList.length;
        var indx = 0;
        removeChildRecords();

        function removeChildRecords() {
            if (indx >= childRecordsLen) {
                childSuccess.call(scopeObj);
                return
            }
            scopeObj.removeRecords(childRecordsList[indx]["childRecords"], removeSuccessCallback, errorCallback)
        }

        function removeSuccessCallback(response) {
            indx++;
            removeChildRecords()
        }

        function errorCallback(error) {
            childError.call(scopeObj, error);
            return
        }
    },
    removeRecord: function(record, onSuccess, onError) {
        try {
            var scopeObj = this;
            var entityName = record.getInfo("entity");
            var serviceName = record.getInfo("serviceName");
            var options = record.getInfo("options");
            var modelObj = this.getApplicationContext().getModel(entityName, serviceName, options);
            var recordsListAndModelObj = this.getRecordsListNModel(entityName, record, serviceName, options);
            var childRecordsList = recordsListAndModelObj.childRecordsList;
            scopeObj.removeChildRecords(childRecordsList, success, onError);

            function success() {
                var primaryKeyArray = modelObj.getValueForProperty("primaryKey");
                var primaryKeyValueMap = {};
                for (var i in primaryKeyArray) {
                    primaryKeyValueMap[primaryKeyArray[i]] = record[primaryKeyArray[i]]
                }
                var dataObject = new kony.sdk.dto.DataObject(entityName);
                dataObject.setRecord(primaryKeyValueMap);
                var requestOptions = record.getInfo("requestOptions");
                if (!requestOptions) {
                    requestOptions = {}
                }
                requestOptions["dataObject"] = dataObject;
                modelObj.remove(requestOptions, succCallback, errCallback);

                function succCallback(response) {
                    onSuccess.call(scopeObj, response)
                }

                function errCallback(error) {
                    onError.call(scopeObj, error)
                }
            }
        } catch (e) {
            var err = this.getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_ORM_CONTROLLER_REMOVE_RECORD, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_ORM_CONTROLLER_REMOVE_RECORD, e);
            onError(err)
        }
    },
    removeRecords: function(records, onSuccess, onError) {
        try {
            var scopeObj = this;
            var indx = 0;
            scopeObj.removeRecord(records[indx], successCallback, errorCallback);

            function successCallback(response) {
                indx++;
                if (indx >= records.length) {
                    onSuccess.call(scopeObj, response);
                    return
                }
                scopeObj.removeRecord(records[indx], successCallback, errorCallback)
            }

            function errorCallback(error) {
                onError.call(scopeObj, error)
            }
        } catch (e) {
            var err = this.getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_ORM_CONTROLLER_REMOVE_RECORDS, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_ORM_CONTROLLER_REMOVE_RECORDS, e);
            onError(err)
        }
    }
});
kony.sdk.mvvm.persistent.ORMControllerMFAPPOData = Class(kony.sdk.mvvm.persistent.ORMControllerMFAPPSuper, function() {
    var appContext;
    return {
        constructor: function(applicationContext) {
            this.$class.$super.call(this, applicationContext);
            appContext = applicationContext;
            this.getApplicationContext = function() {
                return appContext
            };
            this.getModel = function(entityName, serviceName, options) {
                return this.getApplicationContext().getModel(entityName, serviceName, options)
            }
        },
        fetchRecordByPrimaryKey: function(fetchContext, onSuccess, onError) {
            try {
                var scopeObj = this;
                var entityName = fetchContext["entityName"];
                var primaryFieldValueMap = fetchContext["primaryKeyValueMap"];
                var primaryKeyValuesArr = Object.keys(primaryFieldValueMap);
                if (primaryKeyValuesArr.length > 0) {
                    var filter = "&$filter=";
                    for (var j = 1; j < primaryKeyValuesArr.length; j++) {
                        filter = filter + primaryKeyValuesArr[j - 1] + " eq '" + primaryFieldValueMap[primaryKeyValuesArr[j - 1]] + "' and "
                    }
                    filter = filter + primaryKeyValuesArr[j - 1] + " eq '" + primaryFieldValueMap[primaryKeyValuesArr[j - 1]] + "'";
                    fetchContext["filter"] = filter
                }
                this.fetchByColumns(fetchContext, onSuccess, onError)
            } catch (e) {
                var err = this.getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_ORM_CONTROLLER_FETCH_RECORD_PK, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_ORM_CONTROLLER_FETCH_RECORD_PK, e);
                onError(err)
            }
        },
        fetchByNativeQuery: function(fetchContext, onSuccess, onError) {
            try {
                var scopeObj = this;
                var entityName = fetchContext["entityName"];
                var serviceName = fetchContext["serviceName"];
                var serviceOptions = fetchContext["serviceOptions"];
                var query = fetchContext["filter"];
                var modelObj = this.getModel(entityName, serviceName, serviceOptions);
                var requestOptions = fetchContext["requestOptions"];
                if (!requestOptions) {
                    requestOptions = {}
                }
                var dataObject = new kony.sdk.dto.DataObject(entityName);
                dataObject.setOdataUrl(query);
                requestOptions["dataObject"] = dataObject;
                modelObj.fetchResponseWithRecords(requestOptions, success, error);

                function success(response) {
                    onSuccess.call(scopeObj, response)
                }

                function error(response) {
                    onError.call(scopeObj, response)
                }
            } catch (e) {
                var err = this.getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_ORM_CONTROLLER_FETCH_RECORDS_BY_NATIVE_QUERY, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_ORM_CONTROLLER_FETCH_RECORDS_BY_NATIVE_QUERY, e);
                onError(err)
            }
        },
        fetchByColumns: function(fetchContext, onSuccess, onError) {
            try {
                var scopeObj = this;
                var entityName = fetchContext["entityName"];
                var serviceName = fetchContext["serviceName"];
                var serviceOptions = fetchContext["serviceOptions"];
                var columnsdef = fetchContext["columnsdef"];
                var entityCtrlr = this.getModel(entityName, serviceName, serviceOptions);
                var queryMap = this.getFetchQueryMap(entityName, columnsdef, serviceName, serviceOptions);
                this.fetchDataMap(queryMap, fetchContext, success, onError);

                function success(response) {
                    onSuccess.call(scopeObj, response)
                }
            } catch (e) {
                var err = this.getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_ORM_CONTROLLER_FETCH_RECORDS_BY_COLUMN_DEFINITION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_ORM_CONTROLLER_FETCH_RECORDS_BY_COLUMN_DEFINITION, e);
                onError(err)
            }
        },
        getFetchQueryMap: function(entityName, columnsdef, serviceName, options, parentReference) {
            try {
                var queryMap = {};
                queryMap.entityName = entityName;
                queryMap.joins = [];
                var entityCtrlr = appContext.getModel(entityName, serviceName, options);
                if (parentReference && parentReference["relFields"]) {
                    queryMap.parentEntity = parentReference["entityName"];
                    queryMap.relFields = parentReference["relFields"]
                }
                var columnsMap = {};
                for (var column in columnsdef) {
                    if (entityCtrlr.getColumnInfo(column)) {
                        columnsMap[column] = true
                    } else {
                        var relatedEntities = entityCtrlr.getRelatedEntities();
                        if (relatedEntities[column]) {
                            var relFields = relatedEntities[column]["relationshipFields"];
                            var reference = {};
                            reference.entityName = entityName;
                            reference.relFields = relFields;
                            var subQueryMap = this.getFetchQueryMap(column, columnsdef[column], serviceName, options, reference);
                            queryMap.joins.push(subQueryMap)
                        } else {
                            kony.sdk.mvvm.log.error("error in orm controller prepare query json, reference table name not defined : " + column)
                        }
                    }
                }
                if (Object.keys(columnsMap).length > 0) {
                    var len = queryMap.joins.length;
                    for (var i = 0; i < len; i += 1) {
                        var relFields = queryMap.joins[i].relFields;
                        for (var idx in relFields) {
                            columnsMap[relFields[idx]["referencingField"]] = true
                        }
                    }
                    if (queryMap.relFields) {
                        for (var idx in queryMap.relFields) {
                            columnsMap[queryMap.relFields[idx]["referencedField"]] = true
                        }
                    }
                    var pkColumns = entityCtrlr.getValueForProperty("primaryKey");
                    for (var idx in pkColumns) {
                        columnsMap[pkColumns[idx]] = true
                    }
                }
                var columnStr = "$select=";
                for (var column in columnsMap) {
                    columnStr += column + ","
                }
                if (columnStr[columnStr.length - 1] !== "=") columnStr = columnStr.slice(0, columnStr.length - 1);
                queryMap.query = columnStr;
                return queryMap
            } catch (e) {
                throw this.getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_ORM_CONTROLLER_PREPARE_FETCH_QUERY, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_ORM_CONTROLLER_PREPARE_FETCH_QUERY, e)
            }
        },
        fetchDataMap: function(queryMap, fetchContext, onSuccess, onError) {
            var scopeObj = this;
            var resultSet = {};
            var serviceName = fetchContext["serviceName"];
            var serviceOptions = fetchContext["serviceOptions"];
            var filter = fetchContext["filter"];
            var requestOptions = fetchContext["requestOptions"];
            if (!requestOptions) {
                requestOptions = {}
            }
            var entityName = queryMap.entityName;
            var query = queryMap.query;
            if (filter) {
                query = query + filter
            }
            var entityCtrlr = scopeObj.getModel(entityName, serviceName, serviceOptions);
            var dataObject = new kony.sdk.dto.DataObject(entityName);
            if (query) {
                dataObject.setOdataUrl(query)
            }
            requestOptions["dataObject"] = dataObject;
            entityCtrlr.fetchResponseWithRecords(requestOptions, success, error);

            function success(response) {
                resultSet[entityName] = response;
                scopeObj.fetchJoinsDataMap(queryMap.joins, resultSet, fetchContext, joinSuccess, error)
            }

            function joinSuccess(response) {
                onSuccess.call(scopeObj, response[entityName]);
                return
            }

            function error(response) {
                onError.call(scopeObj, response)
            }
        },
        fetchJoinsDataMap: function(queryMapList, resultSet, fetchContext, onSuccess, onError) {
            var scopeObj = this;
            var indx = 0;
            fetchJoinDataMap(indx);

            function fetchJoinDataMap(indx) {
                if (indx >= queryMapList.length) {
                    onSuccess.call(scopeObj, resultSet);
                    return
                }
                var queryMap = queryMapList[indx];
                fetchContext["filter"] = undefined;
                if (resultSet[queryMap.parentEntity] && resultSet[queryMap.parentEntity]["records"] && resultSet[queryMap.parentEntity]["records"].length === 1) {
                    fetchContext["filter"] = getFilterString(queryMap.relFields, resultSet[queryMap.parentEntity]["records"])
                }
                scopeObj.fetchDataMap(queryMap, fetchContext, success, onError);

                function success(response) {
                    joinResultSet(queryMapList[indx], response);
                    fetchJoinDataMap(++indx)
                }

                function error(response) {
                    onError.call(scopeObj, response)
                }
            }

            function joinResultSet(queryMap, response) {
                response = response["records"];
                var relFields = queryMap.relFields;
                var parentEntity = queryMap.parentEntity;
                var entityName = queryMap.entityName;
                var modResponse = {};
                for (var i in response) {
                    var key = "";
                    for (var j in relFields) {
                        key = key + response[i][relFields[j]["referencedField"]] + "~"
                    }
                    if (!modResponse[key]) modResponse[key] = [];
                    modResponse[key].push(response[i])
                }
                if (resultSet[parentEntity] && resultSet[parentEntity]["records"]) {
                    var records = resultSet[parentEntity]["records"];
                    for (var i in records) {
                        var key = "";
                        for (var j in relFields) {
                            key = key + records[i][relFields[j]["referencingField"]] + "~"
                        }
                        records[i][entityName] = modResponse[key]
                    }
                }
            }

            function getFilterString(relFields, parentResult) {
                if (parentResult && parentResult.length > 0) {
                    var parentRow = parentResult[0];
                    var filter = "&$filter=";
                    for (var j = 1; j < relFields.length; j++) {
                        filter = filter + relFields[j - 1]["referencedField"] + " eq '" + parentRow[relFields[j - 1]["referencingField"]] + "' and "
                    }
                    filter = filter + relFields[j - 1]["referencedField"] + " eq '" + parentRow[relFields[j - 1]["referencingField"]] + "'";
                    return filter
                }
            }
        },
        updateChildFilter: function(entityName, serviceName, options, childEntityName, query, parentRow) {
            var entityCtrlr = this.getModel(entityName, serviceName, options);
            var relatedEntities = entityCtrlr.getRelatedEntities();
            var updatedQuery;
            if (relatedEntities[childEntityName]) {
                var relFields = relatedEntities[childEntityName]["relationshipFields"];
                if (!query || query === "") {
                    updatedQuery = "&$filter="
                } else if (query.indexOf("&$filter=") === -1) {
                    updatedQuery = query + "&$filter="
                } else {
                    updatedQuery = query + " and "
                }
                for (var j = 1; j < relFields.length; j++) {
                    updatedQuery = updatedQuery + relFields[j - 1]["referencedField"] + " eq '" + parentRow[relFields[j - 1]["referencingField"]] + "' and "
                }
                updatedQuery = updatedQuery + relFields[j - 1]["referencedField"] + " eq '" + parentRow[relFields[j - 1]["referencingField"]] + "'";
                return updatedQuery
            } else {
                return query
            }
        }
    }
});
kony.sdk.mvvm.persistent.ORMControllerMFAPPODataExpand = Class(kony.sdk.mvvm.persistent.ORMControllerMFAPPSuper, function() {
    var appContext;
    return {
        constructor: function(applicationContext) {
            this.$class.$super.call(this, applicationContext);
            appContext = applicationContext;
            var ORMController = undefined;
            this.getApplicationContext = function() {
                return appContext
            };
            this.getModel = function(entityName, serviceName, options) {
                return this.getApplicationContext().getModel(entityName, serviceName, options)
            };
            this.getORMController = function() {
                if (!ORMController) {
                    var appFactoryInstance = this.getApplicationContext().getFactorySharedInstance();
                    ORMController = appFactoryInstance.createORMControllerOdataObject(this.getApplicationContext())
                }
                return ORMController
            }
        },
        fetchRecordByPrimaryKey: function(fetchContext, onSuccess, onError) {
            try {
                var scopeObj = this;
                var entityName = fetchContext["entityName"];
                var primaryFieldValueMap = fetchContext["primaryKeyValueMap"];
                var primaryKeyValuesArr = Object.keys(primaryFieldValueMap);
                if (primaryKeyValuesArr.length > 0) {
                    var filter = fetchContext["filter"];
                    if (!filter) filter = "";
                    filter = filter + "&$filter=";
                    for (var j = 1; j < primaryKeyValuesArr.length; j++) {
                        filter = filter + primaryKeyValuesArr[j - 1] + " eq '" + primaryFieldValueMap[primaryKeyValuesArr[j - 1]] + "' and "
                    }
                    filter = filter + primaryKeyValuesArr[j - 1] + " eq '" + primaryFieldValueMap[primaryKeyValuesArr[j - 1]] + "'";
                    fetchContext["filter"] = filter
                }
                this.fetchByColumns(fetchContext, onSuccess, onError)
            } catch (e) {
                var err = this.getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_ORM_CONTROLLER_FETCH_RECORD_PK, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_ORM_CONTROLLER_FETCH_RECORD_PK, e);
                onError(err)
            }
        },
        fetchByNativeQuery: function(fetchContext, onSuccess, onError) {
            this.getORMController().fetchByNativeQuery(fetchContext, onSuccess, onError)
        },
        fetchByColumns: function(fetchContext, onSuccess, onError) {
            try {
                var scopeObj = this;
                var entityName = fetchContext["entityName"];
                var serviceName = fetchContext["serviceName"];
                var serviceOptions = fetchContext["serviceOptions"];
                var columnsdef = fetchContext["columnsdef"];
                var entityCtrlr = this.getModel(entityName, serviceName, serviceOptions);
                var queryMap = this.getFetchQueryMap(entityName, columnsdef, serviceName, serviceOptions);
                this.fetchDataMap(queryMap, fetchContext, success, onError);

                function success(response) {
                    onSuccess.call(scopeObj, response);
                }
            } catch (e) {
                var err = this.getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_ORM_CONTROLLER_FETCH_RECORDS_BY_COLUMN_DEFINITION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_ORM_CONTROLLER_FETCH_RECORDS_BY_COLUMN_DEFINITION, e);
                onError(err)
            }
        },
        getFetchQueryMap: function(entityName, columnsdef, serviceName, options, parentReference) {
            try {
                var queryMap = {};
                queryMap.entityName = entityName;
                queryMap.joins = [];
                queryMap.expand = undefined;
                var entityCtrlr = appContext.getModel(entityName, serviceName, options);
                if (parentReference && parentReference["relFields"]) {
                    queryMap.parentEntity = parentReference["entityName"];
                    queryMap.relFields = parentReference["relFields"]
                }
                var columnsMap = {};
                for (var column in columnsdef) {
                    if (entityCtrlr.getColumnInfo(column)) {
                        columnsMap[column] = true
                    } else {
                        var relatedEntities = entityCtrlr.getRelatedEntities();
                        if (relatedEntities[column]) {
                            var relFields = relatedEntities[column]["relationshipFields"];
                            var reference = {};
                            reference.entityName = entityName;
                            reference.relFields = relFields;
                            var subQueryMap = this.getFetchQueryMap(column, columnsdef[column], serviceName, options, reference);
                            queryMap.joins.push(subQueryMap);
                            if (queryMap.expand) queryMap.expand = queryMap.expand + "," + subQueryMap.expand;
                            else queryMap.expand = subQueryMap.expand
                        } else {
                            kony.sdk.mvvm.log.error("error in orm controller prepare query json, reference table name not defined : " + column)
                        }
                    }
                }
                if (Object.keys(columnsMap).length > 0) {
                    var len = queryMap.joins.length;
                    for (var i = 0; i < len; i += 1) {
                        var relFields = queryMap.joins[i].relFields;
                        for (var idx in relFields) {
                            columnsMap[relFields[idx]["referencingField"]] = true
                        }
                    }
                    queryMap.joins = [];
                    if (queryMap.relFields) {
                        for (var idx in queryMap.relFields) {
                            columnsMap[queryMap.relFields[idx]["referencedField"]] = true
                        }
                    }
                    var pkColumns = entityCtrlr.getValueForProperty("primaryKey");
                    for (var idx in pkColumns) {
                        columnsMap[pkColumns[idx]] = true
                    }
                }
                var columnStr = "$select=";
                for (var column in columnsMap) {
                    columnStr += column + ","
                }
                if (columnStr[columnStr.length - 1] !== "=") columnStr = columnStr.slice(0, columnStr.length - 1);
                var expandStr = "&$expand=";
                if (queryMap.expand) {
                    expandStr += queryMap.expand;
                    queryMap.expand = entityName + "," + queryMap.expand
                } else {
                    queryMap.expand = entityName
                }
                queryMap.query = columnStr;
                return queryMap
            } catch (e) {
                throw this.getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_ORM_CONTROLLER_PREPARE_FETCH_QUERY, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_ORM_CONTROLLER_PREPARE_FETCH_QUERY, e)
            }
        },
        fetchDataMap: function(queryMap, fetchContext, onSuccess, onError) {
            this.getORMController().fetchDataMap(queryMap, fetchContext, onSuccess, onError)
        },
        updateChildFilter: function(entityName, serviceName, options, childEntityName, query, parentRow) {
            return this.getORMController().updateChildFilter(entityName, serviceName, options, childEntityName, query, parentRow)
        }
    }
});
kony.sdk.mvvm.persistent.ORMControllerMFAPPSQL = Class(kony.sdk.mvvm.persistent.ORMControllerMFAPPSuper, function() {
    var appContext;
    return {
        constructor: function(applicationContext) {
            this.$class.$super.call(this, applicationContext);
            appContext = applicationContext;
            this.getApplicationContext = function() {
                return appContext
            };
            this.getModel = function(entityName, serviceName, options) {
                return this.getApplicationContext().getModel(entityName, serviceName, options)
            }
        },
        fetchRecordByPrimaryKey: function(fetchContext, onSuccess, onError) {
            try {
                var scopeObj = this;
                var entityName = fetchContext["entityName"];
                var primaryFieldValueMap = fetchContext["primaryKeyValueMap"];
                var primaryKeyValuesArr = Object.keys(primaryFieldValueMap);
                if (primaryKeyValuesArr.length > 0) {
                    var filter = "where ";
                    for (var j = 1; j < primaryKeyValuesArr.length; j++) {
                        filter = filter + '"' + entityName + '"."' + primaryKeyValuesArr[j - 1] + "\" = '" + primaryFieldValueMap[primaryKeyValuesArr[j - 1]] + "' and "
                    }
                    filter = filter + '"' + entityName + '"."' + primaryKeyValuesArr[j - 1] + "\" = '" + primaryFieldValueMap[primaryKeyValuesArr[j - 1]] + "'";
                    fetchContext["filter"] = filter
                }
                this.fetchByColumns(fetchContext, onSuccess, onError)
            } catch (e) {
                var err = this.getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_ORM_CONTROLLER_FETCH_RECORD_PK, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_ORM_CONTROLLER_FETCH_RECORD_PK, e);
                onError(err)
            }
        },
        fetchByNativeQuery: function(fetchContext, onSuccess, onError) {
            try {
                var scopeObj = this;
                var entityName = fetchContext["entityName"];
                var serviceName = fetchContext["serviceName"];
                var serviceOptions = fetchContext["serviceOptions"];
                var query = fetchContext["filter"];
                var modelObj = this.getModel(entityName, serviceName, serviceOptions);
                modelObj.executeSelectQuery(query, success, error);

                function success(response) {
                    onSuccess.call(scopeObj, response)
                }

                function error(response) {
                    onError.call(scopeObj, response)
                }
            } catch (e) {
                var err = this.getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_ORM_CONTROLLER_FETCH_RECORDS_BY_NATIVE_QUERY, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_ORM_CONTROLLER_FETCH_RECORDS_BY_NATIVE_QUERY, e);
                onError(err)
            }
        },
        fetchByColumns: function(fetchContext, onSuccess, onError) {
            try {
                var scopeObj = this;
                var entityName = fetchContext["entityName"];
                var serviceName = fetchContext["serviceName"];
                var serviceOptions = fetchContext["serviceOptions"];
                var columnsdef = fetchContext["columnsdef"];
                var entityCtrlr = this.getModel(entityName, serviceName, serviceOptions);
                var queryMap = this.getFetchQueryMap(entityName, columnsdef, serviceName, serviceOptions);
                this.fetchDataMap(queryMap, fetchContext, success, onError);

                function success(response) {
                    onSuccess.call(scopeObj, response)
                }
            } catch (e) {
                var err = this.getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_ORM_CONTROLLER_FETCH_RECORDS_BY_COLUMN_DEFINITION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_ORM_CONTROLLER_FETCH_RECORDS_BY_COLUMN_DEFINITION, e);
                onError(err)
            }
        },
        getFetchQueryMap: function(entityName, columnsdef, serviceName, options, parentReference) {
            try {
                var queryMap = {};
                queryMap.entityName = entityName;
                queryMap.joins = [];
                var entityCtrlr = appContext.getModel(entityName, serviceName, options);
                if (parentReference && parentReference["relFields"]) {
                    queryMap.parentEntity = parentReference["entityName"];
                    queryMap.relFields = parentReference["relFields"]
                }
                var columnsMap = {};
                for (var column in columnsdef) {
                    if (entityCtrlr.getColumnInfo(column)) {
                        columnsMap[column] = true
                    } else {
                        var relatedEntities = entityCtrlr.getRelatedEntities();
                        if (relatedEntities[column]) {
                            var relFields = relatedEntities[column]["relationshipFields"];
                            var reference = {};
                            reference.entityName = entityName;
                            reference.relFields = relFields;
                            var subQueryMap = this.getFetchQueryMap(column, columnsdef[column], serviceName, options, reference);
                            queryMap.joins.push(subQueryMap)
                        } else {
                            kony.sdk.mvvm.log.error("error in orm controller prepare query json, reference table name not defined : " + column)
                        }
                    }
                }
                if (Object.keys(columnsMap).length > 0) {
                    var len = queryMap.joins.length;
                    for (var i = 0; i < len; i += 1) {
                        var relFields = queryMap.joins[i].relFields;
                        for (var idx in relFields) {
                            columnsMap[relFields[idx]["referencingField"]] = true
                        }
                    }
                    if (queryMap.relFields) {
                        for (var idx in queryMap.relFields) {
                            columnsMap[queryMap.relFields[idx]["referencedField"]] = true
                        }
                    }
                    var pkColumns = entityCtrlr.getValueForProperty("primaryKey");
                    for (var idx in pkColumns) {
                        columnsMap[pkColumns[idx]] = true
                    }
                }
                var columnStr = "select ";
                for (var column in columnsMap) {
                    columnStr += '"' + column + '",'
                }
                if (columnStr[columnStr.length - 1] === ",") columnStr = columnStr.slice(0, columnStr.length - 1);
                else columnStr += "*";
                columnStr += ' from "' + entityName + '"';
                queryMap.query = columnStr;
                return queryMap
            } catch (e) {
                throw this.getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_ORM_CONTROLLER_PREPARE_FETCH_QUERY, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_ORM_CONTROLLER_PREPARE_FETCH_QUERY, e)
            }
        },
        fetchDataMap: function(queryMap, fetchContext, onSuccess, onError) {
            var scopeObj = this;
            var resultSet = {};
            var serviceName = fetchContext["serviceName"];
            var serviceOptions = fetchContext["serviceOptions"];
            var filter = fetchContext["filter"];
            var entityName = queryMap.entityName;
            var query = queryMap.query;
            if (filter) {
                query = query + " " + filter
            }
            var entityCtrlr = scopeObj.getModel(entityName, serviceName, serviceOptions);
            entityCtrlr.executeSelectQuery(query, success, error);

            function success(response) {
                resultSet[entityName] = response;
                scopeObj.fetchJoinsDataMap(queryMap.joins, resultSet, fetchContext, joinSuccess, error)
            }

            function joinSuccess(response) {
                onSuccess.call(scopeObj, response[entityName]);
                return
            }

            function error(response) {
                onError.call(scopeObj, response)
            }
        },
        fetchJoinsDataMap: function(queryMapList, resultSet, fetchContext, onSuccess, onError) {
            var scopeObj = this;
            var indx = 0;
            fetchJoinDataMap(indx);

            function fetchJoinDataMap(indx) {
                if (indx >= queryMapList.length) {
                    onSuccess.call(scopeObj, resultSet);
                    return
                }
                var queryMap = queryMapList[indx];
                fetchContext["filter"] = undefined;
                if (resultSet[queryMap.parentEntity] && resultSet[queryMap.parentEntity].length === 1) {
                    fetchContext["filter"] = getFilterString(queryMap.relFields, resultSet[queryMap.parentEntity])
                }
                scopeObj.fetchDataMap(queryMap, fetchContext, success, onError);

                function success(response) {
                    joinResultSet(queryMapList[indx], response);
                    fetchJoinDataMap(++indx)
                }

                function error(response) {
                    onError.call(scopeObj, response)
                }
            }

            function joinResultSet(queryMap, response) {
                var relFields = queryMap.relFields;
                var parentEntity = queryMap.parentEntity;
                var entityName = queryMap.entityName;
                var modResponse = {};
                for (var i in response) {
                    var key = "";
                    for (var j in relFields) {
                        key = key + response[i][relFields[j]["referencedField"]] + "~"
                    }
                    if (!modResponse[key]) modResponse[key] = [];
                    modResponse[key].push(response[i])
                }
                if (resultSet[parentEntity]) {
                    for (var i in resultSet[parentEntity]) {
                        var key = "";
                        for (var j in relFields) {
                            key = key + resultSet[parentEntity][i][relFields[j]["referencingField"]] + "~"
                        }
                        resultSet[parentEntity][i][entityName] = modResponse[key]
                    }
                }
            }

            function getFilterString(relFields, parentResult) {
                if (parentResult && parentResult.length > 0) {
                    var parentRow = parentResult[0];
                    var filter = "where ";
                    for (var j = 1; j < relFields.length; j++) {
                        filter = filter + '"' + relFields[j - 1]["referencedField"] + "\" = '" + parentRow[relFields[j - 1]["referencingField"]] + "' and "
                    }
                    filter = filter + '"' + relFields[j - 1]["referencedField"] + "\" = '" + parentRow[relFields[j - 1]["referencingField"]] + "'";
                    return filter
                }
            }
        },
        updateChildFilter: function(entityName, serviceName, options, childEntityName, query, parentRow) {
            var entityCtrlr = this.getModel(entityName, serviceName, options);
            var relatedEntities = entityCtrlr.getRelatedEntities();
            var updatedQuery;
            if (relatedEntities[childEntityName]) {
                var relFields = relatedEntities[childEntityName]["relationshipFields"];
                if (!query || query === "") {
                    updatedQuery = "where "
                } else {
                    updatedQuery = query + " and "
                }
                for (var j = 1; j < relFields.length; j++) {
                    updatedQuery = updatedQuery + '"' + relFields[j - 1]["referencedField"] + "\" = '" + parentRow[relFields[j - 1]["referencingField"]] + "' and "
                }
                updatedQuery = updatedQuery + '"' + relFields[j - 1]["referencedField"] + "\" = '" + parentRow[relFields[j - 1]["referencingField"]] + "'";
                return updatedQuery
            } else {
                return query
            }
        }
    }
});
kony.sdk.mvvm.persistent.DataWidgetResultProcessor = Class({
    $statics: {
        process: function(record, groupWidgetConfig) {
            var appFactoryInstance = kony.sdk.mvvm.KonyApplicationContext.getFactorySharedInstance();
            try {
                var widgetConfig = groupWidgetConfig["widgets"];
                var widgets = Object.keys(widgetConfig);
                var fieldName, fieldNameArray;
                var formmodel, propData, len, propValue;
                propValue = {};
                formmodel = [];
                var fields = widgetConfig[widgets[0]].getField();
                var rowObj;
                var aliasName;
                for (var key in record) {
                    rowObj = {};
                    if (record[key]["primaryKeyValueMap"]) {
                        rowObj["primaryKeyValueMap"] = record[key]["primaryKeyValueMap"]
                    }
                    for (var field in fields) {
                        if (fields[field].getFieldtype() && fields[field].getFieldtype() === "computed") {
                            continue
                        }
                        fieldName = fields[field].getFieldName();
                        aliasName = fields[field].getAliasName();
                        if (!fieldName && !aliasName) {
                            continue
                        }
                        if (!aliasName) {
                            aliasName = "";
                            for (var indx in fieldName) aliasName = aliasName + "_" + fieldName[indx];
                            aliasName = aliasName.substring(1, aliasName.length)
                        }
                        for (var indx in fieldName) {
                            fieldNameArray = fieldName[indx].split(".");
                            len = fieldNameArray.length;
                            propData = record[key];
                            for (var i = 1; i < len; i++) {
                                propData = propData[fieldNameArray[i - 1]];
                                if (propData && propData[0]) {
                                    propData = propData[0]
                                } else {
                                    propData = null;
                                    break
                                }
                            }
                            if (propData) propData = propData[fieldNameArray[i - 1]];
                            propValue[fieldName[indx]] = propData
                        }
                        var postProcessor = fields[field].getPostProcessor();
                        if (postProcessor) {
                            if (typeof postProcessor == "function") propData = postProcessor(propValue);
                            else {
                                var processor = eval(postProcessor);
                                if (typeof processor == "function") propData = processor(propValue)
                            }
                        } else {
                            if (fieldName.length != 1) kony.sdk.mvvm.log.error("postProcessor is not Defined for " + fields[field].getWidgetId())
                        }
                        rowObj[aliasName] = propData
                    }
                    formmodel.push(rowObj)
                }
                if (groupWidgetConfig["widgetGroupId"] !== "form") var widgetType = widgetConfig[widgets[0]].getWidgetType();
                if (widgetType && widgetType.toLowerCase() === "segment") {
                    formmodel = kony.sdk.mvvm.Util.format.segmentData(formmodel, widgetConfig[widgets[0]])
                }
                var formModelObj = {};
                formModelObj[widgets[0]] = appFactoryInstance.createDataObject(formmodel);
                return formModelObj
            } catch (e) {
                throw appFactoryInstance.createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_ORM_CONTROLLER_UNMARSHALL_TO_MODEL_OBJECT, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_ORM_CONTROLLER_UNMARSHALL_TO_MODEL_OBJECT, e)
            }
        }
    }
});
kony.sdk.mvvm.persistent.WidgetResultProcessor = Class({
    $statics: {
        process: function(record, groupWidgetConfig) {
            var appFactoryInstance = kony.sdk.mvvm.KonyApplicationContext.getFactorySharedInstance();
            try {
                if (record instanceof Array) {
                    record = record[0]
                }
                var widgetConfig = groupWidgetConfig["widgets"];
                var widgets = Object.keys(widgetConfig);
                var fieldName, fieldNameArray;
                var formmodel, propData, len, propValue;
                propValue = {};
                formmodel = {};
                for (var indx in widgets) {
                    if (widgetConfig[widgets[indx]].isConstrained()) {
                        continue
                    }
                    fieldName = widgetConfig[widgets[indx]].getField();
                    if (!fieldName) {
                        continue
                    }
                    for (var key in fieldName) {
                        fieldNameArray = fieldName[key].split(".");
                        len = fieldNameArray.length;
                        propData = record;
                        for (var i = 1; i < len; i++) {
                            propData = propData[fieldNameArray[i - 1]];
                            if (propData && propData[0]) {
                                propData = propData[0]
                            } else {
                                propData = null;
                                break
                            }
                        }
                        if (propData) propData = propData[fieldNameArray[i - 1]];
                        propValue[fieldName[key]] = propData
                    }
                    var postProcessor = widgetConfig[widgets[indx]].getPostProcessor();
                    if (postProcessor) {
                        if (typeof postProcessor == "function") propData = postProcessor(propValue);
                        else {
                            var processor = eval(postProcessor);
                            if (typeof processor == "function") propData = processor(propValue)
                        }
                    } else {
                        if (fieldName.length != 1) kony.sdk.mvvm.log.error("postProcessor is not Defined for " + widgetConfig[widgets[indx]].getWidgetId())
                    }
                    formmodel[widgets[indx]] = appFactoryInstance.createDataObject(propData)
                }
                return formmodel
            } catch (e) {
                throw appFactoryInstance.createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_ORM_CONTROLLER_UNMARSHALL_TO_MODEL_OBJECT, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_ORM_CONTROLLER_UNMARSHALL_TO_MODEL_OBJECT, e)
            }
        }
    }
});
kony.sdk.mvvm.persistent.Record = Class({
    constructor: function(entityName) {
        var info = {};
        this.getInfo = function(prop) {
            return info && info[prop]
        };
        this.setInfo = function(prop, infoArg) {
            info = info || {};
            info[prop] = infoArg
        };
        this.setInfo("entity", entityName);
        this.setInfo("remove", false)
    },
    get: function(prop) {
        return this[prop]
    },
    set: function(prop, value) {
        this[prop] = value
    }
});
kony.sdk.mvvm.SyncManagerMF = Class(kony.sdk.mvvm.AppInitServiceMangerInterface, {
    constructor: function() {},
    init: function(syncOptions, successcallback, errorcallback) {
        var scopeObj = this;
        var resetConfirmationHandler = undefined;
        if (syncOptions && syncOptions["resetConfirmationHandler"]) resetConfirmationHandler = syncOptions["resetConfirmationHandler"];
        this.resetSyncIfNecessary(resetSuccess, resetError, resetConfirmationHandler);

        function resetSuccess() {
            var syncCriteria = scopeObj.validateSyncOptions(syncOptions);
            var syncConfig;
            if (syncOptions && syncOptions.hasOwnProperty("syncConfig")) syncConfig = syncOptions["syncConfig"];
            kony.sdk.mvvm.log.info("Sync Criteria recieved is " + syncCriteria);
            if (syncCriteria == "skipEverything") {
                successcallback();
                return
            }
            scopeObj.saveUserDetails();
            if (syncCriteria == "startSync") {
                scopeObj.sync(successcallback, errorcallback, syncConfig)
            } else if (syncCriteria == "syncData") {
                scopeObj.sync(successcallback, errorcallback, syncConfig)
            } else if (syncCriteria == "InitSync") {
                scopeObj.syncInit(successcallback, errorcallback)
            } else successcallback()
        }

        function resetError(err) {
            kony.sdk.mvvm.log.error("Error occured while resetting sync");
            errorcallback(err)
        }
    },
    sync: function(successcallback, errorCallback, syncConfig) {
        var scopeObj = this;
        this.syncInit(initSuccess, initError);

        function initSuccess() {
            scopeObj.syncData(successcallback, errorCallback, syncConfig)
        }

        function initError() {
            errorCallback()
        }
    },
    syncInit: function(success, error) {
        var syncObj = kony.sdk.getCurrentInstance().getSyncService();
        syncObj.init(success, error)
    },
    resetSyncIfNecessary: function(success, error, resetConfirmationHandler) {
        var scopeObj = this;
        var credStore = kony.store.getItem(kony.sdk.mvvm.credStoreName);
        if (credStore !== null && credStore !== undefined) {
            var loginDetails = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getUserCredentialObj().getData("UserCredentials", true);
            var authParams = loginDetails["authParams"];
            var username = authParams["userid"];
            var storedUsername = credStore[kony.sdk.mvvm.credStoreUsername];
            if (storedUsername !== undefined && kony.sdk.mvvm.Utils.matchIgnoreCase(storedUsername, username)) {
                success()
            } else {
                if (typeof resetConfirmationHandler == "function") resetConfirmationHandler(handler);
                else this.reset(success, error);

                function handler(doReset) {
                    if (doReset == true) scopeObj.reset(success, error);
                    else success()
                }
            }
        } else success()
    },
    reset: function(successcallback, errorCallback) {
        kony.sdk.mvvm.log.info("Resetting sync");
        kony.sdk.getCurrentInstance().getSyncService().reset(resetSuccess, resetError);

        function resetSuccess() {
            kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
            successcallback()
        }

        function resetError() {
            errorCallback()
        }
    },
    rollback: function(rollbackSuccess, rollbackError) {
        var syncObj = kony.sdk.getCurrentInstance().getSyncService();
        syncObj.rollbackPendingLocalChanges(rollbackSuccess, rollbackError)
    },
    syncData: function(successcallback, errorCallback, syncConfig) {
        kony.sdk.mvvm.log.info("Syncing Data");
        var scopeObj = this;
        scopeObj.startSyncForScope(successcallback, errorCallback, false, syncConfig)
    },
    startSyncForScope: function(syncscopeSuccesscallback, syncscopeErrorcallback, isMetadata, config) {
        if (!config || typeof config !== "object") config = {};
        else config = kony.sdk.mvvm.util.cloneObject(config);
        if (!config.hasOwnProperty("onsyncstart")) config.onsyncstart = kony.sdk.mvvm.onsyncstartCallback;
        if (!config.hasOwnProperty("onscopestart")) config.onscopestart = kony.sdk.mvvm.onscopestartCallback;
        if (!config.hasOwnProperty("onscopesuccess")) config.onscopesuccess = kony.sdk.mvvm.onscopesuccessCallback;
        if (!config.hasOwnProperty("onbatchstored")) config.onbatchstored = kony.sdk.mvvm.onbatchstoredCallback;
        if (!config.hasOwnProperty("onbatchprocessingsuccess")) config.onbatchprocessingsuccess = kony.sdk.mvvm.onbatchprocessingsuccessCallback;
        config.onsyncsuccess = syncSuccess;
        config.onsyncerror = syncError;
        var syncObj = kony.sdk.getCurrentInstance().getSyncService();
        syncObj.startSession(config);

        function syncSuccess() {
            kony.sdk.mvvm.onsyncsuccessCallback();
            syncscopeSuccesscallback()
        }

        function syncError(err) {
            kony.sdk.mvvm.onsyncerrorCallback(err);
            syncscopeErrorcallback(err)
        }
    },
    validateSyncOptions: function(syncOptions) {
        if (kony.sdk.mvvm.KonyApplicationContext.getAppInstance().isAppSyncEnabled() === false) return "skipEverything";
        if (syncOptions) {
            var syncData = syncOptions["syncData"];
            if (syncData === false) {
                if (this.validateWithStoredCredentials() == true) return "InitSync";
                else return "skipEverything"
            } else if (syncData === true) {
                return "syncData"
            } else {
                return "startSync"
            }
        } else {
            return "startSync"
        }
    },
    saveUserDetails: function() {
        kony.sdk.mvvm.KonyApplicationContext.getFactorySharedInstance().getAuthManager().saveUserDetails()
    },
    manualSync: function(syncOptions, success, error) {
        try {
            var loginDetails = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getUserCredentialObj().getData("UserCredentials", true);
            var authParams = loginDetails["authParams"];
            var options = loginDetails["options"];
            var identityServiceName = loginDetails["identityServiceName"];
            var authConfig = {
                authParams: authParams,
                options: options,
                identityServiceName: identityServiceName
            };
            var syncParams = {
                syncOptions: syncOptions
            };
            var appfactoryInstance = kony.sdk.mvvm.KonyApplicationContext.getFactorySharedInstance();
            var initManager = appfactoryInstance.createAppInitManagerObject();
            initManager.registerService("AuthenticationServiceManager", {
                object: appfactoryInstance.createAuthManager(),
                params: authConfig
            });
            initManager.registerService("SyncManager", {
                object: appfactoryInstance.createSyncManagerObject(),
                params: syncParams
            });
            initManager.registerService("MetadataServiceManager", {
                object: appfactoryInstance.createMetadataServiceManagerObject(),
                params: {
                    options: options
                }
            });
            initManager.executeRegistedServices(success, error)
        } catch (err) {
            kony.sdk.mvvm.log.error("Error while doing manual sync");
            error(err)
        }
    },
    execute: function(params, success, error) {
        var syncOptions = params["syncOptions"];
        this.init(syncOptions, success, error)
    },
    validateWithStoredCredentials: function() {
        var loginDetails = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getUserCredentialObj().getData("UserCredentials", true);
        return !kony.sdk.mvvm.KonyApplicationContext.getAppInstance().isAppsFirstLogin(loginDetails)
    }
});
kony = kony || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.constants = kony.sdk.mvvm.constants || {};
kony.sdk.mvvm.constants["version"] = "1.0";
var SyncProgressManager = Class({
    constructor: function() {
        this.scopesObj;
        this.progressInfo = {
            Download: {},
            Upload: {}
        };
        this.progressHandler;
        progressMng = this
    },
    createConfigObject: function(progressHandler) {
        this.progressHandler = progressHandler;
        var syncConfigObj = {
            onbatchprocessingsuccess: this.batchSuccessCallback
        };
        return syncConfigObj
    },
    batchSuccessCallback: function(response) {
        var result = {};
        if (response.hasOwnProperty("batchcontext")) {
            var presentSyncingObjects = response["batchcontext"]["objectlevelinfo"];
            var scopeName = response["currentScope"];
            var currentSyncProgressInfo = progressMng.getProgressInfoForScope(scopeName, "Download");
            var syncingObjectsInLastBatch = progressMng.getSyncingObjectsInLastBatch(scopeName, "Download");
            for (each in presentSyncingObjects) {
                if (currentSyncProgressInfo[each] == sync_status.NOT_YET_STARTED) currentSyncProgressInfo[each] = sync_status.STARTED;
                if (syncingObjectsInLastBatch.indexOf(each) != -1) syncingObjectsInLastBatch.splice(syncingObjectsInLastBatch.indexOf(each), 1)
            }
            if (syncingObjectsInLastBatch.length) {
                for (index in syncingObjectsInLastBatch) {
                    currentSyncProgressInfo[syncingObjectsInLastBatch[index]] = sync_status.COMPLETED
                }
            }
            progressMng.setProgressInfoForScope(scopeName, currentSyncProgressInfo, "Download");
            var progress = progressMng.getSyncStatus(scopeName, "Download");
            var totalObj = progress["TotalObjects"];
            var completedObj = progress["CompletedObjects"];
            result["Download"] = progress;
            kony.print("Download -- " + completedObj + " / " + totalObj)
        }
        if (response.hasOwnProperty("uploadRequest")) {
            var uploadReqs = JSON.parse(response["uploadRequest"]["UploadRequest"])["d"]["results"];
            var currentSyncProgressInfo = progressMng.getProgressInfoForScope(scopeName, "Upload");
            var syncingObjectsInLastBatch = progressMng.getSyncingObjectsInLastBatch(scopeName, "Upload");
            var presentSyncingObjects = [];
            for (var index in uploadReqs) {
                var objName = uploadReqs[index]["metadata"]["type"];
                presentSyncingObjects.push(objName)
            }
            for (each in presentSyncingObjects) {
                if (currentSyncProgressInfo[presentSyncingObjects[each]] == sync_status.NOT_YET_STARTED) currentSyncProgressInfo[presentSyncingObjects[each]] = sync_status.STARTED;
                if (syncingObjectsInLastBatch.indexOf(presentSyncingObjects[each]) != -1) syncingObjectsInLastBatch.splice(syncingObjectsInLastBatch.indexOf(presentSyncingObjects[each]), 1)
            }
            if (syncingObjectsInLastBatch.length) {
                for (index in syncingObjectsInLastBatch) {
                    currentSyncProgressInfo[syncingObjectsInLastBatch[index]] = sync_status.COMPLETED
                }
            }
            progressMng.setProgressInfoForScope(scopeName, currentSyncProgressInfo, "Upload");
            var progress = progressMng.getSyncStatus(scopeName, "Upload");
            progress["CompletedObjects"] = presentSyncingObjects.length;
            var totalObj = progress["TotalObjects"];
            var completedObj = progress["CompletedObjects"];
            result["Upload"] = progress;
            kony.print("Upload -- " + completedObj + " / " + totalObj)
        }
        progressMng.progressHandler(result)
    },
    getSyncScopesMappingObject: function() {
        if (this.scopesObj) return this.scopesObj;
        var scopesArray = konysyncClientSyncConfig["ArrayOfSyncScope"];
        var finalScopesObj = {};
        for (var index in scopesArray) {
            var eachScope = scopesArray[index];
            var scopeName = eachScope["ScopeName"];
            var scopeTables = eachScope["ScopeTables"];
            finalScopesObj[scopeName] = [];
            for (var index1 in scopeTables) {
                finalScopesObj[scopeName].push(scopeTables[index1]["Name"])
            }
        }
        this.scopesObj = finalScopesObj;
        return this.scopesObj
    },
    setProgressInfoForScope: function(scopeName, progressObj, reqType) {
        this.progressInfo[reqType][scopeName] = progressObj
    },
    getProgressInfoForScope: function(scopeName, reqType) {
        if (this.progressInfo[reqType].hasOwnProperty(scopeName)) return this.progressInfo[reqType][scopeName];
        var objects = this.getSyncScopesMappingObject()[scopeName];
        var progressObj = {};
        for (index in objects) {
            progressObj[objects[index]] = sync_status.NOT_YET_STARTED
        }
        return progressObj
    },
    getSyncingObjectsInLastBatch: function(scopeName, reqType) {
        var progressInfo = this.getProgressInfoForScope(scopeName, reqType);
        var syncingObjects = [];
        for (each in progressInfo) {
            if (progressInfo[each] == sync_status.STARTED) syncingObjects.push(each)
        }
        return syncingObjects
    },
    getSyncStatus: function(scopeName, reqType) {
        var progressInfo = this.getProgressInfoForScope(scopeName, reqType);
        var totalObjects = 0;
        var completedObjects = 0;
        for (each in progressInfo) {
            if (progressInfo[each] == sync_status.COMPLETED) completedObjects += 1;
            totalObjects += 1
        }
        return {
            TotalObjects: totalObjects,
            CompletedObjects: completedObjects
        }
    }
});

function InitSync() {
    var syncObj = kony.sdk.getCurrentInstance().getSyncService();
    syncObj.init(success, error);

    function success() {
        alert("Init success")
    }

    function error(err) {
        alert("Init failed with err " + JSON.stringify(err))
    }
}

function startSync() {
    function handleSyncProgress(progressObj) {
        if (progressObj.hasOwnProperty("Download")) {
            var totalObj = progressObj["Download"]["TotalObjects"];
            var completedObj = progressObj["Download"]["CompletedObjects"];
            Home.downloadObjectsCount.text = "Downloaded " + completedObj + " of " + totalObj + " objects";
            if (totalObj == completedObj) {
                kony.print("SyncProgress :: All objects downloaded")
            } else updateProgress(completedObj / totalObj * 100, "Download")
        }
        if (progressObj.hasOwnProperty("Upload")) {
            var totalObj = progressObj["Upload"]["TotalObjects"];
            var completedObj = progressObj["Upload"]["CompletedObjects"];
            Home.uploadObjectsCount.text = "Uploaded " + completedObj + " of " + totalObj + " objects";
            if (totalObj == completedObj) kony.print("SyncProgress :: All objects uploaded");
            else updateProgress(completedObj / totalObj * 100, "Upload")
        }
    }
    var syncConfig = (new SyncProgressManager).createConfigObject(handleSyncProgress);
    syncConfig["batchsize"] = 5e3;
    syncConfig["onsyncstart"] = showPopup;
    syncConfig.onsyncsuccess = success;
    syncConfig.onsyncerror = error;
    syncConfig["onscopestart"] = function() {};
    var syncObj = kony.sdk.getCurrentInstance().getSyncService();
    syncObj.startSession(syncConfig);

    function success() {
        kony.print("Sync succeded, waiting for progress to complete");
        completeProgress(function() {
            alert("Sync Success");
            hidePopup()
        })
    }

    function error(err) {
        alert("error " + JSON.stringify(err));
        hidePopup()
    }
}

function resetSync() {
    var syncObj = kony.sdk.getCurrentInstance().getSyncService();
    syncObj.reset(success, error);

    function success() {
        alert("Reset success")
    }

    function error(err) {
        alert("Reset failed with err " + JSON.stringify(err))
    }
}

function rollbackSync() {
    var syncObj = kony.sdk.getCurrentInstance().getSyncService();
    syncObj.rollbackPendingLocalChanges(success, error);

    function success() {
        alert("Rollback success")
    }

    function error(err) {
        alert("Rollback failed with err " + JSON.stringify(err))
    }
}

function stopSync() {
    var syncObj = kony.sdk.getCurrentInstance().getSyncService();
    syncObj.stopSession(success);

    function success() {
        hidePopup();
        kony.print("Sync stopped")
    }
}
sync_status = {
    NOT_YET_STARTED: 0,
    STARTED: 1,
    COMPLETED: 2
};

function resetProgressBar() {
    Home.downloadProgressButton.width = "0%";
    Home.DownloadProgressLabel.text = "0%";
    Home.uploadProgressButton.width = "0%";
    Home.uploadProgressLabel.text = "0%";
    Home.downloadObjectsCount.text = "Downloaded 0 of 0 objects";
    Home.uploadObjectsCount.text = "Uploaded 0 of 0 objects";
    lastProgress = {
        Upload: 0,
        Download: 0
    }
}

function showPopup() {
    resetProgressBar();
    Home.SyncFlex.isVisible = true;
    Home.BlurContainer.isVisible = true
}

function hidePopup() {
    Home.SyncFlex.isVisible = false;
    Home.BlurContainer.isVisible = false
}

function updateIncrementally(progressValue, reqType) {
    var speed = .05;
    var progressButton, progressLabel;
    if (reqType == "Download") {
        progressButton = Home.downloadProgressButton;
        progressLabel = Home.DownloadProgressLabel
    } else if (reqType == "Upload") {
        progressButton = Home.uploadProgressButton;
        progressLabel = Home.uploadProgressLabel
    }
    kony.timer.schedule("syncProgress" + reqType + progressValue, incrementProgress, speed, true);

    function incrementProgress() {
        var presentWidth = parseInt(progressButton.width.split("%")[0]);
        presentWidth += 1;
        progressLabel.text = presentWidth + "%";
        progressButton.width = presentWidth + "%";
        if (presentWidth >= progressValue) {
            kony.timer.cancel("syncProgress" + reqType + progressValue)
        }
    }
}

function completeProgress(handler) {
    var speed = .01;
    var progressValue = 100;
    progressButton_download = Home.downloadProgressButton;
    progressLabel_download = Home.DownloadProgressLabel;
    progressButton_upload = Home.uploadProgressButton;
    progressLabel_upload = Home.uploadProgressLabel;
    kony.timer.schedule("syncProgress" + progressValue, incrementProgress, speed, true);

    function incrementProgress() {
        var downloadPresentWidth = parseInt(progressButton_download.width.split("%")[0]);
        if (downloadPresentWidth < 100) {
            downloadPresentWidth += 1;
            progressButton_download.width = downloadPresentWidth + "%";
            progressLabel_download.text = downloadPresentWidth + "%"
        }
        var uploadPresentWidth = parseInt(progressButton_upload.width.split("%")[0]);
        if (uploadPresentWidth < 100) {
            uploadPresentWidth += 1;
            progressLabel_upload.text = uploadPresentWidth + "%";
            progressButton_upload.width = uploadPresentWidth + "%"
        }
        if (downloadPresentWidth >= progressValue && uploadPresentWidth >= progressValue) {
            kony.timer.cancel("syncProgress" + progressValue);
            handler()
        }
    }
}

function updateProgress(progress, reqType) {
    if (lastProgress[reqType] != progress) {
        lastProgress[reqType] = progress;
        updateIncrementally(progress, reqType)
    }
}
kony = kony || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.log = kony.sdk.mvvm.log || {};
kony.sdk.mvvm.constants = kony.sdk.mvvm.constants || {};
kony.sdk.mvvm.success_code = false;
kony.sdk.mvvm.error_code = false;
kony.sdk.mvvm.isForTesting = undefined;
kony.sdk.mvvm.Platforms = {
    IPHONE: "iphone",
    IPAD: "ipad",
    TABRCANDROID: "tabrcandroid",
    ANDROID: "android"
};
kony.sdk.mvvm.Channels = {
    MOBILE: "mobile",
    TABLET: "tablet"
};
kony.sdk.mvvm.TestConstants = {};
kony.sdk.mvvm.initializeHostSettings = function(hostID) {
    kony.sdk.mvvm.constants["HOST_URL"] = hostID !== undefined && hostID !== null && hostID !== "" && typeof hostID === "string" ? hostID : "http://10.0.2.2:9080";
    kony.sdk.mvvm.constants["CUSTOMSERVICE_ENDPOINT"] = kony.sdk.mvvm.constants["HOST_URL"] + "/SaaSFoundationWS/customservice/v1/";
    kony.sdk.mvvm.constants["DATA_ENDPOINT"] = kony.sdk.mvvm.constants["HOST_URL"] + "/SaaSFoundationWS/data/v1/";
    kony.sdk.mvvm.constants["SYNC_ENDPOINT"] = kony.sdk.mvvm.constants["HOST_URL"] + "/SaaSFoundationWS/sync/v1";
    kony.sdk.mvvm.constants["AUTH_ENDPOINT"] = kony.sdk.mvvm.constants["HOST_URL"] + "/SaaSFoundationWS/authenticate";
    kony.sdk.mvvm.constants["AUTH_USER_PROFILE_ENDPOINT"] = kony.sdk.mvvm.constants["HOST_URL"] + "/SaaSFoundationWS/authenticate/userProfile";
    kony.sdk.mvvm.constants["AUTH_USER_AUTH_PROFIlE_ENDPOINT"] = kony.sdk.mvvm.constants["HOST_URL"] + "/SaaSFoundationWS/authenticate/userAuthProfile";
    kony.sdk.mvvm.constants["METADATA_ENDPOINT"] = kony.sdk.mvvm.constants["HOST_URL"] + "/SaaSFoundationWS/metadata/v1";
    kony.sdk.mvvm.constants["RELATED_ENTITY_ENDPOINT"] = kony.sdk.mvvm.constants["HOST_URL"] + "/SaaSFoundationWS/data/v1/relatedentities";
    kony.sdk.mvvm.constants["CUSTOMIZABLE_METADATA_ENDPOINT"] = kony.sdk.mvvm.constants["HOST_URL"] + "/SaaSFoundationWS/metadata/v1/customizableMetadata";
    kony.sdk.mvvm.constants["HTTP_METHOD_GET"] = "GET";
    kony.sdk.mvvm.constants["HTTP_METHOD_POST"] = "POST";
    kony.sdk.mvvm.constants["UICONFIG_ENDPOINT"] = kony.sdk.mvvm.constants["HOST_URL"] + "/SaaSFoundationWS/uiconfig/v1/formdata";
    kony.sdk.mvvm.constants["TEMPLATES_ENDPOINT"] = kony.sdk.mvvm.constants["HOST_URL"] + "/SaaSFoundationWS/uiconfig/v1/application/templates";
    kony.sdk.mvvm.constants["THEME_ENDPOINT"] = kony.sdk.mvvm.constants["HOST_URL"] + "/SaaSFoundationWS/uiconfig/v1/application/themedata";
    kony.sdk.mvvm.constants["APPPROPS_ENDPOINT"] = kony.sdk.mvvm.constants["HOST_URL"] + "/SaaSFoundationWS/uiconfig/v1/application/applicationproperties";
    kony.sdk.mvvm.constants["DEVICE_ID"] = "";
    kony.sdk.mvvm.constants["ENABLE_COMPLETE_LOGS"] = "false";
    kony.sdk.mvvm.constants["APP_MENU_KEY"] = "APP_MENU";
    kony.sdk.mvvm.constants["CURRENT_APP_THEME"] = null;
    kony.sdk.mvvm.constants["KONY_DEFAULT_THEME"] = "default";
    kony.sdk.mvvm.constants["VIZ_DEFAULT_THEME"] = "defaultTheme";
    kony.sdk.mvvm.constants["MODELER_STORED_THEMES_LIST"] = "generatedThemes";
    kony.sdk.mvvm.metricsPayload = null;
    kony.sdk.mvvm.constants["AFNLocalDBName"] = "AFNLocalDB"
};
kony.sdk.mvvm.initializeHostSettings();
kony.sdk.mvvm.constants["GET_METADATA_OBJECT_FIELDS"] = "SELECT ent.id AS entityId, ent.name AS entityName, ent.displayname As entDisplayName, ent.isjunction as entJunction, ent.sourceentityname AS  entSrcName, " + " fm.name AS fieldName, fm.displayname AS fmDisplayName, fm.sourcefieldname AS fmSrcName, fm.datatype AS fmDataType, fm.hasindex AS " + "fmHasIndx, fm.isunique fmIsUnique, fm.id AS fieldMappingId, fm.isprimarykey AS fmIsPrimaryKey, fm.isnamefield AS fmIsNameField, " + " fm.isnullable AS fmIsNullable, fm.iscustom AS fmIsCustom,fm.iscustomizable AS fmIsCustomizable, fm.iscreateable AS fmIsCreateable, fm.isupdateable AS fmIsUpdateable, fm.isaudit AS fmIsAudit, " + " fm.relationship_id AS fmRelationshipId, (SELECT name FROM fieldmapping WHERE id = fm.parent_fieldmapping_id AND softdeleteflag = 'false') AS referencingField, " + " (SELECT name FROM entitytype WHERE id = fm.parent_entitytype_id AND softdeleteflag = 'false') AS referenceTo, " + " (SELECT relationship_name FROM entityrelationship WHERE id = fm.relationship_id AND softdeleteflag = 'false') AS relationshipName, " + " (SELECT f.name FROM fieldmapping f where  id=(Select referenced_field_id from entityrelationship er where fm.relationship_id = er.id and softdeleteflag='false' ) and softdeleteflag='false') AS referencedField, " + " (select sourcefieldname from fieldmapping where id = fm.parent_fieldmapping_id AND softdeleteflag = 'false') AS parent_fieldname, " + " (select sourcefieldname from fieldmapping ifm inner join entityrelationship ier " + " ON ifm.id = ier.referencing_field_id AND ier.id = fm.relationship_id WHERE ifm.softdeleteflag = 'false' AND ier.softdeleteflag = 'false') as foreign_key, " + " (SELECT name FROM fieldmapping WHERE id = fm.parent_namefield_id AND softdeleteflag = 'false') AS parentNameField, " + "fm.fieldlength AS fieldlength, pv.value AS pickvalue, pv.label AS picklabel, pv.id AS pickid, pv.fieldmapping_id AS pickfieldmappingid, " + "pv.active AS pickactive, pv.defaultvalue AS pickdefaultvalue, pv.validfor AS pickvalidfor " + "FROM entitytype ent LEFT OUTER JOIN fieldmapping fm ON ent.id = fm.entitytype_id  AND fm.softdeleteflag = 'false' " + "LEFT OUTER JOIN picklistvalues pv ON fm.id = pv.fieldmapping_id AND pv.softdeleteflag = 'false' " + "WHERE ent.softdeleteflag = 'false' AND lower(ent.name) = lower(?) AND fm.sourcefieldname is not null AND trim(fm.sourcefieldname) <> '' order by entityId";
kony.sdk.mvvm.constants["FETCH_ENTITY_RELATIONS_BY_ENTITYID"] = "SELECT er.id as id, (SELECT ent.name FROM entitytype ent WHERE ent.id = er.referenced_entity_id " + "AND ent.softdeleteflag = 'false') AS parentEntityName, (SELECT ent.name FROM entitytype ent WHERE ent.id = er.referencing_entity_id " + "AND ent.softdeleteflag = 'false') AS childEntityName, er.relationship_name AS relationshipName, " + "(SELECT fm.name FROM fieldmapping fm where fm.id = er.referencing_field_id AND fm.softdeleteflag = 'false') AS referencing_field_name, " + "er.relationship_type AS relationshipType, " + "(SELECT name FROM entitytype ent WHERE ent.id = er.junction_table_id AND ent.softdeleteflag = 'false') AS junction_table ," + "er.iscustom as isCustom " + "FROM entityrelationship er INNER JOIN entitytype ent ON er.referencing_entity_id = ent.id AND ent.isjunction = 'false' " + "WHERE er.referenced_entity_id = ? AND er.softdeleteflag = 'false' AND ent.softdeleteflag = 'false' " + "UNION " + "SELECT er.id as id, (SELECT ent.name FROM entitytype ent WHERE ent.id = er.referencing_entity_id " + "AND ent.softdeleteflag = 'false') AS parentEntityName, (SELECT ent.name FROM entitytype ent WHERE ent.id = er.referenced_entity_id " + "AND ent.softdeleteflag = 'false') AS childEntityName, er.relationship_name AS relationshipName, " + "(SELECT fm.name FROM fieldmapping fm where fm.id = er.referencing_field_id AND fm.softdeleteflag = 'false') AS referencing_field_name, " + "er.relationship_type AS relationshipType, " + "(SELECT name FROM entitytype ent WHERE ent.id = er.junction_table_id AND ent.softdeleteflag = 'false') AS junction_table ," + "er.iscustom as isCustom " + "FROM entityrelationship er INNER JOIN entitytype ent ON er.referencing_entity_id = ent.id AND ent.isjunction = 'false' " + "WHERE er.referencing_entity_id = ? AND er.relationship_type = 'ManyToMany' AND er.softdeleteflag = 'false' AND ent.softdeleteflag = 'false'";
kony.sdk.mvvm.constants["picklist"] = "picklist";
kony.sdk.mvvm.constants["reference"] = "reference";
kony.sdk.mvvm.constants["picklistmultiselect"] = "picklistmultiselect";
kony.sdk.mvvm.constants["extendedfield"] = "extendedfield";
kony.sdk.mvvm.constants["entityMetadataMap"] = {};
kony.sdk.mvvm.constants["INTEGER_MIN_VALUE"] = -2147483648;
kony.sdk.mvvm.constants["INTEGER_MAX_VALUE"] = 2147483647;
kony.sdk.mvvm.Aggregation = {
    NONE: "",
    COUNT: "COUNT",
    SUM: "SUM",
    MAX: "MAX",
    MIN: "MIN",
    AVG: "AVG"
};
kony.sdk.mvvm.OrderType = {
    ASCENDING: "ASC",
    DESCENDING: "DESC"
};
kony.sdk.mvvm.MatchType = {
    EQUALS: {
        value: "=",
        name: "EQUALS"
    },
    GREATER: {
        value: ">",
        name: "GREATER"
    },
    GREATEREQUAL: {
        value: ">=",
        name: "GREATEREQUAL"
    },
    LESS: {
        value: "<",
        name: "LESS"
    },
    LESSEQUAL: {
        value: "<=",
        name: "LESSEQUAL"
    },
    STARTSWITH: {
        value: "LIKE",
        name: "STARTSWITH"
    },
    CONTAINS: {
        value: "LIKE",
        name: "CONTAINS"
    },
    LIKE: {
        value: "LIKE",
        name: "LIKE"
    },
    ENDSWITH: {
        value: "LIKE",
        name: "ENDSWITH"
    },
    NOTEQUAL: {
        value: "<>",
        name: "NOTEQUAL"
    },
    ISNULL: {
        value: "IS NULL",
        name: "ISNULL"
    },
    ISNOTNULL: {
        value: "IS NOT NULL",
        name: "ISNOTNULL"
    }
};
kony.sdk.mvvm.JoinType = {
    INNER: "INNER",
    LEFT: "LEFT",
    RIGHT: "RIGHT"
};
kony.sdk.mvvm.ParameterType = {
    IN: "IN",
    OUT: "OUT",
    INOUT: "INOUT"
};
kony.sdk.mvvm.ColumnUsage = {
    SELECTCOLUMN: "0",
    CRITERIACOLUMN: "1",
    UPDATECOLUMN: "2",
    INSERTCOLUMN: "3"
};
kony.sdk.mvvm.Operator = {
    AND: "AND",
    OR: "OR"
};
kony = kony || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.v2 = kony.sdk.mvvm.v2 || {};
kony.sdk.mvvm.DataAccessAppsExceptionCode = {
    CD_ERROR_10000: 1e4,
    CD_ERROR_10001: 10001,
    CD_ERROR_10002: 10002,
    CD_ERROR_10003: 10003,
    CD_ERROR_10004: 10004,
    CD_ERROR_10005: 10005,
    CD_ERROR_10006: 10006,
    CD_ERROR_10007: 10007,
    CD_ERROR_10008: 10008,
    CD_ERROR_10009: 10009,
    CD_ERROR_10010: 10010,
    CD_ERROR_10011: 10011,
    CD_ERROR_10012: 10012,
    CD_ERROR_10013: 10013,
    CD_ERROR_10014: 10014,
    CD_ERROR_10015: 10015,
    CD_ERROR_10016: 10016,
    CD_ERROR_10017: 10017,
    CD_ERROR_10018: 10018,
    CD_ERROR_10019: 10019,
    CD_ERROR_10020: 10020,
    CD_ERROR_10021: 10021,
    CD_ERROR_10022: 10022,
    CD_ERROR_10023: 10023,
    CD_ERROR_10024: 10024,
    CD_ERROR_10025: 10025,
    CD_ERROR_10026: 10026,
    CD_ERROR_10027: 10027,
    CD_ERROR_10028: 10028,
    CD_ERROR_10029: 10029,
    CD_ERROR_10030: 10030,
    CD_ERROR_10031: 10031,
    CD_ERROR_10032: 10032,
    CD_ERROR_10033: 10033,
    CD_ERROR_10034: 10034,
    CD_ERROR_10035: 10035,
    CD_ERROR_10036: 10036,
    CD_ERROR_10037: 10037,
    CD_ERROR_10038: 10038,
    CD_ERROR_10039: 10039,
    CD_ERROR_10040: 10040,
    CD_ERROR_10041: 10041,
    CD_ERROR_10042: 10042,
    CD_ERROR_10043: 10043,
    CD_ERROR_10044: 10044,
    CD_ERROR_10045: 10045,
    CD_ERROR_10046: 10046,
    CD_ERROR_10047: 10047,
    CD_ERROR_10048: 10048,
    CD_ERROR_10049: 10049,
    CD_ERROR_10050: 10050,
    CD_ERROR_10051: 10051,
    CD_ERROR_10052: 10052,
    CD_ERROR_10053: 10053,
    CD_ERROR_10054: 10054,
    CD_ERROR_10055: 10055,
    CD_ERROR_10056: 10056,
    CD_ERROR_10057: 10057,
    CD_ERROR_10058: 10058,
    CD_ERROR_10059: 10059,
    CD_ERROR_10060: 10060,
    CD_ERROR_10061: 10061,
    CD_ERROR_10062: 10062,
    CD_ERROR_10063: 10063,
    CD_ERROR_10064: 10064,
    CD_ERROR_10065: 10065,
    CD_ERROR_10066: 10066,
    CD_ERROR_10067: 10067,
    CD_ERROR_10068: 10068,
    CD_ERROR_10069: 10069,
    CD_ERROR_10070: 10070,
    CD_ERROR_10071: 10071,
    CD_ERROR_10072: 10072,
    CD_ERROR_10073: 10073,
    CD_ERROR_10074: 10074,
    CD_ERROR_10075: 10075,
    CD_ERROR_10076: 10076,
    CD_ERROR_10077: 10077,
    CD_ERROR_10078: 10078,
    CD_ERROR_10079: 10079,
    CD_ERROR_10080: 10080,
    CD_ERROR_10081: 10081,
    CD_ERROR_10082: 10082,
    CD_ERROR_10083: 10083,
    CD_ERROR_10084: 10084,
    CD_ERROR_10085: 10085,
    CD_ERROR_10086: 10086,
    CD_ERROR_10087: 10087,
    CD_ERROR_10088: 10088,
    CD_ERROR_10089: 10089,
    CD_ERROR_10090: 10090,
    CD_ERROR_10091: 10091,
    CD_ERROR_10092: 10092,
    CD_ERROR_10094: 10094,
    CD_ERROR_10095: 10095,
    CD_ERROR_10096: 10096,
    CD_ERROR_10097: 10097,
    CD_ERROR_10098: 10098,
    CD_ERROR_10099: 10099,
    CD_ERROR_10100: 10100,
    CD_ERROR_10101: 10101,
    CD_ERROR_10102: 10102,
    CD_ERROR_10104: 10104,
    CD_ERROR_10105: 10105,
    CD_ERROR_10106: 10106,
    CD_ERROR_10108: 10108,
    CD_ERROR_10109: 10109,
    CD_ERROR_10110: 10110,
    CD_ERROR_10111: 10111,
    CD_ERROR_10112: 10112,
    CD_ERROR_10113: 10113,
    CD_ERROR_10114: 10114,
    CD_ERROR_10115: 10115,
    CD_ERROR_10116: 10116,
    CD_ERROR_10117: 10117,
    CD_ERROR_10118: 10118,
    CD_ERROR_10119: 10119,
    CD_ERROR_10120: 10120,
    CD_ERROR_10121: 10121,
    CD_ERROR_10122: 10122,
    CD_ERROR_10123: 10123,
    CD_ERROR_10124: 10124,
    CD_ERROR_10125: 10125,
    CD_ERROR_10126: 10126,
    CD_ERROR_10127: 10127,
    CD_ERROR_10128: 10128,
    CD_ERROR_10129: 10129,
    CD_ERROR_10130: 10130,
    CD_ERROR_10131: 10131,
    CD_ERROR_10132: 10132,
    CD_ERROR_10133: 10133,
    CD_ERROR_10134: 10134,
    CD_ERROR_10135: 10135,
    CD_ERROR_10136: 10136,
    CD_ERROR_10137: 10137,
    CD_ERROR_10138: 10138,
    CD_ERROR_10139: 10139,
    CD_ERROR_10140: 10140,
    CD_ERROR_10141: 10141,
    CD_ERROR_10142: 10142,
    CD_ERROR_10143: 10143,
    CD_ERROR_10144: 10144,
    CD_ERROR_10145: 10145,
    CD_ERROR_10146: 10146,
    CD_ERROR_10147: 10147,
    CD_ERROR_10148: 10148,
    CD_ERROR_10149: 10149,
    MSG_ERROR_10000: "Unable to execute delete query",
    MSG_ERROR_10001: "SQLLite Error occurred",
    MSG_ERROR_10002: "Invalid Table configuration in the Database",
    MSG_ERROR_10003: "Entity does not exist in the Database",
    MSG_ERROR_10004: "There is no relationship/definiton defined for the Entity in Enterprise DB",
    MSG_ERROR_10005: "Invalid column name",
    MSG_ERROR_10006: "Column does not exist in the Database",
    MSG_ERROR_10007: "Unable to execute Insert query",
    MSG_ERROR_10008: "Specified column datatype doesnot match with datatype from field mapping",
    MSG_ERROR_10009: "Unique constraint check failed as the data already exist in DB",
    MSG_ERROR_10010: "Specified foreign key is not found",
    MSG_ERROR_10011: "Unable to execute Select query",
    MSG_ERROR_10012: "Invalid Meta Column Name Usage. Correct usage is COLUMNNAME__f",
    MSG_ERROR_10013: "Invalid Meta Column Name Usage in Join Clause. Correct usage is COLUMNNAME__f",
    MSG_ERROR_10014: "Unable to execute update query",
    MSG_ERROR_10015: "No columns specified for updating",
    MSG_ERROR_10016: "Column name either null or empty in update builder",
    MSG_ERROR_10017: "Specified foreign key is not found, Rolled back transaction",
    MSG_ERROR_10018: "Value is null",
    MSG_ERROR_10019: "Column data type does not match the value",
    MSG_ERROR_10020: "No columns specified for update",
    MSG_ERROR_10021: "Invalid table name",
    MSG_ERROR_10022: "Connection NOT created from pool",
    MSG_ERROR_10023: "User id invalid",
    MSG_ERROR_10024: "Invalid arguments to com.kony.common.DataAccess.Query.Between Constructor",
    MSG_ERROR_10025: "Invalid arguments to setColumn of com.kony.common.DataAccess.Query.Between",
    MSG_ERROR_10026: "Invalid arguments to setRange of com.kony.common.DataAccess.Query.Between",
    MSG_ERROR_10027: "Invalid Column name passed to com.kony.common.DataAccess.Query.Column Constructor .\nExpected:Table\nActual:",
    MSG_ERROR_10028: "Invalid data type for the attribute in com.kony.common.DataAccess.Query.Column Constructor",
    MSG_ERROR_10029: "Invalid ColumnName to SetName of com.kony.common.DataAccess.Query.Column",
    MSG_ERROR_10030: "Invalid arguments to setTable of com.kony.common.DataAccess.Query.Column",
    MSG_ERROR_10031: "Invalid arguments to com.kony.common.DataAccess.Query.Range.DateRange Constructor",
    MSG_ERROR_10032: "Invalid arguments to setEnd of com.kony.common.DataAccess.Query.Range.DateRange",
    MSG_ERROR_10033: "Invalid arguments to setStart of com.kony.common.DataAccess.Query.Range.DateRange",
    MSG_ERROR_10034: "Invalid arguments to com.kony.common.DataAccess.Query.Range.DecimalRange Constructor",
    MSG_ERROR_10035: "Invalid arguments to setEnd of com.kony.common.DataAccess.Query.Range.DecimalRange",
    MSG_ERROR_10036: "Invalid arguments to setStart of com.kony.common.DataAccess.Query.Range.DecimalRange",
    MSG_ERROR_10037: "Invalid data type for the attribute subSelect in com.kony.common.DataAccess.Query.Exists Constructor \nExpected:SelectQuery\nActual:",
    MSG_ERROR_10038: "Invalid data type for the attribute subSelect in com.kony.common.DataAccess.Query.Exists.prototype.setSubSelect \nExpected:SelectQuery\nActual:",
    MSG_ERROR_10039: "Invalid arguments to com.kony.common.DataAccess.Query.Expression Constructor",
    MSG_ERROR_10040: "Invalid number of arguments to com.kony.common.DataAccess.Query.Expression",
    MSG_ERROR_10041: "Invalid Operator type passed to com.kony.common.DataAccess.Query.Expression",
    MSG_ERROR_10042: "Invalid arguments for the attribute com.kony.common.DataAccess.Query.Expression initExpression",
    MSG_ERROR_10043: "Invalid arguments for the attribute com.kony.common.DataAccess.Query.Expression setExpression",
    MSG_ERROR_10044: "Invalid arguments for the attribute com.kony.common.DataAccess.Query.Expression setTerm",
    MSG_ERROR_10045: "Invalid arguments to setEnd of com.kony.common.DataAccess.Query.Range.FloatRange",
    MSG_ERROR_10046: "Invalid arguments to setStart of com.kony.common.DataAccess.Query.Range.FloatRange",
    MSG_ERROR_10047: "Invalid argument for the attribute in com.kony.common.DataAccess.Query.Group",
    MSG_ERROR_10048: "Invalid arguments for the attribute in com.kony.common.DataAccess.Query.Group.prototype.setColumn",
    MSG_ERROR_10049: "Invalid number of arguments passed to com.kony.common.DataAccess.Query.InCriteria",
    MSG_ERROR_10050: "Invalid arguments for getInCriteriaByTableAndCollection in com.kony.common.DataAccess.Query.InCriteria",
    MSG_ERROR_10051: "Invalid arguments for getInCriteriaByColumnAndCollection in com.kony.common.DataAccess.Query.InCriteria",
    MSG_ERROR_10052: "Invalid arguments for getColumnForTable in com.kony.common.DataAccess.Query.InCriteria",
    MSG_ERROR_10053: "Invalid arguments to com.kony.common.DataAccess.Query.Range.IntegerRange Constructor",
    MSG_ERROR_10054: "Invalid arguments to setEnd of com.kony.common.DataAccess.Query.Range.IntegerRange",
    MSG_ERROR_10055: "Invalid arguments to setStart of com.kony.common.DataAccess.Query.Range.IntegerRange",
    MSG_ERROR_10056: "Invalid arguments passed for  com.kony.common.DataAccess.Query.Join",
    MSG_ERROR_10057: "Invalid arguments passed for the method in com.kony.common.DataAccess.Query.Join",
    MSG_ERROR_10058: "Invalid arguments passed for the method setCriteria in com.kony.common.DataAccess.Query.Join",
    MSG_ERROR_10059: "Invalid arguments passed for the method setTable in com.kony.common.DataAccess.Query.Join",
    MSG_ERROR_10060: "Invalid arguments passed for the method setJoinType in com.kony.common.DataAccess.Query.Join",
    MSG_ERROR_10061: "Invalid arguments passed for the method initCriteria in com.kony.common.DataAccess.Query.Join",
    MSG_ERROR_10062: "Insufficient input passed to com.kony.common.DataAccess.Query.And Constructor",
    MSG_ERROR_10063: "Invalid data type for com.kony.common.DataAccess.Query.And Expected value Criteria",
    MSG_ERROR_10064: "Insufficient input passed to com.kony.common.DataAccess.Query.Or Constructor",
    MSG_ERROR_10065: "Invalid data type for com.kony.common.DataAccess.Query.Or Expected value Criteria",
    MSG_ERROR_10066: "Insufficient input passed to com.kony.common.DataAccess.Query.Not Constructor",
    MSG_ERROR_10067: "Invalid data type for com.kony.common.DataAccess.Query.Not Expected value Criteria",
    MSG_ERROR_10068: "Invalid match type passed in com.kony.common.DataAccess.Query.Match.prototype.initMatchByColumn",
    MSG_ERROR_10069: "Invalid value passed in com.kony.common.DataAccess.Query.Match.prototype.initMatchByColumn",
    MSG_ERROR_10070: "Invalid arguments passed for the method initMatchByColumn in com.kony.common.DataAccess.Query.Match.prototype.initMatchByColumn.",
    MSG_ERROR_10071: "Invalid match type passed in com.kony.common.DataAccess.Query.Match.prototype.initMatchByTableAndColName",
    MSG_ERROR_10072: "Invalid value passed in com.kony.common.DataAccess.Query.Match.prototype.initMatchByTableAndColName",
    MSG_ERROR_10073: "Invalid columnName passed in com.kony.common.DataAccess.Query.Match.prototype.initMatchByTableAndColName",
    MSG_ERROR_10074: "Invalid arguments passed for the method initMatchByTableAndColName in com.kony.common.DataAccess.Query.Match",
    MSG_ERROR_10075: "Match object not initialized properly  in com.kony.common.DataAccess.Query.Match",
    MSG_ERROR_10076: "Invalid arguments passed for the constructor in com.kony.common.DataAccess.Query.Order",
    MSG_ERROR_10077: "Invalid arguments for the method setColumn in com.kony.common.DataAccess.Query.Order",
    MSG_ERROR_10078: "Invalid arguments to com.kony.common.DataAccess.Query.Range.StringRange Constructor",
    MSG_ERROR_10079: "Invalid arguments to setEnd of com.kony.common.DataAccess.Query.Range.StringRange",
    MSG_ERROR_10080: "Invalid arguments to setStart of com.kony.common.DataAccess.Query.Range.StringRange",
    MSG_ERROR_10081: "Invalid Arguments passed to DeleteBuilder.addCriteria",
    MSG_ERROR_10082: "Invalid data type for the attribute in DeleteBuilder.addCriteria. Expected: Criteria | Actual:",
    MSG_ERROR_10083: "Invalid data type for the attribute in DeleteBuilder . Expected: Table | Actual:",
    MSG_ERROR_10084: "Invalid data type for the attribute in com.kony.common.DataAccess.Query.InsertQuery .\nExpected:Table\nActual:",
    MSG_ERROR_10085: "Invalid data type for the attribute in com.kony.common.DataAccess.Query.InsertQuery.prototype.addColumn .\nExpected:Column\nActual:",
    MSG_ERROR_10086: "Invalid data type for the attribute in com.kony.common.DataAccess.Query.InsertQuery.prototype.addColumnToTable .\nExpected:String\nActual:",
    MSG_ERROR_10087: "Invalid data type for the attribute in com.kony.common.DataAccess.Query.InsertQuery.prototype.addColumnToTable .\nExpected:Table\nActual:",
    MSG_ERROR_10088: "Invalid data type for the attribute in com.kony.common.DataAccess.Query.InsertQuery.prototype.removeColumn .\nExpected:Table\nActual:",
    MSG_ERROR_10089: "Invalid Arguments passed to SelectBuilder",
    MSG_ERROR_10090: "Invalid data type for the attribute in SelectBuilder .\nExpected:Table\nActual:",
    MSG_ERROR_10091: "Invalid Arguments passed to selectBuilder.addColumn",
    MSG_ERROR_10092: "Invalid data type for the attribute in selectBuilder.addColumn .\nExpected:Column\nActual:",
    MSG_ERROR_10094: "Invalid data type for the attribute in SelectBuilder.\nExpected:Table\nActual:",
    MSG_ERROR_10095: "Invalid Arguments of Alias passed to selectBuilder ",
    MSG_ERROR_10096: "Invalid data type for the attribute in selectBuilder.\nExpected:Table\nActual:",
    MSG_ERROR_10097: "Invalid Arguments passed to selectBuilder.addCriteria",
    MSG_ERROR_10098: "Invalid data type for the attribute in selectBuilder.addCriteria .\nExpected:Criteria\nActual:",
    MSG_ERROR_10099: "Invalid Arguments passed to selectBuilder.addGroup",
    MSG_ERROR_10100: "Invalid data type for the attribute in selectBuilder.addGroup .\nExpected:Group\nActual:",
    MSG_ERROR_10101: "Invalid Arguments passed to selectBuilder.addJoin",
    MSG_ERROR_10102: "Invalid data type for the attribute in SelectBuilder.addJoin .\nExpected:Criteria\nActual:",
    MSG_ERROR_10104: "Invalid data type for the attribute in SelectBuilder",
    MSG_ERROR_10105: "Invalid Arguments passed to selectBuilder.addOrder",
    MSG_ERROR_10106: "Invalid data type for the attribute in selectBuilder.addOrder \nExpected:Order\nActual:",
    MSG_ERROR_10108: "Invalid data type for the attribute in SelectBuilder \nExpected:Table\nActual:",
    MSG_ERROR_10109: "Invalid Arguments passed to selectBuilder.removeColumn",
    MSG_ERROR_10110: "Invalid data type for the attribute in selectBuilder.removeColumn \nExpected:Column\nActual:",
    MSG_ERROR_10111: "Invalid Arguments passed to selectBuilder.removeCriteria",
    MSG_ERROR_10112: "Invalid data type for the attribute in selectBuilder.removeCriteria \nExpected:Criteria\nActual:",
    MSG_ERROR_10113: "Invalid Arguments passed to selectBuilder.removeGroup",
    MSG_ERROR_10114: "Invalid data type for the attribute in selectBuilder.removeGroup \nExpected:Group\nActual:",
    MSG_ERROR_10115: "Invalid Arguments passed to selectBuilder.removeJoin",
    MSG_ERROR_10116: "Invalid data type for the attribute in selectBuilder.removeJoin \nExpected:Group\nActual:",
    MSG_ERROR_10117: "Invalid data type for the attribute in SelectBuilder \nExpected:Group\nActual:",
    MSG_ERROR_10118: "Invalid Arguments passed to UpdateQuery",
    MSG_ERROR_10119: "Invalid data type for the attribute in UpdateQuery .\nExpected:Table\nActual:",
    MSG_ERROR_10120: "Invalid Arguments passed to UpdateBuilder.addColumn method",
    MSG_ERROR_10121: "Invalid data type for the attribute in UpdateBuilder.addColumn method",
    MSG_ERROR_10122: "Invalid Arguments passed to UpdateBuilder.addColumnByColumnNameAndValue",
    MSG_ERROR_10123: "Invalid data type for the attribute in UpdateBuilder.addColumnByColumnNameAndValue",
    MSG_ERROR_10124: "Invalid Arguments passed to UpdateBuilder.addCriteria",
    MSG_ERROR_10125: "Invalid data type for the attribute in UpdateBuilder.addCriteria .\nExpected:Criteria\nActual:",
    MSG_ERROR_10126: "Invalid Arguments passed to UpdateBuilder.removeCriteria",
    MSG_ERROR_10127: "Invalid data type for the attribute in UpdateBuilder.removeCriteria .\nExpected:Criteria\nActual:",
    MSG_ERROR_10128: "Invalid Arguments passed to UpdateBuilder",
    MSG_ERROR_10129: "Invalid data type for the attribute in UpdateBuilder .\nExpected:Table\nActual:",
    MSG_ERROR_10130: "Invalid number of arguments to com.kony.common.DataAccess.Query.InsertQuery.prototype.addColumn",
    MSG_ERROR_10131: "unknown database error occured. please verify the table and columns names.",
    MSG_ERROR_10132: "No parent keys found.",
    MSG_ERROR_10133: "field object is empty",
    MSG_ERROR_10134: "Given JoinType doesn't support",
    MSG_ERROR_10135: "Cannot insert record as the integrity failed with",
    MSG_ERROR_10136: "error occurred during language fetch",
    MSG_ERROR_10137: "No logical fields exist for the table",
    MSG_ERROR_10138: "unknown database error occured. please verify the table and column names/values.",
    MSG_ERROR_10139: "Invalid number of arguments to com.kony.common.DataAccess.Query.Match",
    MSG_ERROR_10140: "Invalid number of arguments to com.kony.common.DataAccess.Query.Join",
    MSG_ERROR_10141: "Entity with name doesn't exist",
    MSG_ERROR_10142: "Invalid Meta Column Name Usage, Correct usage COLUMNNAME__f",
    MSG_ERROR_10143: "Table does not exist in the database",
    MSG_ERROR_10144: "Column does not exist in table",
    MSG_ERROR_10145: "Table is undefined.Please provide valid table name",
    MSG_ERROR_10146: "Invalid Arguments passed to DeleteBuilder",
    MSG_ERROR_10147: "Invalid Arguments passed to InsertBuilder",
    MSG_ERROR_10148: "No data found to update with the selected criteria",
    MSG_ERROR_10149: "The request could not be completed."
};
kony.sdk.mvvm.Exception = Class(Error, function() {
    function toStringRecursive(exception, output) {
        var intermOutput;
        if (exception == undefined) return output.append("");
        if (exception.getErrorObj()) {
            if (exception.getErrorObj().name && exception.getErrorObj().message) output.append(exception.getErrorObj().name + ": " + exception.getErrorObj().message + ": " + exception.getErrorObj().sourceURL);
            else output.append(JSON.stringify(exception.getErrorObj()));
            output.append("\n");
            return output.append(exception.code + ":" + exception.message + "\n")
        }
        intermOutput = toStringRecursive(exception.exceptionObj, output);
        intermOutput.append(exception.code + ":" + exception.message);
        intermOutput.append("\n");
        return intermOutput
    }

    function getRootErrObj(exception) {
        if (exception && exception.exceptionObj != undefined && exception.getErrorObj() == undefined) {
            var intermErrObj = getRootErrObj(exception.exceptionObj);
            return intermErrObj
        } else if (exception && exception.exceptionObj == undefined && exception.getErrorObj() != undefined) {
            return exception.getErrorObj()
        } else {
            return undefined
        }
    }
    return {
        constructor: function(code, message, exceptionObj) {
            this.code = typeof code === "number" ? code : -1;
            this.message = typeof message === "string" ? message : "";
            this.name = "Exception";
            var actualErrorObj;
            if (exceptionObj instanceof kony.sdk.mvvm.Exception) {
                this.exceptionObj = exceptionObj;
                actualErrorObj = undefined
            } else {
                actualErrorObj = exceptionObj;
                this.exceptionObj = undefined
            }
            this.getErrorObj = function() {
                return actualErrorObj
            };
            this.getParentException = function() {
                return this.exceptionObj
            }
        },
        toString: function() {
            var output = new kony.sdk.mvvm.util.StringBuffer;
            output = toStringRecursive(this, output);
            return output.toString()
        },
        alert: function(full) {
            if (full === true) {
                var output = new kony.sdk.mvvm.util.StringBuffer;
                output = toStringRecursive(this, output);
                alert(output.toString())
            } else alert(this.code + ":" + this.name + ":" + this.message)
        },
        setSyncResponse: function(response) {
            this.syncresponse = response
        },
        getRootErrorObj: function() {
            var rootErrObj = getRootErrObj(this);
            return rootErrObj
        }
    }
});
kony.sdk.mvvm.ExceptionCode = {
    CD_ERROR_LOADING_TEMPLATES: 3,
    CD_ERROR_FAILED_TO_CREATE_RECORD: 9,
    CD_ERROR_FAILED_TO_UPDATE_RECORD: 10,
    CD_ERROR_CALLBACK_NOT_A_FUNCTION: 11,
    CD_ERROR_LOGIN_FAILURE: 12,
    CD_ERROR_SESSION_TOKEN_INVALID: 13,
    CD_ERROR_FAILED_TO_SAVE_FORM: 14,
    CD_ERROR_FAILED_TO_FETCH_DATA: 15,
    CD_ERROR_FAILED_TO_INITIALIZE_FORM: 16,
    CD_ERROR_FETCHING_METADATA: 17,
    CD_ERROR_MORE_RECORDS_FOUND: 18,
    CD_ERROR_FETCHING_TEMPLATES: 19,
    CD_ERROR_FETCHING_FORMS: 20,
    CD_ERROR_INITIALIZING_UI_CONFIG_DATA_PROVIDER: 21,
    CD_ERROR_INITIALIZING_METADATA_PROVIDER: 22,
    CD_ERROR_INITIALIZING_DATA_PROVIDER: 23,
    CD_ERROR_FAILED_TO_LOAD_APPLICATION: 24,
    CD_ERROR_APP_INITIALIZATION_FAILED: 25,
    CD_ERROR_INITIALIZING_SAAS_APP: 26,
    CD_ERROR_FORMVIEWCONTROLLER_NOT_FOUND: 27,
    CD_ERROR_NAVIGATION_STACK_EMPTY: 28,
    CD_ERROR_FORM_NOT_FOUND: 29,
    CD_ERROR_METADATA_FOR_ENTITY_NOT_FOUND: 30,
    CD_ERROR_NO_FIELDS_MODIFIED_UPDATE_FAILED: 31,
    CD_ERROR_PRIMARY_FIELD_VALUE_NOT_FOUND: 32,
    CD_ERROR_UNDEFINED_WIDGET_CONTROLLER: 33,
    CD_ERROR_FAILED_TO_LOGOUT: 35,
    CD_ERROR_FAILED_LOADING_MASTER_DATA: 36,
    CD_ERROR_FAILED_TO_NAVIGATE_TO_FORM: 37,
    CD_ERROR_PARSING_JSONS: 38,
    CD_ERROR_FAILED_LOADING_FORMS: 39,
    CD_ERROR_FAILED_FORM_INIT_WHILE_CALLBACK: 40,
    CD_ERROR_KONY_FORM_OBJECT_UNDEFINED: 41,
    CD_ERROR_SAVE_CANNOT_SET_PRIMARY_KEY: 42,
    CD_ERROR_FETCH_FAILED_FOR_CHILD_ENTITY: 43,
    CD_ERROR_GET_NEXT_LIST: 44,
    CD_ERROR_UNSUPPORTED_SEGMENT_TYPE: 45,
    CD_ERROR_NOT_INHERITING_VIEW_CONTROLLER: 46,
    CD_ERROR_NOT_INHERITING_WIDGET_CONTROLLER: 47,
    CD_ERROR_FAILED_BINDING_DATA_TO_WIDGET: 48,
    CD_ERROR_PAGINATION_NOT_ENABLED_FOR_SEGMENT: 49,
    CD_ERROR_PARAM_VALUE_NOT_DEFINED_IN_QUERYPARAM: 50,
    CD_ERROR_BRACES_ARE_NOT_DEFINED_PROPERLY: 51,
    CD_ERROR_ADDITIONAL_FIELDS_ARE_NOT_DEFINED_PROPERLY: 52,
    CD_ERROR_QUERY_NOT_DEFINED_PROPERLY: 53,
    CD_ERROR_QUERYPARAMS_NOT_DEFINED_PROPERLY: 54,
    CD_ERROR_MATCHOPERATOR_NOT_DEFINED_PROPERLY: 55,
    CD_ERROR_DATA_VALIDATION_FIELD_NOT_CREATEABLE: 56,
    CD_ERROR_DATA_VALIDATION_FIELD_NOT_UPDATEABLE: 57,
    CD_ERROR_DATA_VALIDATION_FIELD_NOT_NULLABLE: 58,
    CD_ERROR_DATA_VALIDATION_INVALID_INPUT_DATA: 59,
    CD_ERROR_DATA_VALIDATION_INVALID_MODEL: 60,
    CD_ERROR_DATA_VALIDATION_INVALID_ENTITY: 61,
    CD_ERROR_DATA_VALIDATION_ENTITYMETADATA_NOTFOUND: 62,
    CD_ERROR_CREATING_APPMENU: 63,
    CD_ERROR_FETCHING_APPMENU_DATA: 64,
    CD_ERROR_FIELD_NOT_PRESENT: 65,
    cd_ERROR_ENITTY_NOT_PRESENT: 66,
    CD_TENANT_NOT_SYNC_ENABLED: 67,
    CD_INVALID_QUERY: 68,
    CD_ERROR_FETCH_USER_PROFILE_FAILURE: 69,
    CD_RESOURCE_NO_CREATE_PERMISSION: 74,
    CD_RESOURCE_NO_READ_PERMISSION: 75,
    CD_RESOURCE_NO_UPDATE_PERMISSION: 76,
    CD_RESOURCE_NO_DELETE_PERMISSION: 77,
    CD_ERROR_OFFLINE_LOGIN_FAILURE: 70,
    CD_ERROR_UNABLE_TO_SYNC: 71,
    CD_ERROR_UNABLE_TO_GET_SYNC_CONFIG: 72,
    CD_ERROR_UNABLE_TO_RESET_SYNC: 73,
    CD_ERROR_NO_RESPONSE_RECEIVED: 78,
    CD_ERROR_NETWORK_UNAVAILABLE: 79,
    CD_ERROR_IN_SET_ADDITIONAL_FIELDS: 80,
    CD_ERROR_IN_SET_QUERY: 81,
    CD_ERROR_IN_SET_QUERY_PARAMS: 82,
    CD_ERROR_ENTER_VALID_TENANT_NAME: 83,
    CD_ERROR_NAVIGATION_CONTROLLER_NOT_DEFINED: 84,
    CD_ERROR_ENTITY_NOT_SPECIFIED: 85,
    CD_ERROR_FORMTYPE_NOT_SPECIFIED: 86,
    CD_ERROR_FORM_NOT_DEFINED_FOR_RECORDTYPE: 87,
    CD_ERROR_RECORDTYPES_NOT_AVAILABLE: 88,
    CD_ERROR_FORMSFORRECORDTYPES_MAP_NOT_DEFINED: 89,
    CD_ERROR_SAAS_INSTANCE_NOTDEFINED: 90,
    CD_ERROR_INVALID_ENTITY: 91,
    CD_VERSION_UNSUPPORTED_ERROR: 92,
    CD_ERROR_ASSOCIATING_RECORD: 93,
    CD_ERROR_DISOCIATING_RECORD: 94,
    CD_ERROR_NOT_INSTANCE_OF_CUSTOMINFO: 95,
    CD_ERROR_FORM_ENTITY_NOT_FOUND: 96,
    CD_ERROR_FORM_PRIMARY_FIELDVALUE_NOT_FOUND: 97,
    CD_ERROR_CANNOT_ASSOCIATE_DISSOCIATE_OF_SAME_ENTITY: 98,
    CD_ERROR_SAVING_MULTI_ENTITY_LABEL: 99,
    CD_ERROR_SAVING_CHILD_CONTAINER: 100,
    CD_ERROR_DECODING_BASE64_FORMJS: 102,
    CD_ERROR_BATCH_INSERT: 103,
    CD_ERROR_LOCAL_DB_CONNECTION: 104,
    CD_ERROR_EXECUTE_SINGLE_SQL_QUERY: 105,
    CD_UPGRADE_UNAVAILABLE: 106,
    CD_ERROR_I18N: 107,
    CD_INVALID_LOGIN_HANDLER_RESPONSE: 108,
    CD_ERROR_FAILED_TO_QUERY_DATA: 109,
    CD_ERROR_LOADING_THEME: 110,
    CD_ERROR_SETTING_THEME: 111,
    CD_ERROR_FETCHING_THEME: 112,
    CD_ERROR_MULTIPLE_DEFAULT_THEME: 113,
    CD_ERROR_CREATING_THEME: 114,
    CD_ERROR_METHOD_INVALID: 115,
    CD_ERROR_INVALID_HTTPCUSTOMREQUEST_INPUT: 116,
    CD_ERROR_INVALID_INPUT: 117,
    CD_ERROR_INVALID_INPUT_TYPE: 118,
    CD_ERROR_INVALID_PAYLOAD: 119,
    CD_ERROR_INVALID_DATAPROVIDER_TYPE: 120,
    CD_ERROR_DATAPROVIDER_NOT_INTIALIZED: 121,
    CD_ERROR_INVALID_CUSTOMSERVICE_INPUT_PARAM: 122,
    CD_ERROR_UNEXPECTED_CUSTOMRESPONSE: 123,
    CD_CLOUD_UNAUTHORISED_FOR_DATAPROVIDER: 124,
    CD_CREDSTORE_NOT_FOUND: 125,
    CD_CREDENTIAL_MISMATCH_WITH_CREDSTORE: 126,
    CD_ERROR_TENANT_NOT_SPECIFIED: 50003,
    CD_ERROR_UNABLE_TO_CONNECT: 50004,
    CD_ERROR_SYNC_FAILURE: 50005,
    CD_ERROR_LANDING_PAGE_NOT_DEFINED: 50007,
    CD_ERROR_INVALID_PARAM1: 50008,
    CD_ERROR_ENTITY_CONTROLLER_NOT_DEFINED: 10001,
    CD_ERROR_IN_ENTITY_DEFINITION: 10002,
    CD_ERROR_IN_RETREIVNING_CHILD_RELATIONSHIPLIST: 10003,
    CD_ERROR_FETCHING_DATA_FOR_COLUMNS: 10004,
    CD_ERROR_FETCHING_CHILD_RELATIONSHP_FOR_ENTITY: 10005,
    CD_ERROR_PROCESSING_CHILD_RELATIONSHIPLIST: 10006,
    CD_ERROR_FETCH: 10007,
    CD_ERROR_CREATE: 10008,
    CD_ERROR_UPDATE: 10009,
    CD_ERROR_UPDATE_BY_PRIMARY_KEY: 10010,
    CD_ERROR_DELETE: 10011,
    CD_ERROR_DELETE_BY_PRIMARY_KEY: 10012,
    CD_ERROR_VALIDATION_UPDATE: 10013,
    CD_ERROR_VALIDATION_CREATE: 10014,
    CD_ERROR_GET_WIDGET_DATA_FORMMODEL: 20001,
    CD_ERROR_SET_WIDGET_DATA_FORMMODEL: 20002,
    CD_ERROR_FORMMODEL_PROPERTY_VALUE_CHANGED: 20003,
    CD_ERROR_FORMMODEL_CLEAR: 20004,
    CD_ERROR_FORMMODEL_DESTROY: 20005,
    CD_ERROR_FORMMODEL_UPDATE: 20006,
    CD_ERROR_FORMMODEL_SHOWVIEW: 20007,
    CD_ERROR_FORMMODEL_SET_MASTERDATA: 20008,
    CD_ERROR_FORMMODEL_GET_MASTERDATA: 20009,
    CD_ERROR_FORMMODEL_SET_VIEW_ATTRIBUTE: 20010,
    CD_ERROR_FORMMODEL_GET_VIEW_ATTRIBUTE: 20011,
    CD_ERROR_FORMMODEL_PERFORM_ACTION_ONVIEW: 20012,
    CD_ERROR_FORMMODEL_PERFORM_ACTION: 20013,
    CD_ERROR_NOTIFYING_OBSERVERS: 20014,
    CD_ERROR_FORMMODEL_PROPERTIES_INIT: 20015,
    CD_ERROR_FETCH_IN_CONTROLLER: 30001,
    CD_ERROR_BIND_IN_CONTROLLER: 30002,
    CD_ERROR_SAVE_IN_CONTROLLER: 30003,
    CD_ERROR_DELETE_IN_CONTROLLER: 30004,
    CD_ERROR_LOADDATA_SHOWFORM_CONTROLLER: 30005,
    CD_ERROR_GETTING_ENTITY_CONTROLLER: 30006,
    CD_ERROR_GETTING_ENTITY_METADATA: 30007,
    CD_ERROR_FETCH_IN_BASE_CONTROLLER_EXTENSION: 30008,
    CD_ERROR_BIND_IN_BASE_CONTROLLER_EXTENSION: 30009,
    CD_ERROR_SAVE_IN_BASE_CONTROLLER_EXTENSION: 30010,
    CD_ERROR_ACTION_NOT_FOUND_IN_CONTROLLER: 30011,
    CD_ERROR_FORMATDATA_IN_BASE_CONTROLLER_EXTENSION: 30012,
    CD_ERROR_FORMATDATA_IN_CONTROLLER: 30013,
    CD_ERROR_DELETE_IN_BASE_CONTROLLER_EXTENSION: 30014,
    CD_ERROR_GENERATE_RECORDS_IN_BASE_CONTROLLER_EXTENSION: 30015,
    CD_ERROR_FETCH_IN_CONTROLLER_EXTENSION: 40013,
    CD_ERROR_BINDDATA_IN_CONTROLLER_EXTENSION: 40014,
    CD_ERROR_SAVEDATA_IN_CONTROLLER_EXTENSION: 40015,
    CD_ERROR_DELETEDATA_IN_CONTROLLER_EXTENSION: 40016,
    CD_ERROR_PROCESSDATA_IN_CONTROLLER_EXTENSION: 40017,
    CD_ERROR_SHOWFORM_IN_CONTROLLER_EXTENSION: 40018,
    CD_ERROR_GET_DATA_WIDGETS_OF_FORM: 60001,
    CD_ERROR_GETTING_QUERY_WIDGETS_MAPPING: 60002,
    CD_ERROR_ORM_CONTROLLER_FETCH_RECORDS: 70001,
    CD_ERROR_ORM_CONTROLLER_FETCH_RECORDS_QUERIES_NOT_DEFINED: 70002,
    CD_ERROR_ORM_CONTROLLER_FETCH_RECORD_PK_NOT_DEFINED: 70003,
    CD_ERROR_ORM_CONTROLLER_FETCH_RECORD_PK: 70004,
    CD_ERROR_ORM_CONTROLLER_FETCH_RECORDS_BY_NATIVE_QUERY: 70005,
    CD_ERROR_ORM_CONTROLLER_FETCH_RECORDS_BY_COLUMN_DEFINITION: 70006,
    CD_ERROR_ORM_CONTROLLER_SAVE_RECORD: 70007,
    CD_ERROR_ORM_CONTROLLER_SAVE_RECORDS: 70008,
    CD_ERROR_ORM_CONTROLLER_REMOVE_RECORD: 70009,
    CD_ERROR_ORM_CONTROLLER_REMOVE_RECORDS: 70010,
    CD_ERROR_ORM_CONTROLLER_FETCH_CHILD_RELATIONSHIP: 70011,
    CD_ERROR_ORM_CONTROLLER_RESULTSET_TO_OBJECT_CONVERSION: 70012,
    CD_ERROR_ORM_CONTROLLER_PREPARE_FETCH_QUERY: 70013,
    CD_ERROR_ORM_CONTROLLER_UNMARSHALL_TO_MODEL_OBJECT: 70014,
    CD_ERROR_ORM_CONTROLLER_FETCH_AND_BIND_DATA_STRATEGY: 70015,
    CD_ERROR_PREPARING_QUERY_STRING: 90001,
    CD_ERROR_APP_INIT_FORMS: 90002,
    CD_ERROR_INVALID_DATA_OBJECT: 90003,
    MSG_ERROR_SAAS_INSTANCE_NOTDEFINED: "kony.sdk.mvvm.ApplicationContext.INSTANCE is not defined",
    MSG_ERROR_FORMSFORRECORDTYPES_MAP_NOT_DEFINED: "FormsForRecordTypes map is not defined or it has no entities",
    MSG_ERROR_RECORDTYPES_NOT_AVAILABLE: "No record types available from service",
    MSG_ERROR_FORM_NOT_DEFINED_FOR_RECORDTYPE: "no default forms for given formType ",
    MSG_ERROR_FORMTYPE_NOT_SPECIFIED: "Please specify formType for record type",
    MSG_ERROR_ENTITY_NOT_SPECIFIED: "Please specify entity to get record types",
    MSG_ERROR_MATCHOPERATOR_NOT_DEFINED_PROPERLY: "Match Operator is not mentioned properly in the query",
    MSG_ERROR_QUERYPARAMS_NOT_DEFINED_PROPERLY: "Queryparams are not defined properly",
    MSG_ERROR_QUERY_NOT_DEFINED_PROPERLY: "Query is not defined properly",
    MSG_ERROR_ADDITIONAL_FIELDS_ARE_NOT_DEFINED_PROPERLY: "Additinal Fields should be described in an Array Format Only",
    MSG_ERROR_BRACES_ARE_NOT_DEFINED_PROPERLY: "Braces are not defined properly in the query",
    MSG_ERROR_PARAM_VALUE_NOT_DEFINED_IN_QUERYPARAM: "Parameter value is not defined for this parameter",
    MSG_ERROR_DATA_VALIDATION_FIELD_NOT_CREATEABLE: "Form Validation Error- Field is not createable",
    MSG_ERROR_DATA_VALIDATION_FIELD_NOT_UPDATEABLE: "Form Validation Error - Field is not updateable",
    MSG_ERROR_DATA_VALIDATION_FIELD_NOT_NULLABLE: "Form Validation Error - Field is not nullable",
    MSG_ERROR_DATA_VALIDATION_INVALID_INPUT_DATA: "Form Validation Error - Invalid input data",
    MSG_ERROR_DATA_VALIDATION_INVALID_MODEL: "Form Validation Error - Invalid Model",
    MSG_ERROR_DATA_VALIDATION_INVALID_ENTITY: "Form Validation Error - Invalid Entity",
    MSG_ERROR_DATA_VALIDATION_ENTITYMETADATA_NOTFOUND: "Form Validation Error - EntityMetaData Not Found",
    MSG_ERROR_FETCHING_APPMENU_DATA: "Error fetching data for app menu",
    MSG_ERROR_CREATING_APPMENU: "Error creating app menu",
    CD_ERROR_WIDGETID_NOT_DEFINED: 50,
    CD_ERROR_PROCESSING_FORMCONFIG: 51,
    CD_ERROR_TAGNAME_NOTVALID: 52,
    CD_ERROR_EVENTNAME_NOT_DEFINED: 53,
    CD_ERROR_WIDGET_INSTANCE_NOT: 54,
    CD_ERROR_WHILE_PROCESSING_WIDGETCONFIG: 55,
    CD_ERROR_PRESAVECALLBACK_NOT_A_FUNCTION: 56,
    CD_ERROR_IN_DATACALLBACK: 57,
    CD_ERROR_IN_PRESAVECALLBACK: 58,
    CD_ERROR_NOT_MODEL_INSTANCE: 59,
    MSG_ERROR_NOT_MODEL_INSTANCE: "result of callback is not a model instance",
    MSG_ERROR_IN_PRESAVECALLBACK: "PreSave callback execution got failed",
    MSG_ERROR_IN_DATACALLBACK: "Data Call Back Execution got failed",
    MSG_ERROR_PRESAVECALLBACK_NOT_A_FUNCTION: "presave call back is not a function",
    MSG_ERROR_WHILE_PROCESSING_WIDGETCONFIG: "error while processing widget config of ",
    MSG_ERROR_WIDGET_INSTANCE_NOT: "it should be instance of kony.sdk.mvvm.widgetConfig",
    MSG_ERROR_EVENTNAME_NOT_DEFINED: "event name is not defined",
    MSG_ERROR_WIDGETID_NOT_DEFINED: "Widget id is not specifed",
    MSG_ERROR_PROCESSING_FORMCONFIG: "error while processing form config",
    MSG_ERROR_TAGNAME_NOTVALID: "specified tag name not valid ",
    MSG_ERROR_PAGINATION_NOT_ENABLED_FOR_SEGMENT: "Pagination not enabled for this segment",
    MSG_ERROR_FAILED_BINDING_DATA_TO_WIDGET: "Failed to bind data to widget",
    MSG_ERROR_NOT_INHERITING_WIDGET_CONTROLLER: "Does not inherit WidgetController class ",
    MSG_ERROR_NOT_INHERITING_VIEW_CONTROLLER: "Does not inherit ViewController class ",
    MSG_ERROR_UNSUPPORTED_SEGMENT_TYPE: "segment widget type is not yet supported",
    MSG_ERROR_GET_NEXT_LIST: "Get next list error - Data Records recieved < 0 ",
    MSG_ERROR_FETCH_FAILED_FOR_CHILD_ENTITY: "failed to get data for child entity",
    MSG_ERROR_SAVE_CANNOT_SET_PRIMARY_KEY: "cannot save form, cannot explicitly set primary key value",
    MSG_ERROR_KONY_FORM_OBJECT_UNDEFINED: "kony form object is undefined",
    MSG_ERROR_FAILED_FORM_INIT_WHILE_CALLBACK: "failed to initilaize the form while executing datacallback",
    MSG_ERROR_FAILED_LOADING_FORMS: "Failed to load form",
    MSG_ERROR_PARSING_JSONS: "Error while parsing forms JSON",
    MSG_ERROR_FAILED_TO_NAVIGATE_TO_FORM: "failed to navigate to form ",
    MSG_ERROR_FAILED_LOADING_MASTER_DATA: "failed to laod master data",
    MSG_ERROR_FAILED_TO_LOGOUT: "Failed to logout",
    MSG_ERROR_UNDEFINED_WIDGET_CONTROLLER: "Undefined widget controller",
    MSG_ERROR_PRIMARY_FIELD_VALUE_NOT_FOUND: "cannot save form, primary field value not found",
    MSG_ERROR_NO_FIELDS_MODIFIED_UPDATE_FAILED: "Cannot save form, no fields are modified",
    MSG_ERROR_METADATA_FOR_ENTITY_NOT_FOUND: "metadata could not found for entity ",
    MSG_ERROR_FORM_NOT_FOUND: "Form not found",
    MSG_ERROR_EXPECTED_BOOLEAN: "First parameter must be boolean",
    MSG_ERROR_NAVIGATION_STACK_EMPTY: "Navigation stack is empty",
    MSG_ERROR_FORMVIEWCONTROLLER_NOT_FOUND: "form view controller not found",
    MSG_ERROR_INITIALIZING_SAAS_APP: "Error Initializing SaaS Application",
    MSG_ERROR_APP_INITIALIZATION_FAILED: "Application initialization failed",
    MSG_ERROR_FAILED_TO_LOAD_APPLICATION: "Failed to Load Application",
    MSG_ERROR_INITIALIZING_DATA_PROVIDER: "Unable to initialize data provider",
    MSG_ERROR_INITIALIZING_METADATA_PROVIDER: "Unable to initialize meta data provider",
    MSG_ERROR_INITIALIZING_UI_CONFIG_DATA_PROVIDER: "Unable to initialize UI Config data provider",
    MSG_ERROR_FETCHING_FORMS: "Error fetching forms",
    MSG_ERROR_FETCHING_TEMPLATES: "Error fetching templates",
    MSG_ERROR_MORE_RECORDS_FOUND: "Expected one record but found more than one",
    MSG_ERROR_FETCHING_METADATA: "Error fetching metadata for entity",
    MSG_ERROR_FAILED_TO_INITIALIZE_FORM: "Failed to initialize form",
    MSG_ERROR_FAILED_TO_FETCH_DATA: "Failed to fetch data for form",
    MSG_ERROR_FAILED_TO_SAVE_FORM: "Failed to save form",
    MSG_ERROR_SESSION_TOKEN_INVALID: "Invalid session token",
    MSG_ERROR_LOGIN_FAILURE: "Login failure",
    MSG_ERROR_OFFLINE_LOGIN_FAILURE: "Login failure in offline mode",
    MSG_ERROR_CALLBACK_NOT_A_FUNCTION: "Callbacks not a function",
    MSG_ERROR_FAILED_TO_CREATE_RECORD: "Failed to create record",
    MSG_ERROR_FAILED_TO_UPDATE_RECORD: "Failed to update record",
    MSG_ERROR_LOADING_TEMPLATES: "Error loading templates",
    MSG_ERROR_FIELD_NOT_PRESENT: "Invalid field mapped",
    MSG_ERROR_ENITTY_NOT_PRESENT: "Invalid Entity mapped",
    MSG_TENANT_NOT_SYNC_ENABLED: "Cloud is not sync enabled",
    MSG_INVALID_QUERY: "Query framed is invalid",
    MSG_ERROR_FETCH_USER_PROFILE_FAILURE: "Unable to fetch the user profile",
    MSG_ERROR_UNABLE_TO_SYNC: "Sync failed",
    MSG_ERROR_UNABLE_TO_GET_SYNC_CONFIG: "Unable to get sync configuration",
    MSG_ERROR_NETWORK_UNAVAILABLE: "Device is not connected to network. Please check your connection and try again.",
    MSG_ERROR_UNABLE_TO_RESET_SYNC: "Sync reset failed",
    MSG_HAMBURGER_MENU_WRONG_CONFIG: "Wrong Hamburger Menu config",
    MSG_HAMBURGER_MENU_INITIALIZATION_FAILED: "Failed to initialize Hamburger Menu",
    MSG_HAMBURGER_MENU_WRONG_FORM_TYPE: "Hamburger Menu wrong form type",
    MSG_HAMBURGER_MENU_WRONG_SKIN: "Main flex form skin is not provided with form bg color",
    MSG_RESOURCE_NO_CREATE_PERMISSION: "User does not have permission to create {}",
    MSG_RESOURCE_NO_READ_PERMISSION: "User does not have permission to read{}",
    MSG_RESOURCE_NO_UPDATE_PERMISSION: "User does not have permission to update {}",
    MSG_RESOURCE_NO_DELETE_PERMISSION: "User does not have permission to delete {}",
    MSG_NETWORK_UNAVAILABLE: "Network unavailable or disconnected",
    MSG_ERROR_NO_RESPONSE_RECEIVED: "No response received",
    MSG_ERROR_IN_SET_ADDITIONAL_FIELDS: "Error in setAdditionalFields",
    MSG_ERROR_IN_SET_QUERY: "Error in setQuery",
    MSG_ERROR_IN_SET_QUERY_PARAMS: "Error in setQueryParams",
    MSG_ERROR_ENTER_VALID_TENANT_NAME: "Enter a valid cloud name",
    MSG_ERROR_NAVIGATION_CONTROLLER_NOT_DEFINED: "Navigation controller not defined",
    MSG_ERROR_INVALID_ENTITY: "Invalid Entity Name",
    MSG_VERSION_UNSUPPORTED_ERROR: " You are trying to connect to older version of the Kony MobileFabric App Services. This app requires Kony MobileFabric App Services version to be $VERSION or greater ",
    MSG_ERROR_ASSOCIATING_RECORD: "Error associating record",
    MSG_ERROR_DISOCIATING_RECORD: "Error dissociating record",
    MSG_ERROR_NOT_INSTANCE_OF_CUSTOMINFO: "info object not an instance of kony.sdk.mvvm.CustomInfo class",
    MSG_ERROR_FORM_ENTITY_NOT_FOUND: "Entity of form not found",
    MSG_ERROR_FORM_PRIMARY_FIELDVALUE_NOT_FOUND: "Primary field value for form is not found",
    MSG_ERROR_CANNOT_ASSOCIATE_DISSOCIATE_OF_SAME_ENTITY: "Cannot associate/dissociate records of same entity",
    MSG_ERROR_SAVING_MULTI_ENTITY_LABEL: "Error saving mutli entity label data",
    MSG_ERROR_SAVING_CHILD_CONTAINER: "Error saving child container data",
    MSG_UPGRADE_UNAVAILABLE: "upgraded version of this cloud is not available, please try diabling connect to upgraded version",
    MSG_ERROR_I18N: "I18n Error ",
    MSG_INVALID_LOGIN_HANDLER_RESPONSE: "invalid response object returned by login handler",
    MSG_ERROR_FAILED_TO_QUERY_DATA: "failed to query data for the widget",
    MSG_ERROR_BATCH_INSERT: "Exception occurred while batchInsert",
    MSG_ERROR_LOCAL_DB_CONNECTION: "Error in getting localdb connection",
    MSG_ERROR_EXECUTE_SINGLE_SQL_QUERY: "Exception occurred while executeSingleSqlQuery",
    MSG_ERROR_DECODING_BASE64_FORMJS: "Error while decoding base64 formJS",
    MSG_ERROR_LOADING_THEME: "error loading theme",
    MSG_ERROR_SETTING_THEME: "error setting theme to the application",
    MSG_ERROR_FETCHING_THEME: "error fetching theme from datasource",
    MSG_ERROR_MULTIPLE_DEFAULT_THEME: "error, more than once default themes returned",
    MSG_ERROR_CREATING_THEME: "error while creating theme",
    MSG_ERROR_METHOD_INVALID: "method type invalid , should be either GET/POST/PUT/DELETE",
    MSG_ERROR_INVALID_HTTPCUSTOMREQUEST_INPUT: "method type expected, httpcustomrequest accepts a string parameter of the method type",
    MSG_ERROR_INVALID_INPUT: "expected two string inputs",
    MSG_ERROR_INVALID_INPUT_TYPE: "expected string type as input",
    MSG_ERROR_INVALID_PAYLOAD: "invalid payload, expected only one parameter",
    MSG_ERROR_INVALID_DATAPROVIDER_TYPE: "expected rest dataprovider object",
    MSG_ERROR_DATAPROVIDER_NOT_INTIALIZED: "dataprovider object not intialized",
    MSG_ERROR_INVALID_CUSTOMSERVICE_INPUT_PARAM: "expected httpcustomrequest input param",
    MSG_ERROR_UNEXPECTED_CUSTOMRESPONSE: "expected customresponse key in response",
    MSG_CLOUD_UNAUTHORISED_FOR_DATAPROVIDER: "Invalid dataProviderKey or Present cloud is not authorised for the suggested data provider",
    MSG_CREDSTORE_NOT_FOUND: "Login failure in offline mode. CredStore is not created yet",
    MSG_CREDENTIAL_MISMATCH_WITH_CREDSTORE: "Login failure in offline mode. User Credentials did not match with credStore",
    MSG_ERROR_IN_ENTITY_DEFINITION: "Error in getting entity definition in model",
    MSG_ERROR_IN_RETREIVNING_CHILD_RELATIONSHIPLIST: "Error in retreiving child relationship list in model",
    MSG_ERROR_FETCHING_DATA_FOR_COLUMNS: "Error fetching data for columns in model",
    MSG_ERROR_FETCHING_CHILD_RELATIONSHP_FOR_ENTITY: "Error fetching relationship for child entity in model",
    MSG_ERROR_PROCESSING_CHILD_RELATIONSHIPLIST: "Error processing child relationship list in getRelationshipForChildEntityName in model",
    MSG_ERROR_FETCH: "Error in fetching data in model",
    MSG_ERROR_CREATE: "Error in create in model",
    MSG_ERROR_UPDATE: "Error in update in model",
    MSG_ERROR_UPDATE_BY_PRIMARY_KEY: "Error in update by primarykey in model",
    MSG_ERROR_DELETE: "Error in delete in model",
    MSG_ERROR_DELETE_BY_PRIMARY_KEY: "Error in delete by primarykey in model",
    MSG_ERROR_FETCH_IN_CONTROLLER_EXTENSION: "Error in fetch in controller extension",
    MSG_ERROR_BINDDATA_IN_CONTROLLER_EXTENSION: "Error in bindData in controller extension",
    MSG_ERROR_SAVEDATA_IN_CONTROLLER_EXTENSION: "Error in saveData in controller extension",
    MSG_ERROR_DELETEDATA_IN_CONTROLLER_EXTENSION: "Error in deleteData in controller extension",
    MSG_ERROR_ENTITY_CONTROLLER_NOT_DEFINED: "Model is not defined",
    MSG_ERROR_FETCH_IN_BASE_CONTROLLER_EXTENSION: "Error in fetchData of BaseControllerExtension",
    MSG_ERROR_BIND_IN_BASE_CONTROLLER_EXTENSION: "Error in bindData of BaseControllerExtension",
    MSG_ERROR_SAVE_IN_BASE_CONTROLLER_EXTENSION: "Error in saveData of BaseControllerExtension",
    MSG_ERROR_DELETE_IN_BASE_CONTROLLER_EXTENSION: "Error in saveData of BaseControllerExtension",
    MSG_ERROR_GENERATE_RECORDS_IN_BASE_CONTROLLER_EXTENSION: "Error in generateRecords of BaseControllerExtension",
    MSG_ERROR_ACTION_NOT_FOUND_IN_CONTROLLER: "Error action not found in controller for actionName",
    MSG_ERROR_APP_INIT_FORMS: "Error in application init forms",
    MSG_ERROR_ORM_CONTROLLER_FETCH_RECORDS: "Error in persistent controller's fetch records",
    MSG_ERROR_ORM_CONTROLLER_FETCH_RECORDS_QUERIES_NOT_DEFINED: "Error in persistent controller's fetch records, odata queries not defined",
    MSG_ERROR_ORM_CONTROLLER_FETCH_RECORD_PK_NOT_DEFINED: "Error in persistent controller's fetch by PK, PK not defined",
    MSG_ERROR_ORM_CONTROLLER_FETCH_RECORD_PK: "Error in persistent controller's fetch by PK",
    MSG_ERROR_ORM_CONTROLLER_FETCH_RECORDS_BY_NATIVE_QUERY: "Error in persistent controller's fetch with native query",
    MSG_ERROR_ORM_CONTROLLER_FETCH_RECORDS_BY_COLUMN_DEFINITION: "Error in persistent controller's fetch by columns",
    MSG_ERROR_ORM_CONTROLLER_SAVE_RECORD: "Error in persistent controller's save record",
    MSG_ERROR_ORM_CONTROLLER_SAVE_RECORDS: "Error in persistent controller's save records",
    MSG_ERROR_ORM_CONTROLLER_REMOVE_RECORD: "Error in persistent controller's remove record",
    MSG_ERROR_ORM_CONTROLLER_REMOVE_RECORDS: "Error in persistent controller's remove records",
    MSG_ERROR_ORM_CONTROLLER_FETCH_CHILD_RELATIONSHIP: "Error in persistent controller's fetch child relationship",
    MSG_ERROR_ORM_CONTROLLER_RESULTSET_TO_OBJECT_CONVERSION: "Error in persistent controller's resultset to record object conversion",
    MSG_ERROR_ORM_CONTROLLER_PREPARE_FETCH_QUERY: "Error in persistent controller's prepare fetch query",
    MSG_ERROR_ORM_CONTROLLER_UNMARSHALL_TO_MODEL_OBJECT: "Error in persistent controller's unmarshall record object to form model object",
    MSG_ERROR_ORM_CONTROLLER_FETCH_AND_BIND_DATA_STRATEGY: "Error in persistent controller's fetch and bind data strategy",
    MSG_ERROR_GET_DATA_WIDGETS_OF_FORM: "Error getting data widgets of form",
    MSG_ERROR_GETTING_QUERY_WIDGETS_MAPPING: "Error getting queryWidgetsMapping",
    MSG_ERROR_PREPARING_QUERY_STRING: "Error in preparing query string",
    MSG_ERROR_NOTIFYING_OBSERVERS: "Error notifying observers of formmodel",
    MSG_ERROR_GET_WIDGET_DATA_FORMMODEL: "Error getting widget data of formmodel",
    MSG_ERROR_SET_WIDGET_DATA_FORMMODEL: "Error setting widget data of formmodel",
    MSG_ERROR_FORMMODEL_PROPERTY_VALUE_CHANGED: "Error in propertyValueChanged of formmodel",
    MSG_ERROR_FORMMODEL_CLEAR: "Error in clear of formmodel",
    MSG_ERROR_FORMMODEL_DESTROY: "Error in destroy of formmodel",
    MSG_ERROR_FORMMODEL_UPDATE: "Error in update of formmodel",
    MSG_ERROR_FORMMODEL_SET_MASTERDATA: "Error in setMasterData of formmodel",
    MSG_ERROR_FORMMODEL_GET_MASTERDATA: "Error in getMasterData of formmodel",
    MSG_ERROR_FORMMODEL_SET_VIEW_ATTRIBUTE: "Error settingView attribute by property in formmodel",
    MSG_ERROR_FORMMODEL_GET_VIEW_ATTRIBUTE: "Error gettingView attribute by property in formmodel",
    MSG_ERROR_FORMMODEL_PERFORM_ACTION_ONVIEW: "Error in performActionOnView of formmodel",
    MSG_ERROR_FORMMODEL_PERFORM_ACTION: "Error in performAction of formmodel",
    MSG_ERROR_FORMMODEL_PROPERTIES_INIT: "Error in initialization of formmodel properties",
    MSG_ERROR_FETCH_IN_CONTROLLER: "Error in fetch of controller",
    MSG_ERROR_BIND_IN_CONTROLLER: "Error in bind of controller",
    MSG_ERROR_SAVE_IN_CONTROLLER: "Error in save of controller",
    MSG_ERROR_DELETE_IN_CONTROLLER: "Error in delete of controller",
    MSG_ERROR_LOADDATA_SHOWFORM_CONTROLLER: "Error in load data and show form of controller",
    MSG_ERROR_GETTING_ENTITY_CONTROLLER: "Error getting model from formcontroller",
    MSG_ERROR_GETTING_ENTITY_METADATA: "Error getting entity metadata from formcontroller",
    MSG_ERROR_INVALID_DATA_OBJECT: "Error while reading data, expected data object",
    MSG_ERROR_PROCESSDATA_IN_CONTROLLER_EXTENSION: "Error while formatting data in controller extension",
    MSG_ERROR_FORMATDATA_IN_BASE_CONTROLLER_EXTENSION: "Error while formatting data in base controller extension",
    MSG_ERROR_FORMATDATA_IN_CONTROLLER: "Error while formatting data in controller",
    MSG_ERROR_VALIDATION_UPDATE: "Error validating data in update model",
    MSG_ERROR_VALIDATION_CREATE: "Error validating data in create model",
    MSG_ERROR_SHOWFORM_IN_CONTROLLER_EXTENSION: "Error in showForm in controller extension"
};
kony = kony || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.log = kony.sdk.mvvm.log || {};
kony.afn = kony.afn || {};
if (typeof kony.sdk.mvvm.log === "undefined") {
    kony.sdk.mvvm.log = {}
}
kony.sdk.mvvm.log.NONE = {
    value: 0,
    name: "none",
    code: "NONE"
};
kony.sdk.mvvm.log.FATAL = {
    value: 1,
    name: "fatal",
    code: "FATAL"
};
kony.sdk.mvvm.log.ERROR = {
    value: 2,
    name: "error",
    code: "ERROR"
};
kony.sdk.mvvm.log.WARN = {
    value: 3,
    name: "warn",
    code: "WARN"
};
kony.sdk.mvvm.log.INFO = {
    value: 4,
    name: "info",
    code: "INFO"
};
kony.sdk.mvvm.log.DEBUG = {
    value: 5,
    name: "debug",
    code: "DEBUG"
};
kony.sdk.mvvm.log.TRACE = {
    value: 6,
    name: "trace",
    code: "TRACE"
};
kony.sdk.mvvm.currentLogLevel = kony.sdk.mvvm.log.INFO;
kony.sdk.mvvm.log.trace = function(msg, params) {
    kony.sdk.mvvm.logger(kony.sdk.mvvm.log.TRACE, "MVVM", msg, params)
};
kony.sdk.mvvm.log.debug = function(msg, params) {
    kony.sdk.mvvm.logger(kony.sdk.mvvm.log.DEBUG, "MVVM", msg, params)
};
kony.sdk.mvvm.log.info = function(msg, params) {
    kony.sdk.mvvm.logger(kony.sdk.mvvm.log.INFO, "MVVM", msg, params)
};
kony.sdk.mvvm.log.warn = function(msg, params) {
    kony.sdk.mvvm.logger(kony.sdk.mvvm.log.WARN, "MVVM", msg, params)
};
kony.sdk.mvvm.log.error = function(msg, params) {
    kony.sdk.mvvm.logger(kony.sdk.mvvm.log.ERROR, "MVVM", msg, params)
};
kony.sdk.mvvm.log.fatal = function(msg, params) {
    kony.sdk.mvvm.logger(kony.sdk.mvvm.log.FATAL, "MVVM", msg, params)
};
kony.afn.trace = function(tag, msg, params) {
    kony.sdk.mvvm.logger(kony.sdk.mvvm.log.TRACE, tag, msg, params)
};
kony.afn.debug = function(tag, msg, params) {
    kony.sdk.mvvm.logger(kony.sdk.mvvm.log.DEBUG, tag, msg, params)
};
kony.afn.info = function(tag, msg, params) {
    kony.sdk.mvvm.logger(kony.sdk.mvvm.log.INFO, tag, msg, params)
};
kony.afn.warn = function(tag, msg, params) {
    kony.sdk.mvvm.logger(kony.sdk.mvvm.log.WARN, tag, msg, params)
};
kony.afn.error = function(tag, msg, params) {
    kony.sdk.mvvm.logger(kony.sdk.mvvm.log.ERROR, tag, msg, params)
};
kony.afn.fatal = function(tag, msg, params) {
    kony.sdk.mvvm.logger(kony.sdk.mvvm.log.FATAL, tag, msg, params)
};
kony.sdk.mvvm.log.setLogLevel = function(level, logSuccessCallback, logFailureCallback) {
    switch (level) {
        case kony.sdk.mvvm.log.NONE:
            kony.sdk.mvvm.currentLogLevel = kony.sdk.mvvm.log.NONE;
            break;
        case kony.sdk.mvvm.log.TRACE:
            kony.sdk.mvvm.currentLogLevel = kony.sdk.mvvm.log.TRACE;
            break;
        case kony.sdk.mvvm.log.INFO:
            kony.sdk.mvvm.currentLogLevel = kony.sdk.mvvm.log.INFO;
            break;
        case kony.sdk.mvvm.log.WARN:
            kony.sdk.mvvm.currentLogLevel = kony.sdk.mvvm.log.WARN;
            break;
        case kony.sdk.mvvm.log.ERROR:
            kony.sdk.mvvm.currentLogLevel = kony.sdk.mvvm.log.ERROR;
            break;
        case kony.sdk.mvvm.log.FATAL:
            kony.sdk.mvvm.currentLogLevel = kony.sdk.mvvm.log.FATAL;
            break;
        case kony.sdk.mvvm.log.DEBUG:
            kony.sdk.mvvm.currentLogLevel = kony.sdk.mvvm.log.DEBUG;
            break;
        default:
            kony.sdk.mvvm.log.error("Failed in setting log level " + level);
            kony.sdk.mvvm.verifyAndCallClosure(logFailureCallback, "Failed in setting log level " + level);
            return
    }
    kony.sdk.mvvm.log.info("Log Level successfully set to " + kony.sdk.mvvm.currentLogLevel.name);
    kony.sdk.mvvm.verifyAndCallClosure(logSuccessCallback, "Log Level successfully set to " + kony.sdk.mvvm.currentLogLevel.name)
};
kony.sdk.mvvm.log.isDebugEnabled = function() {
    return kony.sdk.mvvm.currentLogLevel.value >= kony.sdk.mvvm.log.DEBUG.value
};
kony.sdk.mvvm.log.isTraceEnabled = function() {
    return kony.sdk.mvvm.currentLogLevel.value >= kony.sdk.mvvm.log.TRACE.value
};
kony.sdk.mvvm.log.isInfoEnabled = function() {
    return kony.sdk.mvvm.currentLogLevel.value >= kony.sdk.mvvm.log.INFO.value
};
kony.sdk.mvvm.log.isWarnEnabled = function() {
    return kony.sdk.mvvm.currentLogLevel.value >= kony.sdk.mvvm.log.WARN.value
};
kony.sdk.mvvm.log.isFatalEnabled = function() {
    return kony.sdk.mvvm.currentLogLevel.value >= kony.sdk.mvvm.log.FATAL.value
};
kony.sdk.mvvm.log.isErrorEnabled = function() {
    return kony.sdk.mvvm.currentLogLevel.value >= kony.sdk.mvvm.log.ERROR.value
};
kony.sdk.mvvm.log.isNoneEnabled = function() {
    return kony.sdk.mvvm.currentLogLevel.value === kony.sdk.mvvm.log.NONE.value
};
kony.sdk.mvvm.log.getCurrentLogLevel = function() {
    return kony.sdk.mvvm.currentLogLevel
};
kony.sdk.mvvm.isNullOrUndefined = function(val) {
    if (val === null || val === undefined) {
        return true
    } else {
        return false
    }
};
kony.sdk.mvvm.isValidJs = function(inputTable) {
    if (kony.sdk.mvvm.isNullOrUndefined(inputTable)) {
        return false
    }
    return kony.type(inputTable) === "object" || kony.type(inputTable) === "Object" || kony.type(inputTable) === "Array"
};
kony.sdk.mvvm.logger = function(logLevel, tag, msg, params) {
    if (logLevel.value <= kony.sdk.mvvm.currentLogLevel.value) {
        params = typeof params === "undefined" ? "" : params;
        if (tag === undefined || tag === null) {
            tag = "AFN"
        }
        if (kony.sdk.mvvm.isValidJs(params)) {
            params = kony.sdk.mvvm.util.stringifyKonyObject(params)
        }
        var date = (new Date).toLocaleDateString();
        var time = (new Date).toLocaleTimeString();
        var level = logLevel.code;
        var formattedMessage = "[" + date + "][" + time + "][" + tag + "][" + level + "] : " + msg + " " + params;
        if (kony.sdk.mvvm.error_alert && logLevel.value == kony.sdk.mvvm.log.ERROR.value) alert(formattedMessage);
        kony.print(formattedMessage)
    }
};
kony.sdk.mvvm.print = function(statement) {
    if (typeof kony !== "undefined" && typeof kony.print === "function") {
        kony.print(statement)
    } else if (typeof console !== "undefined" && typeof console.log === "function") {
        console.log(statement)
    }
};
(function(undefined) {
    var moment, VERSION = "2.9.0",
        globalScope = typeof global !== "undefined" && (typeof window === "undefined" || window === global.window) ? global : this,
        oldGlobalMoment, round = Math.round,
        hasOwnProperty = Object.prototype.hasOwnProperty,
        i, YEAR = 0,
        MONTH = 1,
        DATE = 2,
        HOUR = 3,
        MINUTE = 4,
        SECOND = 5,
        MILLISECOND = 6,
        locales = {},
        momentProperties = [],
        hasModule = typeof module !== "undefined" && module && module.exports,
        aspNetJsonRegex = /^\/?Date\((\-?\d+)/i,
        aspNetTimeSpanJsonRegex = /(\-)?(?:(\d*)\.)?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?)?/,
        isoDurationRegex = /^(-)?P(?:(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?|([0-9,.]*)W)$/,
        formattingTokens = /(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Q|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,4}|x|X|zz?|ZZ?|.)/g,
        localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,
        parseTokenOneOrTwoDigits = /\d\d?/,
        parseTokenOneToThreeDigits = /\d{1,3}/,
        parseTokenOneToFourDigits = /\d{1,4}/,
        parseTokenOneToSixDigits = /[+\-]?\d{1,6}/,
        parseTokenDigits = /\d+/,
        parseTokenWord = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i,
        parseTokenTimezone = /Z|[\+\-]\d\d:?\d\d/gi,
        parseTokenT = /T/i,
        parseTokenOffsetMs = /[\+\-]?\d+/,
        parseTokenTimestampMs = /[\+\-]?\d+(\.\d{1,3})?/,
        parseTokenOneDigit = /\d/,
        parseTokenTwoDigits = /\d\d/,
        parseTokenThreeDigits = /\d{3}/,
        parseTokenFourDigits = /\d{4}/,
        parseTokenSixDigits = /[+-]?\d{6}/,
        parseTokenSignedNumber = /[+-]?\d+/,
        isoRegex = /^\s*(?:[+-]\d{6}|\d{4})-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
        isoFormat = "YYYY-MM-DDTHH:mm:ssZ",
        isoDates = [
            ["YYYYYY-MM-DD", /[+-]\d{6}-\d{2}-\d{2}/],
            ["YYYY-MM-DD", /\d{4}-\d{2}-\d{2}/],
            ["GGGG-[W]WW-E", /\d{4}-W\d{2}-\d/],
            ["GGGG-[W]WW", /\d{4}-W\d{2}/],
            ["YYYY-DDD", /\d{4}-\d{3}/]
        ],
        isoTimes = [
            ["HH:mm:ss.SSSS", /(T| )\d\d:\d\d:\d\d\.\d+/],
            ["HH:mm:ss", /(T| )\d\d:\d\d:\d\d/],
            ["HH:mm", /(T| )\d\d:\d\d/],
            ["HH", /(T| )\d\d/]
        ],
        parseTimezoneChunker = /([\+\-]|\d\d)/gi,
        proxyGettersAndSetters = "Date|Hours|Minutes|Seconds|Milliseconds".split("|"),
        unitMillisecondFactors = {
            Milliseconds: 1,
            Seconds: 1e3,
            Minutes: 6e4,
            Hours: 36e5,
            Days: 864e5,
            Months: 2592e6,
            Years: 31536e6
        },
        unitAliases = {
            ms: "millisecond",
            s: "second",
            m: "minute",
            h: "hour",
            d: "day",
            D: "date",
            w: "week",
            W: "isoWeek",
            M: "month",
            Q: "quarter",
            y: "year",
            DDD: "dayOfYear",
            e: "weekday",
            E: "isoWeekday",
            gg: "weekYear",
            GG: "isoWeekYear"
        },
        camelFunctions = {
            dayofyear: "dayOfYear",
            isoweekday: "isoWeekday",
            isoweek: "isoWeek",
            weekyear: "weekYear",
            isoweekyear: "isoWeekYear"
        },
        formatFunctions = {},
        relativeTimeThresholds = {
            s: 45,
            m: 45,
            h: 22,
            d: 26,
            M: 11
        },
        ordinalizeTokens = "DDD w W M D d".split(" "),
        paddedTokens = "M D H h m s w W".split(" "),
        formatTokenFunctions = {
            M: function() {
                return this.month() + 1
            },
            MMM: function(format) {
                return this.localeData().monthsShort(this, format)
            },
            MMMM: function(format) {
                return this.localeData().months(this, format)
            },
            D: function() {
                return this.date()
            },
            DDD: function() {
                return this.dayOfYear()
            },
            d: function() {
                return this.day()
            },
            dd: function(format) {
                return this.localeData().weekdaysMin(this, format)
            },
            ddd: function(format) {
                return this.localeData().weekdaysShort(this, format)
            },
            dddd: function(format) {
                return this.localeData().weekdays(this, format)
            },
            w: function() {
                return this.week()
            },
            W: function() {
                return this.isoWeek()
            },
            YY: function() {
                return leftZeroFill(this.year() % 100, 2)
            },
            YYYY: function() {
                return leftZeroFill(this.year(), 4)
            },
            YYYYY: function() {
                return leftZeroFill(this.year(), 5)
            },
            YYYYYY: function() {
                var y = this.year(),
                    sign = y >= 0 ? "+" : "-";
                return sign + leftZeroFill(Math.abs(y), 6)
            },
            gg: function() {
                return leftZeroFill(this.weekYear() % 100, 2)
            },
            gggg: function() {
                return leftZeroFill(this.weekYear(), 4)
            },
            ggggg: function() {
                return leftZeroFill(this.weekYear(), 5)
            },
            GG: function() {
                return leftZeroFill(this.isoWeekYear() % 100, 2)
            },
            GGGG: function() {
                return leftZeroFill(this.isoWeekYear(), 4)
            },
            GGGGG: function() {
                return leftZeroFill(this.isoWeekYear(), 5)
            },
            e: function() {
                return this.weekday()
            },
            E: function() {
                return this.isoWeekday()
            },
            a: function() {
                return this.localeData().meridiem(this.hours(), this.minutes(), true)
            },
            A: function() {
                return this.localeData().meridiem(this.hours(), this.minutes(), false)
            },
            H: function() {
                return this.hours()
            },
            h: function() {
                return this.hours() % 12 || 12
            },
            m: function() {
                return this.minutes()
            },
            s: function() {
                return this.seconds()
            },
            S: function() {
                return toInt(this.milliseconds() / 100)
            },
            SS: function() {
                return leftZeroFill(toInt(this.milliseconds() / 10), 2)
            },
            SSS: function() {
                return leftZeroFill(this.milliseconds(), 3)
            },
            SSSS: function() {
                return leftZeroFill(this.milliseconds(), 3)
            },
            Z: function() {
                var a = this.utcOffset(),
                    b = "+";
                if (a < 0) {
                    a = -a;
                    b = "-"
                }
                return b + leftZeroFill(toInt(a / 60), 2) + ":" + leftZeroFill(toInt(a) % 60, 2)
            },
            ZZ: function() {
                var a = this.utcOffset(),
                    b = "+";
                if (a < 0) {
                    a = -a;
                    b = "-"
                }
                return b + leftZeroFill(toInt(a / 60), 2) + leftZeroFill(toInt(a) % 60, 2)
            },
            z: function() {
                return this.zoneAbbr()
            },
            zz: function() {
                return this.zoneName()
            },
            x: function() {
                return this.valueOf()
            },
            X: function() {
                return this.unix()
            },
            Q: function() {
                return this.quarter()
            }
        },
        deprecations = {},
        lists = ["months", "monthsShort", "weekdays", "weekdaysShort", "weekdaysMin"],
        updateInProgress = false;

    function dfl(a, b, c) {
        switch (arguments.length) {
            case 2:
                return a != null ? a : b;
            case 3:
                return a != null ? a : b != null ? b : c;
            default:
                throw new Error("Implement me")
        }
    }

    function hasOwnProp(a, b) {
        return hasOwnProperty.call(a, b)
    }

    function defaultParsingFlags() {
        return {
            empty: false,
            unusedTokens: [],
            unusedInput: [],
            overflow: -2,
            charsLeftOver: 0,
            nullInput: false,
            invalidMonth: null,
            invalidFormat: false,
            userInvalidated: false,
            iso: false
        }
    }

    function printMsg(msg) {
        if (moment.suppressDeprecationWarnings === false && typeof console !== "undefined" && console.warn) {
            console.warn("Deprecation warning: " + msg)
        }
    }

    function deprecate(msg, fn) {
        var firstTime = true;
        return extend(function() {
            if (firstTime) {
                printMsg(msg);
                firstTime = false
            }
            return fn.apply(this, arguments)
        }, fn)
    }

    function deprecateSimple(name, msg) {
        if (!deprecations[name]) {
            printMsg(msg);
            deprecations[name] = true
        }
    }

    function padToken(func, count) {
        return function(a) {
            return leftZeroFill(func.call(this, a), count)
        }
    }

    function ordinalizeToken(func, period) {
        return function(a) {
            return this.localeData().ordinal(func.call(this, a), period)
        }
    }

    function monthDiff(a, b) {
        var wholeMonthDiff = (b.year() - a.year()) * 12 + (b.month() - a.month()),
            anchor = a.clone().add(wholeMonthDiff, "months"),
            anchor2, adjust;
        if (b - anchor < 0) {
            anchor2 = a.clone().add(wholeMonthDiff - 1, "months");
            adjust = (b - anchor) / (anchor - anchor2)
        } else {
            anchor2 = a.clone().add(wholeMonthDiff + 1, "months");
            adjust = (b - anchor) / (anchor2 - anchor)
        }
        return -(wholeMonthDiff + adjust)
    }
    while (ordinalizeTokens.length) {
        i = ordinalizeTokens.pop();
        formatTokenFunctions[i + "o"] = ordinalizeToken(formatTokenFunctions[i], i)
    }
    while (paddedTokens.length) {
        i = paddedTokens.pop();
        formatTokenFunctions[i + i] = padToken(formatTokenFunctions[i], 2)
    }
    formatTokenFunctions.DDDD = padToken(formatTokenFunctions.DDD, 3);

    function meridiemFixWrap(locale, hour, meridiem) {
        var isPm;
        if (meridiem == null) {
            return hour
        }
        if (locale.meridiemHour != null) {
            return locale.meridiemHour(hour, meridiem)
        } else if (locale.isPM != null) {
            isPm = locale.isPM(meridiem);
            if (isPm && hour < 12) {
                hour += 12
            }
            if (!isPm && hour === 12) {
                hour = 0
            }
            return hour
        } else {
            return hour
        }
    }

    function Locale() {}

    function Moment(config, skipOverflow) {
        if (skipOverflow !== false) {
            checkOverflow(config)
        }
        copyConfig(this, config);
        this._d = new Date((+config._d));
        if (updateInProgress === false) {
            updateInProgress = true;
            moment.updateOffset(this);
            updateInProgress = false
        }
    }

    function Duration(duration) {
        var normalizedInput = normalizeObjectUnits(duration),
            years = normalizedInput.year || 0,
            quarters = normalizedInput.quarter || 0,
            months = normalizedInput.month || 0,
            weeks = normalizedInput.week || 0,
            days = normalizedInput.day || 0,
            hours = normalizedInput.hour || 0,
            minutes = normalizedInput.minute || 0,
            seconds = normalizedInput.second || 0,
            milliseconds = normalizedInput.millisecond || 0;
        this._milliseconds = +milliseconds + seconds * 1e3 + minutes * 6e4 + hours * 36e5;
        this._days = +days + weeks * 7;
        this._months = +months + quarters * 3 + years * 12;
        this._data = {};
        this._locale = moment.localeData();
        this._bubble()
    }

    function extend(a, b) {
        for (var i in b) {
            if (hasOwnProp(b, i)) {
                a[i] = b[i]
            }
        }
        if (hasOwnProp(b, "toString")) {
            a.toString = b.toString
        }
        if (hasOwnProp(b, "valueOf")) {
            a.valueOf = b.valueOf
        }
        return a
    }

    function copyConfig(to, from) {
        var i, prop, val;
        if (typeof from._isAMomentObject !== "undefined") {
            to._isAMomentObject = from._isAMomentObject
        }
        if (typeof from._i !== "undefined") {
            to._i = from._i
        }
        if (typeof from._f !== "undefined") {
            to._f = from._f
        }
        if (typeof from._l !== "undefined") {
            to._l = from._l
        }
        if (typeof from._strict !== "undefined") {
            to._strict = from._strict
        }
        if (typeof from._tzm !== "undefined") {
            to._tzm = from._tzm
        }
        if (typeof from._isUTC !== "undefined") {
            to._isUTC = from._isUTC
        }
        if (typeof from._offset !== "undefined") {
            to._offset = from._offset
        }
        if (typeof from._pf !== "undefined") {
            to._pf = from._pf
        }
        if (typeof from._locale !== "undefined") {
            to._locale = from._locale
        }
        if (momentProperties.length > 0) {
            for (i in momentProperties) {
                prop = momentProperties[i];
                val = from[prop];
                if (typeof val !== "undefined") {
                    to[prop] = val
                }
            }
        }
        return to
    }

    function absRound(number) {
        if (number < 0) {
            return Math.ceil(number)
        } else {
            return Math.floor(number)
        }
    }

    function leftZeroFill(number, targetLength, forceSign) {
        var output = "" + Math.abs(number),
            sign = number >= 0;
        while (output.length < targetLength) {
            output = "0" + output
        }
        return (sign ? forceSign ? "+" : "" : "-") + output
    }

    function positiveMomentsDifference(base, other) {
        var res = {
            milliseconds: 0,
            months: 0
        };
        res.months = other.month() - base.month() + (other.year() - base.year()) * 12;
        if (base.clone().add(res.months, "M").isAfter(other)) {
            --res.months
        }
        res.milliseconds = +other - +base.clone().add(res.months, "M");
        return res
    }

    function momentsDifference(base, other) {
        var res;
        other = makeAs(other, base);
        if (base.isBefore(other)) {
            res = positiveMomentsDifference(base, other)
        } else {
            res = positiveMomentsDifference(other, base);
            res.milliseconds = -res.milliseconds;
            res.months = -res.months
        }
        return res
    }

    function createAdder(direction, name) {
        return function(val, period) {
            var dur, tmp;
            if (period !== null && !isNaN(+period)) {
                deprecateSimple(name, "moment()." + name + "(period, number) is deprecated. Please use moment()." + name + "(number, period).");
                tmp = val;
                val = period;
                period = tmp
            }
            val = typeof val === "string" ? +val : val;
            dur = moment.duration(val, period);
            addOrSubtractDurationFromMoment(this, dur, direction);
            return this
        }
    }

    function addOrSubtractDurationFromMoment(mom, duration, isAdding, updateOffset) {
        var milliseconds = duration._milliseconds,
            days = duration._days,
            months = duration._months;
        updateOffset = updateOffset == null ? true : updateOffset;
        if (milliseconds) {
            mom._d.setTime(+mom._d + milliseconds * isAdding)
        }
        if (days) {
            rawSetter(mom, "Date", rawGetter(mom, "Date") + days * isAdding);
        }
        if (months) {
            rawMonthSetter(mom, rawGetter(mom, "Month") + months * isAdding)
        }
        if (updateOffset) {
            moment.updateOffset(mom, days || months)
        }
    }

    function isArray(input) {
        return Object.prototype.toString.call(input) === "[object Array]"
    }

    function isDate(input) {
        return Object.prototype.toString.call(input) === "[object Date]" || input instanceof Date
    }

    function compareArrays(array1, array2, dontConvert) {
        var len = Math.min(array1.length, array2.length),
            lengthDiff = Math.abs(array1.length - array2.length),
            diffs = 0,
            i;
        for (i = 0; i < len; i++) {
            if (dontConvert && array1[i] !== array2[i] || !dontConvert && toInt(array1[i]) !== toInt(array2[i])) {
                diffs++
            }
        }
        return diffs + lengthDiff
    }

    function normalizeUnits(units) {
        if (units) {
            var lowered = units.toLowerCase().replace(/(.)s$/, "$1");
            units = unitAliases[units] || camelFunctions[lowered] || lowered
        }
        return units
    }

    function normalizeObjectUnits(inputObject) {
        var normalizedInput = {},
            normalizedProp, prop;
        for (prop in inputObject) {
            if (hasOwnProp(inputObject, prop)) {
                normalizedProp = normalizeUnits(prop);
                if (normalizedProp) {
                    normalizedInput[normalizedProp] = inputObject[prop]
                }
            }
        }
        return normalizedInput
    }

    function makeList(field) {
        var count, setter;
        if (field.indexOf("week") === 0) {
            count = 7;
            setter = "day"
        } else if (field.indexOf("month") === 0) {
            count = 12;
            setter = "month"
        } else {
            return
        }
        moment[field] = function(format, index) {
            var i, getter, method = moment._locale[field],
                results = [];
            if (typeof format === "number") {
                index = format;
                format = undefined
            }
            getter = function(i) {
                var m = moment().utc().set(setter, i);
                return method.call(moment._locale, m, format || "")
            };
            if (index != null) {
                return getter(index)
            } else {
                for (i = 0; i < count; i++) {
                    results.push(getter(i))
                }
                return results
            }
        }
    }

    function toInt(argumentForCoercion) {
        var coercedNumber = +argumentForCoercion,
            value = 0;
        if (coercedNumber !== 0 && isFinite(coercedNumber)) {
            if (coercedNumber >= 0) {
                value = Math.floor(coercedNumber)
            } else {
                value = Math.ceil(coercedNumber)
            }
        }
        return value
    }

    function daysInMonth(year, month) {
        return new Date(Date.UTC(year, month + 1, 0)).getUTCDate()
    }

    function weeksInYear(year, dow, doy) {
        return weekOfYear(moment([year, 11, 31 + dow - doy]), dow, doy).week
    }

    function daysInYear(year) {
        return isLeapYear(year) ? 366 : 365
    }

    function isLeapYear(year) {
        return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0
    }

    function checkOverflow(m) {
        var overflow;
        if (m._a && m._pf.overflow === -2) {
            overflow = m._a[MONTH] < 0 || m._a[MONTH] > 11 ? MONTH : m._a[DATE] < 1 || m._a[DATE] > daysInMonth(m._a[YEAR], m._a[MONTH]) ? DATE : m._a[HOUR] < 0 || m._a[HOUR] > 24 || m._a[HOUR] === 24 && (m._a[MINUTE] !== 0 || m._a[SECOND] !== 0 || m._a[MILLISECOND] !== 0) ? HOUR : m._a[MINUTE] < 0 || m._a[MINUTE] > 59 ? MINUTE : m._a[SECOND] < 0 || m._a[SECOND] > 59 ? SECOND : m._a[MILLISECOND] < 0 || m._a[MILLISECOND] > 999 ? MILLISECOND : -1;
            if (m._pf._overflowDayOfYear && (overflow < YEAR || overflow > DATE)) {
                overflow = DATE
            }
            m._pf.overflow = overflow
        }
    }

    function isValid(m) {
        if (m._isValid == null) {
            m._isValid = !isNaN(m._d.getTime()) && m._pf.overflow < 0 && !m._pf.empty && !m._pf.invalidMonth && !m._pf.nullInput && !m._pf.invalidFormat && !m._pf.userInvalidated;
            if (m._strict) {
                m._isValid = m._isValid && m._pf.charsLeftOver === 0 && m._pf.unusedTokens.length === 0 && m._pf.bigHour === undefined
            }
        }
        return m._isValid
    }

    function normalizeLocale(key) {
        return key ? key.toLowerCase().replace("_", "-") : key
    }

    function chooseLocale(names) {
        var i = 0,
            j, next, locale, split;
        while (i < names.length) {
            split = normalizeLocale(names[i]).split("-");
            j = split.length;
            next = normalizeLocale(names[i + 1]);
            next = next ? next.split("-") : null;
            while (j > 0) {
                locale = loadLocale(split.slice(0, j).join("-"));
                if (locale) {
                    return locale
                }
                if (next && next.length >= j && compareArrays(split, next, true) >= j - 1) {
                    break
                }
                j--
            }
            i++
        }
        return null
    }

    function loadLocale(name) {
        var oldLocale = null;
        if (!locales[name] && hasModule) {
            try {
                oldLocale = moment.locale();
                require("./locale/" + name);
                moment.locale(oldLocale)
            } catch (e) {}
        }
        return locales[name]
    }

    function makeAs(input, model) {
        var res, diff;
        if (model._isUTC) {
            res = model.clone();
            diff = (moment.isMoment(input) || isDate(input) ? +input : +moment(input)) - +res;
            res._d.setTime(+res._d + diff);
            moment.updateOffset(res, false);
            return res
        } else {
            return moment(input).local()
        }
    }
    extend(Locale.prototype, {
        set: function(config) {
            var prop, i;
            for (i in config) {
                prop = config[i];
                if (typeof prop === "function") {
                    this[i] = prop
                } else {
                    this["_" + i] = prop
                }
            }
            this._ordinalParseLenient = new RegExp(this._ordinalParse.source + "|" + /\d{1,2}/.source)
        },
        _months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
        months: function(m) {
            return this._months[m.month()]
        },
        _monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
        monthsShort: function(m) {
            return this._monthsShort[m.month()]
        },
        monthsParse: function(monthName, format, strict) {
            var i, mom, regex;
            if (!this._monthsParse) {
                this._monthsParse = [];
                this._longMonthsParse = [];
                this._shortMonthsParse = []
            }
            for (i = 0; i < 12; i++) {
                mom = moment.utc([2e3, i]);
                if (strict && !this._longMonthsParse[i]) {
                    this._longMonthsParse[i] = new RegExp("^" + this.months(mom, "").replace(".", "") + "$", "i");
                    this._shortMonthsParse[i] = new RegExp("^" + this.monthsShort(mom, "").replace(".", "") + "$", "i")
                }
                if (!strict && !this._monthsParse[i]) {
                    regex = "^" + this.months(mom, "") + "|^" + this.monthsShort(mom, "");
                    this._monthsParse[i] = new RegExp(regex.replace(".", ""), "i")
                }
                if (strict && format === "MMMM" && this._longMonthsParse[i].test(monthName)) {
                    return i
                } else if (strict && format === "MMM" && this._shortMonthsParse[i].test(monthName)) {
                    return i
                } else if (!strict && this._monthsParse[i].test(monthName)) {
                    return i
                }
            }
        },
        _weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
        weekdays: function(m) {
            return this._weekdays[m.day()]
        },
        _weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
        weekdaysShort: function(m) {
            return this._weekdaysShort[m.day()]
        },
        _weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
        weekdaysMin: function(m) {
            return this._weekdaysMin[m.day()]
        },
        weekdaysParse: function(weekdayName) {
            var i, mom, regex;
            if (!this._weekdaysParse) {
                this._weekdaysParse = []
            }
            for (i = 0; i < 7; i++) {
                if (!this._weekdaysParse[i]) {
                    mom = moment([2e3, 1]).day(i);
                    regex = "^" + this.weekdays(mom, "") + "|^" + this.weekdaysShort(mom, "") + "|^" + this.weekdaysMin(mom, "");
                    this._weekdaysParse[i] = new RegExp(regex.replace(".", ""), "i")
                }
                if (this._weekdaysParse[i].test(weekdayName)) {
                    return i
                }
            }
        },
        _longDateFormat: {
            LTS: "h:mm:ss A",
            LT: "h:mm A",
            L: "MM/DD/YYYY",
            LL: "MMMM D, YYYY",
            LLL: "MMMM D, YYYY LT",
            LLLL: "dddd, MMMM D, YYYY LT"
        },
        longDateFormat: function(key) {
            var output = this._longDateFormat[key];
            if (!output && this._longDateFormat[key.toUpperCase()]) {
                output = this._longDateFormat[key.toUpperCase()].replace(/MMMM|MM|DD|dddd/g, function(val) {
                    return val.slice(1)
                });
                this._longDateFormat[key] = output
            }
            return output
        },
        isPM: function(input) {
            return (input + "").toLowerCase().charAt(0) === "p"
        },
        _meridiemParse: /[ap]\.?m?\.?/i,
        meridiem: function(hours, minutes, isLower) {
            if (hours > 11) {
                return isLower ? "pm" : "PM"
            } else {
                return isLower ? "am" : "AM"
            }
        },
        _calendar: {
            sameDay: "[Today at] LT",
            nextDay: "[Tomorrow at] LT",
            nextWeek: "dddd [at] LT",
            lastDay: "[Yesterday at] LT",
            lastWeek: "[Last] dddd [at] LT",
            sameElse: "L"
        },
        calendar: function(key, mom, now) {
            var output = this._calendar[key];
            return typeof output === "function" ? output.apply(mom, [now]) : output
        },
        _relativeTime: {
            future: "in %s",
            past: "%s ago",
            s: "a few seconds",
            m: "a minute",
            mm: "%d minutes",
            h: "an hour",
            hh: "%d hours",
            d: "a day",
            dd: "%d days",
            M: "a month",
            MM: "%d months",
            y: "a year",
            yy: "%d years"
        },
        relativeTime: function(number, withoutSuffix, string, isFuture) {
            var output = this._relativeTime[string];
            return typeof output === "function" ? output(number, withoutSuffix, string, isFuture) : output.replace(/%d/i, number)
        },
        pastFuture: function(diff, output) {
            var format = this._relativeTime[diff > 0 ? "future" : "past"];
            return typeof format === "function" ? format(output) : format.replace(/%s/i, output)
        },
        ordinal: function(number) {
            return this._ordinal.replace("%d", number)
        },
        _ordinal: "%d",
        _ordinalParse: /\d{1,2}/,
        preparse: function(string) {
            return string
        },
        postformat: function(string) {
            return string
        },
        week: function(mom) {
            return weekOfYear(mom, this._week.dow, this._week.doy).week
        },
        _week: {
            dow: 0,
            doy: 6
        },
        firstDayOfWeek: function() {
            return this._week.dow
        },
        firstDayOfYear: function() {
            return this._week.doy
        },
        _invalidDate: "Invalid date",
        invalidDate: function() {
            return this._invalidDate
        }
    });

    function removeFormattingTokens(input) {
        if (input.match(/\[[\s\S]/)) {
            return input.replace(/^\[|\]$/g, "")
        }
        return input.replace(/\\/g, "")
    }

    function makeFormatFunction(format) {
        var array = format.match(formattingTokens),
            i, length;
        for (i = 0, length = array.length; i < length; i++) {
            if (formatTokenFunctions[array[i]]) {
                array[i] = formatTokenFunctions[array[i]]
            } else {
                array[i] = removeFormattingTokens(array[i])
            }
        }
        return function(mom) {
            var output = "";
            for (i = 0; i < length; i++) {
                output += array[i] instanceof Function ? array[i].call(mom, format) : array[i]
            }
            return output
        }
    }

    function formatMoment(m, format) {
        if (!m.isValid()) {
            return m.localeData().invalidDate()
        }
        format = expandFormat(format, m.localeData());
        if (!formatFunctions[format]) {
            formatFunctions[format] = makeFormatFunction(format)
        }
        return formatFunctions[format](m)
    }

    function expandFormat(format, locale) {
        var i = 5;

        function replaceLongDateFormatTokens(input) {
            return locale.longDateFormat(input) || input
        }
        localFormattingTokens.lastIndex = 0;
        while (i >= 0 && localFormattingTokens.test(format)) {
            format = format.replace(localFormattingTokens, replaceLongDateFormatTokens);
            localFormattingTokens.lastIndex = 0;
            i -= 1
        }
        return format
    }

    function getParseRegexForToken(token, config) {
        var a, strict = config._strict;
        switch (token) {
            case "Q":
                return parseTokenOneDigit;
            case "DDDD":
                return parseTokenThreeDigits;
            case "YYYY":
            case "GGGG":
            case "gggg":
                return strict ? parseTokenFourDigits : parseTokenOneToFourDigits;
            case "Y":
            case "G":
            case "g":
                return parseTokenSignedNumber;
            case "YYYYYY":
            case "YYYYY":
            case "GGGGG":
            case "ggggg":
                return strict ? parseTokenSixDigits : parseTokenOneToSixDigits;
            case "S":
                if (strict) {
                    return parseTokenOneDigit
                }
            case "SS":
                if (strict) {
                    return parseTokenTwoDigits
                }
            case "SSS":
                if (strict) {
                    return parseTokenThreeDigits
                }
            case "DDD":
                return parseTokenOneToThreeDigits;
            case "MMM":
            case "MMMM":
            case "dd":
            case "ddd":
            case "dddd":
                return parseTokenWord;
            case "a":
            case "A":
                return config._locale._meridiemParse;
            case "x":
                return parseTokenOffsetMs;
            case "X":
                return parseTokenTimestampMs;
            case "Z":
            case "ZZ":
                return parseTokenTimezone;
            case "T":
                return parseTokenT;
            case "SSSS":
                return parseTokenDigits;
            case "MM":
            case "DD":
            case "YY":
            case "GG":
            case "gg":
            case "HH":
            case "hh":
            case "mm":
            case "ss":
            case "ww":
            case "WW":
                return strict ? parseTokenTwoDigits : parseTokenOneOrTwoDigits;
            case "M":
            case "D":
            case "d":
            case "H":
            case "h":
            case "m":
            case "s":
            case "w":
            case "W":
            case "e":
            case "E":
                return parseTokenOneOrTwoDigits;
            case "Do":
                return strict ? config._locale._ordinalParse : config._locale._ordinalParseLenient;
            default:
                a = new RegExp(regexpEscape(unescapeFormat(token.replace("\\", "")), "i"));
                return a
        }
    }

    function utcOffsetFromString(string) {
        string = string || "";
        var possibleTzMatches = string.match(parseTokenTimezone) || [],
            tzChunk = possibleTzMatches[possibleTzMatches.length - 1] || [],
            parts = (tzChunk + "").match(parseTimezoneChunker) || ["-", 0, 0],
            minutes = +(parts[1] * 60) + toInt(parts[2]);
        return parts[0] === "+" ? minutes : -minutes
    }

    function addTimeToArrayFromToken(token, input, config) {
        var a, datePartArray = config._a;
        switch (token) {
            case "Q":
                if (input != null) {
                    datePartArray[MONTH] = (toInt(input) - 1) * 3
                }
                break;
            case "M":
            case "MM":
                if (input != null) {
                    datePartArray[MONTH] = toInt(input) - 1
                }
                break;
            case "MMM":
            case "MMMM":
                a = config._locale.monthsParse(input, token, config._strict);
                if (a != null) {
                    datePartArray[MONTH] = a
                } else {
                    config._pf.invalidMonth = input
                }
                break;
            case "D":
            case "DD":
                if (input != null) {
                    datePartArray[DATE] = toInt(input)
                }
                break;
            case "Do":
                if (input != null) {
                    datePartArray[DATE] = toInt(parseInt(input.match(/\d{1,2}/)[0], 10))
                }
                break;
            case "DDD":
            case "DDDD":
                if (input != null) {
                    config._dayOfYear = toInt(input)
                }
                break;
            case "YY":
                datePartArray[YEAR] = moment.parseTwoDigitYear(input);
                break;
            case "YYYY":
            case "YYYYY":
            case "YYYYYY":
                datePartArray[YEAR] = toInt(input);
                break;
            case "a":
            case "A":
                config._meridiem = input;
                break;
            case "h":
            case "hh":
                config._pf.bigHour = true;
            case "H":
            case "HH":
                datePartArray[HOUR] = toInt(input);
                break;
            case "m":
            case "mm":
                datePartArray[MINUTE] = toInt(input);
                break;
            case "s":
            case "ss":
                datePartArray[SECOND] = toInt(input);
                break;
            case "S":
            case "SS":
            case "SSS":
            case "SSSS":
                datePartArray[MILLISECOND] = toInt(("0." + input) * 1e3);
                break;
            case "x":
                config._d = new Date(toInt(input));
                break;
            case "X":
                config._d = new Date(parseFloat(input) * 1e3);
                break;
            case "Z":
            case "ZZ":
                config._useUTC = true;
                config._tzm = utcOffsetFromString(input);
                break;
            case "dd":
            case "ddd":
            case "dddd":
                a = config._locale.weekdaysParse(input);
                if (a != null) {
                    config._w = config._w || {};
                    config._w["d"] = a
                } else {
                    config._pf.invalidWeekday = input
                }
                break;
            case "w":
            case "ww":
            case "W":
            case "WW":
            case "d":
            case "e":
            case "E":
                token = token.substr(0, 1);
            case "gggg":
            case "GGGG":
            case "GGGGG":
                token = token.substr(0, 2);
                if (input) {
                    config._w = config._w || {};
                    config._w[token] = toInt(input)
                }
                break;
            case "gg":
            case "GG":
                config._w = config._w || {};
                config._w[token] = moment.parseTwoDigitYear(input)
        }
    }

    function dayOfYearFromWeekInfo(config) {
        var w, weekYear, week, weekday, dow, doy, temp;
        w = config._w;
        if (w.GG != null || w.W != null || w.E != null) {
            dow = 1;
            doy = 4;
            weekYear = dfl(w.GG, config._a[YEAR], weekOfYear(moment(), 1, 4).year);
            week = dfl(w.W, 1);
            weekday = dfl(w.E, 1)
        } else {
            dow = config._locale._week.dow;
            doy = config._locale._week.doy;
            weekYear = dfl(w.gg, config._a[YEAR], weekOfYear(moment(), dow, doy).year);
            week = dfl(w.w, 1);
            if (w.d != null) {
                weekday = w.d;
                if (weekday < dow) {
                    ++week
                }
            } else if (w.e != null) {
                weekday = w.e + dow
            } else {
                weekday = dow
            }
        }
        temp = dayOfYearFromWeeks(weekYear, week, weekday, doy, dow);
        config._a[YEAR] = temp.year;
        config._dayOfYear = temp.dayOfYear
    }

    function dateFromConfig(config) {
        var i, date, input = [],
            currentDate, yearToUse;
        if (config._d) {
            return
        }
        currentDate = currentDateArray(config);
        if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
            dayOfYearFromWeekInfo(config)
        }
        if (config._dayOfYear) {
            yearToUse = dfl(config._a[YEAR], currentDate[YEAR]);
            if (config._dayOfYear > daysInYear(yearToUse)) {
                config._pf._overflowDayOfYear = true
            }
            date = makeUTCDate(yearToUse, 0, config._dayOfYear);
            config._a[MONTH] = date.getUTCMonth();
            config._a[DATE] = date.getUTCDate()
        }
        for (i = 0; i < 3 && config._a[i] == null; ++i) {
            config._a[i] = input[i] = currentDate[i]
        }
        for (; i < 7; i++) {
            config._a[i] = input[i] = config._a[i] == null ? i === 2 ? 1 : 0 : config._a[i]
        }
        if (config._a[HOUR] === 24 && config._a[MINUTE] === 0 && config._a[SECOND] === 0 && config._a[MILLISECOND] === 0) {
            config._nextDay = true;
            config._a[HOUR] = 0
        }
        config._d = (config._useUTC ? makeUTCDate : makeDate).apply(null, input);
        if (config._tzm != null) {
            config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm)
        }
        if (config._nextDay) {
            config._a[HOUR] = 24
        }
    }

    function dateFromObject(config) {
        var normalizedInput;
        if (config._d) {
            return
        }
        normalizedInput = normalizeObjectUnits(config._i);
        config._a = [normalizedInput.year, normalizedInput.month, normalizedInput.day || normalizedInput.date, normalizedInput.hour, normalizedInput.minute, normalizedInput.second, normalizedInput.millisecond];
        dateFromConfig(config)
    }

    function currentDateArray(config) {
        var now = new Date;
        if (config._useUTC) {
            return [now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()]
        } else {
            return [now.getFullYear(), now.getMonth(), now.getDate()]
        }
    }

    function makeDateFromStringAndFormat(config) {
        if (config._f === moment.ISO_8601) {
            parseISO(config);
            return
        }
        config._a = [];
        config._pf.empty = true;
        var string = "" + config._i,
            i, parsedInput, tokens, token, skipped, stringLength = string.length,
            totalParsedInputLength = 0;
        tokens = expandFormat(config._f, config._locale).match(formattingTokens) || [];
        for (i = 0; i < tokens.length; i++) {
            token = tokens[i];
            parsedInput = (string.match(getParseRegexForToken(token, config)) || [])[0];
            if (parsedInput) {
                skipped = string.substr(0, string.indexOf(parsedInput));
                if (skipped.length > 0) {
                    config._pf.unusedInput.push(skipped)
                }
                string = string.slice(string.indexOf(parsedInput) + parsedInput.length);
                totalParsedInputLength += parsedInput.length
            }
            if (formatTokenFunctions[token]) {
                if (parsedInput) {
                    config._pf.empty = false
                } else {
                    config._pf.unusedTokens.push(token)
                }
                addTimeToArrayFromToken(token, parsedInput, config)
            } else if (config._strict && !parsedInput) {
                config._pf.unusedTokens.push(token)
            }
        }
        config._pf.charsLeftOver = stringLength - totalParsedInputLength;
        if (string.length > 0) {
            config._pf.unusedInput.push(string)
        }
        if (config._pf.bigHour === true && config._a[HOUR] <= 12) {
            config._pf.bigHour = undefined
        }
        config._a[HOUR] = meridiemFixWrap(config._locale, config._a[HOUR], config._meridiem);
        dateFromConfig(config);
        checkOverflow(config)
    }

    function unescapeFormat(s) {
        return s.replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function(matched, p1, p2, p3, p4) {
            return p1 || p2 || p3 || p4
        })
    }

    function regexpEscape(s) {
        return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")
    }

    function makeDateFromStringAndArray(config) {
        var tempConfig, bestMoment, scoreToBeat, i, currentScore;
        if (config._f.length === 0) {
            config._pf.invalidFormat = true;
            config._d = new Date(NaN);
            return
        }
        for (i = 0; i < config._f.length; i++) {
            currentScore = 0;
            tempConfig = copyConfig({}, config);
            if (config._useUTC != null) {
                tempConfig._useUTC = config._useUTC
            }
            tempConfig._pf = defaultParsingFlags();
            tempConfig._f = config._f[i];
            makeDateFromStringAndFormat(tempConfig);
            if (!isValid(tempConfig)) {
                continue
            }
            currentScore += tempConfig._pf.charsLeftOver;
            currentScore += tempConfig._pf.unusedTokens.length * 10;
            tempConfig._pf.score = currentScore;
            if (scoreToBeat == null || currentScore < scoreToBeat) {
                scoreToBeat = currentScore;
                bestMoment = tempConfig
            }
        }
        extend(config, bestMoment || tempConfig)
    }

    function parseISO(config) {
        var i, l, string = config._i,
            match = isoRegex.exec(string);
        if (match) {
            config._pf.iso = true;
            for (i = 0, l = isoDates.length; i < l; i++) {
                if (isoDates[i][1].exec(string)) {
                    config._f = isoDates[i][0] + (match[6] || " ");
                    break
                }
            }
            for (i = 0, l = isoTimes.length; i < l; i++) {
                if (isoTimes[i][1].exec(string)) {
                    config._f += isoTimes[i][0];
                    break
                }
            }
            if (string.match(parseTokenTimezone)) {
                config._f += "Z"
            }
            makeDateFromStringAndFormat(config)
        } else {
            config._isValid = false
        }
    }

    function makeDateFromString(config) {
        parseISO(config);
        if (config._isValid === false) {
            delete config._isValid;
            moment.createFromInputFallback(config)
        }
    }

    function map(arr, fn) {
        var res = [],
            i;
        for (i = 0; i < arr.length; ++i) {
            res.push(fn(arr[i], i))
        }
        return res
    }

    function makeDateFromInput(config) {
        var input = config._i,
            matched;
        if (input === undefined) {
            config._d = new Date
        } else if (isDate(input)) {
            config._d = new Date((+input))
        } else if ((matched = aspNetJsonRegex.exec(input)) !== null) {
            config._d = new Date((+matched[1]))
        } else if (typeof input === "string") {
            makeDateFromString(config)
        } else if (isArray(input)) {
            config._a = map(input.slice(0), function(obj) {
                return parseInt(obj, 10)
            });
            dateFromConfig(config)
        } else if (typeof input === "object") {
            dateFromObject(config)
        } else if (typeof input === "number") {
            config._d = new Date(input)
        } else {
            moment.createFromInputFallback(config)
        }
    }

    function makeDate(y, m, d, h, M, s, ms) {
        var date = new Date(y, m, d, h, M, s, ms);
        if (y < 1970) {
            date.setFullYear(y)
        }
        return date
    }

    function makeUTCDate(y) {
        var date = new Date(Date.UTC.apply(null, arguments));
        if (y < 1970) {
            date.setUTCFullYear(y)
        }
        return date
    }

    function parseWeekday(input, locale) {
        if (typeof input === "string") {
            if (!isNaN(input)) {
                input = parseInt(input, 10)
            } else {
                input = locale.weekdaysParse(input);
                if (typeof input !== "number") {
                    return null
                }
            }
        }
        return input
    }

    function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale) {
        return locale.relativeTime(number || 1, !!withoutSuffix, string, isFuture)
    }

    function relativeTime(posNegDuration, withoutSuffix, locale) {
        var duration = moment.duration(posNegDuration).abs(),
            seconds = round(duration.as("s")),
            minutes = round(duration.as("m")),
            hours = round(duration.as("h")),
            days = round(duration.as("d")),
            months = round(duration.as("M")),
            years = round(duration.as("y")),
            args = seconds < relativeTimeThresholds.s && ["s", seconds] || minutes === 1 && ["m"] || minutes < relativeTimeThresholds.m && ["mm", minutes] || hours === 1 && ["h"] || hours < relativeTimeThresholds.h && ["hh", hours] || days === 1 && ["d"] || days < relativeTimeThresholds.d && ["dd", days] || months === 1 && ["M"] || months < relativeTimeThresholds.M && ["MM", months] || years === 1 && ["y"] || ["yy", years];
        args[2] = withoutSuffix;
        args[3] = +posNegDuration > 0;
        args[4] = locale;
        return substituteTimeAgo.apply({}, args)
    }

    function weekOfYear(mom, firstDayOfWeek, firstDayOfWeekOfYear) {
        var end = firstDayOfWeekOfYear - firstDayOfWeek,
            daysToDayOfWeek = firstDayOfWeekOfYear - mom.day(),
            adjustedMoment;
        if (daysToDayOfWeek > end) {
            daysToDayOfWeek -= 7
        }
        if (daysToDayOfWeek < end - 7) {
            daysToDayOfWeek += 7
        }
        adjustedMoment = moment(mom).add(daysToDayOfWeek, "d");
        return {
            week: Math.ceil(adjustedMoment.dayOfYear() / 7),
            year: adjustedMoment.year()
        }
    }

    function dayOfYearFromWeeks(year, week, weekday, firstDayOfWeekOfYear, firstDayOfWeek) {
        var d = makeUTCDate(year, 0, 1).getUTCDay(),
            daysToAdd, dayOfYear;
        d = d === 0 ? 7 : d;
        weekday = weekday != null ? weekday : firstDayOfWeek;
        daysToAdd = firstDayOfWeek - d + (d > firstDayOfWeekOfYear ? 7 : 0) - (d < firstDayOfWeek ? 7 : 0);
        dayOfYear = 7 * (week - 1) + (weekday - firstDayOfWeek) + daysToAdd + 1;
        return {
            year: dayOfYear > 0 ? year : year - 1,
            dayOfYear: dayOfYear > 0 ? dayOfYear : daysInYear(year - 1) + dayOfYear
        }
    }

    function makeMoment(config) {
        var input = config._i,
            format = config._f,
            res;
        config._locale = config._locale || moment.localeData(config._l);
        if (input === null || format === undefined && input === "") {
            return moment.invalid({
                nullInput: true
            })
        }
        if (typeof input === "string") {
            config._i = input = config._locale.preparse(input)
        }
        if (moment.isMoment(input)) {
            return new Moment(input, true)
        } else if (format) {
            if (isArray(format)) {
                makeDateFromStringAndArray(config)
            } else {
                makeDateFromStringAndFormat(config)
            }
        } else {
            makeDateFromInput(config)
        }
        res = new Moment(config);
        if (res._nextDay) {
            res.add(1, "d");
            res._nextDay = undefined
        }
        return res
    }
    moment = function(input, format, locale, strict) {
        var c;
        if (typeof locale === "boolean") {
            strict = locale;
            locale = undefined
        }
        c = {};
        c._isAMomentObject = true;
        c._i = input;
        c._f = format;
        c._l = locale;
        c._strict = strict;
        c._isUTC = false;
        c._pf = defaultParsingFlags();
        return makeMoment(c)
    };
    moment.suppressDeprecationWarnings = false;
    moment.createFromInputFallback = deprecate("moment construction falls back to js Date. This is " + "discouraged and will be removed in upcoming major " + "release. Please refer to " + "https://github.com/moment/moment/issues/1407 for more info.", function(config) {
        config._d = new Date(config._i + (config._useUTC ? " UTC" : ""))
    });

    function pickBy(fn, moments) {
        var res, i;
        if (moments.length === 1 && isArray(moments[0])) {
            moments = moments[0]
        }
        if (!moments.length) {
            return moment()
        }
        res = moments[0];
        for (i = 1; i < moments.length; ++i) {
            if (moments[i][fn](res)) {
                res = moments[i]
            }
        }
        return res
    }
    moment.min = function() {
        var args = [].slice.call(arguments, 0);
        return pickBy("isBefore", args)
    };
    moment.max = function() {
        var args = [].slice.call(arguments, 0);
        return pickBy("isAfter", args)
    };
    moment.utc = function(input, format, locale, strict) {
        var c;
        if (typeof locale === "boolean") {
            strict = locale;
            locale = undefined
        }
        c = {};
        c._isAMomentObject = true;
        c._useUTC = true;
        c._isUTC = true;
        c._l = locale;
        c._i = input;
        c._f = format;
        c._strict = strict;
        c._pf = defaultParsingFlags();
        return makeMoment(c).utc()
    };
    moment.unix = function(input) {
        return moment(input * 1e3)
    };
    moment.duration = function(input, key) {
        var duration = input,
            match = null,
            sign, ret, parseIso, diffRes;
        if (moment.isDuration(input)) {
            duration = {
                ms: input._milliseconds,
                d: input._days,
                M: input._months
            }
        } else if (typeof input === "number") {
            duration = {};
            if (key) {
                duration[key] = input
            } else {
                duration.milliseconds = input
            }
        } else if (!!(match = aspNetTimeSpanJsonRegex.exec(input))) {
            sign = match[1] === "-" ? -1 : 1;
            duration = {
                y: 0,
                d: toInt(match[DATE]) * sign,
                h: toInt(match[HOUR]) * sign,
                m: toInt(match[MINUTE]) * sign,
                s: toInt(match[SECOND]) * sign,
                ms: toInt(match[MILLISECOND]) * sign
            }
        } else if (!!(match = isoDurationRegex.exec(input))) {
            sign = match[1] === "-" ? -1 : 1;
            parseIso = function(inp) {
                var res = inp && parseFloat(inp.replace(",", "."));
                return (isNaN(res) ? 0 : res) * sign
            };
            duration = {
                y: parseIso(match[2]),
                M: parseIso(match[3]),
                d: parseIso(match[4]),
                h: parseIso(match[5]),
                m: parseIso(match[6]),
                s: parseIso(match[7]),
                w: parseIso(match[8])
            }
        } else if (duration == null) {
            duration = {}
        } else if (typeof duration === "object" && ("from" in duration || "to" in duration)) {
            diffRes = momentsDifference(moment(duration.from), moment(duration.to));
            duration = {};
            duration.ms = diffRes.milliseconds;
            duration.M = diffRes.months
        }
        ret = new Duration(duration);
        if (moment.isDuration(input) && hasOwnProp(input, "_locale")) {
            ret._locale = input._locale
        }
        return ret
    };
    moment.version = VERSION;
    moment.defaultFormat = isoFormat;
    moment.ISO_8601 = function() {};
    moment.momentProperties = momentProperties;
    moment.updateOffset = function() {};
    moment.relativeTimeThreshold = function(threshold, limit) {
        if (relativeTimeThresholds[threshold] === undefined) {
            return false
        }
        if (limit === undefined) {
            return relativeTimeThresholds[threshold]
        }
        relativeTimeThresholds[threshold] = limit;
        return true
    };
    moment.lang = deprecate("moment.lang is deprecated. Use moment.locale instead.", function(key, value) {
        return moment.locale(key, value)
    });
    moment.locale = function(key, values) {
        var data;
        if (key) {
            if (typeof values !== "undefined") {
                data = moment.defineLocale(key, values)
            } else {
                data = moment.localeData(key)
            }
            if (data) {
                moment.duration._locale = moment._locale = data
            }
        }
        return moment._locale._abbr
    };
    moment.defineLocale = function(name, values) {
        if (values !== null) {
            values.abbr = name;
            if (!locales[name]) {
                locales[name] = new Locale
            }
            locales[name].set(values);
            moment.locale(name);
            return locales[name]
        } else {
            delete locales[name];
            return null
        }
    };
    moment.langData = deprecate("moment.langData is deprecated. Use moment.localeData instead.", function(key) {
        return moment.localeData(key)
    });
    moment.localeData = function(key) {
        var locale;
        if (key && key._locale && key._locale._abbr) {
            key = key._locale._abbr
        }
        if (!key) {
            return moment._locale
        }
        if (!isArray(key)) {
            locale = loadLocale(key);
            if (locale) {
                return locale
            }
            key = [key]
        }
        return chooseLocale(key)
    };
    moment.isMoment = function(obj) {
        return obj instanceof Moment || obj != null && hasOwnProp(obj, "_isAMomentObject")
    };
    moment.isDuration = function(obj) {
        return obj instanceof Duration
    };
    for (i = lists.length - 1; i >= 0; --i) {
        makeList(lists[i])
    }
    moment.normalizeUnits = function(units) {
        return normalizeUnits(units)
    };
    moment.invalid = function(flags) {
        var m = moment.utc(NaN);
        if (flags != null) {
            extend(m._pf, flags)
        } else {
            m._pf.userInvalidated = true
        }
        return m
    };
    moment.parseZone = function() {
        return moment.apply(null, arguments).parseZone()
    };
    moment.parseTwoDigitYear = function(input) {
        return toInt(input) + (toInt(input) > 68 ? 1900 : 2e3)
    };
    moment.isDate = isDate;
    extend(moment.fn = Moment.prototype, {
        clone: function() {
            return moment(this)
        },
        valueOf: function() {
            return +this._d - (this._offset || 0) * 6e4
        },
        unix: function() {
            return Math.floor(+this / 1e3)
        },
        toString: function() {
            return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")
        },
        toDate: function() {
            return this._offset ? new Date((+this)) : this._d
        },
        toISOString: function() {
            var m = moment(this).utc();
            if (0 < m.year() && m.year() <= 9999) {
                if ("function" === typeof Date.prototype.toISOString) {
                    return this.toDate().toISOString()
                } else {
                    return formatMoment(m, "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]")
                }
            } else {
                return formatMoment(m, "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]")
            }
        },
        toArray: function() {
            var m = this;
            return [m.year(), m.month(), m.date(), m.hours(), m.minutes(), m.seconds(), m.milliseconds()]
        },
        isValid: function() {
            return isValid(this)
        },
        isDSTShifted: function() {
            if (this._a) {
                return this.isValid() && compareArrays(this._a, (this._isUTC ? moment.utc(this._a) : moment(this._a)).toArray()) > 0
            }
            return false
        },
        parsingFlags: function() {
            return extend({}, this._pf)
        },
        invalidAt: function() {
            return this._pf.overflow
        },
        utc: function(keepLocalTime) {
            return this.utcOffset(0, keepLocalTime)
        },
        local: function(keepLocalTime) {
            if (this._isUTC) {
                this.utcOffset(0, keepLocalTime);
                this._isUTC = false;
                if (keepLocalTime) {
                    this.subtract(this._dateUtcOffset(), "m")
                }
            }
            return this
        },
        format: function(inputString) {
            var output = formatMoment(this, inputString || moment.defaultFormat);
            return this.localeData().postformat(output)
        },
        add: createAdder(1, "add"),
        subtract: createAdder(-1, "subtract"),
        diff: function(input, units, asFloat) {
            var that = makeAs(input, this),
                zoneDiff = (that.utcOffset() - this.utcOffset()) * 6e4,
                anchor, diff, output, daysAdjust;
            units = normalizeUnits(units);
            if (units === "year" || units === "month" || units === "quarter") {
                output = monthDiff(this, that);
                if (units === "quarter") {
                    output = output / 3
                } else if (units === "year") {
                    output = output / 12
                }
            } else {
                diff = this - that;
                output = units === "second" ? diff / 1e3 : units === "minute" ? diff / 6e4 : units === "hour" ? diff / 36e5 : units === "day" ? (diff - zoneDiff) / 864e5 : units === "week" ? (diff - zoneDiff) / 6048e5 : diff
            }
            return asFloat ? output : absRound(output)
        },
        from: function(time, withoutSuffix) {
            return moment.duration({
                to: this,
                from: time
            }).locale(this.locale()).humanize(!withoutSuffix)
        },
        fromNow: function(withoutSuffix) {
            return this.from(moment(), withoutSuffix)
        },
        calendar: function(time) {
            var now = time || moment(),
                sod = makeAs(now, this).startOf("day"),
                diff = this.diff(sod, "days", true),
                format = diff < -6 ? "sameElse" : diff < -1 ? "lastWeek" : diff < 0 ? "lastDay" : diff < 1 ? "sameDay" : diff < 2 ? "nextDay" : diff < 7 ? "nextWeek" : "sameElse";
            return this.format(this.localeData().calendar(format, this, moment(now)))
        },
        isLeapYear: function() {
            return isLeapYear(this.year())
        },
        isDST: function() {
            return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset()
        },
        day: function(input) {
            var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
            if (input != null) {
                input = parseWeekday(input, this.localeData());
                return this.add(input - day, "d")
            } else {
                return day
            }
        },
        month: makeAccessor("Month", true),
        startOf: function(units) {
            units = normalizeUnits(units);
            switch (units) {
                case "year":
                    this.month(0);
                case "quarter":
                case "month":
                    this.date(1);
                case "week":
                case "isoWeek":
                case "day":
                    this.hours(0);
                case "hour":
                    this.minutes(0);
                case "minute":
                    this.seconds(0);
                case "second":
                    this.milliseconds(0)
            }
            if (units === "week") {
                this.weekday(0)
            } else if (units === "isoWeek") {
                this.isoWeekday(1)
            }
            if (units === "quarter") {
                this.month(Math.floor(this.month() / 3) * 3)
            }
            return this
        },
        endOf: function(units) {
            units = normalizeUnits(units);
            if (units === undefined || units === "millisecond") {
                return this
            }
            return this.startOf(units).add(1, units === "isoWeek" ? "week" : units).subtract(1, "ms")
        },
        isAfter: function(input, units) {
            var inputMs;
            units = normalizeUnits(typeof units !== "undefined" ? units : "millisecond");
            if (units === "millisecond") {
                input = moment.isMoment(input) ? input : moment(input);
                return +this > +input
            } else {
                inputMs = moment.isMoment(input) ? +input : +moment(input);
                return inputMs < +this.clone().startOf(units)
            }
        },
        isBefore: function(input, units) {
            var inputMs;
            units = normalizeUnits(typeof units !== "undefined" ? units : "millisecond");
            if (units === "millisecond") {
                input = moment.isMoment(input) ? input : moment(input);
                return +this < +input
            } else {
                inputMs = moment.isMoment(input) ? +input : +moment(input);
                return +this.clone().endOf(units) < inputMs
            }
        },
        isBetween: function(from, to, units) {
            return this.isAfter(from, units) && this.isBefore(to, units)
        },
        isSame: function(input, units) {
            var inputMs;
            units = normalizeUnits(units || "millisecond");
            if (units === "millisecond") {
                input = moment.isMoment(input) ? input : moment(input);
                return +this === +input
            } else {
                inputMs = +moment(input);
                return +this.clone().startOf(units) <= inputMs && inputMs <= +this.clone().endOf(units)
            }
        },
        min: deprecate("moment().min is deprecated, use moment.min instead. https://github.com/moment/moment/issues/1548", function(other) {
            other = moment.apply(null, arguments);
            return other < this ? this : other
        }),
        max: deprecate("moment().max is deprecated, use moment.max instead. https://github.com/moment/moment/issues/1548", function(other) {
            other = moment.apply(null, arguments);
            return other > this ? this : other
        }),
        zone: deprecate("moment().zone is deprecated, use moment().utcOffset instead. " + "https://github.com/moment/moment/issues/1779", function(input, keepLocalTime) {
            if (input != null) {
                if (typeof input !== "string") {
                    input = -input
                }
                this.utcOffset(input, keepLocalTime);
                return this
            } else {
                return -this.utcOffset()
            }
        }),
        utcOffset: function(input, keepLocalTime) {
            var offset = this._offset || 0,
                localAdjust;
            if (input != null) {
                if (typeof input === "string") {
                    input = utcOffsetFromString(input)
                }
                if (Math.abs(input) < 16) {
                    input = input * 60
                }
                if (!this._isUTC && keepLocalTime) {
                    localAdjust = this._dateUtcOffset()
                }
                this._offset = input;
                this._isUTC = true;
                if (localAdjust != null) {
                    this.add(localAdjust, "m")
                }
                if (offset !== input) {
                    if (!keepLocalTime || this._changeInProgress) {
                        addOrSubtractDurationFromMoment(this, moment.duration(input - offset, "m"), 1, false)
                    } else if (!this._changeInProgress) {
                        this._changeInProgress = true;
                        moment.updateOffset(this, true);
                        this._changeInProgress = null
                    }
                }
                return this
            } else {
                return this._isUTC ? offset : this._dateUtcOffset()
            }
        },
        isLocal: function() {
            return !this._isUTC
        },
        isUtcOffset: function() {
            return this._isUTC
        },
        isUtc: function() {
            return this._isUTC && this._offset === 0
        },
        zoneAbbr: function() {
            return this._isUTC ? "UTC" : ""
        },
        zoneName: function() {
            return this._isUTC ? "Coordinated Universal Time" : ""
        },
        parseZone: function() {
            if (this._tzm) {
                this.utcOffset(this._tzm)
            } else if (typeof this._i === "string") {
                this.utcOffset(utcOffsetFromString(this._i))
            }
            return this
        },
        hasAlignedHourOffset: function(input) {
            if (!input) {
                input = 0
            } else {
                input = moment(input).utcOffset()
            }
            return (this.utcOffset() - input) % 60 === 0
        },
        daysInMonth: function() {
            return daysInMonth(this.year(), this.month())
        },
        dayOfYear: function(input) {
            var dayOfYear = round((moment(this).startOf("day") - moment(this).startOf("year")) / 864e5) + 1;
            return input == null ? dayOfYear : this.add(input - dayOfYear, "d")
        },
        quarter: function(input) {
            return input == null ? Math.ceil((this.month() + 1) / 3) : this.month((input - 1) * 3 + this.month() % 3)
        },
        weekYear: function(input) {
            var year = weekOfYear(this, this.localeData()._week.dow, this.localeData()._week.doy).year;
            return input == null ? year : this.add(input - year, "y")
        },
        isoWeekYear: function(input) {
            var year = weekOfYear(this, 1, 4).year;
            return input == null ? year : this.add(input - year, "y")
        },
        week: function(input) {
            var week = this.localeData().week(this);
            return input == null ? week : this.add((input - week) * 7, "d")
        },
        isoWeek: function(input) {
            var week = weekOfYear(this, 1, 4).week;
            return input == null ? week : this.add((input - week) * 7, "d")
        },
        weekday: function(input) {
            var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
            return input == null ? weekday : this.add(input - weekday, "d")
        },
        isoWeekday: function(input) {
            return input == null ? this.day() || 7 : this.day(this.day() % 7 ? input : input - 7)
        },
        isoWeeksInYear: function() {
            return weeksInYear(this.year(), 1, 4)
        },
        weeksInYear: function() {
            var weekInfo = this.localeData()._week;
            return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy)
        },
        get: function(units) {
            units = normalizeUnits(units);
            return this[units]()
        },
        set: function(units, value) {
            var unit;
            if (typeof units === "object") {
                for (unit in units) {
                    this.set(unit, units[unit])
                }
            } else {
                units = normalizeUnits(units);
                if (typeof this[units] === "function") {
                    this[units](value)
                }
            }
            return this
        },
        locale: function(key) {
            var newLocaleData;
            if (key === undefined) {
                return this._locale._abbr
            } else {
                newLocaleData = moment.localeData(key);
                if (newLocaleData != null) {
                    this._locale = newLocaleData
                }
                return this
            }
        },
        lang: deprecate("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.", function(key) {
            if (key === undefined) {
                return this.localeData()
            } else {
                return this.locale(key)
            }
        }),
        localeData: function() {
            return this._locale
        },
        _dateUtcOffset: function() {
            return -Math.round(this._d.getTimezoneOffset() / 15) * 15
        }
    });

    function rawMonthSetter(mom, value) {
        var dayOfMonth;
        if (typeof value === "string") {
            value = mom.localeData().monthsParse(value);
            if (typeof value !== "number") {
                return mom
            }
        }
        dayOfMonth = Math.min(mom.date(), daysInMonth(mom.year(), value));
        mom._d["set" + (mom._isUTC ? "UTC" : "") + "Month"](value, dayOfMonth);
        return mom
    }

    function rawGetter(mom, unit) {
        return mom._d["get" + (mom._isUTC ? "UTC" : "") + unit]()
    }

    function rawSetter(mom, unit, value) {
        if (unit === "Month") {
            return rawMonthSetter(mom, value)
        } else {
            return mom._d["set" + (mom._isUTC ? "UTC" : "") + unit](value)
        }
    }

    function makeAccessor(unit, keepTime) {
        return function(value) {
            if (value != null) {
                rawSetter(this, unit, value);
                moment.updateOffset(this, keepTime);
                return this
            } else {
                return rawGetter(this, unit)
            }
        }
    }
    moment.fn.millisecond = moment.fn.milliseconds = makeAccessor("Milliseconds", false);
    moment.fn.second = moment.fn.seconds = makeAccessor("Seconds", false);
    moment.fn.minute = moment.fn.minutes = makeAccessor("Minutes", false);
    moment.fn.hour = moment.fn.hours = makeAccessor("Hours", true);
    moment.fn.date = makeAccessor("Date", true);
    moment.fn.dates = deprecate("dates accessor is deprecated. Use date instead.", makeAccessor("Date", true));
    moment.fn.year = makeAccessor("FullYear", true);
    moment.fn.years = deprecate("years accessor is deprecated. Use year instead.", makeAccessor("FullYear", true));
    moment.fn.days = moment.fn.day;
    moment.fn.months = moment.fn.month;
    moment.fn.weeks = moment.fn.week;
    moment.fn.isoWeeks = moment.fn.isoWeek;
    moment.fn.quarters = moment.fn.quarter;
    moment.fn.toJSON = moment.fn.toISOString;
    moment.fn.isUTC = moment.fn.isUtc;

    function daysToYears(days) {
        return days * 400 / 146097
    }

    function yearsToDays(years) {
        return years * 146097 / 400
    }
    extend(moment.duration.fn = Duration.prototype, {
        _bubble: function() {
            var milliseconds = this._milliseconds,
                days = this._days,
                months = this._months,
                data = this._data,
                seconds, minutes, hours, years = 0;
            data.milliseconds = milliseconds % 1e3;
            seconds = absRound(milliseconds / 1e3);
            data.seconds = seconds % 60;
            minutes = absRound(seconds / 60);
            data.minutes = minutes % 60;
            hours = absRound(minutes / 60);
            data.hours = hours % 24;
            days += absRound(hours / 24);
            years = absRound(daysToYears(days));
            days -= absRound(yearsToDays(years));
            months += absRound(days / 30);
            days %= 30;
            years += absRound(months / 12);
            months %= 12;
            data.days = days;
            data.months = months;
            data.years = years
        },
        abs: function() {
            this._milliseconds = Math.abs(this._milliseconds);
            this._days = Math.abs(this._days);
            this._months = Math.abs(this._months);
            this._data.milliseconds = Math.abs(this._data.milliseconds);
            this._data.seconds = Math.abs(this._data.seconds);
            this._data.minutes = Math.abs(this._data.minutes);
            this._data.hours = Math.abs(this._data.hours);
            this._data.months = Math.abs(this._data.months);
            this._data.years = Math.abs(this._data.years);
            return this
        },
        weeks: function() {
            return absRound(this.days() / 7)
        },
        valueOf: function() {
            return this._milliseconds + this._days * 864e5 + this._months % 12 * 2592e6 + toInt(this._months / 12) * 31536e6
        },
        humanize: function(withSuffix) {
            var output = relativeTime(this, !withSuffix, this.localeData());
            if (withSuffix) {
                output = this.localeData().pastFuture(+this, output)
            }
            return this.localeData().postformat(output)
        },
        add: function(input, val) {
            var dur = moment.duration(input, val);
            this._milliseconds += dur._milliseconds;
            this._days += dur._days;
            this._months += dur._months;
            this._bubble();
            return this
        },
        subtract: function(input, val) {
            var dur = moment.duration(input, val);
            this._milliseconds -= dur._milliseconds;
            this._days -= dur._days;
            this._months -= dur._months;
            this._bubble();
            return this
        },
        get: function(units) {
            units = normalizeUnits(units);
            return this[units.toLowerCase() + "s"]()
        },
        as: function(units) {
            var days, months;
            units = normalizeUnits(units);
            if (units === "month" || units === "year") {
                days = this._days + this._milliseconds / 864e5;
                months = this._months + daysToYears(days) * 12;
                return units === "month" ? months : months / 12
            } else {
                days = this._days + Math.round(yearsToDays(this._months / 12));
                switch (units) {
                    case "week":
                        return days / 7 + this._milliseconds / 6048e5;
                    case "day":
                        return days + this._milliseconds / 864e5;
                    case "hour":
                        return days * 24 + this._milliseconds / 36e5;
                    case "minute":
                        return days * 24 * 60 + this._milliseconds / 6e4;
                    case "second":
                        return days * 24 * 60 * 60 + this._milliseconds / 1e3;
                    case "millisecond":
                        return Math.floor(days * 24 * 60 * 60 * 1e3) + this._milliseconds;
                    default:
                        throw new Error("Unknown unit " + units)
                }
            }
        },
        lang: moment.fn.lang,
        locale: moment.fn.locale,
        toIsoString: deprecate("toIsoString() is deprecated. Please use toISOString() instead " + "(notice the capitals)", function() {
            return this.toISOString()
        }),
        toISOString: function() {
            var years = Math.abs(this.years()),
                months = Math.abs(this.months()),
                days = Math.abs(this.days()),
                hours = Math.abs(this.hours()),
                minutes = Math.abs(this.minutes()),
                seconds = Math.abs(this.seconds() + this.milliseconds() / 1e3);
            if (!this.asSeconds()) {
                return "P0D"
            }
            return (this.asSeconds() < 0 ? "-" : "") + "P" + (years ? years + "Y" : "") + (months ? months + "M" : "") + (days ? days + "D" : "") + (hours || minutes || seconds ? "T" : "") + (hours ? hours + "H" : "") + (minutes ? minutes + "M" : "") + (seconds ? seconds + "S" : "")
        },
        localeData: function() {
            return this._locale
        },
        toJSON: function() {
            return this.toISOString()
        }
    });
    moment.duration.fn.toString = moment.duration.fn.toISOString;

    function makeDurationGetter(name) {
        moment.duration.fn[name] = function() {
            return this._data[name]
        }
    }
    for (i in unitMillisecondFactors) {
        if (hasOwnProp(unitMillisecondFactors, i)) {
            makeDurationGetter(i.toLowerCase())
        }
    }
    moment.duration.fn.asMilliseconds = function() {
        return this.as("ms")
    };
    moment.duration.fn.asSeconds = function() {
        return this.as("s")
    };
    moment.duration.fn.asMinutes = function() {
        return this.as("m")
    };
    moment.duration.fn.asHours = function() {
        return this.as("h")
    };
    moment.duration.fn.asDays = function() {
        return this.as("d")
    };
    moment.duration.fn.asWeeks = function() {
        return this.as("weeks")
    };
    moment.duration.fn.asMonths = function() {
        return this.as("M")
    };
    moment.duration.fn.asYears = function() {
        return this.as("y")
    };
    moment.locale("en", {
        ordinalParse: /\d{1,2}(th|st|nd|rd)/,
        ordinal: function(number) {
            var b = number % 10,
                output = toInt(number % 100 / 10) === 1 ? "th" : b === 1 ? "st" : b === 2 ? "nd" : b === 3 ? "rd" : "th";
            return number + output
        }
    });

    function makeGlobal(shouldDeprecate) {
        if (typeof ender !== "undefined") {
            return
        }
        oldGlobalMoment = globalScope.moment;
        if (shouldDeprecate) {
            globalScope.moment = deprecate("Accessing Moment through the global scope is " + "deprecated, and will be removed in an upcoming " + "release.", moment)
        } else {
            globalScope.moment = moment
        }
    }
    if (hasModule) {
        module.exports = moment
    } else if (typeof define === "function" && define.amd) {
        define(function(require, exports, module) {
            if (module.config && module.config() && module.config().noGlobal === true) {
                globalScope.moment = oldGlobalMoment
            }
            return moment
        });
        makeGlobal(true)
    } else {
        makeGlobal()
    }
}).call(this);
kony.sdk.mvvm.sync = kony.sdk.mvvm.sync || {};
kony.sdk.mvvm.syncAppID = "";
kony.sdk.mvvm.syncServerUrl = "";
kony.sdk.mvvm.syncServerHost = "";
kony.sdk.mvvm.syncServerPort = "";
kony.sdk.mvvm.syncUserID = "syncadmin";
kony.sdk.mvvm.syncPwd = "SyncAdmin123";
kony.sdk.mvvm.syncBatchSize = "500";
kony.sdk.mvvm.syncConfigKey = "syncConfig";
kony.sdk.mvvm.syncAppIDKey = "syncAppID";
kony.sdk.mvvm.syncAuthTokenKey = "sync_auth_token";
kony.sdk.mvvm.syncServerUrlKey = "syncServerUrl";
kony.sdk.mvvm.syncAuthEnabledKey = "syncAuthEnabled";
kony.sdk.mvvm.syncServerHostKey = "syncServerHost";
kony.sdk.mvvm.syncServerPortKey = "syncServerPort";
kony.sdk.mvvm.syncSessionToken = "";
kony.sdk.mvvm.syncAuthToken = "";
kony.sdk.mvvm.syncTenant = "";
kony.sdk.mvvm.syncAuthEnabled = false;
kony.sdk.mvvm.gblLimitForListView = 20;
kony.sdk.mvvm.syncFetchRelatedEntitiesErrorCode = 10010;
kony.sdk.mvvm.syncFetchRelatedEntitiesErrorMessage = "Error fetching related entities";
kony.sdk.mvvm.syncCfgTable = "AFN_syncfg";
kony.sdk.mvvm.syncCfgColumnID = "id";
kony.sdk.mvvm.syncCfgColumnJson = "metainfo";
kony.sdk.mvvm.credStoreUsername = "username";
kony.sdk.mvvm.credStorePassword = "password";
kony.sdk.mvvm.credStoreOptions = "options";
kony.sdk.mvvm.credStoreAppType = "APPTYPE";
kony.sdk.mvvm.credStoreIdentityService = "identityServiceName";
kony.sdk.mvvm.credStoreHostName = "hostName";
kony.sdk.mvvm.credStoreSecretKey = "key";
kony.sdk.mvvm.credStoreDb = "db";
kony.sdk.mvvm.credStoreTenant = "tenant";
kony.sdk.mvvm.credStoreName = "credentials";
kony.sdk.mvvm.credStoreAuthProfile = "authprofile";
kony.sdk.mvvm.credStoreSyncCount = "syncCount";
kony.sdk.mvvm.credStoreConnectToUpgradedVersion = "connecttoupgradedversion";
kony.sdk.mvvm.appInstanceStore = "AFN_FRIENDLY_NAME";
kony.sdk.mvvm.instanceId = "instance_id";
kony.sdk.mvvm.friendlyName = "friendly_name";
kony.sdk.mvvm.environment = "env";
kony.sdk.mvvm.batchtimeout = -1;
kony.sdk.mvvm.batchuploadrequestlimit = -1;
kony.sdk.mvvm.batchdownloadrequestlimit = -1;
kony.sdk.mvvm.sync.numberofretryattempts = -1;
kony.sdk.mvvm.sync.retrywaittime = -1;
kony.sdk.mvvm.sync.networktimeout = -1;
kony = kony || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sync = kony.sync || {};
kony.sdk.mvvm.fetchSyncUIConfiguration = function(sessionToken, syncFetchSuccess, syncFetchError) {
    var dbName = kony.sdk.mvvm.getDbName();
    var entityQuery = "select * from EntityConfiguration";
    var uiconfig = [];
    kony.sync.single_select_execute(dbName, entityQuery, null, syncFetchEntityConfigSuccess, syncFetchEntityConfigError);

    function syncFetchEntityConfigSuccess(entityconfigresponse) {
        for (var i in entityconfigresponse) {
            var entityJson = {};
            var entityObject = entityconfigresponse[i];
            var entityId = entityObject["id"];
            entityJson["childRelationshipList"] = [];
            entityJson["columns"] = [];
            entityJson["custom"] = entityObject["custom"];
            entityJson["description"] = entityObject["description"];
            entityJson["entityType"] = entityObject["type"];
            entityJson["entityTypeID"] = entityObject["id"];
            entityJson["label"] = entityObject["label"];
            entityJson["name"] = entityObject["name"];
            entityJson["operationType"] = entityObject["operationType"];
            entityJson["primaryFieldDatatype"] = entityObject["pfFieldType"];
            entityJson["primaryFieldName"] = entityObject["pfFieldName"];
            entityJson["primaryKeyDatatype"] = entityObject["pkType"];
            entityJson["primaryKeyName"] = entityObject["pkName"];
            entityJson["sourceEntityName"] = entityObject["sourceEntity"];
            entityJson["updateable"] = entityObject["updateable"];
            var templates = [];
            var pageTemplateQuery = "select * from PageConfiguration where entityId = '" + entityId + "'";
            kony.sync.single_select_execute(dbName, pageTemplateQuery, null, syncFetchTemplateSuccess, syncFetchTemplateError);

            function syncFetchTemplateSuccess(templateconfigresponse) {
                for (var j in templateconfigresponse) {
                    var templateJson = {};
                    var templateObject = templateconfigresponse[j];
                    var templateId = templateObject["templateId"];
                    templateJson["applySortable"] = templateObject["sortable"];
                    templateJson["id"] = templateObject["id"];
                    templateJson["name"] = templateObject["name"];
                    templateJson["entityPageTemplateId"] = templateObject["templateId"];
                    templateJson["properties"] = [];
                    templateJson["relations"] = [];
                    templateJson["selectedRelations"] = [];
                    var fields = [];
                    var uiFieldsQuery = "select * from FieldConfiguration where entityId = '" + entityId + "' and pageTemplateId = '" + templateId + "'";
                    kony.sync.single_select_execute(dbName, uiFieldsQuery, null, syncFetchFieldSuccess, syncFetchFieldError);

                    function syncFetchFieldSuccess(fieldconfigresponse) {
                        for (var k in fieldconfigresponse) {
                            var fieldJson = {};
                            var fieldObject = fieldconfigresponse[k];
                            fieldJson["fieldMappingId"] = fieldObject["id"];
                            fieldJson["auditColumn"] = fieldObject["auditColumn"];
                            fieldJson["custom"] = fieldObject["custom"];
                            fieldJson["datatype"] = fieldObject["datatype"];
                            fieldJson["defaultValue"] = fieldObject["defaultValue"];
                            fieldJson["description"] = fieldObject["description"];
                            fieldJson["entityPageTemplateId"] = fieldObject["pageTemplateId"];
                            fieldJson["foreignKeyColumn"] = fieldObject["fkColumn"];
                            fieldJson["foreignKeyRefTable"] = fieldObject["fkRefTable"];
                            fieldJson["hasIndex"] = fieldObject["hasIndex"];
                            fieldJson["hasTranslation"] = fieldObject["hasTranslation"];
                            fieldJson["metadata"] = fieldObject["metadata"];
                            fieldJson["name"] = fieldObject["name"];
                            fieldJson["nullable"] = fieldObject["nullable"];
                            fieldJson["nameField"] = fieldObject["nameField"];
                            fieldJson["primaryKey"] = fieldObject["isPrimaryKey"];
                            fieldJson["operationType"] = fieldObject["operationType"];
                            fieldJson["sourceFieldName"] = fieldObject["sourceFieldName"];
                            fieldJson["table"] = fieldObject["tableName"];
                            fieldJson["uiSequence"] = fieldObject["sequence"];
                            fieldJson["unique"] = fieldObject["isUnique"];
                            fieldJson["properties"] = [];
                            fields.push(fieldJson)
                        }
                        templateJson["uiFields"] = fields
                    }
                    templates.push(templateJson)
                }
                entityJson["pageTemplates"] = templates
            }
            uiconfig.push(entityJson)
        }
    }
    if (typeof syncFetchSuccess == "function") {
        syncFetchSuccess(uiconfig)
    }
};
kony.sdk.mvvm.genericSyncError = function(syncerror, errorCode, errorMessage, errorCallback) {
    kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
    if (syncerror != null && syncerror["errorMessage"] != null) {
        errorMessage = errorMessage + syncerror["errorMessage"]
    }
    var err = {};
    err["errorCode"] = errorCode;
    err["errorMsg"] = errorMessage;
    if (typeof errorCallback == "function") {
        errorCallback(err)
    }
};
kony.sdk.mvvm.getDbName = function() {
    if (konysyncClientSyncConfig && konysyncClientSyncConfig !== "" && JSON.stringify(konysyncClientSyncConfig) !== "{}") return kony.sync.getDBName();
    else {
        kony.sdk.mvvm.log.warn("Initializing Db name from cred store");
        var credStore = kony.store.getItem(kony.sdk.mvvm.credStoreName);
        if (credStore && credStore[kony.sdk.mvvm.credStoreDb]) {
            return credStore[kony.sdk.mvvm.credStoreDb]
        } else {
            kony.sdk.mvvm.log.error("Could not retrieve DB name from cred store");
            var error = new kony.sdk.mvvm.Exception(kony.sdk.mvvm.ExceptionCode.CD_ERROR_OFFLINE_LOGIN_FAILURE, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_OFFLINE_LOGIN_FAILURE);
            throw error
        }
    }
};
kony.sdk.mvvm.getClientConfigFromSaasServer = function(syncSessionToken, syncTenant, appVersion, successcallback, errorcallback) {
    var headers = {
        Accept: "application/json",
        session_token: syncSessionToken,
        app_version: appVersion
    };
    if (!kony.sdk.mvvm.constants["ISCLOUD"]) {
        headers["tenant"] = syncTenant
    }
    kony.sdk.mvvm.theAjaxProvider.get(kony.sdk.mvvm.constants.SYNC_ENDPOINT, kony.sdk.mvvm.constants.HTTP_METHOD_GET, headers, successcallback, errorcallback, null)
};
kony.sdk.mvvm.getKey = function(key) {
    return kony.crypto.readKey(key)
};
kony.sdk.mvvm.generateAndSaveKey = function(password) {
    var encryptDecryptKey = kony.crypto.newKey("passphrase", 128, {
        passphrasetext: [password],
        subalgo: "aes",
        passphrasehashalgo: "md5"
    });
    var key = kony.crypto.saveKey("AFN", encryptDecryptKey);
    return key
};
kony.sdk.mvvm.encryptData = function(key, plainstring) {
    var prptobj = {
        padding: "pkcs5",
        mode: "cbc",
        initializationvector: "1234567890123456"
    };
    return kony.crypto.encrypt("aes", kony.sdk.mvvm.getKey(key), plainstring, prptobj)
};
kony.sdk.mvvm.decryptData = function(key, encryptedstring) {
    var prptobj = {
        padding: "pkcs5",
        mode: "cbc",
        initializationvector: "1234567890123456"
    };
    return kony.crypto.decrypt("aes", kony.sdk.mvvm.getKey(key), encryptedstring, prptobj)
};
kony.sdk.mvvm.resetSyncCount = function() {
    var storedCredStore = kony.store.getItem(kony.sdk.mvvm.credStoreName);
    if (storedCredStore) {
        storedCredStore[kony.sdk.mvvm.credStoreSyncCount] = 0;
        kony.store.setItem(kony.sdk.mvvm.credStoreName, storedCredStore)
    }
};
kony.sdk.mvvm.incrementSyncCount = function() {
    var storedCredStore = kony.store.getItem(kony.sdk.mvvm.credStoreName);
    var syncCount = 1;
    if (storedCredStore) {
        if (storedCredStore[kony.sdk.mvvm.credStoreSyncCount] !== undefined) {
            syncCount = storedCredStore[kony.sdk.mvvm.credStoreSyncCount];
            if (syncCount !== undefined) syncCount += 1
        }
        storedCredStore[kony.sdk.mvvm.credStoreSyncCount] = syncCount;
        kony.sdk.mvvm.log.info("Current sync count is " + syncCount);
        kony.store.setItem(kony.sdk.mvvm.credStoreName, storedCredStore)
    }
};
kony = kony || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.log = kony.sdk.mvvm.log || {};
kony.sdk.mvvm.sync = kony.sdk.mvvm.sync || {};
kony.sdk.mvvm.syncStartTS = "";
kony.sdk.mvvm.showSyncLoadingScreen = function(text) {
    kony.sdk.mvvm.KonyApplicationContext.showSyncLoadingScreen(text)
};
kony.sdk.mvvm.dismissSyncLoadingScreen = function() {
    kony.sdk.mvvm.KonyApplicationContext.dismissSyncLoadingScreen()
};
kony.sdk.mvvm.initSyncSession = function(initSuccessCallback, initErrorCallback) {
    syncResponse = {};
    kony.sdk.mvvm.log.info("init Sync Session Started");
    kony.sdk.mvvm.syncStartTS = new Date;
    kony.sdk.mvvm.showSyncLoadingScreen("Initializing Sync");
    if (kony.sdk.mvvm.APPLOGINDETAILS["syncoption"] === "rollbackAfterLogin") {
        sync.init(initSuccessCallback, initErrorCallback);
        return
    }
    kony.sdk.mvvm.incrementSyncCount();
    if (kony.sdk.mvvm.isNetworkAvailabile()) {
        kony.sdk.mvvm.downloadSyncClientArtifacts(downloadSyncClientSuccess, downloadSyncClientError)
    } else {
        var networkUnavailableError = new kony.sdk.mvvm.Exception(kony.sdk.mvvm.ExceptionCode.CD_ERROR_NETWORK_UNAVAILABLE, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_NETWORK_UNAVAILABLE);
        downloadSyncClientError(networkUnavailableError)
    }

    function downloadSyncClientSuccess(response) {
        if (response != null) {
            if (response["konysyncClientSyncConfig"]) {
                kony.sdk.mvvm.log.info("Got the complete meta info from the server");
                konysyncClientSyncConfig = response["konysyncClientSyncConfig"];
                kony.sdk.mvvm.log.debug("Creating a table to insert sync meta data information");
                var sqltable = "create table if not exists " + kony.sdk.mvvm.syncCfgTable + " ( id integer PRIMARY_KEY, " + kony.sdk.mvvm.syncCfgColumnJson + " nvarchar(300000))";
                kony.sync.single_execute_sql(kony.sdk.mvvm.getDbName(), sqltable, null, createTableOnSuccess, createTableOnError);

                function createTableOnSuccess(response) {
                    if (konysyncClientSyncConfig) {
                        kony.sdk.mvvm.log.debug("inserting sync meta data into " + kony.sdk.mvvm.syncCfgTable);
                        var settable = [];
                        settable[kony.sdk.mvvm.syncCfgColumnID] = 1;
                        settable[kony.sdk.mvvm.syncCfgColumnJson] = JSON.stringify(konysyncClientSyncConfig);
                        var query = kony.sync.qb_createQuery();
                        kony.sync.qb_set(query, settable);
                        kony.sync.qb_insert(query, kony.sdk.mvvm.syncCfgTable);
                        var query_compile = kony.sync.qb_compile(query);
                        var sqlinsert = query_compile[0];
                        var params = query_compile[1];
                        kony.sync.single_execute_sql(kony.sdk.mvvm.getDbName(), sqlinsert, params, onInsertSuccess, onInsertFailure)
                    }
                }

                function createTableOnError(response) {
                    kony.sdk.mvvm.log.error("Error while creating sync config table due to ", response)
                }

                function onInsertFailure() {
                    startSync()
                }

                function onInsertSuccess() {
                    startSync()
                }
            } else {
                kony.sdk.mvvm.log.info("Sync meta info is not present in response so restoring the info from DB");
                kony.sdk.mvvm.initializeSyncVariables(startSync)
            }

            function startSync() {
                if (response["konysyncSQLLiteDDLCommands"]) {
                    var ddlCommandsArray = response["konysyncSQLLiteDDLCommands"];
                    for (var i = 0; i < ddlCommandsArray.length; i++) {
                        if (ddlCommandsArray[i] != null) konysyncSQLLiteDDLCommands[i] = ddlCommandsArray[i]
                    }
                }
                if (response[kony.sdk.mvvm.syncAuthEnabledKey] != undefined && response[kony.sdk.mvvm.syncAuthEnabledKey] != null) {
                    kony.sdk.mvvm.syncAuthEnabled = response[kony.sdk.mvvm.syncAuthEnabledKey]
                }
                if (kony.sdk.mvvm.syncAuthEnabled) {
                    if (response[kony.sdk.mvvm.syncServerUrlKey] != null) {
                        kony.sdk.mvvm.syncServerUrl = response[kony.sdk.mvvm.syncServerUrlKey]
                    }
                    if (response[kony.sdk.mvvm.syncAuthTokenKey] != null) {
                        kony.sdk.mvvm.syncAuthToken = response[kony.sdk.mvvm.syncAuthTokenKey]
                    }
                } else {
                    if (response[kony.sdk.mvvm.syncServerHostKey] != null) {
                        kony.sdk.mvvm.syncServerHost = response[kony.sdk.mvvm.syncServerHostKey]
                    }
                    if (response[kony.sdk.mvvm.syncServerPortKey] != null) {
                        kony.sdk.mvvm.syncServerPort = response[kony.sdk.mvvm.syncServerPortKey]
                    }
                }
                if (response[kony.sdk.mvvm.syncAppIDKey]) {
                    kony.sdk.mvvm.syncAppID = response[kony.sdk.mvvm.syncAppIDKey];
                    var credStore = kony.store.getItem(kony.sdk.mvvm.credStoreName);
                    if (credStore !== null && credStore !== undefined) {
                        credStore[kony.sdk.mvvm.credStoreDb] = kony.sdk.mvvm.syncAppID;
                        kony.store.setItem(kony.sdk.mvvm.credStoreName, credStore)
                    }
                }
                kony.sync.queryStore = [];
                sync.init(initSuccessCallback, initErrorCallback)
            }
        }
    }

    function downloadSyncClientError(error) {
        var exception;
        if (error !== undefined && error !== null && error instanceof kony.sdk.mvvm.Exception) {
            exception = new kony.sdk.mvvm.Exception(error.code, error.message, error)
        } else {
            exception = new kony.sdk.mvvm.Exception(kony.sdk.mvvm.ExceptionCode.CD_ERROR_UNABLE_TO_GET_SYNC_CONFIG, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_UNABLE_TO_GET_SYNC_CONFIG)
        }
        kony.sdk.mvvm.log.error("Error response from saas : ", error);
        kony.sdk.mvvm.dismissSyncLoadingScreen();
        if (typeof initErrorCallback === "function") initErrorCallback(exception)
    }
};
kony.sdk.mvvm.onsyncstartCallback = function(outputparams) {
    kony.sdk.mvvm.showSyncLoadingScreen("Sync Started")
};
kony.sdk.mvvm.onsyncsuccessCallback = function() {
    kony.sdk.mvvm.log.info("Sync Success");
    kony.sdk.mvvm.dismissSyncLoadingScreen()
};
kony.sdk.mvvm.onsyncerrorCallback = function() {
    kony.sdk.mvvm.log.error("Sync Error");
    kony.sdk.mvvm.dismissSyncLoadingScreen()
};
kony.sdk.mvvm.onuploadstartCallback = function(outputparams) {
    kony.sdk.mvvm.log.info("onUploadStartCallback called.");
    kony.sdk.mvvm.showSyncLoadingScreen("Upload Started");
    var req = outputparams.uploadRequest;
    if (req.clientcontext === undefined) {
        req.clientcontext = {}
    }
    req.clientcontext.session_token = kony.sdk.mvvm.syncSessionToken;
    req.clientcontext.tenant = kony.sdk.mvvm.syncTenant;
    if (kony.sdk.mvvm.batchtimeout !== -1) req.clientcontext.BATCH_TIMEOUT = kony.sdk.mvvm.batchtimeout;
    if (kony.sdk.mvvm.batchuploadrequestlimit !== -1) req.clientcontext.BATCH_SERVICE_COUNT_LIMIT = kony.sdk.mvvm.batchuploadrequestlimit;
    return req
};
kony.sdk.mvvm.onuploadsuccessCallback = function(outputparams) {
    kony.sdk.mvvm.showSyncLoadingScreen("Upload Success");
    if (outputparams != undefined && outputparams != null) {
        if (outputparams.uploadcontext != undefined && outputparams.uploadcontext != null) {
            syncResponse.upload = outputparams.uploadcontext
        }
    }
};
kony.sdk.mvvm.ondownloadstartCallback = function(outputparams) {
    kony.sdk.mvvm.log.info("on download start callback called.");
    kony.sdk.mvvm.showSyncLoadingScreen("Download Started");
    var req = outputparams.downloadRequest;
    if (req.clientcontext === undefined) {
        req.clientcontext = {}
    }
    req.clientcontext.session_token = kony.sdk.mvvm.syncSessionToken;
    req.clientcontext.tenant = kony.sdk.mvvm.syncTenant;
    if (kony.sdk.mvvm.batchtimeout !== -1) req.clientcontext.BATCH_TIMEOUT = kony.sdk.mvvm.batchtimeout;
    if (kony.sdk.mvvm.batchdownloadrequestlimit !== -1) req.clientcontext.BATCH_SERVICE_COUNT_LIMIT = kony.sdk.mvvm.batchdownloadrequestlimit;
    return req
};
kony.sdk.mvvm.ondownloadsuccessCallback = function(outputparams) {
    syncResponse.download = outputparams;
    kony.sdk.mvvm.showSyncLoadingScreen("Download Success")
};
kony.sdk.mvvm.onbatchstoredCallback = function(outputparams) {
    kony.sdk.mvvm.showSyncLoadingScreen("Batch Stored")
};
kony.sdk.mvvm.onbatchprocessingstartCallback = function(outputparams) {
    kony.sdk.mvvm.log.info("on batchprocessingstartcallback called.");
    kony.sdk.mvvm.showSyncLoadingScreen("Batch Processing");
    var req = outputparams.downloadRequest;
    if (req.clientcontext === undefined) {
        req.clientcontext = {}
    }
    req.clientcontext.channelName = kony.sdk.mvvm.Utils.getChannelName();
    req.clientcontext.platform = kony.sdk.mvvm.Utils.getPlatformName();
    req.clientcontext.session_token = kony.sdk.mvvm.syncSessionToken;
    req.clientcontext.tenant = kony.sdk.mvvm.syncTenant;
    if (kony.sdk.mvvm.batchtimeout !== -1) req.clientcontext.BATCH_TIMEOUT = kony.sdk.mvvm.batchtimeout;
    if (kony.sdk.mvvm.batchdownloadrequestlimit !== -1) req.clientcontext.BATCH_SERVICE_COUNT_LIMIT = kony.sdk.mvvm.batchdownloadrequestlimit;
    return req
};
kony.sdk.mvvm.onuploadbatchstartCallback = function(outputparams) {
    kony.sdk.mvvm.log.info("onuploadbatchstartcallback called.");
    kony.sdk.mvvm.showSyncLoadingScreen("Batch Processing");
    var req = outputparams.uploadRequest;
    if (req.clientcontext === undefined) {
        req.clientcontext = {}
    }
    req.clientcontext.session_token = kony.sdk.mvvm.syncSessionToken;
    req.clientcontext.tenant = kony.sdk.mvvm.syncTenant;
    if (kony.sdk.mvvm.batchtimeout !== -1) req.clientcontext.BATCH_TIMEOUT = kony.sdk.mvvm.batchtimeout;
    if (kony.sdk.mvvm.batchuploadrequestlimit !== -1) req.clientcontext.BATCH_SERVICE_COUNT_LIMIT = kony.sdk.mvvm.batchuploadrequestlimit;
    return req
};
kony.sdk.mvvm.onbatchprocessingsuccessCallback = function(outputparams) {
    kony.sdk.mvvm.showSyncLoadingScreen("Batch Processing Success")
};
kony.sdk.mvvm.onscopestartCallback = function(outputparams) {
    kony.sdk.mvvm.showSyncLoadingScreen("Scope Started")
};
kony.sdk.mvvm.onscopeerrorCallback = function(outputparams) {
    syncResponse.batchprocessing = outputparams;
    kony.sdk.mvvm.showSyncLoadingScreen("Sync Scope Error");
    kony.sdk.mvvm.dismissSyncLoadingScreen()
};
kony.sdk.mvvm.onscopesuccessCallback = function(outputparams) {
    kony.sdk.mvvm.showSyncLoadingScreen("Scope Success");
    kony.sdk.mvvm.dismissSyncLoadingScreen()
};
kony.sdk.mvvm.resetSyncHelper = function(success, error) {
    kony.sdk.mvvm.log.info("sync reset started.");
    sync.reset(resetSucc, resetFail);

    function resetSucc(response) {
        syncResponse.reset = response;
        kony.sdk.mvvm.log.info(kony.sdk.mvvm.getMessageTemplate("syncResetSuccess"));
        success(response)
    }

    function resetFail(err) {
        syncResponse.reseterror = err;
        error(err)
    }
};
kony.sdk.mvvm.downloadSyncClientArtifacts = function(successcallback, errorcallback) {
    var clientArtifactDataService = new kony.sdk.mvvm.DataService(true);
    var clientArtifactDataProvider = clientArtifactDataService.getDataProvider();
    clientArtifactDataProvider.downloadClientArtifact(successcallback, errorcallback)
};
kony.sdk.mvvm.getMessageTemplate = function(operation, entityName) {
    if (entityName == null) entityName = null;
    if (operation == "delete") return "Are you sure you want to delete " + entityName + " ?";
    if (operation == "deleteSuccess") return entityName + " deleted successfully.";
    if (operation == "deleteFailure") return "Some problem occurred while deleting " + entityName;
    if (operation == "updateSuccess") return entityName + " updated successfully.";
    if (operation == "updateFailure") return "Some problem occurred while updating " + entityName;
    if (operation == "addSuccess") return entityName + " added successfully.";
    if (operation == "addFailure") return "Some problem occurred while adding " + entityName;
    if (operation == "syncSuccess") return "Sync completed successfully.";
    if (operation == "syncError") return "Sync failed with errors.";
    if (operation == "syncInitSuccess") return "Sync initialized successfully.";
    if (operation == "syncInitFailure") return "Sync initialization failed with errors.";
    if (operation == "syncResetSuccess") return "Sync reset successfully.";
    if (operation == "syncResetFailure") return "Sync reset failed";
    if (operation == "rollbackSuccess") return "All recent changes rollbacked successfully";
    if (operation == "rollbackFailure") return "Problem occurred in rollbacking recent changes";
    if (operation == "syncStopFailure") return "Stopping Sky Sync Failure";
    if (operation == "syncSuccessFailure") return "Sync Stop Success";
    if (operation == "settingsSaveSuccess") return "Settings saved successfully.";
    if (operation == "settingsSaveFailure") return "Some problem occured while saving settings.";
    if (operation == "noData") return "No Data To Display";
    if (operation == "generalError") return "Some error occurred while doing requested operation"
};
kony.sdk.mvvm.initializeSyncVariables = function(startSync) {
    var query = kony.sync.qb_createQuery();
    kony.sync.qb_select(query, null);
    kony.sync.qb_from(query, kony.sdk.mvvm.syncCfgTable);
    kony.sync.qb_where(query, [{
        key: kony.sdk.mvvm.syncCfgColumnID,
        value: 1
    }]);
    var query_compile = kony.sync.qb_compile(query);
    var sql = query_compile[0];
    var params = query_compile[1];
    kony.sync.single_select_execute(kony.sdk.mvvm.getDbName(), sql, params, scallback, errorCallback);

    function scallback(resultSet) {
        konysyncClientSyncConfig = JSON.parse(resultSet[0][kony.sdk.mvvm.syncCfgColumnJson]);
        if (typeof startSync !== undefined && typeof startSync === "function") {
            startSync()
        }
    }

    function errorCallback(response) {
        kony.sdk.mvvm.log.error("Retrieving sync config infromation got failed", response)
    }
};
kony = kony || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.Utils = kony.sdk.mvvm.Utils || {};
kony.sdk.mvvm.util.sync = kony.sdk.mvvm.util.sync || {};
kony.sdk.mvvm.sync = kony.sdk.mvvm.sync || {};
kony.sdk.mvvm.Utils.reqCount = 1;
kony.sdk.mvvm.Utils.alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
kony.sdk.mvvm.Utils.isPerfTestReq = false;
kony.sdk.mvvm.Utils.endsWith = function(inStr, inSuffix) {
    var str = inStr.toLowerCase();
    var suffix = inSuffix.toLowerCase();
    return str.indexOf(suffix, str.length - suffix.length) !== -1
};
kony.sdk.mvvm.Utils.matchIgnoreCase = function(string1, string2) {
    if (string1 === null || string2 === null || string1 === undefined || string2 === undefined) {
        return false
    } else if (string1.toUpperCase() === string2.toUpperCase()) {
        return true
    } else {
        return false
    }
};
kony.sdk.mvvm.Utils.getKeyByValue = function(value, EnumType) {
    for (var prop in EnumType) {
        if (EnumType.hasOwnProperty(prop)) {
            if (EnumType[prop] === value) return prop
        }
    }
};
kony.sdk.mvvm.Utils.replaceAll = function(string, toReplace, replaceWith) {
    var temp = string;
    var index = temp.indexOf(toReplace);
    while (index != -1) {
        temp = temp.replace(toReplace, replaceWith);
        index = temp.indexOf(toReplace)
    }
    return temp
};
kony.sdk.mvvm.Utils.addAll = function(to, from) {
    for (var index = 0; index < from.length; index++) {
        var array_element = from[index];
        to.push(array_element)
    }
};
kony.sdk.mvvm.Utils.indexOf = function(array, object) {
    if (array instanceof Array) {
        for (var i = 0; i < array.length; i++) {
            var obj = array[i];
            if (kony.sdk.mvvm.Utils.equals(obj, object)) {
                return i
            }
        }
        return -1
    }
};
kony.sdk.mvvm.Utils.equals = function(x, y) {
    if (x === y) return true;
    if (!(x instanceof Object) || !(y instanceof Object)) return false;
    if (x.constructor !== y.constructor) return false;
    for (var p in x) {
        if (!x.hasOwnProperty(p)) continue;
        if (!y.hasOwnProperty(p)) return false;
        if (x[p] === y[p]) continue;
        if (typeof x[p] !== "object") return false;
        if (!kony.sdk.mvvm.Utils.equals(x[p], y[p])) return false
    }
    for (p in y) {
        if (y.hasOwnProperty(p) && !x.hasOwnProperty(p)) return false
    }
    return true
};
kony.sdk.mvvm.Utils.remove = function(array, object) {
    if (array instanceof Array) {
        var index = kony.sdk.mvvm.Utils.indexOf(array, object);
        if (index !== -1) {
            array.splice(index, 1)
        }
    }
};
kony.sdk.mvvm.Utils.contains = function(array, object) {
    if (array instanceof Array) {
        var index = kony.sdk.mvvm.Utils.indexOf(array, object);
        if (index === -1) {
            return false
        }
        return true
    }
};
kony.sdk.mvvm.Utils.containsKey = function(json, object) {
    var jsonKeyArray = Object.keys(json);
    if (kony.string.equalsIgnoreCase(kony.type(object), "string")) {
        for (var index = 0; index < jsonKeyArray.length; index++) {
            var obj = jsonKeyArray[index];
            if (kony.string.equalsIgnoreCase(kony.type(obj), "string") && kony.string.equalsIgnoreCase(object, obj)) {
                return true
            } else {
                continue
            }
        }
    }
    for (var i = 0; i < jsonKeyArray.length; i++) {
        var objTemp = jsonKeyArray[i];
        if (kony.sdk.mvvm.Utils.equals(objTemp, object)) {
            return true
        } else {
            continue
        }
    }
    return false
};
kony.sdk.mvvm.Utils.hasKeyInTableMap = function(map, key) {
    var keys = Object.keys(map);
    for (var i = 0; i < keys.length; i++) {
        var arrKey = keys[i];
        if (kony.string.equalsIgnoreCase(arrKey, key)) {
            return true
        }
    }
    return false
};
kony.sdk.mvvm.Utils.replaceAllRegEx = function replaceAll(find, replace, str) {
    return str.replace(new RegExp(find, "g"), replace)
};
kony.sdk.mvvm.Utils.replaceFirstOccurence = function replaceAll(find, replace, str) {
    return str.replace(new RegExp(find), replace)
};
kony.sdk.mvvm.Utils.checkSorting = function(type, fieldName, result, mockSync) {
    var status = false;
    if (type == "asc") {
        for (var i = 1; i < result.length; i++) {
            if (mockSync) {
                if (result.item(i)[fieldName] >= result.item(i - 1)[fieldName] || result.item(i)[fieldName] - result.item(i - 1)[fieldName] >= 0) {
                    status = true
                } else {
                    return false
                }
            } else {
                if (result[i][fieldName] >= result[i - 1][fieldName] || result[i][fieldName] - result[i - 1][fieldName] >= 0) {
                    status = true
                } else {
                    return false
                }
            }
        }
        return status
    } else if (type == "desc") {
        for (var i = 1; i < result.length; i++) {
            if (mockSync) {
                if (result.item(i)[fieldName] <= result.item(i - 1)[fieldName] || result.item(i)[fieldName] - result.item(i - 1)[fieldName] <= 0) {
                    status = true
                } else {
                    return false
                }
            } else {
                if (result[i][fieldName] <= result[i - 1][fieldName] || result[i][fieldName] - result[i - 1][fieldName] <= 0) {
                    status = true
                } else {
                    return false
                }
            }
        }
        return status
    } else {
        return false
    }
};
kony.sdk.mvvm.Utils.validateInput = function(columns, values) {
    for (var i = 0; i < columns.length; i++) {
        if (columns[i] instanceof kony.sdk.mvvm.Column) {
            if (kony.sdk.mvvm.Utils.matchIgnoreCase(columns[i].getDataType(), "string") || kony.sdk.mvvm.Utils.matchIgnoreCase(columns[i].getDataType(), "text") || kony.sdk.mvvm.Utils.matchIgnoreCase(columns[i].getDataType(), "varchar")) {
                if (kony.sdk.mvvm.Utils.isNull(values[i]) || !(typeof values[i] == "string" || values[i] instanceof String)) {
                    return false
                }
            }
            if (kony.sdk.mvvm.Utils.matchIgnoreCase(columns[i].getDataType(), "numeric") || kony.sdk.mvvm.Utils.matchIgnoreCase(columns[i].getDataType(), "integer") || kony.sdk.mvvm.Utils.matchIgnoreCase(columns[i].getDataType(), "int")) {
                if (kony.sdk.mvvm.Utils.isNull(values[i]) || !isValidNumberType(values[i])) {
                    return false
                }
            }
            if (kony.sdk.mvvm.Utils.matchIgnoreCase(columns[i].getDataType(), "boolean")) {
                if (kony.sdk.mvvm.Utils.isNull(values[i]) || !kony.sdk.mvvm.Utils.isValidBooleanType(values[i])) {
                    return false
                }
            }
            if (kony.sdk.mvvm.Utils.matchIgnoreCase(columns[i].getDataType(), "date") || kony.sdk.mvvm.Utils.matchIgnoreCase(columns[i].getDataType(), "timestamp") || kony.sdk.mvvm.Utils.matchIgnoreCase(columns[i].getDataType(), "datetime")) {
                if (kony.sdk.mvvm.Utils.isNull(values[i]) || kony.sdk.mvvm.Utils.isEmptyString(values[i])) {
                    return false
                }
            }
            return true
        } else {
            return false
        }
    }
};
kony.sdk.mvvm.Utils.isValidBooleanType = function(val) {
    if (kony.sdk.mvvm.Utils.matchIgnoreCase(typeof val, "boolean")) {
        return true
    } else if (kony.sdk.mvvm.Utils.matchIgnoreCase(typeof val, "string")) {
        if (kony.sdk.mvvm.Utils.matchIgnoreCase(val, "false") || kony.sdk.mvvm.Utils.matchIgnoreCase(val, "true") || kony.sdk.mvvm.Utils.matchIgnoreCase(val, "0") || kony.sdk.mvvm.Utils.matchIgnoreCase(val, "1")) {
            return true
        }
    } else if (kony.sdk.mvvm.Utils.matchIgnoreCase(typeof val, "number")) {
        if (val === 0 || val === 1) {
            return true
        }
    }
    return false
};
kony.sdk.mvvm.Utils.isValidPickListData = function(fieldValue, pickListValuesArray, fieldMappingId) {
    var result = false;
    if (pickListValuesArray !== undefined && pickListValuesArray !== null && pickListValuesArray.length > 0) {
        pickListValuesArray.forEach(function(entry) {
            if (entry.fieldMappingId === fieldMappingId && entry.value === fieldValue) {
                result = true
            }
        })
    }
    return result
};
kony.sdk.mvvm.Utils.getPicklistLabel = function(value, pickListValues) {
    var labelFound = false;
    var count = 0;
    var label;
    while (!labelFound && count < pickListValues.length) {
        if (pickListValues[count].getValue() === value) {
            label = pickListValues[count].getLabel();
            labelFound = true
        }
        count++
    }
    return label
};
kony.sdk.mvvm.Utils.isValidInteger = function(val) {
    var result = true;
    if (typeof val === "string") {
        var floatValue = parseFloat(val);
        if (typeof floatValue === "number" && floatValue % 1 !== 0) {
            result = false
        } else if (floatValue > kony.sdk.mvvm.constants["INTEGER_MAX_VALUE"] || floatValue < kony.sdk.mvvm.constants["INTEGER_MIN_VALUE"]) {
            result = false
        }
    } else if (typeof val === "number" && val % 1 === 0 && (val > kony.sdk.mvvm.constants["INTEGER_MAX_VALUE"] || val < kony.sdk.mvvm.constants["INTEGER_MIN_VALUE"])) {
        result = false
    } else if (typeof val !== "number" || val % 1 !== 0) {
        result = false
    }
    return result
};
kony.sdk.mvvm.Utils.isValidFloat = function(val) {
    var result = true;
    if (typeof val === "string") {
        var floatValue = parseFloat(val);
        if (typeof floatValue !== "number") result = false
    } else if (typeof val !== "number") result = false;
    return result
};
kony.sdk.mvvm.Utils.isValidNumeric = function(numericObj) {
    var result = true;
    var val = numericObj.val;
    var precision = parseInt(numericObj.precision);
    var scale = parseInt(numericObj.scale);
    if (typeof val === "string") {
        var nValue = parseFloat(val);
        if (typeof nValue !== "number") result = false;
        if (val.indexOf(".") === -1 && val.length > precision - scale) result = false;
        else if (val.indexOf(".") !== -1 && val.indexOf(".") > precision - scale) result = false
    }
    return result
};
kony.sdk.mvvm.Utils.isEmptyString = function(value) {
    if (kony.sdk.mvvm.Utils.matchIgnoreCase(typeof value, "string") && value.trim() === "") {
        return true
    } else {
        return false
    }
};
kony.sdk.mvvm.Utils.isNull = function(val) {
    if (val === null || val === undefined) return true;
    val = val + "";
    return kony.sdk.mvvm.Utils.matchIgnoreCase(val, "null")
};
kony.sdk.mvvm.Utils.isValidNumberType = function(val) {
    if (kony.sdk.mvvm.Utils.matchIgnoreCase(typeof val, "number")) return true;
    else if (kony.sdk.mvvm.Utils.matchIgnoreCase(typeof val, "string") && null != kony.sdk.mvvm.Utils.toNumber(val)) return true;
    else return false
};
kony.sdk.mvvm.Utils.toNumber = function(arg) {
    if (arguments.length != 1) {
        throw new Error("Invalid argument to kony.sdk.mvvm.Utils.toNumber")
    }
    if (typeof arg === "number") {
        return arg
    } else if (typeof arg === "string") {
        var str = arg.replace(/^\s*/, "").replace(/\s*$/, "");
        if (str === "") {
            return null
        } else {
            var num = str - 0;
            return isNaN(num) ? null : num
        }
    } else {
        return null
    }
};
kony.sdk.mvvm.Utils.appendListToQuery = function(objectList, seperator, mode) {
    var listBuffer = "";
    for (var i = 0; i < objectList.length; i++) {
        var obj = objectList[i];
        if (mode > -1) {
            if (obj !== null) {
                if (obj instanceof kony.sdk.mvvm.Column) {
                    listBuffer = listBuffer.concat(obj.toString())
                } else {
                    listBuffer = listBuffer.concat(obj.toString())
                }
            }
        } else if (obj !== null) {
            listBuffer = listBuffer.concat(obj.toString())
        }
        if (i < objectList.length - 1) {
            listBuffer = listBuffer.concat(seperator)
        }
    }
    return listBuffer
};
kony.sdk.mvvm.Utils.validateCriteriaObject = function(criteria) {
    if (criteria !== null && criteria !== undefined) {
        if (criteria instanceof kony.sdk.mvvm.Criteria || criteria instanceof kony.sdk.mvvm.Match || criteria instanceof kony.sdk.mvvm.Between || criteria instanceof kony.sdk.mvvm.LogicGroup || criteria instanceof kony.sdk.mvvm.And || criteria instanceof kony.sdk.mvvm.Or || criteria instanceof kony.sdk.mvvm.Not || criteria instanceof kony.sdk.mvvm.Expression || criteria instanceof kony.sdk.mvvm.InCriteria || criteria instanceof kony.sdk.mvvm.Exists || criteria instanceof kony.sdk.mvvm.Join) {
            return true
        } else {
            return false
        }
    } else {
        return false
    }
};
kony.sdk.mvvm.Utils.getFunctionName = function(calleeName) {
    var myName = calleeName.substr("function ".length);
    myName = myName.substr(0, myName.indexOf("("));
    return myName
};
kony.sdk.mvvm.Utils.readURLParameters = function(url) {
    var result = {};
    var decode = function(s) {
        var c = "";
        c = s.replace(/\+/g, " ");
        c = s.replace(/%+/g, "%25");
        return decodeURIComponent(c)
    };
    var queryString = url.substring(1);
    var keyValues = queryString.split("&");
    for (var i in keyValues) {
        var key = keyValues[i].split("=");
        if (key.length > 1) {
            result[decode(key[0])] = decode(key[1])
        }
    }
    return result
};
kony.sdk.mvvm.Utils.getOperator = function(operator) {
    if (kony.sdk.mvvm.Utils.matchIgnoreCase(operator, "lt")) {
        return kony.sdk.mvvm.MatchType.LESS
    } else if (kony.sdk.mvvm.Utils.matchIgnoreCase(operator, "gt")) {
        return kony.sdk.mvvm.MatchType.GREATER
    } else if (kony.sdk.mvvm.Utils.matchIgnoreCase(operator, "eq")) {
        return kony.sdk.mvvm.MatchType.EQUALS
    } else if (kony.sdk.mvvm.Utils.matchIgnoreCase(operator, "ne")) {
        return kony.sdk.mvvm.MatchType.NOTEQUAL
    } else if (kony.sdk.mvvm.Utils.matchIgnoreCase(operator, "le")) {
        return kony.sdk.mvvm.MatchType.LESSEQUAL
    } else if (kony.sdk.mvvm.Utils.matchIgnoreCase(operator, "ge")) {
        return kony.sdk.mvvm.MatchType.GREATEREQUAL
    } else if (kony.sdk.mvvm.Utils.matchIgnoreCase(operator, "lk")) {
        return kony.sdk.mvvm.MatchType.LIKE
    } else if (kony.sdk.mvvm.Utils.matchIgnoreCase(operator, "null")) {
        return kony.sdk.mvvm.MatchType.ISNULL
    } else if (kony.sdk.mvvm.Utils.matchIgnoreCase(operator, "nn")) {
        return kony.sdk.mvvm.MatchType.ISNOTNULL
    } else if (kony.sdk.mvvm.Utils.matchIgnoreCase(operator, "cn")) {
        return kony.sdk.mvvm.MatchType.CONTAINS
    } else if (kony.sdk.mvvm.Utils.matchIgnoreCase(operator, "sw")) {
        return kony.sdk.mvvm.MatchType.STARTSWITH
    } else if (kony.sdk.mvvm.Utils.matchIgnoreCase(operator, "ew")) {
        return kony.sdk.mvvm.MatchType.ENDSWITH
    } else {
        throw new kony.sdk.mvvm.Exception(kony.sdk.mvvm.ExceptionCode.CD_ERROR_MATCHOPERATOR_NOT_DEFINED_PROPERLY, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_MATCHOPERATOR_NOT_DEFINED_PROPERLY)
    }
};
kony.sdk.mvvm.Utils.validateDate = function(dateString) {
    var t = str.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
    if (t === null) {
        t = str.match(/^(\d{2})\-(\d{2})\-(\d{4})$/);
        if (t === null) {
            t = str.match(/^(\d{2})\.(\d{2})\.(\d{4})$/);
            if (t === null) {
                return false
            }
        }
    }
    var d = +t[1],
        m = +t[2],
        y = +t[3];
    if (m >= 1 && m <= 12 && d >= 1 && d <= 31 && y >= 1e3) {
        return true
    }
    return false
};
kony.sdk.mvvm.Utils.validateDateTypeInput = function(dateType) {
    if (kony.sdk.mvvm.Utils.matchIgnoreCase(dateType, kony.sdk.mvvm.DateTimeType.TODAY) || kony.sdk.mvvm.Utils.matchIgnoreCase(dateType, kony.sdk.mvvm.DateTimeType.TOMORROW) || kony.sdk.mvvm.Utils.matchIgnoreCase(dateType, kony.sdk.mvvm.DateTimeType.YESTERDAY) || kony.sdk.mvvm.Utils.matchIgnoreCase(dateType, kony.sdk.mvvm.DateTimeType.CURRENTWEEK) || kony.sdk.mvvm.Utils.matchIgnoreCase(dateType, kony.sdk.mvvm.DateTimeType.NEXTWEEK) || kony.sdk.mvvm.Utils.matchIgnoreCase(dateType, kony.sdk.mvvm.DateTimeType.LASTWEEK) || kony.sdk.mvvm.Utils.matchIgnoreCase(dateType, kony.sdk.mvvm.DateTimeType.CURRENTMONTH) || kony.sdk.mvvm.Utils.matchIgnoreCase(dateType, kony.sdk.mvvm.DateTimeType.NEXTMONTH) || kony.sdk.mvvm.Utils.matchIgnoreCase(dateType, kony.sdk.mvvm.DateTimeType.LASTMONTH)) {
        return true
    } else {
        return false
    }
};
kony.sdk.mvvm.Utils.getDateRange = function(dateType) {
    var result = [];
    var currentDate = new Date;
    var formattedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), currentDate.getHours(), currentDate.getMinutes(), currentDate.getSeconds(), currentDate.getMilliseconds());
    var start;
    var end;
    if (kony.sdk.mvvm.Utils.matchIgnoreCase(dateType, kony.sdk.mvvm.DateTimeType.TODAY)) {
        end = new Date(formattedDate.getFullYear(), formattedDate.getMonth(), formattedDate.getDate(), 23, 59, 59);
        start = new Date(formattedDate.getFullYear(), formattedDate.getMonth(), formattedDate.getDate(), 0, 0, 0)
    } else if (kony.sdk.mvvm.Utils.matchIgnoreCase(dateType, kony.sdk.mvvm.DateTimeType.TOMORROW)) {
        formattedDate.setDate(formattedDate.getDate() + 1);
        end = new Date(formattedDate.getFullYear(), formattedDate.getMonth(), formattedDate.getDate(), 23, 59, 59);
        start = new Date(formattedDate.getFullYear(), formattedDate.getMonth(), formattedDate.getDate(), 0, 0, 0)
    } else if (kony.sdk.mvvm.Utils.matchIgnoreCase(dateType, kony.sdk.mvvm.DateTimeType.YESTERDAY)) {
        formattedDate.setDate(formattedDate.getDate() - 1);
        end = new Date(formattedDate.getFullYear(), formattedDate.getMonth(), formattedDate.getDate(), 23, 59, 59);
        start = new Date(formattedDate.getFullYear(), formattedDate.getMonth(), formattedDate.getDate(), 0, 0, 0)
    } else if (kony.sdk.mvvm.Utils.matchIgnoreCase(dateType, kony.sdk.mvvm.DateTimeType.CURRENTWEEK)) {
        var firstDayofWeek = formattedDate.getDate() - formattedDate.getDay();
        var lastDayofWeek = firstDayofWeek + 6;
        formattedDate.setDate(firstDayofWeek);
        start = new Date(formattedDate.getFullYear(), formattedDate.getMonth(), formattedDate.getDate(), 0, 0, 0);
        formattedDate.setDate(lastDayofWeek);
        end = new Date(formattedDate.getFullYear(), formattedDate.getMonth(), formattedDate.getDate(), 23, 59, 59)
    } else if (kony.sdk.mvvm.Utils.matchIgnoreCase(dateType, kony.sdk.mvvm.DateTimeType.LASTWEEK)) {
        formattedDate.setDate(formattedDate.getDate() - 7);
        var firstDayofWeek = formattedDate.getDate() - formattedDate.getDay();
        var lastDayofWeek = firstDayofWeek + 6;
        formattedDate.setDate(firstDayofWeek);
        start = new Date(formattedDate.getFullYear(), formattedDate.getMonth(), formattedDate.getDate(), 0, 0, 0);
        formattedDate.setDate(lastDayofWeek);
        end = new Date(formattedDate.getFullYear(), formattedDate.getMonth(), formattedDate.getDate(), 23, 59, 59)
    } else if (kony.sdk.mvvm.Utils.matchIgnoreCase(dateType, kony.sdk.mvvm.DateTimeType.NEXTWEEK)) {
        formattedDate.setDate(formattedDate.getDate() + 7);
        var firstDayofWeek = formattedDate.getDate() - formattedDate.getDay();
        var lastDayofWeek = firstDayofWeek + 6;
        formattedDate.setDate(firstDayofWeek);
        start = new Date(formattedDate.getFullYear(), formattedDate.getMonth(), formattedDate.getDate(), 0, 0, 0);
        formattedDate.setDate(lastDayofWeek);
        end = new Date(formattedDate.getFullYear(), formattedDate.getMonth(), formattedDate.getDate(), 23, 59, 59)
    } else if (kony.sdk.mvvm.Utils.matchIgnoreCase(dateType, kony.sdk.mvvm.DateTimeType.CURRENTMONTH)) {
        start = new Date(formattedDate.getFullYear(), formattedDate.getMonth(), 1, 0, 0, 0);
        end = new Date(formattedDate.getFullYear(), formattedDate.getMonth() + 1, 0, 23, 59, 59)
    } else if (kony.sdk.mvvm.Utils.matchIgnoreCase(dateType, kony.sdk.mvvm.DateTimeType.LASTMONTH)) {
        start = new Date(formattedDate.getFullYear(), formattedDate.getMonth() - 1, 1, 0, 0, 0, 0);
        end = new Date(formattedDate.getFullYear(), formattedDate.getMonth(), 0, 23, 59, 59, 999)
    } else if (kony.sdk.mvvm.Utils.matchIgnoreCase(dateType, kony.sdk.mvvm.DateTimeType.NEXTMONTH)) {
        start = new Date(formattedDate.getFullYear(), formattedDate.getMonth() + 1, 1, 0, 0, 0, 0);
        end = new Date(formattedDate.getFullYear(), formattedDate.getMonth() + 2, 0, 23, 59, 59, 999)
    } else {
        start = 0;
        end = 0
    }
    result.push(start);
    result.push(end);
    return result
};
kony.sdk.mvvm.Utils.isAndroid = function() {
    var isAndroid = false;
    try {
        if (kony.os.deviceInfo().name === "android") isAndroid = true
    } catch (e) {
        isAndroid = false
    }
    return isAndroid
};
kony.sdk.mvvm.Utils.isIpad = function() {
    var isIPad = false;
    try {
        var deviceName = kony.os.deviceInfo().name;
        if (deviceName === "iPad" || deviceName === "iPad Simulator") isIPad = true
    } catch (e) {
        isIPad = false
    }
    return isIPad
};
kony.sdk.mvvm.Utils.isIphone = function() {
    var isIPhone = false;
    try {
        var deviceName = kony.os.deviceInfo().name;
        if (deviceName === "iPhone" || deviceName === "iPhone Simulator") isIPhone = true
    } catch (e) {
        isIPhone = false
    }
    return isIPhone
};
kony.sdk.mvvm.Utils.isTablet = function() {
    var isTablet = false;
    if (kony.sdk.mvvm.Utils.isAndroidTablet() || kony.sdk.mvvm.Utils.isIpad()) {
        isTablet = true
    } else {
        isTablet = false
    }
    return isTablet
};
kony.sdk.mvvm.Utils.getPlatformName = function() {
    var platformName;
    if (kony.sdk.mvvm.isForTesting && kony.sdk.mvvm.TestConstants && kony.sdk.mvvm.TestConstants.hasOwnProperty("PLATFORM")) {
        platformName = kony.sdk.mvvm.TestConstants["PLATFORM"]
    } else {
        platformName = "iphone";
        if (kony.sdk.mvvm.Utils.isIphone()) platformName = "iphone";
        else if (kony.sdk.mvvm.Utils.isIpad()) platformName = "ipad";
        else if (kony.sdk.mvvm.Utils.isAndroidTablet()) platformName = "tabrcandroid";
        else if (kony.sdk.mvvm.Utils.isAndroid()) platformName = "android";
        else platformName = "android"
    }
    return platformName
};
kony.sdk.mvvm.Utils.getChannelName = function() {
    var channelName;
    if (kony.sdk.mvvm.isForTesting && kony.sdk.mvvm.TestConstants && kony.sdk.mvvm.TestConstants.hasOwnProperty("CHANNEL")) {
        channelName = kony.sdk.mvvm.TestConstants["CHANNEL"]
    } else {
        channelName = "mobile";
        if (kony.sdk.mvvm.Utils.isTablet()) channelName = "tablet"
    }
    return channelName
};
kony.sdk.mvvm.Utils.getExtendedFieldsFromArray = function(array, object) {
    if (array instanceof Array) {
        for (var i = 0; i < array.length; i++) {
            if (array[i] instanceof kony.sdk.mvvm.FieldMetadata && object instanceof kony.sdk.mvvm.Column) {
                if (kony.sdk.mvvm.Utils.matchIgnoreCase(array[i].name, object.getName()) && kony.sdk.mvvm.Utils.matchIgnoreCase(array[i].type, "extendedfield")) {
                    return array[i]
                }
            }
        }
        return null
    }
};
kony.sdk.mvvm.Utils.getDeviceID = function() {
    kony.sdk.mvvm.log.info("Entering kony.sdk.mvvm.getDeviceID");
    if (kony.sdk.mvvm.constants["DEVICE_ID"] !== "") {
        return kony.sdk.mvvm.constants["DEVICE_ID"]
    }
    var deviceInfo = kony.os.deviceInfo();
    if (kony.sdk.mvvm.Utils.isIphone() || kony.sdk.mvvm.Utils.isIpad()) {
        if (deviceInfo.osversion < 7) {
            kony.sdk.mvvm.constants["DEVICE_ID"] = deviceInfo.deviceid
        } else {
            kony.sdk.mvvm.constants["DEVICE_ID"] = deviceInfo.identifierForVendor
        }
    } else kony.sdk.mvvm.constants["DEVICE_ID"] = deviceInfo.deviceid;
    return kony.sdk.mvvm.constants["DEVICE_ID"]
};
kony.sdk.mvvm.Utils.generateRequestToken = function() {
    var randString = "";
    for (var i = 0; i < 5; i++) randString += kony.sdk.mvvm.Utils.alphabets.charAt(Math.floor(Math.random() * kony.sdk.mvvm.Utils.alphabets.length));
    var token = kony.sdk.mvvm.Utils.getDeviceID() + "_" + kony.sdk.mvvm.Utils.reqCount + "_" + randString;
    kony.sdk.mvvm.Utils.reqCount++;
    return token
};
kony.sdk.mvvm.Utils.perfStats = [];
kony.sdk.mvvm.Utils.perftimecal = function(startTag, endTag, startTS, endTS) {
    if (kony.sdk.mvvm.Utils.isPerfTestReq === false) return;
    var formattedStartTS = startTS.getMinutes() + ":" + startTS.getSeconds() + ":" + startTS.getMilliseconds();
    var formattedEndTS = endTS.getMinutes() + ":" + endTS.getSeconds() + ":" + endTS.getMilliseconds();
    var starttime = startTS.getTime();
    var endtime = endTS.getTime();
    var res = endtime - starttime;
    var caliculatedTS = new Date;
    caliculatedTS.setTime(res);
    var formattedCalicutedTS = caliculatedTS.getUTCMinutes() + ":" + caliculatedTS.getUTCSeconds() + ":" + caliculatedTS.getUTCMilliseconds();
    kony.sdk.mvvm.Utils.perfStats.push(startTag + " " + formattedStartTS);
    kony.sdk.mvvm.Utils.perfStats.push(endTag + " " + formattedEndTS);
    kony.sdk.mvvm.Utils.perfStats.push("Total time taken is >> " + formattedCalicutedTS)
};
kony.sdk.mvvm.Utils.perlogout = function() {
    if (kony.sdk.mvvm.Utils.isPerfTestReq === false) return;
    for (var i = 0; i < kony.sdk.mvvm.Utils.perfStats.length; i++) {
        kony.sdk.mvvm.log.info("[PERF][INFO] :" + kony.sdk.mvvm.Utils.perfStats[i])
    }
    kony.sdk.mvvm.Utils.perfStats = []
};
kony.sdk.mvvm.Utils.getInsertQuery = function(tableName, value) {
    if (typeof tableName === undefined || typeof value === undefined || Object.keys(value).length === 0) {
        return ""
    }
    var numCols = Object.keys(value).length;
    var count = 0;
    var insertQuery = "INSERT INTO " + tableName;
    var insertCols = "( ";
    var insertVals = "( ";
    for (var colName in value) {
        count = count + 1;
        insertCols = insertCols + colName;
        insertVals = insertVals + "'" + value[colName] + "'";
        if (count !== numCols) {
            insertCols = insertCols + ",";
            insertVals = insertVals + ","
        } else {
            insertCols = insertCols + ")";
            insertVals = insertVals + ")"
        }
    }
    return insertQuery + " " + insertCols + " VALUES " + insertVals
};
kony.sdk.mvvm.Utils.executeSingleSqlQuery = function(dbName, query, args, succCallback, errCallback) {
    if (typeof succCallback !== "function" || typeof errCallback !== "function") {
        kony.sdk.mvvm.log.error("Invalid callback(s) provided for executeSingleSqlQuery");
        var afnexception = new kony.sdk.mvvm.Exception(kony.sdk.mvvm.ExceptionCode.CD_ERROR_CALLBACK_NOT_A_FUNCTION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_CALLBACK_NOT_A_FUNCTION);
        errCallback(new kony.sdk.mvvm.Exception(kony.sdk.mvvm.ExceptionCode.CD_ERROR_EXECUTE_SINGLE_SQL_QUERY, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_EXECUTE_SINGLE_SQL_QUERY, afnexception));
        return
    }

    function connErrCallback(error) {
        kony.sdk.mvvm.log.error("Error in getting localdb connection");
        errCallback(new kony.sdk.mvvm.Exception(kony.sdk.mvvm.ExceptionCode.CD_ERROR_LOCAL_DB_CONNECTION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_LOCAL_DB_CONNECTION))
    }
    var dbConnection = kony.sdk.mvvm.KonyApplicationContext.getLocalDbConnection(dbName, connErrCallback);
    if (dbConnection !== null) {
        var callback_result = [];

        function transactionSuccessCallback() {
            kony.sdk.mvvm.log.info("executeSingleSqlQuery: Transaction successful --" + query);
            succCallback(callback_result)
        }

        function transactionErrorCallback(tx, error) {
            kony.sdk.mvvm.log.error("executeSingleSqlQuery: Transaction failed, rolling back done. -- query --" + query);
            localErrCallback(tx, error)
        }

        function localErrCallback(tx, error) {
            kony.sdk.mvvm.log.error("In localErrCallback of executeSingleSqlQuery. error: " + kony.sdk.mvvm.util.stringifyKonyObject(error));
            errCallback(new kony.sdk.mvvm.Exception(kony.sdk.mvvm.ExceptionCode.CD_ERROR_EXECUTE_SINGLE_SQL_QUERY, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_EXECUTE_SINGLE_SQL_QUERY))
        }

        function transactionCallback(tx) {
            kony.sdk.mvvm.log.info("transactionCallback ---" + dbConnection + "---transactionID---" + tx);
            try {
                var resultSet = kony.db.executeSql(tx, query, args);
                if (resultSet !== null) {
                    if (kony.string.startsWith(query, "select", true) && resultSet.rows !== undefined) {
                        var num_records = resultSet.rows.length;
                        kony.sdk.mvvm.log.info("Single Select no of records:", num_records);
                        for (var i = 0; i <= num_records - 1; i++) {
                            var record = kony.db.sqlResultsetRowItem(tx, resultSet, i);
                            kony.table.insert(callback_result, record)
                        }
                    } else {
                        callback_result = resultSet
                    }
                } else {}
            } catch (e) {
                localErrCallback(tx, error)
            }
        }
        kony.db.transaction(dbConnection, transactionCallback, transactionErrorCallback, transactionSuccessCallback)
    } else {}
};
kony.sdk.mvvm.Utils.batchInsert = function(dbName, tableName, values, succCallback, errCallback) {
    if (typeof succCallback !== "function" || typeof errCallback !== "function") {
        kony.sdk.mvvm.log.error("Invalid callback(s) provided for batchInsert");
        var afnexception = new kony.sdk.mvvm.Exception(kony.sdk.mvvm.ExceptionCode.CD_ERROR_CALLBACK_NOT_A_FUNCTION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_CALLBACK_NOT_A_FUNCTION);
        errCallback(new kony.sdk.mvvm.Exception(kony.sdk.mvvm.ExceptionCode.CD_ERROR_BATCH_INSERT, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_BATCH_INSERT, afnexception));
        return
    }

    function connErrCallback(error) {
        kony.sdk.mvvm.log.error("Error in getting localdb connection");
        errCallback(new kony.sdk.mvvm.Exception(kony.sdk.mvvm.ExceptionCode.CD_ERROR_LOCAL_DB_CONNECTION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_LOCAL_DB_CONNECTION))
    }
    var dbConnection = kony.sdk.mvvm.KonyApplicationContext.getLocalDbConnection(dbName, connErrCallback);
    if (dbConnection !== null) {
        var callback_result = [];

        function transactionSuccessCallback() {
            kony.sdk.mvvm.log.info("BatchInsert Transaction successful");
            succCallback(callback_result)
        }

        function transactionErrorCallback(tx, error) {
            kony.sdk.mvvm.log.error("BatchInsert Transaction failed, rolling back done.");
            localErrCallback(tx, error)
        }

        function localErrCallback(tx, error) {
            kony.sdk.mvvm.log.error("In localErrCallback of batchInsert. error: " + kony.sdk.mvvm.util.stringifyKonyObject(error));
            errCallback(new kony.sdk.mvvm.Exception(kony.sdk.mvvm.ExceptionCode.CD_ERROR_BATCH_INSERT, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_BATCH_INSERT))
        }

        function transactionCallback(tx) {
            kony.sdk.mvvm.log.info("transactionCallback ---" + dbConnection + "---transactionID---" + tx);
            try {
                if (typeof values === undefined || !(values.length > 0)) {
                    localErrCallback(tx, null)
                }
                for (var idx in values) {
                    var strquery = kony.sdk.mvvm.Utils.getInsertQuery(tableName, values[idx]);
                    var resultSet = kony.db.executeSql(tx, strquery, null);
                    if (resultSet !== null) {
                        if (resultSet.insertId !== undefined) {
                            kony.sdk.mvvm.log.info("insert success-- insertId:" + resultSet.insertId + ", rowsAffected:" + resultSet.rowsAffected);
                            callback_result.push({
                                insertId: resultSet.insertId
                            })
                        } else {
                            callback_result.push(resultSet)
                        }
                    } else {
                        break
                    }
                }
            } catch (e) {
                localErrCallback(tx, e)
            }
        }
        kony.db.transaction(dbConnection, transactionCallback, transactionErrorCallback, transactionSuccessCallback)
    } else {}
};
kony.sdk.mvvm.util.AppMenuCallbacks = {
    mobile: {
        actions: {
            sync: {
                successCallback: "kony.sdk.mvvm.appMenuSuccessCallback",
                errorCallback: "kony.sdk.mvvm.appMenuErrorCallback"
            },
            rollbackSync: {
                successCallback: "kony.sdk.mvvm.appMenuSuccessCallback",
                errorCallback: "kony.sdk.mvvm.appMenuErrorCallback"
            },
            syncmetadata: {
                successCallback: "kony.sdk.mvvm.appMenuSuccessCallback",
                errorCallback: "kony.sdk.mvvm.appMenuErrorCallback"
            }
        }
    },
    tablet: {
        actions: {
            sync: {
                successCallback: "kony.sdk.mvvm.appMenuSuccessCallback",
                errorCallback: "kony.sdk.mvvm.appMenuErrorCallback"
            },
            rollbackSync: {
                successCallback: "kony.sdk.mvvm.appMenuSuccessCallback",
                errorCallback: "kony.sdk.mvvm.appMenuErrorCallback"
            },
            syncmetadata: {
                successCallback: "kony.sdk.mvvm.appMenuSuccessCallback",
                errorCallback: "kony.sdk.mvvm.appMenuErrorCallback"
            }
        }
    }
};
kony.sdk.mvvm.util.getAppMenuCallbacks = function(type, item) {
    var sucesscallback;
    var errorcallback;
    var datacallback;
    var appMenuCallbackJson = kony.sdk.mvvm.util.AppMenuCallbacks;
    if (appMenuCallbackJson) {
        var channelCallbackJSON = appMenuCallbackJson[kony.sdk.mvvm.Utils.getChannelName()];
        if (type === "action") {
            if (channelCallbackJSON && channelCallbackJSON["actions"] && channelCallbackJSON["actions"][item]) {
                var scallBack = channelCallbackJSON["actions"][item]["successCallback"];
                if (scallBack !== "undefined" && scallBack !== "") {
                    sucesscallback = scallBack
                }
                var ecallBack = channelCallbackJSON["actions"][item]["errorCallback"];
                if (ecallBack !== "undefined" && ecallBack !== "") {
                    errorcallback = ecallBack
                }
            }
        } else {
            if (channelCallbackJSON && channelCallbackJSON["forms"] && channelCallbackJSON["forms"][item]) {
                var dcallback = channelCallbackJSON["forms"][item]["dataCallback"];
                if (dcallback !== "undefined" && dcallback !== "") {
                    datacallback = dcallback
                }
                var ecallBack = channelCallbackJSON["forms"][item]["errorCallback"];
                if (ecallBack !== "undefined" && ecallBack !== "") {
                    errorcallback = ecallBack
                }
            }
        }
    }
    var callBacks = {};
    callBacks.sucesscallback = sucesscallback;
    callBacks.errorcallback = errorcallback;
    callBacks.datacallback = datacallback;
    return callBacks
};
kony.sdk.mvvm.util.stringifyKonyObject = function(obj) {
    var str;
    if (kony.sdk.mvvm.constants && kony.sdk.mvvm.constants["ENABLE_JSON_STRINGIFY_PRINTS"]) {
        try {
            if (obj instanceof Error || obj instanceof kony.sdk.mvvm.Exception) {
                str = obj.toString()
            } else {
                str = JSON.stringify(obj)
            }
        } catch (e) {
            str = ""
        }
    } else str = "";
    return str
};
kony.sdk.mvvm.util.getEnvironmentFromHostName = function(host) {
    kony.sdk.mvvm.log.info("Host name is " + host);
    var regex = "https:\\/\\/[\\w \\W \\s]+\\.saas\\.([\\w]*([\\w]+\\-){0,1}){1}konycloud\\.com";
    var env = host.match(regex);
    kony.sdk.mvvm.log.info("Extracted environment details : " + env);
    if (env !== null && env !== undefined && env[1] !== null && env[1] !== undefined) {
        return env[1]
    }
    return null
};
kony.sdk.mvvm.util.getTenantInstanceID = function(tenant, host, callback) {
    var jsonResult = {
        instance_id: "",
        error: true
    };
    var env = kony.sdk.mvvm.util.getEnvironmentFromHostName(host);
    if (env === null) {
        jsonResult["error_details"] = "Not a proper tenant suffix or one box tenant";
        callback(jsonResult);
        return
    }
    var instanceStore = kony.store.getItem(kony.sdk.mvvm.appInstanceStore);
    if (!kony.sdk.mvvm.isNetworkAvailabile()) {
        if (!instanceStore) {
            jsonResult["error_details"] = "Offline mode, atleast one time should hit account friendly name api";
            callback(jsonResult);
            return
        }
    }
    if (instanceStore) {
        var storedEnviroment = instanceStore[kony.sdk.mvvm.environment];
        var storedInstanceID = instanceStore[kony.sdk.mvvm.instanceId];
        var storedFriendlyName = instanceStore[kony.sdk.mvvm.friendlyName];
        if (kony.sdk.mvvm.Utils.matchIgnoreCase(storedEnviroment, env) && (kony.sdk.mvvm.Utils.matchIgnoreCase(storedFriendlyName, tenant) || kony.sdk.mvvm.Utils.matchIgnoreCase(storedInstanceID, tenant))) {
            kony.sdk.mvvm.log.info("Instance ID information matched with stored instance details");
            jsonResult[kony.sdk.mvvm.instanceId] = storedInstanceID;
            jsonResult["error"] = false;
            callback(jsonResult);
            return
        } else {
            if (!kony.sdk.mvvm.isNetworkAvailabile()) {
                jsonResult["error_details"] = "Offline mode, atleast one time should hit account friendly name api";
                callback(jsonResult);
                return
            }
        }
    }
    var headers = {
        Accept: "application/json"
    };
    var hostUrl = "";
    if (typeof env === undefined || env === "") hostUrl = "https://api.kony.com/api/v1_0/info?type=app&name=" + tenant;
    else hostUrl = "https://api." + env + "kony.com/api/v1_0/info?type=app&name=" + tenant;
    kony.sdk.mvvm.log.info("Getting instance id for tenant : " + tenant + " url : " + hostUrl);
    try {
        kony.sdk.mvvm.theAjaxProvider.get(hostUrl, kony.sdk.mvvm.constants.HTTP_METHOD_GET, headers, sucessCallback, errorCallback, null, true);

        function sucessCallback(response) {
            kony.sdk.mvvm.log.info("Account API response details ", response);
            var result = "";
            if (response !== null && response !== undefined) {
                if (typeof response === "string" || response instanceof String) {
                    result = JSON.parse(response)
                } else {
                    result = response
                }
                if (result[kony.sdk.mvvm.instanceId]) {
                    jsonResult[kony.sdk.mvvm.instanceId] = result[kony.sdk.mvvm.instanceId];
                    var tenant_instance_details = {};
                    tenant_instance_details[kony.sdk.mvvm.environment] = env;
                    tenant_instance_details[kony.sdk.mvvm.instanceId] = jsonResult[kony.sdk.mvvm.instanceId];
                    tenant_instance_details[kony.sdk.mvvm.friendlyName] = tenant;
                    kony.store.setItem(kony.sdk.mvvm.appInstanceStore, tenant_instance_details);
                    jsonResult["error"] = false;
                    callback(jsonResult);
                    return
                }
            }
            errorCallback()
        }

        function errorCallback(error) {
            kony.store.removeItem(kony.sdk.mvvm.appInstanceStore);
            jsonResult["error_details"] = error;
            callback(jsonResult)
        }
    } catch (e) {
        kony.sdk.mvvm.log.info("Exception is ", e)
    }
};
kony.sdk.mvvm.util.formatDate = function(date, format) {
    return moment(date).format(format)
};
kony.sdk.mvvm.util.parseDate = function(dateString, format) {
    return moment(dateString, format).toDate()
};
kony.sdk.mvvm.util.isValidDateFormat = function(dateString) {
    var regex = /^((\d{4})(-)(0[1-9]|1[012])(-)(0[1-9]|[12][0-9]|3[01])T([01][0-9]|2[0-3])(:)([0-5][0-9])(:)([0-5][0-9])(.)(\d{3})[\-\+]\d{4})$/;
    if (dateString.search(regex) === -1) return false;
    else return true
};
kony.sdk.mvvm.util.sync.setNumberofretryattempts = function(noRetries) {
    if (noRetries) kony.sdk.mvvm.sync.numberofretryattempts = noRetries
};
kony.sdk.mvvm.util.sync.getNumberofretryattempts = function(noRetries) {
    return kony.sdk.mvvm.sync.numberofretryattempts
};
kony.sdk.mvvm.util.sync.setRetrywaittime = function(retrywaittime) {
    if (retrywaittime) kony.sdk.mvvm.sync.retrywaittime = retrywaittime
};
kony.sdk.mvvm.util.sync.getRetrywaittime = function(retrywaittime) {
    return kony.sdk.mvvm.sync.retrywaittime
};
kony.sdk.mvvm.util.sync.setNetworktimeout = function(networktimeout) {
    if (retrywaittime) kony.sdk.mvvm.sync.networktimeout = networktimeout
};
kony.sdk.mvvm.util.sync.getNetworktimeout = function(networktimeout) {
    return kony.sdk.mvvm.sync.networktimeout
};
kony.sdk.mvvm.util.customservice = function(httpcustomrequest, customservicename, customserviceCallback, customserviceErrorCallback) {
    var dataprovider = kony.sdk.mvvm.KonyApplicationContext.getDataProvider();
    if (dataprovider !== null && dataprovider !== undefined) {
        if (dataprovider instanceof kony.sdk.mvvm.dataRestProvider || dataprovider instanceof kony.sdk.mvvm.konySyncProvider) {
            dataprovider.customservice(httpcustomrequest, customservicename, customserviceCallback, customserviceErrorCallback)
        } else {
            customserviceErrorCallback(new kony.sdk.mvvm.Exception(kony.sdk.mvvm.ExceptionCode.CD_ERROR_INVALID_DATAPROVIDER_TYPE, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_INVALID_DATAPROVIDER_TYPE))
        }
    } else {
        customserviceErrorCallback(new kony.sdk.mvvm.Exception(kony.sdk.mvvm.ExceptionCode.CD_ERROR_DATAPROVIDER_NOT_INTIALIZED, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_DATAPROVIDER_NOT_INTIALIZED))
    }
};
kony.sdk.mvvm.util.cloneObject = function(obj) {
    var clonedObj = {};
    for (var attrname in obj) {
        clonedObj[attrname] = obj[attrname]
    }
    return clonedObj
};
kony.sdk.mvvm.util.StringBuffer = Class({
    constructor: function() {
        this.buffer = []
    },
    append: function(string) {
        this.buffer.push(string);
        return this
    },
    toString: function() {
        return this.buffer.join("")
    }
});
kony.sdk.mvvm.isNetworkAvailabile = function() {
    if (typeof networkStatus != "undefined" && networkStatus == "offline") return false;
    if (kony.net.isNetworkAvailable(constants.NETWORK_TYPE_ANY)) return true;
    else return false
};
kony.sdk.mvvm.getDeviceLocale = function() {
    var DeviceLocale = kony.i18n.getCurrentDeviceLocale();
    if (kony.sdk.mvvm.Utils.isIphone() || kony.sdk.mvvm.Utils.isIpad()) return DeviceLocale;
    var tempLocale = DeviceLocale.language;
    if (DeviceLocale.hasOwnProperty("country") && DeviceLocale["country"] != "") tempLocale += "_" + DeviceLocale["country"];
    return tempLocale
};
kony.sdk.mvvm.searchInfo = Class({
    constructor: function(widgetid, searchconfig) {
        if (typeof widgetid == "undefined") {
            throw new kony.sdk.mvvm.Exception(kony.sdk.mvvm.ExceptionCode.CD_ERROR_WIDGETID_NOT_DEFINED, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_WIDGETID_NOT_DEFINED)
        }
        this.widgetid = widgetid;
        searchconfig = searchconfig || {};
        this.input = searchconfig["inputfield"];
        this.event = searchconfig["event"];
        this.trigger = searchconfig["trigger"];
        this.query = searchconfig["query"]
    },
    getEvent: function() {
        return this.event
    },
    getListnerWidget: function() {
        return this.trigger
    },
    getSourceWidget: function() {
        return this.input
    },
    getQueryString: function() {
        return this.query
    },
    getWidgetId: function() {
        return this.widgetid
    }
});