package co.rakan.booky.service.impl;

import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import co.rakan.booky.service.ReadingListService;
import co.rakan.booky.model.ReadingList;
import co.rakan.booky.repository.ReadingListRepository;
import co.rakan.booky.repository.BookRepository;
import co.rakan.booky.model.Book;

@Service
public class ReadingListServiceImpl implements ReadingListService {

    private final ReadingListRepository readingListRepository;
    private final BookRepository bookRepository;

    public ReadingListServiceImpl(ReadingListRepository readingListRepository, BookRepository bookRepository) {
        this.readingListRepository = readingListRepository;
        this.bookRepository = bookRepository;
    }

    @Override
    public ReadingList createReadingList(String name) {
        ReadingList newReadingList = new ReadingList();
        newReadingList.setName(name);
        return readingListRepository.save(newReadingList);
    }

    @Override
    public Page<ReadingList> getReadingLists(Pageable p) {
        return readingListRepository.findAll(p);
    }

    @Override
    public ReadingList addBookToReadingList(Long readingListId, Long bookId) {
        ReadingList readingList = readingListRepository.findById(readingListId)
            .orElseThrow(() -> new RuntimeException("Reading list not found"));
        Book book = bookRepository.findById(bookId)
            .orElseThrow(() -> new RuntimeException("Book not found"));
        readingList.getBooks().add(book);
        return readingListRepository.save(readingList);
    }

    @Override
    public Page<Book> getReadingListBooks(Long readingListId, Pageable p) {
        return bookRepository.findByReadingListId(readingListId, p);
    }

    @Override
    public ReadingList removeBookFromReadingList(Long readingListId, Long bookId) {
        ReadingList readingList = readingListRepository.findById(readingListId)
            .orElseThrow(() -> new RuntimeException("Reading list not found"));
        Book book = bookRepository.findById(bookId)
            .orElseThrow(() -> new RuntimeException("Book not found"));
        readingList.getBooks().remove(book);
        return readingListRepository.save(readingList);
    }

    @Override
    public ReadingList getReadingList(Long id) {
        return readingListRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Reading list not found"));
    }

    @Override
    public void deleteReadingList(Long id) {
        readingListRepository.deleteById(id);
    }

}
