document.getElementById('save').addEventListener('click', () => {
    let keywords = document.getElementById('keywords').value.split(',').map(k => k.trim()).filter(k => k);
    let channels = document.getElementById('channels').value.split(',').map(c => c.trim()).filter(c => c);
    
    chrome.storage.sync.set({ keywords, channels });
  });
  
  document.getElementById('toggle').addEventListener('click', () => {
    chrome.storage.sync.get('active', (data) => {
      chrome.storage.sync.set({ active: !data.active }, () => {
        alert(`Extension is now ${!data.active ? 'active' : 'inactive'}.`);
      });
    });
  });
  
  chrome.storage.sync.get(['keywords', 'channels', 'active'], (data) => {
    document.getElementById('keywords').value = data.keywords ? data.keywords.join(', ') : '';
    document.getElementById('channels').value = data.channels ? data.channels.join(', ') : '';
  });
  