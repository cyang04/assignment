package com.example.demo.controller;

import com.example.demo.model.FlashCard;
import com.example.demo.repository.FlashCardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/flashcard")
@RequiredArgsConstructor
public class FlashCardController {

    private final FlashCardRepository repository;

    @GetMapping
    public List<FlashCard> getAll() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<FlashCard> getById(@PathVariable Long id) {
        Optional<FlashCard> flashCard = repository.findById(id);

        return flashCard.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<FlashCard> create(@RequestBody FlashCard flashCard) {
        FlashCard savedCard = repository.save(flashCard);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedCard);
    }

    @PutMapping("{id}")
    public ResponseEntity<FlashCard> update(@PathVariable Long id, @RequestBody FlashCard update) {
        Optional<FlashCard> existingCard = repository.findById(id);

        if (existingCard.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        FlashCard flashCard = existingCard.get();
        flashCard.setQuestion(update.getQuestion());
        flashCard.setAnswer(update.getAnswer());
        flashCard.setCategory(update.getCategory());

        FlashCard saved = repository.save(flashCard);
        return ResponseEntity.ok(saved);
    }
}
