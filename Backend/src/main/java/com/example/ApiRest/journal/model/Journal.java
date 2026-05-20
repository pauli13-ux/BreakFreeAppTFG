package com.example.ApiRest.journal.model; // 1. Removed 'main.java.' and used ApiRest

import java.time.LocalDate;
import com.example.ApiRest.user.model.User; // 2. Fixed import to match ApiRest package

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Journal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate fecha; 
    
    @Column(columnDefinition = "TEXT") 
    private String entry;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false) 
    private User user;
}