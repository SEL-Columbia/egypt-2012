(function(){
    //var map = L.map('map').setView([26.9, 31.5], 6);
    //wax.tilejson('http://a.tiles.mapbox.com/v3/modilabs.map-p543gvbh.jsonp', function(tilejson) {
    //    map.addLayer(new wax.leaf.connector(tilejson));
    //});
    var percent = function(dataConfig)
    {
        return function(val){
            return val * 100;
        };
    };
    var percent_string = function()
    {
        return function(val){
            return d3.format(",.2f")(val)+"%";
        };
    };
    var config = {
        map: {
            leaflet: {
                key: leafletAPIKey
            },
            view: {
                center: [26.9, 31.5],
                zoom: 6
            },
            geo: {
                url: "egypt.json",
                name_field: "NAME_1",
                id_field: "ID_1",
                topo_object: "egy_adm1"
            }
        },
        data: {
            version: "1.0",
            id_field: "governorate"
        },
        dimensions: {
            polling_irregularities: {
                title: "Polling Irregularities (%)",
                data: {
                    dataSet: "http://bamboo.io/datasets/0e7197bd59a34ec69f0bf1b052285993.csv",
                    method: d3.csv,
                    field: "polling_irregularities",
                    preformat: percent,
                    colorscale: d3.scale.linear().domain([0,20]).range(["#5FBDCE", "#015566"]).interpolate(d3.cie.interpolateLab)
                },
                format:
                {
                    long: percent_string
                }
            },
            ballot_boxes_not_closed_with_hec_seal: {
                title: "Ballot boxes not closed with HEC seal (%)",
                data: {
                    dataSet: "http://bamboo.io/datasets/0e7197bd59a34ec69f0bf1b052285993.csv",
                    method: d3.csv,
                    field: "ballot_boxes_not_closed_with_hec_seal",
                    preformat: percent,
                    colorscale: d3.scale.linear().domain([0,20]).range(["#5FBDCE", "#015566"]).interpolate(d3.cie.interpolateLab)
                },
                format:
                {
                    long: percent_string
                }
            },
            polling_centers_not_have_indelible_ink:
            {
                title: "Polling centers without inedible ink (%)",
                data: {
                    dataSet: "http://bamboo.io/datasets/0e7197bd59a34ec69f0bf1b052285993.csv",
                    method: d3.csv,
                    field: "polling_centers_not_have_indelible_ink",
                    preformat: percent,
                    colorscale: d3.scale.linear().domain([0,20]).range(["#5FBDCE", "#015566"]).interpolate(d3.cie.interpolateLab)
                },
                format:
                {
                    long: percent_string
                }
            },
            ballot_boxes_not_empty_before_voting:
            {
                title: "Ballot boxes not empty before voting (%)",
                data: {
                    dataSet: "http://bamboo.io/datasets/0e7197bd59a34ec69f0bf1b052285993.csv",
                    method: d3.csv,
                    field: "ballot_boxes_not_empty_before_voting",
                    preformat: percent,
                    colorscale: d3.scale.linear().domain([0,20]).range(["#5FBDCE", "#015566"]).interpolate(d3.cie.interpolateLab)
                },
                format:
                {
                    long: percent_string
                }
            },
            not_enough_ballots:
            {
                title: "Didn't have enough ballots (%)",
                data: {
                    dataSet: "http://bamboo.io/datasets/0e7197bd59a34ec69f0bf1b052285993.csv",
                    method: d3.csv,
                    field: "not_enough_ballots",
                    preformat: percent,
                    colorscale: d3.scale.linear().domain([0,20]).range(["#5FBDCE", "#015566"]).interpolate(d3.cie.interpolateLab)
                },
                format:
                {
                    long: percent_string
                }
            },
            ballots_not_counted:
            {
                title: "Ballots not counted (%)",
                data: {
                    dataSet: "http://bamboo.io/datasets/0e7197bd59a34ec69f0bf1b052285993.csv",
                    method: d3.csv,
                    field: "ballots_not_counted",
                    preformat: percent,
                    colorscale: d3.scale.linear().domain([0,20]).range(["#5FBDCE", "#015566"]).interpolate(d3.cie.interpolateLab)
                },
                format:
                {
                    long: percent_string
                }
            },
            polling_center_not_handycap_accessible:
            {
                title: "Polling centers not handy cap accessible (%)",
                data: {
                    dataSet: "http://bamboo.io/datasets/0e7197bd59a34ec69f0bf1b052285993.csv",
                    method: d3.csv,
                    field: "polling_center_not_handycap_accessible",
                    preformat: percent,
                    colorscale: d3.scale.linear().domain([0,20]).range(["#5FBDCE", "#015566"]).interpolate(d3.cie.interpolateLab)
                },
                format:
                {
                    long: percent_string
                }
            }
        },
        defaults: {
            order: ["polling_irregularities", "ballot_boxes_not_closed_with_hec_seal",
                "polling_centers_not_have_indelible_ink", "ballot_boxes_not_empty_before_voting", "not_enough_ballots",
                "ballots_not_counted"],
            active: "polling_irregularities",
            opacity: 1.0
        }
    };

    var map = new crosslet.MapView($("#map"),config);
}).call(this);