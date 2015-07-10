
var fitbit = new Fitbit();

Meteor.startup(function() {
	ServiceConfiguration.configurations.remove({
		service: "fitbit"
	});

	ServiceConfiguration.configurations.insert({
		service: "fitbit",
		consumerKey: "e9d83c7bfc19e1edef8619dc6f1cc8b0",
		secret: "56fe0cb799b7e38b90a8a4fd1801d6e8"
	});
});

Meteor.methods({
	mySteps: function() {

		var data = fitbit.getSteps().data;
		console.log("Inside mySteps");
		console.log(fitbit.getSteps());
		// for (var key in data["activities-steps"])
		// 	ActivitiesSteps.update(
		// 		{ dateTime: data["activities-steps"][key]["dateTime"]},
		// 			{
		// 				$set: {
		// 					dateTime: data["activities-steps"][key]["dateTime"],
		// 					value: data["activities-steps"][key]["value"]
		// 				}					
		// 			},
		// 		{ upsert: true }
		// 	)
	}
});

Meteor.publish("currentAccessToken", function(){
	return Meteor.users.find(this.userId, {fields: {'services.fitbit.accessToken': 1, 'services.fitbit.accessTokenSecret': 1}});
});;