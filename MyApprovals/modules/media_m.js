kony = kony || {};
kony.apps = kony.apps || {};
kony.apps.coe = kony.apps.coe || {};
kony.apps.coe.ess = kony.apps.coe.ess || {};
kony.apps.coe.ess.MyApprovals = kony.apps.coe.ess.MyApprovals || {};
kony.apps.coe.ess.MyApprovals.media = kony.apps.coe.ess.MyApprovals.media || {};

kony.apps.coe.ess.MyApprovals.media.CONSTANTS_WIDGET_NORMAL = 0;
kony.apps.coe.ess.MyApprovals.media.CONSTANTS_WIDGET_SEGMENT = 1;
kony.apps.coe.ess.MyApprovals.media.CONSTANTS_WIDGET_DYNAMICSEGMENT = 2;

/**
 * @memberof       Media
 * @param          {CONSTANTS} widgetType 		- The constants provied for the lazy loading behaviour{konywidget} Widget 			- THE refernce to the kony Image Widget		{String} serviceName 		- the Service name to retrive image binary{String} DataObject 			- the table or object name to retrive image binary{String} media 				- THis is binary id to retrive the binary content from object in case of normal widgetType{JSON} segmentConfiguration  - Must Contains the keys
-- ImageWidgetName{String}
-- hideWidgetNames{ARRAY} containing list of widgets to be hidden on sucessful image downlaod is done
 * @return         null
 * @description    This method  is used to retrive the bianry content in the files and set to the images asynchronously
 */
