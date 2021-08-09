import * as d3 from 'd3';
import React, { useEffect, useState, useRef } from 'react';

export const ElevationChart = ({ elevationData, onChartLoad, aidStations, customs }) => {

    let x, y, xAxis, yAxis, svg;

    const container = useRef(null);
    const [margin, setMargin] = useState({ top: 20, right: 50, bottom: 30, left: 50 });
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const [line, setLine] = useState(null);
    

    useEffect(() => {
        setWidth(container.current.offsetWidth - margin.left - margin.right);
        setHeight(parseInt('' + (width * 0.3)) - margin.top - margin.bottom);

        x = d3.scaleLinear().range([0, width]);
        y = d3.scaleLinear().range([height, 0]);

    });

    useEffect(() => {

        aidStations.forEach(station => {
            console.log('-------', station)
            return;
            /*
            const rowId = e.target.dataset['asid'];
            const id = 'aid-station-' + (parseInt(rowId) + 1);
        
            if(!d3.select('#'+id).empty()){
              if(e.target.name == 'aid-station-distance'){
                const distance = parseFloat(e.target.value);
                let i = 0;
                let xPos = 0;
                while(xPos <= distance && i < data.length){
                  xPos = data[i].distance;
                  i++;
                }
                
                d3.select('#'+id).attr({
                  cx: x(distance),
                });
                d3.select('#'+id).attr({
                  cy: y(data[i].elevation)
                });
              }else if(e.target.name == 'aid-station-size') {
                const r = Math.max(parseFloat(e.target.value || '0'), 6)
                d3.select('#'+id).attr({
                  r,
                  'stroke-width': r + "px"
                });
              }else if(e.target.name == 'aid-station-color') {
                d3.select('#'+id).attr({
                  fill: e.target.value,
                  stroke: e.target.value + "4d"
                });
              }
            }else{
              svg.append('circle').attr({
                id,
                cy: y(data[0].elevation),
                cx: x(0),
                r: 0,
                fill: '#000000',
                stroke: '#0000004d',
                'stroke-width': "2px"
              })
            }
            */
        });

    }, [aidStations])

    useEffect(() => {
        onChartLoad(false);
        if(!container){
            return;
        }
        if (svg) {
            svg.remove();
            container.current.innerHTML = '';
        }

        svg = d3.select("#elevation-chart").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        xAxis = d3.axisBottom().scale(x).ticks(10);
        yAxis = d3.axisLeft().scale(y).ticks(5);

        if (elevationData && elevationData.length) {
            drawChart()
        }

        return () => {
            svg.remove();
            container.current.innerHTML = '';
        }

    }, [elevationData]);

    useEffect(() => {
      d3.select('.elevation-path')
        .transition()
        .duration(1000)
        .style("stroke", customs.lineColor || 'blue')
        .style('stroke-width', `${customs.lineWidth || 3}px`);

    }, [customs]);

    useEffect(() => line && line.datum(elevationData)
      .style("fill", "none")
      .style("stroke", customs.lineColor || 'blue')
      .style("stroke-width", `${customs.lineWidth || 3}px`), [line]);

    function drawChart() {

        x.domain([0, d3.max(elevationData, pt => pt.distance)]);

        const minDomain = d3.min(elevationData, pt => pt.elevation);
        const maxDomain = d3.max(elevationData, pt => pt.elevation)

        y.domain([
            minDomain - minDomain * 0.05,
            maxDomain * 1.05
        ]);

        svg.append("g")
            .attr("class", "x-axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        svg.append("g")
            .attr("class", "y-axis")
            .call(yAxis);


        svg.append("line")
            .attr(
                {
                    "class": "horizontalGrid-start",
                    "x1": 0,
                    "x2": x(elevationData[elevationData.length - 1].index),
                    "y1": y(elevationData[0].elevation),
                    "y2": y(elevationData[0].elevation),
                    "fill": "none",
                    "shape-rendering": "crispEdges",
                    "stroke": "black",
                    "stroke-width": "1px",
                    "stroke-dasharray": ("3, 3")
                });

        svg.append("line")
            .attr(
                {
                    "class": "horizontalGrid-lowest",
                    "x1": 0,
                    "x2": x(elevationData[elevationData.length - 1].index),
                    "y1": y(d3.min(elevationData, pt => pt.elevation)),
                    "y2": y(d3.min(elevationData, pt => pt.elevation)),
                    "fill": "none",
                    "shape-rendering": "crispEdges",
                    "stroke": "black",
                    "stroke-width": "2px",
                    "stroke-dasharray": ("2, 10")
                });



        const plotLine = d3.line()
            .curve(d3.curveBasis)
            .x(d => x(d.distance))
            .y(d => y(d.elevation));

        
        if(!line) {
          setLine(svg.append("g").append("path")
              .datum(elevationData)
              .attr("d", plotLine)
              .attr('class', 'elevation-path'));
        }
        onChartLoad(true)
    }


    return (
        <div id="elevation-chart" ref={container}></div>
    )
};