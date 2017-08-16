//Type your code here
//Type your code here

//shifts the elemets 
function leftShiftArray(data){
	for(var i=0;i<(data.length-1);i++){
		
		data[i]=data[i+1];
	}
  if(data.length>0)
  data[data.length-1]=undefined;  
    
  return data;
}

function rightShiftArray(data){
	
	for(var i=data.length-1;i>0;i--){
	
		data[i]=data[i-1];
	}
  if(data.length>0)
  data[0]=undefined;   
  
  return data;
}