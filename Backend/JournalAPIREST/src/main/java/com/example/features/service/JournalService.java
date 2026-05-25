package com.example.features.service;

import java.util.List;
import com.example.features.model.Journal;
import com.example.features.model.JournalId;

public interface JournalService {
    Journal getJournalById(JournalId id);

    void saveJournal(Journal journal);

    List<Journal> getAllJournals();
}