/** 
 *  @author     Shantam Agarwal
 *  @category   Business Logic. 
 *  @desc       Contains UI related code for frmCalendarTeamView
 *  @ © 2016    Kony Inc. 
 */
kony = kony || {};
kony.apps = kony.apps || {};
kony.apps.coe = kony.apps.coe || {};
kony.apps.coe.ess = kony.apps.coe.ess || {};
kony.apps.coe.ess.myLeave = kony.apps.coe.ess.myLeave || {};
kony.apps.coe.ess.myLeave.frmCalendarTeamView = kony.apps.coe.ess.myLeave.frmCalendarTeamView || {};
//Stores selected employees here for filtering
kony.apps.coe.ess.myLeave.frmCalendarTeamView.selectedEmployee = [];
/**
 * @memberof       frmCalendarTeamView
 * @param          None.
 * @return         None.
 * @description    currently holds and populates dummy data. Will Remove later.
 */
kony.apps.coe.ess.myLeave.frmCalendarTeamView.populateData = function(employeeData, leaveData, holidayData, dateParam, oldEmpDataObj, isFilterActive){
    if(!employeeData)
        return;
    if(!oldEmpDataObj){
        var empDataObj = new kony.apps.coe.ess.myLeave.frmCalendarTeamView.employeeData(employeeData);
        empDataObj.initialize();
        empDataObj.insertLeaveData(leaveData, dateParam);
    }else{
        empDataObj = oldEmpDataObj;
        empDataObj.insertLeaveData(leaveData, dateParam);
    }
    var currDate = dateParam;
    var monthStart = new Date(Date.UTC(currDate.getFullYear(),currDate.getMonth(), 1));
    var monthEnd = new Date(Date.UTC(currDate.getFullYear(),currDate.getMonth()+1, 0));
    var monthNum = currDate.getMonth() +1;
    var monthLength = monthEnd.getDate();
    var monthName = Date.getMonthMapNumberToMonth[(monthNum>9 ? monthNum.toString() : "0"+monthNum)];
    frmCalendarTeamViewDW.lblMonthName.text = monthName +" "+ new Date().getFullYear();
    kony.apps.coe.ess.myLeave.frmCalendarTeamView.setWidgetDataMaps();
    var successCallback = function(segData){
        kony.apps.coe.ess.myLeave.frmCalendarTeamView.populateLeavesAndHolidays(segData, dateParam, holidayData);
    }
    kony.apps.coe.ess.myLeave.frmCalendarTeamView.generateSegment(empDataObj, leaveData, holidayData, dateParam, successCallback);
    kony.apps.coe.ess.myLeave.frmCalendarTeamView.assignActions(leaveData, employeeData, holidayData, dateParam, empDataObj, isFilterActive);
    if(isFilterActive !== true)
        kony.apps.coe.ess.myLeave.frmCalendarTeamView.generateEmployeeSearch(empDataObj);
    kony.apps.coe.ess.myLeave.frmCalendarTeamView.closeTeamSearch();
}

/**
 * @memberof       frmCalendarTeamView
 * @param          None.
 * @return         None.
 * @description    populates the leaves and holidays in the data
 */
kony.apps.coe.ess.myLeave.frmCalendarTeamView.populateLeavesAndHolidays = function(segData, dateParam, holidayData){
    var segmentData = segData;
    function successCallback(newSegmentData){
        kony.apps.coe.ess.myLeave.frmCalendarTeamView.populateHolidays(newSegmentData, holidayData, dateParam);
    }
    kony.apps.coe.ess.myLeave.frmCalendarTeamView.markWeekends(segmentData, dateParam, successCallback);
}


/**
 * @memberof       frmCalendarTeamView
 * @param          None.
 * @return         None.
 * @description    Changes skins of weekends
 */
kony.apps.coe.ess.myLeave.frmCalendarTeamView.markWeekends = function(segmentData, dateParam, successCallback){
    var monthStart = new Date(Date.UTC(dateParam.getFullYear(),dateParam.getMonth(), 1));
    var monthEnd = new Date(Date.UTC(dateParam.getFullYear(),dateParam.getMonth()+1, 0));
    var monthNum = dateParam.getMonth() +1;
    var monthLength = monthEnd.getDate();
    for(var i=1;i<=monthLength;i++){
        monthEnd.setDate(i);
        for(var j=0; j<segmentData[0][1].length; j++){
            if(monthEnd.getDay() === 0 || monthEnd.getDay() === 6){
                //change skin to weekend
                segmentData[0][1][j]["lblDataDay"+i] = {"skin": "sknLblTeamViewWeekendDW"};
            }
        }
    }
    successCallback(segmentData);
}


