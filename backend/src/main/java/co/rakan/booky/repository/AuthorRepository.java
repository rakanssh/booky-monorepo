package co.rakan.booky.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import co.rakan.booky.model.Author;

public interface AuthorRepository extends JpaRepository<Author, Long> {
    Optional<Author> findByOlid(String olid);
}
