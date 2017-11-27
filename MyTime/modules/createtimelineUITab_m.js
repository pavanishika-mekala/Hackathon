var skinsforheader = {
    "flxsknbackground": "sknFlxMobD8F4FF100O",
    "lineskin": "sknFlxMobBG979797Op100",
    "textskin": "sknLblMobFC333333Op100FS18px",
    "containerskin": "slFbox",
    "sknindicator": "sknFlxMobBG979797Op100",
};
var TimelineConfig = {
    "Flxname": "flxTimeLine",
    "BtnCancel": "btnClear",
    "BtnClone": "btnCloneTask",
    "BtnClear": "btnClear",
};
var skinconfig = {
    "flxtaskeditmodeskin": "sknFlxMobBg1C7393Op80",
    "flxtaskedcreatedskin": "sknFlxMobBg1C7393Op80",
    "lbltaskedcreatedskin": "sknLblMobFCFFFFFFFS71",
};

/*function preshowfrmhome() {
    apppreshow();
    var tlobj = new kony.apps.mytime.timelineselectionTab(frmTimeSheetCreate, frmTimeSheetCreate.flxTimeLine, frmTimeSheetCreate.segDeleteMenuPopup, frmTimeSheetCreate.btnCloneTask, 8, 10, skinconfig);
    tlobj.createtimeline(skinsforheader);
    
}*/
function preshowfrmhomeTab() {
    apppreshowTab();
    var tlobj = new kony.apps.mytime.timelineselectionTab(frmTimeSheetCreateTab, frmTimeSheetCreateTab.flxTimeLine,8,10,skinconfig);
    tlobj.createtimeline(skinsforheader);
    
}
kony = kony || {};
kony.apps = kony.apps || {};
kony.apps.mytime = kony.apps.mytime || {};

/**
 * @type           Constructor
 * @param          {form Refference [Object]} frmname
 * @param          {flex Refference [Object]} parentflex
 * @param          {Widget Refference [Object]} cancelbutton
 * @param          {Widget Refference [Object]} clonebutton
 * @param          {Number} dayStartAt - Starting of the Day 
 * @param          {Number} hoursInDay - Working Hours in a day
 * @param          {Number} skneditmode - SkinName used in edit mode - Flex Skin
 * @param          {Number} sknlblcreated - SkinName used in created mode - Label Skin
 * @return			None
 * @description    Constructor to create the class object.
 */
kony.apps.mytime.timelineselectionTab = function(frmname, parentflex,/* cancelbutton, clonebutton,*/ dayStartAt, hoursInDay, skinconfig) {
    //this.clonebutton = clonebutton;
    //this.cancelbutton = cancelbutton;
    this.dayStartAt = dayStartAt;
    this.frmname = frmname;
    this.parentflex = parentflex;
    this.hoursInDay = hoursInDay;
    this.flxtaskeditmodeskin = skinconfig.flxtaskeditmodeskin;
    this.flxtaskedcreatedskin = skinconfig.flxtaskedcreatedskin;
    this.lbltaskedcreatedskin = skinconfig.lbltaskedcreatedskin;
    var maxscrollen = "";
    var startfrom = 0;
    var currentflxid = "";
    var currscrolloffset = 0;
    var finalscrolloffset = 0;
    var currscrolloffsetinprecent = "";
    this.datafortimesheet  = [];
    this.ignoreflx = new Array(Number(hoursInDay));
};
/**
 * @type           function
 * @param          {form Refference [Object]} frmname
 * @return			None
 * @description    function to create timeline.
 */
