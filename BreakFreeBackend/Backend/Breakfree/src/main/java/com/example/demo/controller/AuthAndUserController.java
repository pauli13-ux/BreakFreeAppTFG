package com.example.demo.controller;

import com.example.demo.model.User;
import com.example.demo.model.Login;
import com.example.demo.model.Registration;
import com.example.demo.service.UserService;
import com.example.demo.service.LoginService;
import com.example.demo.service.RegistrationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*") // Permite solicitudes desde cualquier origen
public class AuthAndUserController {

    private final UserService userService;
    private final LoginService loginService;
    private final RegistrationService registrationService;

    // Inyectamos las interfaces de los servicios mediante el constructor
    @Autowired
    public AuthAndUserController(UserService userService,
            LoginService loginService,
            RegistrationService registrationService) {
        this.userService = userService;
        this.loginService = loginService;
        this.registrationService = registrationService;
    }

    // ENDPOINTS DE REGISTRATION

    /**
     * Registra un nuevo usuario en el sistema.
     * URL: POST http://localhost:8080/api/auth/register
     */
    @PostMapping("/register")
    public ResponseEntity<Registration> register(@RequestBody Registration registration) {
        Registration newRegistration = registrationService.registerNewUser(registration);
        return new ResponseEntity<>(newRegistration, HttpStatus.CREATED);
    }

    // ENDPOINTS DE LOGIN

    /**
     * Autentica un usuario verificando su correo y contraseña.
     * URL: POST http://localhost:8080/api/auth/login
     */
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody Login loginRequest) {
        boolean isAuthenticated = loginService.authenticate(loginRequest.getGmail(), loginRequest.getPassword());
        if (isAuthenticated) {
            return ResponseEntity.ok("Login exitoso. ¡Bienvenido!");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciales incorrectas. Inténtalo de nuevo.");
        }
    }

    // ENDPOINTS DE USER

    /**
     * Obtiene la lista completa de todos los usuarios registrados.
     * URL: GET http://localhost:8080/api/auth/users
     */
    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    /**
     * Busca un usuario específico mediante su ID único.
     * URL: GET http://localhost:8080/api/auth/users/{id}
     */
    @GetMapping("/users/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        User user = userService.getUserById(id);
        if (user != null) {
            return ResponseEntity.ok(user);
        }
        return ResponseEntity.notFound().build();
    }
}