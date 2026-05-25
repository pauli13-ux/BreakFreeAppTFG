package com.example.features.model;

import java.io.Serializable;
import lombok.Data;

// Composite Key for DailyTask
@Data
public class DailyTaskId implements Serializable {
    private Long id_user;
    private String habit;
    private String day_w;
}