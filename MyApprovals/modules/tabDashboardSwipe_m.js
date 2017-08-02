function swipeApprovals(){
kony.print("In swipeApprovals");
 var swipeOnCard = {
		fingers : 1,
		swipedistance : 50,
		swipeVelocity : 50
	};
	frmTabDashboard.flxMiddle.setGestureRecognizer(constants.GESTURE_TYPE_SWIPE, swipeOnCard,gestureHandlerForSwipe2);
 
function gestureHandlerForSwipe2(widgetID, gestureInfo)
{
  if(gestureInfo.swipeDirection == 1)
  {

    animation1();
  }else{
    animation();
  }

}
  kony.print("End of swipeApprovals");
}


function animation1()
{
kony.print("In animation");
  frmTabDashboard.flxMiddle.animate(
    kony.ui.createAnimation({
        "100": {
            "left": "-60%",
            "stepConfig": {
                "timingFunction": kony.anim.EASE
            }
        }
    }), {
        "delay": 0,
        "iterationCount": 1,
        "fillMode": kony.anim.FILL_MODE_FORWARDS,
        "duration": 0.25
    }, {
        "animationEnd": function(){}
    });
 kony.print("End of animation");
}

function animation()
{
kony.print("In animation");

  frmTabDashboard.flxMiddle.animate(
    kony.ui.createAnimation({
        "100": {
            "left": "0%",
            "stepConfig": {
                "timingFunction": kony.anim.EASE
            }
        }
    }), {
        "delay": 0,
        "iterationCount": 1,
        "fillMode": kony.anim.FILL_MODE_FORWARDS,
        "duration": 0.25
    }, {
        "animationEnd": function(){}
    });

 
  kony.print("End of animation");
 }