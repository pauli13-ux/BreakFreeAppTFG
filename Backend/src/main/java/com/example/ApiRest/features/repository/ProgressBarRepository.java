package com.example.ApiRest.features.repository;

import com.example.ApiRest.features.model.ProgressBar;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface ProgressBarRepository extends JpaRepository<ProgressBar, Long> {
    Optional<ProgressBar> findByUserIdUser(Long userId);
}