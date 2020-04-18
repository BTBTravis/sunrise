import React, { useState, useContext, useEffect } from 'react';
//@ts-ignore
import { TileGroup, RadioTile, Row } from 'carbon-components-react';
import { DevicesContext } from '../hooks/deviceContext';
import { getDevices } from '../hooks/backendAdapter';

interface Props {
  setSelectedDevice: React.Dispatch<React.SetStateAction<number>>
  selectedDevice: any
};

const SunRiseDeviceList: React.FC<Props> = ({selectedDevice, setSelectedDevice}) => {
  const { state: {devices}, setDevices } = useContext(DevicesContext);
  useEffect(() => {
      getDevices().then((devices) => {
          setDevices(devices);
      });
  }, []);
  
  function handleSelect(id:any) {
    setSelectedDevice(id);
  }

  return (
    <TileGroup
      defaultSelected="0"
      legend=""
      name="tile-group"
      onChange={(e) => handleSelect(e)}
      valueSelected={(selectedDevice || "").toString()}>
        {devices[0] && devices.map((device, index) => (
          <RadioTile
            light={false}
            name="tiles"
            tabIndex={0}
            value={device.device_id}>
            {device.name} - {index}
          </RadioTile>
        ))}
    </TileGroup>
  )
}

export default SunRiseDeviceList;