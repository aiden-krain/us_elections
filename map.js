let selection

let width = 1200
let height = 600

//draw US map function
function drawMap(selection){

    let svg = d3.select("body")
                    .select('#us_map')
                    .attr('width', width)
                    .attr('height', height)

    // D3 Projection
    var projection = d3.geoAlbersUsa()
                    .translate([width/2, height/2])    // translate to center of screen
                    .scale([1000]);          // scale things down so see entire US
            
    // Define path generator
    var path = d3.geoPath()               // path generator that will convert GeoJSON to SVG paths
                .projection(projection);  // tell path generator to use albersUsa projection
    

    var map_data = d3.csv('data/presidents_clean.csv');

    map_data.then(function(data) {
        
        updateMap(selection)

        // function to update selected data
        function updateMap(selectedYear) {
            dataSelect = data.filter(function(d) { return d.year==selectedYear });
            //console.log(dataSelect)
            // clear way for the regeneration
            //d3.selectAll("path").remove();

            // create json data variable
            var us_states = d3.json('data/us-states.json');
        
            us_states.then(function(json) {
                for (var i = 0; i < dataSelect.length; i += 2) {
                    
                    // Grab state name
                    var dataState = dataSelect[i].state;
                    
                    // figure out required info
                    var winParty = dataSelect[i].party_detailed;
                    var candidate = dataSelect[i].candidate;
                    var candidateVotes = dataSelect[i].candidatevotes;

                    
                    // Find the corresponding state inside the GeoJSON
                    for (var j = 0; j < json.features.length; j++) {
                        var jsonState = json.features[j].properties.NAME;

                        if (dataState == jsonState) {

                            // copy the data value into the JSON
                            json.features[j].properties.winParty = winParty;
                            json.features[j].properties.candidate = candidate;
                            json.features[j].properties.candidateVotes = candidateVotes;

                            // stop looking through the JSON
                            break;
                        }
                    }
                }
                var updated = json.features
                //console.log(path)
                // initial setup 
                svg.selectAll('map')
                .data(updated)
                .enter()
                .append("path")
                .attr("d", path)
                .attr('opacity', 1)
                .style("stroke", "#fff")
                .style("stroke-width", "1")
                .style("fill", function(d) {
                        if (d.properties.winParty == "DEMOCRAT") {
                            return "blue"
                        } else {
                            return "red"
                        }
                    }).on('mouseover', mouseOver)
                    .on('mouseout', mouseOut)


                function mouseOver(d, i){

                    console.log('hi')
                    d3.select(this)
                        .transition('mouseover').duration(10)
                        .style('stroke', 'black')
                        .style("stroke-width", "3")
        
                    d3.select('#tooltip')
                        .style('left', (d3.event.pageX + 10)+ 'px')
                        .style('top', (d3.event.pageY - 25) + 'px')
                        .style('display', 'inline-block')
                        .html(`<strong>State:</strong> ${d.properties.NAME}
                            <br> <strong>Winning Party:</strong> ${d.properties.winParty}
                            <br> <strong>Winning Candidate:</strong> ${d.properties.candidate} 
                            <br> <strong>Winning Vote Count:</strong> ${d.properties.candidateVotes}`)
                            
                }
                
                function mouseOut(d, i){
                    d3.select('#tooltip')
                        .style('display', 'none')
                        .transition().duration(100)
                    
                    d3.select(this)
                        .transition('mouseout').duration(10)
                        .style('stroke', 'white')
                        .style("stroke-width", "1")
        
                    
                }
            })   
        }
    })
}