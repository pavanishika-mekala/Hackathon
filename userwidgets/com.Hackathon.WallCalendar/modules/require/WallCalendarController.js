define(function() {

  return {

    monthNames : ["January", "February", "March", "April", "May", "June",
                  "July", "August", "September", "October", "November", "December"],

    constructor: function(baseConfig, layoutConfig, pspConfig) {

      this.view.preShow = this.setMonthAndDate;

      this.view.DefaultCalendar.swipeUp = this.swipeUp;
      this.view.DefaultCalendar.swipeDown = this.swipeDown;

    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {

    },

    setMonthAndDate : function(){

      var date = new Date();
      this.view.lblYear.text = date.getFullYear().toFixed(0);
      this.view.lblMonth.text = this.monthNames[date.getMonth()];
    },

    swipeUp : function(month,year){
      this.view.lblYear.text = year;
      this.view.lblMonth.text = month;
    },

    swipeDown : function(month,year){
      this.view.lblMonth.text = month;
      this.view.lblYear.text = year;
    },


  };
});