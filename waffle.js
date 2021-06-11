let linexScale, lineyScale
let scale
let electionFilter, eduFilter, raceFilter
let filterData

let line_m = {top: 40, left: 100, right: 100, bottom: 40}
let line_w = 1000 - line_m.left - line_m.right
let line_h = 1000 - line_m.top - line_m.bottom
const chartRadius = line_h / 4 - 40;

const radial_color = d3.scaleOrdinal(d3.schemeAccent);

const PI = Math.PI,
  arcMinRadius = 10,
  arcPadding = 10,
  labelPadding = -5,
  numTicks = 10;


function createlineScales() {
    linexScale = d3.scaleBand().domain(['2000 Election', '2004 Election', '2008 Election', '2012 Election', '2016 Election', '2020 Election'])
        .range([line_m.left, line_m.left + line_w - 150])
        .padding(0.5)
    lineyScale = d3.scaleLinear().domain([50, 75]).range([(line_m.top + line_h)/3, line_m.top/2])
}

// setup age data
var age_turnout = d3.csv('data/age_turnout.csv', function(d) {
    return {
        Year: d.Year,
        Age18_29: +d.Age18_29,
        Age30_44: +d.Age30_44,
        Age45_59: +d.Age45_59,
        Age60_Over: +d.Age60_Over,
        Total: +d.Total,
        WinParty: d.WinParty
    }
});

age_turnout.then(function(data) {
    age = data
    console.log(age)
    createlineScales()
    drawInitialLine(age)
})

function drawInitialLine(data) {
    let svg = d3.select("body")
            .select('#line_chart')
            .attr('width', bar_w)
            .attr('height', bar_h - 530);

    let linexAxis = d3.axisBottom(linexScale);
    let lineyAxis = d3.axisLeft(lineyScale);

    // x-axis
    svg.append('g')
    .call(linexAxis)
        .attr('class', 'scatter-x')
        .attr('opacity', 1)
        .attr('transform', `translate(0, ${(height + bar_m.top)/2})`)

    // add y-axis
    svg.append('g')
        .call(lineyAxis)
        .attr('class', 'scatter-y')
        .attr('opacity', 1)
        .attr('transform', `translate(${bar_m.left}, 0)`)

    // add y-axis label
    svg.append("text")
        .attr("class", "label")
        .transition().duration(100)
        .text("Total Turnout (%)")
        .attr('x', -230)
        .attr('y', 70)
        .attr('transform', 'rotate(-90)')


    // Add the line
    svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "black")
      .attr("stroke-line_w", 1.5)
      .attr("d", d3.line()
        .x(function(d) { return linexScale(d.Year) + 25})
        .y(function(d) { return lineyScale(d.Total) })
        )
    
    svg.selectAll(".dot")
    .data(data)
  .enter().append("circle") // Uses the enter().append() method
    .attr("class", "dot") // Assign a class for styling
    .attr("cx", function(d) { return linexScale(d.Year) + 25})
    .attr("cy", function(d) { return lineyScale(d.Total) })
    .attr("r", 5)
    .attr("fill", function(d) {
        if (d.WinParty == "Republican") {
            return "red"
        } else {
            return "blue"
        }
    }).on("mouseover", mouseOver)
    .on("mouseout", mouseOut)
    .on('click', click)

    function mouseOver(d, i){

        console.log('hi')
        d3.select(this)
        .transition('mouseover').duration(100)
        .attr('opacity', 1)
        .attr('stroke-line_w', 1)
        .attr('stroke', 'black')
        .attr('r', 10)

        d3.select('#tooltip')
        .style('left', (d3.event.pageX + 10)+ 'px')
        .style('top', (d3.event.pageY - 25) + 'px')
        .style('display', 'inline-block')
        .html(`<strong>Election:</strong> ${d.Year} 
            <br> <strong>Total Turnout:</strong> ${d.Total}%
            <br> <strong>Click to find out more below!</strong>`)
            
        }

        function mouseOut(d, i){
        d3.select('#tooltip')
        .style('display', 'none')
        .transition().duration(100)

        d3.select(this).transition(100)
            .attr('r', 5)
        }
    
    function click(d, i) {
        // update data
        var selection = d.Year;
        console.log(selection)

        if (selection == "2000 Election") {
            d3.select('#radial_chart').selectAll('g').remove()
            electionFilter = age_rad.filter(function(d) { return d.Election == "Election2000"})
            eduFilter = edu_rad.filter(function(d) { return d.Election == "Election2000"})
            raceFilter = race_rad.filter(function(d) { return d.Election == "Election2000"})
            drawRadial(electionFilter)
        }
        if (selection == "2004 Election") {
            d3.select('#radial_chart').selectAll('g').remove()
            electionFilter = age_rad.filter(function(d) { return d.Election == "Election2004"})
            eduFilter = edu_rad.filter(function(d) { return d.Election == "Election2004"})
            raceFilter = race_rad.filter(function(d) { return d.Election == "Election2004"})
            drawRadial(electionFilter)
        }
        if (selection == "2008 Election") {
            d3.select('#radial_chart').selectAll('g').remove()
            electionFilter = age_rad.filter(function(d) { return d.Election == "Election2008"})
            eduFilter = edu_rad.filter(function(d) { return d.Election == "Election2008"})
            raceFilter = race_rad.filter(function(d) { return d.Election == "Election2008"})
            drawRadial(electionFilter)
        }
        if (selection == "2012 Election") {
            d3.select('#radial_chart').selectAll('g').remove()
            electionFilter = age_rad.filter(function(d) { return d.Election == "Election2012"})
            eduFilter = edu_rad.filter(function(d) { return d.Election == "Election2012"})
            raceFilter = race_rad.filter(function(d) { return d.Election == "Election2012"})
            drawRadial(electionFilter)
        }
        if (selection == "2016 Election") {
            d3.select('#radial_chart').selectAll('g').remove()
            electionFilter = age_rad.filter(function(d) { return d.Election == "Election2016"})
            eduFilter = edu_rad.filter(function(d) { return d.Election == "Election2016"})
            raceFilter = race_rad.filter(function(d) { return d.Election == "Election2016"})
            drawRadial(electionFilter)
        }
        if (selection == "2020 Election") {
            d3.select('#radial_chart').selectAll('g').remove()
            electionFilter = age_rad.filter(function(d) { return d.Election == "Election2020"})
            eduFilter = edu_rad.filter(function(d) { return d.Election == "Election2020"})
            raceFilter = race_rad.filter(function(d) { return d.Election == "Election2020"})
            drawRadial(electionFilter)
        }
    }

}

