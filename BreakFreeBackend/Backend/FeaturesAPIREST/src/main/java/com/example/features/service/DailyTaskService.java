package com.example.features.service;

import java.util.List;
import com.example.features.model.DailyTask;
import com.example.features.model.DailyTaskId;

public interface DailyTaskService {
    DailyTask getDailyTaskById(DailyTaskId id);

    void saveDailyTask(DailyTask dailyTask);

    void updateDailyTask(DailyTask dailyTask);

    void deleteDailyTask(DailyTaskId id);

    List<DailyTask> getAllDailyTasks();
}