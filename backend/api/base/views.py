from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from .products import products
from .models import Product
from .serializers import ProductSerializer


class Backend(APIView):
    def get(self, request, format=None):
        return Response({"message": "backend"})

class ProductView(APIView):

    def get(self, request, pk=None, format=None):
        if pk is None:
            products = Product.objects.all()
            serializer = ProductSerializer(products, many=True)
            return Response(serializer.data, status.HTTP_200_OK)
        else:
            product = Product.objects.get(slug=pk)
            serializer = ProductSerializer(product, many=False)
            return Response(serializer.data)

