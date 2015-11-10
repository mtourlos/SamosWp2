angular.module('starter.controllers', [])
.controller('DashCtrl', function($scope, WSocket) {
	//$scope.parkBreaker = "false";
	//$scope.aspBreaker = "true";
	var i=0;
	$scope.toggle = function(){
		
		if (i===0){
			$scope.parkBreaker="true";
			//$scope.parkBreakerStyle={color:'lightgreen'};
		}else{
			$scope.parkBreaker="false"
			//$scope.parkBreakerStyle={color:'red'};
		}
		
		if (i===0){
			i=1;
		}else if(i===1){
			i=0
		}
	};
	
	$scope.receive = function(){
		alert("ok");
		//$scope.aspBreaker=WSocket.getBoolean();
		//$scope.aspBreaker="false";
	};
	
	$scope.$on('mainBroadcast', function (event,data) {
		$scope.$apply(function () {
			//alert(data.bool);
			$scope.kw = data.kw;
			$scope.windSpeed = data.windSpeed;
			$scope.v1 = data.v1;
			$scope.setpoint = data.setpoint;
			$scope.setpointMode = data.setpointMode;
			$scope.mvBreakerClosed = data.mvBreakerClosed;
			$scope.towerBreakerClosed = data.towerBreakerClosed;
            //$scope.aspBreaker = data.boolean;
			//$scope.windspeed = data.analog;
			//$scope.receive();
			
        });
        //$scope.aspBreaker="false";
    });
	
})

.controller('ChatsCtrl', function($scope, Wgs) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.wgs = Wgs.all();
  $scope.remove = function(wg) {
    Wgs.remove(wg);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Wgs) {
  $scope.wg = Wgs.get($stateParams.wgId);
})

.controller('AccountCtrl', function($scope, Alarms) {
  $scope.alarms = Alarms.all();
});
