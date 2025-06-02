from django.urls import path
from . import views

app_name = 'books'
urlpatterns = [
    path('', views.author_list, name='author_list'),
    path('author/<int:author_id>/', views.book_list, name='book_list'),
    path('book/add/', views.add_book, name='add_book'),
    path('author/add/', views.add_author, name='add_author'),
    ]