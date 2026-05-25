package com.example.features.service;

import java.util.List;
import com.example.features.model.ProgressBar;
import com.example.features.model.ProgressBarId;

public interface ProgressBarService {
    ProgressBar getProgressBarById(ProgressBarId id);

    void saveProgressBar(ProgressBar progressBar);

    void updateProgressBar(ProgressBar progressBar);

    void deleteProgressBar(ProgressBarId id);

    List<ProgressBar> getAllProgressBars();
}