define(function() {

  return {

    currentMonth : 0,
    currentYear : 0,
    _weekendColor : "",
    _currentDayColor : "sknCurrentDateBGFF5959",
    _selectedDateSkin : "sknSelectedDate",
    _normalDateSkin : "sknNormalDatesGrey",
    isAnyDateSelected : false,
    firstDayOfMonth : null,

    constructor: function(baseConfig, layoutConfig, pspConfig) {

      this.view.preShow = this._resetCalendar;
      this.view.flxCalendar.addGestureRecognizer(constants.GESTURE_TYPE_SWIPE, {fingers: 1},this._onGestureClosure);

    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {

    },

    _resetCalendar : function (){
      var date = new Date();
      this.currentMonth = date.getMonth();
      this.currentYear = date.getFullYear();
      var d = new Date(this.currentYear,this.currentMonth,1,0,0,0,0);
      this.assignDates(d.getDay(),this.currentMonth,this.currentYear);
      this.setCurrentDateColor(this._currentDayColor);
    },

    setEventsAfterSwipe : function(eventsArray){
      var eventDay = eventsArray.eventDay;
      var eventSkin = eventsArray.eventSkin;
      var eventDayNum = this.firstDayOfMonth + parseInt(eventDay) -1;
      this.view["lblDot" + eventDayNum].skin = eventSkin;
      this.view["lblDot" + eventDayNum].isVisible = true;
    },

    assignDates : function (firstDay,currentMonth,currentYear){

      this.currentMonth  = parseInt(currentMonth);
      this.currentYear = parseInt(currentYear);

      kony.print("#### assignDates #### currentMonth - "+currentMonth+" - currentYear - "+currentYear);
      for(var j = 1; j < 38; j++){
        this.view["lbl"+j].text = "";
        this.view["lbl"+j].setVisibility(false);
        this.view["lblDot"+j].setVisibility(false);
        this.view["lbl"+j].skin = this._normalDateSkin;
        this.view["lbl"+j].onTouchEnd = this.selectDate;
      }
      var day30Months = [3,5,8,10];
      var endDate = 0;
      if(currentMonth == 1){
        if(this.isLeapYear(currentYear)){
          endDate = 29;
        }else{
          endDate = 28;  
        }
      }else if(day30Months.indexOf(currentMonth) > -1){
        endDate = 30;
      }else{
        endDate = 31;
      }
      for(var i = 1; i <= endDate; i++){

        if(firstDay===0){
          firstDay=1;
        }
        this.firstDayOfMonth = firstDay;
        this.view["lbl"+(firstDay+(i-1))].text = i.toFixed(0);

        this.view["lbl"+(firstDay+(i-1))].setVisibility(true);
      }

    },

    isLeapYear : function(year)
    {
      return ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0);
    },

    _nextMonth : function(){
      if(this.currentMonth == 11){
        this.currentMonth = 0;
        this.currentYear = this.currentYear+1;
      }else{
        this.currentMonth = this.currentMonth+1;
      }
      var d = new Date(this.currentYear,this.currentMonth,1,0,0,0,0);
      this.assignDates(d.getDay(),this.currentMonth,this.currentYear);
      this.swipeUp(this._getMonth(this.currentMonth),this.currentYear);
      this.setWeekendColor(this._weekendColor);
    },

    _previousMonth : function(){
      if(this.currentMonth === 0){
        this.currentMonth = 11;
        this.currentYear = this.currentYear-1;
      }else{
        this.currentMonth = this.currentMonth-1;
      }
      var d = new Date(this.currentYear,this.currentMonth,1,0,0,0,0);
      this.assignDates(d.getDay(),this.currentMonth,this.currentYear);
      this.swipeDown(this._getMonth(this.currentMonth),this.currentYear);
      this.setWeekendColor(this._weekendColor);
    },

    _getMonth : function (month){
      if(month === 0){
        return "January";
      }else if(month == 1){
        return "February";
      }else if(month == 2){
        return "March";
      }else if(month == 3){
        return "April";
      }else if(month == 4){
        return "May";
      }else if(month == 5){
        return "June";
      }else if(month == 6){
        return "July";
      }else if(month == 7){
        return "August";
      }else if(month == 8){
        return "September";
      }else if(month == 9){
        return "October";
      }else if(month == 10){
        return "November";
      }else if(month == 11){
        return "December";
      }
    },

    setCalendarColor : function (skinColor){
      this.view.flxCalendar.skin = skinColor;
    },

    setWeekendColor : function (skinColor){
      this._weekendColor = skinColor;
      this.view.lbl1.skin = skinColor;
      for(var j = 7; j < 38;){
        this.view["lbl"+j].skin = skinColor;
        this.view["lbl"+(j+1)].skin = skinColor;
        j += 7;
      }
      if(this._currentDayColor.length > 0){
        this.setCurrentDateColor(this._currentDayColor);
      }
    },

    setCurrentDateColor : function (skinColor){
      this._currentDayColor = skinColor;
      var d = new Date();
      if((this.currentYear == d.getFullYear()) && (this.currentMonth == d.getMonth())){
        for(var j = 1; j < 38; j++){
          if(this.view["lbl"+j].text == d.getDate()){
            this.view["lbl"+j].skin = skinColor;
          }
        }
      }
    },


    _onGestureClosure:function (widgetRef, gestureInfo, context){



      if(gestureInfo.swipeDirection == 3){
        this._nextMonth();
      }else if(gestureInfo.swipeDirection == 4){
        this._previousMonth();
      }else if(gestureInfo.swipeDirection == 1){
        this._nextMonth();
      }else if(gestureInfo.swipeDirection == 2){
        this._previousMonth();
      }
    },

    selectDate : function(j){
      if(j.skin!==this._currentDayColor){

        for(var i = 1; i < 38; i++){
          this.view["lbl"+i].skin=this._normalDateSkin;
        }
        j.skin = this._selectedDateSkin;
      }

      if(this.onSelect){
        this.onSelect(j);
      }
    },

    getDotWidgetDetails : function(id){
      return this.view["lblDot"+id];
    },

    hideAllDots : function(){
      for(var j = 1; j < 38; j++){
        this.view["lblDot"+j].setVisibility(false);
      }
    },

    updateWidgetDetails : function(widgetInfo){
      this.view["lbl"+widgetInfo.id]=widgetInfo;
    }

  };
});