kony.apps.mytime.timelineselectionTab.prototype.createtimeline = function(skinsfortimeline) {
    try {
        //this.cancelbutton.onRowClick = this.setfunctiontodeleteseg.bind(this);
       // this.cancelbutton.onClick = this.noaction;
        var timetoshow = this.dayStartAt - 1;
        var basicconfig_flxscrollts = {
            id: "flxscrollts",
            "skin": skinsfortimeline.flxsknbackground,
            "left": "0%",
            "width": "preferred",
            "height": "100%",
            "zIndex": 1,
            "isVisible": true
        };
        var flxscrollts = new kony.ui.FlexScrollContainer(basicconfig_flxscrollts, {}, {});
        basicconfig_flxscrollts = {
            id: "flxtimeandselectcntnt",
            "left": "0%",
            "width": "preferred",
            "height": "100%",
            "zIndex": 1,
            "isVisible": true
        };
        var flxtimeandselectcntnt = new kony.ui.FlexScrollContainer(basicconfig_flxscrollts, {}, {});
        flxscrollts.bounces = false;
        flxscrollts.horizontalScrollIndicator = true;
        flxscrollts.scrollDirection = kony.flex.SCROLL_HORIZONTAL;
        flxtimeandselectcntnt.bounces = false;
        for (var i = 0; i <= Number(this.hoursInDay) + 2; i++) {
            //redline
            var temp = {
                id: "flxlinecreated" + i,
                skin: skinsfortimeline.lineskin,
                "top": "36.6%",
                "left": "15%",
                "width": "1px",
                "height": "35%",
                "zIndex": 1,
                isVisible: true,
            };
            var flx = this.createflex(temp);
            //lbl with hours
            var lbl = new kony.ui.Label({
                id: "lbltime" + i,
                "top": "0%",
                "left": "0%",
                "skin": skinsfortimeline.textskin,
                "text": this.formatAMPM(timetoshow),
                "width": "preferred",
                "height": "preferred",
                "zIndex": 1,
                isVisible: true,
            }, {}, {});
            var actioncalled = this.noaction;
            if (i > 0 && i <= Number(this.hoursInDay)) {
                actioncalled = this.enablepopup.bind(this);
            }
            //per unit block
            temp = {
                id: "flxtimecontainer" + i,
                skin: skinsfortimeline.containerskin,
                "left": 20 * i + "%",
                "top": "8.6%",
                "onTouchEnd": actioncalled.bind(this),
                "height": "50%",
                "width": "20%",
                "zIndex": 1,
                //"layoutType":kony.flex.FLOW_HORIZONTAL,
                isVisible: true,
            };
            var flxcontainer = this.createflex(temp);
            flxcontainer.add(flx);
            flxcontainer.add(lbl);
            flxscrollts.add(flxcontainer);
            timetoshow++;

        }
        flxtimeandselectcntnt.add(flxscrollts);
        var flxlneforward = this.createflex({
            id: "flxlneforward",
            skin: skinsfortimeline.sknindicator,
            "top": "0%",
            "height": "100%",
            "width": "3%",
            "zIndex": 1,
            isVisible: false,

        });
        flxtimeandselectcntnt.add(flxlneforward);
        flxlneforward = this.createflex({
            id: "flxlineback",
            skin: skinsfortimeline.sknindicator,
            "top": "0%",
            "height": "100%",
            "width": "3%",
            "zIndex": 2,
            isVisible: false,

        });
        flxtimeandselectcntnt.add(flxlneforward);
        this.parentflex.add(flxtimeandselectcntnt);
    } catch (e) {
        handleError(e);
    }
};
/**
 * @type           function
 * @param          {widget Refference [Object]} source
 * @return			None
 * @description    callback function on click of timeslots in timeline.
 */
