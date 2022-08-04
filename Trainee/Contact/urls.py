from .views import ContactApiViewGetAll,ContactApiViewGetParticular,ContactApiViewPost,ContactApiView
from django.urls import path

urlpatterns = [
    path('api/contact-post/', ContactApiViewPost.as_view(), name='contactpost'),
    path('api/contact-get-all/', ContactApiViewGetAll.as_view(), name='contactgetall'),
    path('api/contact-get-particular/<contact_id>', ContactApiViewGetParticular.as_view(), name='contactgetparticular'),
    path('api/contact/<contact_id>', ContactApiView.as_view(), name='contactupdateanddelete'),
]