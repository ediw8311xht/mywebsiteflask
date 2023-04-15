import os
from flask import Flask, render_template
from config import config
from .main import main as main_blueprint
#from flask_wtf.csrf import CSRFProtect

#csrf = CSRFProtect()

def create_app(config_name):
    app = Flask(__name__)
    #csrf.init_app(app)
    app.config.from_object(config[config_name])
    config[config_name].init_app(app)
    app.register_blueprint(main_blueprint, url_prefix='')

    return app
