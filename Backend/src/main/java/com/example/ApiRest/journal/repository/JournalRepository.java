package com.example.ApiRest.journal.repository;

import com.example.ApiRest.journal.model.Journal;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface JournalRepository extends JpaRepository<Journal, Long> {
    List<Journal> findByUserIdUser(Long userId);
}