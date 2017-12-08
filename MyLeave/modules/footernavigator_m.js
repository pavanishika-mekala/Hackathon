kony = kony || {};
kony.apps = kony.apps || {};
kony.apps.coe = kony.apps.coe || {};
kony.apps.coe.ess = kony.apps.coe.ess || {};
kony.apps.coe.ess.MyLeave = kony.apps.coe.ess.MyLeave || {};
kony.apps.coe.ess.MyLeave.Footer = kony.apps.coe.ess.MyLeave.Footer || {};
kony.apps.coe.ess.MyLeave.Header = kony.apps.coe.ess.MyLeave.Header || {};

kony.apps.coe.ess.MyLeave.Footer.navigateFooter = function(selectedIndex) {
    try {
        kony.print("-- start kony.apps.coe.ess.MyLeave.Footer.navigateFooter--");

        //active indicator Reset
        OuterFlexFooterNavigation.lbl1BlueLineFooterNavigation.isVisible = false;
        OuterFlexFooterNavigation.lbl2BlueLineFooterNavigation.isVisible = false;
        OuterFlexFooterNavigation.lbl3BlueLineFooterNavigation.isVisible = false;
        //image Reset
        OuterFlexFooterNavigation.img1FooterNavigation.src = "calendar_tab.png";
        OuterFlexFooterNavigation.img2FooterNavigation.src = "wallet_tab.png";
        OuterFlexFooterNavigation.img3FooterNavigation.src = "history_normal.png";
        //Background skin Reset
        OuterFlexFooterNavigation.innerFlex1Footernavigation.skin = "FLXMOBF8F7F5BorderCCCCCC";
        OuterFlexFooterNavigation.innerFlex2Footernavigation.skin = "FLXMOBF8F7F5BorderCCCCCC";
        OuterFlexFooterNavigation.innerFlex3Footernavigation.skin = "FLXMOBF8F7F5BorderCCCCCC";
        switch (selectedIndex) {
            case 0:
            // this case is for updating the footer highlighted flex to first form as on relogin
            // we need to highlight the first flex as we are are on frmLeaveHome
                OuterFlexFooterNavigation.lbl1BlueLineFooterNavigation.isVisible = true;
                OuterFlexFooterNavigation.img1FooterNavigation.src = "calendar_tab_active.png";
                OuterFlexFooterNavigation.innerFlex1Footernavigation.skin = "FLXMOBFFFFFF";
                break;
            case 1:
                OuterFlexFooterNavigation.lbl1BlueLineFooterNavigation.isVisible = true;
                OuterFlexFooterNavigation.img1FooterNavigation.src = "calendar_tab_active.png";
                OuterFlexFooterNavigation.innerFlex1Footernavigation.skin = "FLXMOBFFFFFF";
                kony.apps.coe.ess.myLeave.MyLeaveHomeUI.showLeaveHome();
                break;
            case 2:
                OuterFlexFooterNavigation.lbl2BlueLineFooterNavigation.isVisible = true;
                OuterFlexFooterNavigation.img2FooterNavigation.src = "wallet_tab_active.png";
                OuterFlexFooterNavigation.innerFlex2Footernavigation.skin = "FLXMOBFFFFFF";
                var walletObj = new kony.apps.coe.ess.myLeave.leaveWallet();
                walletObj.showWalletForm();
                break;
            case 3:
                OuterFlexFooterNavigation.lbl3BlueLineFooterNavigation.isVisible = true;
                OuterFlexFooterNavigation.img3FooterNavigation.src = "history_active.png";
                OuterFlexFooterNavigation.innerFlex3Footernavigation.skin = "FLXMOBFFFFFF";
                var obj = new kony.apps.coe.myLeave.search();
                obj.clear();
                frmSearchLog.show();
                break;
            default:
                kony.print("--wrong input--");
        }
        kony.print("-- end kony.apps.coe.ess.MyLeave.Footer.navigateFooter--");
    } catch (e) {
        handleError(e);
    }
};

