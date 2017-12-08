//Custom String Funcitons for the attributes

String.prototype.returnCombinationInJsonFormat = function (CombinationString, delimiter) {
	keyArray = this.split(delimiter);
	
	if(CombinationString){
	valueArray = CombinationString.split(delimiter);
	}else{
		valueArray=null;
	}
	var json = {};
	if (valueArray && keyArray) {
		for (var index in keyArray) {
			if (keyArray[index] && valueArray[index]) {
				json[keyArray[index]] = valueArray[index];
			}
		}
	} else {
	
	}
	return json;
};