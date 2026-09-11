package com.example.demo.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class FlashCard {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String category;
    private String question;
    private String answer;

    private LocalDateTime createAt;
    private LocalDateTime lastAnsweredAt = null;

    @Enumerated(EnumType.STRING)
    private LastAnsweredStatus lastAnsweredStatus = null;

    private boolean onCooldown = false;
    private LocalDateTime coolDownEndTime = null;
}