/**
 * @memberof       frmCalendarTeamView
 * @param          None.
 * @return         None.
 * @description    Marks holidays in data
 */
kony.apps.coe.ess.myLeave.frmCalendarTeamView.populateHolidays = function(segmentData, holidayDates, dateParam){
    var weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var holidayCount = 0;
    var monthEnd = new Date(Date.UTC(dateParam.getFullYear(),dateParam.getMonth()+1, 0));
    var monthLength = monthEnd.getDate();
    var holidayOffsets = [];
    if(monthLength === 31){
        holidayOffsets[0] = 2.795;
        holidayOffsets[1] = 2.666;
    }else{
        holidayOffsets[0] = 2.881;
        holidayOffsets[1] = 2.795;
    }
    for(var i=1; i<32; i++){
        if(typeof frmCalendarTeamViewDW[i+"flxHolidayMark"] !== "undefined"){
            frmCalendarTeamViewDW.remove(frmCalendarTeamViewDW[i+"flxHolidayMark"]);
        }
    }

    frmCalendarTeamViewDW.flxHolidayMark.setVisibility(false);
    for(var i = 0 ; i<holidayDates.length; i++){
        if(holidayDates[i].Holiday_Date.slice(0,4) === dateParam.getFullYear().toString() && parseInt(holidayDates[i].Holiday_Date.slice(4,6)) === dateParam.getMonth()+1 && holidayDates[i].Type === "1"){
          for(var j=0; j<segmentData[0][1].length; j++){
              segmentData[0][1][j]["lblDataDay"+parseInt(holidayDates[i].Holiday_Date.slice(6,8))] = {"skin":"sknLblTeamViewHolidayDW"};
          }
          holidayCount++;

          segmentData[0][0]["flxDay"+parseInt(holidayDates[i].Holiday_Date.slice(6,8))] = {"skin":"sknFlxBGF6FAFCOp100DW"};
          dateParam.setDate(parseInt(holidayDates[i].Holiday_Date.slice(6,8)));
          segmentData[0][0]["lblDay"+parseInt(holidayDates[i].Holiday_Date.slice(6,8))] = {"skin": "sknLblF33C6F2S12pxRomanDW", "text":weekdays[dateParam.getDay()].slice(0,2) };
          segmentData[0][0]["lblDate"+parseInt(holidayDates[i].Holiday_Date.slice(6,8))] = {"skin": "sknLblF33C6F2S12pxRomanDW", "text":parseInt(holidayDates[i].Holiday_Date.slice(6,8))};
          var dateFloat = parseFloat(parseInt(holidayDates[i].Holiday_Date.slice(6,8)));
          // frmCalendarTeamViewDW.flxHolidayMark.left = (16+ ((dateFloat-1)*2.74)).toString() + "%";
          var newHolidayMarkFlex = frmCalendarTeamViewDW.flxHolidayMark.clone(holidayCount.toString());
          if(monthLength === 31){
            if(dateFloat <= 26){
                newHolidayMarkFlex.centerX = (13.8 + (holidayOffsets[0])* (dateFloat-1) + (holidayOffsets[0]/2) ).toString() + "%";
            }else{
                newHolidayMarkFlex.centerX = (13.8 + (holidayOffsets[0])* 26 + (holidayOffsets[1])* (dateFloat-1) + (holidayOffsets[1]/2) ).toString() + "%";
            }
          }else{
            if(dateFloat <= 25){
                newHolidayMarkFlex.centerX = (13.8 + (holidayOffsets[0])* (dateFloat-1) + (holidayOffsets[0]/2) ).toString() + "%";
            }else{
                newHolidayMarkFlex.centerX = (13.8 + (holidayOffsets[0])* 26 + (holidayOffsets[1])* (dateFloat-1) + (holidayOffsets[1]/2) ).toString() + "%";
            }
          }
          newHolidayMarkFlex.setVisibility(true);
          newHolidayMarkFlex.zIndex = 10;
          frmCalendarTeamViewDW.flxTeamCalendar.add(newHolidayMarkFlex);
          frmCalendarTeamViewDW[holidayCount + "lblHolidayText"].text = kony.apps.coe.ess.myLeave.frmCalendarTeamView.getHolidayNameWithNewLine(holidayDates[i].Name);
      }
      
    }
    frmCalendarTeamViewDW.segTeamView.setData(segmentData);
    // callback(segmentData);
}
kony.apps.coe.ess.myLeave.frmCalendarTeamView.getHolidayNameWithNewLine = function(holidayName){
    for(var i=1; i<holidayName.length; i++){
      holidayName = holidayName.slice(0,i) + "\n" + holidayName.slice(i);
      i++;
    }
    return holidayName;
}

