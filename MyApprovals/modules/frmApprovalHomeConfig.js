var frmApprovalHomeConfig = {
    "formid": "frmApprovalHome",
      "frmApprovalHome": {
        "entity": "approval_request",
        "objectServiceOptions":{
        "access":"offline",
        "mock":false
      },
      "objectServiceName":"MYAPPROVALS"
    }
};
  /*"segApprovalsList":{
      "fieldprops":{
        "widgettype":"FlexContainer",
        "entity":"approval_request",
        //"query": "select e.first_name,e.middle_name,e.last_name,rt.name,at.value,ad.label,ar.konysynchashsum FROM employee e LEFT JOIN approval_request ar ON e.User_id != ar.employee_id LEFT JOIN request_type rt ON ar.type_id = rt.id LEFT JOIN attribute at ON ar.id = at.approval_id LEFT JOIN attribute_def ad ON at.attribute_def_id = ad.id where e.IsEmployee = 1;",
        "querytype": "sql"
      }
   } 
};*/