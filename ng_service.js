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

.service('rformService', function($http){
    return{
        selectedLocation: {},
        getAmp: function(){
            var ampDat = 'http://cgi.uru.ac.th/rain-api/index.php/rform_amp';
            return $http.get(ampDat);
        },
        getTam: function(amp){
            var tamDat = 'http://cgi.uru.ac.th/rain-api/index.php/rform_tam/'+amp;
            return $http.get(tamDat);
        },
        getVill: function(tam){
            var villDat = 'http://cgi.uru.ac.th/rain-api/index.php/rform_vill/'+tam;
            return $http.get(villDat);
        },
        getMoo: function(vill){
            var mooDat = 'http://cgi.uru.ac.th/rain-api/index.php/rform_moo/'+vill;
            return $http.get(mooDat);
        },
    }
})

.service('landslideService', function($http) {
    return {
        selectedLocation: {},        
    }
})
.service('droughtService', function($http) {
    return {
        selectedLocation: {},        
    }
})
.service('fireService', function($http) {
    return {
        selectedLocation: {},
        getpoint: function() {
            var data = 'http://cgi.uru.ac.th/rain-api/index.php/rain/ud';
            return $http.get(data);
        },
        getStat: function(stat) {
            var data = 'http://cgi.uru.ac.th/rain-api/index.php/rain_stat/'+stat;
            return $http.get(data);
        }
    }
})




