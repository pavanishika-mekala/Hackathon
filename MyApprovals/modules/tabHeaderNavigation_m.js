kony = kony || {};
kony.apps = kony.apps || {};
kony.apps.coe = kony.apps.coe || {};
kony.apps.coe.ess = kony.apps.coe.ess || {};
kony.apps.coe.ess.Approvals = kony.apps.coe.ess.Approvals || {};
kony.apps.coe.ess.Approvals.Header = kony.apps.coe.ess.Approvals.Header || {};

kony.apps.coe.ess.Approvals.Header.ItemOnClick = function(headerIndex) {
  	kony.print("----Header.ItemOnClick----");
    switch (headerIndex) {
        case 0:
            frmTabDashboard.flxDash.skin = "sknFlx1C7393Focus";
            frmTabDashboard.flxList.skin = "sknFlx032c7311fcb4f45";
            frmTabDashboard.flxCategory.skin = "sknFlx032c7311fcb4f45";
            frmTabDashboard.flxPeople.skin = "sknFlx032c7311fcb4f45";
            frmTabDashboard.lblDashboard.text = "DashBoard";
            tabDashboardShow();
            break;
        case 1:
            frmTabListView.lblDashboard.text = "ListView";
            frmTabListView.flxLeftReqType.isVisible=false;
            frmTabListView.flxLeftReqPeople.isVisible=false;
            //#ifdef windows8
            frmTabListView.flxDash.skin = "sknWinFlx1091C1";
            frmTabListView.flxList.skin = "sknWinFlx08739AHighlight";
            frmTabListView.flxCategory.skin = "sknWinFlx1091C1";
            frmTabListView.flxPeople.skin = "sknWinFlx1091C1";
        	frmTabListView.flxRight.width="61%";
            //#endif    
            //#ifndef windows8
            frmTabListView.flxDash.skin = "sknFlx032c7311fcb4f45";
            frmTabListView.flxList.skin = "sknFlx1C7393Focus";
            frmTabListView.flxCategory.skin = "sknFlx032c7311fcb4f45";
            frmTabListView.flxPeople.skin = "sknFlx032c7311fcb4f45";
            frmTabListView.flxLeft.width="33.6%";
            frmTabListView.flxRight.width="66.4%";
            //#endif    
            tabListViewShow();
            break;
        case 2:
            frmTabListView.lblDashboard.text = "Request People";
            frmTabListView.flxLeftReqType.isVisible=true;
            frmTabListView.flxLeftReqPeople.isVisible=false;
            //#ifdef windows8
            frmTabListView.flxCategory.skin = "sknWinFlx08739AHighlight";
            frmTabListView.flxDash.skin = "sknWinFlx1091C1";
            frmTabListView.flxList.skin = "sknWinFlx1091C1";
            frmTabListView.flxPeople.skin = "sknWinFlx1091C1";
        	frmTabListView.flxRight.width="51%";
            //#endif
            //#ifndef windows8
            frmTabListView.flxCategory.skin = "sknFlx1C7393Focus";
            frmTabListView.flxDash.skin = "sknFlx032c7311fcb4f45";
            frmTabListView.flxList.skin = "sknFlx032c7311fcb4f45";
            frmTabListView.flxPeople.skin = "sknFlx032c7311fcb4f45";
            frmTabListView.flxLeft.width="30%";
            frmTabListView.flxRight.width="60%";
            //#endif
            tabListViewShow();
            break;
        case 3:
            frmTabListView.lblDashboard.text = "People";
            frmTabListView.flxLeftReqType.isVisible=false;
            frmTabListView.flxLeftReqPeople.isVisible=true;
            //#ifdef windows8
            frmTabListView.flxPeople.skin = "sknWinFlx08739AHighlight";
            frmTabListView.flxDash.skin = "sknWinFlx1091C1";
            frmTabListView.flxList.skin = "sknWinFlx1091C1";
            frmTabListView.flxCategory.skin = "sknWinFlx1091C1";
        	frmTabListView.flxRight.width="51%";
            //#endif
            //#ifndef windows8
            frmTabListView.flxCategory.skin = "sknFlx032c7311fcb4f45";
            frmTabListView.flxDash.skin = "sknFlx032c7311fcb4f45";
            frmTabListView.flxList.skin = "sknFlx032c7311fcb4f45";
            frmTabListView.flxPeople.skin = "sknFlx1C7393Focus";
            frmTabListView.flxLeft.width="30%";
            frmTabListView.flxRight.width="60%";
            //#endif
            tabListViewShow();
            break;
        default:
            kony.print("Invalid Index");
    }
  	kony.print("----Header.ItemOnClick----");
};

kony.apps.coe.ess.Approvals.Header.reAssingOnClick = function(){
  var btnRef = kony.application.getCurrentForm().headers[0].flxHamburger;
  btnRef.onClick = new kony.apps.ess.Hamburger(btnRef);
};