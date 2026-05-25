package com.example.demo.service;

import com.example.demo.model.Login;

// Interfaz del servicio de autenticación
public interface LoginService {
    boolean authenticate(String gmail, String password);

    Login saveLogin(Login login);
}