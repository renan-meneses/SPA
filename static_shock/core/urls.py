from django.contrib import admin
from django.urls import path
from graphene_django.views import GraphQLView
urlpatterns = [
    path("conmander/", admin.site.urls),
    path("graphql/", GraphQLView.as_view(graphiql=True))
]
