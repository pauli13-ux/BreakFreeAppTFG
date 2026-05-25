package com.example.features.model;

import java.io.Serializable;
import lombok.Data;

// Composite Key for ProgressBar
@Data
public class ProgressBarId implements Serializable {
    private Long id_user;
    private String completed_days;
}