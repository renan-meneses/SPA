# Generated by Django 5.1 on 2024-08-16 17:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("supplier", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="supplier",
            name="average_customer_rating",
            field=models.DecimalField(decimal_places=2, max_digits=3),
        ),
    ]
