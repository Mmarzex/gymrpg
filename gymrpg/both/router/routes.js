Router.route('/', {
  name: 'home'
});

Router.route('/challenge', {
	name: 'challenge'
});

Router.route('/battle', {
	name: 'battle'
});

Router.route('/dashboard', {
  name: 'dashboard',
  controller: 'DashboardController'
});



Router.plugin('ensureSignedIn', {
  only: ['dashboard']
});
