var frmLeaveHomeConfig= {
    "formid": "frmLeaveHome",
    "frmLeaveHome": {
        "entity": "leave_type", 
        "objectServiceName": "MYLEAVE", 
        "objectServiceOptions": {
            "access": "offline",
            "mock": false
        }
    },
	"flxLeaveHomeMain": {
		"fieldprops": {
          "entity": "leave_type",
          "widgettype": "FlexContainer",
          "query": "select * from leave_type",
          "querytype": "sql"
        }
	}};