/** 
 *  @author     Abhishek Singh
 *  @category   Business Logic.	
 *  @desc       Contains the functions which are related to form frmTeamView.
 *  @ © 2016    Kony Inc. 
 */
kony = kony || {};
kony.apps = kony.apps || {};
kony.apps.coe = kony.apps.coe || {};
kony.apps.coe.ess = kony.apps.coe.ess || {};
kony.apps.coe.ess.myLeave = kony.apps.coe.ess.myLeave || {};

//%Region - Constructor
kony.apps.coe.ess.myLeave.TeamView = function() {

};
/**
 * This method modifies the segment data depending on isFirstTimeDataFormatting.
 * @memberof TeamView
 * @param {JSON Array} data 
 * @returns {JSON Array} formatted Data
 */
kony.apps.coe.ess.myLeave.TeamView.prototype.generateFormattedData = function(data, intervalStartDate, intervalEndDate, isFirstTimeDataFormatting, callbackres) {
    try {
        kony.print("---- generateFormattedData starts ----");
        kony.print("---- Data received :: " + JSON.stringify(data));
        kony.print("isFirstTimeDataFormatting" + JSON.stringify(isFirstTimeDataFormatting));
        var resultData = [];
        var callback = function(tempData, intervalStartDate, intervalEndDate, nonWorkingDays, callbackres, res) {
            kony.print("Response recieved in callback :: " + JSON.stringify(res));
            var data = JSON.parse(JSON.stringify(res));
            var resultArrayData = ["withoutbar.png", "withoutbar.png", "withoutbar.png", "withoutbar.png", "withoutbar.png", "withoutbar.png", "withoutbar.png"];
          	if (typeof data == "undefined" && data === null && data.length === null && data.length <= 0) {
                this.tempData.imgDay1 = resultArrayData[0];
                this.tempData.imgDay2 = resultArrayData[1];
                this.tempData.imgDay3 = resultArrayData[2];
                this.tempData.imgDay4 = resultArrayData[3];
                this.tempData.imgDay5 = resultArrayData[4];
                this.tempData.imgDay6 = resultArrayData[5];
                this.tempData.imgDay7 = resultArrayData[6];
            } else {
                var i = 0;
                for (var date = intervalStartDate; date <= intervalEndDate; date = new Date(Date.parse(date) + 86400000)) {
                    data = JSON.parse(JSON.stringify(res));
                  	var currentDateString = kony.apps.coe.ess.myLeave.applyLeave.submitLeave.convertdateObjToDbString(date);
                    if(currentDateString.substring(4) == (tempData.date_of_birth.toString()).substring(4)){
                      if (this.parent.isDateFoundInBetween(date, data)) {
                        resultArrayData[i] = "cake_bar.png";
                      }
                      else {
                        resultArrayData[i] = "birthday_cake3.png";
                      }
                    }
                  	else{
                      if (this.parent.isDateFoundinArray(date, nonWorkingDays)) {
                          resultArrayData[i] = "withoutbar.png";
                      } else if (this.parent.isDateFoundInBetween(date, data)) {
                          resultArrayData[i] = "withbar.png";
                      } else {
                          resultArrayData[i] = "withoutbar.png";
                      }
                    }
                    i++;
                }
                this.tempData.imgDay1 = resultArrayData[0];
                this.tempData.imgDay2 = resultArrayData[1];
                this.tempData.imgDay3 = resultArrayData[2];
                this.tempData.imgDay4 = resultArrayData[3];
                this.tempData.imgDay5 = resultArrayData[4];
                this.tempData.imgDay6 = resultArrayData[5];
                this.tempData.imgDay7 = resultArrayData[6];
            }
            if (callbackres !== null && callbackres !== undefined && typeof(callbackres) === "function") {
                callbackres();
            }
            kony.print("ResultArray data :: " + JSON.stringify(resultArrayData));
        };
        var tempData = {};
        if (typeof data != "undefined" && data !== null && data.length !== null && data.length > 0) {
            if (isFirstTimeDataFormatting === true) {
                kony.print("---- Inside If of generateFormattedData ----");
                for (var index = 0; index < data.length; index++) {
                    tempData = {};
                    tempData.first_name = data[index].First_Name + "";
                    tempData.middle_name = data[index].Middle_Name + "";
                    tempData.last_name = data[index].Last_Name + "";
                    tempData.user_id = data[index].Id;
                    tempData.manager_id = data[index].Manager_Id;
                  	tempData.date_of_birth = data[index].Date_of_birth;
                    if (data[index].Media_Id !== null && data[index].Media_Id !== "" && data[index].Media_Id !== undefined && data[index].Media_Id.toLowerCase() !== "null") {
                        tempData.media_id = data[index].Media_Id;
                    } else {
                        tempData.media_id = "";
                    }

                    tempData.group_id = data[index].group_id;
                    //@TODO fetch profile pic dynamically     
                    tempData.emp_profile_pic = "adduserpic.png";
                    tempData.lblInitials = tempData.first_name.charAt(0).toUpperCase() + tempData.last_name.charAt(0).toUpperCase();
                    tempData.full_name = this.formatEmployeeName(tempData.first_name, tempData.middle_name, tempData.last_name);
                    tempData.flxProfileImage = {
                        "isVisible": false
                    };
                    tempData.flxInitials = {
                        "isVisible": true
                    };

                    this.generateNonWorkingDays(intervalStartDate, intervalEndDate, function(res) {
                        var nonWorkingDays = res;
                        var tempBindingFunc;
                        if (this.index == (data.length - 1)) {
                            tempBindingFunc = callback.bind(this, this.tempData, intervalStartDate, intervalEndDate, nonWorkingDays, callbackres.bind(this, resultData));
                        } else {
                            tempBindingFunc = callback.bind(this, this.tempData, intervalStartDate, intervalEndDate, nonWorkingDays, undefined);
                        }
                        this.parent.generateImageValue(intervalStartDate, intervalEndDate, data[this.index].Id, tempBindingFunc);
                    }.bind({
                        "parent": this,
                        "index": index,
                        "tempData": tempData
                    }));

                    resultData.push(tempData);
                }
                return resultData;
            } else {
                kony.print("----Inside else of generateFormattedData ----");
                for (var index1 = 0; index1 < data.length; index1++) {
                    this.generateNonWorkingDays(intervalStartDate, intervalEndDate, function(res) {
                        var nonWorkingDays = res;
                        var tempBindingFunc1;
                        if (this.index == (data.length - 1)) {
                            tempBindingFunc1 = callback.bind(this, data[this.index], intervalStartDate, intervalEndDate, nonWorkingDays, callbackres.bind(this, data));
                        } else {
                            tempBindingFunc1 = callback.bind(this, data[this.index], intervalStartDate, intervalEndDate, nonWorkingDays, undefined);
                        }
                        this.parent.generateImageValue(intervalStartDate, intervalEndDate, data[this.index].user_id, tempBindingFunc1);
                    }.bind({
                        "parent": this,
                        "index": index1,
                        "tempData": data[index1]
                    }));

                }

                return data;
            }
        }

    } catch (e) {
        kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
        handleError(e);
    }
};

