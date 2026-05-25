package com.example.demo.service;

import com.example.demo.model.Login;
import com.example.demo.repository.LoginRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LoginServiceImpl implements LoginService {

    private final LoginRepository loginRepository;

    @Autowired
    public LoginServiceImpl(LoginRepository loginRepository) {
        this.loginRepository = loginRepository;
    }

    // el servicio de autenticación busque un usuario por su correo
    // y compare la contraseña con la almacenada en la base de datos.
    // Si el usuario no se encuentra o la contraseña no coincide, devuelve false.
    @Override
    public boolean authenticate(String gmail, String password) {
        return loginRepository.findByGmail(gmail)
                .map(login -> login.getPassword().equals(password))
                .orElse(false);
    }

    @Override
    public Login saveLogin(Login login) {
        return loginRepository.save(login);
    }
}