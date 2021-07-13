let cacheScripts = {} // 缓存js文件
function loadScript (url){
  return new Promise( (resole, reject) => {
    let element;
    if(cacheScripts[url]){
      if(cacheScripts[url].state == 'loaded'){
        resole(url);
      } else {
        element = cacheScripts[url].element
      }
    } else {
      element = document.createElement("script");
      element.src = url;
      element.type = "text/javascript";
      element.async = true;
      document.head.appendChild(element);
      cacheScripts[url] = {
        state: 'loading',
        element: element
      }
    }
    element.addEventListener('load', () => {
      cacheScripts[url].state = 'loaded';
      document.head.removeChild(element);
      resole(url)
    })
    element.addEventListener('error', () => {
      cacheScripts[url].state = 'failed';
      document.head.removeChild(element);
      reject(url)
    })
  })
}

export default loadScript;