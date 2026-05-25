package com.example.features.service.impl;

import java.util.List;
import java.util.Objects;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.features.model.Journal;
import com.example.features.model.JournalId;
import com.example.features.repository.JournalRepository;
import com.example.features.service.JournalService;

@Service
public class JournalServiceImpl implements JournalService {

    @Autowired
    private JournalRepository journalRepository;

    @Override
    public Journal getJournalById(JournalId id) {
        return journalRepository.findById(Objects.requireNonNull(id, "Journal ID cannot be null")).orElse(null);
    }

    @Override
    public void saveJournal(Journal journal) {
        journalRepository.save(Objects.requireNonNull(journal, "Journal cannot be null"));
    }

    @Override
    public List<Journal> getAllJournals() {
        return journalRepository.findAll();
    }
}