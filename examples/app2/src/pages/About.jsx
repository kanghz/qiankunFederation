import React, {useState} from 'react';
import RemoteComent from '../components/RemoteComent';
export default function() {
  let remote = {
    url: "http://192.168.80.53:7101/remoteEntry.js",
    scope: "app1_remote",
    module: "./Button",
  }
  let [show, setShow] = useState(false);
  const change = () => {
    setShow(!show)
  }
  return (
    <div className="app-nav-item" style={{ borderColor: 'green' }}>
      <RemoteComent system={remote} name='App2' type="success" onClick={change}></RemoteComent>
      {show && <RemoteComent system={remote} name='App3' title="新增客户" content="这里是客户的内容。"></RemoteComent>}
    </div>
  );
}
