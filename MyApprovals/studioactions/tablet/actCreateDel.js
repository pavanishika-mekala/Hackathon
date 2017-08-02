function actCreateDel(eventobject) {
    return AS_FlexContainer_45c1925c4d0f415da23e8a086ec97a81(eventobject);
}

function AS_FlexContainer_45c1925c4d0f415da23e8a086ec97a81(eventobject) {
    var statusTypeSegments = kony.apps.coe.ess.globalVariables.statusTypeDelegationSegments;
    for (var i = 0; i < statusTypeSegments.Data.length; i++) {
        var index = statusTypeSegments.SelectedIndexs.indexOf(i);
        statusTypeSegments.SelectedIndexs.push(i);
        statusTypeSegments.SelectedItems.push(statusTypeSegments.Data[i]);
        var SelectedCellData = statusTypeSegments.Data[i];
        SelectedCellData[statusTypeSegments.selectionBehaviorConfig.imageIdentifier] = {
            "isVisible": false,
            "src": statusTypeSegments.selectionBehaviorConfig.unselectedStateImage
        }
        statusTypeSegments.setDataAtIndex(i, SelectedCellData);
    }
    alert("statusTypeSegments\n" + JSON.stringify(SelectedCellData));
}