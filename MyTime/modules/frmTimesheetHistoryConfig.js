var frmTimesheetHistoryConfig= {
    "formid": "frmTimesheetHistory",
    "frmTimesheetHistory": {
        "entity": "Timesheet", 
        "objectServiceName": "MYTIME", 
        "objectServiceOptions": {
            "access": "offline",
            "mock": false
        }
    },
	"groupTimeEntry": {
		"fieldprops": {
          "entity": "Timesheet",
          "widgettype": "FlexContainer",
          "query": "select ts.start_date as startDate,ts.end_date as endDate,ts.id as timesheetID,st.status_Name as status from timesheet ts left join time_entry te on ts.id=te.timesheet_id join Status st on te.statusid=st.id group by ts.id",
          "querytype": "sql"
        }
	}}; 

