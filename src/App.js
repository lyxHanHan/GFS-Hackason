import "./App.css";
import {ENet} from "@grnsft/if-plugins";
import {useCallback, useEffect, useState} from 'react';

const App = (callback, deps)=> {
  const [eNetResult,setENetResult] = useState(0)
  const [resourcesSize,setResourcesSize] = useState(0)

  const  getResourcesSize = useCallback(()=> {
    let resources = performance.getEntries();
    let totalSize = 0;
    resources.forEach(function(resource) {
      if (
        resource.transferSize &&
        resource.transferSize > 0

      ) {
        totalSize += resource.transferSize;
      }
    });
    setResourcesSize(totalSize)
  },[])

  const transferToCarbonEmissions= useCallback(async () => {
    const eNet = ENet({'energy-per-gb': 0.001});
    console.log('resourcesSize====',resourcesSize)

    return await eNet.execute([
      {
        'network/data-in': resourcesSize/(1024 * 1024 * 1024),
        'network/data-out': 5,
        duration: 3600,
        timestamp: '2024-04-02T01:00:00Z',
      },
    ]).then((data)=> {
      const { 'network/energy': energy} = data[0];
      setENetResult(energy)
    })
  }, [resourcesSize]);

  useEffect(() => {
    transferToCarbonEmissions().then(r => null);
    getResourcesSize();
  });

  return (
      <div className="App">
        <div className="carbon">
          <div className="title">Carbon Emissions : {eNetResult} (tCO2)</div>
          <div className="note">energy-per-gb：0.001 kWh/GB</div>
        </div>
      </div>
  );
}

export default App;