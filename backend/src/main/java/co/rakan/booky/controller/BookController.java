package co.rakan.booky.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import co.rakan.booky.service.BookService;
import co.rakan.booky.model.Book;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
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

    @GetMapping
    public Page<Book> getAllBooks(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {
        return bookService.getAllBooks(PageRequest.of(page, size));
    }

}
