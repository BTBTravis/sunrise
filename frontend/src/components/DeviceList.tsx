import React, { useState } from 'react';
//@ts-ignore
import { TileGroup, RadioTile, Row } from 'carbon-components-react';

const devices = [{"app_server_url":"https://use1-wap.tplinkcloud.com","device_id":"8012CED6023B41628D5E7583F58211BD1877CE4B","name":"Wake The Sun"},{"app_server_url":"https://use1-wap.tplinkcloud.com","device_id":"80120079009499F4A54D567169F218DF186E78E5","name":"Goodnight Moon"}];

interface Props {
  setSelectedDevice: React.Dispatch<React.SetStateAction<number>>
  selectedDevice: number 
};

const SunRiseDeviceList: React.FC<Props> = ({selectedDevice, setSelectedDevice}) => {

  function handleSelect(id:any) {
    setSelectedDevice(id);
  }

  return (
    <TileGroup
      defaultSelected="default-selected"
      legend=""
      name="tile-group"
      onChange={(e) => handleSelect(e)}
      valueSelected={selectedDevice.toString()}>
        {devices[0] && devices.map((device, index) => (
          <RadioTile
            light={false}
            name="tiles"
            tabIndex={index}
            value={index}>
            {device.name} - {index}
          </RadioTile>
        ))}
    </TileGroup>
  )
}

export default SunRiseDeviceList;