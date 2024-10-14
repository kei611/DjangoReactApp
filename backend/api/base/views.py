from rest_framework.response import Response
from rest_framework.views import APIView
from .products import products


class Backend(APIView):
    def get(self, request, format=None):
        return Response({"message": "backend"})

class ProductView(APIView):
    def get_objects(self, ):
        return Response(products)

    def get(self, request, pk=None, format=None):
        if pk is None:
            return Response(products)
        else:
            product = None
            for i in products:
                # if i['_id'] == pk:
                if i['slug'] == pk:
                    product = i
                    break
            return Response(product)

    # def get(self, request, format=None):
    #     """
    #    商品の一覧を取得する
    #     """
    #     return Response(products)