kony.apps.coe.ess.MyApprovals.media.lazyLoading = function (widgetType, Widget, serviceName, DataObject, media, segmentConfiguration) {
  try {

    kony.print("--start kony.apps.coe.ess.MyApprovals.media.lazyLoading --");
    //Input validaion
    if (isEmpty(widgetType.toString()) || isEmpty(Widget) || isEmpty(serviceName) || isEmpty(DataObject)) {
      handleError(kony.i18n.getLocalizedString("i18n.ess.Application.errorMessage.InputValidation"));
      return;
    }
    if (widgetType == 0) {
      //input validation  for normal
      if (isEmpty(media)) {
        kony.print("-- Error in retriving the media  due to empty mediaid to the function --");
        return;
      }
    } else if (widgetType == 1 || widgetType == 2) {
      if (isEmpty(segmentConfiguration.ImageWidgetName) || isEmpty(segmentConfiguration.ImageWidgetName)) {
        handleError(kony.i18n.getLocalizedString("i18n.ess.Application.errorMessage.InputValidation"));
        return;
      }
    } else {
      handleError(kony.i18n.getLocalizedString("i18n.ess.Application.errorMessage.InputValidation"));
      return;
    }

    if (widgetType == 1) {
      //segment			
      var Sucesscallback = function (Widget, index, segmentConfiguration, MediaID, binaryResponse) {
        try{
          if(MediaID !== null && MediaID !== undefined && MediaID !== "")	{
            if (Widget.data[index][segmentConfiguration.MediaKeyAttribute] == MediaID) {
              //no change in the segment row
              var rowData = Widget.data[index];
              //making the widigets to hide which are not required on setting the image
              for (var Iteratorindex in segmentConfiguration.hideWidgetNames) {
                rowData[segmentConfiguration.hideWidgetNames[Iteratorindex]] = {
                  "isVisible": false
                };
              }
              if (isEmpty(binaryResponse)) {
                //response is null
              } else {
                rowData[segmentConfiguration.ImageWidgetName] = {
                  "isVisible": true,
                  "base64": binaryResponse,
                };
                //#ifdef android
                var rawBytes = kony.convertToRawBytes(binaryResponse);
                rowData[segmentConfiguration.ImageWidgetName].rawBytes = rawBytes;
                //#endif

                //#ifdef tabrcandroid
                var rawBytes = kony.convertToRawBytes(binaryResponse);
                rowData[segmentConfiguration.ImageWidgetName].rawBytes = rawBytes;
                //#endif

                //#ifdef iphone
                rowData[segmentConfiguration.ImageWidgetName].base64 = binaryResponse;
                //#endif
                kony.print("----- the data setting to the segment at " + index + " rowdata is :" + JSON.stringify(rowData));
                Widget.setDataAt(rowData, parseInt(index,10), 0);
                RetriveImageAtIndex(index-1);
              }

            }
          }else {
            //change in the segment row data
            //do nothing
            kony.print("--row data for the widiget is changed at index" + index + "--");
          }
        }catch(exception){
           	handleError(exception);
			kony.print("---- error in success callback of medai lazy loading: "+exception);
          }
      };

      var errorCallBack = function (index, err) {
        if(index<0){
          //All the rows in the segments has retrived the images now required terminate the control
          return;
        }
        //ignoring the error in media retrival              
        kony.print("--Error in setting image to the segment row  " + index + " is " + JSON.stringify(err) + "---");
        RetriveImageAtIndex(index-1);
      };

      var RetriveImageAtIndex=function(index){
        if(index<0){         
          //All the rows in the segments has retrived the images now required terminate the control
          return;
        }              
        var segmentdata = Widget.data;
        var MediaID = segmentdata[index][segmentConfiguration.MediaKeyAttribute];
        if (isEmpty(MediaID) || MediaID === undefined) {
          // no image available for the employee
          RetriveImageAtIndex(index-1);
        } else {
          kony.apps.coe.ess.MVVM.GetbinaryContent(serviceName, DataObject, MediaID, Sucesscallback.bind(this, Widget, index, segmentConfiguration, MediaID), errorCallBack.bind(this, index));
        }

      };
      if(isEmpty(Widget.data)){
        //the no of rows in the segment is null 
        return;
      }
      var segementNoOfRows=Widget.data.length;	        
      if(isEmpty(segementNoOfRows)){
        //the no of rows in the segment is null or unable to retrive the no of rows in the segment
        return;
      }				
      RetriveImageAtIndex(segementNoOfRows-1);

    } else if (widgetType == 2) {
      // dynamic segment
      var segmentdata = Widget.Data;
      var Sucesscallback = function (Widget, index, segmentConfiguration, MediaID, binaryResponse) {
        if(MediaID !== null && MediaID !== undefined && MediaID !== "")	{
          if (Widget.Data[index][segmentConfiguration.MediaKeyAttribute] == MediaID) {
            //no change in the segment row
            var rowData = Widget.Data[index];
            //making the widigets to hide which are not required on setting the image
            for (var Iteratorindex in segmentConfiguration.hideWidgetNames) {
              rowData[segmentConfiguration.hideWidgetNames[Iteratorindex]] = {
                "isVisible": false
              };
            }
            if (isEmpty(binaryResponse)) {
              //response is null
            } else {                     
              rowData[segmentConfiguration.ImageWidgetName] = {
                "isVisible": true
              };
              //#ifdef android
              var rawBytes = kony.convertToRawBytes(binaryResponse);
              rowData[segmentConfiguration.ImageWidgetName].rawBytes = rawBytes;
              //#endif
              //#ifdef iphone
              rowData[segmentConfiguration.ImageWidgetName].base64 = binaryResponse;
              //#endif
              Widget.setDataAtIndex(index, rowData);
            }
            retriveImageAtindex(index-1);    


          } 
        }else {
          //change in the segment row data
          //do nothing
          kony.print("--row data for the widiget is changed at index" + index + "--");
        }

      };
      var errorCallBack = function (index, err) {
        //ignoring the error in media retrival              
        kony.print("--Error in setting image to the segment row  " + index + " is " + JSON.stringify(err) + "---");           
        retriveImageAtindex(index-1);
      };
      var retriveImageAtindex=function(index){
        if(index<0){
          //All the rows in the segments has retrived the images now required terminate the control
          return;
        } 
        var segmentdata = Widget.Data;
        if(MediaID !== null && MediaID !== undefined && MediaID !== "")	{
          var MediaID = segmentdata[index][segmentConfiguration.MediaKeyAttribute];
          if (isEmpty(MediaID) || MediaID === undefined) {
            // no image available for the employee
            retriveImageAtindex(index-1);
          }
        }else {
          kony.apps.coe.ess.MVVM.GetbinaryContent(serviceName, DataObject, MediaID, Sucesscallback.bind(this, Widget, index, segmentConfiguration, MediaID), errorCallBack.bind(this, index));
        }
      }

      if(isEmpty(Widget.Data.length)||Widget.Data.length<=0){
        //no records available

      }else{
        var segmentdata = Widget.Data;
        retriveImageAtindex(segmentdata.length-1);
      }

    } else {
      //setting the image to the normal Image Widget

      if (isEmpty(media)) {
        // no image available for the employee
      }else{
        kony.apps.coe.ess.MVVM.GetbinaryContent(serviceName, DataObject, media, function (Widget, binaryResponse) {
          if(isEmpty(binaryResponse)){
            //response is null form backend so not required to assign the image to the widget
          }else{
            //#ifdef android
            var rawBytes = kony.convertToRawBytes(binaryResponse);
            Widget.rawBytes = rawBytes;
            //#endif
            //#ifdef iphone
            Widget.base64 = binaryResponse;
            //#endif
          }

        }
                                                .bind(this, Widget), function (err) {
          kony.print("--error occured during the binary retrival " + JSON.stringify(err) + "--");
        });
      }
    }

    kony.print("--END kony.apps.coe.ess.MyApprovals.media.lazyLoading --");
    return;
  } catch (e) {		      	
    handleError(kony.i18n.getLocalizedString("i18n.ess.Media.errorMessage.loadingMedia"));
    kony.print("--error occured during the binary retrival " + JSON.stringify(e) + "--");
  }
};

