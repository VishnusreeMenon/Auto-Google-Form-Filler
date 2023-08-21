document.addEventListener('DOMContentLoaded', function() {
    const extractButton = document.getElementById('extractButton');
    const htmlContent = document.getElementById('htmlContent');
    const updateButton = document.getElementById('updateButton');
    const addFieldButton = document.getElementById('addFieldButton');
    const deleteFieldButton = document.getElementById('deleteFieldButton');

    extractButton.addEventListener('click', function() {
        const className = 'Qr7Oae'; // Replace with your class name
        
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
          chrome.tabs.sendMessage(tabs[0].id, { action: 'getHTMLWithClass', className: className }, function(response) {
            if (response) {
                console.log(response)
              htmlContent.innerHTML = response.elementsHTML.join('<br>');
            }
          });
        });
      });
    
      
  
      updateButton.addEventListener('click', function() {
        const predefinedValue = 'Name'; // Replace with your predefined value
        
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
          chrome.tabs.sendMessage(tabs[0].id, { action: 'updateFields', predefinedValue: predefinedValue }, function(response) {
            if (response && response.status === 'done') {
              console.log('Fields updated successfully');
            }
          });
        });
      });
      
      addFieldButton.addEventListener('click', function(event) {
        event.preventDefault();
        const keyInput = document.querySelector('[placeholder="Key"]');
        const valueInput = document.querySelector('[placeholder="Value"]');

        if (keyInput.value && valueInput.value){
          
          chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { action: 'addField', newKey: keyInput.value, newVal: valueInput.value}, function(response){
              if(response && response.status == 'done'){
                keyInput.value = ''
                valueInput.value = ''
              }
            });
          });

        }
        
      });

      deleteFieldButton.addEventListener('click', function(event) {
        event.preventDefault();
        const keyInput = document.querySelector('[placeholder="Key"]');
        const valueInput = document.querySelector('[placeholder="Value"]');

        if (keyInput.value){
          
          chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { action: 'deleteField', delKey: keyInput.value}, function(response){
              if(response && response.status == 'done'){
                keyInput.value = ''
                valueInput.value = ''
              }
            });
          });

        }
        
      });
});
  
function extractHTML(htmlContentElement) {
    
    const htmlContent = document.documentElement.outerHTML;
    console.log(htmlContent)
    const divlocation = document.getElementById('htmlContent')
    console.log(divlocation)
}
  