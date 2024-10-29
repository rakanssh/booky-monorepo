package co.rakan.booky.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.JoinTable;
import jakarta.persistence.JoinColumn;
import java.util.List;
import lombok.Data;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonProperty;

@Data
@Entity
@Table(name = "reading_lists")
public class ReadingList {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    @ManyToMany
    @JoinTable(
        name = "reading_list_book",
        joinColumns = @JoinColumn(name = "reading_list_id"),
        inverseJoinColumns = @JoinColumn(name = "book_id")
    )
    @JsonBackReference
    private List<Book> books;

    @Transient
    @JsonProperty("bookCount")
    public int getBookCount() {
        return books != null ? books.size() : 0;
    }
}
