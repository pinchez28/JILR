from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),

    # Replace Ellipsis with actual app urls
    path('api/radio/', include('apps.radio.urls')),
    path('api/gallery/', include('apps.gallery.urls')),
    path('api/prophecies/', include('apps.prophecies.urls')),
    path('api/teachings/', include('apps.teachings.urls')),
    path('api/testimonies/', include('apps.testimonies.urls')),
    path('api/programs/', include('apps.programs.urls')),
    path('api/events/', include('apps.events.urls')),

]

# Serve media files in debug mode
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)