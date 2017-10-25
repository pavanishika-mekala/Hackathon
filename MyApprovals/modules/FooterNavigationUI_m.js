kony = kony || {};
kony.apps = kony.apps || {};
kony.apps.coe = kony.apps.coe || {};
kony.apps.coe.ess = kony.apps.coe.ess || {};
kony.apps.coe.ess.Approvals = kony.apps.coe.ess.Approvals || {};
kony.apps.coe.ess.Approvals.Footer = kony.apps.coe.ess.Approvals.Footer || {};

kony.apps.coe.ess.Approvals.Footer.SetFocus = function (FooterIndex) {
	try {
		kony.print("-- start kony.apps.coe.ess.Approvals.Footer.SetFocus--");
      	if(kony.apps.coe.ess.globalVariables.isSPA) {
          return;
        }
      
      	//Input validations
		FooterIndex = parseInt(FooterIndex);
		if (isEmpty(FooterIndex.toString())) {         
			handleError(new appException(kony.i18n.getLocalizedString("i18n.ess.Application.errorMessage.InputValidation")));
			return;
		}
      	flxNavigateFooter.isVisible=true;
		//Reseting to non-focus skins to all the widgets in the foooter
		//active indicator Reset
		flxNavigateFooter.flxactivehome.isVisible = false;
		flxNavigateFooter.flxactivesearch.isVisible = false;
		flxNavigateFooter.flxactivesetting.isVisible = false;
        flxNavigateFooter.flxActiveDelegation.isVisible = false;
		//image Reset
		flxNavigateFooter.flxApprovalImg.src = "dashboard.png";
		flxNavigateFooter.flxFilterImg.src = "history_normal.png";
		flxNavigateFooter.flxSettingsImg.src = "settings.png";
        flxNavigateFooter.imgDelegation.src = "delegation_normal.png";
		//Background Image Reset
		flxNavigateFooter.flxApprovals.skin = "sknFlxF8F7F5OP100";
		flxNavigateFooter.flxFilter.skin = "sknFlxF8F7F5OP100";
		flxNavigateFooter.flxSettings.skin = "sknFlxF8F7F5OP100";
        flxNavigateFooter.flxDelegation.skin = "sknFlxF8F7F5OP100";
		switch (FooterIndex) {
		case 0:
			flxNavigateFooter.flxactivehome.isVisible = true;
			flxNavigateFooter.flxApprovalImg.src = "dashboard_active.png";
			flxNavigateFooter.flxApprovals.skin = "sknFlxFFFFFF100O";
			break;
		case 1:
			flxNavigateFooter.flxactivesearch.isVisible = true;
			flxNavigateFooter.flxFilterImg.src = "history_active.png";
			flxNavigateFooter.flxFilter.skin = "sknFlxFFFFFF100O";
			break;
        case 2:
			flxNavigateFooter.flxActiveDelegation.isVisible = true;
			flxNavigateFooter.imgDelegation.src = "delegation_active.png";
			flxNavigateFooter.flxDelegation.skin = "sknFlxFFFFFF100O";
			break;
		case 3:
			flxNavigateFooter.flxactivesetting.isVisible = true;
			flxNavigateFooter.flxSettingsImg.src = "settings_active.png";
			flxNavigateFooter.flxSettings.skin = "sknFlxFFFFFF100O";
			break;
		default:
			handleError(new appException("Invalid input to the function "));
		}
		kony.print("-- End kony.apps.coe.ess.Approvals.Footer.SetFocus--");
	} catch (e) {
		handleError(e);
	}
};