kony.apps.mytime.timelineselectionTab.prototype.enablepopup = function(source) {
    var idnumber = source.id;
    idnumber = idnumber.split("flxtimecontainer");
    idnumber = idnumber[1];
    this.startfrom = idnumber;
    var tempwidth = 40;
    this.frmname.flxlineback.isVisible = true;
    this.frmname.flxlineback.left = "20%";
    this.frmname.flxlneforward.isVisible = true;
    this.frmname.flxlneforward.left = "61%";
    this.frmname.flxlneforward.onTouchStart = this.onclickof_flxlneforward.bind(this);
    //alert(this.isSpaceAvailable(source.id.split("flxtimecontainer")[1],"right")+" "+source.id.split("flxtimecontainer")[1]);
    if (this.isSpaceAvailable(source.id.split("flxtimecontainer")[1], "right") === false) {
        this.frmname.flxlineback.isVisible = false;
        this.frmname.flxlneforward.left = "41%";
        this.frmname.flxlneforward.onTouchStart = this.onclick_flxcreate.bind(this);
        tempwidth = 20;
    }
    var tempdflxleft = 20;
    if (idnumber == this.hoursInDay) {
        this.frmname.flxlineback.isVisible = false;
        this.frmname.flxlneforward.left = "61%";
        this.frmname.flxlneforward.onTouchStart = this.onclick_flxcreate.bind(this);
        tempwidth = 20;
        tempdflxleft = 40;
    }
    var temp = {
      	"top": "46%",
        "height": "46.13%",
        "id": "selectionflx" + idnumber,
        "skin": this.flxtaskeditmodeskin,
        "left": "60%",
        "width": tempwidth + "%",
        "zIndex": 1,
        "onTouchEnd": this.noaction, //onclick_flxcreate,
        "isVisible": true,
    };
    this.currentflxid = temp.id;
    var selectionflx = this.createflex(temp);
    this.frmname.flxtimeandselectcntnt.add(selectionflx); //addded selected flx		
    this.frmname.flxtimeandselectcntnt.forceLayout();
    this.frmname.flxscrollts.enableScrolling = false;
    this.frmname.flxtimeandselectcntnt.enableScrolling = false;
    var templeft = source.left.split("%");
    templeft = Number(templeft[0]) - 20 + "%";
    this.currscrolloffsetinprecent = {
        x: templeft,
        y: "0%"
    };
    this.frmname.flxscrollts.setContentOffset(this.currscrolloffsetinprecent, false);
    this.animateflexto(tempdflxleft);
    this.removeaction();
};
/**
 * @type           function
 * @param          {widget Refference [Object]} source
 * @return			None
 * @description    callback function on click of right Indicator in timeline.
 */
kony.apps.mytime.timelineselectionTab.prototype.onclickof_flxlneforward = function(source, x, y) {
    //alert("starts "+this.startfrom);
    for (var i = Number(this.startfrom) - 1; i < this.ignoreflx.length; i++) {
        var multiplefactor = 100 / Number(this.hoursInDay);
        if (this.ignoreflx[i] != undefined) {
            if (this.ignoreflx[i].isselected == true) {
                this.maxscrollen = (i - 1) * (multiplefactor);
                break;
            }
        } else {
            this.maxscrollen = Number(this.hoursInDay) * multiplefactor;
        }
    }
    //alert(this.maxscrollen);
    this.frmname.flxlineback.onTouchEnd = this.noaction;
    this.frmname.flxlineback.isVisible = false;
    this.frmname.flxscrollts.enableScrolling = true;
    this.frmname[this.currentflxid].width = "40%";
    this.frmname.flxtimeandselectcntnt.forceLayout();
    this.currscrolloffset = Number(this.frmname.flxscrollts.contentOffsetMeasured.x);
    this.frmname.flxscrollts.onScrolling = this.onscroll.bind(this);
  //TODO 
  // Segment row CLICK - ad segment using config file
    this.frmname.segProjectTaskSelection.onRowClick = this.onclick_flxcreate.bind(this);
   // this.frmname.flxlneforward.onTouchStart = this.onclick_flxcreate.bind(this);
};
/**
 * @type           function
 * @param          {widget Refference [Object]} source
 * @return			None
 * @description    callback function onScroll of flex in timeline.
 */
