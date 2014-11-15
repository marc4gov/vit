Template.virsList.helpers({
  virs: function () {
    return Virs.find({}, {sort: {country : 1}});
  }
});