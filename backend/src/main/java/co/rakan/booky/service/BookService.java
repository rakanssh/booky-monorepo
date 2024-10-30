package co.rakan.booky.service;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import co.rakan.booky.model.Book;
import co.rakan.booky.dto.BookDTO;

public interface BookService {
    public Book addBookWithAuthorsByIsbn(String isbn);
    public Page<BookDTO> getAllBooks(Pageable p);
    public Page<BookDTO> getAllBooksWithListStatus(Pageable p, Long readingListId);
}
