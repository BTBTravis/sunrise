const rootPath = process.env.NODE_ENV === "development" ? "http://localhost:3001/" : "/";

async function backEndFetch<T>(
    request: RequestInfo
): Promise<T> {
    const response = await fetch(request);
    const body = await response.json();
    return body;
}

export interface Device {
    app_server_url: string;
    device_id: string;
    name: string;
    brightness: number;
    color_temp: number,
    hue: number;
    on_off: number;
    saturation: number;
}

interface DevicesResp {
    devices: Array<Device>
}

export const getDevices = async () => {
    const r = await backEndFetch<DevicesResp>(rootPath + 'api/v1/devices');
    return r.devices;
}

const jsonHeaders = new Headers();
jsonHeaders.append('Content-Type', 'application/json');

interface DefaultActionResp {
    success: boolean
}

export const turnOnDevice = async (d: Device) => {
    const r = await backEndFetch<DefaultActionResp>(new Request(rootPath + 'api/v1/on', {
        method: 'POST',
        headers: jsonHeaders,
        body: JSON.stringify(d)
    }));
    return r.success;
} 

export const turnOffDevice = async (d: Device) => {
    const r = await backEndFetch<DefaultActionResp>(new Request(rootPath + 'api/v1/off', {
        method: 'POST',
        headers: jsonHeaders,
        body: JSON.stringify(d)
    }));
    return r.success;
} 