// setup age data for radial bar chart
var age_radial = d3.csv('data/age_radial.csv', function(d) {
    return {
        Election: d.Election,
        Group: d.Group,
        Rate: +d.Rate
    }
});

age_radial.then(function(data) {
    age_rad = data
    console.log(age_rad)
    //setTimeout(drawInitialRadial(age_rad), 100)
})

// setup education data for radial bar chart
var edu_radial = d3.csv('data/edu_radial.csv', function(d) {
    return {
        Election: d.Election,
        Group: d.Group,
        Rate: +d.Rate
    }
});

edu_radial.then(function(data) {
    edu_rad = data
    console.log(edu_rad)
})

// setup education data for radial bar chart
var race_radial = d3.csv('data/race_radial.csv', function(d) {
    return {
        Election: d.Election,
        Group: d.Group,
        Rate: +d.Rate
    }
});

race_radial.then(function(data) {
    race_rad = data
    console.log(race_rad)
})

function drawRadial(data) {
    let line_w1 = 1200
    let line_h1 = 400
    
    let svg = d3.select('body').select('#radial_chart')
        .attr('line_w', line_w1)
        .attr('line_h', line_h1)
        .append('g')
        .attr('transform', 'translate(' + line_w1 / 2 + ',' + line_h1 / 2 + ')');
    

    let scale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.Rate) * 1.1])
        .range([0, 2 * PI]);

        let ticks = scale.ticks(numTicks).slice(0, -1);
        let keys = data.map((d, i) => d.AgeGroup);
        //number of arcs
        const numArcs = keys.length;
        const arcWidth = (chartRadius - arcMinRadius - numArcs * arcPadding) / numArcs;
        
        let arc = d3.arc()
        .innerRadius((d, i) => getInnerRadius(i))
        .outerRadius((d, i) => getOuterRadius(i))
        .startAngle(0)
        .endAngle((d, i) => scale(d))

        
        let radialAxis = svg.append('g')
        .attr('class', 'r axis')
        .selectAll('g')
            .data(data)
            .enter().append('g');

            radialAxis.append('circle')
            .attr('r', (d, i) => getOuterRadius(i) + arcPadding);

            radialAxis.append('text')
            .attr('x', labelPadding)
            .attr('y', (d, i) => -getOuterRadius(i) + arcPadding)
            .text(d => d.Group)
            .style('font-size', '12px');

            let axialAxis = svg.append('g')
            .attr('class', 'a axis')
            .selectAll('g')
                .data(ticks)
                .enter().append('g')
                .attr('transform', d => 'rotate(' + (rad2deg(scale(d)) - 90) + ')');

            axialAxis.append('line')
            .attr('x2', chartRadius);

            axialAxis.append('text')
            .attr('x', chartRadius + 10)
            .style('text-anchor', d => (scale(d) >= PI && scale(d) < 2 * PI ? 'end' : null))
            .attr('transform', d => 'rotate(' + (90 - rad2deg(scale(d))) + ',' + (chartRadius + 10) + ',0)')
            .text(d => d);

            //data arcs
            let arcs = svg.append('g')
            .attr('class', 'data')
            .selectAll('path')
                .data(data)
                .enter().append('path')
                .attr('class', 'arc')
                .style('fill', (d, i) => radial_color(i))

            arcs.transition()
            .delay((d, i) => i * 200)
            .duration(1000)
            .attrTween('d', arcTween);

            function arcTween(d, i) {
                let interpolate = d3.interpolate(0, d.Rate);
                return t => arc(interpolate(t), i);
            }
            
            function rad2deg(angle) {
            return angle * 180 / PI;
            }

            function getInnerRadius(index) {
            return arcMinRadius + (numArcs - (index + 1)) * (arcWidth + arcPadding);
            }

            function getOuterRadius(index) {
            return getInnerRadius(index) + arcWidth;
            }
}

