from django.utils import timezone
from rest_framework import permissions
from rest_framework import serializers
from rest_framework import viewsets

from application.api import router, IsOwnerOrReadOnly
from friendship.models import Subscription
from .models import Post, Comment


class PostSerializer(serializers.ModelSerializer):
    author = serializers.ReadOnlyField(source='author.id')
    title = serializers.CharField(max_length=50, allow_blank=False)
    text = serializers.CharField(max_length=1024, allow_blank=False)
    likes_count = serializers.SerializerMethodField()

    def get_likes_count(self, obj):
        return obj.likes.count()

    class Meta:
        model = Post
        fields = ('id', 'author', 'title', 'text', 'image', 'created', 'likes_count')


class CommentSerializer(serializers.ModelSerializer):
    author = serializers.ReadOnlyField(source='author.id')
    target = serializers.PrimaryKeyRelatedField(queryset=Post.objects.all())

    class Meta:
        model = Comment
        fields = ('id', 'author', 'text', 'target')


class PostViewSet(viewsets.ModelViewSet):
    serializer_class = PostSerializer
    queryset = Post.objects.all()
    permission_classes = (permissions.IsAuthenticated, IsOwnerOrReadOnly)

    def perform_create(self, serializer):
        serializer.save(author=self.request.user, created=timezone.now())

    def get_queryset(self):
        qs = super().get_queryset().select_related('author')
        if self.request.query_params.get('user') and \
                Subscription.objects.filter(author=self.request.user,
                                            target=self.request.query_params.get('user')).exists():
            qs = qs.filter(author=self.request.query_params.get('user'))
        else:
            qs = qs.filter(author=self.request.user)
        return qs


class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    def get_queryset(self):
        qs = super().get_queryset().select_related('target')
        if 'post' in self.request.query_params:
            qs = qs.filter(target=self.request.query_params['post'])
        else:
            qs.none()
        return qs


router.register(r'posts', PostViewSet, 'posts')
router.register(r'comments',CommentViewSet, 'comments')
