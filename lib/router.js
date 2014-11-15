
Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	notFoundTemplate: 'notFound',
	waitOn: function() { return Meteor.subscribe('virs'); }
});

Router.route('/', {name: 'virsList'});
Router.route('/virs/:_id', {
	name: 'virPage',
	data: function() { return Virs.findOne(this.params._id); }
});

Router.route('/virs/:_id/edit', {
	name: 'virEdit',
	data: function() { return Virs.findOne(this.params._id); }
});

Router.route('/submit', {name: 'virSubmit'});

var requireLogin = function() {
	if (! Meteor.user()) {
		if (Meteor.loggingIn()) {
			this.render(this.loadingTemplate);
		} else {
			this.render('accessDenied');
		}
	} else {
		this.next();
	}
}

Router.onBeforeAction('dataNotFound', {only: 'virPage'});
Router.onBeforeAction(requireLogin, {only: 'virSubmit'});

