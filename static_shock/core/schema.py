import graphene
from apps.supplier import schema 
import graphql_jwt

class Query(schema.Query, graphene.ObjectType):
    version = graphene.String(default_value = "v1.0")
    developer = graphene.String(default_value = "Renan")
    framework_back = graphene.String(default_value = "Django")
    framework_front = graphene.String(default_value = "React")


class Mutation(schema.Mutation, graphene.ObjectType):
    token_auth = graphql_jwt.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)