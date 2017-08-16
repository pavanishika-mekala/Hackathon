var frmTeamViewConfig = {
    "formid": "frmTeamView",
    "frmTeamView": {
        "entity": "Employee",
		"objectServiceName":"Employee",
        "objectServiceOptions": {
            "access": "offline"
        }
    },
    "segTeamView": {
        "fieldprops": {
            "widgettype": "Segment",
            "entity": "Employee",
         	//@TODO query to be changed once group table is created and group_id should be current user id
          	"query":"select First_Name, Middle_Name, Last_Name,Manager_Id, group_id, Id,Media_Id,Date_of_birth from Employee where group_id=(select group_id from Employee where Id='{employeeId}') and Id!='{employeeId}'" , 
			"querytype": "sql"
        }
    }
};