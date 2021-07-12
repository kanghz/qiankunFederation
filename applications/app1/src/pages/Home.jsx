import React from 'react';
import { Calendar } from 'lx-ui';
export default function() {
  return (
    <h2 className="app-nav-item" style={{ borderColor: 'red' }}>
      Home
      <Calendar />
    </h2>
  );
}
