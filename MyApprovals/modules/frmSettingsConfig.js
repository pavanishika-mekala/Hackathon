var frmSettingsConfig = {
	"formid": "frmSettings",
	"frmSettings": {
		"entity": "request_type",
		"objectServiceName": "MYAPPROVALS",
		"objectServiceOptions": {
			"access": "offline",
			"mock": false
		}
	},
	"groupRequestTypes": {
		"fieldprops": {
          "entity": "request_type",
          "widgettype": "FlexContainer",
          "query": "SELECT [request_type].[id], [request_type].[name] FROM   [request_type];",
          "querytype": "sql"
        }
	}
};
