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
      this.view.txtBoxYear.text = year.toFixed(0);
      this.view.txtBoxMonth.text = month;
      this.assignEvents(year,month);
    },

    swipeDown : function(month,year){
      this.view.txtBoxMonth.text = month;
      this.view.txtBoxYear.text = year.toFixed(0);
      this.assignEvents(year,month);
    },

    selectDate : function(j){
      this.selectedDateDetails = j;
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
    assignEvents:function(year,month){
      for(var i in this.availabeEventsArray){
        if(this.availabeEventsArray[i].eventYear == year && this.availabeEventsArray[i].eventMonth == month){
          this.view.DefaultCalendar.setEventsAfterSwipe(this.availabeEventsArray[i]);
        }
      }
    },
    hideEventFlex : function(){
      if(this.view.lstBoxEvents.selectedKey !==null && this.view.lstBoxEvents.selectedKey !==undefined){
        if(this.view["flxDot"+this.view.lstBoxEvents.selectedKey].skin!==null ){
          var info = {
            "eventContent" : this.view.txtBoxEvent.text,
            "eventTitle": this.view.lstBoxEvents.selectedKey,
            "eventSkin": this.view["flxDot"+this.view.lstBoxEvents.selectedKey].skin,
            "eventYear": this.view.txtBoxYear.text,
            "eventMonth": this.view.txtBoxMonth.text,
            "eventDay": this.selectedDateDetails.text,
          };
          this.view.flxEvent.setVisibility(false);
          this.availabeEventsArray.push(info);
          var id = parseInt((this.selectedDateDetails.id).replace("lbl",""));
          var dotWidget=this.view.DefaultCalendar.getDotWidgetDetails(id);
          dotWidget.skin = this.view["flxDot"+this.view.lstBoxEvents.selectedKey].skin;
          dotWidget.isVisible = true;
        }
      }
      else{
        alert("select event type");
      }

    },

  };
});