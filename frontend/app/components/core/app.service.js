(function () {

    angular
        .module('app')
        .service('gsaservice', function ($http) {

            var self = this;
            var API_URL = "https://gateway-tx-1.thriftly.io/dev/ep7e2f46/GSAService/";

            var getRandomIntInclusive = function (min, max) {
                min = Math.ceil(min);
                max = Math.floor(max);
                return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
            }

            self.getGSAs = function (name, pageSize, pageOffset, callback) {
                var result;
                var data = {
                    jsonrpc: '2.0',
                    id: getRandomIntInclusive(0, 100),
                    method: "getGSAs",
                    params: {
                        "search": {
                            "name": name,
                            "pageSize": pageSize,
                            "pageOffset": pageOffset
                        }
                    }
                }
                $http({
                    method: 'POST',
                    data: data,
                    url: API_URL,
                }).then(function successCallback(response) {
                    if(callback) {
                        callback(response.data.result);
                    }
                }, function errorCallback(response) {
                    console.log(API_URL + " " + response);
                });

            }

            self.getDemoGSA = function () {
                return [{
                        "id": "dcfd4070-789c-4a2b-983a-c57c76c8a160",
                        "name": "Alameda County Flood Control and Water Conservation District (Zone 7 Water Agency) - Non-Exclusive Portion",
                        "contact": "Carol Mahoney\n925-454-5064\ncmahoney@zone7water.com",
                        "contact_info": "100 North Canyons Parkway\nLivermore, CA 94551-9486",
                        "website": "",
                        "exclusive": "Exclusive",
                        "basin_number": "2-010",
                        "basin_name": "LIVERMORE VALLEY",
                        "region": "NCRO",
                        "county": "Contra Costa",
                        "posted": "2017-02-03T07:00:00Z",
                        "postedPlus90": "2017-05-04T07:00:00Z",
                        "received": "2017-01-20T07:00:00Z",
                        "receivedPlus15": "2017-02-04T07:00:00Z"
                    },
                    {
                        "id": "f994ee6b-878f-4117-af35-94c0a12a3c58",
                        "name": "Alameda County Water District",
                        "contact": "Michelle Myers\nGroundwater Resources Manager\n510-668-4454\nmichelle.myers@acwd.com",
                        "contact_info": "43885 South Grimmer Boulevard\nFremont, CA 94538",
                        "website": "",
                        "exclusive": "Exclusive",
                        "basin_number": "2-009.01",
                        "basin_name": "NILES CONE",
                        "region": "NCRO",
                        "county": "Alameda",
                        "posted": "2016-12-02T07:00:00Z",
                        "postedPlus90": "2017-03-02T07:00:00Z",
                        "received": "2016-11-18T07:00:00Z",
                        "receivedPlus15": "2016-12-03T07:00:00Z"
                    },
                    {
                        "id": "1fdc9fe4-201e-43bc-a774-b65c7737f480",
                        "name": "Aliso Water District",
                        "contact": "Roy Capania\nAliso GSO POC\n559-779-2616\nroy@oneilag.com",
                        "contact_info": "10302 Avenue 7-1/2\nFirebaugh, CA 93622",
                        "website": "",
                        "exclusive": "Exclusive",
                        "basin_number": "5-022.07",
                        "basin_name": "DELTA-MENDOTA",
                        "region": "SCRO",
                        "county": "Madera",
                        "posted": "2016-05-11T07:00:00Z",
                        "postedPlus90": "2016-08-09T07:00:00Z",
                        "received": "2016-05-03T07:00:00Z",
                        "receivedPlus15": "2016-05-18T07:00:00Z"
                    },
                    {
                        "id": "6c1ee354-67d4-4077-a589-2f430df2a60a",
                        "name": "Alpaugh Groundwater Sustainability Agency",
                        "contact": "David Kahn\nAttorney\n559-584-3337\ndkahn@kschanford.com",
                        "contact_info": "219 N. Douty Street\nHanford, CA 93230",
                        "website": "",
                        "exclusive": "Overlap",
                        "basin_number": "5-022.13",
                        "basin_name": "TULE",
                        "region": "SCRO",
                        "county": "Tulare",
                        "posted": "2016-06-17T07:00:00Z",
                        "postedPlus90": "2016-09-15T07:00:00Z",
                        "received": "2016-06-03T07:00:00Z",
                        "receivedPlus15": "2016-06-18T07:00:00Z"
                    }
                ]
            }

        })
})();