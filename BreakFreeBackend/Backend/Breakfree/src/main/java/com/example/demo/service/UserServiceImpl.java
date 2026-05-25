package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    // se inyecta el repositorio de usuarios para poder acceder a la base de datos
    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // sirve para obtener todos los usuarios de la base de datos
    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // sirve para obtener un usuario por su id, si no se encuentra devuelve null
    @Override
    public User getUserById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    // sirve para crear un nuevo usuario en la base de datos
    @Override
    public User createUser(User user) {
        return userRepository.save(user);
    }
}