define(function() {

  return {

    _prevSelectedMonth : 999,
    _prevSelectedDay : 999,
    _selectedYear : 0,
    _centerX : 0,
    _centerY : 0,
    _endValue:0,
    _widget:"",
    _animWidget : "",
    _meridian : "",
    constructor: function(baseConfig, layoutConfig, pspConfig) {

      this.view.preShow = this._initializeEvents;

      this.view.flxGO.onClick = this._showTime;
      this.view.flxDimensionHour.onTouchMove=this._circleMove;
      this.view.flxDimensionMinute.onTouchMove=this._circleMove;
      var me =this;
      me.view.flxDimensionMinute.onTouchStart=function(){
        me._endValue = 60;
        me._widget = "lblMinute";
        me._animWidget = "flxMinutes";
        me._centerX = me.view.flxDimensionMinute.frame.width/2;
        me._centerY = me.view.flxDimensionMinute.frame.height/2;
      };
      me.view.flxDimensionHour.onTouchStart=function(){
        me._endValue = 12;
        me._widget = "lblHour";
        me._animWidget = "flxHour";
        me._centerX = me.view.flxDimensionHour.frame.width/2;
        me._centerY = me.view.flxDimensionHour.frame.height/2;
      }; 

      me.view.lblAM.onTouchEnd = function(){
        me.view.lblAM.skin = "sknlblBGTransTxtCyan150";
        me.view.lblPM.skin = "sknlblBGTransTxtGrey150";
        me._meridian = "AM";
      };

      me.view.lblPM.onTouchEnd = function(){
        me.view.lblAM.skin = "sknlblBGTransTxtGrey150";
        me.view.lblPM.skin = "sknlblBGTransTxtCyan150";
        me._meridian = "PM";
      };
      me.view.seg1.onSwipe = me._setYear;
      me.view.seg2.onSwipe = me._setYear;
      me.view.seg3.onSwipe = me._setYear;
      me.view.seg4.onSwipe = me._setYear;


    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {

    },

    _showTime:function(){
      var day = this.getDay();
      var month = this.getMonth();
      var year = this.getYear();
      var hour = this.getHour();
      var minutes = this.getMinutes();
      if(this.isValidDate(parseInt(year),parseInt(month)-1,parseInt(day))){
        alert(day+"-"+month+"-"+year+" "+
              hour+":"+minutes+" "+this.getMeridian());
      }else{
        alert("Invalid date selected");
      }
    },

    isValidDate : function(year,month,day){
      var isLeapYear = (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0));
      var day30Months = [3,5,8,10];
      if(month === 1){
        if(isLeapYear === false && day > 28){
          return false;
        }else if(day > 29){
          return false;
        }
      }
      if(day30Months.indexOf(month) > -1 && day > 30){
        return false;
      }
      return true;
    },


    _createMonthDays:function(){
      var weeks = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
      var date = new Date();
      var d = new Date(date.getFullYear(),date.getMonth(),1,0,0,0,0);
      var firstWeekday = d.getDay();
      var skin = "";
      var flexSkin = "";
      this.view.flxScrDays.setDefaultUnit(kony.flex.PERCENTAGE);
      for(var i = 1; i < 32; i++){
        skin = "sknlblBGTransTxtGrey120";
        flexSkin = "sknlblBGTransTxtGrey220";
        if(i == date.getDate()){
          skin = "sknlblBGTransTxtCyan120";
          flexSkin = "sknlblBGTransTxtCyan220";
          this._prevSelectedDay = i;
        }
        var flxDay = new kony.ui.FlexContainer({
          "autogrowMode": kony.flex.AUTOGROW_NONE,
          "clipBounds": true,
          "height": "100%",
          "id": "flxDay"+i,
          "isVisible": true,
          "layoutType": kony.flex.FREE_FORM,
          "left": "0%",
          "skin": "slFbox",
          "top": "0%",
          "width": "14%",
          "zIndex": 1
        }, {}, {});
        var lblDay = new kony.ui.Label({
          "centerX": "50%",
          "height": "30%",
          "id": "lblDay"+i,
          "isVisible": true,
          "left": "10dp",
          "skin": skin,
          "text": weeks[(firstWeekday+i-1)%7],
          "textStyle": {
            "letterSpacing": 0,
            "strikeThrough": false
          },
          "top": "0%",
          "width": "100%",
          "zIndex": 1
        }, {
          "contentAlignment": constants.CONTENT_ALIGN_CENTER,
          "padding": [0, 0, 0, 0],
          "paddingInPixel": false
        }, {
          "textCopyable": false
        });
        var lblDate = new kony.ui.Label({
          "centerX": "50%",
          "height": "60%",
          "id": "lblDate"+i,
          "isVisible": true,
          "left": "0dp",
          "skin": flexSkin,
          "text": i.toFixed(0),
          "textStyle": {
            "letterSpacing": 0,
            "strikeThrough": false
          },
          "top": "30%",
          "width": "100%",
          "zIndex": 1
        }, {
          "contentAlignment": constants.CONTENT_ALIGN_CENTER,
          "padding": [0, 0, 0, 0],
          "paddingInPixel": false
        }, {
          "textCopyable": false
        });
        flxDay.add(lblDay, lblDate);
        this.view.flxScrDays.add(flxDay);
        this.view["flxDay"+i].onClick = this._selectDay;
      }
      this._setMonthDays(date.getMonth(),date.getFullYear());
      var me = this;
      kony.timer.schedule("dayDelay", function(){
        if(date.getDate() > 7){
          me.view.flxScrDays.contentOffset = {x:((date.getDate()-6)*14)+"",y:"0"};
        }else{
          me.view.flxScrDays.contentOffset = {x:"0",y:"0"};
        }
      }, 0.3, false);

    },

    _createMonths:function (){
      var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"];
      var skin = "";
      this.view.flxScrMonths.setDefaultUnit(kony.flex.PERCENTAGE);
      for(var i = 0; i < 12; i++){
        skin = "sknlblBGTransTxtGrey150";
        if(i == (new Date().getMonth())){
          skin = "sknlblBGTransTxtCyan150";
          this._prevSelectedMonth = i;
        }
        var flxMonth = new kony.ui.FlexContainer({
          "autogrowMode": kony.flex.AUTOGROW_NONE,
          "clipBounds": true,
          "height": "100%",
          "id": "flxMonth"+i,
          "isVisible": true,
          "layoutType": kony.flex.FREE_FORM,
          "left": "0%",
          "skin": "slFbox",
          "top": "0%",
          "width": "20%",
          "zIndex": 1
        }, {}, {});
        var lblMonth = new kony.ui.Label({
          "centerX": "50%",
          "height": "100%",
          "id": "lblMonth"+i,
          "isVisible": true,
          "left": "0dp",
          "skin": skin,
          "text": months[i],
          "textStyle": {
            "letterSpacing": 0,
            "strikeThrough": false
          },
          "top": "0%",
          "width": "100%",
          "zIndex": 1
        }, {
          "contentAlignment": constants.CONTENT_ALIGN_CENTER,
          "padding": [0, 0, 0, 0],
          "paddingInPixel": false
        }, {
          "textCopyable": false
        });
        flxMonth.add(lblMonth);
        this.view.flxScrMonths.add(flxMonth);
        this.view["flxMonth"+i].onClick = this._selectMonth;
      }
      var me = this;
      kony.timer.schedule("monthDelay", function(){
        var month = new Date().getMonth();
        if(month > 4){
          me.view.flxScrMonths.contentOffset = {x:((month-3)*20)+"",y:"0"};
        }else{
          me.view.flxScrMonths.contentOffset = {x:"0",y:"0"};
        }
      }, 0.3, false);
    },

    _getMonthDays:function (month,year){
      var date = new Date();
      var day30Months = [3,5,8,10];
      var endDate = 0;
      if(month == 1){
        if(this._isLeapYear(year)){
          endDate = 29;
        }else{
          endDate = 28;  
        }
      }else if(day30Months.indexOf(month) > -1){
        endDate = 30;
      }else{
        endDate = 31;
      }
      return endDate;
    },

    _isLeapYear:function(year){
      return ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0);
    },

    _setYear:function (widget, sectionIndex, rowIndex){
      var yearString = this._selectedYear.toString();
      var widgetIndex = parseInt(widget.id.split("seg")[1]).toFixed(0);
      yearString = yearString.substring(0, (4-widgetIndex))+rowIndex+yearString.substring((5-widgetIndex));
      this._selectedYear = parseInt(yearString).toFixed(0);
      this._setMonthDays(this._prevSelectedMonth, this._selectedYear);
    },

    _setMonthDays:function (month,year){
      var monthDays = this._getMonthDays(month, year);
      if(monthDays == 31){
        this.view.flxDay31.isVisible = true;
        this.view.flxDay30.isVisible = true;
        this.view.flxDay29.isVisible = true;
      }else if(monthDays == 30){
        this.view.flxDay31.isVisible = false;
        this.view.flxDay30.isVisible = true;
        this.view.flxDay29.isVisible = true;
      }else if(this._isLeapYear(year)){
        this.view.flxDay31.isVisible = false;
        this.view.flxDay30.isVisible = false;
        this.view.flxDay29.isVisible = true;
      }else{
        this.view.flxDay31.isVisible = false;
        this.view.flxDay30.isVisible = false;
        this.view.flxDay29.isVisible = false;
      }
    },

    _selectMonth:function(widget){
      var m = parseInt(widget.id.split("flxMonth")[1]); 
      if(m != this._prevSelectedMonth){
        this.view["lblMonth"+m].skin = "sknlblBGTransTxtCyan150";
        this.view["lblMonth"+this._prevSelectedMonth].skin = "sknlblBGTransTxtGrey150";
        this._prevSelectedMonth = m;
      }
      this._setMonthDays(this._prevSelectedMonth, this._selectedYear);
    },

    _selectDay:function (widget){
      var i = parseInt(widget.id.split("flxDay")[1]);
      if(i != this._prevSelectedDay){
        this.view["lblDay"+i].skin = "sknlblBGTransTxtCyan120";
        this.view["lblDay"+this._prevSelectedDay].skin = "sknlblBGTransTxtGrey120";
        this.view["lblDate"+i].skin = "sknlblBGTransTxtCyan220";
        this.view["lblDate"+this._prevSelectedDay].skin = "sknlblBGTransTxtGrey220";
        this._prevSelectedDay = i;
      }  
    },

    _rotateAnimation:function(animWidget,angle) {
      var trans100 = kony.ui.makeAffineTransform();
      trans100.rotate(angle);
      this.view[animWidget].animate(
        kony.ui.createAnimation({
          "100": {
            "stepConfig": {
              "timingFunction": kony.anim.EASE
            },
            "transform": trans100
          }
        }), {
          "delay": 0,
          "iterationCount": 1,
          "fillMode": kony.anim.FILL_MODE_FORWARDS,
          "duration": 0.5
        }
      );
    },

    _initializeEvents:function (){
      //this.view.imgGo.left = "-260%";
      this._createMonthDays();
      this._createMonths();

      this._setTimeandYear();
    },

    _setTimeandYear:function(){
      var date = new Date();
      var hour = date.getHours();
      var minutes = date.getMinutes();
      var year = date.getFullYear().toString();
      this._selectedYear = date.getFullYear();
      if(hour > 11){
        this.view.lblAM.skin = "sknlblBGTransTxtGrey150";
        this.view.lblPM.skin = "sknlblBGTransTxtCyan150";
        hour = (hour-12) === 0 ? 12 : (hour-12);
      }else{
        this.view.lblAM.skin = "sknlblBGTransTxtCyan150";
        this.view.lblPM.skin = "sknlblBGTransTxtGrey150";
      }
      var hourAngle = ((hour*360)/12)*-1+((minutes*30)/60)*-1;
      var minuteAngle = ((minutes*360)/60)*-1;
      this.view.lblHour.text = (hour < 10) ? "0"+hour : hour.toFixed(0);
      this.view.lblMinute.text = (minutes < 10) ? "0"+minutes : minutes.toFixed(0);
      this._rotateAnimation("flxHour", hourAngle.toFixed(0));  
      this._rotateAnimation("flxMinutes", minuteAngle.toFixed(0));
      //alert([0, parseInt(year.charAt(3))]);
      this.view.seg1.selectedRowIndex = [0, parseInt(year.charAt(3))];
      this.view.seg2.selectedRowIndex = [0, parseInt(year.charAt(2))];
      this.view.seg3.selectedRowIndex = [0, parseInt(year.charAt(1))];
      this.view.seg4.selectedRowIndex = [0, parseInt(year.charAt(0))];
    },


    _circleMove:function (source,x,y){
      if(this._endValue!==0){
        var vecInX = x - this._centerX;// get the vector from center to input
        var vecInY = y - this._centerY;
        var rad = Math.atan2(vecInY, vecInX); // In radians
        var angle = -1*(rad * 180 / Math.PI)-90;
        if(angle<0){
          angle=360+angle;
        }
        var value = ((-1*(angle-360)*this._endValue)/360).toFixed();
        if(this._widget == "lblMinute" && parseInt(value) == 60){
          value = "0";
        }else if(this._widget === "lblHour" && parseInt(value) === 0){
          value = "12";
        }
        if(parseInt(value) < 10 || value == "0"){
          value = "0"+value;
        }
        this.view[this._widget].text=value;
        this._rotateAnimation(this._animWidget,angle.toFixed());
      }
    },



    _getValueFromSegmentContentOffset:function (segID){
      var diffValue = 53;
      //#ifdef android
      diffValue = 99;
      //#endif
      kony.print("contentValue "+this.view[segID].contentOffsetMeasured.y);
      var value = (this.view[segID].contentOffsetMeasured.y / diffValue).toFixed(0);
      this.view[segID].selectedRowIndex = [0, parseInt(value)];
      return value;
    },

    getYear: function (){
      //#ifdef android
      return this._selectedYear;
      //#endif
      //#ifdef iphone
      var str4 = this.view.seg4.selectedItems[0].lblYearValue;
      var str3 = this.view.seg3.selectedItems[0].lblYearValue;
      var str2 = this.view.seg2.selectedItems[0].lblYearValue;
      var str1 = this.view.seg1.selectedItems[0].lblYearValue;
      return str4+str3+str2+str1;
      //#endif

    },

    getMonth : function (){
      var _full_month_names = ["January","February","March","April","May","June","July","August","September","October","November","December"];
      return _full_month_names[this._prevSelectedMonth];
    },

    getDay:function(){
      return this._prevSelectedDay;
    },

    getHour:function(){
      return this.view.lblHour.text;
    },

    getMinutes:function(){
      return this.view.lblMinute.text;
    },

    getMeridian:function(){
      return this._meridian;
    },
  };
});