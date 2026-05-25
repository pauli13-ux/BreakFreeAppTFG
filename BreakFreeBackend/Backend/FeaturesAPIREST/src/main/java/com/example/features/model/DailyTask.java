package com.example.features.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "daily_task")
@IdClass(DailyTaskId.class) // Links the composite key class
@Data
@NoArgsConstructor // Generates the empty constructor automatically
@AllArgsConstructor // Generates the full constructor automatically
public class DailyTask {

    @Id
    private Long id_user;

    @Id
    private String habit;

    @Id
    @Column(name = "task_day") // Keeps H2 safe from the SQL reserved keyword 'day'
    private String day_w;

    private int completed_days;
    private String task;
}