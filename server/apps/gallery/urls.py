from django.urls import path
from .views import GalleryListCreateView, GalleryRetrieveView

urlpatterns = [
    path('', GalleryListCreateView.as_view(), name='gallery-list'),
    path('<int:pk>/', GalleryRetrieveView.as_view(), name='gallery-detail'),
]