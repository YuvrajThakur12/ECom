from django.urls import path
from . import views

urlpatterns = [
    path('getProduct/<int:pk>/', views.getProduct, name='getProduct'),
    path('setProduct/', views.setProduct, name='setProduct'),
    path('change/<int:pk>/', views.change, name='change'),
    path('cartitems/<int:pk>/', views.cartitems, name='cartitems'),
]
