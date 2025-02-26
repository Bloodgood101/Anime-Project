window.onload = function() {
    chrome.storage.local.set({ test: 'Hello, world!' }, () => {
      console.log('Test data saved.');
      chrome.storage.local.get(['test'], (result) => {
        console.log('Test data retrieved:', result.test);
      });
    });
}