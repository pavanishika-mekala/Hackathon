kony = kony || {};
kony.apps = kony.apps || {};
kony.apps.ess = kony.apps.ess || {};
kony.apps.ess.Constants = kony.apps.ess.Constants || {};
kony.apps.ess.Constants.i18n = kony.apps.ess.Constants.i18n || {}

//constants required for the Type of the Segment
kony.apps.ess.Constants = {
	"SEGUI_SINGLE_SELECT_BEHAVIOR": 0,
	"SEGUI_MULTI_SELECT_BEHAVIOR": 1
};

kony.apps.ess.Constants.i18n = {
	isi18nConfigured: false
}

/**
 *@function  : constructor
 * @class	 :  DynamicSegment
 * @params	 :  Type					-either singleSelectionBehaviour or the MultiSelectionBehaviour
selectionBehaviorConfig	- Requiest the  json containg keys
imageIdentifier 	-represents the Widget id
SelectedStateImage 	- requires the image which need to be shown in selected state
unselectedStateImage-requires the image which need to be shown in unselected State
CellSegmentTemplate		-The flex id which is declared in the segment template Which represents the cell ui
CellonClick				-Callback function which is need to be intimated on click of cell the params to the
Callback function is selectedItem Data
WidgetsArray			-Reqiured to specify the all the widgets in the Template explicitly
 * @returns	 :	None
 * @desc	 :	Creates the dynamic segment with rows and coloumns
 */

kony.apps.ess.DynamicSegment = function (type, selectionBehaviorConfig, Coloums, CellSegmentTemplate, CellonClick, WidgetsArray) {
	try {
		kony.print("--start kony.apps.ess.DynamicSegment Constructor--");
		//input validation
		if (isEmpty(CellSegmentTemplate) || isEmpty(CellonClick) || isEmpty(WidgetsArray)) {

			kony.print("--invalid Inputs to the Constructorkony.apps.ess.DynamicSegment--");
			handleError(kony.i18n.getLocalizedString("kony.apps.ess.DynamicSegment.errorMessages.InvalidInputs"));
			return;
		}
		//checking for type
		if (type != 0 && type != 1) {
			if (kony.apps.ess.Constants.i18n.isi18nConfigured) {
				kony.print("--invalid type in the Segment Creation--")
				handleError(kony.i18n.getLocalizedString("kony.apps.ess.DynamicSegment.errorMessages.InvalidInputs"));
			} else {
				alert("invalid type in the Segment Creation");
			}

			return;
		}
		//checking BehaviourConfig when selected MultiSelectionBehaviour
		if (type == 1) {
			if (isEmpty(selectionBehaviorConfig) || isEmpty(selectionBehaviorConfig.imageIdentifier) || isEmpty(selectionBehaviorConfig.selectedStateImage) || isEmpty(selectionBehaviorConfig.unselectedStateImage)) {			
				if (kony.apps.ess.Constants.i18n.isi18nConfigured) {
					kony.print("--invalid Configuration Provided for the MultiSelectionBehaviour--")
					handleError(kony.i18n.getLocalizedString("kony.apps.ess.DynamicSegment.errorMessages.InvalidInputs"));
				} else {
					alert("invalid Configuration Provided for the MultiSelectionBehaviour");
				}				
				return;
			}
		}
		this.type = type;
		this.selectionBehaviorConfig = selectionBehaviorConfig;
		this.columns = Coloums;
		this.CellSegmentTemplate = CellSegmentTemplate;
		this.CellonClick = CellonClick;
		this.Data = [];
		this.SelectedItems = [];
		this.SelectedIndexs = [];
		this.WidgetDataMap = {};
		this.WidgetsArray = WidgetsArray;
		this.rowTemplates = [];
		//creation of the Main Scroll flex container containing Segment
		var basicconfig_Main = {
			"id": "DynamicParentFlexContainer",
			"top": "0%",
			"left": "0%",
			"width": "100%",
			"height": "100%",
			"zIndex": 1,
			"scrollDirection": kony.flex.SCROLL_VERTICAL,
			"skin": "slFbox",
			"isVisible": true,
			"clipBounds": false,
          	"bounces" : false,
			"layoutType": kony.flex.FREE_FORM
		};

		this.ParentScrollFlexContainer = new kony.ui.FlexScrollContainer(basicconfig_Main, {}, {});
		kony.print("--end kony.apps.ess.DynamicSegment Constructor--");
		this.ParentScrollFlexContainer.removeAll();
	} catch (e) {
		
		if (kony.apps.ess.Constants.i18n.isi18nConfigured) {
				kony.print("--Error"+e.message+"--");
				handleError(kony.i18n.getLocalizedString("kony.apps.ess.DynamicSegment.errorMessages.SegementCreation"));
			} else {
					alert("Error in Creation of Segment");
			}
			
		
	}
};