/**
 * This method checks whether the given date object found in the Array containing several date object.
 * @memberof TeamView
 * @param {DATE object}-date, {JSON Array}-dateArray
 * @returns Boolean
 */
kony.apps.coe.ess.myLeave.TeamView.prototype.isDateFoundinArray = function(date, dateArray) {
    kony.print("---- Inside isDateFoundinArray ----");
    try {
        if (typeof dateArray != "undefined" && dateArray !== null && dateArray.length !== null && dateArray.length > 0) {
            if (typeof date == "object") {
                for (var i = 0; i < dateArray.length; i++) {
                    if (date.getTime() === dateArray[i].getTime()) {
                        return true;
                    }
                }
                return false;
            } else {
                return false;
            }
        } else {
            return false;
        }
    } catch (exception) {
        kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
        handleError(exception);
    }
};

/**
 * This method checks whether the given date object found between the Array containing startdate and endDate Interval date object.
 * @memberof TeamView
 * @param {DATE object}-date, {JSON Array}-dateArray
 * @returns Boolean
 */
kony.apps.coe.ess.myLeave.TeamView.prototype.isDateFoundInBetween = function(date, dateArray) {
    kony.print("---- Inside isDateFoundInBetween ----");
    try {
        if (typeof dateArray != "undefined" && dateArray !== null && dateArray.length !== null && dateArray.length > 0) {
            if (typeof date == "object") {
                for (var i = 0; i < dateArray.length; i++) {
                    dateArray[i].start_date = this.convertStringDateDbToDateObject(dateArray[i].start_date);
                    dateArray[i].end_date = this.convertStringDateDbToDateObject(dateArray[i].end_date);
                    if (dateArray[i].start_date.getTime() <= date.getTime() && dateArray[i].start_date.getTime() >= date.getTime()) {
                        return true;
                    }
                }
                return false;
            } else {
                return false;
            }
        } else {
            return false;
        }
    } catch (exception) {
        kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
        handleError(exception);
    }
};

