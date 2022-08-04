from django.db import models

# Create your models here.
class Contact(models.Model):
    fullname= models.CharField(max_length=200)
    message= models.TextField()
    phone_no= models.CharField(max_length=10)
    email= models.EmailField()

    def __str__(self):
        return self.fullname
    