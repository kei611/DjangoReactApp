from rest_framework.response import Response
from rest_framework.views import APIView
from .products import products


class Backend(APIView):
    def get(self, request, format=None):
        return Response({"message": "backend"})

class ProductView(APIView):
    def get_objects(self, request, id=None, format=None):
        return Response(products)

    def get(self, request, pk=None, format=None):
        product = None
        for i in products:
            if i['_id'] == pk:
                product = i
                break
        return Response(product)

    def get(self, request, format=None):
        """
       商品の一覧を取得する
        """
        return Response(products)
