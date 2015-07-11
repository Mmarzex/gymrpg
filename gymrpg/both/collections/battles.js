Battles = new Mongo.Collection('battles');

if(Meteor.is_server)
	Meteor.publish('battles', function(){
		return Battles.find();
	});


Battles.helpers({

});
Battles.allow({
		'insert': function(userId,doc){
			return true;
		}
	});
if(Meteor.is_server) {
	Battles.allow({
		'insert': function(userId,doc){
			return true;
		}
	});
}

Battles.before.insert(function (userId, doc) {
  doc.createdAt = moment().toDate();
});
