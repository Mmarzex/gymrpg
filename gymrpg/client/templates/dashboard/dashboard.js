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
	}
})
