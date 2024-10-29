package co.rakan.booky.controller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import co.rakan.booky.model.Book;
import co.rakan.booky.model.ReadingList;
import co.rakan.booky.service.ReadingListService;
import co.rakan.booky.dto.CreateReadingListRequest;
import co.rakan.booky.dto.ReadingListBookRequest;

@RestController
@RequestMapping("/api/reading-lists")
@CrossOrigin(origins = "*") 
public class ReadingListController {
    private final ReadingListService readingListService;

    public ReadingListController(ReadingListService readingListService) {
        this.readingListService = readingListService;
    }

    @GetMapping
    public Page<ReadingList> getReadingLists(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {
        return readingListService.getReadingLists(PageRequest.of(page, size));
    }

    @GetMapping("/{id}")
    public ReadingList getReadingList(@PathVariable Long id) {
        return readingListService.getReadingList(id);
    }

    @GetMapping("/{id}/books")
    public Page<Book> getReadingListBooks(@PathVariable Long id, @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {
        return readingListService.getReadingListBooks(id, PageRequest.of(page, size));
    }

    @PatchMapping("/{id}/books")
    public ReadingList addBookToReadingList(@PathVariable Long id, @RequestBody ReadingListBookRequest request) {
        return readingListService.addBookToReadingList  (id, request.getBookId());
    }

    @DeleteMapping("/{id}/books")
    public ReadingList removeBookFromReadingList(@PathVariable Long id, @RequestBody ReadingListBookRequest request) {
        return readingListService.removeBookFromReadingList(id, request.getBookId());
    }

    @PostMapping
    public ReadingList createReadingList(@RequestBody CreateReadingListRequest request) {
        return readingListService.createReadingList(request.getName());
    }
}
