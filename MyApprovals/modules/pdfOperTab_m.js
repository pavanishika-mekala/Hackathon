kony = kony || {};
kony.apps = kony.apps || {};
kony.apps.ess = kony.apps.ess || {};
kony.apps.ess.myApprovals = kony.apps.ess.myApprovals || {};
// Region - Class / object constructor.
/**
 * @class pdfOperationTab
 * This class includes Pdf related operations like Rendering the PDF within the app,Download and Mail the PDF files
 */
var teja;
kony.apps.ess.myApprovals.pdfOperationTab = function() {
    kony.print("-- Start pdfOperationTab --");
    var key = 0;
    var statementToMail = "";
    var statementToDownload = "";
    var subject = "";
    var msgBody = "";
  	var type = "";
    kony.print("-- End pdfOperationTab --");
};

/**@function
 * @member	 :  frmTabListView
 * @returns	 :	None
 * @desc	 :	Fetched binary data for PDF.
 */

kony.apps.ess.myApprovals.pdfOperationTab.prototype.openPdfForTab = function(){
  if(kony.apps.coe.ess.globalVariables.ApprovalRequestDetailDataTab.systemGeneratedAttachments === null || kony.apps.coe.ess.globalVariables.ApprovalRequestDetailDataTab.systemGeneratedAttachments === undefined || kony.apps.coe.ess.globalVariables.ApprovalRequestDetailDataTab.systemGeneratedAttachments === []){
    handleError(kony.i18n.getLocalizedString("i18n.ess.myApprovals.pdfErrorMsg"));
  }else{
    var media_id = kony.apps.coe.ess.globalVariables.ApprovalRequestDetailDataTab.systemGeneratedAttachments[0].Media;
    try{
      openPdfTab(media_id, true);
    }catch(e){
      handleError(kony.i18n.getLocalizedString("i18n.ess.myApprovals.pdfErrorMsg"));
      kony.print("Error while fetching pdf "+e.message);
    }
  }
};

function openPdfTab(mediaId,isPDF) {
  kony.print("openPdf:::::::::::::");
  kony.print("openPdf:::::::::::::");
      if (isEmpty(mediaId)) {
        handleError(kony.i18n.getLocalizedString("i18n.ess.myApprovals.pdfErrorMsg"));
    } else {
        try {
          kony.print("in Else:::::::::::::::::::");
            kony.application.showLoadingScreen(" ", kony.i18n.getLocalizedString("i18n.ess.myApprovals.loadingPdfMsg"), constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, {});
            kony.apps.coe.ess.MVVM.GetbinaryContent("MYAPPROVALS", "ApprovalMedia", mediaId, 
                                                    function(mediaId,response) {
              kony.apps.ess.myApprovals.pdfOperationTab.PdfFetchingSucessCallback(mediaId,isPDF,response);
            }.bind(this, mediaId),
                                                    function(e) {
              kony.application.dismissLoadingScreen();
              handleError(kony.i18n.getLocalizedString("i18n.ess.myApprovals.pdfErrorMsg"));
              kony.print("callback Error while fetching pdf " + e.message);
            });

        } catch (e) {
          	kony.application.dismissLoadingScreen();
            handleError(kony.i18n.getLocalizedString("i18n.ess.myApprovals.pdfErrorMsg"));
            kony.print("catch Error while fetching pdf " + e.message);
        }
    }
};


/**@function
 * @class	 :  frmTabListView
 * @returns	 :	None
 * @desc	 :	Callbacck function : open the pdf if present.
 */
