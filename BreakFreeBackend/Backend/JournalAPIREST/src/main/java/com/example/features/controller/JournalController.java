package com.example.features.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.features.model.Journal;
import com.example.features.model.JournalId;
import com.example.features.service.JournalService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/journal")
public class JournalController {

    @Autowired
    private JournalService journalService;

    @GetMapping
    public ResponseEntity<List<Journal>> getAllJournals() {
        return ResponseEntity.ok(journalService.getAllJournals());
    }

    @GetMapping("/search")
    public ResponseEntity<Journal> getJournalById(
            @RequestParam("id_user") int idUser,
            @RequestParam("date") String date) {

        JournalId id = new JournalId();
        id.setId_User(idUser);
        id.setDate(date);

        Journal journal = journalService.getJournalById(id);
        return journal != null ? ResponseEntity.ok(journal) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<String> createJournal(@RequestBody Journal journal) {
        journalService.saveJournal(journal);
        return ResponseEntity.ok("Journal entry created successfully!");
    }

    @PutMapping
    public ResponseEntity<String> updateJournal(@RequestBody Journal journal) {
        journalService.saveJournal(journal);
        return ResponseEntity.ok("Journal entry updated successfully!");
    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteJournal(
            @RequestParam("id_user") int idUser,
            @RequestParam("date") String date) {

        JournalId id = new JournalId();
        id.setId_User(idUser);
        id.setDate(date);

        Journal journalToCheck = journalService.getJournalById(id);
        if (journalToCheck == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok("Journal entry deleted successfully!");
    }
}