import os
basedir = os.path.abspath(os.path.dirname(__file__))


class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY')
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

