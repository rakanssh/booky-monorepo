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
    // Book covers can be derived from ISBN, likely unnecessary to store this.
    // @Column(name = "cover_url")
    // private String coverUrl;
    @ManyToMany
    @JoinTable(
        name = "book_author",
        joinColumns = @JoinColumn(name = "book_id"),
        inverseJoinColumns = @JoinColumn(name = "author_id")
    )
    private List<Author> authors;
    @ManyToMany(mappedBy = "books")
    private List<ReadingList> readingLists;
}
