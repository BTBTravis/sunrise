import React from 'react';
import Header from './Header';
import styled from 'styled-components';
import { Button } from 'carbon-components-react';

const MainWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 90vh;
`;

function App() {
  return (
    <div className="App">
      <Header />
      <MainWrapper>
        <Button>Hello World</Button>
      </MainWrapper>
    </div>
  );
}

export default App;
