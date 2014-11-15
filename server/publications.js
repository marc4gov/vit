Meteor.publish('virs', function() {
  return Virs.find();
});