import React, { ReactElement, SFC, useReducer } from 'react';
import { Device } from './backendAdapter';

interface DevicesState {
    devices: Array<Device>;
} 

interface Devices {
    state: DevicesState;
    setDevices: (a: Array<Device>) => void;
}

enum DevicesActions {
    SET_DEVICES = 'set_devices'
}
  
export const DevicesContext = React.createContext<Devices>({
    state: {
        devices: [],
    },
    setDevices: () => null
});
  
function reducer(state: DevicesState, action: { type: string; payload: any }): DevicesState {
    switch (action.type) {
        case DevicesActions.SET_DEVICES:
            return { devices: action.payload }
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

    return (
        <DevicesContext.Provider
            value={{
                state,
                setDevices,
            }}
        >
            {children}
        </DevicesContext.Provider>
    );
};
  
export default DevicesProvider;