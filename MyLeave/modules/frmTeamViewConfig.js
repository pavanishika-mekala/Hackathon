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
          	//"query":"select First_Name, Middle_Name, Last_Name,Manager_Id, group_id, Id,Media_Id,Date_of_birth from Employee where group_id=(select group_id from Employee where Id='{employeeId}') and Id!='{employeeId}'" , 
			"query":"select TPD.EMPNUMBER as Id,TPD.FIRSTNAME as First_Name,TPD.LASTNAME as Last_Name,TPD.MIDDLENAME as Middle_Name,TLR.LEAVE_DAYS,TLR.LEAVE_ENDDATE,TLR.LEAVE_FROMDATE,TLR.LEAVE_HRS,TLR.LEAVE_TYPE,TLR.LV_STATUS,TLR.STATUS"+
					" from TEAM_PERSONAL_DATA TPD "+
					" LEFT JOIN  (select EMPNUMBER"+
                 	",GROUP_CONCAT(LEAVE_DAYS) AS LEAVE_DAYS "+
                 	",GROUP_CONCAT(LEAVE_ENDDATE) AS LEAVE_ENDDATE"+
				 	",GROUP_CONCAT(LEAVE_FROMDATE) AS LEAVE_FROMDATE"+
				 	",GROUP_CONCAT(LEAVE_HRS) AS LEAVE_HRS"+
				 	",GROUP_CONCAT(LEAVE_TYPE) AS LEAVE_TYPE"+
				 	",GROUP_CONCAT(LV_STATUS) AS LV_STATUS"+
				 	",GROUP_CONCAT(STATUS) AS STATUS"+
              		" FROM TEAM_LEAVE_REQUEST_ENTRY where LV_STATUS NOT LIKE 'C' group by EMPNUMBER) TLR  ON  TPD.EMPNUMBER = TLR.EMPNUMBER",
          	"querytype": "sql"
        }
    }
};