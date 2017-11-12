import {Template} from 'meteor/templating'

const viewPortUnits = 200;
const radius = 10;

let scrollListener;
let totalY = viewPortUnits;

Template.enterTheVoid.onRendered(() => {
  let dimensionRatio;
  if (window.innerWidth > window.innerHeight) {
    dimensionRatio = Math.sqrt(Math.pow(window.innerHeight, 2) + Math.pow(window.innerWidth, 2)) / window.innerHeight;
  } else {
    dimensionRatio = Math.sqrt(Math.pow(window.innerHeight, 2) + Math.pow(window.innerWidth, 2)) / window.innerWidth;
  }
  dimensionRatio = dimensionRatio * (viewPortUnits / (radius*2));
  if (FlowRouter.lastRoute && FlowRouter.lastRoute.name === "the-journey") {
    scalingFactor = dimensionRatio;
    totalY = (viewPortUnits / 2) * scalingFactor
    $("#void")[0].style=`transform: scale(${scalingFactor})`;
    $("#void")[0].setAttribute('cy', (viewPortUnits / 2 / scalingFactor));
    $("#void")[0].setAttribute('cx', (viewPortUnits / 2 / scalingFactor));
  }
  scrollListener = $(window).on("wheel", (event) => {
    const deltaY = event.originalEvent.deltaY;
    const mutedDeltaY = deltaY / 5;
    totalY -= mutedDeltaY;
    let scalingFactor = totalY / (viewPortUnits / 2);
    if (scalingFactor > dimensionRatio) {
      $("#void")[0].style=`transform: scale(${dimensionRatio})`;
      $("#void")[0].setAttribute('cy', (viewPortUnits / 2 / scalingFactor));
      $("#void")[0].setAttribute('cx', (viewPortUnits / 2 / scalingFactor));
      scalingFactor = dimensionRatio;
      totalY += mutedDeltaY;
      FlowRouter.go("the-journey");
    } else if (totalY < (viewPortUnits / 2)) {
      FlowRouter.go("the-world");
      totalY = viewPortUnits / 2;
    }
    if ($("#void")[0]) {
      $("#void")[0].style=`transform: scale(${scalingFactor})`;
      $("#void")[0].setAttribute('cy', (viewPortUnits / 2 / scalingFactor));
      $("#void")[0].setAttribute('cx', (viewPortUnits / 2 / scalingFactor));
    }
  });
});

Template.enterTheVoid.onDestroyed(() => {
  scrollListener.off();
  totalY = 2000;
});
