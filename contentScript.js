let keyVals = {
}
chrome.storage.sync.get(['keyVals'], function(result) {
  keyVals = result.keyVals || {};
});
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {

    if (message.action === 'getHTML') {
      const htmlContent = document.documentElement.outerHTML;
      sendResponse({ htmlContent: htmlContent });
    }
    if (message.action === 'getHTMLWithClass') {
        const className = message.className;
        const elements = document.querySelectorAll(`.${className}`);
        const elementsHTML = Array.from(elements).map(el => el.outerHTML);
        sendResponse({ elementsHTML: elementsHTML });
      }
    
    if (message.action === 'updateFields') {
      const predefinedValue = message.predefinedValue;
      const elements = document.querySelectorAll('.Qr7Oae');
      
      elements.forEach(element => {
        const valueElement = element.querySelector('.M7eMe');
        const inputField = element.querySelector('.whsOnd.zHQkBf');
        const inputPlaceholder = element.querySelector('.ndJi5d.snByac');
        
        if (valueElement && inputField) {
          const elementValue = valueElement.textContent.trim().toUpperCase();
          if (elementValue in  keyVals) {
            inputPlaceholder.innerHTML = ''
            inputField.value = keyVals[elementValue]; // Replace with your predefined value\
            
            // Simulate user input by dispatching input events for each character
            inputField.dispatchEvent(new InputEvent('input', {
              bubbles: true,
              cancelable: true,
              data: ''
            }));
            

          }
        }
      });
      
      sendResponse({ status: 'done' });
    }

    if (message.action === 'addField'){
      keyVals[message.newKey] = message.newVal
      console.log(keyVals)
      chrome.storage.sync.set({ keyVals: keyVals }, function() {
        console.log('Field added:', message.newKey, message.newVal);
      });
      sendResponse({ status: 'done' });
    }

    if (message.action === 'deleteField'){
      if (message.delKey in keyVals){
        delete keyVals[message.delKey]
        console.log(keyVals)
        chrome.storage.sync.set({ keyVals: keyVals }, function() {
          console.log('Field deleted:', message.delKey);
        });
        sendResponse({ status: 'done' });
      }
    }
  });
  