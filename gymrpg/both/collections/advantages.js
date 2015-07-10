Advantages = new Mongo.Collection('advantages');

Advantages.helpers({

});
Advantages.allow({
		'insert': function(userId,doc){
			return true;
		}
	});
if(Meteor.is_server) {
	Advantages.allow({
		'insert': function(userId,doc){
			return true;
		}
	});
}

Advantages.before.insert(function (userId, doc) {
  doc.createdAt = moment().toDate();
});
