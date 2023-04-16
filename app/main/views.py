import psycopg2
from flask import current_app, abort, send_from_directory, render_template, redirect, url_for, request
from . import main
from app.main.file_handling import file_exists, get_file, get_path_template
from jinja2.exceptions import TemplateNotFound
from pprint import pprint
#from .. import db

valid_pages = {'Coding', 'Writing', 'Games', 'Home', 'NotTemplate'}

@main.route("/")
def home():
    return render_template('html/Home.html')

@main.route("/<string:pname>")
def html_page(pname):
    composed = 'html/' + pname + '.html'
    if pname in valid_pages and get_path_template(composed):
        return render_template(composed)
    else:
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

