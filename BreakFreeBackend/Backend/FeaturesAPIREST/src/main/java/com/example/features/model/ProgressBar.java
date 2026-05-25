package com.example.features.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "percent_bar")
@IdClass(ProgressBarId.class)
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProgressBar {

    @Id
    private Long id_user;

    @Id
    private String completed_days;

    @Column(name = "time_goal")
    private String time_goal;
}