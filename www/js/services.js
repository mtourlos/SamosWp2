angular.module('starter.services', [])

.factory('Wgs', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var wgs = [{
    id: 0,
	name: 'No 1',
    kw: '1',
	v: '378',
    face: '/img/enercon-logo.png',
	status: 'Running'
  }, {
    id: 1,
    name: 'No2',
    kw: '0',
	v: '380',
    face: '/img/enercon-logo.png',
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
});
