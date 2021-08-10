import React, {useEffect, useState} from 'react';
import {processData } from '../utilities/gpxparser'
import { CirclePicker  } from 'react-color';
import { AidStations } from './AidStations';



export const CustomizePanel = ({onUpload, customs, setCustoms}) => {

    const [data, setData] = useState(null);
    const [title, setTitle] = useState("");
    const [lineWidth, setLineWidth] = useState(3);
    const [lineColor, setLineColor] = useState(customs.lineColor || '#9c27b0');
    const [showElevationLines, setShowElevationLines] = useState(true);
    const [showDistanceLines, setShowDistanceLines] = useState(true);
    const [state, setState] = useState(customs);

    const [aidStations, setAidStations] = useState(customs.aidStations);

    // useEffect(() => {
    //     console.log(aidStations);
    // }, [aidStations]);

    useEffect(() => {

        setData('null');

    }, [data]);

    // useEffect(() => {
    //     setState({...state, lineColor, lineWidth, title, showElevationLines, showDistanceLines});
    // }, [lineColor, lineWidth, title]);

    useEffect(() => {
        setCustoms(state);
    }, [state])


    // function processData(gpXml) {

    //     const xmlString = (new DOMParser()).parseFromString(gpXml, "text/xml")
  
    //     const gpxData = toGeoJSON.gpx(xmlString);

    //     const parsedData = gpxData.features[0].geometry.coordinates.map((point, i, arr) => ({ index: i, elevation: point[2], distance: (i == 0 ? 0 : distance({ pt1: { lat: arr[i][0], lon: arr[i][1] }, pt2: { lat: arr[i - 1][0], lon: arr[i - 1][1] } })) }));
  
    //     parsedData.forEach((point, i, arr) => point.distance = i == 0 ? 0 : point.distance + arr[i - 1].distance)
  
    //     parsedData.forEach((point, i, arr) => point.distance = parseFloat(point.distance.toFixed(3)))

    //     setData(parsedData);
    //   }
  
  
  
      function loadData(e) {
        const files = e.currentTarget.files[0];

        const reader = new FileReader();
        reader.addEventListener('load', (event) => {
          onUpload(processData(event.target.result));
        });
        reader.readAsText(files);
  
      }

    return (
        <div className="w-11/12 px-2 shadow-xl h-full">
            <h2 className="text-3xl">Customize</h2>

            <div className="customize-field my-4">
                <p className="text-xl  mb-2">Upload File</p>
                <input name="gps-file"
                    onChange={loadData}
                    className="focus:border-light-blue-500 focus:ring-1 focus:ring-light-blue-500 focus:outline-none w-full text-sm text-black placeholder-gray-500 border border-gray-200 rounded-md py-2 pl-4"
                    type="file" placeholder="race.gpx" accept=".gpx, .kml" />
            </div>

            <div className="customize-field my-4">
                <p className="text-xl  mb-2">Title</p>
                <input name="chart-title"
                    className="focus:border-light-blue-500 focus:ring-1 focus:ring-light-blue-500 focus:outline-none w-full text-sm text-black placeholder-gray-500 border border-gray-200 rounded-md py-2 pl-4"
                    type="text"
                    placeholder="Crush It!"
                    onKeyUp={e => setState({...state, title: e.currentTarget.value})} />
            </div>

            <div className="customize-field my-4">
                <p className="text-xl  mb-2">Line Color</p>
                <CirclePicker onChange={ e => setState({ ...state, lineColor: e.hex }) }   />
                {/* <input type="color"
                    name="line-color" 
                    className="w-4/12 ml-2 h-10" 
                    value={lineColor} 
                    onChange={e => setState({...state, lineColor: e.currentTarget.value})} /> */}
            </div>

            <div className="customize-field my-4">
                <p className="text-xl  mb-2">Line Width</p>
                <input name="line-width"
                    className="focus:border-light-blue-500 focus:ring-1 focus:ring-light-blue-500 focus:outline-none w-full text-sm text-black placeholder-gray-500 border border-gray-200 rounded-md py-2 pl-4"
                    type="number"
                    placeholder="3" 
                    onChange={e => setState({...state, lineWidth: e.currentTarget.value})} />
            </div>


            <div className="customize-field my-4 ">
                <p className="text-xl mb-2">Show Elevation Axis</p>
                <input type="checkbox" name="show-elevation-axis" value="yes" className="opacity-0 absolute h-8 w-8" checked={state.showElevationLines} onChange={e =>setState({...state, showElevationLines: e.target.checked})} />
                <div className="bg-white border-2 rounded-md border-blue-400 w-8 h-8 flex flex-shrink-0 justify-center items-center mr-2 focus-within:border-blue-500">
                    <svg className="fill-current hidden w-3 h-3 text-blue-600 pointer-events-none" version="1.1" viewBox="0 0 17 12"
                        xmlns="http://www.w3.org/2000/svg">
                        <g fill="none" fillRule="evenodd">
                            <g transform="translate(-9 -11)" fill="#1F73F1" fillRule="nonzero">
                                <path
                                    d="m25.576 11.414c0.56558 0.55188 0.56558 1.4439 0 1.9961l-9.404 9.176c-0.28213 0.27529-0.65247 0.41385-1.0228 0.41385-0.37034 0-0.74068-0.13855-1.0228-0.41385l-4.7019-4.588c-0.56584-0.55188-0.56584-1.4442 0-1.9961 0.56558-0.55214 1.4798-0.55214 2.0456 0l3.679 3.5899 8.3812-8.1779c0.56558-0.55214 1.4798-0.55214 2.0456 0z" />
                            </g>
                        </g>
                    </svg>
                </div>

                <div className="customize-field my-4 ">
                    <p className="text-xl mb-2">Show Distance Axis</p>
                    <input type="checkbox" name="show-distance-axis" value="yes" className="opacity-0 absolute h-8 w-8" checked={state.showDistanceLines} onChange={e =>setState({...state, showDistanceLines: e.target.checked})} />
                    <div
                        className="bg-white border-2 rounded-md border-blue-400 w-8 h-8 flex flex-shrink-0 justify-center items-center mr-2 focus-within:border-blue-500">
                        <svg className="fill-current hidden w-3 h-3 text-blue-600 pointer-events-none" version="1.1"
                            viewBox="0 0 17 12" xmlns="http://www.w3.org/2000/svg">
                            <g fill="none" fillRule="evenodd">
                                <g transform="translate(-9 -11)" fill="#1F73F1" fillRule="nonzero">
                                    <path
                                        d="m25.576 11.414c0.56558 0.55188 0.56558 1.4439 0 1.9961l-9.404 9.176c-0.28213 0.27529-0.65247 0.41385-1.0228 0.41385-0.37034 0-0.74068-0.13855-1.0228-0.41385l-4.7019-4.588c-0.56584-0.55188-0.56584-1.4442 0-1.9961 0.56558-0.55214 1.4798-0.55214 2.0456 0l3.679 3.5899 8.3812-8.1779c0.56558-0.55214 1.4798-0.55214 2.0456 0z" />
                                </g>
                            </g>
                        </svg>
                    </div>

                    <div className="customize-field my-4">
                        <p className="text-xl  mb-2">Font Size</p>
                        <input
                            className="focus:border-light-blue-500 focus:ring-1 focus:ring-light-blue-500 focus:outline-none w-full text-sm text-black placeholder-gray-500 border border-gray-200 rounded-md py-2 pl-4"
                            type="Number" />
                    </div>

                    <div className="customize-field my-4 ">
                        <p className="text-xl mb-2">Units</p>
                        <div className="flex justify-around flex-col pl-8">
                            <div className="flex flex-row items-baseline">
                                <input id="unit-standard" className="" type="radio" name="unit" value="standard" checked onChange={() => {}} />
                                <label htmlFor="unit-standard" className="pl-2 mb-1 text-lg">Standard</label>
                            </div>
                            <div className="flex flex-row items-baseline">
                                <input id="unit-metric" className="" type="radio" name="unit" value="metric" checked onChange={() => {}} />
                                <label htmlFor="unit-metric" className="pl-2 mb-1 text-lg">Metric</label>
                            </div>
                        </div>
                    </div>

                    <div className="customize-field my-4">
                        <AidStations aidStations={aidStations} updateStations={setAidStations} />
                    </div> 
                </div>

            </div>
        </div>
    )
}