kony.apps.coe.ess.MyApprovals.media.lazyLoadingImages = function (widgetType, Widget, serviceName, DataObject, media, segmentConfiguration) {
  try {

    kony.print("--start kony.apps.coe.ess.MyApprovals.media.lazyLoading --");
    //Input validaion
    if (isEmpty(widgetType.toString()) || isEmpty(Widget) || isEmpty(serviceName) || isEmpty(DataObject)) {
      //handleError(kony.i18n.getLocalizedString("i18n.ess.Application.errorMessage.InputValidation"));
      kony.print("--Invalid id's for Image--");
      return;
    }
    if (widgetType === 0) {
      //input validation  for normal
      if (isEmpty(media)) {
        kony.print("-- Error in retriving the media  due to empty mediaid to the function --");
        return;
      }
    } else if (widgetType == 1 || widgetType == 2) {
      if (isEmpty(segmentConfiguration.ImageWidgetName) || isEmpty(segmentConfiguration.ImageWidgetName)) {
        handleError(kony.i18n.getLocalizedString("i18n.ess.Application.errorMessage.InputValidation"));
        return;
      }
    } else {
      handleError(kony.i18n.getLocalizedString("i18n.ess.Application.errorMessage.InputValidation"));
      return;
    }

    if (widgetType == 1) {
      //segment			
      var Sucesscallback = function (Widget, index, segmentConfiguration, MediaID, binaryResponse) {				
        if(MediaID !== null && MediaID !== undefined && MediaID !== "")	{
          if (Widget.data[index][segmentConfiguration.MediaKeyAttribute] == MediaID) {
            //no change in the segment row
            var rowData = Widget.data[index];
            //making the widigets to hide which are not required on setting the image
            for (var Iteratorindex in segmentConfiguration.hideWidgetNames) {
              rowData[segmentConfiguration.hideWidgetNames[Iteratorindex]] = {
                "isVisible": false
              };
            }
            if (isEmpty(binaryResponse)) {
              //response is null
            } else {
              rowData[segmentConfiguration.ImageWidgetName] = {
                "isVisible": true,
                "base64": binaryResponse,
              };
              //#ifdef android
              var rawBytes = kony.convertToRawBytes(binaryResponse);
              rowData[segmentConfiguration.ImageWidgetName].rawBytes = rawBytes;
              //#endif
              //#ifdef tabrcandroid
              var rawBytes = kony.convertToRawBytes(binaryResponse);
              rowData[segmentConfiguration.ImageWidgetName].rawBytes = rawBytes;
              //#endif
              //#ifdef iphone
              rowData[segmentConfiguration.ImageWidgetName].base64 = binaryResponse;
              //#endif
              kony.print("----- the data setting to the segment at " + index + " rowdata is :" + JSON.stringify(rowData));
              Widget.setDataAt(rowData, parseInt(index,10));
              RetriveImageAtIndex(index-1);
            }

          }
        }else {
          //change in the segment row data
          //do nothing
          kony.print("--row data for the widiget is changed at index" + index + "--");
        }
      };

      var errorCallBack = function (index, err) {
        if(index<0){
          //All the rows in the segments has retrived the images now required terminate the control
          return;
        }
        //ignoring the error in media retrival              
        kony.print("--Error in setting image to the segment row  " + index + " is " + JSON.stringify(err) + "---");
        RetriveImageAtIndex(index-1);
      };

      var RetriveImageAtIndex=function(index){
        if(index<0){
          //All the rows in the segments has retrived the images now required terminate the control
          return;
        }              
        var segmentdata = Widget.data;
        var MediaID = segmentdata[index][segmentConfiguration.MediaKeyAttribute];
        if (isEmpty(MediaID)) {
          // no image available for the employee
          RetriveImageAtIndex(index-1);
        } else {
          kony.apps.coe.ess.MVVM.GetbinaryContent(serviceName, DataObject, MediaID, Sucesscallback.bind(this, Widget, index, segmentConfiguration, MediaID), errorCallBack.bind(this, index));
        }

      };
      if(isEmpty(Widget.data)){
        //the no of rows in the segment is null 
        return;
      }
      var segementNoOfRows=Widget.data.length;	        
      if(isEmpty(segementNoOfRows)){
        //the no of rows in the segment is null or unable to retrive the no of rows in the segment
        return;
      }				
      RetriveImageAtIndex(segementNoOfRows-1);

    } else if (widgetType == 2) {
      // dynamic segment
      var segmentdata = Widget.Data;
      var Sucesscallback = function (Widget, index, segmentConfiguration, MediaID, binaryResponse) {
        if(MediaID !== null && MediaID !== undefined && MediaID !== "")	{	
          if (Widget.Data[index][segmentConfiguration.MediaKeyAttribute] == MediaID) {
            //no change in the segment row
            var rowData = Widget.Data[index];
            //making the widigets to hide which are not required on setting the image
            for (var Iteratorindex in segmentConfiguration.hideWidgetNames) {
              rowData[segmentConfiguration.hideWidgetNames[Iteratorindex]] = {
                "isVisible": false
              };
            }
            if (isEmpty(binaryResponse)) {
              //response is null
            } else {
              rowData[segmentConfiguration.ImageWidgetName] = {
                "isVisible": true
              };
              //#ifdef android
              var rawBytes = kony.convertToRawBytes(binaryResponse);
              rowData[segmentConfiguration.ImageWidgetName].rawBytes = rawBytes;
              //#endif
              
              //#ifdef iphone
              rowData[segmentConfiguration.ImageWidgetName].base64 = binaryResponse;
              //#endif
              Widget.setDataAtIndex(index, rowData);
            }

          } 
        }else {
          //change in the segment row data
          //do nothing
          kony.print("--row data for the widiget is changed at index" + index + "--");
        }

      };
      var errorCallBack = function (index, err) {
        //ignoring the error in media retrival
        kony.print("--Error in setting image to the segment row  " + index + " is " + JSON.stringify(err) + "---");
      };

      for (var index in segmentdata) {
        var MediaID = segmentdata[index][segmentConfiguration.MediaKeyAttribute];
        if (isEmpty(MediaID)) {
          // no image available for the employee
        } else {
          kony.apps.coe.ess.MVVM.GetbinaryContent(serviceName, DataObject, MediaID, Sucesscallback.bind(this, Widget, index, segmentConfiguration, MediaID), errorCallBack.bind(this, index));
        }

      }
    } else {
      //setting the image to the normal Image Widget
      kony.print("setting the image to the normal Image Widget");
      if (isEmpty(media)) {
        // no image available for the employee
        kony.print("no image available for the employee");
      }else{
        kony.print("Get the binary content fot the normal widget");
        kony.apps.coe.ess.MVVM.GetbinaryContent(serviceName, DataObject, media, function (Widget, binaryResponse) {
          kony.print("Binary Response::" +JSON.stringify(binaryResponse));
          if(isEmpty(binaryResponse)){
            kony.print("Empty Binary Response:::" +JSON.stringify(binaryResponse));
            //response is null form backend so not required to assign the image to the widget
          }else{
            //#ifdef android
            var rawBytes = kony.convertToRawBytes(binaryResponse);
            Widget.rawBytes = rawBytes;
            //#endif
            
            //#ifdef iphone
            Widget.base64 = binaryResponse;
            //#endif

            //#ifdef tabrcandroid
            var rawBytes = kony.convertToRawBytes(binaryResponse);
            Widget.rawBytes = rawBytes;
            //#endif
            
            //#ifdef ipad
            Widget.base64 = binaryResponse;
            //#endif

            kony.print("Not Empty Binary Response:::" +JSON.stringify(binaryResponse));
          }

        }
                                                .bind(this, Widget), function (err) {
          kony.print("--error occured during the binary retrival " + JSON.stringify(err) + "--");
        });
      }
    }

    kony.print("--END kony.apps.coe.ess.MyApprovals.media.lazyLoading --");
    return;
  } catch (e) {		
    handleError(kony.i18n.getLocalizedString("i18n.ess.Media.errorMessage.loadingMedia"));
    kony.print("--error occured during the binary retrival " + JSON.stringify(e) + "--");
  }
};