/*
 *@function
 *@params   :   data
 *@returns  :   null
 *@desc		:	Populate the data in the segments (Cells) accoriding to the given inputs
 */

kony.apps.ess.DynamicSegment.prototype.setData = function (data) {
	try {
		kony.print("--start setData--");
		this.ParentScrollFlexContainer.removeAll();
		this.SelectedItems = [];
		this.SelectedIndexs = [];
		if (isEmpty(data)) {
			//invalid input or data length is null
			kony.print("--invalid input to the method setData--");
			return;
		}
		this.Data = data;
		//setting the default tempalte height
		var height = 30;
		if (this.CellSegmentTemplate.height) {
			height = this.CellSegmentTemplate.height.replace("%", "");
		}
		var width = 100 / this.columns;
		for (var index in data) {
			var left = parseInt((index % this.columns)) * width + "%";
			var top = parseInt((index / this.columns)) * height + "%";
			var TemplateCell = this.CellSegmentTemplate.clone(index);
			TemplateCell.top = top;
			TemplateCell.left = left;
			TemplateCell.width = width + "%";
			TemplateCell.onClick = this.onclick.bind(this, index);
			this.rowTemplates[index] = TemplateCell;          
          var data = this.Data[index];
         if(this.type == kony.apps.ess.Constants.SEGUI_MULTI_SELECT_BEHAVIOR){
				data[this.selectionBehaviorConfig.imageIdentifier] = {
					"isVisible": true,
					"src": this.selectionBehaviorConfig.unselectedStateImage
				}
			};
			this.setDataAtIndex(index, data);			
			this.ParentScrollFlexContainer.add(TemplateCell);
		}
		kony.print("--end setData--");
	} catch (e) {     
		if (kony.apps.ess.Constants.i18n.isi18nConfigured) {
				kony.print("--Error"+e.messag+"--");
				handleError(kony.i18n.getLocalizedString("kony.apps.ess.DynamicSegment.errorMessages.SetData"));
			} else {
					alert("Error in Set Data of Dynamic Segment");
			}
				
	}
};

/*
 *@function
 *@params   :   data
 *@returns  :   null
 *@desc		:	Action to be done on Clicking the cell of Segment
 */
