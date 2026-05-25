package com.example.features.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.features.model.DailyTask;
import com.example.features.model.DailyTaskId;
import com.example.features.model.Formulary;
import com.example.features.model.ProgressBar;
import com.example.features.model.ProgressBarId;
import com.example.features.service.DailyTaskService;
import com.example.features.service.FormularyService;
import com.example.features.service.ProgressBarService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/features")
public class FeatureController {

    @Autowired
    private FormularyService formularyService;

    @Autowired
    private ProgressBarService progressBarService;

    @Autowired
    private DailyTaskService dailyTaskService;

    // --- 1. FORMULARY ENDPOINTS ---

    @GetMapping("/formularies")
    public ResponseEntity<List<Formulary>> getAllFormularies() {
        return ResponseEntity.ok(formularyService.getAllFormularies());
    }

    @GetMapping("/formularies/{habit}")
    public ResponseEntity<Formulary> getFormularyByHabit(@PathVariable String habit) {
        Formulary formulary = formularyService.getFormularyByHabit(habit);
        return formulary != null ? ResponseEntity.ok(formulary) : ResponseEntity.notFound().build();
    }

    @PostMapping("/formularies")
    public ResponseEntity<String> createFormulary(@RequestBody Formulary formulary) {
        formularyService.saveFormulary(formulary);
        return ResponseEntity.ok("Formulary saved successfully!");
    }

    @PutMapping("/formularies")
    public ResponseEntity<String> updateFormulary(@RequestBody Formulary formulary) {
        formularyService.updateFormulary(formulary);
        return ResponseEntity.ok("Formulary updated successfully!");
    }

    @DeleteMapping("/formularies/{habit}")
    public ResponseEntity<String> deleteFormulary(@PathVariable String habit) {
        formularyService.deleteFormulary(habit);
        return ResponseEntity.ok("Formulary deleted successfully!");
    }

    // --- 2. PROGRESS BAR ENDPOINTS ---

    @GetMapping("/progress-bars")
    public ResponseEntity<List<ProgressBar>> getAllProgressBars() {
        return ResponseEntity.ok(progressBarService.getAllProgressBars());
    }

    @GetMapping("/progress-bars/search")
    public ResponseEntity<ProgressBar> getProgressBarById(@RequestParam Long idUser,
            @RequestParam String completedDays) {
        ProgressBarId id = new ProgressBarId();
        id.setId_user(idUser);
        id.setCompleted_days(completedDays);

        ProgressBar progressBar = progressBarService.getProgressBarById(id);
        return progressBar != null ? ResponseEntity.ok(progressBar) : ResponseEntity.notFound().build();
    }

    @PostMapping("/progress-bars")
    public ResponseEntity<String> createProgressBar(@RequestBody ProgressBar progressBar) {
        progressBarService.saveProgressBar(progressBar);
        return ResponseEntity.ok("Progress Bar entry saved successfully!");
    }

    @PutMapping("/progress-bars")
    public ResponseEntity<String> updateProgressBar(@RequestBody ProgressBar progressBar) {
        progressBarService.updateProgressBar(progressBar);
        return ResponseEntity.ok("Progress Bar entry updated successfully!");
    }

    @DeleteMapping("/progress-bars/delete")
    public ResponseEntity<String> deleteProgressBar(@RequestParam Long idUser, @RequestParam String completedDays) {
        ProgressBarId id = new ProgressBarId();
        id.setId_user(idUser);
        id.setCompleted_days(completedDays);

        progressBarService.deleteProgressBar(id);
        return ResponseEntity.ok("Progress Bar entry deleted successfully!");
    }

    // --- 3. DAILY TASK ENDPOINTS ---

    @GetMapping("/daily-tasks")
    public ResponseEntity<List<DailyTask>> getAllDailyTasks() {
        return ResponseEntity.ok(dailyTaskService.getAllDailyTasks());
    }

    @GetMapping("/daily-tasks/search")
    public ResponseEntity<DailyTask> getDailyTaskById(@RequestParam Long idUser, @RequestParam String habit,
            @RequestParam String dayW) {
        DailyTaskId id = new DailyTaskId();
        id.setId_user(idUser);
        id.setHabit(habit);
        id.setDay_w(dayW);

        DailyTask dailyTask = dailyTaskService.getDailyTaskById(id);
        return dailyTask != null ? ResponseEntity.ok(dailyTask) : ResponseEntity.notFound().build();
    }

    @PostMapping("/daily-tasks")
    public ResponseEntity<String> createDailyTask(@RequestBody DailyTask dailyTask) {
        dailyTaskService.saveDailyTask(dailyTask);
        return ResponseEntity.ok("Daily Task saved successfully!");
    }

    @PutMapping("/daily-tasks")
    public ResponseEntity<String> updateDailyTask(@RequestBody DailyTask dailyTask) {
        dailyTaskService.updateDailyTask(dailyTask);
        return ResponseEntity.ok("Daily Task updated successfully!");
    }

    @DeleteMapping("/daily-tasks/delete")
    public ResponseEntity<String> deleteDailyTask(@RequestParam Long idUser, @RequestParam String habit,
            @RequestParam String dayW) {
        DailyTaskId id = new DailyTaskId();
        id.setId_user(idUser);
        id.setHabit(habit);
        id.setDay_w(dayW);

        dailyTaskService.deleteDailyTask(id);
        return ResponseEntity.ok("Daily Task deleted successfully!");
    }
}