import React, {useState} from 'react';
import DynamicModule from '../components/DynamicModule';
export default function() {
  let remote = {
    url: "http://192.168.80.53:7101/app1_modules.js",
    scope: "app1_remote",
    name: "./Button",
  }
  let [show, setShow] = useState(false);
  const change = () => {
    setShow(!show)
  }
  return (
    <div className="app-nav-item" style={{ borderColor: 'green' }}>
      <DynamicModule module={remote} name='App2' type="success" onClick={change}></DynamicModule>
      {show && <DynamicModule module={remote} name='App3' title="新增客户" content="这里是客户的内容。"></DynamicModule>}
    </div>
  );
}
