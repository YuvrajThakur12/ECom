from django.db import models

# Create your models here.
class Product(models.Model):
    image = models.ImageField(upload_to='product_images/', null=True, blank=True)
    name = models.CharField(max_length=100)
    description = models.TextField()
    price = models.FloatField(default = 0)
    category = models.CharField(max_length=100, null=True, blank=True)
    product_isInCard = models.BooleanField(default=False)
    product_cartQuantity = models.IntegerField(default=0)

