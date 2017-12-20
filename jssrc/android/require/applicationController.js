define({
    appInit: function(params) {
        skinsInit();
        kony.mvc.registry.add("frmHome", "frmHome", "frmHomeController");
        setAppBehaviors();
    },
    postAppInitCallBack: function() {},
    appmenuseq: function() {
        new kony.mvc.Navigation("frmHome").navigate();
    }
});