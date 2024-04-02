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
    const eNet = ENet({'energy-per-gb': 0.002});

    console.log('resourcesSize====',resourcesSize)

    return await eNet.execute([
      {
        'network/data-in': resourcesSize,
        'network/data-out': 5,
        duration: 3600,
        timestamp: '2022-01-01T01:00:00Z',
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
        <header className="App-header">
          Carbon Emissions : {eNetResult}
        </header>
      </div>
  );
}

export default App;