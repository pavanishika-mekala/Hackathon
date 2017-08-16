var frmLeaveWalletConfig = {
	"formid": "frmLeaveWallet",
    "frmLeaveWallet": {
        "entity": "employee_leave_type",
        "objectServiceName": "MYLEAVE",
        "objectServiceOptions": {"access":"offline", mock : false}
    },
	"leave_type": {
		"fieldprops": {
          "entity": "employee_leave_type",
          "widgettype": "FlexContainer",
          "query": "select  * from employee_leave_type",
          "querytype": "sql"
        }
	}
};