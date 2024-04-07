// chrome.runtime.onInstalled.addListener(() => {
//   setInterval(() => {
//     let res = getResourcesSize();
//     console.log('res', res);
//   }, 1000);

//   const getResourcesSize = () => {
//     let totalSize = 0;
//     let resources = performance.getEntries();
//     resources.forEach(function (resource) {
//       if (resource.transferSize && resource.transferSize > 0) {
//         totalSize += resource.transferSize;
//       }
//     });
//     return totalSize;
//   };
// });

chrome.storage = chrome.storage.local;

let totalSize = 0;

function updateStorage() {
  console.log('---set---');
  totalSize += 1000;
  let resources = performance.getEntries();
  resources.forEach(function (resource) {
    if (resource.transferSize && resource.transferSize > 0) {
      totalSize += resource.transferSize;
    }
  });
  chrome.storage.set({ value: totalSize }, () => {
    console.log('Value updated:', totalSize);
  });
}
setInterval(updateStorage, 3000);
