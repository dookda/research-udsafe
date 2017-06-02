angular.module('app.service', [])

.service('rainService', function($http) {
    return {
        selectedLocation: {},
        getRain: function() {
            var data = 'http://cgi.uru.ac.th/rain-api/index.php/rain/ud';
            return $http.get(data);
        },
        getStat: function(stat) {
            var data = 'http://cgi.uru.ac.th/rain-api/index.php/rain_stat/'+stat;
            return $http.get(data);
        }
    }
})




