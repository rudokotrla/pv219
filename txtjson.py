import json

def load_to_list(file_path):
    file = open(file_path, mode='r', encoding='utf_16')
    lines = file.read().splitlines()

    return lines


def save_to_json(file_path, array):
    with open(file_path, 'w', encoding='utf-16') as json_file:
        json.dump(array, json_file, ensure_ascii=False)
