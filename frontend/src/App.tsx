import React, {useState} from 'react';
import Header from './Header';
import styled from 'styled-components';
//@ts-ignore
import { Button} from 'carbon-components-react';
import SunRiseTabs from './components/Tabs';
import DemoDeviceList from './components/DemoDeviceList';
//@ts-ignore
import {productiveHeading05} from '@carbon/type';
import SunRiseDeviceList from './components/DeviceList';

const SectionTitle = styled.h1(productiveHeading05);

const MainWrapper = styled.div`
  width: calc(100% - 4rem);
  margin: 0 auto;
  min-height: 90vh;

  section {
    margin-top: calc(48px + 1rem);
    .container {
      margin: 1rem auto;
    }
    .bx--tile-group {
      margin: 1rem auto;
    }
  }
`;

const defaultDevice = {
    name: "Goodnight Moon"
}

function App() {
  const [selectedDevice, setSelectedDevice] = useState<number>(0);
  return (
    <div className="App">
      <Header />
      <MainWrapper className="bx--grid">
        <section>
          <SectionTitle as="h3">Select Device from the follow:</SectionTitle>
          <SunRiseDeviceList setSelectedDevice={setSelectedDevice} selectedDevice={selectedDevice}/>
          <SectionTitle as="h3">Goodnight Moon</SectionTitle>
          {selectedDevice}
          <SunRiseTabs device={defaultDevice}/>
          <Button>Hello World</Button>
          <DemoDeviceList />
          <Button>Hello World</Button>
          <DemoDeviceList />
        </section>
      </MainWrapper>
    </div>
  );
}

export default App;
