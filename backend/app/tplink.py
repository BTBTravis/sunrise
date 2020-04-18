import uuid
import requests
import json
from functools import partial
from app.utils import pprint

base_url = "https://wap.tplinkcloud.com/"
headers = {'content-type': 'application/json'}


def login(username, pw):
    """ login into to tplink and get token to use in future requests """
    uid = uuid.uuid4()
    payload = {
        'method': 'login',
        'params': {
            'appType': 'Sunrise',
            'cloudUserName': username,
            'cloudPassword': pw,
            'terminalUUID': str(uid)
        }
    }
    r = requests.request("POST", base_url, json=payload, headers=headers)
    raw_json = r.json()
    token = raw_json['result']['token']
    return token


def _reduce_device(d):
    return {
        'device_id': d['deviceId'],
        'name': d['alias'],
        'app_server_url': d['appServerUrl']
    }


def get_device_list(token):
    """get device list from api"""
    payload = {
        'method': 'getDeviceList'
    }
    params = {
        'token': token
    }
    r = requests.request("POST", base_url, json=payload,
                         headers=headers, params=params)
    raw_json = r.json()
    # reduce data to needed fields
    raw_device_list = raw_json['result']['deviceList']
    devices = list(map(_reduce_device, raw_device_list))
    get_device_info_with_token = partial(_get_device_info, token=token)
    return list(map(get_device_info_with_token, devices))

def _get_device_info(device, token):
    """get additonal infomration on the status of a device from api"""
    payload = {
        'method': 'passthrough',
        'params': {
            'deviceId': '80120079009499F4A54D567169F218DF186E78E5',
            'requestData': "{\"system\":{\"get_sysinfo\":{}}}"
        }
    }
    params = {
        'token': token
    }
    r = requests.request("POST", device['app_server_url'], json=payload,
                         headers=headers, params=params)
    raw_json = r.json()
    response_data = json.loads(raw_json['result']['responseData'])
    extra_info = response_data['system']['get_sysinfo']['light_state']
    return {**device, **extra_info}