var frmSearchConfig = {
    "formid": "frmSearch",
      "frmSearch":{
        "entity": "approval_request",
        "objectServiceOptions":{
        "access":"offline",
        "mock":false
      },
      "objectServiceName":"MYAPPROVALS"
    },
  "segList" : {
		"fieldprops" : {
			"widgettype" : "Segment",
			"entity" : "approval_request",
        "query":"select e.Media_Id as media_id,ar.IsLater , ar.request_id as 'Req_id' ,ar.id, s.Status_Name as 'status_name', rc.name as 'category_type', ar.employee_id, ar.request_date, reqT.name AS 'request_type', (e.first_name || ' ' || e.Middle_Name || ' ' || e.Last_Name) as 'fullName', ar.status_id, ar.due_date, ar.type_id, group_concat(ad.label) as 'labels', group_concat(at.value) as 'values' from approval_request ar LEFT JOIN Employee e ON ar.employee_id = e.Id LEFT JOIN attribute at ON ar.id = at.approval_id LEFT JOIN attribute_def ad ON ad.id = at.attribute_def_id LEFT JOIN request_type reqT ON reqT.id = ar.type_id LEFT JOIN request_category rc ON ar.category_id = rc.id LEFT JOIN attribute_section aTs ON ad.attribute_section_id = aTs.id LEFT JOIN status s ON ar.status_id = s.id where aTs.TYPE = 'SUMMARY' AND (ar.request_date > '{fromDate}') AND (ar.request_date<= '{toDate}') GROUP BY ar.id ORDER BY ar.request_date",    
		    "querytype" : "sql",
			"field" : {}
		}
	}
};