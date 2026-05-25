package com.example.demo.service;

import com.example.demo.model.Registration;
import com.example.demo.model.User;
import com.example.demo.model.Login;
import com.example.demo.repository.RegistrationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import jakarta.transaction.Transactional;
import java.util.Optional;

@Service
public class RegistrationServiceImpl implements RegistrationService {

    private final RegistrationRepository registrationRepository;
    private final UserService userService; // Inyectamos la interfaz
    private final LoginService loginService; // Inyectamos la interfaz

    @Autowired
    public RegistrationServiceImpl(RegistrationRepository registrationRepository,
            UserService userService,
            LoginService loginService) {
        this.registrationRepository = registrationRepository;
        this.userService = userService;
        this.loginService = loginService;
    }

    @Override
    @Transactional
    public Registration registerNewUser(Registration registration) {
        // 1. 🛡️ EL ESCUDO: Buscamos si el correo ya existe usando tu repositorio
        Optional<Registration> usuarioExistente = registrationRepository.findByGmail(registration.getGmail());

        if (usuarioExistente.isPresent()) {
            // Si el correo ya está en la base de datos, lanzamos un error que parará todo
            throw new IllegalArgumentException("Error: Este correo ya está registrado.");
        }

        // 1. Creamos el perfil base del Usuario usando el UserService
        User user = new User();
        user.setUsername(registration.getUsername());
        user = userService.createUser(user);

        // 2. Asociamos el usuario creado y guardamos el registro
        registration.setUser(user);
        Registration savedRegister = registrationRepository.save(registration);

        // 3. Generamos las credenciales en la tabla Login usando el LoginService
        Login login = new Login();
        login.setGmail(registration.getGmail());
        login.setPassword(registration.getPassword());
        login.setUser(user);
        loginService.saveLogin(login);

        return savedRegister;
    }
}