package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.model.Login;
import java.util.Optional;

public interface LoginRepository extends JpaRepository<Login, Long> {
    Optional<Login> findByGmail(String gmail);
}