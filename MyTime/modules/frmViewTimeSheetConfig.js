var frmViewTimeSheetConfig = {
    "formid": "frmViewTimeSheet",
    "frmViewTimeSheet": {
        "entity": "Time_Entry", 
        "objectServiceName": "MYTIME", 
        "objectServiceOptions": {
            "access": "offline",
            "mock": false
        }
    },
	"groupTimeEntry": {
		"fieldprops": {
          "entity": "Time_Entry",
          "widgettype": "FlexContainer",
          "query": "select ts.start_date,ts.end_date,tt.isovertime,te.id,te.date,te.StatusId,st.Status_Name,te.Actual_hours,te.activity_description,te.start_time,te.end_time,te.created_on,te.Timesheet_id, te.time_type_id,te.employee_id,te.project_task_id,pt.type,p.isBillable,p.project_name as projectname,p.id as proid, p.project_description as proDes,p.Planned_hours,t.Task_name,t.id as taskId from timesheet ts left join time_entry te on ts.id=te.timesheet_id left join Project_task pt on te.project_task_id=pt.id left join project p on p.id=pt.project_id left join task t on t.id = pt.task_id left join time_type tt on te.time_type_id=tt.id left join status st on st.id=te.StatusId where ts.id='{timesheetId}' AND te.StatusId != '3';",
          "querytype": "sql"
        }
	}};