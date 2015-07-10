Meteor.autosubscribe(function(){
	var newUser = Meteor.user();
	Meteor.subscribe('currentAccessToken');
});

Template.home.rendered = function() {

	ServiceConfiguration.configurations.remove({
		service: "fitbit"
	});

	ServiceConfiguration.configurations.insert({
		service: "fitbit",
		clientKey: "e9d83c7bfc19e1edef8619dc6f1cc8b0",
		clientSecret: "56fe0cb799b7e38b90a8a4fd1801d6e8"
	});
};


Template.home.events({
	'click #fitbitprofile': function(e){
		e.preventDefault();
		console.log("Inside click event");
		console.log(Meteor.user().services.fitbit.accessToken);
		console.log(Meteor.http.call("GET", "https://api.fitbit.com/1/user/-/profile.json", 
			{timeout: 3000,
			}, function(err, result){
			console.log(result);
		}));
	}
});