package com.example.ApiRest.features.model;

import com.example.ApiRest.user.model.User;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
    @Column(name = "task_day") // Evita usar 'day' si es un nombre reservado, o especifica el nombre de la columna
    private String day;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false) // Many tasks belong to 1 User
    private User user;
}