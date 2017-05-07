from django.apps import AppConfig


class FeedConfig(AppConfig):
    name = 'feed'

    def ready(self):
        import feed.signals
        import feed.api