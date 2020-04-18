import React from 'react';
import { Tabs, Tab, Button } from 'carbon-components-react';
//@ts-ignore
import {Power32} from '@carbon/icons-react';

interface Device {
  name: string
  on_off: number
  hue: number
  color_temp: number
  brightness: number
  saturation: number
}

const SunRiseTabs: React.FC<{ device: Device }> = ({device}) => {
  let {on_off, hue, color_temp, brightness, saturation} = device;

  return (
    <Tabs 
      ariaLabel="listbox"
      className="container"
      iconDescription="show menu options"
      onKeyDown={function noRefCheck(){}}
      onSelectionChange={function noRefCheck(){}}
      role="navigation"
      selected={0}
      tabContentClassName="tab-content"
      triggerHref="#"
      type="container">
      <Tab
        href="#"
        id="tab-1"
        label="Current Status"
        onClick={function noRefCheck(){}}
        onKeyDown={function noRefCheck(){}}
        role="presentation"
        selected={false}
        handleTabClick={()=>console.log("click")}
        handleTabKeyDown={()=>console.log("keydown")}
        tabIndex={0}>
      <div>
        <Button 
        kind={on_off ? "primary" : "secondary"}
        hasIconOnly
        iconDescription="toggle power"
        tooltipAlignment="center"
        tooltipPosition="top"
        onClick={() => console.log({power: on_off ? "off" : "on"})}
        type="button">
          <Power32 />
        </Button>
        <p>Hue: {hue}</p>
        <p>Color Temp: {color_temp}</p>
        <p>Brightness: {brightness}</p>
        <p>Saturation: {saturation}</p>
      </div>
    </Tab>
      <Tab
        href="#"
        id="tab-1"
        label="Presets"
        onClick={function noRefCheck(){}}
        onKeyDown={function noRefCheck(){}}
        role="presentation"
        selected={false}
        handleTabClick={()=>console.log("click")}
        handleTabKeyDown={()=>console.log("keydown")}
        tabIndex={0}>
      <div>
        <p>Content for second Tab</p>
      </div>
    </Tab>
    </Tabs>
  )
}

export default SunRiseTabs;