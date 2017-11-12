import {Template} from 'meteor/templating'
import {ReactiveVar} from 'meteor/reactive-var'

const viewPortUnits = 200;
const radius = 10;
let journeysArray = [];

let journeys = new ReactiveVar([
  {
    x: 100,
    y: 100,
    radius_circle: 30
  }
]);
let savedTotalY = new ReactiveVar(0);

let scrollListener;
let totalY = 0;

let saveTotalY = _.throttle((totalY) => {
  savedTotalY.set(totalY);
}, 20)

Template.theJourney.onCreated(() => {
  savedTotalY.set(0);
  totalY = 0;
})

Template.theJourney.onRendered(() => {
  scrollListener = $(window).on("wheel", (event) => {
    const deltaY = event.originalEvent.deltaY;
    const mutedDeltaY = deltaY / 5;
    totalY -= mutedDeltaY;
    if (totalY < 0) {
      FlowRouter.go("enter-the-void");
    }
    saveTotalY(totalY);
  });
});

Template.theJourney.onDestroyed(() => {
  scrollListener.off();
});

Template.theJourney.helpers({
  journeys: () => {
    let journeys = [];
    let totalJourneys = Math.floor(savedTotalY.get() / 1000) + 1;
    let preValue      = savedTotalY.get() / (1000);
    for (let i = 1; i <= totalJourneys; i++) {
      let journeyScrollValue =  preValue / i;
      let journey;
      if (journeyScrollValue < 2) {
        if (i < 10) {
          journey = {
            x: 100 + (Math.sin(journeyScrollValue * Math.PI) * 6),
            y: 100 + (Math.sin(journeyScrollValue * Math.PI) * 6),
            radius_circle: Math.pow(journeyScrollValue, 10),
            width: 2,
            fill: "none",
          };
        } else if (i < 20) {
          journey = {
            x: 100 + (Math.sin(journeyScrollValue * 10 * Math.PI) * 100),
            y: 100 + (Math.sin(journeyScrollValue * 5 * Math.PI) * 100),
            radius_circle: Math.pow(journeyScrollValue, 10),
            width: 2,
            fill: "none",
          };
        } else if (i < 40) {
          journey = {
            x: 100 + (Math.sin(journeyScrollValue * 10 * Math.PI) * 18),
            y: 100 + (Math.sin(journeyScrollValue * 18 * Math.PI) * 18),
            radius_circle: Math.pow(journeyScrollValue, 4),
            width: 0,
            fill: "white",
          }
        } else if (i < 60) {
          journey = {
            x: 100 + (Math.sin(journeyScrollValue * 10 * Math.PI) * 18),
            y: 100 + (Math.sin(journeyScrollValue * 18 * Math.PI) * 18),
            radius_circle: Math.pow(journeyScrollValue, 14) * 3 * (i-40),
            width: 0,
            fill: "white",
          }
        } else {
          FlowRouter.go("/");
        }
        journeys.push(journey);
      }
    }
    return journeys;
  },
  viewable: (journey) => {
    return true;
  }
})
