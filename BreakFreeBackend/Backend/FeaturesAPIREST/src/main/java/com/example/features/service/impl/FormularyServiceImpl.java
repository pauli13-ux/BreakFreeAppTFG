package com.example.features.service.impl;

import java.util.List;
import java.util.Objects;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.features.model.Formulary;
import com.example.features.repository.FormularyRepository;
import com.example.features.service.FormularyService;

@Service
public class FormularyServiceImpl implements FormularyService {

    @Autowired
    private FormularyRepository formularyRepository;

    @Override
    public Formulary getFormularyByHabit(String habit) {
        return formularyRepository.findById(Objects.requireNonNull(habit, "Habit cannot be null")).orElse(null);
    }

    @Override
    public void saveFormulary(Formulary formulary) {
        formularyRepository.save(Objects.requireNonNull(formulary, "Formulary cannot be null"));
    }

    @Override
    public void updateFormulary(Formulary formulary) {
        formularyRepository.save(Objects.requireNonNull(formulary, "Formulary cannot be null"));
    }

    @Override
    public void deleteFormulary(String habit) {
        formularyRepository.deleteById(Objects.requireNonNull(habit, "Habit cannot be null"));
    }

    @Override
    public List<Formulary> getAllFormularies() {
        return formularyRepository.findAll();
    }
}