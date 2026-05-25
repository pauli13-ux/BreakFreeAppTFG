package com.example.features.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.features.model.DailyTask;
import com.example.features.model.DailyTaskId;

public interface DailyTaskRepository extends JpaRepository<DailyTask, DailyTaskId> {
}