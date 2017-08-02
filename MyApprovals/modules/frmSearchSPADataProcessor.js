kony = kony || {};
kony.apps = kony.apps || {};
kony.apps.coe = kony.apps.coe || {};
kony.apps.coe.ess = kony.apps.coe.ess || {};
kony.apps.coe.ess.Approvals = kony.apps.coe.ess.Approvals || {};
kony.apps.coe.ess.Approvals.SPA = kony.apps.coe.ess.Approvals.SPA || {};
kony.apps.coe.ess.Approvals.SPA.Search = kony.apps.coe.ess.Approvals.SPA.Search || {};
kony.apps.coe.ess.Approvals.SPA.Search = {
  processedData : []
};
kony.apps.coe.ess.Approvals.SPA.Search.processData = function(data) {
    try {
        kony.print("---- SPA search processData start ----");
        var totalRequests = [];
        var processedRequests = [];
        var index;

        for (index in kony.apps.coe.ess.Approvals.spa.totalLaterRequests) {
            totalRequests.push(kony.apps.coe.ess.Approvals.spa.totalLaterRequests[index]);
        }
        for (index in data.ApprovalRequestData) {
            totalRequests.push(data.ApprovalRequestData[index]);
        }
        for (index in totalRequests) {
            var request = {};
            request.request_date = totalRequests[index].RequestDate;
            request.UserName = totalRequests[index].UserName;
            request.categoryName = totalRequests[index].category;
            request.CreatedUserShortName = totalRequests[index].CreatedUserShortName;
            request.RequestInfo = totalRequests[index].RequestInfo;
            request.imgUser = totalRequests[index].employeeImg;
            request.lblSep = totalRequests[index].Separator;
            request.status_id = totalRequests[index].StatusId;
            request.Requesttype = totalRequests[index].request_type;
          	request.RequestDateObject = totalRequests[index].RequestDateObject;
          

            switch (totalRequests[index].StatusId) {
                case "0":
                    request.status_value = "Approved";
                     request.imgStatus = {
                        src: "approved_audit.png"
                    };
                     
                    break;
                case "1":
                    request.status_value = "Rejected";
                    request.imgStatus = {
                        src: "rejected_audit.png"
                    };
                    
                    break;
                case "2":
                    request.status_value = "Pending";
                                      
                    break;
                                 
            }

            switch (totalRequests[index].request_type) {
                case "LEAVE":
                    kony.print("---The request is of type LEAVE----");
                    //retriving the startDate and EndDate
                    request.imgPurpose = {
                        src: "leave_detail.png"
                    };
                    break;
                case "TIMESHEET":
                    kony.print("The request is of type TIMESHEET");
                    request.imgPurpose = {
                        src: "time_detail.png"
                    };
                    break;
                case "EXPENSES":
                    kony.print("The request is of type EXPENSES");

                    request.imgPurpose = {
                        src: "expense_details.png"
                    };
                    break;
                case "PURCHASEORDER":
                    kony.print("The request is of type PURCHORDER");

                    request.imgPurpose = {
                        src: "purchase_order_in_details.png"
                    };
                    break;
                case "WORKORDER":
                    kony.print("The request is of type WORKORDER");
                    request.imgPurpose = {
                        src: "work_order_details.png"
                    };
                    break;
                case 'PURCHASEREQUISITION':
                    kony.print("The request is of type Purchase Requistion");
                    request.imgPurpose = {
                        src: "purchase_request_in_detail.png"
                    };
                    break;
                default:
                    continue;
            }
            processedRequests.push(request);
        }
        kony.print("---- total requests: " + JSON.stringify(processedRequests));
        kony.print("---- SPA search processData end ----");
      	this.processedData = processedRequests;
        return processedRequests;
    } catch (error) {
        kony.print("---- SPA search processData error: " + JSON.stringify(error));
    }
};
kony.apps.coe.ess.Approvals.SPA.Search.getPeople = function(data) {
    try {
        kony.print("---- search getPeople start ----");
        kony.print("---- people data: " + JSON.stringify(data));
        var peopleData = [];
        for (var index in data) {
            var people = {};
            people.Name = data[index].UserName;
            people.lblIntials = data[index].CreatedUserShortName;
            peopleData.push(people);
        }
        kony.print("---- search getPeople end ----");
        return peopleData;
    } catch (error) {
        kony.print("---- search getPeople error: " + JSON.stringify(error));
    }
};
kony.apps.coe.ess.Approvals.SPA.Search.getRequests = function(data) {
    try {
        kony.print("---- search getRequests start ----");
        var requestsData = [];
        var requests = [];
        for (var index in data) {
            if (request.indexOf(data[index].categoryName) == -1) {
                requestsData.push(data[index].categoryName);
            }
        }
        for (var index in requestsData) {
            requests.request_name = requestsData[index];
        }
        kony.print("---- search getRequests end ----");
        return requests;
    } catch (error) {
        kony.print("---- search getRequests error: " + JSON.stringify(error));
    }
};