// kony.apps.coe.ess.MyApprovals.media.prototype.fetchImage2 = function(segmentName,imgwidget)
// {
//    var data = segmentName.data;
//   if(segmentName.data !=null && segmentName.data!= "")
// 	{
//   function errorcallback(segmentName,imgwidget,index,resp)
//   {
//     if(segmentName.data !=null && segmentName.data!= "")
// 	{
//     var data = segmentName.data;
//     	if(data[index]!==undefined&&(data[index]!==""||data[index]!==null))
//         {
//           var intials = "";
//           if(data[index].fullName!==undefined && data[index].fullName !==null && data[index].fullName != "")
//          { var nameArr = data[index].fullName.split(" ");
//           if(nameArr.length>0)
//             {
//               intials = ""+nameArr[0].slice(0,1)+nameArr[nameArr.length-1].slice(0,1);
//             }
//           else if(nameArr.length==0)
//             {
//                 intials = ""+nameArr[0].slice(0,1);
//             }
//          }
//            data[index].lblIntials={isVisible:true,text:intials.toLocaleUpperCase() ,zIndex:3};    
//               data[index][imgwidget] = {src:"people.png"};
//            var temp = data[index];
//          segmentName.setDataAt(temp,index); //ENABLE WHILE BUILD
//         }
//       }
//   }