/**
 * @memberof       frmCalendarTeamView
 * @param          None.
 * @return         None.
 * @description    populates the leaves in the data
 */
kony.apps.coe.ess.myLeave.frmCalendarTeamView.populateLeaves = function(dateParam, empDataObj, leaveData, segData){
  var i = 0, j=0;
    for(i =0; i<leaveDates.length-1; i++){
        for(j=0; j<leaveDates[i].length; j++){
            segmentData[0][1][i]["lblDataDay"+leaveDates[i][j]] = {"skin": "sknLblTeamViewLeaveDW"};
        }
    }
    frmCalendarTeamViewDW.segTeamView.setData(segmentData);
    frmCalendarTeamViewDW.forceLayout();
}

/**
 * @memberof       frmCalendarTeamView
 * @param          None.
 * @return         None.
 * @description    generates the employee search flex
 */
kony.apps.coe.ess.myLeave.frmCalendarTeamView.generateEmployeeSearch = function(employeeDataObj){
    var employeeData = employeeDataObj.getAllFilteredEmployees();
    var currentEmployeeData = employeeDataObj.getEmployeeFromId(kony.apps.coe.ess.globalVariables.employeeId);
    if(typeof frmCalendarTeamViewDW["1lblEmpName"] !== "undefined")
        return;
    for(var i = 1; i<employeeData.length; i++){
        //limit to 15
        if(i>15)
            break;
        var newTileFlex = frmCalendarTeamViewDW.flxEmpTile.clone(i);
        var imgName = i + "imgEmpPic";
        var lblName = i + "lblEmpName";
        var checkImgName = i + "imgCheckMark";
        newTileFlex.onClick = kony.apps.coe.ess.myLeave.frmCalendarTeamView.activateEmployeeFromSearch.bind(this,i, employeeData[i], currentEmployeeData);
        if(i<=5){
            //generate in top row
            frmCalendarTeamViewDW.flxEmpSearchRow1.add(newTileFlex);
        }
        else if(i>5 && i<=10){
            //generate in mid row
            frmCalendarTeamViewDW.flxEmpSearchRow2.add(newTileFlex);
        }
        else if(i>10){
            //generate in bottom row
            frmCalendarTeamViewDW.flxEmpSearchRow3.add(newTileFlex);
        }
        if((employeeData[i].First_Name +" "+ employeeData[i].Last_Name).length < 10)
            frmCalendarTeamViewDW[lblName].text = employeeData[i].First_Name +" "+ employeeData[i].Last_Name;
        else
            frmCalendarTeamViewDW[lblName].text = employeeData[i].First_Name;

        frmCalendarTeamViewDW[imgName].onTouchStart = kony.apps.coe.ess.myLeave.frmCalendarTeamView.activateEmployeeFromSearch.bind(this,i, employeeData[i], currentEmployeeData);
        //ToDo: fetch user profile data
        frmCalendarTeamViewDW[imgName].src = "adduserpic.png";
        
    }
    frmCalendarTeamViewDW.flxEmpSearchRow1.remove(frmCalendarTeamViewDW.flxEmpTile);
    frmCalendarTeamViewDW.forceLayout();
}

/**
 * @memberof       frmCalendarTeamView
 * @param          None.
 * @return         None.
 * @description    Enables employee from search box
 */
kony.apps.coe.ess.myLeave.frmCalendarTeamView.activateEmployeeFromSearch = function(index, selectedEmployeeData, currentEmployeeData){
    if(kony.apps.coe.ess.myLeave.frmCalendarTeamView.selectedEmployee.length === 0){
        kony.apps.coe.ess.myLeave.frmCalendarTeamView.selectedEmployee.push(currentEmployeeData);
    }
    frmCalendarTeamViewDW[index+"imgCheckMark"].setVisibility(true);
    kony.apps.coe.ess.myLeave.frmCalendarTeamView.selectedEmployee.push(selectedEmployeeData);
    frmCalendarTeamViewDW[index+"flxEmpTile"].onClick = kony.apps.coe.ess.myLeave.frmCalendarTeamView.deactivateEmployeeFromSearch.bind(this, index, selectedEmployeeData, currentEmployeeData);
}

/**
 * @memberof       frmCalendarTeamView
 * @param          None.
 * @return         None.
 * @description    disables employee from search box
 */
