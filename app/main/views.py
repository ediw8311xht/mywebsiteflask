import psycopg2
from flask import Flask, abort, send_from_directory, render_template, session, redirect, url_for, request
from helper import strict_sanitize#, maxzip
from . import main
from app.main.models    import Post, Game, Project
from app.main.database  import get_all_tables, get_all_table_rows
#from .. import db

#START
admin_url_map = {"posts": Post, "games": Game, "projects": Project}

@main.route("/")
def home():
    return render_template("html/Home.html")

@main.route("/Coding")
def code():
    return render_template("html/Coding.html")

@main.route("/Writing")
def writing():
    return render_template("html/Writing.html")

@main.route("/Games")
def mames():
    return render_template("html/Games.html")

#@main.route("/txt/<int:path>")
#def text_file(path):
#    try:
#        #return send_from_directory('static/txt', path)
#    except FileNotFoundError:
#        abort(404)
#----------------------------------------------------Land
@main.route("/land")
def land():
    return render_template("html/Games.html")

#----------------------------------------------------Admin
@main.route("/Admin", methods = ["GET", "POST"])
def admin():
    if request.method == "POST":
        new_post = Post(values=request.json)
        return redirect(url_for("main.land"))
    elif z := get_all_tables():
        return render_template("html/Admin.html", **z)
    abort(500)

@main.route("/Admin/<string:table_name>")
def admin_table(table_name):
    if table_name not in admin_url_map:
        abort(404)
    return render_template("html/AdminTable.html",
            **{"table_name": table_name, "table_fields": admin_url_map[table_name].VALID_KEYS, "table_rows": get_all_table_rows(table_name)})

@main.route("/Admin/<string:table_name>/new", methods = ["POST"])
def admin_new(table_name):
    print(table_name)
    if table_name in admin_url_map:
        if row := admin_url_map[table_name]().save(new=True):
            print("SUCC")
            print(row)
            print("SUCC")
            #return render_template("html/Writing.html")
            #return response( url_for("main.admin_edit"))#, {"table_name": table_name, "primary_key": row.primary_key_value()}))
            print({"table_name": table_name, "primary_key": row.primary_key_value()})
            return redirect( url_for("main.admin_edit", **{"table_name": table_name, "primary_key": row.primary_key_value()}))
    abort(404)

@main.route("/Admin/<string:table_name>/edit/<string:primary_key>", methods = ["GET"])
def admin_edit(table_name, primary_key):
    print("ZE")
    if table_name in admin_url_map:
        if (row := admin_url_map[table_name].get_by_primary_key(primary_key)):
            return render_template("html/AdminRowEdit.html", **{"row": row})
    abort(404)
    


