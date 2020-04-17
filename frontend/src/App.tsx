import React from 'react';
import { Header, HeaderName } from 'carbon-components-react';
// import './App.css';

function App() {
  return (
    <div className="App">
      <Header aria-label="Sunrise App Title">
        <HeaderName href="/">
          Sunrise
        </HeaderName>
      </Header>
    </div>
  );
}

export default App;
