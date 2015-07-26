
var fitbit = new Fitbit();

Meteor.startup(function() {
	ServiceConfiguration.configurations.remove({
		service: "fitbit"
	});

	ServiceConfiguration.configurations.insert({
		service: "fitbit",
		consumerKey: "e9d83c7bfc19e1edef8619dc6f1cc8b0",
		secret: "56fe0cb799b7e38b90a8a4fd1801d6e8"
	});
});

Meteor.methods({
	mySteps: function() {

		var data = fitbit.getSteps().data;
		console.log("Inside mySteps");
		// console.log(data);
		return data;
		// for (var key in data["activities-steps"])
		// 	ActivitiesSteps.update(
		// 		{ dateTime: data["activities-steps"][key]["dateTime"]},
		// 			{
		// 				$set: {
		// 					dateTime: data["activities-steps"][key]["dateTime"],
		// 					value: data["activities-steps"][key]["value"]
		// 				}					
		// 			},
		// 		{ upsert: true }
		// 	)
	},
	getFriends: function() {
		var result = fitbit.get('user/-/friends.json');
		// console.log(result);
		return result.data.friends;
	},

	getFriendsIdByName: function(displayName) {
		// console.log(displayName);
		var userId = Meteor.users.findOne({'profile.displayname': displayName});

		return userId;

	},
	getSleep: function() {
		var currentDate = moment();
		var previousDay = currentDate;
		// var previousDay = currentDate.subtract(1, 'days');
		previousDay = previousDay.format('YYYY-MM-DD');
		// console.log(previousDay);

		var result = fitbit.get('user/-/sleep/date/' + previousDay + '.json');
		// console.log(result);
		return result.data.sleep;
	},
	getCurrentSteps: function() {
		var currentDate = moment();
		var previousDay = currentDate;
		// var previousDay = currentDate.subtract(1, 'days');
		previousDay = previousDay.format('YYYY-MM-DD');
		var result = fitbit.get('user/-/activities/date/' + previousDay + '.json');
		console.log(result.data);
		// console.log("Inside currentSTeps");
		// console.log(result.content);
		return result.data.summary;
	},
	getScoreForUser: function(userId, battleId) {
		var currentDate = moment();
		var previousDay = currentDate;
		// var previousDay = currentDate.subtract(1, 'days');
		previousDay = previousDay.format('YYYY-MM-DD');
		var result = fitbit.get('user/-/activities/date/' + previousDay + '.json');
		// console.log("Inside currentSTeps");
		// console.log(result.content);
		var currentSteps = result.data.summary.steps;
		var currentActive = result.data.summary.veryActiveMinutes + result.data.summary.fairlyActiveMinutes;
		var currentFloors = result.data.summary.floors;

		var battle = Battles.findOne({_id: battleId});
		var score = 0;
		// if(battle.playerOne === Meteor.userId()) {
		// 	score = battle.p1_points;
		// } else {
		// 	score = battle.p2_points;
		// }

		if(Achievements.find({battleId: battleId, userId: userId}).count() === 0){
			console.log("currentSteps: " + currentSteps);
			score += currentSteps / 100;
			score += currentFloors * 10;
			score += currentActive;
			console.log("Current Score: " + score);
			Achievements.insert({
				battleId: battleId,
				userId: userId,
				sleepGoal: false,
				sleepPoints: 10,
				currentSteps: currentSteps,
				stepPointsPerHundred: 1,
				currentActiveMinutes: currentActive,
				currentFloors: currentFloors
			});
		}


		var currentAchievements = Achievements.findOne({battleId: battleId, userId: userId});

		// Calculate Sleep Points
		if(currentAchievements.sleepGoal === false) {
			// console.log(previousDay);

			result = fitbit.get('user/-/sleep/date/' + previousDay + '.json');
			// console.log(result);
			var currentSleep = (result.data.sleep)[0].minutesAsleep / 60;
			if(currentSleep >= 7.0) {
				score += 10;
				Achievements.update({_id: currentAchievements._id}, {$set: {"sleepGoal": true}});
			}
			
		}

		if(currentSteps > currentAchievements.currentSteps && currentSteps > 100) {
			score += (currentSteps - currentAchievements.currentSteps) / 100;
			Achievements.update({_id: currentAchievements._id}, {$set: {"currentSteps": currentSteps}});
		}

		if(currentActive > currentAchievements.currentActiveMinutes) {
			score += (currentActive - currentAchievements.currentActiveMinutes);
			Achievements.update({_id: currentAchievements._id}, {$set: {"currentActiveMinutes": currentActive}});
		}

		if(currentFloors > currentAchievements.currentFloors) {
			score += (currentFloors - currentAchievements.currentFloors) * 10;
			Achievements.update({_id: currentAchievements._id}, {$set: {"currentFloors": currentFloors}});			
		}

		if(battle.playerOne === Meteor.userId()) {
			Battles.update({_id: battleId}, {$set: {"p1_points": battle.p1_points + score}});
		} else {
			Battles.update({_id: battleId}, {$set: {"p2_points": battle.p2_points + score}});
		}

		// var x = UserConfigs.find({userId: Meteor.userId()});
		// UserConfigs.update({_id: x._id},{$set: {exp : x.exp + 50 + (score / .1) }});

		// if(x.exp >= 100)
		// {
		// 	UserConfigs.update({_id: x._id},{$set: {exp : 0}});
		// 	UserConfigs.update({_id: x._id},{$set: {level: x.level+1}});
		// }

		return currentAchievements;
	}
 });

Meteor.publish("currentAccessToken", function(){
	return Meteor.users.find(this.userId, {fields: {'services.fitbit.accessToken': 1, 'services.fitbit.accessTokenSecret': 1}});
});