kony.apps.ess.myApprovals.pdfOperationTab.PdfFetchingSucessCallback = function(selectedData,isPDF, response) {
    try {
      kony.print("PdfFetchingSucessCallback::::::::::::::::::::::::::::::");
      kony.print("PdfFetchingSucessCallback::::::::::::::::::::::::::::::");
      kony.print("response::::::::::::::::::::::::::::::"+JSON.stringify(response));
        kony.application.dismissLoadingScreen();
        var returnedValue = kony.convertToRawBytes(response);
        var pdfObj = new kony.apps.ess.myApprovals.pdfOperationTab();
      	var filename;
      	if(isPDF) {
          filename = selectedData + ".pdf";
          kony.apps.ess.myApprovals.pdfOperationTab.type = "application/pdf";
        }
      	else {
          //#ifdef ipad 
          kony.apps.ess.myApprovals.pdfOperationTab.type = "image/png";
          //#else
          	//#ifdef tabrcandroid
          		filename = selectedData + ".png";
          	//#else
          		filename = selectedData + ".jpg";
          	//#endif
          //#endif
        }
        var filePath = pdfObj.writeRawBytesToFile(returnedValue, filename);
        var fileStatus = pdfObj.getFileStatus(filePath);
        kony.print("PdfFetchingSucessCallback Succ End:::::::::::::");
        kony.application.dismissLoadingScreen();
        //#ifdef ipad
        pdfObj.openPdfIpad(filePath);
        //#endif
      
        //#ifdef tabrcandroid
        pdfObj.openPdf(1, filePath);
        //#endif
      
    } catch (e) {
        handleError(kony.i18n.getLocalizedString("i18n.ess.myApprovals.pdfErrorMsg"));
        kony.print("Error while fetching pdf " + e.message);
    }
}


kony.apps.ess.myApprovals.pdfOperationTab.prototype.openPdfIpad = function(orignalFilePath)
{
  kony.apps.coe.ess.globalVariables.filePathTab = orignalFilePath;
  frmTabPdfReader.show();
};


function PdfFetchingSucessErrCallback()
{ kony.application.dismissLoadingScreen();
  kony.print("PdfFetchingSucessErrCallback:::::::::::::::");
}

/**
 * @function postShowfrmTabPdfReader
 * This fucntion is invoked to give inputs to browser widget
 * invokes kony function to get the file from file path to read it \
 * @member of openPdf#
 * @param {void}
 * @returns {void}
 */
kony.apps.ess.myApprovals.pdfOperationTab.prototype.postShowfrmTabPdfReader = function(){
  kony.print("PostSgow Succ:::::::::::::");
  var orignalFilePath = kony.apps.coe.ess.globalVariables.filePathTab;
  var file = new kony.io.File(orignalFilePath);
  var data = file.read();
  var config = {
    "mimeType" : kony.apps.ess.myApprovals.pdfOperationTab.type,
    "encoding" : "UTF-8"
  };
  frmTabPdfReader.browserPdf.loadData(data,config);
  kony.print("PostSgow Succ END:::::::::::::");
};

/**
 * @function openPdf
 * This function is invoked to get the PDF image of each page
 * This invokes FFi openPage to get the base64 of each page
 * @memberof openPdf#
 * @params {integer} pageNum - The page number
 * @returns {void}
 */
kony.apps.ess.myApprovals.pdfOperationTab.prototype.openPdf = function(pageNum,orignalFilePath) {
    kony.print("-- Start openPdf --");
  		var flag = OpenFile.openFile(orignalFilePath);
		if(flag === 1){
          alert("not found");
        }
    kony.print("-- End openPdf --");
};
/**
 * @function getBinaryToMail
 * This function is invoked on the click of the mail icon in segment row of frmPayCheck or frmTaxStatement
 * In this function the status of file is checked
 * If file status is true then file is available in the mobile device memory and the file saved file is used
 * If file status is false then online call is made to get the binary data
 * @memeberof getBinaryToMail#
 * @param {JSON} formName - Current form details(payCheck or taxStatements)
 * @param {JSON} context -  Contains the row details
 */
