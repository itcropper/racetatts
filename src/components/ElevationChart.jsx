import { select, scaleLinear, min, max, axisBottom, axisLeft, line, curveBasis } from 'd3';
import React, { useEffect, useState, useRef, useCallback } from 'react';
import "./ElevationChart.css"

const _transition_ = 800;

export const ElevationChart = ({ elevationData, onChartLoad, aidStations, customs }) => {

  let xAxis, yAxis;

  const container = useRef(null);
  const [margin, setMargin] = useState({ top: 20, right: 50, bottom: 30, left: 50 });
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [path, setPath] = useState(null);
  const [lineColor, setLineColor] = useState(customs.lineColor || "#ff0000ad");
  const [lineWidth, setLineWidth] = useState(customs.lineWidth || 3);
  const [chartTitle, setChartTitle] = useState(customs.title || '');
  const [showElevationLines, setShowElevationLines] = useState(customs.showElevationLines);
  const [showDistanceLines, setShowDistanceLines] = useState(customs.showDistanceLines);
  const [units, setUnits] = useState('km');
  const y = useRef(null);
  const x = useRef(null);

  let svg = useRef(null);


  useEffect(() => {
    if (!x.current) {
      x.current = scaleLinear();
    }
    if (!y.current) {
      y.current = scaleLinear();
    }
    x.current.range([0, width]);
    y.current.range([height, 0]);
  }, [width, height])

  useEffect(() => setHeight(parseInt('' + (width * 0.3)) - margin.top - margin.bottom), [width]);
  useEffect(() => setWidth(container.current.offsetWidth - margin.left - margin.right), []);

  useEffect(() => {
    if (!aidStations || !elevationData) {
      return;
    }
    if (!elevationData.length) {
      return;
    }
    if (!x.current || !y.current) {
      return;
    }
    if (JSON.stringify(x.current.domain()) === JSON.stringify([0, 1]) ||
      JSON.stringify(y.current.domain()) === JSON.stringify([0, 1])) {
      return;
    }

    aidStations.forEach(station => {

      const id = 'aid-station-' + (parseInt(station.id));
      let stationDot = svg.current.select('#' + id);
      let stationLine = svg.current.select('#' + id + '--line');

      if (stationDot.empty()) {
        stationDot = svg.current.append('circle')
          .attr('id', id)

      }
      if(stationLine.empty()){
        stationLine = svg.current.append('line')
          .attr('class', "y-axis")
          .attr('id', id + '--line');
      }

      const distance = parseFloat(station.distance || 0);
      let i = 0;
      let xPos = 0;
      while (xPos <= distance && i < elevationData.length) {
        xPos = elevationData[i].distance[units];
        i++;
      }

      const r = Math.max(parseFloat(station.size || '0'), 3)
      const cy = y.current(elevationData[i].elevation);
      const cx = x.current(distance);

      stationDot.attr('cx', cx)
        .attr('cy', cy)
        .attr('r', r + "px")
        .attr('stroke-width', r + "px")
        .attr('fill', station.color || "#ff0000")
        .attr('stroke', (station.color || "#ff0000") + "22");

      stationLine
        .attr('x1', cx)
        .attr('x2', cx)
        .attr('y1', cy)
        .attr('y2', y.current(0))
        .attr('fill', 'none')
        .attr('stroke', (station.color || "#ff0000") + "55")
        .attr('stroke-width', '2px')
        .attr('stroke-dasharray', "6,10");
    });

  }, [aidStations, elevationData])

  useEffect(() => {
    onChartLoad(elevationData !== null && elevationData.length !== 0);
    if (!container || !x.current || !y.current) {
      return;
    }
    if (svg.current) {
      svg.current.remove();
      container.current.innerHTML = '';
    }

    svg.current = select("#elevation-chart").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    xAxis = axisBottom().scale(x.current).ticks(10);
    yAxis = axisLeft().scale(y.current).ticks(5);

    
    if (elevationData && elevationData.length) {
      drawChart()
    }

    return () => {
      svg.current.remove();
      container.current.innerHTML = '';
    }

  }, [elevationData]);

  useEffect(() => {

    select('.elevation-path')
      .transition()
      .duration(_transition_)
      .style("stroke", customs.lineColor || 'blue')
      .style('stroke-width', `${customs.lineWidth || 3}px`);

  }, [customs]);

  useEffect(() => {
    select('.chart-title')
      .text(chartTitle);
  }, [chartTitle])

  useEffect(() => {

    if (lineColor != customs.lineColor) {
      setLineColor(customs.lineColor);
    }
    if (chartTitle != customs.title) {
      setChartTitle(customs.title);
    }
    if (lineWidth != customs.lineWidth) {
      setLineWidth(customs.lineWidth);
    }
    if (showElevationLines != customs.showElevationLines) {
      setShowElevationLines(customs.showElevationLines);
    }
    if (showDistanceLines != customs.showDistanceLines) {
      setShowDistanceLines(customs.showDistanceLines);
    }
  }, [customs])

  useEffect(() => {
    if (!svg.current) {
      return;
    }
    svg.current.selectAll('.y-axis,.horizontalGrid-start,.horizontalGrid-lowest')
      .transition()
      .duration(_transition_)
      .style('opacity', showElevationLines ? 1 : 0);

  }, [showElevationLines])

  useEffect(() => {
    if (!svg.current) {
      return;
    }
    svg.current.selectAll('.x-axis')
      .transition()
      .duration(_transition_)
      .style('opacity', showDistanceLines ? 1 : 0);

  }, [showDistanceLines])

  useEffect(() => {
    path && path.datum(elevationData)
      .transition()
      .duration(1000)
      .attr('fill', 'none')
      .style("stroke-width", `${customs.lineWidth}px`)
  }, [lineWidth]);

  useEffect(() => {
    path && path.datum(elevationData)
      .transition()
      .duration(_transition_)
      .attr('fill', 'none')
      .style("stroke", customs.lineColor)
  }, [lineColor]);

  function drawChart() {
    x.current.domain([0, max(elevationData, pt => pt.distance[units === 'km' ? 'km' : 'miles'])]);

    const minDomain = min(elevationData, pt => pt.elevation);
    const maxDomain = max(elevationData, pt => pt.elevation)

    y.current.domain([
      minDomain - minDomain * 0.05,
      maxDomain * 1.05
    ]);

    svg.current.append("g")
      .attr("class", "x-axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

    svg.current.append("g")
      .attr("class", "y-axis")
      .call(yAxis);


    svg.current.append("line")
      .attr('class', "horizontalGrid-start")
      .attr('x1', 0)
      .attr('x2', x.current(elevationData[elevationData.length - 1].index))
      .attr('y1', y.current(elevationData[0].elevation))
      .attr('y2', y.current(elevationData[0].elevation))
      .attr('fill', 'none')
      .attr('stroke', 'black')
      .attr('stroke-width', '1px')
      .attr('stroke-dasharray', "3,3");

    svg.current.append("line")
      .attr('class', "horizontalGrid-lowest")
      .attr('x1', 0)
      .attr('x2', x.current(elevationData[elevationData.length - 1].index))
      .attr('y1', y.current(min(elevationData, pt => pt.elevation)))
      .attr('y2', y.current(min(elevationData, pt => pt.elevation)))
      .attr('fill', 'none')
      .attr('stroke', 'black')
      .attr('stroke-width', '2px')
      .attr('stroke-dasharray', "2, 10");

    svg.current.append("text")
      .attr('class', 'chart-title')
      .attr("x", (width / 2))
      //.attr("y", 0 - (margin.top / 2))
      .attr("text-anchor", "middle")
      .style("font-size", "24px")
      .text(chartTitle);



    const plotLine = line()
      .curve(curveBasis)
      .x(d => x.current(d.distance[units === 'km' ? 'km' : 'standard']))
      .y(d => y.current(d.elevation));


    if (!path) {
      setPath(svg.current.append("g").append("path")
        .datum(elevationData)
        .attr("d", plotLine)
        .attr('stroke', 'black')
        .attr('stroke-width', '3px')
        .attr('fill', 'none')
        .attr('class', 'elevation-path'));
    }
    onChartLoad(true)
  }


  return (
    <div id="elevation-chart" ref={container}></div>
  )
};