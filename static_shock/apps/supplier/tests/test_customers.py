from django.test import TestCase
from django.contrib.auth import get_user_model
from apps.supplier.models import Supplier, Customers

class CustomerMutationTestCase(TestCase):
    def setUp(self):
        self.user = get_user_model().objects.create_user(username='testuser', password='12345')
        self.supplier = Supplier.objects.create(
            name="Test Supplier",
            logo="logo.png",
            state_of_origin="State",
            cost_per_kWh=10.0,
            minimum_kWh_limit=100,
            number_customers=1,
            average_customer_rating=4.5
        )

    def test_create_customer_below_minimum_limit(self):
        with self.assertRaises(Exception) as context:
            Customers.objects.create(
                customer=self.user,
                supplier=self.supplier,
                monthly_consumption=50  
            )
        self.assertTrue("Monthly consumption must be at least" in str(context.exception))

    def test_create_customer_above_maximum_customers(self):
        Customers.objects.create(
            customer=self.user,
            supplier=self.supplier,
            monthly_consumption=150
        )

        with self.assertRaises(Exception) as context:
            Customers.objects.create(
                customer=self.user,
                supplier=self.supplier,
                monthly_consumption=200
            )
        self.assertTrue("Supplier has reached the maximum number of customers" in str(context.exception))
