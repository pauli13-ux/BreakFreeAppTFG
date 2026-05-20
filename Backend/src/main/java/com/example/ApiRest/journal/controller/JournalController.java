package com.example.ApiRest.journal.controller;

import com.example.ApiRest.journal.model.Journal;
import com.example.ApiRest.journal.repository.JournalRepository;
import com.example.ApiRest.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/journal")
@CrossOrigin(origins = "*")
public class JournalController {

    @Autowired private JournalRepository journalRepository;
    @Autowired private UserRepository userRepository;

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Journal>> getUserJournal(@PathVariable Long userId) {
        return ResponseEntity.ok(journalRepository.findByUserIdUser(userId));
    }

    @PostMapping("/user/{userId}")
    public ResponseEntity<?> createJournalEntry(@PathVariable Long userId, @RequestBody Journal journal) {
        return userRepository.findById(userId).map(user -> {
            journal.setUser(user);
            Journal savedEntry = journalRepository.save(journal);
            return ResponseEntity.ok(savedEntry);
        }).orElse(ResponseEntity.notFound().build());
    }
}