# Generated by Django 5.1.4 on 2024-12-16 12:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ApiView', '0003_product_category_product_product_cartquantity_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='price',
            field=models.FloatField(default=0),
        ),
    ]
