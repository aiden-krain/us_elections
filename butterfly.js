let finance
let lbutxscale, rbutxscale, lbutxscale2
let lbutyscale, rbutyscale
let dem_finance, rep_finance
let butCategoryLegend

let but_m = {top: 40, left: 100, right: 100, bottom: 40}
let but_w = 1000 - but_m.left - but_m.right
let but_h = 800 - but_m.top - but_m.bottom


const butColors = ['gold', 'black']
const butCategories = ['Won', 'Lost']

function createbutScales() {
    rbutyScale = d3.scaleBand().domain(['2000 Election', '2004 Election', '2008 Election', '2012 Election', '2016 Election', '2020 Election'])
        .range([but_m.top + but_h/1.537, but_m.top])
        .padding(0.5)
    lbutyScale = d3.scaleBand().domain(['2020 Election', '2016 Election', '2012 Election', '2008 Election', '2004 Election', '2000 Election'])
        .range([but_m.top, but_m.top + but_h/1.537])
        .padding(0.5)
    lbutxScale = d3.scaleLinear().domain([0, 2000]).range([but_m.left - 50, but_m.left + but_w/3])
    lbutxScale2 = d3.scaleLinear().domain([2000, 0]).range([but_m.left - 50, but_m.left + but_w/3])
    rbutxScale = d3.scaleLinear().domain([0, 2000]).range([but_m.right - but_w/3, but_m.right + 50])
    butCategoryColorScale = d3.scaleOrdinal(butCategories, butColors)
}

function butCreateLegend(x, y) {
    let svg = d3.select('body').select('#butterfly_chart')

    svg.append('g')
        .attr('class', 'butCategoryLegend')
        .transition().delay(40)
        .attr('transform', `translate(${x},${y})`)

    butCategoryLegend = d3.legendColor()
                        .shape('path', d3.symbol().type(d3.symbolSquare).size(100)())
                        .shapePadding(10)
                        .scale(butCategoryColorScale)
    
    d3.select('.butCategoryLegend')
        .call(butCategoryLegend)
}

// setup finance data
var money = d3.csv('data/finance.csv', function(d) {
    return {
        Election: d.Year,
        Candidate: d.Candidate,
        Party: d.Party,
        Raised: +d.Money_Raised,
        Spent: +d.Money_Spent,
        wonElection: d.Won_Election
    }
});

money.then(function(data) {
    finance = data
    console.log(finance)
    createbutScales()
})

function drawButterfly() {
    butCreateLegend(380, 550)

    d3.select('#but_button')
                .classed('selected_button', true)

    let svg = d3.select("body")
            .select('#butterfly_chart')
            .attr('width', but_w)
            .attr('height', but_h);

    let lbutxAxis = d3.axisBottom(lbutxScale2);
    let rbutxAxis = d3.axisBottom(rbutxScale);
    let rbutyAxis = d3.axisLeft(rbutyScale);
    
    // left x-axis
    svg.append('g')
    .call(lbutxAxis)
        .attr('class', 'scatter-x')
        .attr('opacity', 1)
        .transition().duration(1000)
        .attr('transform', `translate(0, ${but_h + but_m.top - 250})`)

    // right x-axis
    svg.append('g')
    .call(rbutxAxis)
        .attr('class', 'scatter-x')
        .attr('opacity', 1)
        .transition().duration(1000)
        .attr('transform', `translate(600, ${but_h + but_m.top - 250})`)

    // add y-axis
    svg.append('g')
        .call(rbutyAxis)
        .attr('class', 'scatter-y')
        .attr('opacity', 1)
        .transition().duration(1000)
        .attr('transform', `translate(445, 0)`)
        .call(g => g.selectAll('.tick line'))
            .attr('stroke-opacity', 0)

    // add x-axis label
    svg.append("text")
        .attr("class", "labeltitle")
        .transition().delay(40)
        .text("Total Amount Spent by Each Party in the Last Six Elections")
        .attr('transform', `translate(120, 45)`)
    
    // add x-axis label
    svg.append("text")
        .attr("class", "label")
        .transition().delay(40)
        .text("Amount Spent (millions of $)")
        .attr('transform', `translate(325, 500)`)
    
    // filter for democrat spending
    dem_finance = finance.filter(function(d) { return d.Party == 'Democrat' })
    
    console.log(dem_finance)
    svg.selectAll("but")
        .data(dem_finance)
        .enter().append("rect")
        .attr("x", 440)
        .attr('y', 580)
        .on('mouseover', mouseOver)
        .on('mouseout', mouseOut)
        .transition().duration(1500)
        .attr("width", function(d) {return rbutxScale(d.Spent) + 155; })
        .attr("y", function(d) { return rbutyScale(d.Election) + 5; })
        .attr('opacity', 1)
        .attr("height", 30)
        .style("fill", 'blue')
        .style('stroke', function(d) {
            if (d.wonElection == 'Yes') {
                return 'gold'
            } else {
                return 'black'
            }
        })
        .style('stroke-width', '2.5')
        
    
    // filter for republican spending
    rep_finance = finance.filter(function(d) { return d.Party == 'Republican' })
    
    console.log(dem_finance)
    svg.selectAll("but")
        .data(rep_finance)
        .enter().append("rect")
        .attr("x", function(d) { return but_w/2 - lbutxScale(d.Spent) + 30; })
        .attr('y', 580)
        .on('mouseover', mouseOver)
        .on('mouseout', mouseOut)
        .transition().duration(1500)
        .attr("width", function(d) { return lbutxScale(d.Spent) - 60; })
        .attr("y", function(d) { return lbutyScale(d.Election) + 5; })
        .attr('opacity', 1)
        .attr("height", 30)
        .style("fill", 'red')
        .style('stroke', function(d) {
            if (d.wonElection == 'Yes') {
                return 'gold'
            } else {
                return 'black'
            }
        })
        .style('stroke-width', '2.5')


    // add mouseover and mouseout functions
    function mouseOver(d, i){

        console.log('hi')
        d3.select(this)
            .transition('mouseover').duration(100)
            .attr('opacity', .4)

        d3.select('#tooltip')
            .style('left', (d3.event.pageX + 10)+ 'px')
            .style('top', (d3.event.pageY - 25) + 'px')
            .style('display', 'inline-block')
            .html(`<strong>Candidate:</strong> ${d.Candidate} 
                <br> <strong>Amount Spent:</strong> $${d.Spent} million
                <br> <strong>Won Election?:</strong> ${d.wonElection}`)
                
    }
    
    function mouseOut(d, i){
        d3.select('#tooltip')
            .style('display', 'none')
            .transition().duration(100)
        
        d3.select(this)
            .transition('mouseover').duration(100)
            .attr('opacity', 1)

            
        }

}