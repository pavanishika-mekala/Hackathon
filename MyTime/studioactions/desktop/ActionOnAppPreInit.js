function ActionOnAppPreInit(eventobject) {
    return AS_AppEvents_c9d80a502b124d18a333757cf2894c59(eventobject);
}

function AS_AppEvents_c9d80a502b124d18a333757cf2894c59(eventobject) {
    kony.modules.loadFunctionalModule("librarymodules");
    kony.modules.loadFunctionalModule("appjsmodules");
}