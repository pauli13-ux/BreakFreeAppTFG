package com.example.ApiRest.features.repository;

import com.example.ApiRest.features.model.Formulary;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface FormularyRepository extends JpaRepository<Formulary, Long> {
    Optional<Formulary> findByUserIdUser(Long userId);
}