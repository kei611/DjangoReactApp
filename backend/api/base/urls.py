from django.urls import path
from . import views


urlpatterns = [
    path('backend/', views.Backend.as_view()),
    path('products/', views.ProductView.as_view()),
    path('products/<str:pk>/', views.ProductView.as_view()),
]
