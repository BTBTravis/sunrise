import json


def pprint(output):
    """prints python a data structure as an easy to view json string"""
    print(json.dumps(output, sort_keys=True, indent=4))
