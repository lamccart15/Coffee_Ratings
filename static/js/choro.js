// width and height of map
var width = 960;
var height = 600;

// coloring
var lowColor = '#ded4ce'
var highColor = '#5A270B'


// d3 projection
let projection = d3.geoNaturalEarth1()
    .scale(180) 
    .center([0,20])
	.translate([width / 2, height / 2]); // translate to center of screen

// define path generator
let path = d3.geoPath() // path generator that will convert GeoJSON to SVG paths
	.projection(projection); // tell path generator to use albersUsa projection


// create SVG element and append map to the SVG
let svg = d3.select("#choro-wrapper")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

// load in data
d3.csv("https://raw.githubusercontent.com/lamccart15/Coffee_Ratings/main/static/data/country_coffee_counts.csv", function (data) {
    let dataArray = [];
    dataArray.push(parseFloat(data.n))

    let valRange = [0, 250]
    let colRange = [lowColor, highColor]
    let ramp = d3.scaleLinear().domain(valRange).range(colRange)

    // load GeoJSON data and merge with wage data
    var json = d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson", function (json) {

        // loop through each country data value in the .csv file
        for (var i = 0; i < data.length; i++) {

            // grab Country Name
            let dataCountry = data[i].country_of_origin;

            // grab data value 
            let dataValue = data[i].n

            // find the corresponding country inside the GeoJSON
            for (var j = 0; j < json.features.length; j++) {
                let jsonCountry = json.features[j].properties.name;

                if (dataCountry == jsonCountry) {
                    // copy the data value into the JSON
                    json.features[j].properties.value = dataValue
                    // stop looking through the JSON
                    break;
                }
            }
        }

        //create tooltip
        let toolTip = d3.select("#choro-wrapper").append("div")
            .attr("class", "tooltip")
            .style("opacity", 1)
            .style("background-color", "#603824")
            .style("color", "#fff")
            .style("border", "solid")
            .style("border-radius", "5px")
            .style("padding", "5px")
            .style("font-family", "sans-serif")
            .style("font-size", "45px")
            .style("text-align", "center")
            .style("width", "300px")
        
        // Three function that change the tooltip when user hover / move / leave a cell
        var mouseover = function(d) {
            toolTip.style("opacity", 1)
        }
        var mousemove = function(d, i){
            toolTip
            .html(`${json.features[i].properties.name}<br>${json.features[i].properties.value}`)
            .style("left", 80 + "px")
            .style("top", 80 + "px")
        }
        var mouseleave = function(d) {
            toolTip.style("opacity", 0)
        }

        // bind the data to the SVG and create one path per GeoJSON feature
        dataGroup = svg.selectAll("path")
            .data(json.features)
            .enter()
            .append("path")
            .attr("d", path)
            .style("stroke", "#fff")
            .style("stroke-width", "1")
            .style("fill", function (d) { 
                var value = d.properties.value

                if (value){
                    return ramp(d.properties.value)
                } else {
                    return "#dedede"
                }
            })
            .on("mouseover", mouseover)
            .on("mousemove", mousemove)
            .on("mouseleave", mouseleave);
        
    });
});