kony.apps.mytime.timelineselectionTab.prototype.onscroll = function() {
    var winheight = kony.os.deviceInfo().screenWidth;
    var docheight = this.frmname.flxscrollts.contentSizeMeasured.width;
    var scrollTop = this.frmname.flxscrollts.contentOffsetMeasured.x;
    var trackLength = docheight - winheight;
    var pctScrolled = Math.floor(scrollTop / trackLength * 100);
    if (pctScrolled > this.maxscrollen) {
        var tempscroll = {
            x: (Number(this.maxscrollen) + 2) + "%",
            y: ""
        };
        this.frmname.flxscrollts.setContentOffset(tempscroll, false);
        return;
    }
    var scrolled = Number(this.frmname.flxscrollts.contentOffsetMeasured.x);
    if (Number(scrolled - this.currscrolloffset) <= 0) {
        this.frmname.flxscrollts.setContentOffset(this.currscrolloffsetinprecent, false);
    }
    if (Number(scrolled - this.currscrolloffset) === 0) {
        this.frmname[this.currentflxid].left = "20%";
        this.frmname[this.currentflxid].width = "40%";
        this.frmname.flxtimeandselectcntnt.forceLayout();
    } else if (Number(scrolled - this.currscrolloffset) >= 15) {
        this.frmname[this.currentflxid].left = "0%";
        this.frmname[this.currentflxid].width = "60%";
        this.frmname.flxtimeandselectcntnt.forceLayout();
    }
};
/**
 * @type           function
 * @param          {widget Refference [Object]} source
 * @return			None
 * @description    callback function creates label within timeline.
 */
kony.apps.mytime.timelineselectionTab.prototype.Calculateanddraw = function() {
    var scrolled = this.frmname.flxscrollts.contentOffsetMeasured.x - this.currscrolloffset;
    var lastblock = Number(this.blockatscreenleft(this.frmname.flxscrollts)) + 3;
    var left = 20 * Number(this.startfrom);
    var width = lastblock * 20 - left;
    if (this.frmname[this.currentflxid].width === "20%") {
        width = 20;
    }
    var ltext = this.formatAMPM(7 + Number(this.startfrom));
    var rtext = this.formatAMPM(7 + (left + width) / 20);
    var projecttxt = this.frmname.segProjectTaskSelection.selectedRowItems[0].lblProjectName;
  	this.frmname.segProjectTaskSelection.onRowClick = this.noaction;
    var tempflx = {
        id: this.startfrom + "selectedflx" + rtext,
        //text:ltext+"-"+rtext,
        skin: this.flxtaskedcreatedskin,
        "top": "46%",
        "left": left + 3.3 + "%",
        "width": width - 0.5 + "%",
        "height": "46.13%",
        "zIndex": 3,
        isVisible: true,
    };
    var layoutprop = {
        "contentAlignment": constants.CONTENT_ALIGN_CENTER,
        "containerWeight": 100,
        "widgetAlignment": constants.WIDGET_ALIGN_CENTER
    };
    var lbl1 = new kony.ui.Label({
        id: this.startfrom + "lblprojectname" + rtext,
        text: projecttxt,
        skin: this.lbltaskedcreatedskin,
        "top": "10%",
        "width": "preferred",
        "height": "preferred",
        "centerX": "50%",
        "zIndex": 3,
        isVisible: true,
    }, layoutprop, {});
    var lbl2 = new kony.ui.Label({
        id: this.startfrom + "lbltasktofrom" + rtext,
        text: ltext + "-" + rtext,
        skin: this.lbltaskedcreatedskin,
        "bottom": "10%",
        "width": "preferred",
        "height": "preferred",
        "centerX": "50%",
        "zIndex": 3,
        isVisible: true,
    }, layoutprop, {});

    var createdselectedflx = this.createflex(tempflx);
    createdselectedflx.add(lbl1);
    createdselectedflx.add(lbl2);
    this.frmname.flxtimeandselectcntnt.removeAt(3);
    this.frmname.flxscrollts.add(createdselectedflx);
    this.frmname.flxtimeandselectcntnt.forceLayout();
    this.currentflxid = createdselectedflx.id;
    this.ignoringflx(createdselectedflx);
    var datacreated = {
        "starttime": 7 + Number(this.startfrom),
        endtime: 7 + (left + width) / 20,
        "project": projecttxt,
        lblid: tempflx.id
    };
    this.fillData(datacreated);
    this.ondonecreate();

};
/**
 * @type           function
 * @param          {widget Refference [Object]} source
 * @return			None
 * @description    function maintaining data in timeline.
 */
kony.apps.mytime.timelineselectionTab.prototype.fillData = function(data) {
        this.datafortimesheet.push(data);
    };

