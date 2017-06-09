angular.module('app.controller', ['ui-leaflet', 'ui.bootstrap'])

    .controller('dashboardCtrl', function ($scope, rainService) {


        var center = {
            lat: 17.700,
            lng: 100.560,
            zoom: 9
        };
        //$scope.dat = { lat: '', lng: ''};
        $scope.goMap = function (lat, lng) {
            $scope.center = {
                lat: Number(lat),
                lng: Number(lng),
                zoom: 15
            };
            //rainService.selectedLocation = $scope.center; 
            console.log($scope.center.lat + '-' + $scope.center.lng);
        };

        //$scope.center = rainService.selectedLocation;


        // if ($scope.center.lat == null) {
        //     //console.log('yess null');
        //     var center = {
        //         lat: 17.700,
        //         lng: 100.560,
        //         zoom: 9
        //     }
        // } else {
        //     var center = {
        //         lat: Number($scope.center.lat),
        //         lng: Number($scope.center.lng),
        //         zoom: 15
        //     };
        // }

        console.log(center.lat + '-' + center.lng);

        angular.extend($scope, {
            center: center,
            markers: {
                taipei: {
                    lat: 25.0391667,
                    lng: 121.525,
                }
            },
            layers: {
                baselayers: {
                    cycle: {
                        name: 'OpenCycleMap',
                        type: 'xyz',
                        url: 'http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png',
                        layerOptions: {
                            subdomains: ['a', 'b', 'c'],
                            attribution: '&copy; <a href="http://www.opencyclemap.org/copyright">OpenCycleMap</a> contributors - &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                            continuousWorld: true
                        }
                    },
                    osm: {
                        name: 'OpenStreetMap',
                        type: 'xyz',
                        url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                        layerOptions: {
                            subdomains: ['a', 'b', 'c'],
                            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                            continuousWorld: true
                        }
                    },
                    imagery: {
                        name: "Imagery",
                        type: "agsBase",
                        layer: "Imagery",
                        visible: false
                    }
                },
                overlays: {

                    rainnow: {
                        name: 'ตำแหน่งวัดปริมาณน้ำฝนรายวัน',
                        type: 'wms',
                        visible: true,
                        url: 'http://cgi.uru.ac.th/gs-rain/ows?',
                        layerParams: {
                            layers: 'rain:rain_now_report_ud',
                            format: 'image/png',
                            transparent: true,
                            zIndex: 2
                        }
                    },
                    rainwms: {
                        name: 'ปริมาณน้ำฝนรายวัน',
                        type: 'wms',
                        visible: false,
                        url: 'http://map.nu.ac.th/gs-alr2/ows?',
                        layerParams: {
                            layers: 'alrmap:rainsplinegrid',
                            format: 'image/png',
                            transparent: true,
                            zIndex: 2
                        }
                    },
                    province: {
                        name: 'ขอบเขตจังหวัด',
                        type: 'wms',
                        visible: true,
                        url: 'http://map.nu.ac.th/gs-alr2/ows?',
                        layerParams: {
                            layers: 'alr:ln9p_prov',
                            format: 'image/png',
                            transparent: true,
                            zIndex: 3
                        }
                    },
                    amphoe: {
                        name: 'ขอบเขตอำเภอ',
                        type: 'wms',
                        visible: true,
                        url: 'http://map.nu.ac.th/gs-alr2/ows?',
                        layerParams: {
                            layers: 'alr:ln9p_amp',
                            format: 'image/png',
                            transparent: true,
                            zIndex: 4
                        }
                    },
                    tambon: {
                        name: 'ขอบเขตตำบล',
                        type: 'wms',
                        visible: true,
                        url: 'http://map.nu.ac.th/gs-alr2/ows?',
                        layerParams: {
                            layers: 'alr:ln9p_tam',
                            format: 'image/png',
                            transparent: true,
                            zIndex: 5
                        }
                    },
                    village: {
                        name: 'หมู่บ้าน',
                        type: 'wms',
                        visible: false,
                        url: 'http://map.nu.ac.th/gs-alr2/ows?',
                        layerParams: {
                            layers: 'alr:ln9p_vill',
                            format: 'image/png',
                            transparent: true,
                            zIndex: 6
                        }
                    }

                }
            }
        });

        // load rain avg
        $scope.getStatAvg = function (avg) {
            rainService.getStat(avg)
                .then(function (response) {
                    $scope.rainAvg = response.data;
                    //console.log(response.data);
                })
        };
        $scope.getStatAvg('avg');

        // load rain max
        $scope.getStatMax = function (max) {
            rainService.getStat(max)
                .then(function (response) {
                    $scope.rainMax = response.data;
                })
        };
        $scope.getStatMax('max');

        // load rain max
        $scope.getRain = function () {
            rainService.getRain()
                .then(function (response) {
                    $scope.rainData = response.data;
                    $scope.length = response.data.length;
                    //$scope.length = response.data.length;
                    console.log($scope.length);
                    $scope.totalItems = $scope.length;
                    $scope.currentPage = 1;
                    $scope.numPerPage = 10;
                })
        };
        $scope.getRain();


        $scope.paginate = function (value) {
            var begin, end, index;
            begin = ($scope.currentPage - 1) * $scope.numPerPage;
            end = begin + $scope.numPerPage;
            index = $scope.rainData.indexOf(value);
            return (begin <= index && index < end);
        }

        $scope.reload = function () {
            location.reload();
        };


    })

    .controller('rainformCtrl', function ($scope,  $http, $timeout, rformService) {


        $scope.getAmp = function () {
            rformService.getAmp()
                .then(function (response) {
                    $scope.amp = response.data;
                    $scope.tam = [];
                })
        };
        $scope.getAmp();

        $scope.getTam = function () {
            rformService.getTam($scope.dat.amp.amp_name)
                .then(function (response) {
                    $scope.tam = response.data;
                    //console.log($scope.dat.amp.amp_name);
                    $scope.vill = [];
                    $scope.moo = [];
                })
        };

        $scope.getVill = function () {
            rformService.getVill($scope.dat.tam.tam_name)
                .then(function (response) {
                    $scope.vill = response.data;
                    $scope.moo = [];
                })
        };

        $scope.getMoo = function () {
            rformService.getMoo($scope.dat.vill.village)
                .then(function (response) {
                    $scope.moo = response.data;
                })
        };

        

        // insert data 
        $scope.insertData = function() {

            $scope.selectedData = {
                // amp: $scope.dat.amp.amp_name,
                // tam: $scope.dat.tam.tam_name,
                // vill: $scope.dat.vill.village,
                mcode: $scope.dat.moo,
                rain: $scope.dat.rain,
                date: $scope.dat.date
            };

            var link = 'http://cgi.uru.ac.th/udsafe/insert2db.php';
            //$http.post(link, {username : $scope.data.farmer_fname})
            $http.post(link, $scope.selectedData)
                .then(function(res) {
                    $scope.response = res.data;
                    console.log(res.data);

                    // refesh layer
                    $timeout(function() {
                         $scope.getClear();
                         console.log('refreshed');
                    }, 400);
                });
        };

        $scope.getClear = function () {
            // get everything
            $scope.dat = {
                amp: '',
                tam: '',
                vill: '',
                moo: '',
                rain: ''

            };
        };

        
        $scope.dat = {
            date:  new Date()
      };

    })

    .controller('landslideCtrl', function ($scope, rainService) {
        var center = {
            lat: 17.700,
            lng: 100.560,
            zoom: 9
        };
        angular.extend($scope, {
            center: center,
            markers: {
                taipei: {
                    lat: 25.0391667,
                    lng: 121.525,
                }
            },
            layers: {
                baselayers: {
                    cycle: {
                        name: 'OpenCycleMap',
                        type: 'xyz',
                        url: 'http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png',
                        layerOptions: {
                            subdomains: ['a', 'b', 'c'],
                            attribution: '&copy; <a href="http://www.opencyclemap.org/copyright">OpenCycleMap</a> contributors - &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                            continuousWorld: true
                        }
                    },
                    osm: {
                        name: 'OpenStreetMap',
                        type: 'xyz',
                        url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                        layerOptions: {
                            subdomains: ['a', 'b', 'c'],
                            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                            continuousWorld: true
                        }
                    },
                    imagery: {
                        name: "Imagery",
                        type: "agsBase",
                        layer: "Imagery",
                        visible: false
                    }
                },
                overlays: {
                    province: {
                        name: 'ขอบเขตจังหวัด',
                        type: 'wms',
                        visible: true,
                        url: 'http://map.nu.ac.th/gs-alr2/ows?',
                        layerParams: {
                            layers: 'alr:ln9p_prov',
                            format: 'image/png',
                            transparent: true,
                            zIndex: 3
                        }
                    },
                    amphoe: {
                        name: 'ขอบเขตอำเภอ',
                        type: 'wms',
                        visible: true,
                        url: 'http://map.nu.ac.th/gs-alr2/ows?',
                        layerParams: {
                            layers: 'alr:ln9p_amp',
                            format: 'image/png',
                            transparent: true,
                            zIndex: 4
                        }
                    },
                    tambon: {
                        name: 'ขอบเขตตำบล',
                        type: 'wms',
                        visible: true,
                        url: 'http://map.nu.ac.th/gs-alr2/ows?',
                        layerParams: {
                            layers: 'alr:ln9p_tam',
                            format: 'image/png',
                            transparent: true,
                            zIndex: 5
                        }
                    },
                    village: {
                        name: 'หมู่บ้าน',
                        type: 'wms',
                        visible: false,
                        url: 'http://map.nu.ac.th/gs-alr2/ows?',
                        layerParams: {
                            layers: 'alr:ln9p_vill',
                            format: 'image/png',
                            transparent: true,
                            zIndex: 6
                        }
                    }

                }
            }
        });
    })

    .controller('droughtCtrl', function ($scope, rainService) {

        var center = {
            lat: 17.700,
            lng: 100.560,
            zoom: 9
        };
        angular.extend($scope, {
            center: center,
            markers: {
                taipei: {
                    lat: 25.0391667,
                    lng: 121.525,
                }
            },
            layers: {
                baselayers: {
                    cycle: {
                        name: 'OpenCycleMap',
                        type: 'xyz',
                        url: 'http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png',
                        layerOptions: {
                            subdomains: ['a', 'b', 'c'],
                            attribution: '&copy; <a href="http://www.opencyclemap.org/copyright">OpenCycleMap</a> contributors - &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                            continuousWorld: true
                        }
                    },
                    osm: {
                        name: 'OpenStreetMap',
                        type: 'xyz',
                        url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                        layerOptions: {
                            subdomains: ['a', 'b', 'c'],
                            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                            continuousWorld: true
                        }
                    },
                    imagery: {
                        name: "Imagery",
                        type: "agsBase",
                        layer: "Imagery",
                        visible: false
                    }
                },
                overlays: {
                    province: {
                        name: 'ขอบเขตจังหวัด',
                        type: 'wms',
                        visible: true,
                        url: 'http://map.nu.ac.th/gs-alr2/ows?',
                        layerParams: {
                            layers: 'alr:ln9p_prov',
                            format: 'image/png',
                            transparent: true,
                            zIndex: 3
                        }
                    },
                    amphoe: {
                        name: 'ขอบเขตอำเภอ',
                        type: 'wms',
                        visible: true,
                        url: 'http://map.nu.ac.th/gs-alr2/ows?',
                        layerParams: {
                            layers: 'alr:ln9p_amp',
                            format: 'image/png',
                            transparent: true,
                            zIndex: 4
                        }
                    },
                    tambon: {
                        name: 'ขอบเขตตำบล',
                        type: 'wms',
                        visible: true,
                        url: 'http://map.nu.ac.th/gs-alr2/ows?',
                        layerParams: {
                            layers: 'alr:ln9p_tam',
                            format: 'image/png',
                            transparent: true,
                            zIndex: 5
                        }
                    },
                    village: {
                        name: 'หมู่บ้าน',
                        type: 'wms',
                        visible: false,
                        url: 'http://map.nu.ac.th/gs-alr2/ows?',
                        layerParams: {
                            layers: 'alr:ln9p_vill',
                            format: 'image/png',
                            transparent: true,
                            zIndex: 6
                        }
                    }

                }
            }
        });
    })

    .controller('fireCtrl', function ($scope, rainService) {

        var center = {
            lat: 17.700,
            lng: 100.560,
            zoom: 9
        };

        angular.extend($scope, {
            center: center,
            markers: {
                taipei: {
                    lat: 25.0391667,
                    lng: 121.525,
                }
            },
            layers: {
                baselayers: {
                    cycle: {
                        name: 'OpenCycleMap',
                        type: 'xyz',
                        url: 'http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png',
                        layerOptions: {
                            subdomains: ['a', 'b', 'c'],
                            attribution: '&copy; <a href="http://www.opencyclemap.org/copyright">OpenCycleMap</a> contributors - &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                            continuousWorld: true
                        }
                    },
                    osm: {
                        name: 'OpenStreetMap',
                        type: 'xyz',
                        url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                        layerOptions: {
                            subdomains: ['a', 'b', 'c'],
                            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                            continuousWorld: true
                        }
                    },
                    imagery: {
                        name: "Imagery",
                        type: "agsBase",
                        layer: "Imagery",
                        visible: false
                    }
                },
                overlays: {
                    hotspot: {
                        name: 'ตำแหน่งจุดความร้อน',
                        type: 'wms',
                        visible: true,
                        url: 'http://cgi.uru.ac.th/gs-hotspot/ows?',
                        layerParams: {
                            layers: 'hp:hotspot_today',
                            format: 'image/png',
                            transparent: true,
                            zIndex: 3
                        }
                    },
                    province: {
                        name: 'ขอบเขตจังหวัด',
                        type: 'wms',
                        visible: true,
                        url: 'http://map.nu.ac.th/gs-alr2/ows?',
                        layerParams: {
                            layers: 'alr:ln9p_prov',
                            format: 'image/png',
                            transparent: true,
                            zIndex: 3
                        }
                    },
                    amphoe: {
                        name: 'ขอบเขตอำเภอ',
                        type: 'wms',
                        visible: true,
                        url: 'http://map.nu.ac.th/gs-alr2/ows?',
                        layerParams: {
                            layers: 'alr:ln9p_amp',
                            format: 'image/png',
                            transparent: true,
                            zIndex: 4
                        }
                    },
                    tambon: {
                        name: 'ขอบเขตตำบล',
                        type: 'wms',
                        visible: true,
                        url: 'http://map.nu.ac.th/gs-alr2/ows?',
                        layerParams: {
                            layers: 'alr:ln9p_tam',
                            format: 'image/png',
                            transparent: true,
                            zIndex: 5
                        }
                    },
                    village: {
                        name: 'หมู่บ้าน',
                        type: 'wms',
                        visible: false,
                        url: 'http://map.nu.ac.th/gs-alr2/ows?',
                        layerParams: {
                            layers: 'alr:ln9p_vill',
                            format: 'image/png',
                            transparent: true,
                            zIndex: 6
                        }
                    }

                }
            }
        });

    })