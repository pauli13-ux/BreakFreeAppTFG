package com.example.demo.model;

import jakarta.persistence.*;

@Entity
public class Login {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String gmail;
    private String password;
    // en esta liena se estrablece la relacion entre login y user, un login tiene un
    // user y un user tiene un login
    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id_user")
    private User user;

    // Constructors
    public Login() {
        // Empty constructor needed for JPA
    }

    public Login(String gmail, String password, User user) {
        this.gmail = gmail;
        this.password = password;
        this.user = user;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getGmail() {
        return gmail;
    }

    public void setGmail(String gmail) {
        this.gmail = gmail;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String toString() {
        return "Login [id=" + id + ", gmail=" + gmail + ", password=" + password + "]";
    }

    public void setUser(User user) {
        this.user = user;
    }

    public User getUser() {
        return user;
    }
}
