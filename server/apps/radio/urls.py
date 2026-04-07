from django.urls import path
from .views import StartRecordingView, StopRecordingView, DownloadRecordingView

urlpatterns = [
    path("start/", StartRecordingView.as_view()),
    path("stop/", StopRecordingView.as_view()),
    path("download/<int:pk>/", DownloadRecordingView.as_view()),
]