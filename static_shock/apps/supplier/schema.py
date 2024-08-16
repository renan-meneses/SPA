import graphene

from .models import Supplier
from graphene_django import DjangoObjectType

class SupplierType(DjangoObjectType):
        class Meta:
            model = Supplier
            fields = ('id','name','logo','state_of_origin','cost_per_kWh','minimum_kWh_limit','number_customers','average_customer_rating', 'created_at', 'updated_at')
class CreateSupplier(graphene.Mutation):
    supplier = graphene.t       
schema = graphene.Schema(query=SupplierType)