let scores, mean
let barxScale, baryScale

let bar_m = {top: 40, left: 100, right: 100, bottom: 40}
let bar_w = 1000 - bar_m.left - bar_m.right
let bar_h = 1000 - bar_m.top - bar_m.bottom

function createbarScales() {
    barxScale = d3.scaleBand().domain(['2000 Election', '2004 Election', '2008 Election', '2012 Election', '2016 Election', '2020 Election'])
        .range([bar_m.left, bar_m.left + width - 520])
        .padding(0.5)
    baryScale = d3.scaleLinear().domain([1.3, 2]).range([bar_m.top + height, bar_m.top])
    //categoryColorScale = d3.scaleOrdinal(categories, colors)
}

// Setup score data
var election_scores = d3.csv('data/avg_win.csv', function(d) {
    return {
        Election: d.Election_Year,
        Year: +d.year,
        Party: d.party_detailed,
        Score: +d.Mean_Score
    }
});

election_scores.then(function(data) {
    scores = data
    //console.log(scores)
    createbarScales()
    initialise()
})

// Setup average data
var election_avg = d3.csv('data/avg_tot.csv', function(d) {
    return {
        Party: d.party_detailed,
        Score: +d.Mean_Score
    }
});

election_avg.then(function(data) {
    mean = data
    //console.log(mean)
    createbarScales()
})

function initialise() {
    let svg = d3.select("body")
            .select('#bar_charts')
            .attr('width', bar_w)
            .attr('height', bar_h - 220);

    let barxAxis = d3.axisBottom(barxScale);
    let baryAxis = d3.axisLeft(baryScale);

    // x-axis
    svg.append('g')
    .call(barxAxis)
        .attr('class', 'scatter-x')
        .attr('opacity', 1)
        .attr('transform', `translate(0, ${height + bar_m.top})`)

    // add x-axis label
    svg.append("text")
        .attr("class", "label")
        .transition().duration(100)
        .text("Election")
        .attr('transform', `translate(415, 675)`)
            
    // add y-axis
    svg.append('g')
        .call(baryAxis)
        .attr('class', 'scatter-y')
        .attr('opacity', 1)
        .attr('transform', `translate(${bar_m.left}, 0)`)

    // add y-axis label
    svg.append("text")
        .attr("class", "label")
        .transition().duration(100)
        .text("Positivity Score")
        .attr('x', -370)
        .attr('y', 60)
        //.attr('transform', `translate(200, 300)`)
        .attr('transform', 'rotate(-90)')

    svg.selectAll("bar")
            .data(scores)
        .enter().append("rect")
            .attr("x", function(d) { return barxScale(d.Election) - 13; })
            .attr("width", 80)
            .attr("y", function(d) { return baryScale(d.Score) + 40; })
            .attr('opacity', 1)
            .attr("height", function(d) { return height - baryScale(d.Score); })
            .style("fill", function(d) {
                if (d.Party == "Republican") {
                    return "red"
                } else {
                    return "blue"
                }
            });
}

function update(data) {
    
    // Update the x-axis
    if (data == scores) {
        let svg = d3.select('body').select('#bar_charts')
        
        svg.selectAll("rect").transition().remove()
        svg.selectAll('g').transition().remove()
        svg.selectAll('text').transition().remove()
        
        barxScale = d3.scaleBand().domain(['2000 Election', '2004 Election', '2008 Election', '2012 Election', '2016 Election', '2020 Election'])
        .range([bar_m.left, bar_m.left + width - 520])
        .padding(0.5)
        baryScale = d3.scaleLinear().domain([1.3, 2]).range([bar_m.top + height, bar_m.top])

        let barxAxis = d3.axisBottom(barxScale);
        let baryAxis = d3.axisLeft(baryScale);

        // x-axis
        svg.append('g')
        .call(barxAxis)
            .attr('class', 'scatter-x')
            .attr('opacity', 1)
            .attr('transform', `translate(0, ${height + bar_m.top})`)

        // add x-axis label
        svg.append("text")
            .attr("class", "label")
            .transition().duration(1000)
            .text("Election")
            .attr('transform', `translate(415, 675)`)
                
        // add y-axis
        svg.append('g')
            .call(baryAxis)
            .attr('class', 'scatter-y')
            .attr('opacity', 1)
            .attr('transform', `translate(${bar_m.left}, 0)`)

        // add y-axis label
        svg.append("text")
            .attr("class", "label")
            .transition().duration(1000)
            .text("Positivity Score")
            .attr('x', -370)
            .attr('y', 60)
            //.attr('transform', `translate(200, 300)`)
            .attr('transform', 'rotate(-90)')

        svg.selectAll("bar")
                .data(data)
            .enter().append("rect")
                .attr("x", function(d) { return barxScale(d.Election) - 13; })
                .attr("width", 80)
                .transition().duration(1000)
                .attr("y", function(d) { return baryScale(d.Score) + 40; })
                .attr('opacity', 1)
                .attr("height", function(d) { return height - baryScale(d.Score); })
                .style("fill", function(d) {
                    if (d.Party == "Republican") {
                        return "red"
                    } else {
                        return "blue"
                    }
                });
        
        d3.select('#avgscore_button').classed('selected_button', false)
        d3.select('#score_button').classed('selected_button', true)
        }
    
    if (data == mean) {
        let svg = d3.select('body').select('#bar_charts')

        svg.selectAll("rect").transition().remove()
        svg.selectAll('g').transition().remove()
        svg.selectAll('text').transition().remove()
        
        avgXScale = d3.scaleBand().domain(['Democrat', 'Republican'])
        .range([bar_m.left, bar_m.left + width - 520])
        .padding(0.5)
        avgYScale = d3.scaleLinear().domain([1.5, 2]).range([bar_m.top + height, bar_m.top])

        let barxAxis = d3.axisBottom(avgXScale);
        let baryAxis = d3.axisLeft(avgYScale);

        // x-axis
        svg.append('g')
        .call(barxAxis)
            .attr('class', 'scatter-x')
            .attr('opacity', 1)
            .attr('transform', `translate(0, ${height + bar_m.top})`)

        // add x-axis label
        svg.append("text")
            .attr("class", "label")
            .transition().duration(1000)
            .text("Party")
            .attr('transform', `translate(420, 670)`)
                
        // add y-axis
        svg.append('g')
            .call(baryAxis)
            .attr('class', 'scatter-y')
            .attr('opacity', 1)
            .attr('transform', `translate(${bar_m.left}, 0)`)

        // add y-axis label
        svg.append("text")
            .attr("class", "label")
            .transition().duration(1000)
            .text("Average Positivity Score")
            .attr('x', -370)
            .attr('y', 60)
            //.attr('transform', `translate(200, 300)`)
            .attr('transform', 'rotate(-90)')
        
        svg.selectAll("bar")
                .data(data)
            .enter().append("rect")
                .attr("x", function(d) { return avgXScale(d.Party) + 16; })
                .attr("width", 100)
                .transition().duration(1000)
                .attr("y", function(d) { return avgYScale(d.Score) + 40; })
                .attr("height", function(d) { return height - avgYScale(d.Score); })
                .style("fill", function(d) {
                    if (d.Party == "Republican") {
                        return "red"
                    } else {
                        return "blue"
                    }
                });
        
        d3.select('#avgscore_button').classed('selected_button', true)
        d3.select('#score_button').classed('selected_button', false)
    }
}