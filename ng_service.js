angular.module('app.service', [])

.service('dengueService', function($http) {
    return {
        selectedLocation: {},
        loadDenguePoint: function() {
            var data = 'http://localhost/hms-api/index.php/denguepoint';
            return $http.get(data);
        },
        getJson: function() {
            var data = 'http://localhost:8080/geoserver/hms/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=hms:v_dengue_point&maxFeatures=50&outputFormat=application%2Fjson';
            return $http.get(data);
        }
    }
})

.service('chartService', function($http) {
	var dataService = [];
    return {  
        getCase: function(place,code) {
            var pdata = 'http://localhost/hms-api/index.php/stat/'+place+'/'+code;
            return $http.get(pdata);
        },  
        getCaseProv: function(pcode) {
            var pdata = 'http://localhost/hms-api/index.php/stat_prov/' + pcode;
            return $http.get(pdata);
        },
        getCaseAmp: function(acode) {
            var adata = 'http://localhost/hms-api/index.php/stat_amp/' + acode;
            return $http.get(adata);
        },
        getCaseTam: function(tcode) {
            var tdata = 'http://localhost/hms-api/index.php/stat_tam/' + tcode;
            return $http.get(tdata);
        },
        getCaseVill: function(vcode) {
            var vdata = 'http://localhost/hms-api/index.php/stat_vill/' + vcode;
            return $http.get(vdata);
        }
    }
})

.service('placeService', function($http) {
    return {
        getProv: function() {
            var pdata = 'http://localhost/hms-api/index.php/prov';
            return $http.get(pdata);
        },
        getAmp: function(pcode) {
            var adata = 'http://localhost/hms-api/index.php/amp/' + pcode;
            return $http.get(adata);
        },
        getTam: function(acode) {
            var tdata = 'http://localhost/hms-api/index.php/tam/' + acode;
            return $http.get(tdata);
        },
        getVill: function(tcode) {
            var vdata = 'http://localhost/hms-api/index.php/vill/' + tcode;
            return $http.get(vdata);
        }
    }
})


