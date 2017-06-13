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
        },
        getWfs: function(){
            var wfs ='http://cgi.uru.ac.th/gs-rain/rain/ows?service=WFS&version=1.0.0';
                wfs += '&request=GetFeature';
                wfs += '&typeName=rain:rain_now_report_ud';
                wfs += '&outputFormat=application%2Fjson';                    
            return $http.get(wfs);
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
        getFireUd: function() {
            var data = 'http://cgi.uru.ac.th/hotspot-api/index.php/hotspot/ud';
            return $http.get(data);
        },
        getFireTh: function(stat) {
            var data = 'http://cgi.uru.ac.th/hotspot-api/index.php/hotspot/th';
            return $http.get(data);
        }
    }
})




