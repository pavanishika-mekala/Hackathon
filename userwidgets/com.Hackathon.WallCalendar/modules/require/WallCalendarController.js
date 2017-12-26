define(function() {

  return {

    monthNames : ["January", "February", "March", "April", "May", "June",
                  "July", "August", "September", "October", "November", "December"],
    selectedDateDetails : null,
    availabeEventsArray : [],

    constructor: function(baseConfig, layoutConfig, pspConfig) {

      this.view.preShow = this.setMonthAndDate;

      this.view.DefaultCalendar.swipeUp = this.swipeUp;
      this.view.DefaultCalendar.swipeDown = this.swipeDown;
      this.view.DefaultCalendar.onSelect = this.selectDate;
      this.view.imgPlus.onTouchEnd = this.addEvent;

      this.view.txtBoxMonth.onDone = this.setMonth;
      this.view.txtBoxYear.onDone = this.setYear;

      this.view.imgDone.onTouchEnd = this.hideEventFlex;
      
      this.view.flxFamily.onTouchEnd = this.showFamilyEvents;
      this.view.flxLife.onTouchEnd = this.showLifeEvents;
      this.view.flxWork.onTouchEnd = this.showWorkEvents;
      this.view.flxStudy.onTouchEnd = this.showStudyEvents;

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

      if(this.selectedDateDetails!==null){
        this.view.flxEvent.setVisibility(true);
        this.view.lstBoxEvents.masterData = [
          [this.lblFamilyText,this.lblFamilyText],
          [this.lblLifeText,this.lblLifeText],
          [this.lblWorkText,this.lblWorkText],
          [this.lblStudyText,this.lblStudyText]
        ];
      }
    },

    hideEventFlex : function(){
      this.view.flxEvent.setVisibility(false);
      this.selectedDateDetails.info = {
        "eventContent" : this.view.txtBoxEvent.text,
        "eventTitle": this.view.lstBoxEvents.selectedKey
      };
      
      this.availabeEventsArray.push(this.selectedDateDetails);
      //alert(this.selectedDateDetails.info);
    },
    
    showFamilyEvents : function(){
    for(var i=0;i<this.availabeEventsArray.length;i++){
      var info = this.availabeEventsArray[i].info;
      if(info.eventTitle===this.lblFamilyText){
        alert(info.eventContent);
      }
    }
  }


  };
});