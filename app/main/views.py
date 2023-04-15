import psycopg2
from flask import Flask, abort, send_from_directory, render_template, redirect, url_for, request
from . import main
from app.main.file_handling import file_exists, get_file
#from .. import db

pages = {'Coding', 'Writing', 'Games', 'Home'}

@main.route("/")
def home():
    return render_template('html/Home.html')

@main.route("/<string:page_name>")
def html_page(page_name):
    try:
        if page_name in pages:
            return render_template('html/' + page_name + '.html')
        else:
            raise FileNotFoundError
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

