var frmStatusSearchConfig = {
    "formid": "frmStatusSearch",
    "frmStatusSearch": {
        "entity": "Status",
		"objectServiceName":"Employee",
        "objectServiceOptions": {
            "access": "offline"
        }
    },
	"segStatus": {
        "fieldprops": {
            "widgettype": "Segment",
            "entity": "Status",
          	"query":"select Status_Name,Id from Status",
			"querytype": "sql"
        }
    }
};