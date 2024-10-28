package co.rakan.booky.service;

import co.rakan.booky.model.Book;

public interface BookService {
    public Book addBookWithAuthorsByIsbn(String isbn);
}