// update radial bar chart on changing the group
function updateRadial(selectGroup) {
    let line_w1 = 1200
    let line_h1 = 400
    
    if (selectGroup == 'Age') {
        filterData = electionFilter
    }

    if (selectGroup == 'Education') {
        filterData = eduFilter
    }

    if (selectGroup == 'Ethnicity') {
        filterData = raceFilter
    }

    d3.select('#radial_chart').selectAll('g').remove()

    let svg = d3.select('body').select('#radial_chart')
        .attr('line_w', line_w1)
        .attr('line_h', line_h1)
        .append('g')
        .attr('transform', 'translate(' + line_w1 / 2 + ',' + line_h1 / 2 + ')');
    

    let scale = d3.scaleLinear()
        .domain([0, d3.max(filterData, d => d.Rate) * 1.1])
        .range([0, 2 * PI]);

        let ticks = scale.ticks(numTicks).slice(0, -1);
        let keys = filterData.map((d, i) => d.Group);
        //number of arcs
        const numArcs = keys.length;
        const arcWidth = (chartRadius - arcMinRadius - numArcs * arcPadding) / numArcs;
        
        let arc = d3.arc()
        .innerRadius((d, i) => getInnerRadius(i))
        .outerRadius((d, i) => getOuterRadius(i))
        .startAngle(0)
        .endAngle((d, i) => scale(d))

        
        let radialAxis = svg.append('g')
        .attr('class', 'r axis')
        .selectAll('g')
            .data(filterData)
            .enter().append('g');

            radialAxis.append('circle')
            .attr('r', (d, i) => getOuterRadius(i) + arcPadding);

            radialAxis.append('text')
            .attr('x', labelPadding)
            .attr('y', (d, i) => -getOuterRadius(i) + arcPadding)
            .text(d => d.Group)
            .style('font-size', '12px');

            let axialAxis = svg.append('g')
            .attr('class', 'a axis')
            .selectAll('g')
                .data(ticks)
                .enter().append('g')
                .attr('transform', d => 'rotate(' + (rad2deg(scale(d)) - 90) + ')');

            axialAxis.append('line')
            .attr('x2', chartRadius);

            axialAxis.append('text')
            .attr('x', chartRadius + 10)
            .style('text-anchor', d => (scale(d) >= PI && scale(d) < 2 * PI ? 'end' : null))
            .attr('transform', d => 'rotate(' + (90 - rad2deg(scale(d))) + ',' + (chartRadius + 10) + ',0)')
            .text(d => d);

            //data arcs
            let arcs = svg.append('g')
            .attr('class', 'data')
            .selectAll('path')
                .data(filterData)
                .enter().append('path')
                .attr('class', 'arc')
                .style('fill', (d, i) => radial_color(i))

            arcs.transition()
            .delay((d, i) => i * 200)
            .duration(1000)
            .attrTween('d', arcTween);

            function arcTween(d, i) {
                let interpolate = d3.interpolate(0, d.Rate);
                return t => arc(interpolate(t), i);
            }
            
            function rad2deg(angle) {
            return angle * 180 / PI;
            }

            function getInnerRadius(index) {
            return arcMinRadius + (numArcs - (index + 1)) * (arcWidth + arcPadding);
            }

            function getOuterRadius(index) {
            return getInnerRadius(index) + arcWidth;
            }
}