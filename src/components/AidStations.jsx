import React, {useEffect, useState, useRef} from 'react'
import { CirclePicker } from 'react-color';

const AidStationRow = ({distance = 0, size = 0, color = "#000000", id, onUpdate}) => {

    const [dist, setDist] = useState(distance);
    const [s, setS] = useState(size);
    const [c, setC] = useState(color);

    const distRef = useRef(null);
    const sizeRef = useRef(null);

    useEffect(() => {
        distRef.current.value = dist;
        sizeRef.current.value = s;
    }, []);


    useEffect(() => {
        if(JSON.stringify({distance: dist, size: s, color: c, id}) !== JSON.stringify({distance, size, color, id})){
            onUpdate({distance: dist, size: s, color: c, id});
        }
    }, [dist, s, c, id, onUpdate])

    return (
        <div className="aid-station-row mb-4 items-center flex flex-row ">
            <div className="flex flex-col">
                <div className="flex flex-row">
                    <input
                        ref={distRef}
                        className="py-2 pl-4 w-6/12 mr-2 focus:border-light-blue-500 focus:ring-1 focus:ring-light-blue-500 focus:outline-none w-full text-sm text-black placeholder-gray-500 border border-gray-200 rounded-md"
                        type="number"
                        placeholder="Distance" 
                        name="aid-station-distance" 
                        value={dist}
                        onChange={(e) => setDist(e.currentTarget.value)}/>
                    <input
                        ref={sizeRef}
                        className="py-2 pl-4 w-2/12 mr-2 focus:border-light-blue-500 focus:ring-1 focus:ring-light-blue-500 focus:outline-none w-full text-sm text-black placeholder-gray-500 border border-gray-200 rounded-md"
                        type="number" 
                        placeholder="Size" 
                        value={s}
                        name="aid-station-size" 
                        onChange={(e) => setS(e.currentTarget.value)} />
                </div>
                <CirclePicker 
                    name="aid-station-color" 
                    circleSpacing={20}
                    colors={["#f44336", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5"]}
                    className="circle-picker w-full mr-2 flex justify-between h-20 items-center" 
                    value={c}
                    onChange={e => setC(e.hex)} />
            </div>
            <button className="w-1/12">X</button>
        </div>);
}

const objEq = (a, b) => JSON.stringify(a) === JSON.stringify(b);

export const AidStations = ({updateStations}) => {

    const  _defaultStation = {distance: 0, size: 1, color: "#000000", id:0}

    const [stationList, setStationsList] = useState([_defaultStation]);

    useEffect(() => {
         updateStations(stationList);
        // console.log(stationList);
    }, [JSON.stringify(stationList)]);

    const addStation = (e) => {
        const newStation = stationList.length ? {...stationList.slice(-1)[0] , id: stationList.length} : _defaultStation;
        setStationsList([...stationList, newStation]);
    }

    const updateStation = (station) => {
        if(!station){return;}
        let st = stationList.find(s => s.id === station.id);
        if(objEq(st, station)){
            return;
        }
        let stIdx = stationList.findIndex(s => s.id ===station.id);
        if(st){
            const updatedStation = {...st, ...station};
            stationList[stIdx] = updatedStation;
            const updatedStationList = [...stationList];
            setStationsList(updatedStationList);
        }
    };

    return (
        <>
            <p className="text-xl mb-2">Include Aid Stations</p>
            <div className="aid-stations-container">
                {
                    stationList.map((station, i) => <AidStationRow station={station} id={i} onUpdate={updateStation} key={i} />)
                }
            </div>
            <button className="add-aid-station whitespace-nowrap inline-flex rounded-md bg-blue-500 py-2 px-3 text-xs font-semibold uppercase text-white hover:bg-opacity-90" onClick={addStation}>+ Aid Station</button>
        </>
    );
}