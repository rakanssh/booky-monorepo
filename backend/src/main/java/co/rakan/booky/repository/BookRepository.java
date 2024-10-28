package co.rakan.booky.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

import co.rakan.booky.model.Book;

public interface BookRepository extends JpaRepository<Book, Long> {
    Optional<Book> findByIsbn(String isbn);
}
