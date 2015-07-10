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
		consumerKey: "e9d83c7bfc19e1edef8619dc6f1cc8b0",
		secret: "56fe0cb799b7e38b90a8a4fd1801d6e8"
	});
};


Template.home.events({
	'click #fitbitprofile': function(e){
		e.preventDefault();
		console.log("Inside click event");
		var steps = Meteor.call('mySteps');
		console.log (steps);
		// console.log(Meteor.user().services.fitbit.accessTokenSecret);
		// console.log(new Fitbit());
		// var authkey = "OAuth oauth_consumer_key=\"e9d83c7bfc19e1edef8619dc6f1cc8b0\","
  //         + "oauth_nonce=\"kYjzVBB8Y0ZFabxSWbWovY3uYSQ2pTgmZeNu2VS4cg\","
  //         + "oauth_signature=\"tnnArxj06cWHq44gCs1OSKk%2FjLY%3D\"," 
  //         + "oauth_signature_method=\"HMAC-SHA1\"," 
  //         + "oauth_timestamp=\"" +(new Date().getTime()/1000).toFixed(0)+ "\"," 
  //         + "oauth_token=\"" + Meteor.user().services.fitbit.accessToken + "\"," 
  //         + "oauth_version=\"1.0\"";
  // 		var config = Accounts.loginServiceConfiguration.findOne({service: 'fitbit'});
  // 		config.secret = config.consumerSecret = '56fe0cb799b7e38b90a8a4fd1801d6e8';
  // 		var url = 'https://api.fitbit.com/1/user/-/profile.json';
  // 		var authtest = new OAuth1Binding(config, url);
  		
  // 		authtest.accessToken = Meteor.user().services.fitbit.accessToken;
  // 		authtest.accessTokenSecret = Meteor.user().services.fitbit.accessTokenSecret;
  // 		console.log(config.consumerSecret);
		// console.log(authtest);
		// console.log(authtest.get(url).data)
		// console.log(Meteor.http.call("GET", "https://api.fitbit.com/1/user/-/profile.json", 
		// 	{timeout: 3000,
		// 		headers: {
		// 			Authorization: authkey
		// 		}
		// 	}, function(err, result){
		// 	console.log(result);
		// }));
	}
});