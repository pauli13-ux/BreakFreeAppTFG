package com.example.ApiRest.user.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "users") // 'user' is a reserved keyword in H2/SQL, so 'users' avoids errors
@Data
public class User {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idUser;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(unique = true, nullable = false)
    private String gmail;

    @Column(nullable = false)
    private String password;

    private String habit;
}