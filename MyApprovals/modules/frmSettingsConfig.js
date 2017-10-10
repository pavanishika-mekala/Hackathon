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
          "query": "SELECT [request_type].[id], [request_type].[name] FROM   [request_type] WHERE [request_type].[id] NOT LIKE 'TIMESHEET' AND [request_type].[id] NOT LIKE 'EXPENSES' AND [request_type].[id] NOT LIKE 'PURCHORDER' AND [request_type].[id] NOT LIKE 'PURCHREQTN' AND [request_type].[id] NOT LIKE 'WORKORDER';", // FIXME: Condition to be removed when the different types of filtered out approvals should be supported by the app
          "querytype": "sql"
        }
	}
};
