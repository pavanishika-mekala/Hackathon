define({
    //Type your controller code here 
    _isInit: false,
    //Bind events and set callbacks
    _init: function() {
        if (this._isInit === false) {
            this._isInit = true;
            var controller = this;
        }
    },
    onNavigate: function() {
        this._init();
    },
});