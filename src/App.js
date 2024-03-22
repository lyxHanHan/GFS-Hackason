import logo from "./logo.svg";
import "./App.css";
import { ENet } from "@grnsft/if-plugins";

function App() {
  const test = async () => {
    const eNet = ENet({'energy-per-gb': 0.002});
    const result = await eNet.execute([
      {
        'network/data-in': 10,
        'network/data-out': 5,
        duration: 3600,
        timestamp: '2022-01-01T01:00:00Z',
      },
    ]);
    console.log("result", result);
  };

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

  // function getResourcesSize() {
  //   let resources = performance.getEntries();

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
  console.log("--------",test())

  return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
            <h1>{()=>test()}</h1>
        </header>
      </div>
  );
}

export default App;