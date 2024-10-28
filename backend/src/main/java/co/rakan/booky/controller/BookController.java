package co.rakan.booky.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import co.rakan.booky.service.BookService;
import co.rakan.booky.model.Book;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.CrossOrigin;
@RestController
@RequestMapping("/api/books")
@CrossOrigin(origins = "*") 
public class BookController {
    private final BookService bookService;

    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @PostMapping("/isbn/{isbn}")
    public Book addBookByIsbn(@PathVariable String isbn) {
        return bookService.addBookWithAuthorsByIsbn(isbn);
    }

}
