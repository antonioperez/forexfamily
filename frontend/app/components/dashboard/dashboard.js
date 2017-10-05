(function () {

  angular
    .module('app')
    .controller('DashboardCtrl', [
      '$http',
      'gsaservice',
      'mapservice',
      Ctrl
    ]);

    function Ctrl ($http, gsaservice, mapservice) {
      var vm = this;

      vm.progressData = {
        max: 100,
        current: 60,
        color: '#56BD5B'
      }
      
      vm.generateMap = function (map) {
        vm.countymap = mapservice.generateMap("js-leaflet-map", map.zoom, "data/" + map.file + ".zip", map.background,
          map.popup, map.searchKey, map.drawable, map.featureCallback
        );
      };

      vm.updateMap = function(map) {
        vm.countymap.remove();

        vm.map = map;
        vm.generateMap(vm.map);
      };

      //TO DO: Add API call to get this list. 
      vm.maps = [
        {
          "file": "CASGEM_Groundwater_Basin_Prioritization",
          "title": "GroundWater Basin Prioritization",
          "zoom": 7,
          "background": {
            "weight": 2,
            "opacity": 0.65
          },
          "popup": "<p>" + "BAS_SBBSN:  {{BAS_SBBSN}} <br>" +
            "DWR_Region: {{DWR_Region}} <br>" + "Priority: {{Priority}} <br>" +
            "Detailed Report: <a target='_blank' href='{{URL}}'>link <br>" + "</p>",

          "featureCallback": function (feature, layer) {
            var feat = feature.properties;
            var options = {};
            switch (feat.Priority) {
              case 'Low':
                options.color = "green";
                break;
              case "Very Low":
                options.color = "blue";
                break;
              case "Medium":
                options.color = "yellow";
                break;
              case 'High':
                options.color = "orange";
                break;
              case "Very High":
                options.color = "red";
                break;
              default:
                break;
            };

            layer.setStyle(options);
          },
          "searchKey": "BAS_SBBSN",
          "drawable": false
        },
        {
          "file": "County_Boundary",
          "title": "County Boundaries",
          "zoom": 7,
          "background": {
            "color": "green",
            "weight": 2,
            "opacity": 0.65
          },
          "popup": "<p>" +
            "ABBREV:  {{ABBREV}} <br>" +
            "ABCODE: {{ABCODE}} <br>" +
            "FM Name: {{FMNAME_PC}} <br>" +
            "NAME_PCASE: {{NAME_PCASE}} <br>" + "</p>",
          "featureCallback": null,
          "searchKey": "NAME_PCASE",
          "drawable": false

        },
        {
          "file": "ExclusiveGsaMasterSet",
          "title": "Current GSAs",
          "zoom": 7,
          "background": {
            "color": "red",
            "weight": 2,
            "opacity": 0.65
          },
          "popup": "<p>" + "Basin ID: {{Basin}} <br>" + "GSA filing: <a href='http://sgma.water.ca.gov/portal/gsa/print/{{DWR GSA ID}}' target='_blank'>View</a> <br>" +
            "GSA Name:  <a target='_blank' href ='{{GSA URL}} '>{{GSA Name}}  </a><br>" +
            "POC Name: {{POC Name}} <br>" + "POC Email: {{POC Email}} <br>" + "POC Phone: {{POC Phone}} <br>" +
            "Posted DT:  {{Posted DT}} <br>" + "Local ID: {{Local ID}} <br>" + "</p>",
          "featureCallback": null,
          "searchKey": "Basin",
          "drawable": false
        },
        {
          "file": "Groundwater_Management_Plan",
          "title": "Current Groundwater Management Plans",
          "zoom": 7,
          "background": {
            "weight": 2,
            "opacity": 0.65
          },
          "popup": "<p>" +
            "Agency_Nam:  {{Agency_Nam}} <br>" +
            "AQ NAME: {{AQ_NAME}} <br>" +
            "Phone: {{Phone_numb}}  <br>" +
            "GW Management Law: {{GW_Mgmt_Ty}}  <br>" +
            "Address: {{Address_li}} {{Address__1}} <br>" +
            "Plan_Year: {{Plan_Year}} <br>" +
            "Plan: <a target='_blank' href='{{Plan}}'>Link</a>  <br>" +
            "Site: <a target='_blank' href='{{Website}}'>{{Website}}</a>  <br>" +
            "Adopt: <a target='_blank'>{{Adopt}}</a>  <br>" +
            "Intent: <a target='_blank'>{{Intent}}</a> <br>" + "</p>",
          "featureCallback": null,
          "searchKey": "Agency_Nam",
          "drawable": false
        },
        {
          "file": "B118CAGroundwaterBasins",
          "title": "B118CA Groundwater Basins Boundaries",
          "zoom": 8,
          "background": {
            "weight": 2,
            "opacity": 0.65
          },
          "popup": "<p>" + "Basin ID: {{Basin_ID}} <br>" + "Basin Name: {{Basin_Name}} <br>" +
            "Basin_Su_1: {{Basin_Su_1}} <br>" + "Region:  {{Region_Off}} <br>" + "Report: {{Report}} <br>" + "</p>",
          "featureCallback": null,
          "searchKey": "Basin_Su_1",
          "drawable": false
        },
        {
          "file": "rtn_wells",
          "title": "Real Time Well Levels",
          "zoom": 7,
          "background": {
            "color": "#A9A9A9",
            "weight": 2,
            "opacity": 0.65
          },
          "popup": "<p>" +
            "Site ID: <a target='_blank' href='https://groundwaterwatch.usgs.gov/AWLSites.asp?mt=g&S={{SITEID}}&ncd=awl'>{{SITEID}}</a> <br>" +
            "County: {{COUNTY_NM}} {{STATE}} <br>" +
            "Date: {{DATA_DATE}} <br>" +
            "Percentile: {{PERCENTILE}} <br>" +
            "Water level: {{DATA_VAL}}\" {{VERT_DATUM}} <br>" +
            "Station:  {{SITEID}} <br>" +
            "Station Number: {{STATION_NM}} <br>" + "</p>",

          "featureCallback": null,
          "searchKey": "SITEID",
          "drawable": false
        }
      ];

      vm.flotData = [{
        label: '',
        grow: {
          stepMode: 'linear'
        },
        data: [
          [gd(2012, 1, 1), 7],
          [gd(2012, 1, 2), 6],
          [gd(2012, 1, 3), 4],
          [gd(2012, 1, 4), 8],
          [gd(2012, 1, 5), 9],
          [gd(2012, 1, 6), 7],
          [gd(2012, 1, 7), 5],
          [gd(2012, 1, 8), 4],
          [gd(2012, 1, 9), 7],
          [gd(2012, 1, 10), 8],
          [gd(2012, 1, 11), 9],
          [gd(2012, 1, 12), 6],
          [gd(2012, 1, 13), 4],
          [gd(2012, 1, 14), 5],
          [gd(2012, 1, 15), 11],
          [gd(2012, 1, 16), 8],
          [gd(2012, 1, 17), 8],
          [gd(2012, 1, 18), 11],
          [gd(2012, 1, 19), 11],
          [gd(2012, 1, 20), 6],
          [gd(2012, 1, 21), 6],
          [gd(2012, 1, 22), 8],
          [gd(2012, 1, 23), 11],
          [gd(2012, 1, 24), 13],
          [gd(2012, 1, 25), 7],
          [gd(2012, 1, 26), 9],
          [gd(2012, 1, 27), 9],
          [gd(2012, 1, 28), 8],
          [gd(2012, 1, 29), 5],
          [gd(2012, 1, 30), 8],
          [gd(2012, 1, 31), 25]
        ],
        yaxis: 2,
        color: '#0094FD',
        lines: {
          lineWidth: 1,
          show: true,
          fill: true,
          fillColor: {
            colors: [{
                opacity: 0.2
              },
              {
                opacity: 0.2
              }
            ]
          }
        }
      }];

      vm.flotOptions = {
        grid: {
          hoverable: true,
          clickable: true,
          tickColor: '#d5d5d5',
          borderWidth: 0,
          color: '#d5d5d5'
        },
        colors: ['#1ab394', '#464f88'],
        tooltip: true,
        xaxis: {
          mode: 'time',
          tickSize: [3, 'day'],
          tickLength: 0,
          axisLabel: 'Date',
          axisLabelUseCanvas: true,
          axisLabelFontSizePixels: 12,
          axisLabelFontFamily: 'Arial',
          axisLabelPadding: 10,
          color: '#d5d5d5'
        },
        yaxes: [{
            position: 'left',
            max: 1070,
            color: '#d5d5d5',
            axisLabelUseCanvas: true,
            axisLabelFontSizePixels: 12,
            axisLabelFontFamily: 'Arial',
            axisLabelPadding: 3
          },
          {
            position: 'right',
            color: '#d5d5d5',
            axisLabelUseCanvas: true,
            axisLabelFontSizePixels: 12,
            axisLabelFontFamily: 'Arial',
            axisLabelPadding: 67
          }
        ],
        legend: {
          noColumns: 1,
          labelBoxBorderColor: '#d5d5d5',
          position: 'nw'
        }
      };

      vm.barOptions = {
        scaleBeginAtZero: true,
        scaleShowGridLines: false,
        scaleGridLineColor: 'rgba(0,0,0,.05)',
        scaleGridLineWidth: 1,
        barShowStroke: true,
        barStrokeWidth: 2,
        barValueSpacing: 5,
        barDatasetSpacing: 1
      };

      vm.barData = {
        labels: ["01", "02", "03", "04", "05", "06", "07"],
        datasets: [{
            label: "My First dataset",
            fillColor: "rgba(220,220,220,0.5)",
            strokeColor: "rgba(220,220,220,0.8)",
            highlightFill: "rgba(220,220,220,0.75)",
            highlightStroke: "rgba(220,220,220,1)",
            data: [65, 59, 80, 81, 56, 55, 40]
          },
          {
            label: "My Second dataset",
            fillColor: "rgba(26,179,148,0.5)",
            strokeColor: "rgba(26,179,148,0.8)",
            highlightFill: "rgba(26,179,148,0.75)",
            highlightStroke: "rgba(26,179,148,1)",
            data: [28, 48, 40, 19, 86, 27, 90]
          }
        ]
      };

      vm.doughnutData = [{
          value: 250,
          color: "#0294FF",
          highlight: "#007BE6",
          label: "Enough"
        },
        {
          value: 100,
          color: "#F7B422",
          highlight: "#DE9B09",
          label: "Insufficient"
        },
        {
          value: 75,
          color: "#E34C4C",
          highlight: "#CA3333",
          label: "Dry"
        }
      ];

      vm.doughnutOptions = {
        segmentShowStroke: true,
        segmentStrokeColor: "#fff",
        segmentStrokeWidth: 2,
        percentageInnerCutout: 45, // This is 0 for Pie charts
        animationSteps: 100,
        animationEasing: "easeOutBounce",
        animateRotate: true,
        animateScale: false
      };

      vm.notices = [{
          name: 'District No. 3',
          basin: 'Modesto',
          basinNumber: 73430,
          manager: 'Cecilia Herrera',
          email: 'mante.kylie@yahoo.com',
          date: '11-06-2017',
          numbers: '63'
        }
      ];

      vm.lineOptions = {
        series: {
            lines: {
                show: true,
                lineWidth: 2,
                fill: true,
                fillColor: {
                    colors: [
                        {
                            opacity: 0.0
                        },
                        {
                            opacity: 0.0
                        }
                    ]
                }
            }
        },
        xaxis: {
            tickDecimals: 0
        },
        colors: ["#1ab394"],
        grid: {
            color: "#999999",
            hoverable: true,
            clickable: true,
            tickColor: "#D4D4D4",
            borderWidth: 0
        },
        legend: {
            show: false
        },
        tooltip: true,
        tooltipOpts: {
            content: "x: %x, y: %y"
        }
      };

      vm.lineData = {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
            {
                label: "Example dataset",
                fillColor: "rgba(220,220,220,0.5)",
                strokeColor: "rgba(220,220,220,1)",
                pointColor: "rgba(220,220,220,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: [65, 59, 80, 81, 56, 55, 40]
            },
            {
                label: "Example dataset",
                fillColor: "rgba(26,179,148,0.5)",
                strokeColor: "rgba(26,179,148,0.7)",
                pointColor: "rgba(26,179,148,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(26,179,148,1)",
                data: [28, 48, 40, 19, 86, 27, 90]
            }
        ]
    };

      vm.notices = gsaservice.getDemoGSA();

      function gd(year, month, day) {
        return new Date(year, month - 1, day).getTime();
      }

      vm.map = vm.maps[0];
      vm.generateMap(vm.map);
    }

})();