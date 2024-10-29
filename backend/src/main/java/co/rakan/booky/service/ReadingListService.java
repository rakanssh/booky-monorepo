package co.rakan.booky.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import co.rakan.booky.model.ReadingList;
import co.rakan.booky.model.Book;

public interface ReadingListService {
    public ReadingList createReadingList(String name);
    public ReadingList addBookToReadingList(Long readingListId, Long bookId);
    public ReadingList removeBookFromReadingList(Long readingListId, Long bookId);
    public ReadingList getReadingList(Long id);
    public Page<ReadingList> getReadingLists(Pageable p);
    public Page<Book> getReadingListBooks(Long id, Pageable p);
}
