// import logo from './logo.svg';
import { Header } from './components/header';
import { CustomizePanel } from './components/CustomizePanel';
import { ElevationChart } from './components/ElevationChart';
import './App.css';
import {useState, useEffect} from 'react';

function App() {

  const [data, setData] = useState([]);
  const [aidStations, setAidStations] = useState([]);

  const [customs, setCustoms] = useState({
    file: '',
    title: '',
    lineColor: '#ff0000ad',
    lineWidth: 3,
    showElevationLines: true,
    showDistanceLines: true,
    fontSize: 14,
    unit: 'standard',
    aidStations: [{distance: 0, size: 1, color: "#000000ad"}]
  });
  
  const [chartIsLoaded, setChartIsLoaded] = useState(false);

  // useEffect(() => {
  //   if(data && data.length > 1000){
  //     setData(data.slice(0, 1000));
  //   }
  // }, [data])


  return (
    <div className="App">
      <Header />
      <div className="flex ">
        <div className="w-3/12  max-w-md ">
          <CustomizePanel onUpload={setData} customs={customs} setCustoms={setCustoms} updateAidStations={setAidStations} />
        </div>
        <main className="w-9/12">
          {
            chartIsLoaded && 
            <div className="flex justify-end px-8">
              <button className="save-button whitespace-nowrap inline-flex rounded-md bg-blue-500 my-5 py-2 px-10 text-base font-semibold uppercase text-white hover:bg-opacity-90">Save</button>
          </div>
          }

          <ElevationChart 
            elevationData={data} 
            onChartLoad={setChartIsLoaded} 
            aidStations={aidStations}
            customs={customs} />

        </main>
      </div>
    </div>
  );
}

export default App;
