package co.rakan.booky.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import co.rakan.booky.model.Book;

public interface BookRepository extends JpaRepository<Book, Long> {

}
