package com.example.ApiRest.features.model;

import com.example.ApiRest.user.model.User;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class ProgressBar {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String completedDay;
    private String timeGoal;

    @OneToOne
    @JoinColumn(name = "user_id") // Links to User (1 to 1)
    private User user;
}