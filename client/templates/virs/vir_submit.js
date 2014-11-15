Template.virSubmit.events({
	'submit form': function(e) {
		e.preventDefault();

		var vir = {
			url: $(e.target).find('[name=country]').val(),
			title: $(e.target).find('[name=visaYN]').val()
		};

		Meteor.call('virInsert', vir, function(error, result) {
			// display the error to the user and abort
			if (error)
			return alert(error.reason);
		
			// show this result but route anyway
			if (result.virExists)
			alert('This link has already been posted');
			Router.go('virPage', {_id: result._id});  
		});
	}
});