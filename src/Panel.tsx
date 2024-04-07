import React, { ReactElement, useState, useEffect,useCallback } from 'react';
import './index.css';
import { ENet } from "@grnsft/if-plugins";


export default function Panel(): ReactElement {
  const [number, setNumber] = useState(0);
  const [eNetResult, setENetResult] = useState(0);

  setInterval(() => {
    const res = window['chrome'].storage?.local.get('value').then((res) => {
      setNumber(Number(res.value));
      console.log('value', res.value);
    }).catch(err => console.log(err));
  },1000);

  useEffect(() =>{
    transferToCarbonEmissions();
  }, [number]);

  const transferToCarbonEmissions = useCallback(async () => {
    const eNet = ENet({ "energy-per-gb": 0.001 });
    console.log('cal');
    
    return await eNet
      .execute([
        {
          "network/data-in": number / (1024 * 1024 * 1024),
          "network/data-out": 5,
          duration: 3600,
          timestamp: "2024-04-02T01:00:00Z",
        },
      ])
      .then((data) => {
        const { "network/energy": energy } = data[0];
        setENetResult(energy);
      });
  }, [number]);

  return (
    <div className="app">
     <div className="carbon">
        <div className="title">Carbon Emissions : {eNetResult} (tCO2)</div>
        <div className="note">energy-per-gb：0.001 kWh/GB</div>
      </div>
    </div>
  );
}
