import "./App.css";
import {ENet} from "@grnsft/if-plugins";
import {useCallback, useEffect, useState} from 'react';

const App = ()=> {

  const [eNetResult,setENetResult] = useState([{}])

  let count = 0;
  const interval = setInterval(() => {
    count++;
    return count
  }, 1000);

  const test = useCallback(async () => {
    const eNet = ENet({'energy-per-gb': 0.002});
    console.log("interval",interval)
    return await eNet.execute([
      {
        'network/data-in': interval,
        'network/data-out': 5,
        duration: interval,
        timestamp: '2022-01-01T01:00:00Z',
      },
    ]).then((data)=>setENetResult(data))
  }, [interval]);

  useEffect(() => {
     test();
  }, [ test]);


  // function getNetworkRequestSize(url) {
  //   return fetch(url)
  //     .then(function (response) {
  //       if (response.ok) {
  //         return response.blob();
  //       }
  //       throw new Error("Network request failed");
  //     })
  //     .then(function (blob) {
  //       return blob.size;
  //     })
  //     .catch(function (error) {
  //       console.log("Error:", error);
  //     });
  // }

  // function bytesToGB(bytes) {
  //   return bytes / (1024 * 1024 * 1024);
  // }

  // // 示例用法
  // var requestUrl = "https://www.baidu.com/";
  // getNetworkRequestSize(requestUrl).then(function (size) {
  //   console.log("Request Size:", size);
  //   var gbSize = bytesToGB(size);
  //   var res = test(gbSize);
  //   console.log(res);
  // });


  //   let totalSize = resourcesSize;

  //   resources.forEach(function(resource) {
  //     if (
  //       // resource.initiatorType !== 'fetch' &&
  //       // resource.initiatorType !== 'beacon' &&
  //       // resource.initiatorType !== 'navigation' &&
  //       // resource.initiatorType !== 'websocket' &&
  //       resource.transferSize &&
  //       resource.transferSize > 0
  //     ) {
  //       totalSize += resource.transferSize;
  //     }
  //   });
  //   const now = new Date();
  //   const item = {
  //     size: totalSize,
  //     expire: now.getTime() + 1000 * 60 * 60 * 60 * 8
  //   };
  //   localStorage.setItem('carbon', JSON.stringify(item));
  // }

  return (
      <div className="App">
        <header className="App-header">
          {eNetResult[0].duration}
        </header>
      </div>
  );
}

export default App;