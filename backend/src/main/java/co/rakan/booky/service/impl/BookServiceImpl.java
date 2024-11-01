package co.rakan.booky.service.impl;

import co.rakan.booky.service.BookService;
import co.rakan.booky.repository.BookRepository;

import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import java.util.Collections;
import java.util.ArrayList;
import java.util.Optional;

import co.rakan.booky.model.Author;
import co.rakan.booky.model.Book;
import co.rakan.booky.model.ReadingList;
import co.rakan.booky.repository.AuthorRepository;
import co.rakan.booky.repository.ReadingListRepository;
import co.rakan.booky.dto.BookDTO;
import co.rakan.booky.dto.OpenLibraryAuthorResponse;
import co.rakan.booky.dto.OpenLibraryBookResponse;

import reactor.netty.http.client.HttpClient;
import org.springframework.http.client.reactive.ReactorClientHttpConnector;
import org.springframework.web.reactive.function.client.WebClientResponseException;
@Service
public class BookServiceImpl implements BookService {
    private static final String OPEN_LIBRARY_BASE_URL = "https://openlibrary.org/";

    private final BookRepository bookRepository;
    private final AuthorRepository authorRepository;
    private final ReadingListRepository readingListRepository;
    private final WebClient webClient;

    public BookServiceImpl(BookRepository bookRepository, AuthorRepository authorRepository, ReadingListRepository readingListRepository, WebClient.Builder webClientBuilder) {
        this.bookRepository = bookRepository;
        this.authorRepository = authorRepository;
        this.readingListRepository = readingListRepository;
        this.webClient = webClientBuilder
            .baseUrl(OPEN_LIBRARY_BASE_URL)
            .clientConnector(new ReactorClientHttpConnector(HttpClient.create()
                .followRedirect(true)))  
            .build();
    }

    @Override
    public Page<BookDTO> getAllBooks(Pageable p) {
        return bookRepository.findAll(p).map(
            book -> {
                BookDTO bookDTO = new BookDTO(book);
                return bookDTO;
            }
        );
    }   

    @Override
    public Book addBookWithAuthorsByIsbn(String isbn) {
        Optional<Book> book = bookRepository.findByIsbn(isbn);
        if(book.isPresent()) {
            return book.get();
        }
        OpenLibraryBookResponse bookResponse = getBookByIsbn(isbn); 
        Book newBook = new Book(); 
        newBook.setTitle(bookResponse.getTitle());
        newBook.setPagesNo(bookResponse.getNumber_of_pages());
        newBook.setIsbn(isbn);
        newBook.setAuthors(new ArrayList<>());
        
        for (OpenLibraryBookResponse.AuthorReference authorReference : bookResponse.getAuthors()) {
            Optional<Author> author = authorRepository.findByOlid(authorReference.getKey());
            if(author.isPresent()) {
                newBook.getAuthors().add(author.get());
            }else{
                OpenLibraryAuthorResponse authorResponse = getAuthorByKey(authorReference.getKey());
                Author newAuthor = new Author();
                newAuthor.setName(authorResponse.getName());
                newAuthor.setOlid(authorReference.getKey());
                authorRepository.save(newAuthor);
                newBook.getAuthors().add(newAuthor);
            }
        }
        bookRepository.save(newBook);
        return newBook;
    }

    @Override
    public Page<BookDTO> getAllBooksWithListStatus(Pageable p, Long readingListId) {
        Page<Book> books = bookRepository.findAll(p);
        ReadingList readingList = readingListRepository.findById(readingListId)
            .orElseThrow(() -> new Error("Reading list not found"));
        Page<BookDTO> bookDTOs = books.map(book -> {
            BookDTO bookDTO = new BookDTO(book);
            bookDTO.setInReadingList(readingList.getBooks().contains(book));
            return bookDTO;
        });
        return bookDTOs;
    }

    private OpenLibraryBookResponse getBookByIsbn(String isbn) {
        String url = "/isbn/" + isbn;
        try{
        return webClient.get()
            .uri(url)
            .headers(headers -> headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON)))
            .retrieve()
            .bodyToMono(OpenLibraryBookResponse.class)
            .block();
        } catch(WebClientResponseException.NotFound e){
            throw new Error("ISBN not found");
        }
    }

    private OpenLibraryAuthorResponse getAuthorByKey(String key) {
        return webClient.get()
            .uri(key)
            .headers(headers -> headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON)))
            .retrieve()
            .bodyToMono(OpenLibraryAuthorResponse.class)
            .block();
    }
}
