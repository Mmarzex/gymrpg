Achievements = new Mongo.Collection('achievements');

if(Meteor.is_server)
	Meteor.publish('achievements', function(){
		return Achievements.find();
	});


Achievements.helpers({

});
Achievements.allow({
		'insert': function(userId,doc){
			return true;
		},
		'update': function(userId, doc){
			return true;
		}
	});
if(Meteor.is_server) {
	Achievements.allow({
		'insert': function(userId,doc){
			return true;
		},
		'update': function(userId, doc){
			return true;
		}
	});
}

Achievements.before.insert(function (userId, doc) {
  doc.createdAt = moment().toDate();
});
