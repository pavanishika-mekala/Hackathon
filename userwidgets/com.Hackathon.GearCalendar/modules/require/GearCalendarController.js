define(function() {

  return {

    _endValue : 0,
    _txtWidget : "",
    _animWidget : "",
    _meridian : "",
    _full_month_names : {"Jan" : "January",
                         "Feb" : "February",
                         "Mar" : "March",
                         "Apr" : "April",
                         "May" : "May",
                         "Jun" : "June",
                         "Jul" : "July",
                         "Aug" : "August",
                         "Sep" : "September",
                         "Oct" : "October",
                         "Nov" : "November",
                         "Dec" : "December"},
    constructor: function(baseConfig, layoutConfig, pspConfig) {

      this.view.preShow = this._initializeEvents;

      this.view.flxGO.onClick = this._showTime;
      var me = this;
      me.view.flxAM.onClick =  function(){
        me._selectMeridian("am");
      };
      me.view.flxPM.onClick = function(){
        me._selectMeridian("pm");
      };

    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {

    },

    _showTime:function (){
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

    _rotateAnimation:function(widget, angle) {
      var trans100 = kony.ui.makeAffineTransform();
      trans100.rotate(angle);
      this.view[widget].animate(
        kony.ui.createAnimation({
          "100": {
            "stepConfig": {
              "timing ": kony.anim.EASE
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

    _animGear:function(widget, delayVal, centerXVal, angle) {
      var trans100 = kony.ui.makeAffineTransform();
      trans100.rotate(angle);
      //#ifdef android
      if(widget == "flxCircleMonth" || widget == "flxCircleDay")
        this.view[widget].centerX = "8%";
      else
        this.view[widget].centerX = "92%";
      //#else
      this.view[widget].animate(
        kony.ui.createAnimation({
          "100": {
            "centerX":centerXVal,
            "stepConfig": {
              "timing ": kony.anim.EASE
            },
            "transform": trans100
          }
        }), {
          "delay": delayVal,
          "iterationCount": 1,
          "fillMode": kony.anim.FILL_MODE_FORWARDS,
          "duration": 1
        }
      );
      //#endif
    },

    _initializeEvents:function(){
      kony.print("_initializeEvents");
      this.view.flxDimensionMonth.onTouchStart = this._circleStart;
      this.view.flxDimensionMonth.onTouchMove = this._circleMove;
      this.view.flxDimensionMonth.onTouchEnd = this._circleEnd;

      this.view.flxDimensionDay.onTouchStart = this._circleStart;
      this.view.flxDimensionDay.onTouchMove = this._circleMove;
      this.view.flxDimensionDay.onTouchEnd = this._circleEnd;

      this.view.flxDimensionHour.onTouchStart = this._circleStart;
      this.view.flxDimensionHour.onTouchMove = this._circleMove;
      this.view.flxDimensionHour.onTouchEnd = this._circleEnd;

      this.view.flxDimensionMin.onTouchStart = this._circleStart;
      this.view.flxDimensionMin.onTouchMove = this._circleMove;
      this.view.flxDimensionMin.onTouchEnd = this._circleEnd;

      var me =this;
      me.view.txtYear4.onTextChange =  function(){
        me._editYear("txtYear4");
        me.view.txtYear3.setFocus(true);
      };
      me.view.txtYear3.onTextChange =  function(){
        me._editYear("txtYear3");
        me.view.txtYear2.setFocus(true);
      };
      me.view.txtYear2.onTextChange =  function(){
        me._editYear("txtYear2");
        me.view.txtYear1.setFocus(true);
      };
      me.view.txtYear1.onTextChange =  function(){
        me._editYear("txtYear1");
      };

      me._animGear("flxCircleDay", 0, "8%", 270);
      me._animGear("flxCircleMonth", 0.5, "8%", 270);
      me._animGear("flxCircleHour", 1, "92%", 90);
      me._animGear("flxCircleMin", 1.5, "92%", 90);
      me._setTime();
    },


    _switchBulbs:function(imgWidget1, imgWidget2, action){
      if(action === "on"){
        imgWidget1.src = "bulb_on.png";
        imgWidget2.src = "bulb_on.png";
      }else{
        imgWidget1.src = "bulb_off.png";
        imgWidget2.src = "bulb_off.png";
      }
    },

    _selectMeridian:function(meridian){
      if(meridian === "am"){
        this.view.imgAM.src = "bulb_on.png";
        this.view.imgPM.src = "bulb_off.png";
        this.view.lblAM.skin = "sknlblBGTransTxtYellow150";
        this.view.lblPM.skin = "sknlblBGTransTxtGrey150";
        this._meridian = "AM";
      }else{
        this.view.imgAM.src = "bulb_off.png";
        this.view.imgPM.src = "bulb_on.png";
        this.view.lblAM.skin = "sknlblBGTransTxtGrey150";
        this.view.lblPM.skin = "sknlblBGTransTxtYellow150";
        this._meridian = "PM";
      }
    },

    _circleStart:function(source,x,y){
      if(source.id === "flxDimensionMonth"){
        this._switchBulbs(this.view.imgMonth1, this.view.imgMonth2, "on");
        this._txtWidget = "lblMonth";
        this._animWidget = "flxCircleMonth";
        this._endValue = 12;
      }else if(source.id === "flxDimensionDay"){
        this._switchBulbs(this.view.imgDay1, this.view.imgDay2, "on");
        this._txtWidget = "lblDay";
        this._animWidget = "flxCircleDay";
        this._endValue = 31;
      }else if(source.id === "flxDimensionHour"){
        this._switchBulbs(this.view.imgHour1, this.view.imgHour2, "on");
        this._txtWidget = "lblHour";
        this._animWidget = "flxCircleHour";
        this._endValue = 12;
      }else{
        this._switchBulbs(this.view.imgMin1, this.view.imgMin2, "on");
        this._txtWidget = "lblMin";
        this._animWidget = "flxCircleMin";
        this._endValue = 60;
      }
    },


    _circleEnd:function(source,x,y){
      if(source.id === "flxDimensionMonth"){
        this._switchBulbs(this.view.imgMonth1, this.view.imgMonth2, "off");
      }else if(source.id === "flxDimensionDay"){
        this._switchBulbs(this.view.imgDay1, this.view.imgDay2, "off");
      }else if(source.id === "flxDimensionHour"){
        this._switchBulbs(this.view.imgHour1, this.view.imgHour2, "off");
      }else{
        this._switchBulbs(this.view.imgMin1, this.view.imgMin2, "off");
      }
    },

    _circleMove:function(source,x,y){
      if(this._endValue!==0){
        var vecInX = x - source.frame.width/2;// get the vector from center to input
        var vecInY = y - source.frame.height/2;
        var rad = Math.atan2(vecInY, vecInX); // In radians
        var angle = -1*(rad * 180 / Math.PI)-90;
        if(angle<0){
          angle=360+angle;
        }
        var value = ((-1*(angle-360)*this._endValue)/360).toFixed();//((angle*_endValue)/360).toFixed();
        kony.print("########Value - "+value+"  "+this._txtWidget);
        if(this._txtWidget == "lblMin" && parseInt(value) == 60){
          value = "0";
        }else if((this._txtWidget == "lblHour" || this._txtWidget == "lblMonth") && parseInt(value) === 0){
          value = "12";
        }else if(this._txtWidget == "lblDay" && parseInt(value) === 0){
          value = 1;
        }

        if(parseInt(value) < 10 || value == "0"){
          value = "0"+value;
        }
        var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
        this.view[this._txtWidget].text = (this._txtWidget === "lblMonth") ? months[parseInt(value)-1] : value;
        this. _rotateAnimation(this._animWidget, angle.toFixed());
      }
    },

    _setTime :function(){
      var date = new Date();
      var hour = date.getHours();
      var minutes = date.getMinutes();
      var day = date.getDate();
      var month = date.getMonth();
      var year = date.getFullYear().toString();
      if(hour > 11){
        this._selectMeridian("pm");
        hour = (hour-12) === 0 ? 12 : (hour-12);
      }else{
        this._selectMeridian("am");
      }
      var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
      this.view.lblMonth.text = months[month];
      this.view.lblDay.text = day < 10 ? "0"+day.toFixed(0) : day.toFixed(0);
      this.view.lblHour.text = hour < 10 ? "0"+hour.toFixed(0) : hour.toFixed(0);
      this.view.lblMin.text = minutes < 10 ? "0"+minutes.toFixed(0) : minutes.toFixed(0);
      this.view.txtYear1.text = year.charAt(3);
      this.view.txtYear2.text = year.charAt(2);
      this.view.txtYear3.text = year.charAt(1);
      this.view.txtYear4.text = year.charAt(0);
    },

    _editYear:function(txtWidget){
      var content = this.view[txtWidget].text;
      if(content.length > 1){
        this.view[txtWidget].text = content.substring(1);
      }
    },

    getYear :function(){
      var str4 = this.view.txtYear1.text;
      var str3 = this.view.txtYear2.text;
      var str2 = this.view.txtYear3.text;
      var str1 = this.view.txtYear4.text;
      return str1+str2+str3+str4;
    },
    getMonth :function(){
      return this._full_month_names[this.view.lblMonth.text];
    },

    getDay :function(){
      return this.view.lblDay.text;
    },

    getHour :function(){
      return this.view.lblHour.text;
    },

    getMinutes :function(){
      return this.view.lblMin.text;
    },

    getMeridian :function(){
      return this._meridian;
    },


  };
});