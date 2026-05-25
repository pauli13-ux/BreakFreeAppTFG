package com.example.ApiRest.features.model;

import com.example.ApiRest.user.model.User;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Formulary {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String timeGoal;
    private String habit;
    private String levelDifficulty;

    @OneToOne
    @JoinColumn(name = "user_id") // Links to User (1 to 1)
    private User user;
}