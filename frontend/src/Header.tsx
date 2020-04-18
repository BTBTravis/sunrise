import React, { useState, useEffect, useContext } from 'react';
import { Header, HeaderName, HeaderNavigation, HeaderMenuItem, HeaderMenuButton, HeaderMenu, SideNav, SideNavItems, HeaderSideNavItems } from 'carbon-components-react';
import { DevicesContext } from './hooks/deviceContext';
import { getDevices } from './hooks/backendAdapter';
// import styled from 'styled-components';
interface Props {
    setSelectedDevice: React.Dispatch<React.SetStateAction<number>>
    selectedDevice: any
  };

const HeaderItems: React.FC<Props> = ({selectedDevice, setSelectedDevice}) => {
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
    <>
        <HeaderMenu menuLinkName="repo">
            <HeaderMenuItem href="https://gitlab.com/BTBTravis/sunrise/-/tree/master">gitlab</HeaderMenuItem>
        </HeaderMenu>
        <HeaderMenu menuLinkName="devices">
            {devices && devices.map(({name, device_id}) => (
                <HeaderMenuItem onClick={() => handleSelect(device_id)} href={`#${name}`}>{name}</HeaderMenuItem>
            ))}
        </HeaderMenu>
        <HeaderMenuItem href="/logout">logout</HeaderMenuItem>
    </>
)};

const SunRiseHeader: React.FC<Props> = ({selectedDevice, setSelectedDevice}) => {
    const [isSideNavExpanded, setSideNavExpanded] = useState(false);
    const handleMenuIconClick = () => setSideNavExpanded(!isSideNavExpanded);

    return (
        <Header aria-label="Sunrise App Title">
            <HeaderMenuButton
                aria-label="Open menu"
                onClick={handleMenuIconClick}
                isActive={isSideNavExpanded}
            />
            <HeaderName href="/" prefix="">
            Project Sunrise
            </HeaderName>
            <HeaderNavigation>
                <HeaderItems setSelectedDevice={setSelectedDevice} selectedDevice={selectedDevice} />
            </HeaderNavigation>
            <SideNav
                aria-label="Side navigation"
                expanded={isSideNavExpanded}
                isPersistent={false}>
                <SideNavItems>
                    <HeaderSideNavItems>
                        <HeaderItems setSelectedDevice={setSelectedDevice} selectedDevice={selectedDevice} />
                    </HeaderSideNavItems>
                </SideNavItems>
            </SideNav>
        </Header>
    );
};

export default SunRiseHeader;