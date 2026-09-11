package com.example.demo.repository;

import com.example.demo.model.FlashCard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface FlashCardRepository extends JpaRepository<FlashCard, Long> {

    @Query("SELECT DISTINCT f.category FROM FlashCard f")
    List<String> findAllCategories();

    List<FlashCard> findByCategory(String category);
}
