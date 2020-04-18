import React, { useEffect, useContext } from 'react';
import { getDevices } from '../hooks/backendAdapter'
import { DevicesContext } from '../hooks/deviceContext';

const DemoDeviceList: React.FC = () => {
    const { state, setDevices } = useContext(DevicesContext);
    useEffect(() => {
        getDevices().then((devices) => {
            setDevices(devices);
        });
    }, []);

    const {devices} = state;

    return (
        <ul>
            {devices.map(d => <li>{d.name}</li>)}
        </ul>
    );
}

export default DemoDeviceList;