/**
* This method generates the images to be sssigned to TeamData
* @memberof TeamView
* @param {Date Object} intervalStartDate - First Date
		 {Date Object} intervalEndDate - Second Date
         {String}user_id
* @returns 
*/
kony.apps.coe.ess.myLeave.TeamView.prototype.generateImageValue = function(intervalStartDate, intervalEndDate, user_id, callback) {
    kony.print("---- Inside generateImageValue ----");
    try {
        var dayIntervalStartDate = intervalStartDate.getDate();
        if (dayIntervalStartDate < 10) {
            dayIntervalStartDate = ("0" + dayIntervalStartDate).toString().trim(0, 2);
        } else {
            dayIntervalStartDate = dayIntervalStartDate.toString().trim(0, 2);
        }

        var monthIntervalStartDate = intervalStartDate.getMonth() + 1;
        if (monthIntervalStartDate < 10) {
            monthIntervalStartDate = ("0" + monthIntervalStartDate).toString().trim(0, 2);
        } else {
            monthIntervalStartDate = monthIntervalStartDate.toString().trim(0, 2);
        }

        var yearIntervalStartDate = intervalStartDate.getFullYear().toString().trim(0, 4);

        var dayIntervalEndDate = intervalEndDate.getDate();
        if (dayIntervalEndDate < 10) {
            dayIntervalEndDate = ("0" + dayIntervalEndDate).toString().trim(0, 2);
        } else {
            dayIntervalEndDate = dayIntervalEndDate.toString().trim(0, 2);
        }

        var monthIntervalEndDate = intervalEndDate.getMonth() + 1;
        if (monthIntervalEndDate < 10) {
            monthIntervalEndDate = ("0" + monthIntervalEndDate).toString().trim(0, 2);
        } else {
            monthIntervalEndDate = monthIntervalEndDate.toString().trim(0, 2);
        }

        var yearIntervalEndDate = intervalEndDate.getFullYear().toString().trim(0, 4);
        var sqlQuery = "select start_date,end_date from leave where employee_id = '" + user_id + "' and status_id = 0" +
            " and ((start_date between '" + yearIntervalStartDate + monthIntervalStartDate + dayIntervalStartDate +
            "' AND '" + yearIntervalEndDate + monthIntervalEndDate + dayIntervalEndDate +
            "') OR (end_date between '" + yearIntervalStartDate + monthIntervalStartDate + dayIntervalStartDate +
            "' AND '" + yearIntervalEndDate + monthIntervalEndDate + dayIntervalEndDate + "'))";
        kony.sync.single_select_execute(kony.sync.getDBName(), sqlQuery, null, callback, function(err) {
            handleError(err);
        }, false);

    } catch (e) {
        kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
        handleError(e);
    }
};