kony.apps.ess.myApprovals.pdfOperationTab.prototype.getBinaryToMail = function(formName, context) {
    kony.print("-- Start getBinaryToMail --");
    try {
        kony.application.showLoadingScreen(null, "Downloading...", constants.LOADING_SCREEN_POSITION_ONLY_CENTER,  false, true, {
            enableMenuKey: false,
             
            enableBackKey: false
        });
        var index = context.rowIndex;
        var mediaDetails = {};
        var fileStatus = false;
        var fileName = "";
       
        
            mediaDetails = systemGenResponse;
            kony.apps.ess.myApprovals.taxStatementUI.taxStatementFileName = kony.i18n.getLocalizedString("i18n.myApprovals.taxStatementFileName.text") + " " + mediaDetails.release_date + ".pdf";
            kony.apps.ess.myApprovals.pdfOperationTab.subject = kony.i18n.getLocalizedString("i18n.myApprovals.subjectOfEmailTaxStatement.text") + " " + mediaDetails.release_date;
            kony.apps.ess.myApprovals.pdfOperationTab.msgBody = kony.i18n.getLocalizedString("i18n.myApprovals.msgBodyOfEmailTaxStatement.text") + " " + mediaDetails.release_date;
            fileName = kony.apps.ess.myApprovals.taxStatementUI.taxStatementFileName;
            fileStatus = this.getFileStatus(kony.apps.ess.myApprovals.taxStatementUI.taxStatementFileName);
       
        if (fileStatus === false) {
            if (mediaDetails.name !== null) {
                getImageData(mediaDetails.name, this.getBinaryToMailSuccess, this.getMediaToMailerror);
            } else {
                kony.application.dismissLoadingScreen();
            }
        } else {
            var filePath = "";
            //#ifdef tabandroid
            filePath = "file:///storage/emulated/0/Download/myApprovals/" + fileName;
            //#else
            filePath = "" + kony.io.FileSystem.getDataDirectoryPath() + "/myApprovals/" + fileName;
            //#endif
            var file = new kony.io.File(filePath);
            var fileRawBytes = file.read();
            kony.application.dismissLoadingScreen();
            this.mailPdfOnSuccess(filePath, fileRawBytes);
        }
        
    } catch (error) {
        kony.application.dismissLoadingScreen();
        handleError(error);
    }
    kony.print("-- End getBinaryToMail --");
};
/**
 * @function getBinaryToMailSuccess
 * This function is call back invoked on the fetching of the binay data
 * This function writes the file to the mobile device and returns the path where it is saved
 * @memberof mailPdfOnSuccess#
 * @param {JSON} response - Contains thebinary data of the PDF
 * @returns {void}
 */
kony.apps.ess.myApprovals.pdfOperationTab.prototype.getBinaryToMailSuccess = function(response) {
    kony.print("-- Start getBinaryToMailSuccess --");
    var pdfObj = new kony.apps.ess.myApprovals.pdfOperationTab();
    var returnedValue = kony.convertToRawBytes(response);
    var filePath = pdfObj.writeRawBytesToFile(returnedValue, kony.apps.ess.myApprovals.pdfOperationTab.statementToMail);
    kony.application.dismissLoadingScreen();
    //#ifdef tabrcandroid
    filePath = "file://" + filePath;
    pdfObj.mailPdfOnSuccess(filePath, returnedValue);
    //#else
    pdfObj.mailPdfOnSuccess(filePath, returnedValue);
    //#endif
    kony.print("-- End getBinaryToMailSuccess --");
};
/**
 * @function mailPdfOnSuccess
 * This function invokes openEmail API to open the mobile Mail app
 * @memberof mailPdfOnSuccess#
 * @param {JSON} response - Contains thebinary data of the PDF
 * @returns {void}
 */
