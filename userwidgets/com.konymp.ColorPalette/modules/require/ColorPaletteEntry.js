define(function () {
  var ColorPaletteEntry = (function(label,color,clickFunction){

    var _data = {};
    var _numberOfPalatteEntries = 0;

    function init (label,color,clickFunction) {
      setLabel(label);
      //setIcon(icon);
      setColor(color);
      setAction(clickFunction);
    }
    init(label,color,clickFunction);

    function getData() {
      return _data;
    }

    function setData(json) {
      _data=json? json : {};
    }
    

    //INIT
    /**
  * Getters for accessing the _data.
  **/

    function getLabel(){
      return _data.TEXT ? _data.TEXT : "";
    }

    function setLabel(value){
      _data.TEXT = value;
    }

    function getColor(){
      return _data.COLOR ? _data.COLOR : "";
    }

    function setColor(value){
      _data.COLOR = value;
    }

    function getIcon(){
      return _data.ICON ? _data.ICON : "";
    }

    function setIcon(value){
      _data.ICON = value;
    }

    function getAction(){
      return _data.ACTION ? _data.ACTION : null;
    }

    function setAction(clickFunction){
      _data.ACTION = clickFunction;
    }
    

    //Here we expose the public variables and functions
    return {
      getData: getData,
      setData: setData,
      getLabel:getLabel,
      setLabel:setLabel,
      getColor:getColor,
      setColor:setColor,
      getIcon:getIcon,
      setIcon:setIcon,
      getAction:getAction,
      setAction:setAction,


    };
  });
  ColorPaletteEntry.typeOf = "ColorPaletteEntry";
  return ColorPaletteEntry;
});