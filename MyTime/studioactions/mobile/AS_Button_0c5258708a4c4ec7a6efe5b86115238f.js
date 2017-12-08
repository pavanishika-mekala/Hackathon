function AS_Button_0c5258708a4c4ec7a6efe5b86115238f(eventobject) {
    kony.apps.coe.ess.myTime.Search.handleSearchOperation();
    frmSearchMyTime.flxSearchContainer.animate(kony.ui.createAnimation({
        100: {
            height: "0%",
        }
    }), {
        fillMode: kony.anim.FILL_MODE_FORWARDS,
        duration: 0.5
    });
    frmSearchMyTime.flxHideFilters.setVisibility(false);
    frmSearchMyTime.flxShowFilters.setVisibility(true);
}