kony.apps.coe.ess.myLeave.frmCalendarTeamView.deactivateEmployeeFromSearch = function(index, selectedEmployeeData,currentEmployeeData){
    frmCalendarTeamViewDW[index+"imgCheckMark"].setVisibility(false);
    for(var i=0; i<kony.apps.coe.ess.myLeave.frmCalendarTeamView.selectedEmployee.length; i++){
        if(selectedEmployeeData.Id === kony.apps.coe.ess.myLeave.frmCalendarTeamView.selectedEmployee[i].Id){
            kony.apps.coe.ess.myLeave.frmCalendarTeamView.selectedEmployee.splice(i,1);
        }
    }
    if(kony.apps.coe.ess.myLeave.frmCalendarTeamView.selectedEmployee.length === 1){
        kony.apps.coe.ess.myLeave.frmCalendarTeamView.selectedEmployee.splice(0,1);
    }
    frmCalendarTeamViewDW[index+"flxEmpTile"].onClick = kony.apps.coe.ess.myLeave.frmCalendarTeamView.activateEmployeeFromSearch.bind(this, index, selectedEmployeeData, currentEmployeeData);
}


/**
 * @memberof       frmCalendarTeamView
 * @param          None.
 * @return         None.
 * @description    Show employee search flex
 */
kony.apps.coe.ess.myLeave.frmCalendarTeamView.expandTeamSearch = function(){
    frmCalendarTeamViewDW.flxEmpSearch.width = "466dp";
    frmCalendarTeamViewDW.tBoxEmpSearch.setVisibility(true);
    frmCalendarTeamViewDW.flxEmployeeSearchPopup.setVisibility(true);
    frmCalendarTeamViewDW.forceLayout();
}

/**
 * @memberof       frmCalendarTeamView
 * @param          None.
 * @return         None.
 * @description    Close employee search flex
 */
kony.apps.coe.ess.myLeave.frmCalendarTeamView.closeTeamSearch = function(){
    frmCalendarTeamViewDW.flxEmpSearch.width = "140dp";
    frmCalendarTeamViewDW.tBoxEmpSearch.setVisibility(false);
    frmCalendarTeamViewDW.flxEmployeeSearchPopup.setVisibility(false);
    frmCalendarTeamViewDW.forceLayout();
}

/**
 * @memberof       frmCalendarTeamView
 * @param          None.
 * @return         None.
 * @description    Set Team view segment data map
 */
