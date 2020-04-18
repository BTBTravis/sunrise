import React, {useState, useEffect, useContext} from 'react';
import Header from './Header';
import styled from 'styled-components';
import { Button } from 'carbon-components-react';
import SunRiseTabs from './components/Tabs';
//@ts-ignore
import {Awake32, AsleepFilled32} from '@carbon/icons-react';
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
    name: "Goodnight Moon",
    on_off: 0,
    hue: 32,
    color_temp: 2700,
    brightness: 12,
    saturation: 36
}

function App() {
  const [selectedDevice, setSelectedDevice] = useState<any>(null);
  const { state: {devices}, setDevices } = useContext(DevicesContext);
  
  useEffect(() => {
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
          {selectedDevice && devices
          .filter(({device_id}) => device_id === selectedDevice)
          .map((device) => {
            let {name, device_id, on_off} = device; 
            return (
              <>
                <SectionTitle as="h3">{name} {on_off === 1 ? <Awake32 /> : <AsleepFilled32 />} </SectionTitle>
                {device_id}
                <SunRiseTabs device={device || defaultDevice}/>
              </>
            )
          }
          )}
        </section>
      </MainWrapper>
    </div>
  );
}

export default App;
