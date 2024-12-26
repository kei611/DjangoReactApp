from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

import stripe
import datetime
import json

from .models import Product, ProductVariant, Category, ProductGallery, Order
from .serializers import ProductSerializer, ProductVariantSerializer, CategorySerializer, ProductGallerySerializer

from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.conf import settings

stripe.api_key="sk_test_51KpPxCBpT7ryj6PXw9gqGEVujrgWlv7tNnw8eHSvbXeDN4Psj359XLSt7c77o33T3wX4E4s09QpycS1Kt7Tm1G7U001VAlmwL3"


class Backend(APIView):
    def get(self, request, format=None):
        return Response({"message": "backend"})

class ProductGalleryView(APIView):
    def get(self, request, pk=None):
        product = Product.objects.get(slug=pk)
        productImages = ProductGallery.objects.filter(product=product)
        serializer = ProductGallerySerializer(productImages, many=True)
        return Response(serializer.data)

class CategoryView(APIView):
    def get(self, request):
        categories = Category.objects.all()
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data, status.HTTP_200_OK)

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

class VariationView(APIView):
    def get(self, request, pk=None):
        if pk is None:
            product_variants = ProductVariant.objects.all()
            serializer = ProductVariantSerializer(product_variants, many=True)
            return Response(serializer.data, status.HTTP_200_OK)
        else:
            product = Product.objects.get(slug=pk)
            # product = Product.objects.filter(slug=pk).first()
            # variation = Variation.objects.get(product=product)
            product_variants = ProductVariant.objects.filter(product=product)
            serializer = ProductVariantSerializer(product_variants, many=True)
            return Response(serializer.data)

class OrderView(APIView):
    def get(self, request, pk=None):
        order = Order.objects.get(slug=pk)
        serializer = OrderSerializer(order, many=False)
        return Response(serializer.data)

class CheckoutView(APIView):
    def post(self, request, *args, **kwargs):
        cartDetails = request.data
        lineItems = []
        metaData = {}
        for itemId in cartDetails:
            price = cartDetails[itemId]['price_id']
            quantity = cartDetails[itemId]['quantity']
            product_data = json.dumps(cartDetails[itemId]['product_data'])
            metaData[price] = product_data
            if price and quantity:
                lineItems.append({'price': price, 'quantity': quantity})

        print('-------debug-------')
        print(cartDetails)
        print(lineItems)
        print(metaData)

        session = stripe.checkout.Session.create(
            mode = 'payment',
            submit_type = 'pay',
            line_items = lineItems,
            success_url=f'https://example.com/success',
            cancel_url=f'https://example.com/cancel',
            metadata = metaData
            )

        # order = Order.objects.create(
        #     user = request.user,
        #     isPaid = False,
        #     stripe_id = session.id
        # )

        return Response(data={ 'sessionId' : session.id })

@csrf_exempt
def stripe_webhook(request):
    payload = request.body
    sig_header = request.META['HTTP_STRIPE_SIGNATURE']
    event = None

    # StripeのWebhook Secretを設定
    endpoint_secret = "whsec_a88282272a5207986d9cfd2515d32f1994b8011188e716d578a55fe6a47d9968"

    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, endpoint_secret
        )

    except ValueError as e:
        # 無効なペイロード
        return JsonResponse({'error': 'Invalid payload'}, status=400)
        # return HttpResponse(status=400)
    except stripe.error.SignatureVerificationError as e:
        # 無効な署名
        return JsonResponse({'error': 'Invalid signature'}, status=400)

    # イベントタイプに応じた処理
    if event['type'] == 'payment_intent.succeeded':
        payment_intent = event['data']['object']

        metadata = payment_intent["metadata"]
        print('決済が完了したのでここで決済処理をします！！！')
        print("決済の詳細情報→" + str(payment_intent))
        print("指定したメタデータの取り出し→" + str(metadata))
        # 決済履歴の更新
        # order = Order.objects.get(
        #     stripe_id=payment_intent['id']
        # )
        # order.isPaid = True
        # order.save()
        order = Order.objects.create(
            paidAt = datetime.datetime.fromtimestamp(payment_intent['created']),
            totalPrice = payment_intent['amount'],
            paymentMethod = payment_intent['payment_method_types'],
            isPaid = True,
            stripe_id = payment_intent['id']
        )

    elif event['type'] == 'payment_intent.payment_failed':
        payment_intent = event['data']['object']

        metadata = payment_intent["metadata"]
        print('決済失敗！！！')
        print("決済の詳細情報→" + str(payment_intent))
        print("指定したメタデータの取り出し→" + str(metadata))
        # 決済履歴の更新
        # payment_history = PaymentHistory.objects.get(
        #     stripe_payment_intent_id=payment_intent['id']
        # )
        # payment_history.status = 'failed'
        # payment_history.save()

    return JsonResponse({'status': 'success'})

