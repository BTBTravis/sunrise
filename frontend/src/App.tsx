import React from 'react';
import { Header, HeaderName, Button } from 'carbon-components-react';
import styled from 'styled-components';

const MainWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 90vh;
`;

function App() {
  return (
    <div className="App">
      <Header aria-label="Sunrise App Title">
        <HeaderName href="/" prefix="">
          Project Sunrise
        </HeaderName>
      </Header>
      <MainWrapper>
        <Button>Hello World</Button>
      </MainWrapper>
    </div>
  );
}

export default App;
