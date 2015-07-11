Template.dashboard.rendered = function() {

};

Template.dashboard.helpers({
	currentConfig: function() {
		var x = UserConfigs.findOne({userId: Meteor.userId()});
		console.log(x.exp);
		return x;
	},
	experienceToLevelUp: function() {
		var x = UserConfigs.findOne({userId: Meteor.userId()});
		console.log(100 - x.exp);
		return 100 - x.exp;
	}
})
