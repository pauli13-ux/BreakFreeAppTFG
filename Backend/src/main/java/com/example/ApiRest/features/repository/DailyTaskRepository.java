package com.example.ApiRest.features.repository;

import com.example.ApiRest.features.model.DailyTask;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface DailyTaskRepository extends JpaRepository<DailyTask, Long> {
    // This custom method automatically tells Hibernate to filter tasks by the User's ID
    List<DailyTask> findByUserIdUser(Long userId);
}