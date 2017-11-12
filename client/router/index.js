BlazeLayout.setRoot('body');
FlowRouter.route('/', {
  triggersEnter: [(context, redirect) => {
      redirect('/the-world');
    }
  ]
});
FlowRouter.route('/the-world', {
  name: 'the-world',
  action: () => {
    console.log("the world...");
    BlazeLayout.render('begin');
  }
})
FlowRouter.route('/enter-the-void', {
  name: 'enter-the-void',
  action: () => {
    console.log("enter the void.")
    BlazeLayout.render('enterTheVoid');
  }
});
FlowRouter.route('/the-journey', {
  name: 'the-journey',
  action: () => {
    console.log("the journey.")
    BlazeLayout.render('theJourney');
  }
});
FlowRouter.triggers.exit([(context) => {
  FlowRouter.lastRoute = context.route;
}]);
