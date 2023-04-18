import psycopg2
from flask import current_app, abort, send_from_directory, render_template, redirect, url_for, request
from . import main
from app.main.file_handling import file_exists, get_file, get_path_template
from jinja2.exceptions import TemplateNotFound
from pprint import pprint
#from .. import db

valid_pages     = {'Coding', 'Writing', 'Games', 'Home'}

@main.route("/")
def home():
    return render_template('html/Home.html')

@main.route("/<string:pname>")
def parent_page(pname):
    composed = f'html/{pname}.html'
    if pname in valid_pages and get_path_template(composed):
        return render_template(composed)
    else:
        abort(404)

@main.route("/<string:pname>/<string:cname>")
def child_page(pname, cname):
    if pname in valid_pages:
        if cname.isdigit():
            return render_template( f'html/{pname}.html', file_pass=cname )
        elif get_path_template(f'html/{pname}/{cname}.html'):
            return render_template( f'html/{pname}/{cname}.html' )
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

