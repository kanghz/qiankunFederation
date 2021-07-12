import React, { lazy, Suspense } from 'react';
import { HashRouter as Router, Link, Route, Switch } from 'react-router-dom';

import './App.css';


const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));

export default function App() {
  return (
    <Router basename={window.__POWERED_BY_QIANKUN__ ? '/sub' : '/'}>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </nav>
      <Suspense fallback={null}>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/about" component={About} />
        </Switch>
      </Suspense>
    </Router>
  );
}
