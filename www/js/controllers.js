angular.module('starter.controllers', [])
.controller('DashCtrl', function($scope) {
	$scope.parkBreaker = "Ανοιχτός";
	$scope.parkBreakerStyle={color:'lightgreen'};
	$scope.aspBreaker = "Κλειστός";
	$scope.aspBreakerStyle={color:'red'};
	var i=0;
	$scope.toggle = function(){
		
		if (i===0){
			$scope.parkBreaker="Κλειστός";
			$scope.parkBreakerStyle={color:'lightgreen'};
		}else{
			$scope.parkBreaker="Ανοιχτός"
			$scope.parkBreakerStyle={color:'red'};
		}
		
		if (i===0){
			i=1;
		}else if(i===1){
			i=0
		}
	}
	
})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
