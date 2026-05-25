package com.example.features.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

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
}