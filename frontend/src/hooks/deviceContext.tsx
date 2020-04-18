import React, { ReactElement, SFC, useReducer } from 'react';
import { Device } from './backendAdapter';

interface DevicesState {
    devices: Array<Device>;
} 

interface Devices {
    state: DevicesState;
    setDevices: (a: Array<Device>) => void;
    turnOn: (d: Device) => void;
    turnOff: (d: Device) => void;
}

enum DevicesActions {
    SET_DEVICES = 'set_devices',
    TURN_ON = 'turn_on',
    TURN_OFF = 'turn_off'
}
  
export const DevicesContext = React.createContext<Devices>({
    state: {
        devices: [],
    },
    setDevices: () => null,
    turnOn: () => null,
    turnOff: () => null
});

const handleActionPowerOption= (device: Device, state: DevicesState, on: boolean): DevicesState => {
    const newDevices = state.devices.map(oldDevice => {
        if (oldDevice.device_id === device.device_id) {
            return {...oldDevice, on_off: on ? 1 : 0};
        }
        return oldDevice;
    })
    return {...state, devices: newDevices}
}

function reducer(state: DevicesState, action: { type: string; payload: any }): DevicesState {
    switch (action.type) {
        case DevicesActions.SET_DEVICES:
            return { devices: action.payload }
        case DevicesActions.TURN_ON:
            return handleActionPowerOption(action.payload, state, true);
        case DevicesActions.TURN_OFF:
            return handleActionPowerOption(action.payload, state, false);
        default:
            throw new Error();
    }
}
  
const initialState: DevicesState = {
    devices: [],
};
  
export const DevicesProvider: SFC = ({ children }): ReactElement => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const setDevices = (devices: Array<Device>) => dispatch({ type: DevicesActions.SET_DEVICES, payload: devices  });
    const turnOn = (device: Device) => dispatch({ type: DevicesActions.TURN_ON, payload: device  });
    const turnOff = (device: Device) => dispatch({ type: DevicesActions.TURN_OFF, payload: device  });

    return (
        <DevicesContext.Provider
            value={{
                state,
                setDevices,
                turnOn,
                turnOff
            }}
        >
            {children}
        </DevicesContext.Provider>
    );
};
  
export default DevicesProvider;