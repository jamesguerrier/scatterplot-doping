// let url ='https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json'
// let req = new XMLHttpRequest()

// let values = []


// let xScale
// let yScale

// let width = 800
// let height = 600
// let padding = 40

// let svg = d3.select('svg')

// let drawCanvas = () => {
//     svg.attr('width', width)
//     svg.attr('height', height)
// }

// let generateScales = () => {
//     xScale.scaleLinear()
//           .range([padding, width - padding])
// }

// let drawPoints = () => {

// }

// let generateAxes = () => {
//     let xAxis = d3.axisBottom(xScale)

//     svg.append('g')
//        .call(xAxis)
//        .attr('id', 'x-axis')
// }

// req.open('GET', url, true)
// req.onload = () => {
//     values = JSON.parse(req.responseText)
//     console.log(values)
//     drawCanvas()
//     generateScales()
//     drawPoints()
//     generateAxes()
// }

// req.send()


let url ='https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json';
let req = new XMLHttpRequest();

let values = [];

let xScale;
let yScale;

let width = 900;
let height = 600;
let padding = 40;

let svg = d3.select('svg');

// create legend
    let legend = svg.append('g')
                    .attr('id', 'legend')
                    .attr('transform', `translate(${width - 200}, ${height - 150})`);
    
    legend.append('rect')
          .attr('x', 0)
          .attr('y', 0)
          .attr('width', 18)
          .attr('height', 18)
          .style('fill', 'red');
    
    legend.append('text')
          .attr('x', 25)
          .attr('y', 9)
          .attr('dy', '0.35em')
          .text('Riders with doping allegations');
    
    legend.append('rect')
          .attr('x', 0)
          .attr('y', 25)
          .attr('width', 18)
          .attr('height', 18)
          .style('fill', 'green');
    
    legend.append('text')
          .attr('x', 25)
          .attr('y', 34)
          .attr('dy', '0.35em')
          .text('No doping allegations');

let drawCanvas = () => {
    svg.attr('width', width)
       .attr('height', height);
       
    // create legend
    let legend = svg.append('g')
                    .attr('id', 'legend')
                    .attr('transform', `translate(${width - 200}, ${height - 150})`);
    
    legend.append('rect')
          .attr('x', 0)
          .attr('y', 0)
          .attr('width', 18)
          .attr('height', 18)
          .style('fill', 'red');
    
    legend.append('text')
          .attr('x', 25)
          .attr('y', 9)
          .attr('dy', '0.35em')
          .text('Riders with doping allegations');
    
    legend.append('rect')
          .attr('x', 0)
          .attr('y', 25)
          .attr('width', 18)
          .attr('height', 18)
          .style('fill', 'green');
    
    legend.append('text')
          .attr('x', 25)
          .attr('y', 34)
          .attr('dy', '0.35em')
          .text('No doping allegations');
};


let generateScales = () => {
    xScale = d3.scaleLinear()
               .domain([d3.min(values, (d) => d.Year - 1), d3.max(values, (d) => d.Year + 1)])
               .range([padding, width - padding]);
    
    yScale = d3.scaleTime()
               .domain(d3.extent(values, (d) => new Date(d.Seconds * 1000)))
               .range([padding, height - padding]);
};

let drawPoints = () => {
    // create circles for each data point
    svg.selectAll('circle')
       .data(values)
       .enter()
       .append('circle')
       .attr('cx', d => xScale(d.Year))
       .attr('cy', d => yScale(new Date(d.Seconds * 1000)))
       .attr('r', 5)
       .attr('fill', d => d.Doping ? 'red' : 'green')
       .attr('class', 'dot')
       .attr('data-xvalue', d => d.Year)
       .attr('data-yvalue', d => new Date(d.Seconds * 1000).toISOString())
       .on('mouseover', (event, d) => {
            // show tooltip and update position
            let tooltip = d3.select('#tooltip');
            tooltip.style('opacity', 0.9)
                   .attr('data-year', d.Year)
                   .html(`${d.Name}: ${d.Nationality}<br>Year: ${d.Year}, Time: ${d.Time}${d.Doping ? '<br><br>' + d.Doping : ''}`)
                   .style('left', (event.pageX + 10) + 'px')
                   .style('top', (event.pageY - 28) + 'px');
       })
       .on('mousemove', event => {
            // update position of tooltip
            d3.select('#tooltip')
              .style('left', (event.pageX + 10) + 'px')
              .style('top', (event.pageY - 28) + 'px');
       })
       .on('mouseout', () => {
            // hide tooltip
            d3.select('#tooltip')
              .style('opacity', 0);
       });
};

      

let generateAxes = () => {
    let xAxis = d3.axisBottom(xScale)
                  .tickFormat(d3.format('d'));
    
    let yAxis = d3.axisLeft(yScale)
                  .tickFormat(d3.timeFormat('%M:%S'));
    
    svg.append('g')
       .call(xAxis)
       .attr('id', 'x-axis')
       .attr('transform', `translate(0, ${height - padding})`);
    
    svg.append('g')
       .call(yAxis)
       .attr('id', 'y-axis')
       .attr('transform', `translate(${padding}, 0)`);
};

let tooltip = d3.select('body')
                .append('div')
                .attr('id', 'tooltip')
                .style('opacity', 0);

req.open('GET', url, true);
req.onload = () => {
    values = JSON.parse(req.responseText);
    console.log(values);
    drawCanvas();
    generateScales();
    drawPoints();
    generateAxes();
};
req.send();
