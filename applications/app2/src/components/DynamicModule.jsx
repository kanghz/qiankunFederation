import React from 'react';
import { loadScript, loadModule } from '../utils/index';

const DynamicModule = ({module, ...props}) => {
  const [loadStatus, setLoadStatus] = React.useState('loading')
  if (!module && !module.url) {
    return;
  }
  React.useEffect(() => {
    loadScript(module.url).then( () => {
      setLoadStatus('loaded')
    })
  }, [module.url]);

  switch (loadStatus) {
    case 'loading':
      return <h2>Loading dynamic script: {module.url}</h2>
    case 'failed':
      return <h2>Failed to load dynamic script: {module.url}</h2>
    default:
      const Component = React.lazy(
        loadModule(module.scope, module.name)
      );
      return <Component {...props} />
  }
};

export default DynamicModule;