kony.apps.coe.ess.myLeave.frmCalendarTeamView.setWidgetDataMaps = function(){
    frmCalendarTeamViewDW.segTeamView.widgetDataMap = {
        "lblDay1": "lblDay1",
        "lblDay2": "lblDay2",
        "lblDay3": "lblDay3",
        "lblDay4": "lblDay4",
        "lblDay5": "lblDay5",
        "lblDay6": "lblDay6",
        "lblDay7": "lblDay7",
        "lblDay8": "lblDay8",
        "lblDay9": "lblDay9",
        "lblDay10": "lblDay10",
        "lblDay11": "lblDay11",
        "lblDay12": "lblDay12",
        "lblDay13": "lblDay13",
        "lblDay14": "lblDay14",
        "lblDay15": "lblDay15",
        "lblDay16": "lblDay16",
        "lblDay17": "lblDay17",
        "lblDay18": "lblDay18",
        "lblDay19": "lblDay19",
        "lblDay20": "lblDay20",
        "lblDay21": "lblDay21",
        "lblDay22": "lblDay22",
        "lblDay23": "lblDay23",
        "lblDay24": "lblDay24",
        "lblDay25": "lblDay25",
        "lblDay26": "lblDay26",
        "lblDay27": "lblDay27",
        "lblDay28": "lblDay28",
        "lblDay29": "lblDay29",
        "lblDay30": "lblDay30",
        "lblDataDay1": "lblDataDay1",
        "lblDataDay2": "lblDataDay2",
        "lblDataDay3": "lblDataDay3",
        "lblDataDay4": "lblDataDay4",
        "lblDataDay5": "lblDataDay5",
        "lblDataDay6": "lblDataDay6",
        "lblDataDay7": "lblDataDay7",
        "lblDataDay8": "lblDataDay8",
        "lblDataDay9": "lblDataDay9",
        "lblDataDay10": "lblDataDay10",
        "lblDataDay11": "lblDataDay11",
        "lblDataDay12": "lblDataDay12",
        "lblDataDay13": "lblDataDay13",
        "lblDataDay14": "lblDataDay14",
        "lblDataDay15": "lblDataDay15",
        "lblDataDay16": "lblDataDay16",
        "lblDataDay17": "lblDataDay17",
        "lblDataDay18": "lblDataDay18",
        "lblDataDay19": "lblDataDay19",
        "lblDataDay20": "lblDataDay20",
        "lblDataDay21": "lblDataDay21",
        "lblDataDay22": "lblDataDay22",
        "lblDataDay23": "lblDataDay23",
        "lblDataDay24": "lblDataDay24",
        "lblDataDay25": "lblDataDay25",
        "lblDataDay26": "lblDataDay26",
        "lblDataDay27": "lblDataDay27",
        "lblDataDay28": "lblDataDay28",
        "lblDataDay29": "lblDataDay29",
        "lblDataDay30": "lblDataDay30",
        "lblDate1": "lblDate1",
        "lblDate2": "lblDate2",
        "lblDate3": "lblDate3",
        "lblDate4": "lblDate4",
        "lblDate5": "lblDate5",
        "lblDate6": "lblDate6",
        "lblDate7": "lblDate7",
        "lblDate8": "lblDate8",
        "lblDate9": "lblDate9",
        "lblDate10": "lblDate10",
        "lblDate11": "lblDate11",
        "lblDate12": "lblDate12",
        "lblDate13": "lblDate13",
        "lblDate14": "lblDate14",
        "lblDate15": "lblDate15",
        "lblDate16": "lblDate16",
        "lblDate17": "lblDate17",
        "lblDate18": "lblDate18",
        "lblDate19": "lblDate19",
        "lblDate20": "lblDate20",
        "lblDate21": "lblDate21",
        "lblDate22": "lblDate22",
        "lblDate23": "lblDate23",
        "lblDate24": "lblDate24",
        "lblDate25": "lblDate25",
        "lblDate26": "lblDate26",
        "lblDate27": "lblDate27",
        "lblDate28": "lblDate28",
        "lblDate29": "lblDate29",
        "lblDate30": "lblDate30", 
        "flxDay1": "flxDay1",
        "flxDay2": "flxDay2",
        "flxDay3": "flxDay3",
        "flxDay4": "flxDay4",
        "flxDay5": "flxDay5",
        "flxDay6": "flxDay6",
        "flxDay7": "flxDay7",
        "flxDay8": "flxDay8",
        "flxDay9": "flxDay9",
        "flxDay10": "flxDay10",
        "flxDay11": "flxDay11",
        "flxDay12": "flxDay12",
        "flxDay13": "flxDay13",
        "flxDay14": "flxDay14",
        "flxDay15": "flxDay15",
        "flxDay16": "flxDay16",
        "flxDay17": "flxDay17",
        "flxDay18": "flxDay18",
        "flxDay19": "flxDay19",
        "flxDay20": "flxDay20",
        "flxDay21": "flxDay21",
        "flxDay22": "flxDay22",
        "flxDay23": "flxDay23",
        "flxDay24": "flxDay24",
        "flxDay25": "flxDay25",
        "flxDay26": "flxDay26",
        "flxDay27": "flxDay27",
        "flxDay28": "flxDay28",
        "flxDay29": "flxDay29",
        "flxDay30": "flxDay30",    
        "imgEmpPic": "imgEmpPic",
        "lblEmpName": "lblEmpName",
        "lblEmployeeHeader":"lblEmployeeHeader",
        "imgDivider": "imgDivider",
        "flximg": "flximg"
    };
}

/**
 * @memberof       frmCalendarTeamView
 * @param          None.
 * @return         None.
 * @description    Beginning point for segment generation
 */
kony.apps.coe.ess.myLeave.frmCalendarTeamView.generateSegment = function(empDataObj, leaveData, holidayData, dateParam, callback){
    // kony.apps.coe.ess.myLeave.frmCalendarTeamView.resetCalendar();
    kony.apps.coe.ess.myLeave.frmCalendarTeamView.generateHeader(dateParam, empDataObj, leaveData, callback, kony.apps.coe.ess.myLeave.frmCalendarTeamView.generateRows);
}

/**
 * @memberof       frmCalendarTeamView
 * @param          None.
 * @return         None.
 * @description    generate week days header for segment
 */
