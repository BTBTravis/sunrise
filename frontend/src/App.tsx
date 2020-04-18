import React from 'react';
import Header from './Header';
import styled from 'styled-components';
import { Button,  } from 'carbon-components-react';
import SunRiseTabs from './components/Tabs';
//@ts-ignore
import {display04} from '@carbon/type';
import DemoDeviceList from './components/DemoDeviceList';

const SectionTitle = styled.h1(display04);

const MainWrapper = styled.div`
  width: calc(100% - 4rem);
  margin: 0 auto;
  min-height: 90vh;

  section {
    margin-top: calc(48px + 1rem);
    .container {
      margin: 1rem auto;
    }
  }
`;

const defaultDevice = {
    name: "Goodnight Moon"
}

function App() {
  return (
    <div className="App">
      <Header />
      <MainWrapper>
        <section>
          <SectionTitle>Goodnight Moon</SectionTitle>
          <SunRiseTabs device={defaultDevice}/>
          <Button>Hello World</Button>
          <DemoDeviceList />
        </section>
      </MainWrapper>
    </div>
  );
}

export default App;
