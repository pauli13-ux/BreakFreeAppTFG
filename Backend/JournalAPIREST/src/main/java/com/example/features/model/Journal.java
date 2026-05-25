package com.example.features.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "journal")
@IdClass(JournalId.class)
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Journal {

    @Id
    private int id_user;

    @Id
    @Column(name = "journal_date")
    private String date;

    @Column(name = "journal_entry")
    private String entry;
}