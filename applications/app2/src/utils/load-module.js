let cacheModules = {} // 缓存模块

function loadModule(scope, name) {
  return async () => {
    // 判断模块是否加载
    if(cacheModules[scope + '_' + name]){
      return cacheModules[scope + '_' + name]
    } else {
      await __webpack_init_sharing__("default");
      const container = window[scope]; // or get the container somewhere else
      await container.init(__webpack_share_scopes__.default);
      const factory = await window[scope].get(name);
      const Module = factory();
      cacheModules[scope + '_' + name] = Module;
      return Module;
    }
  };
}

export default loadModule;