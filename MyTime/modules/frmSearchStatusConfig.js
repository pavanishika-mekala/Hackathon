//Type your code here
var frmSearchStatusConfig = {
    "formid": "frmSearchStatus",
    "frmSearchStatus": {
        "entity": "Status",
		"objectServiceName":"Employee",
        "objectServiceOptions": {
            "access": "offline"
        }
    },
    "segSearchStatusContainer": {
        "fieldprops": {
            "widgettype": "Segment",
            "entity": "Status",
          	"query":"select Id ,Status_Name from Status ",
			"querytype": "sql",
            "field": {
                "lblSearchTxt": {
                    "widgettype": "Label",
                  	"field":"Status_Name"
                },
              	"statusId": {
                    "widgettype": "Label",
                  	"field":"Id"
                }
            }
        }
    }
};