kony.apps.coe.ess.myLeave.frmCalendarTeamView.generateHeader = function(dateParam, empDataObj, leaveaData, parentCallback, callback){
    var currDate = dateParam;
    var monthStart = new Date(Date.UTC(currDate.getFullYear(),currDate.getMonth(), 1));
    var monthEnd = new Date(Date.UTC(currDate.getFullYear(),currDate.getMonth()+1, 0));
    var monthLength = monthEnd.getDate();
    var segData = [[]];
    var sectionData = {};
    var templateName;
    var weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    for(var i=1; i<=monthLength; i++ ){
        monthStart.setDate(i);
        sectionData["lblDate"+i] = i;
        sectionData["flxDay"+i] = {"skin": "sknFlxTeamWeekendDW"};
        sectionData["lblDay"+i] = weekdays[monthStart.getDay()].slice(0,2);
        if(monthStart.getDay() === 0 || monthStart.getDay() === 6){
           sectionData["flxDay"+i] = {"skin": "sknFlxBGFCFBFAOp100DW"};
           sectionData["lblDate"+i] = i;
           sectionData["lblDay"+i] = weekdays[monthStart.getDay()].slice(0,2);
        }
    }
    sectionData["lblEmployeeHeader"] = "Employee";
    if(monthLength == 31){
        templateName = flxSegTeamViewHeader31;
    }else{
        templateName = flxSegTeamViewHeader30;
    }
    sectionData.template = templateName;
    segData[0].push(sectionData);
    callback(dateParam, empDataObj, leaveaData, segData, parentCallback);
}

/**
 * @memberof       frmCalendarTeamView
 * @param          None.
 * @return         None.
 * @description    generates rows for all team
 */
kony.apps.coe.ess.myLeave.frmCalendarTeamView.generateRows = function(dateParam, empDataObj, leaveData, segData, callback){
    var rowData = [];
    var allFilteredEmployees = empDataObj.getAllFilteredEmployees();
    var currentEmployeeObj = empDataObj.getEmployeeFromId(kony.apps.coe.ess.globalVariables.employeeId);
    var templateName;
    var monthNum = (new Date(dateParam)).getMonth() + 1;
    var monthEnd = new Date(Date.UTC(dateParam.getFullYear(),dateParam.getMonth()+1, 0));
    var monthLength = monthEnd.getDate();
    if(monthLength == 31){
        templateName = flxTeamView31;
    }else{
        templateName = flxTeamView30;
    }
    rowData[0] = {
        "lblEmpName": currentEmployeeObj.First_Name + " " + currentEmployeeObj.Last_Name,
        "imgEmpPic": "adduserpic.png",
        "imgDivider" : "dash_line.png",
        template : templateName
    }
    for(var i=0; i<= allFilteredEmployees.length ; i++){
        if(i != 0){
            rowData[i] = {};
        }
        for(var j = 1; j<=monthLength; j++){
            rowData[i]["lblDataDay"+j] = {"skin": "sknLblTeamViewNoDataDW"};
        }
        if(i === 16)
            break;
        
    }
    if(typeof currentEmployeeObj.leaveData !== "undefined"){
        for(var j=0; j<currentEmployeeObj.leaveData.length; j++){
            if(currentEmployeeObj.leaveData[j].status_id !== "0")
                continue;
            if(monthNum != parseInt(currentEmployeeObj.leaveData[j].start_date.slice(4,6)))
                continue;
            var dateToStart = currentEmployeeObj.leaveData[j].start_date.slice(6,8);
            var dateToEnd = currentEmployeeObj.leaveData[j].end_date.slice(6,8);
            if(dateToStart === dateToEnd){
                rowData[0]["lblDataDay"+dateToStart] = {"skin": "sknLblTeamViewLeaveDW"};
            }
            else{
                for(var x = dateToStart; x<=dateToEnd; x++){
                    rowData[0]["lblDataDay"+x] = {"skin": "sknLblTeamViewLeaveDW"};
                }
            }
        }  
    }
    for(var i = 0; i< allFilteredEmployees.length; i++){
        if(allFilteredEmployees[i].Id === kony.apps.coe.ess.globalVariables.employeeId){
            continue;
        }
        rowData[i+1]["lblEmpName"] = allFilteredEmployees[i].First_Name + " " + allFilteredEmployees[i].Last_Name;
        if(allFilteredEmployees[i]["image"] !== null && typeof allFilteredEmployees[i]["image"] !== "undefined"){
            rowData[i+1]["imgEmpPic"] = allFilteredEmployees[i]["image"];
        }else if(rowData[i+1]["imgEmpPic"] === null || typeof rowData[i+1]["imgEmpPic"] === "undefined"){
            rowData[i+1]["imgEmpPic"] = "adduserpic.png";
        }
        rowData[i+1]["imgDivider"] = "dash_line.png";
        rowData[i+1]["template"] = templateName;
        if(typeof allFilteredEmployees[i].leaveData !== "undefined"){
            for(var j=0; j<allFilteredEmployees[i].leaveData.length; j++){
                if(allFilteredEmployees[i].leaveData[j].status_id !== "0")
                    continue;
                if(monthNum != parseInt(allFilteredEmployees[i].leaveData[j].start_date.slice(4,6)))
                    continue;
                var dateToStart = allFilteredEmployees[i].leaveData[j].start_date.slice(6,8);
                var dateToEnd = allFilteredEmployees[i].leaveData[j].end_date.slice(6,8);
                if(dateToStart === dateToEnd){
                    rowData[i+1]["lblDataDay"+dateToStart] = {"skin": "sknLblTeamViewLeaveDW"};
                }
                else{
                    for(var x = dateToStart; x<=dateToEnd; x++){
                        rowData[i+1]["lblDataDay"+x] = {"skin": "sknLblTeamViewLeaveDW"};
                    }
                }
            }
        }
        //Approx 500 users degrades performance of an already slow page even further.
        //Limiting to 15 for now.
        if(i === 15)
            break;
    }
    segData[0].push(rowData);
    // kony.apps.coe.ess.myLeave.frmCalendarTeamView.filterAndPopulateLeaves(dateparam, empDataObj, leaveData, segData);
    // frmCalendarTeamViewDW.segTeamView.setData(segData);
    // kony.apps.coe.ess.myLeave.frmCalendarTeamView.setUserImages(currentEmployeeObj, allFilteredEmployees, segData, callback);
    callback(segData);
}


