import React, { useMemo } from 'react';


let cacheScripts = {}
let cacheModules = {}
function loadComponent(scope, module) {
  return async () => {
    if(cacheModules[scope + '_' + module]){
      console.log('cache')
      return cacheModules[scope + '_' + module]
    } else {
      console.log('remote')
      // Initializes the share scope. This fills it with known provided modules from this build and all remotes
      let res = await __webpack_init_sharing__("default");
      const container = window[scope]; // or get the container somewhere else
      // Initialize the container, it may provide shared modules
      await container.init(__webpack_share_scopes__.default);
      const factory = await window[scope].get(module);
      const Module = factory();
      cacheModules[scope + '_' + module] = Module;
      return Module;
    }
  };
}

const useDynamicScript = (args) => {
  const [ready, setReady] = React.useState(false);
  const [failed, setFailed] = React.useState(false);

  React.useEffect(() => {
    if (!args.url) {
      return;
    }
    let element;
    if(cacheScripts[args.url]){
      if(cacheScripts[args.url].state == 'loaded'){
        setReady(true);
        return {
          ready: true, 
          failed: false
        }
      } else {
        element = cacheScripts[args.url].element
      }
    } else {
      element = document.createElement("script");
      element.src = args.url;
      element.type = "text/javascript";
      element.async = true;
      document.head.appendChild(element);
      cacheScripts[args.url] = {
        state: 'loading',
        element: element
      }
    }

    setReady(false);
    setFailed(false);

    element.addEventListener('load', () => {
      cacheScripts[args.url].state = 'loaded';
      setReady(true);
    })

    element.addEventListener('error', () => {
      cacheScripts[args.url].state = 'failed';
      setReady(false);
      setFailed(true);
    })

    return () => {
      console.log(`Dynamic Script Removed: ${args.url}`);
      document.head.removeChild(element);
    };
  }, [args.url]);

  return {
    ready,
    failed,
  };
};

function System({system, ...props}) {
  const { ready, failed } = useDynamicScript({
    url: system && system.url,
  });

  if (!system) {
    return <h2>Not system specified</h2>;
  }

  if (!ready) {
    return <h2>Loading dynamic script: {system.url}</h2>;
  }

  if (failed) {
    return <h2>Failed to load dynamic script: {system.url}</h2>;
  }

  const Component = React.lazy(
    loadComponent(system.scope, system.module)
  );

  return (
    // <React.Suspense fallback="Loading System">
      <Component {...props} />
    // </React.Suspense>
  );
}

export default System;