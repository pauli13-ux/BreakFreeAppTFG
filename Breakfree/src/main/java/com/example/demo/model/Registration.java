package com.example.demo.model;

import jakarta.persistence.*;

@Entity
@Table(name = "registration")
public class Registration {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    public Registration() {
    }

    public Registration(String gmail, String password, String username, User user) {
        this.gmail = gmail;
        this.password = password;
        this.username = username;
        this.user = user;
    }

    @Override
    public String toString() {
        return "Registration [id=" + id + ", gmail=" + gmail + ", password=" + password + ", username=" + username
                + ", user=" + user + "]";
    }

    private String gmail;
    private String password;
    private String username;
    // en esta liena se estrablece la relacion entre login y user, un login tiene un
    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id_user")
    private User user;

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

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

}
