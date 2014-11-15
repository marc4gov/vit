Virs = new Mongo.Collection("virs");

Virs.allow({
  update: function(userId, vir) { return ownsDocument(userId, vir); },
  remove: function(userId, vir) { return ownsDocument(userId, vir); },
});

Virs.deny({
  update: function(userId, vir, fieldNames) {
    // may only edit the following two fields:
    return (_.without(fieldNames, 'country', 'visaYN').length > 0);
  }
});

Meteor.methods({
  virInsert: function(virAttributes) {
    check(Meteor.userId(), String);
    check(virAttributes, {
      country: String,
      visaYN: String
    });
	
	
    var virWithSameLink = Virs.findOne({country: virAttributes.country});
    if (virWithSameLink) {
      return {
        virExists: true,
        _id: virWithSameLink._id
      }
    }
	
    var user = Meteor.user();
    var vir = _.extend(virAttributes, {
      userId: user._id, 
      author: user.username, 
      submitted: new Date()
    });
    var virId = Virs.insert(vir);
    return {
      _id: virId
    };
  }
});