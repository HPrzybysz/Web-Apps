from django.shortcuts import render, get_object_or_404, redirect
from .models import Author, Book, Author
from .forms import BookForm, AuthorForm

def author_list(request):
    authors = Author.objects.all().order_by('name')
    return render(request, 'books/author_list.html', {'authors': authors})

def book_list(request, author_id):
    author = get_object_or_404(Author, pk=author_id)
    books = author.books.all()
    return render(request, 'books/book_list.html', {'author': author, 'books': books})

def add_book(request):
    if request.method == 'POST':
        form = BookForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('books:author_list')
    else:
        form = BookForm()
    return render(request, 'books/add_book.html', {'form': form})

def add_author(request):
    if request.method == 'POST':
        form = AuthorForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('books:author_list')
    else:
        form = AuthorForm()
    return render(request, 'books/add_author.html', {'form': form})