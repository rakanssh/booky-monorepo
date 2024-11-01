package co.rakan.booky.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Column;
import java.util.List;
import lombok.Data;
import jakarta.persistence.JoinTable;
import jakarta.persistence.JoinColumn;  
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonBackReference;
@Data
@Entity
@Table(name = "books")
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "title")
    private String title;       
    @Column(name = "pages_no")
    private int pagesNo;
    @Column(name = "isbn", unique = true)
    private String isbn;
    // Book covers can be derived from ISBN, likely unnecessary to store this.
    // @Column(name = "cover_url")
    // private String coverUrl;
    @ManyToMany
    @JoinTable(
        name = "book_author",
        joinColumns = @JoinColumn(name = "book_id"),
        inverseJoinColumns = @JoinColumn(name = "author_id")
    )
    @JsonManagedReference
    private List<Author> authors;
    @ManyToMany(mappedBy = "books")
    @JsonBackReference
    private List<ReadingList> readingLists;

    public Book(Book book) {
        this.id = book.id;
        this.title = book.title;
        this.pagesNo = book.pagesNo;
        this.isbn = book.isbn;
        this.authors = book.authors;
    }

    public Book() {
    }
}
