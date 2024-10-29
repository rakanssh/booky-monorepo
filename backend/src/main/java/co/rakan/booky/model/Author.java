package co.rakan.booky.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Column;
import jakarta.persistence.Table;
import jakarta.persistence.ManyToMany;
import java.util.List;
import lombok.Data;
import com.fasterxml.jackson.annotation.JsonBackReference;
@Data
@Entity
@Table(name = "authors")
public class Author {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "name")
    private String name;
    @Column(name = "olid")
    private String olid;
    @ManyToMany(mappedBy = "authors")
    @JsonBackReference
    private List<Book> books;
}   
