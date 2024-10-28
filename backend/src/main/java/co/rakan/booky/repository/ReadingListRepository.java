package co.rakan.booky.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import co.rakan.booky.model.ReadingList;

public interface ReadingListRepository extends JpaRepository<ReadingList, Long> {
    
}
