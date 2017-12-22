define(function() {

  return {

    paletteEntries:[],

    _openByDefault : true,//default false
    _touchStartDate : null,
    _numberOfpaletteEntries : 0,
    _numberOfCircles : 10,
    _currentTopCircle : 0,
    
    topPositionUp : "63%",
    _topPositionDown : "83%",
    topCircleNumber :null,
    centerX :0,
    centerY :0,
    touchStartAngle : 0,
    touchMoveAngle : 0,
    touchEndAngle : 0,
    //placeholder for the deferred bubble grow/shrink animation for android
    //the reason for this is that android does not handle multiple size change animations
    //well due to UI thread problems
    //this callback will be executed onTouchEnd and will grow the selected bubble and shrink all others
    //the same is done in ios, but continously during onTouchMove

    diskDown : true,
    dateflex1 : null,


    constructor: function(baseConfig, layoutConfig, pspConfig) {
      
      this._availableDegrees = (this._numberOfCircles-1)*36;
      this._normalSliceDegrees = Math.round(this._availableDegrees/(this._numberOfCircles));//-1 as the first and last serve as stoppers and take only half the space
    //available space - space which is taken by the inner ones /2 => space for the ones on the edges
    this._firstSliceEnd = Math.round((this._availableDegrees-(this._normalSliceDegrees*(this._numberOfCircles-2)))/2);
    this._lastSliceBeginning = (this._normalSliceDegrees*(this._numberOfCircles-2))+this._firstSliceEnd;

      this.view.preShow = this.generatePalette;
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {

    },

    add : function(entry){
      this.paletteEntries.push(entry);
    },

    positionValues:{
      palette0 :{X:"50%",Y:"7.5%"},//,top:"-1%",bottom:"Default"
      palette1 :{X:"24%",Y:"16%"},//,top:"10%",bottom:"Default"
      palette2 :{X:"10%",Y:"36%"},//,top:"31.5%",bottom:"Default"
      palette3 :{X:"10%",Y:"64%"},//,top:"Default",bottom:"28.5%"
      palette4 :{X:"24%",Y:"84%"},//,top:"Default",bottom:"8%"
      palette5 :{X:"50%",Y:"92.5%"},//,top:"Default",bottom:"0.5%"
      palette6 :{X:"76%",Y:"84%"},//,top:"Default",bottom:"7%"
      palette7 :{X:"90%",Y:"64%"},//,top:"Default",bottom:"28%"
      palette8 :{X:"90%",Y:"36%"},//,top:"Default",bottom:"28%"
      palette9 :{X:"76%",Y:"16%"}//,top:"Default",bottom:"28%"

//       palette0 :{X:"50%",Y:"8%"},//,top:"-1%",bottom:"Default"
//       palette1 :{X:"24%",Y:"22%"},//,top:"10%",bottom:"Default"
//       palette2 :{X:"18%",Y:"39%"},//,top:"31.5%",bottom:"Default"
//       palette3 :{X:"20%",Y:"61%"},//,top:"Default",bottom:"28.5%"
//       palette4 :{X:"33%",Y:"77%"},//,top:"Default",bottom:"8%"
//       palette5 :{X:"50%",Y:"92%"},//,top:"Default",bottom:"0.5%"
//       palette6 :{X:"70%",Y:"75%"},//,top:"Default",bottom:"7%"
//       palette7 :{X:"80%",Y:"61%"},//,top:"Default",bottom:"28%"
//       palette8 :{X:"81%",Y:"39%"},//,top:"Default",bottom:"28%"
//       palette9 :{X:"70%",Y:"22%"}//,top:"Default",bottom:"28%"
    },

    generatePalette : function(){
      for(var i=0;i<this.paletteEntries.length;i++){
        var palette = this.paletteEntries[i];
        //var skin = (palette.getColor()!=="") ? palette.getColor() : "flxBG00b898";
        this._numberOfpaletteEntries++;
        var centerXVal=this.positionValues["palette"+i].X;
        var centerYVal=this.positionValues["palette"+i].Y;
        var flxList = new kony.ui.FlexContainer({
          "autogrowMode": kony.flex.AUTOGROW_NONE,
          "clipBounds": true,
          "centerX": centerXVal,
          "centerY": centerYVal,
          "height": "40dp",
          "id": "flxList"+i,
          "isVisible": true,
          "layoutType": kony.flex.FREE_FORM,
          //"left": "100%",
          "skin": "flxBG00b898",
          "width": "40dp",
          "zIndex": 2
        }, {}, {});

        flxList.onTouchEnd = palette.getAction();
        flxList.backgroundColor = palette.getColor();
        this.view.flxOuterCircle.add(flxList);
//         this.view.flxPalette.add(flxList);
      }
      this.preShowDisplayDefaultDisk();
    },


    preShowDisplayDefaultDisk : function(){
      kony.print("ColorPaletteController.js.preShowDisplayDefaultDisk");
      if(this._openByDefault===true) {
        this._turnWorldToCircle(0);
        this.touchEndAngle=0;
      }
      else{
        this.view.flxPaletteOuter.top = this._topPositionDown;
      }
      this.view.flxPalette.forceLayout();
      this.view.flxPaletteOuter.onTouchStart = this._circleInit;
      this.view.flxPaletteOuter.onTouchMove = this._moveCircle;
      this.view.flxPaletteOuter.onTouchEnd = this._circleEnd;
    },

    _turnWorldToCircle : function(index) {
      //Magical compensation for strange offset
      var offset = 0;
      if (index>0) {
        offset = Math.max(Math.min(6-index,5),0);//make sure it's between 5 and 0
      }
      var deg = Math.round((this._availableDegrees/(this._numberOfCircles-1)*index+offset)*-1);
      this._turnWorld(deg);
    },

    _turnWorld : function (deg,callback) {
      var xfrm = kony.ui.makeAffineTransform();
      xfrm.rotate(deg);
      //Turning the main area
      this.view.flxPalette.transform=xfrm;
      //this.view.flxPaletteInner.transform=xfrm;
      this.view.flxOuterCircle.transform=xfrm;
      //this.view.flxPaletteOuter.transform=xfrm;
      
//       this.view.flxPalette.animate(stepAnimation, timingConfig, {});
//       this.view.flxPaletteOuter.animate(stepAnimation, timingConfig, {});
//       this.view.flxPaletteInner.animate(stepAnimation, timingConfig, {});
//       this.view.flxOuterCircle.animate(stepAnimation, timingConfig, {});

      //     _imgDiskMenuFG.transform=xfrm;
      //     _imgDiskMenuBorder.transform=xfrm;
      //     _imgDiskMenuBG.transform=xfrm;

//       var lblXfrm = kony.ui.makeAffineTransform();
//       var lblDeg = deg;
//       lblDeg = lblDeg*-1;
//       lblXfrm.rotate(lblDeg);

      //Turning labels (containing the icons) as well as BG, border and light effects
      //against the user-initiated rotation so that they appear as fixed
//       for(var i=0;i<this._numberOfpaletteEntries;i++){
//         this.view["flxList" + i].transform = lblXfrm;
//       }
      if (callback!==undefined && callback!==null) {
        callback();
      }
    },

    _getTopCircleNumber :function (deg) {
      if(deg <0) deg = deg *-1;
      if (deg<=this._firstSliceEnd) {
        return 0;
      } else if (deg>=this._lastSliceBeginning) {
        return (this._numberOfpaletteEntries-1);//normalise 8 to 7 of [0-7]
      } else {
        return Math.round(deg/this._normalSliceDegrees);
      }
    },

    _circleInit:function (source,x,y){ 
      this.centerX=this.view.flxPalette.frame.width/2;
      this.centerY=this.view.flxPalette.frame.height/2;
      //Instead of incrementing/decrementing the angle, calculate it from the position
      //=> we use this as start angle to compensate for the start point of the move
      var vecInX = x - this.centerX;// get the vector from center to input
      var vecInY = y - this.centerY;
      var rad = Math.atan2(vecInY, vecInX); // In radians
      this.touchStartAngle = -(rad * 360 / Math.PI + this.touchEndAngle);

      this.dateflex1 = new Date().getTime();
    },

    _moveCircle : function (source,x,y){ 
      var vecInX = x - this.centerX;  // get the vector from center to input
      var vecInY = y - this.centerY;

      //Instead of incrementing/decrementing the angle, calculate it from the position
      var rad = Math.atan2(vecInY, vecInX); // In radians
      //Normally the calculation uses 180 not 360, but as we have only half the circle as 
      //touch area we need to be able to do a full turn with only half the touch area
      var deg = rad * 360 / Math.PI;
      var multiplier = -1;

      this.touchMoveAngle = (this.touchStartAngle+deg)*multiplier;
      this.touchMoveAngle = Math.max(-360,Math.min(0,this.touchMoveAngle));
      this._turnWorld(this.touchMoveAngle);
//       this._turnWorldToCircle(this.touchMoveAngle);
      this._changeThePalette(this.touchMoveAngle);

    },
    
    _changeThePalette : function (deg){
      kony.print(this._getTopCircleNumber(deg));
    this.topCircleNumber=this._getTopCircleNumber(deg);
    if (this.topCircleNumber!=this._currentTopCircle) {
      this._currentTopCircle=this.topCircleNumber;
      var bgColor = this.view["flxList"+(this.topCircleNumber)].backgroundColor;
      this.view.flxHomePalette.backgroundColor = bgColor;
      this.view.flxOuter1.backgroundColor = bgColor;
    }
  },

    _circleEnd : function(source,x,y){
      this.touchEndAngle=this.touchMoveAngle;
      //execute deferred bubble animation for android
      //shows / hides palette if short tap
      this._manageDiskAnim();
      //Snaps world into optimal position for the current circle
      this._turnWorldToCircle(this._currentTopCircle);
    },

    _manageDiskAnim : function(){
      var dateflex2 = new Date().getTime();
      var timeDiff = dateflex2 - this.dateflex1;
      if(this._openByDefault===false && timeDiff < 150){
        if(this.diskDown){
          this.diskDown = false;
          this._expandMenu();    
        }else{
          this.diskDown = true;
          this._reduceMenu();
        } 
      }
    },

    _expandMenu : function (){
      var animationObject =
          {
            "0":{"top":this.view.flxPaletteOuter.top,"stepConfig":{"timingFunction":kony.anim.LINEAR}},
            "100":{"top":this._topPositionUp,"stepConfig":{"timingFunction":kony.anim.LINEAR}}
          };

      var animationConfig = 
          {
            "delay":0,
            "duration": 0.3,
            "iterationCount":1,
            "direction":kony.anim.DIRECTION_NONE,
            "fillMode":kony.anim.FILL_MODE_FORWARDS
          };
      this.view.flxPaletteOuter.animate(kony.ui.createAnimation(animationObject), animationConfig, {});
      this._animateWorldToCircle(this._currentTopCircle,0.4);
    }, 

    _reduceMenu : function (){
      this._animateWorldToCircle(0,0.0);
      var animationObject =
          {
            "0":{"top":this.view.flxPaletteOuter.top},
            "100":{"top":this._topPositionDown,"stepConfig":{"timingFunction":kony.anim.EASIN_OUT}}
          };

      var animationConfig = 
          {
            "delay":0.4,
            "duration": 0.3,
            "iterationCount":1,
            "fillMode":kony.anim.FILL_MODE_FORWARDS
          };
      this.view.flxPaletteOuter.animate(kony.ui.createAnimation(animationObject), animationConfig, {});
    },

    _animateWorldToCircle : function (index,delay) {
      var offset = 0;
      if (index>0) {
        offset = Math.max(Math.min(6-index,5),0);//make sure it's between 5 and 0
      }
      var deg = Math.round((this._availableDegrees/(this._numberOfCircles-1)*index+offset)*-1);
      var xfrm = kony.ui.makeAffineTransform();
      xfrm.rotate(deg);
      var timingConfig = {"delay":delay,"iterationCount":1,"fillMode":kony.anim.FILL_MODE_FORWARDS,"duration":0.04};
      var stepAnimation = kony.ui.createAnimation({
        "100":{"transform":xfrm,"stepConfig":{"timingFunction":kony.anim.LINEAR}}
      });   

      this.view.flxPalette.animate(stepAnimation, timingConfig, {});
      this.view.flxPaletteOuter.animate(stepAnimation, timingConfig, {});
      //this.view.flxPaletteInner.animate(stepAnimation, timingConfig, {});
      //this.view.flxOuterCircle.animate(stepAnimation, timingConfig, {});
      //     _imgDiskMenuFG.animate(stepAnimation, timingConfig, {});
      //     _imgDiskMenuBorder.animate(stepAnimation, timingConfig, {});
      //     _imgDiskMenuBG.animate(stepAnimation, timingConfig, {});
    },

  };
});