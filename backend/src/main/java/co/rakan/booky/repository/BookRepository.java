package co.rakan.booky.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import co.rakan.booky.model.Book;

public interface BookRepository extends JpaRepository<Book, Long> {
    Optional<Book> findByIsbn(String isbn);
    
    @Query("SELECT b FROM Book b JOIN b.readingLists rl WHERE rl.id = :readingListId")
    Page<Book> findByReadingListId(@Param("readingListId") Long readingListId, Pageable pageable);
}
