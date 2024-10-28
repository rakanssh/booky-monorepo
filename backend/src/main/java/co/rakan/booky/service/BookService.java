package co.rakan.booky.service;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import co.rakan.booky.model.Book;

public interface BookService {
    public Book addBookWithAuthorsByIsbn(String isbn);
    public Page<Book> getAllBooks(Pageable p);
}
