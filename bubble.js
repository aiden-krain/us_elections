let svg
let events
let eventCircles, categoryLegend
let bubblexScale, bubbleyScale

let margin = {top: 40, left: 100, right: 100, bottom: 40}
let w = 1000 - margin.left - margin.right
let h = 1000 - margin.top - margin.bottom

const colors = ['#ffcc00', '#ff6666', '#cc0066', '#66cccc', '#f688bb']
const categories = ['Conflict', 'Political', 'Health', 'Science & Technology', 'Economical']


function createbubbleScales() {
    bubblexScale = d3.scaleLinear(d3.extent(events, d => d.Relevance), [margin.left, margin.left + width - 600])
    bubbleyScale = d3.scaleLinear(d3.extent(events, d => d.Score), [margin.top + height, margin.top])
    categoryColorScale = d3.scaleOrdinal(categories, colors)
}


function createLegend(x, y) {
    let svg = d3.select('body').select('#bubble_chart')

    svg.append('g')
        .attr('class', 'categoryLegend')
        .transition().delay(40)
        .attr('transform', `translate(${x},${y})`)

    categoryLegend = d3.legendColor()
                        .shape('path', d3.symbol().type(d3.symbolCircle).size(100)())
                        .shapePadding(10)
                        .scale(categoryColorScale)
    
    d3.select('.categoryLegend')
        .call(categoryLegend)
}

// Setup world events data
var world_events = d3.csv('data/world_events_scored.csv', function(d) {
    return {
        Year: d.Year,
        Event: d.Event,
        Category: d.Category,
        Relevance: +d.Relevance,
        Score: +d.Score
    }
});

world_events.then(function(data) {
    events = data.filter(function(d) { return d.Category == "C" || d.Category == "P" || d.Category == "H" || d.Category == "ST" || d.Category == "E"})
    createbubbleScales()
})

function drawBubble() {
    createLegend(630, 289)
    
    d3.select('#bubble_button')
                .classed('selected_button', true)
    
    let svg = d3.select("body")
                    .select('#bubble_chart')
                    .attr('width', w)
                    .attr('height', h - 220);
    
    //console.log(d3.extent(events, d => d.Relevance))

    let bubblexAxis = d3.axisBottom(bubblexScale);
    let bubbleyAxis = d3.axisLeft(bubbleyScale);

    // x-axis
    svg.append('g')
    .call(bubblexAxis)
        .attr('class', 'scatter-x')
        .attr('opacity', 1)
        .attr('transform', `translate(0, ${height + margin.top})`)
    
    // add x-axis label
    svg.append("text")
        .attr("class", "label")
        .transition().delay(40)
        .text("Relevance to US Elections")
        .attr('transform', `translate(325, 680)`)
            
    // add y-axis
    svg.append('g')
     .call(bubbleyAxis)
     .attr('class', 'scatter-y')
     .attr('opacity', 1)
     .attr('transform', `translate(${margin.left}, 0)`)

    // add y-axis label
    svg.append("text")
        .attr("class", "label")
        .transition().delay(40)
        .text("Positivity Score")
        .attr('x', -370)
        .attr('y', 60)
        //.attr('transform', `translate(200, 300)`)
        .attr('transform', 'rotate(-90)')

    
    // Add a scale for bubble color
    var myColor = d3.scaleOrdinal()
    .domain(["C", "P", "ST", "H", "E"])
    .range(['#ffcc00', '#ff6666', '#cc0066', '#66cccc', '#f688bb']);

    // Add dots
    eventCircles = svg.selectAll("dot")
        .data(events)
        .enter()
        .append("circle")
            .attr("r", 7 )
            .attr("cx", d => bubblexScale(d.Relevance))
            .attr("cy", d => bubbleyScale(d.Score))
            .attr('class', 'bubble')
            .attr('opacity', 1)
            .style("fill", function (d) { return myColor(d.Category); } )
            .style("opacity", "0.7")
            .attr("stroke", "white")
            .style("stroke-width", "2px");

        // add mouseover and mouseout events
        eventCircles.on("mouseover", mouseOver)
                    .on("mouseout", mouseOut)

        function mouseOver(d, i){

            console.log('hi')
            d3.select(this)
                .transition('mouseover').duration(100)
                .attr('opacity', 1)
                .attr('stroke-width', 5)
                .attr('stroke', 'black')

            d3.select('#tooltip')
                .style('left', (d3.event.pageX + 10)+ 'px')
                .style('top', (d3.event.pageY - 25) + 'px')
                .style('display', 'inline-block')
                .html(`<strong>Year:</strong> ${d.Year} 
                    <br> <strong>Event:</strong> ${d.Event}`)
                    
        }
        
        function mouseOut(d, i){
            d3.select('#tooltip')
                .style('display', 'none')
                .transition().duration(100)
            
            eventCircles.transition(100).attr('stroke', 'white')

            
        }
        //console.log(eventCircles)
        // Add simulation
        simulation = d3.forceSimulation(events)

        // Define each tick of simulation
        simulation.on('tick', () => {
            eventCircles
                .attr('cx', d =>  d.x)
                .attr('cy', d => d.y)
        })

        // Stop the simulation until later
        //simulation.stop()

        simulation  
        .force('charge', d3.forceManyBody().strength([0]))
        .force('collision', d3.forceCollide(8))
        .force('x', d3.forceX().x(d => bubblexScale(d.Relevance)))
        .force('y', d3.forceY().y(d => bubbleyScale(d.Score)))
}