/**
* This method fetch the non working days of an employee
* @memberof TeamView
* @param {Date Object} intervalStartDate - First Date
		 {Date Object} intervalEndDate - Second Date
         {String}user_id
* @returns 
*/
kony.apps.coe.ess.myLeave.TeamView.prototype.generateNonWorkingDays = function(intervalStartDate, intervalEndDate, callback) {
    kony.print("---- Inside generateNonWorkingDays ----");
    try {
        var dayIntervalStartDate = intervalStartDate.getDate();
        if (dayIntervalStartDate < 10) {
            dayIntervalStartDate = ("0" + dayIntervalStartDate).toString().trim(0, 2);
        } else {
            dayIntervalStartDate = dayIntervalStartDate.toString().trim(0, 2);
        }

        var monthIntervalStartDate = intervalStartDate.getMonth() + 1;
        if (monthIntervalStartDate < 10) {
            monthIntervalStartDate = ("0" + monthIntervalStartDate).toString().trim(0, 2);
        } else {
            monthIntervalStartDate = monthIntervalStartDate.toString().trim(0, 2);
        }

        var yearIntervalStartDate = intervalStartDate.getFullYear().toString().trim(0, 4);

        var dayIntervalEndDate = intervalEndDate.getDate();
        if (dayIntervalEndDate < 10) {
            dayIntervalEndDate = ("0" + dayIntervalEndDate).toString().trim(0, 2);
        } else {
            dayIntervalEndDate = dayIntervalEndDate.toString().trim(0, 2);
        }

        var monthIntervalEndDate = intervalEndDate.getMonth() + 1;
        if (monthIntervalEndDate < 10) {
            monthIntervalEndDate = ("0" + monthIntervalEndDate).toString().trim(0, 2);
        } else {
            monthIntervalEndDate = monthIntervalEndDate.toString().trim(0, 2);
        }

        var yearIntervalEndDate = intervalEndDate.getFullYear().toString().trim(0, 4);
        var sqlQuery = "select Holiday_Date as holiday_date from Holiday where Type=3 and Holiday_Date between '" + yearIntervalStartDate + monthIntervalStartDate + dayIntervalStartDate +
            "' AND '" + yearIntervalEndDate + monthIntervalEndDate + dayIntervalEndDate + "'";
        kony.sync.single_select_execute(kony.sync.getDBName(), sqlQuery, null, function(response) {
            if (typeof response != "undefined" && response !== null && response.length !== null && response.length > 0) {
                kony.print("---- Inside success Callback of single execute query of generateNonWorkingDays");
                kony.print("Response of generateNonWorkingDays" + JSON.stringify(response));
                var nonWorkingDays = [];
                for (var i = 0; i < response.length; i++) {
                    var date = this.convertStringDateDbToDateObject(response[i].holiday_date);
                    nonWorkingDays.push(date);
                }
                callback(nonWorkingDays);
            }
            //additional code
            else{
             callback(nonWorkingDays);
           }
        }.bind(this), function(err) {
            kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
            handleError(err);
        }, false);

    } catch (e) {
        kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
        handleError(e);
    }
};

/**
 * This method binds the data to segment
 * @memberof TeamView
 * @param {JSON Array} data 
 * @returns null
 */
