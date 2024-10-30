package co.rakan.booky.dto;

import co.rakan.booky.model.Book;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
public class BookDTO extends Book {
    private boolean inReadingList;

    public BookDTO(Book book) {
        super(book);
    }
}
