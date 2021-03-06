import { registerMicroApps, runAfterFirstMounted, setDefaultMountApp, start, initGlobalState } from 'qiankun';
import './index.less';

/**
 * 主应用 **可以使用任意技术栈**
 * 以下分别是 React 和 Vue 的示例，可切换尝试
 */
import render from './render/ReactRender';
// import render from './render/VueRender';

/**
 * Step1 初始化应用（可选）
 */
render({ loading: true });

const loader = loading => render({ loading });

/**
 * Step2 注册子应用
 */

registerMicroApps(
  [
    // {
    //   name: 'myApp',
    //   entry: '//localhost:7101',
    //   container: '#subapp-viewport',
    //   loader,
    //   activeRule: '/my-app',
    // },
    // {
    //   name: 'react16',
    //   entry: '//localhost:7100',
    //   container: '#subapp-viewport',
    //   loader,
    //   activeRule: '/react16',
    // },
    {
      name: 'app1',
      entry: '//localhost:7101',
      container: '#subapp-viewport',
      loader,
      activeRule: '/app1',
    },
    {
      name: 'app2',
      entry: '//localhost:7102',
      container: '#subapp-viewport',
      loader,
      activeRule: '/app2',
    }
  ],
  {
    beforeLoad: [
      app => {
        console.log(window[app.name])
        console.log('[LifeCycle] before load %c%s', 'color: green;', app.name);
      },
    ],
    beforeMount: [
      app => {
        
        console.log('[LifeCycle] before mount %c%s', 'color: green;', app.name);
      },
    ],
    afterUnmount: [
      app => {
        console.log('[LifeCycle] after unmount %c%s', 'color: green;', app.name);
      },
    ],
  },
);

const { onGlobalStateChange, setGlobalState } = initGlobalState({
  user: 'qiankun',
});

onGlobalStateChange((value, prev) => console.log('[onGlobalStateChange - master]:', value, prev));

setGlobalState({
  ignore: 'master',
  user: {
    name: 'master',
  },
});

/**
 * Step3 设置默认进入的子应用
 */
setDefaultMountApp('/app1');

/**
 * Step4 启动应用
 */
start({
  sandbox: false
});

runAfterFirstMounted(() => {
  console.log('[MainApp] first app mounted');
});
