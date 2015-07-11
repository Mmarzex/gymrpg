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
	},

	addXP: function() {
		var x = UserConfigs.findOne({userId: Meteor.userId()});
		x.exp = x.exp + 20;
	}
})

Template.dashboard.events({
	'click #clickMe': function(e){
		e.preventDefault();

		var x = UserConfigs.findOne({userId: Meteor.userId()});

		UserConfigs.update({_id: x._id},{$set: {exp : x.exp+20}});

		if(x.exp >== 100)
		{
			UserConfigs.update({_id: x._id},{$set: {exp : x.exp-x.exp}});
		}

	}
})
