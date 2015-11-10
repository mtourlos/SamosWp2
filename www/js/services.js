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
	status: 'false'
  }, {
    id: 1,
    name: 'No2',
    kw: '0',
	v: '380',
    face: './img/enercon-logo.png',
	status: 'false'
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
    },
	set: function(id,run,kw,v){
		wgs[id].status=run
		wgs[id].kw=kw;
		wgs[id].v=v;
		//alert(id);
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
	status: 'false'
  },  {
    id: 1,
	name: 'Πρόβλημα Επικοινωνίας με ENERCON',
	status: 'false'
  },  {
    id: 2,
	name: 'Αστάθεια Ανέμου',
	status: 'false'
  }, {
    id: 3,
	name: 'Μεγάλη Ταχύτητα Ανέμου',
	status: 'false'
  }, {
    id: 4,
	name: 'Υπέρταση',
	status: 'false'
  }, {
    id: 5,
	name: 'Υπερσυχνότητα',
	status: 'false'
  }, {
    id: 6,
	name: 'Υπόταση',
	status: 'false'
  }, {
    id: 7,
	name: 'Υποσυχνότητα',
	status: 'false'
  }, {
	id: 8,
	name: 'Σφάλμα συνημιτόνου',
	status: 'false'
 }];

 return {
    all: function() {
      return alarms;
    },
	set: function(id,status){
		alarms[id].status=status;
		return null;
	}
  };
})

.factory('WSocket', function($q, $rootScope, Wgs, Alarms) {
    // We return this object to anything injecting our service
    var Service = {};
    // Keep all pending requests here until they get responses
    
    // Create a unique callback ID to map requests to responses
    
    // Create our websocket object with the address to the websocket
    var ws = new WebSocket("ws://10.10.10.62:8080/OpcWebSockets/actions");
	var resp = [];
	var bool;
	var analog;
    
    ws.onopen = function(){  
        //alert("Socket has been opened!");  
    };
    
    ws.onmessage = function(message) {
		//broadcastItem(message.data);
		//sendRequest();
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
		resp = data;
		broadcastItem();
		updateWgens(data);
		updateAlarms(data);
		sendRequest();
	    };
	
	function broadcastItem(){
		//alert("broadcasted");
       $rootScope.$broadcast('mainBroadcast',resp);
    };
	
	function updateWgens(data){
		Wgs.set(0,data.wg1Run,data.wg1Kw,data.wg1V1);
		Wgs.set(1,data.wg2Run,data.wg2Kw,data.wg2V1);
		
	};
	
	function updateAlarms(data){
		Alarms.set(0,data.alarmAspCommerror);
		Alarms.set(1,data.alarmEnerconCommerror);
		Alarms.set(2,data.alarmWindBurstError);
		Alarms.set(3,data.alarmHighWindSpeed);
		Alarms.set(4,data.alarmOverVoltage);
		Alarms.set(5,data.alarmOverFrequency);
		Alarms.set(6,data.alarmUnderVoltage);
		Alarms.set(7,data.alarmUnderFrequency);
		Alarms.set(8,data.alarmCosfError);
	}
	
	
	
	return Service;

    //return {
		//getBoolean: function(){
			//alert("test");
			//return bool;
		//}
	//};	
});
