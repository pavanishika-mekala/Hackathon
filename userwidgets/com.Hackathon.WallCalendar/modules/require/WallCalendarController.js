define(function() {

  return {

    monthNames : ["January", "February", "March", "April", "May", "June",
                  "July", "August", "September", "October", "November", "December"],
    months : ["0","1","2","3","4","5","6","7","8","9","10","11"],
    selectedDateDetails : null,

    constructor: function(baseConfig, layoutConfig, pspConfig) {

      this.view.preShow = this.setMonthAndDate;

      this.view.DefaultCalendar.swipeUp = this.swipeUp;
      this.view.DefaultCalendar.swipeDown = this.swipeDown;
      this.view.DefaultCalendar.onSelect = this.selectDate;
      this.view.imgPlus.onTouchEnd = this.addEvent;

      this.view.txtBoxMonth.onDone = this.setMonth;
      this.view.txtBoxYear.onDone = this.setYear;

    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {

    },

    setMonth : function(){

      var date = new Date();
      var month = this.monthNames.indexOf(this.view.txtBoxMonth.text);
      var year = this.view.txtBoxYear.text;
      var d = new Date(year,month,1,0,0,0,0);
      this.view.DefaultCalendar.assignDates(d.getDay(),month,year);
    },

    setYear : function(){
      var date = new Date();
      var month = this.monthNames.indexOf(this.view.txtBoxMonth.text);
      var year = this.view.txtBoxYear.text;
      var d = new Date(year,month,1,0,0,0,0);
      this.view.DefaultCalendar.assignDates(d.getDay(),month,year);
    },

    setMonthAndDate : function(){

      var date = new Date();
      this.view.txtBoxYear.text = date.getFullYear().toFixed(0);
      this.view.txtBoxMonth.text = this.monthNames[date.getMonth()];
    },

    swipeUp : function(month,year){
      this.view.txtBoxYear.text = year;
      this.view.txtBoxMonth.text = month;
    },

    swipeDown : function(month,year){
      this.view.txtBoxMonth.text = month;
      this.view.txtBoxYear.text = year;
    },

    selectDate : function(j){
      this.selectedDateDetails = j;
      //alert(j.id);
    },

    addEvent : function(){

    }


  };
});