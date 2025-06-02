from django.db import models


class Author(models.Model):
    name = models.CharField(max_length=100)
    birth_date = models.DateField()
    biography = models.TextField(blank=True)

    def __str__(self):
        return self.name


class Book(models.Model):
    GENRE_CHOICES = [
        ('FIC', 'Fiction'),
        ('NF', 'Non-Fiction'),
        ('SC', 'Science'),
        ('FA', 'Fantasy'),
        ('MY', 'Mystery'),
    ]

    title = models.CharField(max_length=200)
    author = models.ForeignKey(Author, on_delete=models.CASCADE, related_name='books')
    published_date = models.DateField()
    genre = models.CharField(max_length=3, choices=GENRE_CHOICES)
    isbn = models.CharField(max_length=13, unique=True)
    available_copies = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"{self.title} by {self.author.name}"