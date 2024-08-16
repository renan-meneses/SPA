import graphene

class Query(graphene.ObjectType):
    version = graphene.String(default_value = "v1.0")
    developer = graphene.String(default_value = "Renan")
    framework_back = graphene.String(default_value = "Django")
    framework_front = graphene.String(default_value = "React")

schema = graphene.Schema(query=Query)