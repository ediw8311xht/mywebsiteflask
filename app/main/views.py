import psycopg2
from flask import Flask, abort, send_from_directory, render_template, redirect, url_for, request
from . import main
from app.main.file_handling import get_file
#from .. import db

pages = {'Coding', 'Writing', 'Games', 'Home'}

@main.route("/<str:page_name>")
def html_page(page_name):
    try:
        if page_name not in pages:
            raise FileNotFoundError
        return send_from_directory('static/html', 'html/' + page_name + '.html')
    except FileNotFoundError:
        abort(404)

#@main.route("/<str:category>/<str:path_str>")
#def generic_file_category(category):
#    if category not in
#    return render_template(tablet[category]
#

#@main.route("/txt/<int:path>")
#def text_file(path):
#    try:
#        #return send_from_directory('static/txt', path)
#    except FileNotFoundError:
#        abort(404)
#----------------------------------------------------Land

