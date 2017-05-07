from rest_framework import permissions
from rest_framework import serializers
from rest_framework import viewsets

from application.api import router
from core.api import UserSerializer
from like.models import Like
from ugc.api import PostSerializer
from ugc.models import Post


class ContentObjectRelatedField(serializers.RelatedField):
    def to_representation(self, value):
        if isinstance(value, Post):
            serializer = PostSerializer(value)
        else:
            raise Exception("Unexpected type of object")
        return serializer.data


class LikeSerializer(serializers.ModelSerializer):
    author = UserSerializer
    target = ContentObjectRelatedField

    class Meta:
        model = Like
        fields = ['author', 'target']


class LikeViewSet(viewsets.ModelViewSet):
    queryset = Like.objects.all()
    serializer_class = LikeSerializer
    permission_classes = permissions.IsAuthenticated,

    def get_queryset(self):
        qs = super().get_queryset()
        if self.request.query_params.get('like'):
            qs = qs.filter(object_id=self.request.query_params.get('like'))

        return qs

router.register(r'likes', LikeViewSet, 'likes')
