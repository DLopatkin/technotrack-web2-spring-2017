from django.apps import AppConfig


class UgcConfig(AppConfig):
    name = 'ugc'

    def ready(self):
        import ugc.api