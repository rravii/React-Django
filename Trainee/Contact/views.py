from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from .models import Contact
from .serializers import ContactSerializer

# Create your views here.
class ContactApiViewGetAll(APIView):

    '''
        List all the contact us list
    '''
    def get(self, request,*args,**kwargs):
        contact = Contact.objects.all()
        serializer = ContactSerializer(contact,many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class ContactApiViewPost(APIView):
    def post(self, request, *args, **kwargs):
        '''
        Create the Contact
        '''
        data = {
            'fullname': request.data.get('fullname'),
            'email': request.data.get('email'),
            'phone_no': request.data.get('phone_no'),
            'message': request.data.get('message')
        }
        serializer = ContactSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ContactApiViewGetParticular(APIView):
    def get_object(self, contact_id):
        '''
        Helper method to get the object with given contact_id
        '''
        try:
            return Contact.objects.get(id=contact_id)
        except Contact.DoesNotExist:
            return None

    def get(self, request, contact_id, *args, **kwargs):
        '''
        Retrieves the contact with given contact_id
        '''
        contact_instance = self.get_object(contact_id)
        if not contact_instance:
            return Response(
                {"res": "Object with contact id does not exists"},
                status=status.HTTP_400_BAD_REQUEST
            )

        serializer = ContactSerializer(contact_instance)
        return Response(serializer.data, status=status.HTTP_200_OK)

class ContactApiView(APIView):
    def delete(self, request,contact_id): 
        try:
            Contact.objects.get(id=contact_id).delete()
            return Response(
                {"res": "Deleted"},

                status = status.HTTP_200_OK
            )
        except Contact.DoesNotExist:
            return None

    def get_object(self, contact_id):
        '''
        Helper method to get the object with given contact_id
        '''
        try:
            return Contact.objects.get(id=contact_id)
        except Contact.DoesNotExist:
            return None

    def put(self, request, contact_id, *args, **kwargs):
        '''
        Updates the contact item with given contact_id if exists
        '''
        contact_instance = self.get_object(contact_id)
        if not contact_instance:
            return Response(
                {"res": "Object with contact id does not exists"}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        data = {
            'fullname': request.data.get('fullname'),
            'email': request.data.get('email'),
            'phone_no': request.data.get('phone_no'),
            'message': request.data.get('message')
        }
        serializer = ContactSerializer(instance = contact_instance, data=data, partial = True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ContactApiViewDelete(APIView):
    def get_object(self, contact_id):
        '''
        Helper method to get the object with given contact_id
        '''
        try:
            return Contact.objects.get(id=contact_id)
        except Contact.DoesNotExist:
            return None
            
    def delete(self, request, contact_id, *args, **kwargs):
        '''
        Deletes the contact item with given contact_id if exists
        '''
        contact_instance = self.get_object(contact_id)
        if not contact_instance:
            return Response(
                {"res": "Object with contact id does not exists"}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        contact_instance.delete()
        return Response(
            {"res": "Object deleted!"},
            status=status.HTTP_200_OK
        )
