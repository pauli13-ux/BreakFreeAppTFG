package com.example.features.service.impl;

import java.util.List;
import java.util.Objects; // Import this helper
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.features.model.DailyTask;
import com.example.features.model.DailyTaskId;
import com.example.features.repository.DailyTaskRepository;
import com.example.features.service.DailyTaskService;

@Service
public class DailyTaskServiceImpl implements DailyTaskService {

    @Autowired
    private DailyTaskRepository dailyTaskRepository;

    @Override
    public DailyTask getDailyTaskById(DailyTaskId id) {
        return dailyTaskRepository.findById(Objects.requireNonNull(id, "DailyTaskId cannot be null")).orElse(null);
    }

    @Override
    public void saveDailyTask(DailyTask dailyTask) {
        // Objects.requireNonNull guarantees the object isn't null to the compiler
        dailyTaskRepository.save(Objects.requireNonNull(dailyTask, "DailyTask cannot be null"));
    }

    @Override
    public void updateDailyTask(DailyTask dailyTask) {
        dailyTaskRepository.save(Objects.requireNonNull(dailyTask, "DailyTask cannot be null"));
    }

    @Override
    public void deleteDailyTask(DailyTaskId id) {
        dailyTaskRepository.deleteById(Objects.requireNonNull(id, "DailyTaskId cannot be null"));
    }

    @Override
    public List<DailyTask> getAllDailyTasks() {
        return dailyTaskRepository.findAll();
    }
}