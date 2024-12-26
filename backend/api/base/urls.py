from django.urls import path
from . import views


urlpatterns = [
    path('backend/', views.Backend.as_view()),
    path('categories/', views.CategoryView.as_view()),
    path('products/', views.ProductView.as_view()),
    path('products/<str:pk>/', views.ProductView.as_view()),
    path('session/', views.CheckoutView.as_view()),
    path('variations/', views.VariationView.as_view()),
    path('variations/<str:pk>/', views.VariationView.as_view()),
    path('productImages/<str:pk>/', views.ProductGalleryView.as_view()),
    path('order/<str:pk>/', views.OrderView.as_view()),
    path('webhook', views.stripe_webhook),
]
