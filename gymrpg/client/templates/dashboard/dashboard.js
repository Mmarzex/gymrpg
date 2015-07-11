Template.dashboard.rendered = function() {

};

Template.dashboard.helpers({
	currentConfig: function() {
		var x = UserConfigs.findOne({userId: Meteor.userId()});
		return x;
	},
	experienceToLevelUp: function() {
		var x = UserConfigs.findOne({userId: Meteor.userId()});
		return 100 - x.exp;
	},

	addXP: function() {
		var x = UserConfigs.findOne({userId: Meteor.userId()});
		x.exp = x.exp + 20;
	},

	test: function() {
		var x = UserConfigs.findOne({userId: Meteor.userId()});
		var time = x.createdAt;
		time.setHours(time.getHours()+24);
		console.log(x.createdAt);

		if(moment().toDate() < time)
		{
			console.log("Dates are equal");
		}
	}
});

Template.dashboard.events({
	'click #clickMe': function(e){
		e.preventDefault();

		// var x = UserConfigs.findOne({userId: Meteor.userId()});

		// UserConfigs.update({_id: x._id},{$set: {exp : x.exp+20}});

		// if(x.exp >= 100)
		// {
		// 	UserConfigs.update({_id: x._id},{$set: {exp : x.exp-x.exp}});
		// }

		var x = UserConfigs.findOne({userId: Meteor.userId()});
		UserConfigs.update({_id: x._id},{$set: {exp : x.exp + 20}});

		if(x.exp >= 100)
		{
			UserConfigs.update({_id: x._id},{$set: {exp : x.exp - x.exp}});
			UserConfigs.update({_id: x._id},{$set: {level: x.level+1}});
		}
	}
});
