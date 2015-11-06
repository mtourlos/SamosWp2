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
		//alert("ok");
		//WebSocket.getBoolean();
		$scope.aspBreaker=WSocket.getBoolean();
	};
	
	$scope.$on('$ionicView.enter', function () {
          $scope.aspBreaker=WSocket.getBoolean();
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
