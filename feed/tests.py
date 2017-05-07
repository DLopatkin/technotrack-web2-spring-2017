from django.test import TestCase
from core.models import User
from feed.models import Event
from friendship.models import Friendship, Subscription
from ugc.models import Post


class TestEvent(TestCase):

    def setUp(self):
        self.User1 = User.objects.create(username='TestUser1', password='dsghfjhdsgfsgfjdasgfjdas')
        self.User2 = User.objects.create(username='TestUser2', password='sghdfhsgdfjagkkkogfajsgf')

    def testFriendShip(self):
        friendship = Friendship.objects.create(sender=self.User1, receiver=self.User2)
        friendship.save()
        friendship.status = True
        friendship.save()
        subscriptions = Subscription.objects.all()
        self.assertEqual(subscriptions.count(), 2)
        for subscription in subscriptions:
            self.assertEqual(subscription.event.exists(), True)
        self.assertEqual(subscriptions.first().get_description(), Event.objects.first().__str__())

    def testPostCreationEvent(self):
        post = Post.objects.create(author=self.User1, title='TestTest', description='hop-hey-la-la-lay')
        post.save()
        self.assertEqual(Event.objects.first().title, 'TestUser1 added post.')

    def tearDown(self):
        pass