kony.apps.coe.ess.myLeave.TeamView.prototype.mapAndBindData = function(data) {
    kony.print("---- Inside mapAndBindData ----");
    kony.print("Data value received ::" + JSON.stringify(data));
    try {
        data = (new kony.apps.coe.ess.myLeave.TeamViewUI()).addAlternateSkinToSegment(data, "sknFlxFFFFFF100", "sknFlxFAFAFA100");
        frmTeamView.segTeamView.widgetDataMap = {
            "imgEmpPic": "imgEmpPic",
            "lblInitials": "lblInitials",
            "lblEmpName": "full_name",
            "imgDay1": "imgDay1",
            "imgDay2": "imgDay2",
            "imgDay3": "imgDay3",
            "imgDay4": "imgDay4",
            "imgDay5": "imgDay5",
            "imgDay6": "imgDay6",
            "imgDay7": "imgDay7",
            "flxImage": "flxImage",
            "flxProfileImage": "flxProfileImage",
            "flxInitials": "flxInitials",
            "media_id": "media_id"
        };
        frmTeamView.segTeamView.setData(data);
        frmTeamView.forceLayout();
    } catch (e) {
        kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
        handleError(e);
    }
};

/**
* This method Changes the lblMonth text depending on the week interval selected
* @memberof TeamView
* @param {Date Object} intervalStartDate - First Date
		 {Date Object} intervalEndDate - Second Date
* @returns 
*/
kony.apps.coe.ess.myLeave.TeamView.prototype.changeMonthText = function(intervalStartDate, intervalEndDate) {
    try {
        kony.print("---- Inside changeMonthText ----");
        var monthName = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        if (intervalStartDate.getMonth() === intervalEndDate.getMonth()) {
            frmTeamView.lblMonth.text = monthName[intervalEndDate.getMonth()] + ", " + intervalEndDate.getFullYear();
        } else {
            if (intervalStartDate.getFullYear() === intervalEndDate.getFullYear()) {
                frmTeamView.lblMonth.text = monthName[intervalStartDate.getMonth()] + "-" + monthName[intervalEndDate.getMonth()] + ", " + intervalStartDate.getFullYear();
            } else {
                frmTeamView.lblMonth.text = monthName[intervalStartDate.getMonth()] + "-" + monthName[intervalEndDate.getMonth()] + ", " + intervalStartDate.getFullYear() + "-" + intervalEndDate.getFullYear()
                    .toString()
                    .slice(2, 4);
            }
        }
        return;
    } catch (e) {
        kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
        handleError(e);
    }
};


/**
* This method calculate number of days between two dates.
* @memberof TeamView
* @param {Date Object} firstDate - First Date
		 {Date Object} secondDate - Second Date
* @returns {Number} days
*/
kony.apps.coe.ess.myLeave.TeamView.prototype.calculateDateDifferenceinDays = function(firstDate, secondDate) {
    try {
        var ONE_DAY = 24 * 60 * 60 * 1000;
        firstDate = new Date(firstDate);
        secondDate = new Date(secondDate);
        var date1_ms = firstDate.getTime();
        var date2_ms = secondDate.getTime();
        var difference_ms = date1_ms - date2_ms;
        // Convert back to days and return
        return Math.round(difference_ms / ONE_DAY);
    } catch (e) {
        handleError(e);
    }

};


/**
 * This method defines the action to be invoked on Individual Button Click
 * @memberof TeamView
 * @param none
 * @returns null
 */
kony.apps.coe.ess.myLeave.TeamView.prototype.onClickIndividualView = function() {
    kony.print("---- Inside onClickIndividualView ----");
    frmLeaveHome.show();
    return;
};

/**
 * This method fetch the images from backend.
 * @memberof TeamView
 * @param None
 * @returns null
 */
kony.apps.coe.ess.myLeave.TeamView.prototype.fetchImageValueByMediaId = function() {
    try {
        kony.print("---- Inside fetchImageValueByMediaId ----");
        var data = frmTeamView.segTeamView.data;
        if (typeof data != "undefined" && data !== null && data.length !== null && data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                if (data[i].media_id !== "") {
                    (new kony.apps.coe.ess.myLeave.media()).fetchEmployeeImage({
                        "mediaName": data[i].media_id
                    }, this.fetchImageValueByMediaIdSuccessCallback.bind(this, data[i].media_id), this.fetchImageValueByMediaIdErrorCallBack);
                }
            }
        }
    } catch (e) {
        handleError(e);
    }
};

