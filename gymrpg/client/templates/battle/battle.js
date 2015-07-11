Template.battle.rendered = function() {
	console.log("Inside render");
	console.log(Session.get('currentBattle'));
	Meteor.call('getScoreForUser', Meteor.userId(), Session.get('currentBattle'), function(error, results){
		console.log("Inside Scoring");
		console.log(results);
	});

	Meteor.call('getCurrentSteps', function(error, results){
		console.log("asdcite");
		console.log(results);
	})
	// var currentSteps = 0;
	// Meteor.call('getCurrentSteps', function(error, results){
	// 	console.log(results);
	// 	currentSteps = results;
	
	// 	var battle = Battles.findOne({_id: Session.get('currentBattle')});
	// 	var score = 0;
	// 	if(battle.playerOne === Meteor.userId()) {
	// 		score = battle.p1_points;
	// 	} else {
	// 		score = battle.p2_points;
	// 	}

	// 	if(Achievements.find({battleId: Session.get('currentBattle')}).count() === 0){
	// 		console.log("currentSteps: " + currentSteps);
	// 		score += currentSteps / 100;
	// 		console.log("Current Score: " + score);
	// 		Achievements.insert({
	// 			battleId: Session.get('currentBattle'),
	// 			sleepGoal: false,
	// 			sleepPoints: 10,
	// 			currentSteps: currentSteps,
	// 			stepPointsPerHundred: 1
	// 		});
	// 	}

	// 	var currentAchievements = Achievements.findOne({battleId: Session.get('currentBattle')});
		
	// 	// Calculate Sleep Points
	// 	if(currentAchievements.sleepGoal === false) {
	// 		Meteor.call('getSleep', function(error, results){
	// 			console.log("Battle Render");
	// 			console.log(results);
	// 			if((results[0].minutesAsleep / 60) >= 7.0) {
	// 				score += 10;
					
	// 			}
	// 		});

	// 		Achievements.update({_id: currentAchievements._id}, {$set: {"sleepGoal": true}});
	// 	}

	// 	if(currentSteps > currentAchievements.currentSteps && currentSteps > 100) {
	// 		score += (currentSteps - currentAchievements.currentSteps) / 100;
	// 		Achievements.update({_id: currentAchievements._id}, {$set: {"currentSteps": currentSteps}});
	// 	}

	// 	if(battle.playerOne === Meteor.userId()) {
	// 		Battles.update({_id: Session.get('currentBattle')}, {$set: {"p1_points": battle.p1_points + 10}});
	// 	} else {
	// 		Battles.update({_id: Session.get('currentBattle')}, {$set: {"p2_points": battle.p2_points + 10}});
	// 	}
	//});



};

Template.battle.helpers({
	currentBattle: function() {
		console.log("MMEEEE BAATTLE");
		var battleId = Session.get('currentBattle');
		var battle = Battles.find({_id: battleId});
		console.log(battle);
		Session.set('currentBattleObject', Battles.findOne({_id: battleId}));
		return battle;
	},

	isPlayerOneWinning: function() {
		var battle = Session.get('currentBattleObject');
		return battle.p1_points > battle.p2_points;
	},
	isPlayerTwoWinning: function() {
		var battle = Session.get('currentBattleObject');
		return battle.p1_points < battle.p2_points;
	},
	getP1Achievements: function() {
		var battle = Session.get('currentBattleObject');
		var playerOneAchievements = Achievements.find({battleId: Session.get('currentBattle'), userId: battle.playerOne});
		playerOneAchievements.currentSteps = playerOneAchievements.currentSteps / 100;
		playerOneAchievements.currentFloors = playerOneAchievements.currentFloors * 10;
		return playerOneAchievements;
	},
	getP2Achievements: function() {
		var battle = Session.get('currentBattleObject');
		var playerTwoAchievements = Achievements.find({battleId: Session.get('currentBattle'), userId: battle.playerTwo});
		playerTwoAchievements.currentSteps = playerTwoAchievements.currentSteps / 100;
		playerTwoAchievements.currentFloors = playerTwoAchievements.currentFloors * 10;
		return playerTwoAchievements;
	},

	divideBy: function(number) {
		return number / 100;
	},

	multiplyByTen: function(number)	{
		return number * 10;
	}	
});