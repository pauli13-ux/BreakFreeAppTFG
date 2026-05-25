package com.example.features.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.features.model.Formulary;

public interface FormularyRepository extends JpaRepository<Formulary, String> {
}