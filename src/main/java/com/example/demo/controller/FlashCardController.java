package com.example.demo.controller;

import com.example.demo.model.FlashCard;
import com.example.demo.repository.FlashCardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/flashcard")
@RequiredArgsConstructor
public class FlashCardController {

    private final FlashCardRepository repository;

    @GetMapping
    public List<FlashCard> getAll() {
        return repository.findAll();
    }

    @PostMapping
    public ResponseEntity<FlashCard> create(@RequestBody FlashCard flashCard) {
        FlashCard savedCard = repository.save(flashCard);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedCard);
    }
}
