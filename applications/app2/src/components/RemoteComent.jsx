import React from 'react';


let cacheScripts = {} // 缓存js文件
let cacheModules = {} // 缓存模块
function loadComponent(scope, module) {
  return async () => {
    // 判断模块是否加载
    if(cacheModules[scope + '_' + module]){
      return cacheModules[scope + '_' + module]
    } else {
      await __webpack_init_sharing__("default");
      const container = window[scope]; // or get the container somewhere else
      await container.init(__webpack_share_scopes__.default);
      const factory = await window[scope].get(module);
      const Module = factory();
      cacheModules[scope + '_' + module] = Module;
      return Module;
    }
  };
}
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
      // document.head.removeChild(element);
      reject(url)
    })
  })
}
const useDynamicScript = (args) => {
  const [loadSatus, setLoadStatus] = React.useState('loading')

  React.useEffect(() => {
    if (!args.url) {
      return;
    }
    loadScript(args.url).then( () => {
      setLoadStatus('loaded')
    })
  }, [args.url]);

  return loadSatus;
};

function System({system, ...props}) {
  const status = useDynamicScript({
    url: system && system.url,
  });
  if (!system) {
    return <h2>Not system specified</h2>;
  }
  if (status == 'loading') {
    return <h2>Loading dynamic script: {system.url}</h2>;
  }

  if (status == 'failed') {
    return <h2>Failed to load dynamic script: {system.url}</h2>;
  }

  const Component = React.lazy(
    loadComponent(system.scope, system.module)
  );

  return (
    <Component {...props} />
  );
}

export default System;