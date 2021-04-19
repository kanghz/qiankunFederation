import React from 'react';
import Button from '../components/button';
export default function() {
  return (
    <div>
      <h2 className="app-nav-item" style={{ borderColor: 'green' }}>
        This is app1`s About page.
      </h2>
      <Button name="App1" type="primary" />
    </div>
  );
}
