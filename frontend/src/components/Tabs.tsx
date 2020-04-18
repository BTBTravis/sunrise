import React, { useState } from 'react';
import { Tabs, Tab } from 'carbon-components-react';

interface Device {
  name: string
}

const SunRiseTabs: React.FC<{ device: Device }> = ({device}) => {

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
        <p>{device.name}</p>
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