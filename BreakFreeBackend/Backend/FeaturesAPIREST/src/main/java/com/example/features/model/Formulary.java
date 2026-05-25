package com.example.features.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "formulary")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Formulary {

    @Id
    private String habit;

    @Column(name = "time_goal")
    private String time_goal;

    @Column(name = "level_difficulty")
    private String level_difficulty;

    @Column(name = "losses_value") // Adds the decimal column to our H2 database
    private double lossesValue;
}