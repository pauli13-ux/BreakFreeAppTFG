package com.example.demo.model;

import jakarta.persistence.*;

@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_user")
    private Long idUser;
    private String habit;
    private String username;

    public User() {
    }

    public User(String habit, String username) {
        this.habit = habit;
        this.username = username;
    }

    @Override
    public String toString() {
        return "User [idUser=" + idUser + ", habit=" + habit + ", username=" + username + "]";
    }

    public void setIdUser(Long idUser) {
        this.idUser = idUser;
    }

    public void setHabit(String habit) {
        this.habit = habit;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Long getIdUser() {
        return idUser;
    }

    public String getHabit() {
        return habit;
    }

    public String getUsername() {
        return username;
    }
}
