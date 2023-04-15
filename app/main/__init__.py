from flask import Blueprint

main = Blueprint('main', __name__)

# At bottom to prevent circular dependencies (KEEP)
from . import views, errors

