function blurVideo(element) {
    element.style.filter = 'blur(10px)';
    element.style.pointerEvents = 'none';
  }
  
  function processPage() {
    chrome.storage.sync.get(['keywords', 'channels', 'active'], (data) => {
      if (!data.active) return;
  
      let videos = document.querySelectorAll('ytd-video-renderer, ytd-grid-video-renderer');
      
      videos.forEach(video => {
        let titleElement = video.querySelector('#video-title');
        let channelElement = video.querySelector('ytd-channel-name a');
        
        if (!titleElement || !channelElement) return;
  
        let title = titleElement.innerText.toLowerCase();
        let channel = channelElement.innerText.toLowerCase();
  
        let shouldBlur = true;
  
        if (data.keywords.some(keyword => title.includes(keyword.toLowerCase()))) {
          shouldBlur = false;
        }
  
        if (data.channels.some(ch => channel.includes(ch.toLowerCase()))) {
          shouldBlur = false;
        }
  
        if (shouldBlur) {
          blurVideo(video);
        }
      });
    });
  }
  
  // Initial processing of the page
  processPage();
  
  // Re-process when the user scrolls or when the page dynamically loads more videos
  document.addEventListener('scroll', processPage);
  