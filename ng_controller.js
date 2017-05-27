angular.module('app.controller', ['ui-leaflet'])

    .controller('dashboardCtrl', function ($scope) {

        angular.extend($scope, {
            center: {
                lat: 17.700,
                lng: 100.560,
                zoom: 9
            },
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

    })