kony.apps.mytime.timelineselectionTab.prototype.updateData = function(lblid)
{
  for(var i=0;i<this.datafortimesheet.length;i++)
    {
      if(this.datafortimesheet!=null)
        {
        if(this.datafortimesheet[i].lblid===lblid)
        {
          this.datafortimesheet.splice(i,1);
          break;
         
        }
    }
    }
};
    /**
     * @type           function
     * @param          {widget Refference [Object]} source
     * @return			[Array] Array Of JSON.
     * @description    callback function returns data of timeline.
     */

kony.apps.mytime.timelineselectionTab.prototype.getData = function() {
        return this.datafortimesheet;
    }
    /**
     * @type           function
     * @param          {widget Refference [Object]} source
     * @return			None
     * @description    function to show timeslots to be ignored.
     */
kony.apps.mytime.timelineselectionTab.prototype.ignoringflx = function(createdselectedflx) {
    var startflxid = Number((createdselectedflx.left).split("%")[0]) - 3.3;
    var endflxid = Number((createdselectedflx.width).split("%")[0]) + Number(startflxid) + 0.5;
    //  alert(startflxid+" "+endflxid);
    startflxid = startflxid / 20;
    endflxid = (endflxid / 20).toFixed();
    // alert(startflxid+" + "+endflxid);
    if (Number(startflxid) == Number(endflxid) - 1) {
        this.ignoreflx[Number(startflxid) - 1] = {
            "isselected": true,
            project: "currentproject"
        };
    } else {
        for (var i = startflxid - 1; i < endflxid - 1; i++) {
            this.ignoreflx[i] = {
                "isselected": true,
                project: "currentproject"
            };
        }
    }
};
/**
 * @type           function
 * @param          {widget Refference [Object]} source
 * @return			None
 * @description    function to apply action to required timeslots only.
 */
kony.apps.mytime.timelineselectionTab.prototype.applyactiontoselected = function() {
    for (var i = 1; i <= this.ignoreflx.length; i++) {
        if (this.ignoreflx[i - 1] === undefined || this.ignoreflx[i - 1] === "") {
            this.frmname["flxtimecontainer" + i].onTouchEnd = this.enablepopup.bind(this);
        } else {
            this.frmname["flxtimecontainer" + i].onTouchEnd = this.startediting.bind(this);
        }
    }
};
/**
 * @type           function
 * @param          {widget Refference [Object]} source
 * @return			None
 * @description    function to remove action from all timeslots.
 */
kony.apps.mytime.timelineselectionTab.prototype.removeaction = function() {
    for (var i = 0; i <= 10; i++) {
        this.frmname["flxtimecontainer" + i].onTouchEnd = this.noaction;
    }

};
/**
 * @type           function
 * @param          {widget Refference [Object]} source
 * @param			{string} "left / Right" direction in which space to be checked.
 * @return			Boolean
 * @description    function returns if space is available or not.
 */
kony.apps.mytime.timelineselectionTab.prototype.isSpaceAvailable = function(source, dir) {
    var num = Number(source);

    if (dir == "left") {
        num = Number(num) - 1;
    } else if (dir == "right") {
        // num++;
        // alert(num);
    }
    var temp = this.ignoreflx[Number(num)];
    if (temp != undefined) {
        if (temp.isselected == true) {
            return false;
        } else {
            return true;
        }
    } else {
        return true;
    }
};
/**
 * @type           function
 * @param          {widget Refference [Object]} source
 * @return			None
 * @description    function to cancel the task creation
 */
kony.apps.mytime.timelineselectionTab.prototype.canceltaskcreation = function() {
    this.frmname.flxlineback.onTouchEnd = this.noaction;
    this.frmname.flxlineback.isVisible = false;
    this.frmname.flxlneforward.isVisible = false;
    this.frmname.flxtimeandselectcntnt.removeAt(3);
    this.frmname.flxscrollts.onScrolling = this.noaction;
    this.frmname.flxscrollts.enableScrolling = true;
    this.applyactiontoselected();
};
/**
 * @type           function
 * @param          {Number} x percent to be scrolled.
 * @return			None
 * @description    function to animate the flex.
 */
