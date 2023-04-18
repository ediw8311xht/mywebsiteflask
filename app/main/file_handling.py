from flask import Flask, current_app
from . import main
from jinja2.exceptions import TemplateNotFound
import os


def only_alpha(s):
    alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 '
    for i in s:
        if i not in alpha:
            return False
    return True

def file_exists(path_str):
    return path_str if os.path.exists(path_str) else False
    
def get_file(path_str):
    wts = current_app.config["SAVE_PATH"] + '/' + path_str
    return wts if os.path.exists(wts) else False

def get_path_template(template_name):
    try:
        return current_app.jinja_env.get_or_select_template(template_name).filename
    except TemplateNotFound:
        return False


#pargs = [ ('find', '-type', 'd', '-print0'),
#          ('find', '-type', 'f', '-print0') ]
#sr = lambda l: shellx(l, capture_output=True, text=True).stdout
#bash_find_files = shellx(['find', f'{pfrom}', '-print0' ], capture_output=True, text=True).stdout

