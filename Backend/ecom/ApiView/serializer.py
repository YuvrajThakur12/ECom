from rest_framework import serializers
from ApiView.models import Product

class Productserializers(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'