kony.apps.mytime.timelineselectionTab.prototype.animateflexto = function(x) {
    this.frmname[this.currentflxid].animate(
        kony.ui.createAnimation({
            "100": {
                "left": x + "%",
                "stepConfig": {
                    "timingFunction": kony.anim.EASE
                }
            }
        }), {
            "delay": 0,
            "iterationCount": 1,
            "fillMode": kony.anim.FILL_MODE_FORWARDS,
            "duration": 0.25
        }, {
            "animationEnd": this.noaction
        });
};

/**
 * @type           function
 * @return			None
 * @description    function to set everything to intial state.
 */
kony.apps.mytime.timelineselectionTab.prototype.ondonecreate = function() {
    this.frmname.flxscrollts.enableScrolling = true;
    this.frmname.flxlneforward.isVisible = false;
    this.frmname.flxlineback.onTouchEnd = this.noaction;
    this.frmname.flxlineback.isVisible = false;
    this.applyactiontoselected();
};
/**
 * @type           function
 * @return			None
 * @description    callback function to create timeline after selecting time.
 */
kony.apps.mytime.timelineselectionTab.prototype.onclick_flxcreate = function() {
    this.frmname.flxscrollts.onScrolling = this.noaction;
    this.frmname.flxscrollts.onScrollStart = this.noaction;
    this.Calculateanddraw();
};

/**
 * @type           function
 * @param          {widget Refference [Object]} source
 * @return			None
 * @description    callback function to block the screen left.
 */
kony.apps.mytime.timelineselectionTab.prototype.blockatscreenleft = function(flxnameRefference) {

    var winheight = kony.os.deviceInfo().screenWidth;
    var docheight = flxnameRefference.contentSizeMeasured.width;
    var scrollTop = flxnameRefference.contentOffsetMeasured.x;
    var trackLength = docheight - winheight;
    var pctScrolled = Math.floor(scrollTop / trackLength * 100); // gets percentage scrolled (ie: 80 or NaN if tracklength == 0)
    var numbofblckselectd = pctScrolled * (Number(this.hoursInDay) - 2) / 100;
    return numbofblckselectd.toFixed(); //.toFixed() - (startfrom-1); 
};
/**
 * @type           function
 * @param          {JSON} config.
 * @return			widget. Flex
 * @description    function to create flex.
 */
kony.apps.mytime.timelineselectionTab.prototype.createflex = function(basicconfig) {
    var flx = new kony.ui.FlexContainer(basicconfig, {
        "padding": [0, 0, 0, 0],
        "marginInPixel": false,
        "paddingInPixel": false,
    }, {});
    return flx;
};
/**
 * @type           function
 * @param          {widget Refference [Object]} source
 * @return			None
 * @description    callback function to start editing.
 */
kony.apps.mytime.timelineselectionTab.prototype.startediting = function(flxsource) {
    this.removeaction();
    var source = "";
    var tempclickedflxid = (Number(flxsource.id.split("flxtimecontainer")[1]) + Number(this.dayStartAt) - 1);
    for (var i = 0; i < this.datafortimesheet.length; i++) {
        if (this.datafortimesheet[i] != undefined) {
            if (tempclickedflxid >= this.datafortimesheet[i].starttime && tempclickedflxid <= this.datafortimesheet[i].endtime) {
                source = this.frmname[this.datafortimesheet[i].lblid];
                break;
            }
        }
    }
    if (source == "") {
        return;
    }
    this.frmname.flxscrollts.enableScrolling = false;
    var templeft = Number(source.left.split("%")[0]) - 20 - 3.3;
    var tempoffset = {
        x: templeft + "%",
        y: ""
    };
    this.frmname.flxscrollts.setContentOffset(tempoffset, false);
    this.frmname.flxlineback.isVisible = true;
    this.currentflxid = source;
    this.frmname.flxlineback.onTouchEnd = this.addtoleft.bind(this);
};
/**
 * @type           function
 * @return			None
 * @description    callback function edit to left direction.
 */
