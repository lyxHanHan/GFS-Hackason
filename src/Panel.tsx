import React, { ReactElement, useState, useEffect,useCallback } from 'react';
import './index.css';
import { ENet } from "@grnsft/if-plugins";


export default function Panel(): ReactElement {
  const [number, setNumber] = useState(0);
  const [eNetResult, setENetResult] = useState(0);

  setInterval(() => {
    console.log('run');
    let totalSize = 0;
    let resources = performance.getEntries();
    resources.forEach(function (resource) {
    if (resource.transferSize && resource.transferSize > 0) {
      totalSize += resource.transferSize;
    }})
    setNumber(prev => prev + totalSize);
  }, 10000)

  useEffect(() =>{
    transferToCarbonEmissions();
  }, [number]);

  const transferToCarbonEmissions = async () => {
    const eNet = ENet({ "energy-per-gb": 0.001 });
    return await eNet
      .execute([
        {
          "network/data-in": number / (1024 * 1024 * 1024),
          "network/data-out": 0,
          duration: 3600,
          timestamp: "2024-04-02T01:00:00Z",
        },
      ])
      .then((data) => {
        const { "network/energy": energy } = data[0];
        setENetResult(energy);
      });
  };

  return (
    <div className="app">
     <div className="carbon">
        <div className="title">Carbon Emissions : {eNetResult} (tCO2)</div>
        <div className="note">energy-per-gb：0.001 kWh/GB</div>
      </div>
    </div>
  );
}
