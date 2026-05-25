package com.example.features.service;

import java.util.List;
import com.example.features.model.Formulary;

public interface FormularyService {
    Formulary getFormularyByHabit(String habit);

    void saveFormulary(Formulary formulary);

    void updateFormulary(Formulary formulary);

    void deleteFormulary(String habit);

    List<Formulary> getAllFormularies();
}