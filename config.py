import os
basedir = os.path.abspath(os.path.dirname(__file__))


class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY')
    DB_URL  = os.environ['DB_URL']
    DB_USER = os.environ['DB_USERNAME']
    DB_PASS = os.environ['DB_PASSWORD']
    DB_NAME = os.environ['DB_NAME']
    @staticmethod
    def init_app(app):
        pass

class DevelopmentConfig(Config):
    DEBUG = True

class ProductionConfig(Config):
    DEBUG = False

config = {
    'production'  : ProductionConfig,
    'pro'         : ProductionConfig,
    'development' : DevelopmentConfig,
    'dev'         : DevelopmentConfig,
}

