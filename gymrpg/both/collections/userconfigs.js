UserConfigs = new Mongo.Collection('userconfigs');

UserConfigs.helpers({

});

Meteor.publish('userconfigs', function(){
	return UserConfigs.find();
});

UserConfigs.allow({
		'insert': function(userId,doc){
			return true;
		}
	});
if(Meteor.is_server) {
	UserConfigs.allow({
		'insert': function(userId,doc){
			return true;
		}
	});
}

UserConfigs.before.insert(function (userId, doc) {
  doc.createdAt = moment().toDate();
});