//   function successcallback(segmentName,imgwidget,media_id,index,resp)
//   {
// if(segmentName.data !=null && segmentName.data!= "")
// 	{
//     	var data = segmentName.data;
//     	if(data[index]!==undefined&&(data[index]!==""||data[index]!==null))
//         {
//   			if(data[index].media_id==media_id)
//               {
//                  if(data[index].lblIntials!=undefined)
//                  {
//                    data[index].lblIntials = {isVisible:false};
//                  }
//          	 data[index][imgwidget]={base64:resp}; 
//             var temp = data[index];
//            segmentName.setDataAt(temp,index); // ENABLE WHILE BUILD
//               }
//         }
//   }
//   }
//   if(data!=null||data!="")
//     {
//   for(var i=0;i<data.length;i++)
//      {
//        if(kony.net.isNetworkAvailable(constants.NETWORK_TYPE_ANY)){
//         kony.apps.coe.ess.MVVM.GetbinaryContent("Employee", "mediaEmployee", data[i].media_id, successcallback.bind(this, segmentName,imgwidget,data[i].media_id,i),errorcallback.bind(this,segmentName,imgwidget,i));             
//        }
//        else
//          {
//            errorcallback(segmentName,imgwidget,i);
//          }
//   }
//     }
//     }
// };

