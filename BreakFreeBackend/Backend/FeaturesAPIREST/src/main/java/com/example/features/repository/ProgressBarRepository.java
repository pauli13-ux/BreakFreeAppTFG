package com.example.features.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.features.model.ProgressBar;
import com.example.features.model.ProgressBarId;

public interface ProgressBarRepository extends JpaRepository<ProgressBar, ProgressBarId> {
}