/**
 * @memberof       frmCalendarTeamView
 * @param          None.
 * @return         None.
 * @description    employee data class contains fetch and insert function for employee list
 */
kony.apps.coe.ess.myLeave.frmCalendarTeamView.setUserImages = function(currentEmployeeObj, allFilteredEmployees, segData, callback){
    // var segData = frmCalendarTeamViewDW.segTeamView.data;
    segData[0][1].imgEmpPic = {"base64" : frmHamburgerDW.imgProfileImage.base64};
    for(var i=0; i<allFilteredEmployees.length; i++){
        if(i>75)
            break;
        if(i<60)
            continue;;
        if(allFilteredEmployees[i].Media_Id !== null && allFilteredEmployees[i].Media_Id !== "" && typeof allFilteredEmployees[i].Media_Id !== 'undefined'){
            mediaIdToFetch = allFilteredEmployees[i].Media_Id;
            var successFetchEmployeeImage = function(segData, i, res){
                imgBase64 = res;
                segData[0][1][i+1 - 60].imgEmpPic = {"base64" : imgBase64};
            }
            var failureFetchingEmployeeImage = function(err){
                kony.print(err);
            }
            var mediaObject = new kony.apps.coe.ess.myLeave.media();
            mediaObject.fetchEmployeeImageDW(mediaIdToFetch, successFetchEmployeeImage.bind(this, segData, i), failureFetchingEmployeeImage);
        }
    }
    // frmCalendarTeamViewDW.segTeamView.setData(segData);
    callback(segData);

}


/**
 * @memberof       frmCalendarTeamView
 * @param          None.
 * @return         None.
 * @description    employee data class contains fetch and insert function for employee list
 */
