Template.challenge.rendered = function() {

};

var isInBattle = function(battles, _id) {
	for(var i = 0; i < battles.length; i++) {
		console.log(battles[i]);
		if(battles[i].playerOne == _id || battles[i].playerTwo == _id){
			return true;
		}
	}

	return false;
}

Template.challenge.events({
	'click #friendBattleModalButton': function(e) {
		e.preventDefault();
		Meteor.call('getFriends', function(error, result){
			console.log(result);
			Session.set('friends', result);
		});
	},
	'click #friendBattleButton': function(e){
		e.preventDefault();
		var friendName = e.currentTarget.innerText;
		var x = (friendName.split(" "))[0].toLowerCase();
		var friendDisplayName = x.charAt(0).toUpperCase() + x.slice(1);
		console.log(friendDisplayName);
		var friend = Meteor.users.findOne({'profile.displayName': friendDisplayName});
		console.log(friend);

		Battles.insert({
			playerOne: Meteor.userId(),
			playerOneName: Meteor.user().profile.displayName,
			playerTwo: friend._id,
			playerTwoName: friend.profile.displayName,
			p1_points: 0,
			p2_points: 0,
			end_time: ((moment()).add(1, 'days')).format('YYYY-MM-DD'),
			// end_time: ((new Date().getTime()/1000) + (new Date().getTime() + new Date().getTime())/1000).toFixed(0),
			winner: "" 
		});
	},
	'click #randomBattleButton': function(e) {
		e.preventDefault();

		var battlesWhereIAmPlayerOne = Battles.find({playerOne: Meteor.userId()}).fetch();
		var battlesWhereIAmPlayerTwo = Battles.find({playerTwo: Meteor.userId()}).fetch();

		var allMeBattles = battlesWhereIAmPlayerOne.concat(battlesWhereIAmPlayerTwo);

		var randomUser = Meteor.users.findOne(function () {return Boolean(Math.floor(Math.random() * 2))});
		while(randomUser._id === Meteor.userId() || isInBattle(allMeBattles, randomUser._id)) {
			randomUser = Meteor.users.findOne(function () {return Boolean(Math.floor(Math.random() * 2))});
		}
		console.log(randomUser);

		Battles.insert({
			playerOne: Meteor.userId(),
			playerOneName: Meteor.user().profile.displayName,
			playerTwo: randomUser._id,
			playerTwoName: randomUser.profile.displayName,
			p1_points: 0,
			p2_points: 0,
			end_time: ((new Date().getTime()/1000) + (new Date().getTime() + new Date().getTime())/1000).toFixed(0),
			winner: "" 
		});

	},
	'click #battleButton': function(e) {
		e.preventDefault();
		console.log("BATTLE BBUTTON");
		console.log(e.currentTarget.attributes[2].nodeValue);
		Session.set('currentBattle', e.currentTarget.attributes[2].nodeValue);
		Router.go('/battle', {_id: e.currentTarget.attributes[2].nodeValue});
	}
});

Template.challenge.helpers({
	meFriends: function() {
		var friends;
		Meteor.call('getFriends', function(error, result){
			console.log(result);
			Session.set('friends', result);
			friends = result;
		});
		return Session.get('friends');
		// var friends = Session.get('friends');
		// return friends;
	},

	meBattles: function() {
		var battlesWhereIAmPlayerOne = Battles.find({playerOne: Meteor.userId()}).fetch();
		var battlesWhereIAmPlayerTwo = Battles.find({playerTwo: Meteor.userId()}).fetch();

		var allMeBattles = battlesWhereIAmPlayerOne.concat(battlesWhereIAmPlayerTwo);
		console.log(allMeBattles);
		return allMeBattles;

	}

});