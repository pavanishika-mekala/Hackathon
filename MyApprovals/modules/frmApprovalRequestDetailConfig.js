var frmApprovalRequestDetailConfig = {
	"formid": "frmApprovalRequestDetail",
    "frmApprovalRequestDetail": {
        "entity": "ApprovalMedia",
        "objectServiceName": "MYAPPROVALS",
        "objectServiceOptions": {"access":"offline",
                                "mock" : false}
	},
	"SegDetails" : {
		"fieldprops" : {
			"widgettype" : "Segment",
			"entity" : "approval_request",		    
			"query" : "select (emp.First_Name || ' ' ||emp.Middle_Name|| ' ' || emp.Last_Name) as employee_id , emp.Media_Id as media_id ,rn.comment , rn.createdts , rn.employee_id as 'emp_Id' FROM request_note rn JOIN employee emp ON rn.employee_id = emp.id where rn.request_id = '{requestId}' ORDER BY rn.createdts ASC;",
			"querytype" : "sql",
			"field" : {}
		}
	}
};
