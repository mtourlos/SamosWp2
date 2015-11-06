angular.module('starter.services', [])

.factory('Wgs', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var wgs = [{
    id: 0,
	name: 'No 1',
    kw: '1',
	v: '378',
    face: './img/enercon-logo.png',
	status: 'Running'
  }, {
    id: 1,
    name: 'No2',
    kw: '0',
	v: '380',
    face: './img/enercon-logo.png',
	status: 'Pause'
  }];

  return {
    all: function() {
      return wgs;
    },
    remove: function(wg) {
      wgs.splice(wgs.indexOf(wg), 1);
    },
    get: function(wgId) {
      for (var i = 0; i < wgs.length; i++) {
        if (wgs[i].id === parseInt(wgId)) {
          return wgs[i];
        }
      }
      return null;
    }
  };
})

.factory('Alarms', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var alarms = [{
    id: 0,
	name: 'Πρόβλημα Επικοινωνίας με ΑΣΠ',
	status: 'true'
  }, {
    id: 1,
	name: 'Αστάθεια Ανέμου',
	status: 'false'
  }, {
    id: 1,
	name: 'Αστάθεια Ανέμου',
	status: 'false'
  }, {
    id: 2,
	name: 'Μεγάλη Ταχύτητα Ανέμου',
	status: 'false'
  }, {
    id: 3,
	name: 'Υπέρταση',
	status: 'false'
  }, {
    id: 4,
	name: 'Υπερσυχνότητα',
	status: 'false'
  }, {
    id: 5,
	name: 'Υπόταση',
	status: 'false'
  }, {
    id: 6,
	name: 'Υποσυχνότητα',
	status: 'false'
  }];

 return {
    all: function() {
      return alarms;
    }
  };
})

.factory('WSocket', function($q, $rootScope) {
    // We return this object to anything injecting our service
    var Service = {};
    // Keep all pending requests here until they get responses
    
    // Create a unique callback ID to map requests to responses
    
    // Create our websocket object with the address to the websocket
    var ws = new WebSocket("ws://10.10.10.62:8080/OpcWebSockets/actions");
	
	var bool;
	var analog;
    
    ws.onopen = function(){  
        //alert("Socket has been opened!");  
    };
    
    ws.onmessage = function(message) {
        listener(JSON.parse(message.data));
		//$timeout(sendRequest,500);
		//alert(message.data);
		//var data = JSON.parse(message.data);
		//$scope.windspeed=data.analog;
		//$scope.aspBreaker=data.boolean;
		
		
    };

    function sendRequest() {
		var OkMessage = {
			action:"ok"
		};
		ws.send(JSON.stringify(OkMessage));
		//alert("Request sended");
    };

    function listener(data) {
		var message=data;
		//alert(message.analog);
		analog=message.analog;
		bool=message.boolean;
		//broadcastItem();
		//sendRequest();
		
		
		
		
    };
	
	//function broadcastItem(){
		//alert("broadcasted");
    //    $rootScope.$broadcast('handleBroadcast');
    //};
	
	//return Service;

    return {
		getBoolean: function(){
			//alert("test");
			return bool;
		}	
	};	
});
