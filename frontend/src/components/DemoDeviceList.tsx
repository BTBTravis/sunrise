import React, { useEffect, useContext } from 'react';
import { getDevices, Device, turnOnDevice } from '../hooks/backendAdapter'
import { DevicesContext } from '../hooks/deviceContext';

const DemoDeviceList: React.FC = () => {
    const { state, setDevices, turnOn } = useContext(DevicesContext);
    useEffect(() => {
        getDevices().then((devices) => {
            setDevices(devices);
        });
    }, []);

    const {devices} = state;

    const handleDeviceClick = (d: Device) => () => {
        turnOnDevice(d).then(() => turnOn(d));
    }

    return (
        <ul>
            {devices.map(d => <li onClick={handleDeviceClick(d)} key={d.device_id}>{d.name}</li>)}
        </ul>
    );
}

export default DemoDeviceList;