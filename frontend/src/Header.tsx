import React, { useState } from 'react';
import { Header, HeaderName, Button, HeaderNavigation, HeaderMenuItem, HeaderMenuButton, HeaderMenu, SideNav, SideNavItems, HeaderSideNavItems } from 'carbon-components-react';
// import styled from 'styled-components';

const HeaderItems = () => (
    <>
        <HeaderMenu menuLinkName="repo">
            <HeaderMenuItem href="https://gitlab.com/BTBTravis/sunrise/-/tree/master">gitlab</HeaderMenuItem>
        </HeaderMenu>
        <HeaderMenuItem href="/logout">logout</HeaderMenuItem>
    </>
);

const SunRiseHeader = () => {
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
                <HeaderItems />
            </HeaderNavigation>
            <SideNav
                aria-label="Side navigation"
                expanded={isSideNavExpanded}
                isPersistent={false}>
                <SideNavItems>
                    <HeaderSideNavItems>
                        <HeaderItems />
                    </HeaderSideNavItems>
                </SideNavItems>
            </SideNav>
        </Header>
    );
};

export default SunRiseHeader;