kony.apps.ess.DynamicSegment.prototype.onclick = function (selectedindex) {
	try {
		kony.print("-- Start onclick--");
		if (this.type == kony.apps.ess.Constants.SEGUI_MULTI_SELECT_BEHAVIOR) {
			//MultiSelectionBehaviour
			var index = this.SelectedIndexs.indexOf(selectedindex);
			if (index == -1) {
				//Not in selected Indexs
				this.SelectedIndexs.push(selectedindex);
				this.SelectedItems.push(this.Data[selectedindex]);
				//making the cell in selected state
				var SelectedCellData = this.Data[selectedindex];
				SelectedCellData[this.selectionBehaviorConfig.imageIdentifier] = {
					"isVisible": true,
					"src": this.selectionBehaviorConfig.selectedStateImage
				}			
				this.setDataAtIndex(selectedindex, SelectedCellData)
			} else {
				//already exsists in the selected Index
				this.unselectIndex(index);
				//Making the cell in unselected State

				var SelectedCellData = this.Data[selectedindex];
				SelectedCellData[this.selectionBehaviorConfig.imageIdentifier] = {
					"isVisible": true,
					"src": this.selectionBehaviorConfig.unselectedStateImage
				}
				this.setDataAtIndex(selectedindex, SelectedCellData);
			}
		} else {
			//SingleSelectionBehaviour
          	if(this.SelectedItems.length!==0){
			//Making the cell in unselected State
			var SelectedCellData = this.Data[this.SelectedIndexs[0]];
			SelectedCellData[this.selectionBehaviorConfig.imageIdentifier] = {
				"isVisible": true,
				"src": this.selectionBehaviorConfig.unselectedStateImage
			}
			this.setDataAtIndex(this.SelectedIndexs[0], SelectedCellData);
            //already exsists in the selected Index
			this.unselectIndex('0');
          	}
            this.SelectedItems=[];
           	this.SelectedIndexs=[];
            this.SelectedIndexs.push(selectedindex);
            this.SelectedItems.push(this.Data[selectedindex]);
          	var SelectedCellData = this.Data[selectedindex];
				SelectedCellData[this.selectionBehaviorConfig.imageIdentifier] = {
					"isVisible": true,
					"src": this.selectionBehaviorConfig.selectedStateImage
				}			
			this.setDataAtIndex(selectedindex, SelectedCellData);
			this.CellonClick.call(this, this.Data[selectedindex]);
		}
		kony.print("-- end onclick--");
	} catch (e) {
		throw e;
	}
}

/*
 *@function
 *@params   :   data
 *@returns  :   null
 *@desc		:	Refresh Data At the Index of the segment
 */
kony.apps.ess.DynamicSegment.prototype.unselectIndex = function (index) {
	try {
		kony.print("--start unselectIndex--");
		if (index > this.SelectedIndexs.length) {
			return;
		}
		for (var i = index; i < this.SelectedIndexs.length; i++) {
			this.SelectedIndexs[i] = this.SelectedIndexs[i + 1];

		}
		this.SelectedIndexs.pop();
		for (var i = index; i < this.SelectedItems.length; i++) {
			this.SelectedItems[i] = this.SelectedItems[i + 1];

		}
		this.SelectedItems.pop();
		kony.print("--start unselectIndex--");
	} catch (e) {
		throw e;
	}
}

/*
 *@function
 *@params   :   data
 *@returns  :   null
 *@desc		:	Refresh Data At the Index of the segment
 */
kony.apps.ess.DynamicSegment.prototype.setDataAtIndex = function (index, data) {
	kony.print("--start setDataAtIndex--");
	//Inputs validation
	if (isEmpty(data)) {
		kony.print("--error in the input to the function setDataAtIndex");
		return;
	}
	
	var WidgetsArray = this.WidgetsArray;
	var TemplateCell = this.rowTemplates[index];
	for (var i in WidgetsArray) {
		var Propertyid = WidgetsArray[i];
		var WidgetId = index.toString() + WidgetsArray[i];
		if (this.WidgetDataMap[Propertyid]) {
			//widgetDataMappingFound
			var propertyName = this.WidgetDataMap[Propertyid];
			kony.apps.coe.ess.WidgetPropertyBinding(TemplateCell[WidgetId], data[propertyName]);
		} else {
			//Using the same id name for the Widget
			kony.apps.coe.ess.WidgetPropertyBinding(TemplateCell[WidgetId], data[Propertyid]);
		}
	}
	kony.print("--end setDataAtIndex--");
}

kony.apps.ess.DynamicSegment.prototype.getDynamicSegment = function () {
	kony.print("--start getDynamicSegment--");
	kony.print("--end getDynamicSegment--");
	return this.ParentScrollFlexContainer;

};
