package com.example.ApiRest.features.model;

import com.example.ApiRest.user.model.User;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class DailyTask {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String completedDay;
    private String habit;
    private String task;
    private String day;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false) // Many tasks belong to 1 User
    private User user;
}