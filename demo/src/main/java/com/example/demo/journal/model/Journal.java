package com.example.demo.journal.model;

import com.example.demo.user.model.User;
import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "journals")
public class Journal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idJournal;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;

    @Column(nullable = false)
    private LocalDate date;

    private String mood;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_user", nullable = false)
    private User user;

    public Journal() {
    }

    public Long getIdJournal() {
        return idJournal;
    }

    public void setIdJournal(Long idJournal) {
        this.idJournal = idJournal;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getMood() {
        return mood;
    }

    public void setMood(String mood) {
        this.mood = mood;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}