/**
 * This method is the successcallback of fetchImageValueByMediaId
 * @memberof TeamView
 * @param None
 * @returns null
 */
kony.apps.coe.ess.myLeave.TeamView.prototype.fetchImageValueByMediaIdSuccessCallback = function(media_id, response) {
    try {

        kony.print("---- Inside fetchImageValueByMediaIdSuccessCallback ----");
        if (response !== null && response !== "") {
            if (response.length > 0 && response.length <= kony.apps.coe.ess.appconfig.maxImageSizeLimit) {
                var data = frmTeamView.segTeamView.data;
                if (typeof data != "undefined" && data !== null && data.length !== null && data.length > 0) {
                    for (var i = 0; i < data.length; i++) {
                        if (media_id == data[i].media_id) {
                            var rawBytes = kony.convertToRawBytes(response);
                            userAgent = kony.os.userAgent();
                            if (userAgent === "iPhone" || userAgent === "iPad") {

                                data[i].imgEmpPic = {
                                    "base64": response
                                };
                            } else {
                                data[i].imgEmpPic = {
                                    "rawBytes": rawBytes
                                };
                            }

                            data[i].flxProfileImage = {
                                "isVisible": true
                            };
                            data[i].flxInitials = {
                                "isVisible": false
                            };

                            break;
                        }
                    }
                    frmTeamView.segTeamView.setData(data);
                    frmTeamView.forceLayout();
                }
            }
        }
    } catch (e) {
        handleError(e);
    }
};


/**
 * This method is the errorcallback of fetchImageValueByMediaId
 * @memberof TeamView
 * @param None
 * @returns null
 */
kony.apps.coe.ess.myLeave.TeamView.prototype.fetchImageValueByMediaIdErrorCallBack = function(error) {
    if (error.opstatus !== null && error.opstatus !== undefined) {
        if (error.opstatus == 20005) {
            kony.print("---------Media File not found " + JSON.stringify(error));
        } else {
            kony.print("---------Error in Json File " + JSON.stringify(error));
        }
    }
};


/**
 * This method processes the string to generate the dateObject
 * @memberof TeamView
 * @param {String} date
 * @returns {Object} - processed data
 */
kony.apps.coe.ess.myLeave.TeamView.prototype.convertStringDateDbToDateObject = function(date) {
    kony.print("---- Inside convertStringDateDbToDateObject ----");
    try {
        var monthsJSON = Date.getMonthMapNumberToMonth;
        var resultDate = (new Date(date.substring(0, 4), date.substring(4, 6) - 1, date.substring(6, 8)));
        return resultDate;
    } catch (e) {
        handleError(e);
    }
};

/**
 * This method processes name of the employee
 * @memberof TeamView
 * @param {String} firstName, {String} middleName, {String} lastName
 * @returns {String} - processed Full Name
 */
kony.apps.coe.ess.myLeave.TeamView.prototype.formatEmployeeName = function(firstName, middleName, lastName) {
    try {
        kony.print("---- Inside formatEmployeeName ----");
        var tempChar = "";
        if (firstName !== null && typeof firstName == "string" && firstName.length > 0) {
            tempChar = firstName.slice(0, 1).toUpperCase();
            firstName = tempChar + firstName.slice(1).toLowerCase();
        } else {
            firstName = "";
        }
        if (middleName !== null && typeof middleName == "string" && middleName.length > 0) {
            tempChar = middleName.slice(0, 1).toUpperCase();
            middleName = " " + tempChar + middleName.slice(1).toLowerCase();
        } else {
            middleName = "";
        }
        if (lastName !== null && typeof lastName == "string" && lastName.length > 0) {
            tempChar = lastName.slice(0, 1).toUpperCase();
            lastName = " " + tempChar + lastName.slice(1).toLowerCase();
        } else {
            lastName = "";
        }
        var fullName = firstName + middleName + lastName;
        return fullName;
    } catch (e) {
        handleError(e);
    }
};