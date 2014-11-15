Template.virEdit.events({
	'submit form': function(e) {
		e.preventDefault();

		var currentVirId = this._id;

		var virProperties = {
			country: $(e.target).find('[name=country]').val(),
			visaYN: $(e.target).find('[name=visaYN]').val()
		}

		Virs.update(currentVirId, {$set: virProperties}, function(error) {
			if (error) {
				// display the error to the user
				alert(error.reason);
			} else {
				Router.go('virPage', {_id: currentVirId});
			}
		});
	},

	'click .delete': function(e) {
		e.preventDefault();

		if (confirm("Delete this VIR?")) {
			var currentVirId = this._id;
			Posts.remove(currentVirId);
			Router.go('virsList');
		}
	}
});