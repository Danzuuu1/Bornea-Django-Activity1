from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'customers', views.CustomerViewSet, basename='customer')
router.register(r'products', views.ProductViewSet, basename='product')
router.register(r'orders', views.OrderViewSet, basename='order')
router.register(r'order-products', views.OrderProductViewSet, basename='orderproduct')

urlpatterns = [
    path('', include(router.urls)),
]
