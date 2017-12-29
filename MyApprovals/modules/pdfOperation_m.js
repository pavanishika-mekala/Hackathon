/**
 * @module pdfOperation
 * @author Mekala.Sreenivasan
 * @category UI/Actions 
 * @description  
 * © 2016 Kony Inc. 
 */
// Region - namespaces. 
kony = kony || {};
kony.apps = kony.apps || {};
kony.apps.ess = kony.apps.ess || {};
kony.apps.ess.myApprovals = kony.apps.ess.myApprovals || {};
// Region - Class / object constructor.
/**
 * @class pdfOperation
 * This class includes Pdf related operations like Rendering the PDF within the app,Download and Mail the PDF files
 */

kony.apps.ess.myApprovals.pdfOperation = function() {
    kony.print("-- Start pdfOperation --");
    var key = 0;
    var statementToMail = "";
    var statementToDownload = "";
    var subject = "";
    var msgBody = "";
  	var type = "";
    kony.print("-- End pdfOperation --");
};

/**
 * @function postShowFrmPdfReader
 * This fucntion is invoked to give inputs to browser widget
 * invokes kony function to get the file from file path to read it \
 * @member of openPdf#
 * @param {void}
 * @returns {void}
 */
kony.apps.ess.myApprovals.pdfOperation.prototype.postShowFrmPdfReader = function(){
  var orignalFilePath = kony.apps.coe.ess.globalVariables.filePath;
  var file = new kony.io.File(orignalFilePath);
        var data = file.read();
        var config = {
          "mimeType" : kony.apps.ess.myApprovals.pdfOperation.type,
          "encoding" : "UTF-8"
        };
        frmPdfReader.browserPdf.loadData(data,config);
};

/**
 * @function openPdf
 * This function is invoked to get the PDF image of each page
 * This invokes FFi openPage to get the base64 of each page
 * @memberof openPdf#
 * @params {integer} pageNum - The page number
 * @returns {void}
 */
kony.apps.ess.myApprovals.pdfOperation.prototype.openPdf = function(pageNum,orignalFilePath) {
    kony.print("-- Start openPdf --");
  	//#ifdef android 
  		var flag = OpenFile.openFile(orignalFilePath);
		if(flag === 1){
          alert("not found");
        }
  	//#endif 
  	//#ifdef tabrcandroid 
  		var flag1 = OpenFile.openFile(orignalFilePath);
		if(flag1 === 1){
          alert("not found");
        }
  	//#endif 
  	//#ifdef iphone
  		kony.apps.coe.ess.globalVariables.filePath = orignalFilePath;
  		frmPdfReader.show();
  	//#endif
    kony.print("-- End openPdf --");
};

/**
 * @function showPreviousForm
 * This function is invoked on the click of the close icon in the frmPdfReader
 * It shows the previous form
 * @memberof pdfOperation#
 * @returns {void}
 */
