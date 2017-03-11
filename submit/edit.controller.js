app.controller('editController',function($scope, $rootScope, $http, $location, $routeParams){
	
	if (typeof($rootScope) == 'undefined' || $rootScope.user == undefined) $location.path("/login");
	$scope.conf = {}
	var data = {
		hid: $routeParams.hid,
		user: $rootScope.user.email,
		password: $rootScope.user.password
	}
	
	$http.post('get_hb_json.php', data).then(function(res){
		$scope.conf = res.data[0]
	})
	
	// submit function
	$scope.submit = function () {
		$scope.conf.user = $rootScope.user.email
		$scope.conf.password = $rootScope.user.password
		if ($scope.conf.type < 8){
			$http.post('update.php', $scope.conf).then(function(res){
				alertify.success($scope.conf.name + " edited successfully!");
				$location.path('/')
			})
		}else{
			$http.post('update2.php', $scope.conf).then(function(res){
				alertify.success($scope.conf.name + " edited successfully!");
				$location.path('/')
			})
		}
	}

})