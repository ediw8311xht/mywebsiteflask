import os
from flask import current_app, abort, send_from_directory, render_template, redirect, url_for, request
from . import main
from app.main.file_handling import file_exists, get_file, get_path_template, only_alpha
from jinja2.exceptions import TemplateNotFound
#from pprint import pprint
#from .. import db
#import psycopg2

valid_pages     = {'Coding', 'Writing', 'Games', 'Home'}
has_subsections = {'Coding'}

@main.route("/favicon.ico")
def favicon_icon():
    return send_from_directory('static/images', 'favicon.ico')

@main.route("/")
def home():
    images = os.listdir(f'/{current_app.static_folder}/images/home/')
    return render_template('html/Home.html', images=images)

@main.route("/unblockit")
def unblockit():
    return render_template('html/Unblockit.html')

@main.route("/<string:pname>")
def parent_page(pname):
    composed = f'html/{pname}.html'
    if pname in valid_pages and get_path_template(composed):
        sub_path = f'/{current_app.static_folder}/sub/{pname}'
        sub_contents = os.listdir(f'/{sub_path}')
        if pname in has_subsections:
            sections = [ { 'name': x, 'dirs': os.listdir(f'/{sub_path}/{x}') } for x in sub_contents ]
            return render_template(composed, sections=sections)
        else:
            return render_template(composed, dirs=sub_contents)
    abort(404)

@main.route("/sub/<string:pname>/<string:cname>")
def child_page(pname, cname):
    if pname in valid_pages and only_alpha(cname):
        return render_template( f'html/sub/{pname}_sub.html', url_pass=url_for('static', filename=f"sub/{pname}/{cname}/index.html") )
    abort(404)

@main.route("/sub/<string:pname>/<string:p2name>/<string:cname>")
def sub_child_page(pname, p2name, cname):
    if pname in valid_pages and pname in has_subsections and only_alpha(cname + p2name):
        return render_template( f'html/sub/{pname}_sub.html', url_pass=url_for('static', filename=f"sub/{pname}/{p2name}/{cname}/index.html") )
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