kony.apps.coe.ess.myLeave.frmCalendarTeamView.employeeData = function(employeeData){
    this.lowestId;
    this.groupId;
    this.filteredEmployees = [];
    this.employeeTable =[];
    this.employeeCount = 0;
    this.hashFunction = function(currId){
        //subtract lowest ID from current ID
        //result will be array index
        return parseInt(currId)- parseInt(this.lowestId);
    }
    this.getEmployeeFromId = function(idToSearch){
        return this.employeeTable[this.hashFunction(idToSearch)] ? this.employeeTable[this.hashFunction(idToSearch)] : -1 ;
    }
    this.insertEmployee = function(employeeObj){
        this.employeeTable[this.hashFunction(employeeObj.Id)] = employeeObj;
    }
    this.fetchLowestIdFromFilteredEmployees = function(){
        for(var i = 0; i<this.filteredEmployees.length; i++){
            if(this.lowestId > this.filteredEmployees[i].Id){
                this.lowestId = this.filteredEmployees[i].Id;
            }
        }
    }
    this.getAllFilteredEmployees = function(){
        var empObj = [];
        for(var i = 0; i<this.employeeTable.length; i++){
            if(typeof this.employeeTable[i] !== "undefined"){
                empObj.push(this.employeeTable[i]);
            }
            if(i== this.employeeTable.length -1){
                return empObj;
            }
        }
    }
    this.fetchUserImages = function(){
        for(var i=0; i<this.employeeTable.length; i++){
            if(this.employeeTable[i] != null && typeof this.employeeTable[i] != "undefined"){
                if(i>15)
                    break;
                if(this.employeeTable[i].Media_Id !== "" && this.employeeTable[i].Media_Id !== null && typeof this.employeeTable[i].Media_Id !== "undefined"){
                    mediaIdToFetch = this.employeeTable[i].Media_Id;
                    var successFetchEmployeeImage = function(i, res){
                        imgBase64 = res;
                        this.employeeTable[i]["image"] = {"base64" : imgBase64};
                        var segData= frmCalendarTeamViewDW.segTeamView.data;
                        if(i<segData.length){
                            segData[0][i+1].imgEmpPic = imgBase64;
                            frmCalendarTeamViewDW.segTeamView.setDataAt(segData[0][i+1], i+1, 0);
                        }
                    }
                    var failureFetchingEmployeeImage = function(err){
                        kony.print(err);
                    }
                    var mediaObject = new kony.apps.coe.ess.myLeave.media();
                    mediaObject.fetchEmployeeImageDW(mediaIdToFetch, successFetchEmployeeImage.bind(this, i), failureFetchingEmployeeImage);
                }
            }
        }
    }
    this.initialize = function(){
        for (var i = 0; i<employeeData.length; i++) {
            if(employeeData[i].isEmployee = '1'){
                this.groupId = employeeData[i].group_id;
                this.lowestId = employeeData[i].Id;
                break;
            }
        }
        for (var i = 0; i<employeeData.length; i++) {
            if(employeeData[i].group_id === this.groupId){
                this.filteredEmployees.push(employeeData[i]);
            }
            if(i == employeeData.length-1){
                this.fetchLowestIdFromFilteredEmployees();
            }
        }
        for (var i = 0; i<this.filteredEmployees.length; i++){
            this.insertEmployee(this.filteredEmployees[i]);
            this.employeeCount++;
        }
        this.fetchUserImages();
    }
    this.insertLeaveData = function(leaveData,dateParam){
        for(var i=0; i<leaveData.length; i++){
            if(dateParam.getMonth()+1 == parseInt(leaveData[i].start_date.slice(4,6)) || dateParam.getMonth()+1 == parseInt(leaveData[i].end_date.slice(4,6))){
                if(this.getEmployeeFromId(leaveData[i].employee_id)!== -1){
                    var index = this.hashFunction(leaveData[i].employee_id);
                    if(typeof this.employeeTable[index].leaveData === "undefined" ){
                        this.employeeTable[index]['leaveData'] = [];
                        this.employeeTable[index].leaveData.push(leaveData[i]);
                    }else{
                        this.employeeTable[index].leaveData.push(leaveData[i]);
                    }
                }
            }
            
        }
    }


}

/**
 * @memberof       frmCalendarTeamView
 * @param          None.
 * @return         None.
 * @description    assign actions to move to next or prev month
 */
kony.apps.coe.ess.myLeave.frmCalendarTeamView.assignActions = function(leaveData, employeeData, holidayData, dateParam, empDataObj, isFilterActive){
    var currMonth = dateParam.getMonth();
    var currYear = dateParam.getFullYear();
    var nextMonthDataParam = new Date();
    nextMonthDataParam.setFullYear(currYear);
    nextMonthDataParam.setMonth(currMonth+1);
    var prevMonthDataParam = new Date();
    prevMonthDataParam.setFullYear(currYear);
    prevMonthDataParam.setMonth(currMonth-1)
    frmCalendarTeamViewDW.flxMonthShiftRight.onClick = kony.apps.coe.ess.myLeave.frmCalendarTeamView.populateData.bind(this, employeeData, leaveData, holidayData, nextMonthDataParam, empDataObj)
    frmCalendarTeamViewDW.flxMonthShiftLeft.onClick = kony.apps.coe.ess.myLeave.frmCalendarTeamView.populateData.bind(this, employeeData, leaveData, holidayData, prevMonthDataParam, empDataObj)
    if(isFilterActive !== true){
        frmCalendarTeamViewDW.flxEmpSearchConfirmAction.onClick = function(){
            var completeEmployeeData = employeeData;
            if(kony.apps.coe.ess.myLeave.frmCalendarTeamView.selectedEmployee.length === 0){
                kony.apps.coe.ess.myLeave.frmCalendarTeamView.closeTeamSearch();
                kony.apps.coe.ess.myLeave.frmCalendarTeamView.populateData(completeEmployeeData, leaveData, holidayData, dateParam, null, true);
            }else{
                kony.apps.coe.ess.myLeave.frmCalendarTeamView.closeTeamSearch();
                kony.apps.coe.ess.myLeave.frmCalendarTeamView.populateData(kony.apps.coe.ess.myLeave.frmCalendarTeamView.selectedEmployee, leaveData, holidayData, dateParam, null, true);
            }  
        }
    } 
}