kony = kony || {};
kony.apps = kony.apps || {};
kony.apps.coe = kony.apps.coe || {};
kony.apps.coe.ess = kony.apps.coe.ess || {};
kony.apps.coe.ess.myTime = kony.apps.coe.ess.myTime || {};

kony.apps.coe.ess.myTime.TimesheetReview = kony.apps.coe.ess.myTime.TimesheetReview || {};
kony.apps.coe.ess.myTime.TimesheetReview.prevSelection = null; //To track the previously selection of user 

/*
 *@function
 *@class		: 	TimesheetReview
 *@params	:	JSON of selected header in a segment
 *@type		:	Data assigment
 *@returns	:	None
 *@desc		:	Mapping of data is done over the segment
 */
kony.apps.coe.ess.myTime.TimesheetReview.
setData = function(header) {

    var response = kony.apps.coe.ess.myTime.TimesheetReview.Data.get();

    var data = this.getProcessedData(response);

    if (header === null) { //This occurs only during preshow of the form
        this.setHeaderData(data);
        return;
    }

    if (header.lblTask.text !== this.prevSelection) {
        this.OnTaskSelection(header.lblTask.text, data, response);
        this.prevSelection = header.lblTask.text;
    } else {
        this.setHeaderData(data); //To minimize the previously selected header
        this.prevSelection = null;
    }

};


/*
 *@function
 *@class		: 	TimesheetReview
 *@params	:	JSON of selected tasks and their time durations
 *@type		:	Data assigment
 *@returns	:	JSON of tasks list with their total durations
 *@desc		:	Header for the segments are made here
 */
kony.apps.coe.ess.myTime.TimesheetReview.
getProcessedData = function(response) {

    var tasksSet = [];
    var obj = [];
    var len = response.length;
    var ptr = 0;
    var curr = 0;
    var processedData = [];
    while (ptr < len) {
        obj = {
            "task": response[ptr].task,
            "total_hours": response[ptr].totalhours
        };

        tasksSet[response[ptr].task] = obj; //tasksSet consists a key(task name), pair(obj) value where in turn obj is a JSON

        ptr++;
    }

    ptr = 0;
    len = tasksSet.length;
    obj = [];

    for (ptr in tasksSet) {
        obj.push(tasksSet[ptr]);
    }

    for (ptr in obj) {	//Assigning null values to the segments under each header 
        processedData.push([obj[ptr], {}]);
    }

    return processedData;
};


/*
 *@function
 *@class		: 	TimesheetReview
 *@params	:	JSON of selected header in a segment
 *@type		:	Data assigment
 *@returns	:	None
 *@desc		:	Displays the dates and duration in each day of the selected task
 */
kony.apps.coe.ess.myTime.TimesheetReview.
OnTaskSelection = function(selectedTask, processData, response) {

    var ptr;
    var obj = [];
    for (ptr in response) {
        if (response[ptr].task === selectedTask) { //Selecting timesheets for the selected tasks
            obj.push({
                date: response[ptr].date,
                hours: response[ptr].hours
            });
        }
    }

    for (ptr in processData) { //Assigning data to the segments under selected header
        if (processData[ptr][0].task === selectedTask) {
            processData[ptr][1] = obj;
        }
    }

};


/*
 *@function
 *@class	: 	TimesheetReview
 *@params	:	JSON of selected header in a segment
 *@type		:	Data assigment
 *@returns	:	None
 *@desc		:	It is a reusable function that sets only headers for the segment and rest are hidden
 */
kony.apps.coe.ess.myTime.TimesheetReview.
setHeaderData = function(data) {
    //Assigning data to only headers
};


kony.apps.coe.ess.myTime.TimesheetReview.
getProcessedSegmentData= function(data)
{
    var finalData = [];
    var totalHours=0;
    var overtimeHours=0;
    var billableHours=0;
    var sumOfHours = 0;
    for(var i = 0; i<data.length; i++){
        for(var j = 0; j<data[i].length; j++){
            sumOfHours = 0;
            var timeentry = {};
            timeentry.lblProjectName = data[i][j][0].projectname !==null ? data[i][j][0].projectname.toString() : "";
            timeentry.lblProductiveHours = data[i][j][0].time_type_name !==null ? data[i][j][0].time_type_name.toString() : "";
            timeentry.lblTaskName = data[i][j][0].Task_Name !== null ? data[i][j][0].Task_Name.toString() : (data[i][j][0].projecttaskID !==""  ? data[i][j][0].projecttaskID :data[i][j][0].time_type_name.toString()) ;
            timeentry.lblDescription = data[i][j][0].Activity_Description.toString();
            timeentry.lblActivityId = data[i][j][0].taskId !== null ? data[i][j][0].taskId.toString() : ""; 
            if ((data[i][j][0].Type !== null && data[i][j][0].Type !== "" && data[i][j][0].Type !== undefined)) {
                var index = (data[i][j][0].Type).indexOf("|");
                var type1 = index !== -1 ? (data[i][j][0].Type).substring(0, index) : (data[i][j][0].Type);
                var type2 = index !== -1 ? ((data[i][j][0].Type).substring(index + 1, (data[i][j][0].Type).length)) : "";
                var type1Value = ((data[i][j][0].proid) !== null && (data[i][j][0].proid) !== undefined) ? (data[i][j][0].proid).replace(type1, "") : "";
                var type2Value = ((data[i][j][0].taskId) !== null && (data[i][j][0].taskId) !== undefined) ? (data[i][j][0].taskId).replace(type2, "") : "";
                timeentry.lblCostCenter = type1 + " - " + type1Value;
            }
            for(x = 0; x<data[i][j].length; x++){
                sumOfHours = sumOfHours + parseFloat(data[i][j][x].hours)
                if(parseInt(data[i][j][x].ISOVERTIME) == 1){
                    overtimeHours = overtimeHours + parseFloat(data[i][j][x].hours);
                }
                if(parseInt(data[i][j][x].isBillable) == 1){
                    billableHours = billableHours + parseFloat(data[i][j][x].hours);
                }
            }
            timeentry.lblProductiveHoursValue = sumOfHours.toString() + 'h';
            timeentry.template = flxOuterOne;
            totalHours = totalHours + sumOfHours;
            finalData.push(timeentry);
        }

    }
    frmTimesheetReview.lblTotalHoursCount.text = totalHours.toFixed(2);
    frmTimesheetReview.lblOvertimeHoursCount.text = overtimeHours.toFixed(2);
    frmTimesheetReview.lblBillableHoursCount.text = billableHours.toFixed(2);
    return finalData;
};