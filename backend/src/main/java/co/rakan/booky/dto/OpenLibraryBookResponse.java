package co.rakan.booky.dto;
    
import java.util.List;
import lombok.Data;

@Data
public class OpenLibraryBookResponse {
    private int number_of_pages;
    private String title;
    private List<AuthorReference> authors;
    @Data
    public static class AuthorReference {
        private String key;
    }
}

