import {Template} from 'meteor/templating'

const viewPortUnits = 200;
const radius = 10;

let scrollListener;
let totalY = viewPortUnits + radius;

Template.begin.onRendered(() => {
  if (FlowRouter.lastRoute && FlowRouter.lastRoute.name === "enter-the-void") {
    totalY = viewPortUnits / 2;
    $("#world")[0].setAttribute('cy', totalY);
  }
  scrollListener = $(window).on("wheel", (event) => {
    const deltaY = event.originalEvent.deltaY;
    const mutedDeltaY = deltaY / 100;
    totalY += mutedDeltaY;
    if (totalY < viewPortUnits / 2) {
      totalY = viewPortUnits;
      FlowRouter.go("enter-the-void");
    } else if (totalY > (viewPortUnits + radius)) {
      totalY = viewPortUnits + radius;
    }
    if ($("#world")[0]) {
      $("#world")[0].setAttribute('cy', totalY);
    }
  });
});

Template.begin.onDestroyed(() => {
  scrollListener.off();
  totalY = 2000;
});
