package com.example.ApiRest.features.controller;

import com.example.ApiRest.features.model.DailyTask;
import com.example.ApiRest.features.model.Formulary;
import com.example.ApiRest.features.model.ProgressBar;
import com.example.ApiRest.features.repository.DailyTaskRepository;
import com.example.ApiRest.features.repository.FormularyRepository;
import com.example.ApiRest.features.repository.ProgressBarRepository;
import com.example.ApiRest.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/features")
@CrossOrigin(origins = "*")
public class FeatureController {

    @Autowired private DailyTaskRepository taskRepository;
    @Autowired private FormularyRepository formularyRepository;
    @Autowired private ProgressBarRepository progressBarRepository;
    @Autowired private UserRepository userRepository;

    // ==========================================
    // 📋 1. DAILY TASKS ENDPOINTS
    // ==========================================
    
    @GetMapping("/tasks/user/{userId}")
    public ResponseEntity<List<DailyTask>> getUserTasks(@PathVariable Long userId) {
        return ResponseEntity.ok(taskRepository.findByUserIdUser(userId));
    }

    @PostMapping("/tasks/user/{userId}")
    public ResponseEntity<?> createDailyTask(@PathVariable Long userId, @RequestBody DailyTask task) {
        return userRepository.findById(userId).map(user -> {
            task.setUser(user);
            DailyTask savedTask = taskRepository.save(task);
            return ResponseEntity.ok(savedTask);
        }).orElse(ResponseEntity.notFound().build());
    }

    // ==========================================
    // 📝 2. FORMULARY ENDPOINTS
    // ==========================================

    @GetMapping("/formulary/user/{userId}")
    public ResponseEntity<?> getFormulary(@PathVariable Long userId) {
        return formularyRepository.findByUserIdUser(userId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/formulary/user/{userId}")
    public ResponseEntity<?> saveFormulary(@PathVariable Long userId, @RequestBody Formulary formulary) {
        return userRepository.findById(userId).map(user -> {
            formulary.setUser(user);
            Formulary savedForm = formularyRepository.save(formulary);
            return ResponseEntity.ok(savedForm);
        }).orElse(ResponseEntity.notFound().build());
    }

    // ==========================================
    // 📊 3. % PROGRESS BAR ENDPOINTS
    // ==========================================

    @GetMapping("/progress/user/{userId}")
    public ResponseEntity<?> getProgressBar(@PathVariable Long userId) {
        return progressBarRepository.findByUserIdUser(userId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/progress/user/{userId}")
    public ResponseEntity<?> saveProgressBar(@PathVariable Long userId, @RequestBody ProgressBar progressBar) {
        return userRepository.findById(userId).map(user -> {
            progressBar.setUser(user);
            ProgressBar savedBar = progressBarRepository.save(progressBar);
            return ResponseEntity.ok(savedBar);
        }).orElse(ResponseEntity.notFound().build());
    }
}