linksApp.config(function($routeProvider) {
    $routeProvider
        .when('/', {
			templateUrl : 'pages/login.html',
			controller  : 'LoginController'
		})
        
		.when('/entries', {
			templateUrl : 'pages/links.html',
			controller  : 'ManageController'
		});
});
