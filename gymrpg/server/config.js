Meteor.publish("currentAccessToken", function(){
	return Meteor.users.find(this.userId, {fields: {'services.fitbit.accessToken': 1}});
});;