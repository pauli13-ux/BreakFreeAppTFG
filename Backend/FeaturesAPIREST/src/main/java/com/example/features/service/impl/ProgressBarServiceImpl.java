package com.example.features.service.impl;

import java.util.List;
import java.util.Objects;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.features.model.ProgressBar;
import com.example.features.model.ProgressBarId;
import com.example.features.repository.ProgressBarRepository;
import com.example.features.service.ProgressBarService;

@Service
public class ProgressBarServiceImpl implements ProgressBarService {

    @Autowired
    private ProgressBarRepository progressBarRepository;

    @Override
    public ProgressBar getProgressBarById(ProgressBarId id) {
        return progressBarRepository.findById(Objects.requireNonNull(id, "ProgressBarId cannot be null")).orElse(null);
    }

    @Override
    public void saveProgressBar(ProgressBar progressBar) {
        progressBarRepository.save(Objects.requireNonNull(progressBar, "ProgressBar cannot be null"));
    }

    @Override
    public void updateProgressBar(ProgressBar progressBar) {
        progressBarRepository.save(Objects.requireNonNull(progressBar, "ProgressBar cannot be null"));
    }

    @Override
    public void deleteProgressBar(ProgressBarId id) {
        progressBarRepository.deleteById(Objects.requireNonNull(id, "ProgressBarId cannot be null"));
    }

    @Override
    public List<ProgressBar> getAllProgressBars() {
        return progressBarRepository.findAll();
    }
}