kony.apps.ess.myApprovals.pdfOperation.prototype.showPreviousForm = function() {
    kony.print("-- Start showPreviousForm --");
    var previousForm = kony.application.getPreviousForm();
      previousForm.show();
    kony.print("-- End showPreviousForm");
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
kony.apps.ess.myApprovals.pdfOperation.prototype.getBinaryToMail = function(formName, context) {
    kony.print("-- Start getBinaryToMail --");
    try {
        kony.application.showLoadingScreen(null, "Downloading...", constants.LOADING_SCREEN_POSITION_ONLY_CENTER,false, true, {
            enableMenuKey: false,
			enableBackKey: false
        });
        var index = context.rowIndex;
        var mediaDetails = {};
        var fileStatus = false;
        var fileName = "";
        if (formName === frmPayCheck) {
            mediaDetails = kony.apps.ess.myApprovals.payCheckUI.payCheckData[index];
            kony.apps.ess.myApprovals.payCheckUI.payCheckFileName = kony.i18n.getLocalizedString("i18n.myApprovals.payCheckFileName.text") + " " + mediaDetails.release_date + ".pdf";
            kony.apps.ess.myApprovals.pdfOperation.subject = kony.i18n.getLocalizedString("i18n.myApprovals.subjectOfEmailPayCheck.text") + " " + mediaDetails.release_date;
            kony.apps.ess.myApprovals.pdfOperation.msgBody = kony.i18n.getLocalizedString("i18n.myApprovals.msgBodyOfEmailPayCheck.text") + " " + mediaDetails.release_date;
            fileName = kony.apps.ess.myApprovals.payCheckUI.payCheckFileName;
            fileStatus = this.getFileStatus(kony.apps.ess.myApprovals.payCheckUI.payCheckFileName);
            kony.apps.ess.myApprovals.pdfOperation.statementToMail = fileName;
        } else {
            mediaDetails = kony.apps.ess.myApprovals.taxStatementUI.taxStatementData[index];
            kony.apps.ess.myApprovals.taxStatementUI.taxStatementFileName = kony.i18n.getLocalizedString("i18n.myApprovals.taxStatementFileName.text") + " " + mediaDetails.release_date + ".pdf";
            kony.apps.ess.myApprovals.pdfOperation.subject = kony.i18n.getLocalizedString("i18n.myApprovals.subjectOfEmailTaxStatement.text") + " " + mediaDetails.release_date;
            kony.apps.ess.myApprovals.pdfOperation.msgBody = kony.i18n.getLocalizedString("i18n.myApprovals.msgBodyOfEmailTaxStatement.text") + " " + mediaDetails.release_date;
            fileName = kony.apps.ess.myApprovals.taxStatementUI.taxStatementFileName;
            fileStatus = this.getFileStatus(kony.apps.ess.myApprovals.taxStatementUI.taxStatementFileName);
            kony.apps.ess.myApprovals.pdfOperation.statementToMail = fileName;
        }
        if (fileStatus === false) {
            if (mediaDetails.name !== null) {
                getImageData(mediaDetails.name, this.getBinaryToMailSuccess, this.getMediaToMailerror);
            } else {
                kony.application.dismissLoadingScreen();
            }
        } else {
            var filePath = "";
            //#ifdef android
            filePath = "file:///storage/emulated/0/Download/myApprovals/" + fileName;
            //#else
            filePath = "" + kony.io.FileSystem.getDataDirectoryPath() + "/myApprovals/" + fileName;
            //#endif
            var file = new kony.io.File(filePath);
            var fileRawBytes = file.read();
            kony.application.dismissLoadingScreen();
            this.mailPdfOnSuccess(filePath, fileRawBytes);
        }
        if (formName === frmPayCheck) {
            var animateObj = new kony.apps.ess.myApprovals.payCheckUI();
            animateObj.animateSegmentRowOnSwipeBack(kony.apps.ess.myApprovals.payCheckUI.swipedRow, 100);
        } else {
            var animateRow = new kony.apps.ess.myApprovals.taxStatementUI();
            animateRow.animateTaxSegmentRowOnSwipeBack(kony.apps.ess.myApprovals.taxStatementUI.swipedSegmentRow, 100);
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
kony.apps.ess.myApprovals.pdfOperation.prototype.getBinaryToMailSuccess = function(response) {
    kony.print("-- Start getBinaryToMailSuccess --");
    var pdfObj = new kony.apps.ess.myApprovals.pdfOperation();
    var returnedValue = kony.convertToRawBytes(response);
    var filePath = pdfObj.writeRawBytesToFile(returnedValue, kony.apps.ess.myApprovals.pdfOperation.statementToMail);
    kony.application.dismissLoadingScreen();
    //#ifdef android
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
kony.apps.ess.myApprovals.pdfOperation.prototype.mailPdfOnSuccess = function(filePath, response) {
    kony.print("-- Start mailPdfOnSuccess --");
    try {
        var attachment = [];
        var toRecipient = [];
        var ccRecipient = [];
        var bccRecipient = [];
        var isMsgBodyHtml = false;
        //Creating mail attachment JSON
        //#ifdef android
        attachment = [{
            mimetype: "text/pdf",
            attachment: filePath
        }];
        //#else
        attachment = [{
            mimetype: "text/pdf",
            attachment: response,
            filename: kony.apps.ess.myApprovals.pdfOperation.statementToMail
        }];
        //#endif
        //Invokes phone API
        kony.phone.openEmail(toRecipient, ccRecipient, bccRecipient, kony.apps.ess.myApprovals.pdfOperation.subject, kony.apps.ess.myApprovals.pdfOperation.msgBody, isMsgBodyHtml, attachment);
    } catch (error) {
        handleError(error);
    }
    kony.print("-- End mailPdfOnSuccess --");
};

/**
 * @function getMediaToMailerror
 * This is error call back invoked if error thrown on fetching binary
 * @memberof pdfOperation#
 * @param {JSON} error - Gives the error details
 * @returns {void}
 */
kony.apps.ess.myApprovals.pdfOperation.prototype.getMediaToMailerror = function(error) {
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
 * @memeberof pdfOperation#
 * @param {JSON} formName - Current form details(payCheck or taxStatements)
 * @param {JSON} context -  Contains the row details
 */
kony.apps.ess.myApprovals.pdfOperation.prototype.downloadPDFToDevice = function(formName, context) {
    kony.print("-- Start downloadPDFToDevice--");
    try {
        kony.application.showLoadingScreen(null, "Downloading", constants.LOADING_SCREEN_POSITION_ONLY_CENTER,false, true, {
            enableMenuKey: false,
			enableBackKey: false
        });
        var index = context.rowIndex;
        var mediaDetails = {};
        var fileStatus = false;
        var fileName = "";
        if (formName === frmPayCheck) {
            mediaDetails = kony.apps.ess.myApprovals.payCheckUI.payCheckData[index];
            kony.apps.ess.myApprovals.payCheckUI.payCheckFileName = "PayCheck " + mediaDetails.release_date + ".pdf";
            fileName = kony.apps.ess.myApprovals.payCheckUI.payCheckFileName;
            fileStatus = this.getFileStatus(kony.apps.ess.myApprovals.payCheckUI.payCheckFileName);
            kony.apps.ess.myApprovals.pdfOperation.statementToDownload = fileName;
        } else {
            mediaDetails = kony.apps.ess.myApprovals.taxStatementUI.taxStatementData[index];
            kony.apps.ess.myApprovals.taxStatementUI.taxStatementFileName = "TaxStatement " + mediaDetails.release_date + ".pdf";
            fileName = kony.apps.ess.myApprovals.taxStatementUI.taxStatementFileName;
            fileStatus = this.getFileStatus(kony.apps.ess.myApprovals.taxStatementUI.taxStatementFileName);
            kony.apps.ess.myApprovals.pdfOperation.statementToDownload = fileName;
        }
        if (fileStatus === false) {
            if (mediaDetails.name !== null) {
                getImageData(mediaDetails.name, this.downloadPdfOnSuccess, this.downloadPDFError);
            } else {
                kony.application.dismissLoadingScreen();
            }
        } else {
            kony.application.dismissLoadingScreen();
            var filePath = "";
            //#ifdef android
            filePath = "/storage/emulated/0/Download/myApprovals/" + fileName;
            //#else
            filePath = "" + kony.io.FileSystem.getDataDirectoryPath() + "/myApprovals/" + fileName;
            //#endif
            formName.flxDownloadAlert.setVisibility(true);
        }
        if (formName === frmPayCheck) {
            var animateObj = new kony.apps.ess.myApprovals.payCheckUI();
            animateObj.animateSegmentRowOnSwipeBack(kony.apps.ess.myApprovals.payCheckUI.swipedRow, 100);
        } else {
            var animateRow = new kony.apps.ess.myApprovals.taxStatementUI();
            animateRow.animateTaxSegmentRowOnSwipeBack(kony.apps.ess.myApprovals.taxStatementUI.swipedSegmentRow, 100);
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
 * @memberof pdfOperation#
 * @param {JSON} response - Contains thebinary data of the PDF
 * @returns {void}
 */
kony.apps.ess.myApprovals.pdfOperation.prototype.downloadPdfOnSuccess = function(response) {
    kony.print("-- Start downloadPdfOnSuccess--");
    try {
        kony.application.dismissLoadingScreen();
        var pdfObj = new kony.apps.ess.myApprovals.pdfOperation();
        var returnedValue = kony.convertToRawBytes(response);
        var filePath = pdfObj.writeRawBytesToFile(returnedValue, kony.apps.ess.myApprovals.pdfOperation.statementToMail);
        var currentForm = kony.application.getCurrentForm();
        currentForm.flxDownloadAlert.setVisibility(true);
    } catch (error) {
        kony.application.dismissLoadingScreen();
        handleError(error);
    }
    kony.print("-- End downloadPdfOnSuccess --");
};

/**
 * @function downloadPDFError
 * This is error call back invoked if error thrown while downloading PDF
 * @memberof pdfOperation#
 * @param {JSON} error - Gives the error details
 * @returns {void}
 */
kony.apps.ess.myApprovals.pdfOperation.prototype.downloadPDFError = function(error) {
    kony.print("-- Start downloadPDFError --");
    kony.print("Error in Getting Media: " + JSON.stringify(error));
    kony.application.dismissLoadingScreen();
    handleError(kony.i18n.getLocalizedString("i18n.myApprovals.downloadPDFError.text"));
    kony.print("-- End downloadPDFError --");
};

/**
 * @function getFileStatus
 * This function is invoked to check that the given file is available in the Device memory or not
 * @memberof pdfOperation#
 * @param {string} fileName - Name of the file
 * @returns {boolean} - status of file(true if available or false)
 */
kony.apps.ess.myApprovals.pdfOperation.prototype.getFileStatus = function(fileName) {
    kony.print("-- Start getFileStatus --");
    var status = false;
    var filePath = "";
    //#ifdef android
    filePath = "/storage/emulated/0/Download/MyApprovals/";
    //#endif
  	//#ifdef tabrcandroid
    filePath = "/storage/emulated/0/Download/MyApprovals/";
    //#else
    filePath = "" + kony.io.FileSystem.getDataDirectoryPath() + "/MyApprovals/";
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
 * @memberof pdfOperation#
 * @param {rawBytes} rawData - The file data
 * @param {string} fileName - Name of the file
 * @returns {string} filePath - The path in which  the file is stored
 */
kony.apps.ess.myApprovals.pdfOperation.prototype.writeRawBytesToFile = function(rawData, fileName) {
   this.getFileStatus(fileName);
  	kony.print("-- Start writeRawBytesToFile --");
    var writeStatus;
    var filePath = "";
    //#ifdef android
    filePath = "/storage/emulated/0/Download/MyApprovals/";
  	//#endif
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