kony.apps.mytime.timelineselectionTab.prototype.addtoleft = function() {
    this.currentflxid.onTouchEnd = this.ondonecreate.bind(this);
    // alert(this.isSpaceAvailable(((Number(this.currentflxid.left.split("%")[0]))/20).toFixed(),"left")+" "+(Number(this.currentflxid.left.split("%")[0])/20).toFixed());
    if (this.isSpaceAvailable((this.currentflxid.left.split("%")[0] / 20).toFixed() - 1, "left") == true) {
        var oldleft = this.currentflxid.left.split("%")[0];
        var oldwidth = this.currentflxid.width.split("%")[0];
        var oldtext = this.currentflxid.text.split("-");
        var newleft = Number(oldleft) - 20;
        var newwidth = Number(oldwidth) + 20;
        var ltext = this.formatAMPM(Number(this.convertTo24Hour(oldtext[0])) - 1);
        var newtext = ltext + "-" + oldtext[1];
        //  alert(" oldnumber "+oldtext[0]+this.convertTo24Hour(oldtext[0]));
        if (this.convertTo24Hour(oldtext[0]) >= Number(this.dayStartAt)) {
            this.currentflxid.left = newleft + "%";
            this.currentflxid.width = newwidth + "%";
            this.currentflxid.text = newtext;
            this.frmname.flxscrollts.forceLayout();
            var templeft = Number(newleft) - 20 - 3.3;
            this.ignoringflx(this.currentflxid);
            var tempoffset = {
                x: templeft + "%",
                y: ""
            };
            this.frmname.flxscrollts.setContentOffset(tempoffset, false);
        }
    }
};
/**
// Need to be done yet.
 * @type           function
 * @param          {widget Refference [Object]} source
 * @return			None
 * @description    callback function on click of timeslots in timeline.
 */
kony.apps.mytime.timelineselectionTab.prototype.addtoright = function() {

};
/**
 * @type           function
 * @return			None
 * @description    Empty function
 */
kony.apps.mytime.timelineselectionTab.prototype.noaction = function() {

};
/**
 * @type           function
 * @param          {Number} hours
 * @return			None
 * @description    callback function to return time in AM/PM.
 */
kony.apps.mytime.timelineselectionTab.prototype.formatAMPM = function(hours) {
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    var strTime = hours + " " + ampm;
    return strTime;
};
/**
 * @type           function
 * @param          {Number} time
 * @return			None
 * @description    callback function to covert to 24 hours.
 */
kony.apps.mytime.timelineselectionTab.prototype.convertTo24Hour = function(time) {
    var hours = parseInt(time.substr(0, 2));
    if (time.indexOf('AM') != -1 && hours == 12) {
        time = time.replace('12', '0');
    }
    if (time.indexOf('PM') != -1 && hours < 12) {
        time = time.replace(hours, (hours + 12));
    }
    return time.replace(/(AM|PM)/, '');
};
kony.apps.mytime.timelineselectionTab.prototype.setfunctiontodeleteseg = function()
{
  if(this.cancelbutton.selectedRowIndex[1]===0)
    {
      this.deleteCurrentTimeline();
    }
  else if(this.cancelbutton.selectedRowIndex[1]===1)
    {
      
    }
  
};
/**
 * @type           function
 * @param          {Number} time
 * @return			None
 * @description    function to delete the selectedtimeline.
 */
kony.apps.mytime.timelineselectionTab.prototype.deleteCurrentTimeline = function()
{
   var typeofobj = typeof this.currentflxid;
  
  if(typeofobj=="object")   
  {
    
    this.updateData(this.currentflxid.id);
//--TODO - - 7:09PM 7/25
  //  var currtext = this.currentflxid.widgets()[1].text.split("-");
   // alert(currtex);
   // alert(this.ignoreflx);
   	this.frmname.remove(this.currentflxid);
    this.canceltaskcreation();
    this.frmname.forceLayout();
  }
  else if(typeofobj =="string")
    {
      this.canceltaskcreation();
    }
  else 
    {
      
    }
};
/**
 * @type           function
 * @param          {Number} time
 * @return			None
 * @description    function to delete full timeline.
 */
kony.apps.mytime.timelineselectionTab.prototype.deleteall = function()
{
// this.frmname.flxBlank.par
 alert(this.frmname[this.currentflxid].parent);
  //if(this.currentflxid.)
};
