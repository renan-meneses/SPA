from django.db import models
from apps.utils.base_model import BaseModel


#name, logo, state of origin, cost per kWh, minimum kWh limit, total number of customers and average customer rating
class Supplier(BaseModel):
    class State (models.TextChoices):
        AC = 'AC', 'Acre'
        AL = 'AL', 'Alagoas'
        AP = 'AP', 'Amapá'
        AM = 'AM', 'Amazonas'
        BA = 'BA', 'Bahia'
        CE = 'CE', 'Ceará'
        DF = 'DF', 'Distrito Federal'
        ES = 'ES', 'Espírito Santo'
        GO = 'GO', 'Goiás'
        MA = 'MA', 'Maranhão'
        MT = 'MT', 'Mato Grosso'
        MS = 'MS', 'Mato Grosso do Sul'
        MG = 'MG', 'Minas Gerais'
        PA = 'PA', 'Pará'
        PB = 'PB', 'Paraíba'
        PR = 'PR', 'Paraná'
        PE = 'PE', 'Pernambuco'
        PI = 'PI', 'Piauí'
        RJ = 'RJ', 'Rio de Janeiro'
        RN = 'RN', 'Rio Grande do Norte'
        RS = 'RS', 'Rio Grande do Sul'
        RO = 'RO', 'Rondônia'
        RR = 'RR', 'Roraima'
        SC = 'SC', 'Santa Catarina'
        SP = 'SP', 'São Paulo'
        SE = 'SE', 'Sergipe'
        TO = 'TO', 'Tocantins'


    name = models.CharField(max_length=60, blank=False)
    logo = models.FileField(null=True, blank=True, upload_to="logos/%Y/%m/%d")
    state_of_origin = models.CharField(max_length=2, choices=State.choices)
    cost_per_kWh = models.DecimalField(max_digits=4, decimal_places=2 , blank=False)
    minimum_kWh_limit = models.IntegerField(blank=False)
    number_customers = models.IntegerField(blank=False)
    average_customer_rating = models.DecimalField(max_digits=3, decimal_places=2)
    
    def __str__(self):
        return f"{self.name} -- {self.average_customer_rating} -- {self.number_customers}"
    class Meta:
        ordering = ["-average_customer_rating"]
