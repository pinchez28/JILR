from django.contrib import admin
from .models import Prophecy, Fulfillment


class FulfillmentInline(admin.TabularInline):
    model = Fulfillment
    extra = 1


@admin.register(Prophecy)
class ProphecyAdmin(admin.ModelAdmin):
    list_display = ('title', 'created_at')
    inlines = [FulfillmentInline]


@admin.register(Fulfillment)
class FulfillmentAdmin(admin.ModelAdmin):
    list_display = ('prophecy', 'created_at')