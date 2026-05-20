package main.java.com.example.ApiRest.journal.model;

import java.time.LocalDate;

import com.example.project.user.model.User;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Journal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate fecha; // Maps to your handwritten 'fecha' attribute
    
    @Column(columnDefinition = "TEXT") // Allows long-form writing instead of a short string
    private String entry;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false) // Many journal entries belong to 1 User
    private User user;
}