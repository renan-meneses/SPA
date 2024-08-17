import uuid
import graphene
from graphene_django import DjangoObjectType
from graphql_jwt.decorators import login_required
from django.contrib.auth import get_user_model
from graphene_file_upload.scalars import Upload
from .models import Supplier

class SupplierType(DjangoObjectType):
    class Meta:
        model = Supplier

class UserType(DjangoObjectType):  # Corrigido para DjangoObjectType
    class Meta:
        model = get_user_model()

class Query(graphene.ObjectType):
    supplier = graphene.List(SupplierType, id=graphene.UUID())  # Tipo corrigido para SupplierType
    user = graphene.Field(UserType)

    @login_required
    def resolve_supplier(self, info, id=None):  # Nome do resolvedor corrigido
        user = info.context.user
        if id:
            return Supplier.objects.filter(id=id)
        return Supplier.objects.all().order_by("average_customer_rating")

    @login_required
    def resolve_user(self, info):
        user = info.context.user
        if user.is_anonymous:
            raise Exception("Login Required")
        return user

class CreateSupplier(graphene.Mutation):
    supplier = graphene.Field(SupplierType)
    
    class Arguments:
        name = graphene.String(required=True)
        logo = Upload(required=True)
        state_of_origin = graphene.String(required=True)
        cost_per_kWh = graphene.Float(required=True)
        minimum_kWh_limit = graphene.Int(required=True)
        number_customers = graphene.Int(required=True)
        average_customer_rating = graphene.Float(required=True)

    @login_required
    def mutate(self, info, **kwargs):
        user = info.context.user
        if user.is_anonymous:
            raise Exception("Not Logged in")
        
        supplier = Supplier(**kwargs)
        supplier.save()
        return CreateSupplier(supplier=supplier)

class UpdateSupplier(graphene.Mutation):
    supplier = graphene.Field(SupplierType)
    
    class Arguments:
        id = graphene.UUID(required=True)  # Adicionado ID como argumento necessário
        name = graphene.String()
        logo = Upload()
        state_of_origin = graphene.String()
        cost_per_kWh = graphene.Float()
        minimum_kWh_limit = graphene.Int()
        number_customers = graphene.Int()
        average_customer_rating = graphene.Float()

    @login_required
    def mutate(self, info, id, **kwargs):
        user = info.context.user
        if user.is_anonymous:
            raise Exception("Not Logged in")
        
        supplier = Supplier.objects.get(id=id)
        for key, value in kwargs.items():
            setattr(supplier, key, value)
        supplier.save()

        return UpdateSupplier(supplier=supplier)

class DeleteSupplier(graphene.Mutation):  # Corrigido o nome da mutação
    message = graphene.String()

    class Arguments:
        id = graphene.UUID(required=True)

    @login_required
    def mutate(self, info, id):
        user = info.context.user
        supplier = Supplier.objects.get(id=id)
        supplier.delete()
        return DeleteSupplier(message=f"Supplier with ID {id} deleted")

class CreateUser(graphene.Mutation):
    user = graphene.Field(UserType)

    class Arguments:
        username = graphene.String(required=True)
        password = graphene.String(required=True)

    def mutate(self, info, username, password):
        user = get_user_model()(username=username)
        user.set_password(password)
        user.save()
        return CreateUser(user=user)

class Mutation(graphene.ObjectType):
    create_supplier = CreateSupplier.Field()
    update_supplier = UpdateSupplier.Field()
    delete_supplier = DeleteSupplier.Field()
    create_user = CreateUser.Field()
