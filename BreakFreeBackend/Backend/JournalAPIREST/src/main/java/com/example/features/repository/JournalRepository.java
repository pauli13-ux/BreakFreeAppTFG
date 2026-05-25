package com.example.features.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.features.model.Journal;
import com.example.features.model.JournalId;

public interface JournalRepository extends JpaRepository<Journal, JournalId> {
}