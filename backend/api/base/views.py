from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

import stripe

from .products import products
from .models import Product
from .serializers import ProductSerializer

stripe.api_key="sk_test_51KpPxCBpT7ryj6PXw9gqGEVujrgWlv7tNnw8eHSvbXeDN4Psj359XLSt7c77o33T3wX4E4s09QpycS1Kt7Tm1G7U001VAlmwL3"


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

class CheckoutView(APIView):
    def post(self, request, *args, **kwargs):
        cartDetails = request.data
        lineItems = []
        for itemId in cartDetails:
            price = cartDetails[itemId]['price_id']
            quantity = cartDetails[itemId]['quantity']
            if price and quantity:
                lineItems.append({'price': price, 'quantity': quantity})

        print('-------debug-------')
        print(cartDetails)
        print(lineItems)

        session = stripe.checkout.Session.create(
            mode = 'payment',
            submit_type = 'pay',
            line_items = lineItems,
            success_url=f'https://example.com/success',
            cancel_url=f'https://example.com/cancel',
            )
        return Response(data={ 'sessionId' : session.id })

