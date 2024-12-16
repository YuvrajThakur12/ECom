from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Product
from .serializer import Productserializers
@api_view(['GET'])
def getProduct(request,pk = None):

    if not pk:
          data = Product.objects.all()
          serializers = Productserializers(data,many=True)
          return Response(serializers.data)


    item = Product.objects.get(id=pk)
    serializers = Productserializers(item)
    return Response(serializers.data)


@api_view(['POST'])
def setProduct(request):
    serializers = Productserializers(data=request.data)
    if serializers.is_valid():
        serializers.save()
        return Response(serializers.data)
    else:
        return Response({"errors": serializers.errors}, status=500)


@api_view(['DELETE','PUT'])        
def change(request,pk):
    item = Product.objects.get(id =pk)
    
    if request.method == 'DELETE':
        item.delete()
        return Response('item deleted')    


    elif request.method == 'PUT':
        item.name = request.data['name']
        item.description = request.data['description']
        item.price = request.data['price']
        item.category = request.data['category']
        image = request.data['image']

        print(item.image)
        
        if image != 'undefined':
            item.image = request.data['image']
        item.save()
        return Response('item updated')


@api_view(['PUT'])
def cartitems(request, pk):
    
    item = Product.objects.get(id=pk)
    
    if 'todo' in request.data:
        if request.data['todo'] == 'add':
            item.product_cartQuantity += 1
            item.save()
            return Response('+1')
    
        
        item.product_cartQuantity -= 1
        if not item.product_cartQuantity:
            item.product_isInCard = False
        item.save()
        return Response('-1')
    
    
   
    item.product_isInCard = request.data.get('product_isInCart')
    if item.product_isInCard:
        item.product_cartQuantity += 1
    else:
        item.product_isInCard = False
        item.product_cartQuantity = 0
    item.save()
    
    return Response('Item added to cart')   