kony.apps.ess.myApprovals.pdfOperationTab.prototype.mailPdfOnSuccess = function(filePath, response) {
    kony.print("-- Start mailPdfOnSuccess --");
    try {
        var attachment = [];
        var toRecipient = [];
        var ccRecipient = [];
        var bccRecipient = [];
        var isMsgBodyHtml = false;
        //Creating mail attachment JSON
        //#ifdef tabrcandroid
        attachment = [{
            mimetype: "text/pdf",
            attachment: filePath
        }];
        //#else
        attachment = [{
            mimetype: "text/pdf",
            attachment: response,
            filename: kony.apps.ess.myApprovals.pdfOperationTab.statementToMail
        }];
        //#endif
        //Invokes phone API
        kony.phone.openEmail(toRecipient, ccRecipient, bccRecipient, kony.apps.ess.myApprovals.pdfOperationTab.subject, kony.apps.ess.myApprovals.pdfOperationTab.msgBody, isMsgBodyHtml, attachment);
    } catch (error) {
        handleError(error);
    }
    kony.print("-- End mailPdfOnSuccess --");
};

/**
 * @function getMediaToMailerror
 * This is error call back invoked if error thrown on fetching binary
 * @memberof pdfOperationTab#
 * @param {JSON} error - Gives the error details
 * @returns {void}
 */
kony.apps.ess.myApprovals.pdfOperationTab.prototype.getMediaToMailerror = function(error) {
    kony.print("-- Start getMediaToMailerror --");
    kony.print("Error in Getting Media: " + JSON.stringify(error));
    kony.application.dismissLoadingScreen();
    handleError(kony.i18n.getLocalizedString("i18n.myApprovals.sendPdfToMailError.text"));
    kony.print("-- End getMediaToMailerror --");
};
/**
 * @function downloadPDFToDevice
 * This function is invoked on click of the download icon in segment row of frmPayCheck or frmTaxStatement
 * In this function the status of file is checked
 * If file status is true then file is available in the mobile device memory and the file saved file is used
 * If file status is false then online call is made to get the binary data 
 * @memeberof pdfOperationTab#
 * @param {JSON} formName - Current form details(payCheck or taxStatements)
 * @param {JSON} context -  Contains the row details
 */
kony.apps.ess.myApprovals.pdfOperationTab.prototype.downloadPDFToDevice = function(formName, context) {
    kony.print("-- Start downloadPDFToDevice--");
   kony.print("Download");
    try {
        kony.application.showLoadingScreen(null, "Downloading", constants.LOADING_SCREEN_POSITION_ONLY_CENTER,  false, true, {
            enableMenuKey: false,
             
            enableBackKey: false
        });
        var index = context.rowIndex;
        var mediaDetails = {};
        var fileStatus = false;
        var fileName = "";
        
            mediaDetails = systemGenResponse;
      kony.print("mediaDetails");
            kony.apps.ess.myApprovals.taxStatementUI.taxStatementFileName = "TaxStatement " + mediaDetails.release_date + ".pdf";
            fileName = kony.apps.ess.myApprovals.taxStatementUI.taxStatementFileName;
            fileStatus = this.getFileStatus(kony.apps.ess.myApprovals.taxStatementUI.taxStatementFileName);
            kony.apps.ess.myApprovals.pdfOperationTab.statementToDownload = fileName;
        
        if (fileStatus === false) {
            if (mediaDetails.name !== null) {
                getImageData(mediaDetails.name, this.downloadPdfOnSuccess, this.downloadPDFError);
            } else {
                kony.application.dismissLoadingScreen();
            }
        } else {
            kony.application.dismissLoadingScreen();
            var filePath = "";
            //#ifdef tabrcandroid
            filePath = "/storage/emulated/0/Download/myApprovals/" + fileName;
            //#else
            filePath = "" + kony.io.FileSystem.getDataDirectoryPath() + "/myApprovals/" + fileName;
            //#endif
            //formName.flxDownloadAlert.setVisibility(true);
        }
        
    } catch (error) {
        kony.application.dismissLoadingScreen();
        handleError(error);
    }
    kony.print("End downloadPDFToDevice");
};

/**
 * @function downloadPdfOnSuccess
 * This function is call back invoked on the fetching of the binay data
 * This function writes the binary data to a file and returns the path
 * @memberof pdfOperationTab#
 * @param {JSON} response - Contains thebinary data of the PDF
 * @returns {void}
 */
