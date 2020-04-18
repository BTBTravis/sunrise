async function backEndFetch<T>(
    request: RequestInfo
): Promise<T> {
    const response = await fetch(request);
    console.log('response', response);
    const body = await response.json();
    return body;
}

export interface Device {
    app_server_url: string;
    device_id: string;
    name: string;
}

interface DevicesResp {
    devices: Array<Device>
}

export const getDevices = async () => {
    const r = await backEndFetch<DevicesResp>('/api/v1/devices');
    return r.devices;
} 