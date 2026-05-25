package com.example.ApiRest.user.repository;

import com.example.ApiRest.user.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByGmail(String gmail);
}