kony.apps.ess.myApprovals.pdfOperationTab.prototype.downloadPdfOnSuccess = function(response) {
    kony.print("-- Start downloadPdfOnSuccess--");
    try {
        kony.application.dismissLoadingScreen();
        var pdfObj = new kony.apps.ess.myApprovals.pdfOperationTab();
        var returnedValue = kony.convertToRawBytes(response);
        var filePath = pdfObj.writeRawBytesToFile(returnedValue, kony.apps.ess.myApprovals.pdfOperationTab.statementToMail);
        var currentForm = kony.application.getCurrentForm();
        //currentForm.flxDownloadAlert.setVisibility(true);
    } catch (error) {
        kony.application.dismissLoadingScreen();
        handleError(error);
    }
    kony.print("-- End downloadPdfOnSuccess --");
};

/**
 * @function downloadPDFError
 * This is error call back invoked if error thrown while downloading PDF
 * @memberof pdfOperationTab#
 * @param {JSON} error - Gives the error details
 * @returns {void}
 */
kony.apps.ess.myApprovals.pdfOperationTab.prototype.downloadPDFError = function(error) {
    kony.print("-- Start downloadPDFError --");
    kony.print("Error in Getting Media: " + JSON.stringify(error));
    kony.application.dismissLoadingScreen();
    handleError(kony.i18n.getLocalizedString("i18n.myApprovals.downloadPDFError.text"));
    kony.print("-- End downloadPDFError --");
};


/**
 * @function getFileStatus
 * This function is invoked to check that the given file is available in the Device memory or not
 * @memberof pdfOperationTab#
 * @param {string} fileName - Name of the file
 * @returns {boolean} - status of file(true if available or false)
 */
kony.apps.ess.myApprovals.pdfOperationTab.prototype.getFileStatus = function(fileName) {
  kony.print("-- Start getFileStatus --");
  var status = false;
  var filePath = "";
  //#ifdef tabrcandroid
  filePath = "/storage/emulated/0/Download/MyApprovals/";
  kony.print("ifdef androidfilePath:::::::::::::"+filePath);
  //#else
  filePath = "" + kony.io.FileSystem.getDataDirectoryPath() + "/MyApprovals/";
  kony.print("filePathfilePath:::::::::::::::"+filePath);
  //#endif
  var appDir = new kony.io.File(filePath);
  if (appDir.exists()) {
    kony.print("--######### Directory Exsist ########--");
    var requiredFileName = new kony.io.File("" + filePath + fileName);
    if (requiredFileName.exists()) {
      kony.print("--######### File Exsist ########--");
      status = true;
    } else {
      kony.print("--######### Directory Exsist file not availabe ########--");
      status = false;
    }
  } else {
    kony.print("--######## Created Directory ########--");
    appDir.createDirectory();
    status = false;
  }
    kony.print("-- End getFileStatus --");
    return status;
};

/**
 * @function writeRawBytesToFile
 * This function is invoked to write the given raw data to a file
 * @memberof pdfOperationTab#
 * @param {rawBytes} rawData - The file data
 * @param {string} fileName - Name of the file
 * @returns {string} filePath - The path in which  the file is stored
 */
kony.apps.ess.myApprovals.pdfOperationTab.prototype.writeRawBytesToFile = function(rawData, fileName) {
    this.getFileStatus(fileName);
  	kony.print("-- Start writeRawBytesToFile --");
    var writeStatus;
    var filePath = "";
    //#ifdef tabrcandroid
    filePath = "/storage/emulated/0/Download/MyApprovals/";
    //#else
    filePath = "" + kony.io.FileSystem.getDataDirectoryPath() + "/MyApprovals/";
    //#endif
    filePath = filePath + fileName;
    var requiredFileName = new kony.io.File("" + filePath);
    if (requiredFileName.exists()) {
        writeStatus = requiredFileName.write(rawData, false);
    } else {
        var createStatus = requiredFileName.createFile();
        writeStatus = requiredFileName.write(rawData, false);
    }
  
    kony.print("-- End writeRawBytesToFile --");
    return filePath;
};