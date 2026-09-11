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
        // Feature: input validation - reject bad JSON content with 400
        if (flashCard.getQuestion() == null || flashCard.getQuestion().isBlank()
                || flashCard.getAnswer() == null || flashCard.getAnswer().isBlank()
                || flashCard.getCategory() == null || flashCard.getCategory().isBlank()) {
            throw new IllegalArgumentException("Question, answer and category are required.");
        }
        FlashCard savedCard = repository.save(flashCard);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedCard);
    }

    @PutMapping("/{id}")
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

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!repository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        repository.deleteById(id);

        return ResponseEntity.noContent().build();
    }

    @GetMapping("/categories")
    public List<String> getAllCategories() {
        return repository.findAllCategories();
    }

    @GetMapping("/category/{category}")
    public List<FlashCard> getByCategory(@PathVariable String category) {
        return repository.findByCategory(category);
    }
}
