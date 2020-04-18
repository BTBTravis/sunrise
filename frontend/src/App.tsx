import React, {useState, useEffect, useContext} from 'react';
import Header from './Header';
import styled from 'styled-components';
//@ts-ignore
import { Button} from 'carbon-components-react';
import SunRiseTabs from './components/Tabs';
import DemoDeviceList from './components/DemoDeviceList';
//@ts-ignore
import {productiveHeading05} from '@carbon/type';
import SunRiseDeviceList from './components/DeviceList';
import { DevicesContext } from './hooks/deviceContext';
import { getDevices } from './hooks/backendAdapter';

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
  const [selectedDevice, setSelectedDevice] = useState<any>(null);
  const { state: {devices}, setDevices } = useContext(DevicesContext);
  
  useEffect(() => {
    //@ts-ignore
      getDevices().then((devices) => {
          setDevices(devices);
      });
  }, []);
  
  return (
    <div className="App">
      <Header />
      <MainWrapper className="bx--grid">
        <section>
          <SectionTitle as="h3">Select Device from the list</SectionTitle>
          <SunRiseDeviceList setSelectedDevice={setSelectedDevice} selectedDevice={selectedDevice} />
          selected device: {selectedDevice || "none"}
          {selectedDevice && devices
          .filter(({device_id}) => device_id === selectedDevice)
          .map(({name, device_id}) => (
            <>
              <SectionTitle as="h3">{name}</SectionTitle>
              {device_id}
              <SunRiseTabs device={defaultDevice}/>
            </>
          ))}
        </section>
      </MainWrapper>
    </div>
  );
}

export default App;
